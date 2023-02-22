# Vite plugin

Cloudflare workers supports importing `.wasm` files as [WebAssembly.Module](https://developers.cloudflare.com/workers/wrangler/cli-wrangler/configuration/#buildupload-1)

```ts
import yogaWeb from "yoga-wasm-web";
import yogaWASM from "yoga-wasm-web/dist/yoga.wasm?module";

yogaWeb(yogaWASM);
```

`vite.config.ts`

```ts
import { wasmEdgeModule } from "@hadeeb/vite-plugin-wasm";

export default defineConfig({
  plugins: [wasmEdgeModule()],
});
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["vite/client", "@hadeeb/vite-plugin-wasm/types"]
  }
}
```
