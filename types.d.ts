declare module "*.wasm?module" {
  const src: WebAssembly.Module | ArrayBuffer;
  export default src;
}
