# Guía de Reutilización y Creación de CLI para el Proyecto

Este documento describe cómo convertir este monorepo en una plantilla reutilizable y cómo implementar un CLI (Command Line Interface) para facilitar su instalación en nuevos proyectos.

## 1. Enfoque Simplificado: Clonación de Plantilla

La forma más rápida de reutilizar este proyecto sin crear una herramienta compleja es utilizando herramientas como `giget` o `degit`, que permiten descargar el repositorio sin el historial de git.

### Comando para el usuario final

```bash
npx giget@latest gh:usuario/repo-nombre mi-nuevo-proyecto
cd mi-nuevo-proyecto
pnpm install
```

## 2. Implementación de un CLI Personalizado (`create-my-stack`)

Para ofrecer una experiencia profesional (ej. `npx create-cf-stack`), podemos crear un paquete CLI simple.

### Pasos para crear el CLI

1.  **Crear un nuevo paquete**: Crea una carpeta `packages/create-stack` (o un repo separado).
2.  **Estructura del CLI**:
    El CLI debe realizar las siguientes tareas:
    - Preguntar el nombre del proyecto.
    - Clonar este repositorio (usando `giget` o `git clone`).
    - Limpiar archivos innecesarios (ej. `.git`, carpetas de CI/CD específicas).
    - Actualizar `package.json` con el nuevo nombre.
    - Instalar dependencias automáticamente.
    - Inicializar un nuevo repositorio git.

### Ejemplo de código para el CLI (`index.mjs`)

```javascript
#!/usr/bin/env node

import { intro, text, outro, spinner } from "@clack/prompts";
import { downloadTemplate } from "giget";
import { execa } from "execa";
import fs from "node:fs/promises";
import path from "node:path";

async function main() {
  intro("🚀 Iniciando configuración de tu nuevo stack Cloudflare + Next.js");

  const projectName = await text({
    message: "¿Cuál es el nombre de tu proyecto?",
    placeholder: "mi-app-increible",
    defaultValue: "mi-app-increible",
  });

  if (typeof projectName !== "string") return;

  const s = spinner();
  s.start("Descargando plantilla...");

  // 1. Descargar la plantilla
  await downloadTemplate("gh:usuario/repo-nombre", {
    dir: projectName,
    force: true,
  });

  s.stop("Plantilla descargada.");

  // 2. Limpieza y Configuración
  s.start("Configurando proyecto...");
  const projectPath = path.join(process.cwd(), projectName);

  // Ejemplo: Renombrar package.json
  const pkgPath = path.join(projectPath, "package.json");
  const pkg = JSON.parse(await fs.readFile(pkgPath, "utf-8"));
  pkg.name = projectName;
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

  s.stop("Configuración base completada.");

  // 3. Instalar dependencias (Opcional)
  s.start("Instalando dependencias (esto puede tardar)...");
  await execa("pnpm", ["install"], { cwd: projectPath });
  s.stop("Dependencias instaladas.");

  outro(`¡Listo! Tu proyecto está en ./${projectName}`);
  console.log(`\nEjecuta:\n  cd ${projectName}\n  pnpm dev\n`);
}

main().catch(console.error);
```

## 3. Preparación del Repositorio para ser Plantilla

Antes de distribuir este proyecto como plantilla, asegúrate de:

1.  **Variables de Entorno**:
    - Asegúrate de tener archivos `.dev.vars.example` o `.env.example`.
    - No incluyas secretos reales en el repositorio.

2.  **Limpieza de Base de Datos**:
    - El CLI o el usuario debe ejecutar `pnpm db:generate` y `pnpm migrate:local` para inicializar una nueva DB limpia, en lugar de copiar archivos `.sqlite` existentes.

3.  **Scripts de Inicialización**:
    - Agrega un script `setup` en el `package.json` raíz que orqueste la configuración inicial:
      ```json
      "scripts": {
        "setup": "pnpm install && pnpm db:generate && pnpm migrate:local"
      }
      ```

## 4. Flujo de Instalación para el Usuario

Una vez implementado el CLI o usando el método de clonación, el flujo para un nuevo desarrollador sería:

1.  **Crear Proyecto**:
    ```bash
    npx create-cf-stack mi-app
    ```
2.  **Configurar Entorno**:
    - Renombrar `.dev.vars.example` a `.dev.vars`.
    - Configurar credenciales de Cloudflare si es necesario.
3.  **Iniciar Base de Datos**:
    ```bash
    pnpm db:generate
    pnpm migrate:local
    ```
4.  **Desarrollar**:
    ```bash
    pnpm dev
    ```

## 5. Publicación y Distribución

Para que cualquier persona pueda usar tu plantilla o tu CLI, debes hacerlos públicos.

### A. Hacer público el Repositorio (Plantilla)

1.  **GitHub**: Ve a la configuración de tu repositorio en GitHub (`Settings` -> `General` -> `Danger Zone`).
2.  **Visibilidad**: Cambia la visibilidad a **Public**.
3.  **Temas (Opcional)**: Agrega temas como `template`, `nextjs`, `cloudflare` para que sea fácil de encontrar.

### B. Publicar el CLI en NPM

Si decidiste crear el CLI (Paso 2), sigue estos pasos para publicarlo en el registro de NPM:

1.  **Preparar `package.json` del CLI**:
    Asegúrate de que tu `packages/create-stack/package.json` tenga:

    ```json
    {
      "name": "create-mi-stack", // Debe ser único en NPM
      "version": "1.0.0",
      "bin": "./index.mjs",
      "publishConfig": {
        "access": "public"
      }
    }
    ```

2.  **Login en NPM**:

    ```bash
    npm login
    ```

3.  **Publicar**:
    Navega a la carpeta de tu CLI y ejecuta:

    ```bash
    cd packages/create-stack
    npm publish
    ```

4.  **Uso Público**:
    Ahora cualquiera podrá usarlo sin instalar nada globalmente:
    ```bash
    npx create-mi-stack nombre-proyecto
    ```
