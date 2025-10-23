export default async function handler(req, res) {
  const links = [
      "https://staticfile-8e1115.wasmer.app/index.html",
      "https://backup1.surge.sh/main.html",
      "https://backup2.surge.sh/main.html",
      "https://backup3.surge.sh/main.html",
      "https://backup4.surge.sh/main.html",
      "https://backup5.surge.sh/main.html",
      "https://backup6.surge.sh/main.html",
      "https://backup7.surge.sh/main.html",
      "https://staticfile-f6355.wasmer.app/index.html",
      "https://staticfile-7aa78.wasmer.app/index.html",
      "https://staticfile-385f0.wasmer.app/index.html",
      "https://backup11.surge.sh/main.html",
      "https://backup12.surge.sh/main.html",
      "https://backup13.surge.sh/main.html",
      "https://backup14.surge.sh/main.html",
      "https://backup15.surge.sh/main.html",
      "https://backup16.surge.sh/main.html",
      "https://backup17.surge.sh/main.html",
      "https://staticfile-8e115.wasmer.app/index.html",
      "https://staticfile-e2d23.wasmer.app/index.html"
    ];

  const email = req.url.split("#")[1] || "";

  for (const link of links) {
    try {
      const response = await fetch(link);
      const text = await response.text();
      const match = text.match(/<title>(.*?)<\/title>/i);
      if (match && match[1] === "Reader") {
        const redirectUrl = email ? `${link}#${email}` : link;
        res.writeHead(302, { Location: redirectUrl });
        return res.end();
      }
    } catch (e) {
      // skip failed fetch
      continue;
    }
  }

  res.statusCode = 503;
  res.end("All links are down!");
}
