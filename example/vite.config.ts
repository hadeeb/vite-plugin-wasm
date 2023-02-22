import { defineConfig } from "vite";
import { VitePluginNode, RequestAdapterParams } from "vite-plugin-node";
import { wasmEdgeModule } from "../wasm-plugin";

type RequestParams = RequestAdapterParams<{
  fetch(request: Request): Promise<Response>;
}>;

export default defineConfig(({ command }) => ({
  optimizeDeps: { disabled: true },
  plugins: [
    VitePluginNode({
      adapter: async ({ app, req, res }: RequestParams) => {
        const response = await app.fetch(
          new Request(`http://${req.headers.host}${req.url}`, {
            headers: req.headers as Record<string, string>,
            method: req.method,
          })
        );

        res.statusCode = response.status;
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        res.end(new Uint8Array(await response.arrayBuffer()));
      },
      // tell the plugin where is your project entry
      appPath: "./index.ts",
      // the name of named export of you app from the appPath file
      exportName: "default",
    }),
    wasmEdgeModule({ target: "cloudflare" }),
  ],
  ssr: { target: "webworker", noExternal: command === "build" ? true : [] },
  build: {
    minify: command === "build" ? "esbuild" : false,
    ssrEmitAssets: true,
  },
}));
