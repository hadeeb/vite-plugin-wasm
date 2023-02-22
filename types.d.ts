declare module "*.wasm?module" {
  const src: WebAssembly.Module;
  export default src;
}
