import { cloudflare } from "@cloudflare/vite-plugin";
import { groovepack } from "@3lineas/groovepack/vite";
import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    groovepack(),
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
