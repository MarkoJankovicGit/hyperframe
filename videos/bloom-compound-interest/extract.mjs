import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const beats = JSON.parse(readFileSync("beat-data.json", "utf8"));
const monolith = readFileSync("index.html", "utf8");

mkdirSync("compositions", { recursive: true });

const sceneBgs = {
  1: "#1658FF", 2: "#FFFFFF", 3: "#F8F8F9", 4: "#FFFFFF", 5: "#1658FF",
  6: "#FFFFFF", 7: "#1658FF", 8: "#FFFFFF", 9: "#1658FF", 10: "#FFFFFF",
  11: "#1658FF", 12: "#FFFFFF", 13: "#1658FF"
};

// Extract per-beat CSS from the merged <style> block
function getBeatCss(n) {
  // Match block from "/* ====== BEAT N (...) ====== */" until next BEAT marker or end
  const re = new RegExp(`/\\* ====== BEAT ${n} \\([^)]+\\) ====== \\*/([\\s\\S]*?)(?=/\\* ====== BEAT \\d+|<\/style>)`);
  const m = monolith.match(re);
  return m ? m[1].trim() : "";
}

function getBeatBody(n) {
  // Match between the BEAT N comment and the next BEAT or end of #root content
  const re = new RegExp(`<!-- ====== BEAT ${n} \\([^)]+\\)[^>]*-->([\\s\\S]*?)(?=<!-- ====== BEAT \\d+|<script>)`);
  const m = monolith.match(re);
  if (!m) return "";
  let body = m[1].trim();
  // The body starts with the #beatN div content; strip the outer wrapper if it has the .scene class with id=beatN
  return body;
}

function getBeatScript(n) {
  // Match the IIFE block for this beat
  const re = new RegExp(`// ====== BEAT ${n} \\([^)]+\\)[^=]*=+\\n\\(function\\(\\)\\{([\\s\\S]*?)\\n\\}\\)\\(\\);`);
  const m = monolith.match(re);
  if (!m) return "";
  let script = m[1];
  // Strip out our masterTl machinery — child registers its own
  script = script.replace(/window\.__masterTl\.add\(tl,\s*[0-9.]+\);\s*tl\.resume\(\);?/g, "");
  script = script.replace(/if\s*\(typeof tl !== 'undefined' && window\.__masterTl\)\s*\{[^}]*\}/g, "");
  return script.trim();
}

let rootBeatRows = "";
const totalDur = 73.3;

for (const n of Object.keys(beats).sort((a, b) => +a - +b)) {
  const b = beats[n];
  const cssRaw = getBeatCss(n);
  const body = getBeatBody(n);
  const script = getBeatScript(n);
  const bg = sceneBgs[n];

  // Scope CSS to ensure no leakage when nested inside parent doc.
  // The framework auto-nests via composition id; CSS prefixed with #beatN works fine.
  // But we MUST add a scope rule that sets bg + dimensions on #beatN since body wrapper is unstyled.
  const rootRule = `#beat${n} { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: ${bg}; font-family: "Inter Tight", "Inter", system-ui, sans-serif; }`;

  const compositionId = `bloom-compound-interest-beat-${n}`;
  const subComp = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:ital,wght@0,700;0,800;1,700;1,800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
</head>
<body>
<template>
  <div id="beat${n}" data-composition-id="${compositionId}" data-width="1080" data-height="1920" data-start="0" data-duration="${b.dur.toFixed(2)}">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      ${rootRule}
      ${cssRaw}
    </style>
    ${body}
    <script>
      window.__timelines = window.__timelines || {};
      ${script}
      window.__timelines["${compositionId}"] = tl;
    </script>
  </div>
</template>
</body>
</html>
`;

  writeFileSync(`compositions/beat-${n}-${b.name}.html`, subComp);

  rootBeatRows += `    <div class="clip" data-composition-id="${compositionId}" data-composition-src="compositions/beat-${n}-${b.name}.html" data-start="${b.start.toFixed(2)}" data-duration="${b.dur.toFixed(2)}" data-track-index="1"></div>\n`;
}

// New tiny root index.html
const root = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=1080, height=1920" />
  <title>Bloom Lesson — Compound Interest</title>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
</head>
<body style="margin:0;padding:0;background:#000;">
  <div id="root" data-composition-id="bloom-compound-interest" data-width="1080" data-height="1920" data-start="0" data-duration="${totalDur}">
    <audio id="narration" class="clip" data-start="0" data-duration="${totalDur}" data-track-index="0" data-volume="1" src="narration.mp3" muted></audio>
${rootBeatRows}
  </div>
  <script>
    window.__timelines = window.__timelines || {};
    const rootTl = gsap.timeline({ paused: true });
    window.__timelines["bloom-compound-interest"] = rootTl;
  </script>
</body>
</html>
`;

writeFileSync("index.html", root);
console.log("Extracted 13 beat sub-comps + new root index.html");
