# `create-cf-stack` 🚀

CLI interactivo para inicializar rápidamente un nuevo proyecto basado en el stack **Cloudflare + Next.js + Hono (Turborepo)**.

Este paquete es parte del monorepo y permite descargar y configurar automáticamente la plantilla oficial.

## Características ✨

- 📥 **Descarga automática**: Clona la última versión de la plantilla [Template-Turborepo-Hono-Next-Cloudflare-Dizzler-Shadcn](https://github.com/3-Lineas/Template-Turborepo-Hono-Next-Cloudflare-Dizzler-Shadcn).
- 🛠 **Configuración cero**: Renombra el proyecto y ajusta los archivos de configuración por ti.
- 📦 **Gestión de dependencias**: Opción para instalar dependencias automáticamente con `pnpm`.
- 🐙 **Git Ready**: Inicializa un repositorio Git y realiza el primer commit.
- 🎨 **UI Amigable**: Interfaz de línea de comandos divertida y fácil de usar (powered by `@clack/prompts`).

## Uso 💻

### Desde el registro

```bash
pnpm create @3lineas/cf-stack
# o
npx @3lineas/create-cf-stack
```

### Agregar una nueva aplicación web

Si ya estás dentro de un monorepo creado con este stack y quieres agregar una nueva aplicación Next.js (basada en la plantilla `apps/web`):

```bash
create-cf-stack add [nombre-de-la-app]
```

Esto descargará una copia fresca de `apps/web` desde el repositorio remoto y la configurará en `apps/[nombre-de-la-app]`.

### Ayuda

Para ver los comandos disponibles:

```bash
create-cf-stack help
```

## Estructura del Proyecto Generado

El proyecto creado tendrá la siguiente estructura básica de monorepo:

```
mi-nuevo-proyecto/
├── apps/
│   ├── api/          # Backend Hono (Cloudflare Workers)
│   └── web/          # Frontend Next.js (Cloudflare Pages/Workers)
├── packages/
│   ├── db/           # Esquema Drizzle y conexión D1
│   └── ui/           # Componentes compartidos (shadcn/ui)
├── package.json
└── turbo.json
```

## Tecnologías del Stack 🛠

El proyecto generado incluye las siguientes tecnologías configuradas y listas para usar:

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/).
- **Backend**: [Hono](https://hono.dev/) (Cloudflare Workers).
- **Base de Datos**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite en el Edge).
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/).
- **UI**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/).
- **Monorepo**: [Turborepo](https://turbo.build/).
- **Deploy**: Cloudflare Workers.

## Créditos 👨‍💻

Desarrollado por **Diego Nelson** para [3 Lineas](https://3lineas.com).
