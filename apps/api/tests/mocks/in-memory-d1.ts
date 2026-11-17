import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

function createPreparedStatement(
  sqlite: Database.Database,
  sql: string,
  boundParams: unknown[] = [],
) {
  const statement = {
    bind(...params: unknown[]) {
      return createPreparedStatement(sqlite, sql, params);
    },
    async first<T = Record<string, unknown>>(colName?: string): Promise<T | null> {
      const stmt = sqlite.prepare(sql);
      const row = stmt.get(...boundParams) as Record<string, unknown> | undefined;
      if (!row) {
        return null;
      }
      if (colName) {
        return (row[colName] as T) ?? null;
      }
      return row as T;
    },
    async all<T = Record<string, unknown>>(): Promise<{
      results: T[];
      success: boolean;
      meta: Record<string, unknown>;
    }> {
      const stmt = sqlite.prepare(sql);
      const results = stmt.all(...boundParams) as T[];
      return {
        results,
        success: true,
        meta: {},
      };
    },
    async run(): Promise<{
      results: unknown[];
      success: boolean;
      meta: Record<string, unknown>;
    }> {
      const stmt = sqlite.prepare(sql);
      const info = stmt.run(...boundParams);
      return {
        results: [],
        success: true,
        meta: {
          changes: info.changes,
          last_row_id: Number(info.lastInsertRowid),
        },
      };
    },
    async raw<T = unknown[]>(): Promise<T[]> {
      const stmt = sqlite.prepare(sql);
      return stmt.raw().all(...boundParams) as T[];
    },
  };

  return statement;
}

export function createInMemoryD1(): D1Database {
  const sqlite = new Database(":memory:");
  const migrationPath = path.resolve(
    __dirname,
    "../../migrations/0001_create_users.sql",
  );
  const migrationSql = fs
    .readFileSync(migrationPath, "utf8")
    .replaceAll("--> statement-breakpoint", "");

  sqlite.exec(migrationSql);

  const d1 = {
    prepare(sql: string) {
      return createPreparedStatement(sqlite, sql);
    },
    async batch<T = unknown>(
      statements: D1PreparedStatement[],
    ): Promise<D1Result<T>[]> {
      const results: D1Result<T>[] = [];
      const runBatch = sqlite.transaction(() => {
        // Executed sequentially
      });
      runBatch();
      for (const stmt of statements) {
        results.push((await stmt.all()) as D1Result<T>);
      }
      return results;
    },
    async exec(sql: string): Promise<D1ExecResult> {
      sqlite.exec(sql);
      return { count: 1, duration: 0 };
    },
    async dump(): Promise<ArrayBuffer> {
      return new ArrayBuffer(0);
    },
  };

  return d1 as unknown as D1Database;
}
