import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";

const PORT = Number(process.env.FULONG_CALIBRATION_PORT ?? 4174);
const APP_URL = process.env.FULONG_APP_URL ?? "http://127.0.0.1:4173";
const REFERENCE_PATH = path.resolve(
  process.env.FULONG_REFERENCE_IMAGE ?? "artifacts/reference/fulong-highres.webp",
);

const source = { width: 3631, height: 2560 };
const crop = { left: 80, top: 65, width: 3480, height: 1740 };
const controlPoints = [
  ["Summit", 1970, 180],
  ["Fulong Base", 2241, 1351],
  ["L3 Base / West", 431, 1266],
  ["L3 Top", 1455, 410],
  ["C8 Lower", 1691, 575],
  ["L2 / L5 Base Area", 1886, 1304],
  ["L7 East Sector", 3389, 590],
];

if (process.argv.includes("--help")) {
  console.log(`Fulong reference calibration helper\n\n1. Put the uploaded panorama at:\n   ${REFERENCE_PATH}\n2. Run the app on ${APP_URL}\n3. Run: npm run calibrate:fulong\n4. Open http://127.0.0.1:${PORT}\n\nOverride paths with FULONG_REFERENCE_IMAGE and FULONG_APP_URL.`);
  process.exit(0);
}

if (!existsSync(REFERENCE_PATH)) {
  console.error(`Missing local reference raster: ${REFERENCE_PATH}`);
  console.error("Copy the user-supplied high-resolution panorama there, or set FULONG_REFERENCE_IMAGE. artifacts/ is gitignored and must remain development-only.");
  process.exit(1);
}

const pointMarkup = controlPoints
  .map(([label, sourceX, sourceY]) => {
    const x = sourceX - crop.left;
    const y = sourceY - crop.top;
    return `<g transform="translate(${x} ${y})"><circle r="18"/><text x="24" y="-18">${label}</text></g>`;
  })
  .join("\n");

const referenceWidthPct = (source.width / crop.width) * 100;
const referenceHeightPct = (source.height / crop.height) * 100;
const referenceLeftPct = -(crop.left / crop.width) * 100;
const referenceTopPct = -(crop.top / crop.height) * 100;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Fulong reference calibration</title>
<style>
:root { color-scheme: light; font: 14px/1.45 ui-sans-serif, system-ui, sans-serif; background:#171b1a; color:#edf2ee; }
* { box-sizing:border-box; }
body { margin:0; }
header { display:flex; gap:24px; align-items:baseline; padding:14px 18px; border-bottom:1px solid #46504b; }
header strong { font-size:16px; }
header span { color:#aab7b0; }
main { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:12px; padding:12px; height:calc(100vh - 54px); }
.pane { min-width:0; border:1px solid #46504b; background:#eef1ed; overflow:auto; position:relative; }
.reference-frame { position:relative; width:100%; aspect-ratio:${crop.width}/${crop.height}; overflow:hidden; background:white; }
.reference-frame img { position:absolute; width:${referenceWidthPct}%; height:${referenceHeightPct}%; left:${referenceLeftPct}%; top:${referenceTopPct}%; }
.reference-frame svg { position:absolute; inset:0; width:100%; height:100%; }
.reference-frame circle { fill:none; stroke:#ff3b30; stroke-width:5; vector-effect:non-scaling-stroke; }
.reference-frame text { fill:#ff3b30; paint-order:stroke; stroke:#fff; stroke-width:8; font:bold 28px ui-sans-serif,system-ui; }
iframe { width:100%; height:100%; border:0; background:white; }
.badge { padding:2px 6px; border:1px solid #64736b; border-radius:999px; }
@media (max-width: 900px) { main { grid-template-columns:1fr; height:auto; } .pane { min-height:520px; } }
</style>
</head>
<body>
<header><strong>Fulong layout calibration</strong><span class="badge">development only</span><span>Reference crop ${crop.width}×${crop.height}</span><span>App ${APP_URL}</span></header>
<main>
  <section class="pane" aria-label="Reference panorama crop">
    <div class="reference-frame">
      <img src="/reference" alt="Development-only Fulong high-resolution reference" />
      <svg viewBox="0 0 ${crop.width} ${crop.height}" aria-label="Measured reference control anchors">${pointMarkup}</svg>
    </div>
  </section>
  <section class="pane" aria-label="Local application"><iframe src="${APP_URL}"></iframe></section>
</main>
</body>
</html>`;

createServer((request, response) => {
  if (request.url === "/reference") {
    response.writeHead(200, { "content-type": "image/webp", "cache-control": "no-store" });
    createReadStream(REFERENCE_PATH).pipe(response);
    return;
  }

  response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  response.end(html);
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Fulong reference calibration: http://127.0.0.1:${PORT}`);
  console.log(`Reference raster: ${REFERENCE_PATH}`);
  console.log(`Application: ${APP_URL}`);
});
