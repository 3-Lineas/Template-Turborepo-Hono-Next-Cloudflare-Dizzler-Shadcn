#!/usr/bin/env node

import {
  intro,
  text,
  outro,
  spinner,
  isCancel,
  cancel,
  confirm,
} from "@clack/prompts";
import { downloadTemplate } from "giget";
import { execa } from "execa";
import fs from "node:fs/promises";
import path from "node:path";
import color from "picocolors";

async function main() {
  console.clear();

  const args = process.argv.slice(2);
  if (args[0] === "add") {
    const appName = args[1];
    if (!appName) {
      console.error(
        color.red(
          "❌ Por favor especifica un nombre para la nueva app: create-cf-stack add [nombre]",
        ),
      );
      process.exit(1);
    }
    await addApp(appName);
    return;
  }

  intro(
    color.bgCyan(
      color.black(" 🚀 crear-cf-stack - El comienzo de algo grande "),
    ),
  );

  const projectName = await text({
    message: "📂 ¿Cómo llamaremos a tu nueva aventura?",
    placeholder: "mi-app-increible",
    defaultValue: "mi-app-increible",
  });

  if (isCancel(projectName)) {
    cancel("❌ Operación cancelada. ¡Vuelve pronto!");
    process.exit(0);
  }

  const s = spinner();
  s.start("📥 Descargando la magia de la nube...");

  try {
    // Repositorio de la plantilla
    await downloadTemplate(
      "gh:3-Lineas/Template-Turborepo-Hono-Next-Cloudflare-Dizzler-Shadcn",
      {
        dir: projectName,
        force: true,
      },
    );

    s.stop("✨ ¡Plantilla descargada con éxito!");
  } catch (error) {
    s.stop("💥 Explotó algo al descargar la plantilla.");
    console.error(error);
    process.exit(1);
  }

  s.start("⚙️  Ajustando los engranajes...");
  const projectPath = path.join(process.cwd(), projectName);

  try {
    // 1. Actualizar package.json
    const pkgPath = path.join(projectPath, "package.json");
    const pkgContent = await fs.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(pkgContent);

    pkg.name = projectName;

    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

    s.stop("🔧 Configuración base lista.");
  } catch (error) {
    s.stop("😱 Error durante la configuración.");
    console.error(error);
  }

  // Opcional: Instalar dependencias automáticamente
  const install = await confirm({
    message: "📦 ¿Quieres instalar las dependencias ahora? (Recomendado)",
  });

  if (isCancel(install)) {
    cancel("❌ Operación cancelada.");
    process.exit(0);
  }

  if (install) {
    s.start("☕ Ve por un café, esto tomará unos segundos...");
    await execa("pnpm", ["install"], { cwd: projectPath });
    s.stop("🎉 ¡Dependencias instaladas!");
  }

  // Inicializar Git
  const initGit = await confirm({
    message: "🐙 ¿Inicializamos un repositorio de Git?",
  });

  if (isCancel(initGit)) {
    cancel("❌ Operación cancelada.");
    process.exit(0);
  }

  if (initGit) {
    s.start("🌱 Plantando las semillas de Git...");
    try {
      await execa("git", ["init"], { cwd: projectPath });
      await execa("git", ["add", "."], { cwd: projectPath });
      await execa("git", ["commit", "-m", "Initial commit"], {
        cwd: projectPath,
      });
      s.stop("🌳 Git inicializado y primer commit creado.");
    } catch (e) {
      s.stop("🥀 No se pudo inicializar Git.");
    }
  }

  outro(
    color.green(
      `🚀 ¡Todo listo! Tu nave espacial está esperando en ./${projectName}`,
    ),
  );

  console.log(`\n👾 Siguientes pasos para el despegue:\n`);
  console.log(color.cyan(`  cd ${projectName}`));
  if (!install) {
    console.log(color.cyan(`  pnpm install`));
  }
  console.log(color.cyan(`  pnpm db:generate`));
  console.log(color.cyan(`  pnpm migrate:local`));
  console.log(color.cyan(`  pnpm dev`));
  console.log(`\n🌟 ¡A programar se ha dicho!\n`);
}

async function addApp(name) {
  const s = spinner();
  const targetDir = path.join(process.cwd(), "apps", name);

  // Verificar si la carpeta apps existe
  try {
    await fs.access(path.join(process.cwd(), "apps"));
  } catch (e) {
    console.error(
      color.red(
        "❌ No se encontró la carpeta 'apps'. Asegúrate de estar en la raíz de tu monorepo.",
      ),
    );
    process.exit(1);
  }

  // Verificar si la app ya existe
  try {
    await fs.access(targetDir);
    console.error(color.red(`❌ La carpeta apps/${name} ya existe.`));
    process.exit(1);
  } catch (e) {
    // Si falla, es que no existe, podemos continuar
  }

  s.start(`📥 Descargando plantilla de 'web' para crear '${name}'...`);

  try {
    // Descargar solo la carpeta apps/web del repositorio
    await downloadTemplate(
      "gh:3-Lineas/Template-Turborepo-Hono-Next-Cloudflare-Dizzler-Shadcn/apps/web",
      {
        dir: targetDir,
        force: true,
      },
    );

    s.stop("✨ ¡Plantilla descargada con éxito!");
  } catch (error) {
    s.stop("💥 Explotó algo al descargar la plantilla.");
    console.error(error);
    process.exit(1);
  }

  s.start("⚙️  Ajustando package.json...");

  try {
    const pkgPath = path.join(targetDir, "package.json");
    const pkgContent = await fs.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(pkgContent);

    pkg.name = name;

    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

    s.stop(`🔧 App '${name}' configurada correctamente.`);

    outro(
      color.green(
        `🚀 ¡Nueva app creada en apps/${name}!\n\nNo olvides ejecutar 'pnpm install' para actualizar dependencias.`,
      ),
    );
  } catch (error) {
    s.stop("😱 Error durante la configuración.");
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);
