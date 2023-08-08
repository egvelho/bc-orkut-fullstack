import http from "http";
import { promises as fsp } from "fs";

const port = 8080;
const host = "0.0.0.0";

const server = http.createServer(async (req, res) => {
  if (req.url === "/teste") {
    res.writeHead(200);
    res.write(`
    <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {
                    background-color: red;
                    font-size: 16px;
                    font-family: Helvetica;
                }
            </style>
        </head>
        <body>
            <h1>Hello world</h1>
            <p>
                As relações entre dinossauros e a China têm sido de grande importância para a paleontologia e a ciência em geral. A China é uma região rica em fósseis de dinossauros, e muitas descobertas importantes têm sido feitas ao longo dos anos. Esses achados têm contribuído significativamente para o nosso entendimento da história evolutiva desses animais pré-históricos.
                Pesquisadores chineses têm desempenhado um papel fundamental na descoberta, escavação e estudo de fósseis de dinossauros, colaborando com cientistas de todo o mundo. Essas parcerias internacionais têm levado a avanços notáveis na compreensão da diversidade, anatomia e comportamento dos dinossauros.
                A China também tem sido pioneira em pesquisas que revelam detalhes sobre as origens das aves a partir de dinossauros emplumados, proporcionando uma compreensão mais profunda sobre a relação entre esses dois grupos de animais.                
                Além disso, as descobertas paleontológicas na China têm um impacto significativo na divulgação científica e no turismo cultural. Muitos sítios arqueológicos e museus dedicados aos dinossauros atraem estudiosos e entusiastas de todo o mundo.
                No geral, as relações entre dinossauros e a China têm sido frutíferas, promovendo novas pesquisas, enriquecendo a compreensão da história da vida na Terra e inspirando o fascínio por esses seres antigos em pessoas de todas as idades.
            </p>
            <img src="/wallpapers/wall.jpg">
            <script>
                fetch('/teste.json').then(async res => {
                    const json = await res.json();
                    console.log(json);
                })
            </script>
        </body>
    </html>
  `);
    res.end();
  } else if (req.url === "/batata") {
    res.writeHead(200);
    res.write("batata");
    res.end();
  } else if (req.url === "/wallpapers/wall.jpg") {
    const wallpaper = await fsp.readFile("./wallpaper.jpg");
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.write(wallpaper);
    res.end();
  } else if (req.url === "/teste.json") {
    const teste = (await fsp.readFile("./teste.json")).toString();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(teste);
    res.end();
  } else if (req.url === "/google") {
    res.writeHead(301, { Location: "https://google.com" });
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, host, () => {
  console.log(`Servidor iniciado em http://${host}:${port}`);
});
