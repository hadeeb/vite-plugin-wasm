declare module "satori/wasm" {
  export * from "satori";
  export { default } from "satori";
}

declare module "yoga-wasm-web" {
  import * as yoga_layout from "yoga-layout";
  function init(mod: WebAssembly.Module): Promise<typeof yoga_layout>;
  export default init;
}
