import satori, { init } from "satori/wasm";
import yogaWeb from "yoga-wasm-web";
import yogaWASM from "yoga-wasm-web/dist/yoga.wasm?module";

async function fetchBuffer(url: string) {
  const response = await fetch(url);
  return response.arrayBuffer();
}

export default {
  async fetch(request: Request) {
    init(await yogaWeb(yogaWASM));
    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            color: "black",
            fontSize: 48,
            backgroundColor: "red",
          },
          children: "Hello-World",
        },
      },
      {
        fonts: [
          {
            data: await fetchBuffer(
              "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf"
            ),
            name: "Inter",
            weight: 400,
          },
        ],
        width: 280,
        height: 60,
      }
    );

    return new Response(svg, { headers: { "content-type": "image/svg+xml" } });
  },
};
