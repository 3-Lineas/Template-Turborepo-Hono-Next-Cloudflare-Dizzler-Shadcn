import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const isRemote = args.includes("--remote");
const isFresh = args.includes("--fresh");
const withSeed = args.includes("--seed");
const seedOnly = args.includes("--seed-only");

const targetFlag = isRemote ? "--remote" : "--local";
const dbName = "DB";
const seedFile = resolve(process.cwd(), "migrations/seed.sql");

function run(command) {
  console.log(`\n> ${command}`);
  execSync(command, {
    stdio: "inherit",
    env: { ...process.env, CI: "true" },
  });
}

if (seedOnly) {
  if (!existsSync(seedFile)) {
    console.error(`No se encontró el archivo de seed en: ${seedFile}`);
    process.exit(1);
  }
  run(`pnpm exec wrangler d1 execute ${dbName} ${targetFlag} --file "${seedFile}"`);
  process.exit(0);
}

if (isFresh) {
  run(
    `pnpm exec wrangler d1 execute ${dbName} ${targetFlag} --command "DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS d1_migrations;"`,
  );
}

run(`pnpm exec wrangler d1 migrations apply ${dbName} ${targetFlag}`);

if (withSeed) {
  if (!existsSync(seedFile)) {
    console.error(`No se encontró el archivo de seed en: ${seedFile}`);
    process.exit(1);
  }
  run(`pnpm exec wrangler d1 execute ${dbName} ${targetFlag} --file "${seedFile}"`);
}
