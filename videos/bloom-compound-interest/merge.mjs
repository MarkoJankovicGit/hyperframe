import { readFileSync, writeFileSync } from "node:fs";

const beats = JSON.parse(readFileSync("beat-data.json", "utf8"));

const extractStyle = (html) => {
  const m = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  if (!m) return "";
  let css = m[1];
  css = css.replace(/\*\s*\{[^}]*\}/g, "");
  css = css.replace(/html,\s*body\s*\{[^}]*\}/g, "");
  return css.trim();
};

const extractTemplateContent = (html) => {
  const m = html.match(/<template[^>]*>([\s\S]*?)<\/template>/);
  if (!m) return "";
  return m[1].trim();
};

const extractScript = (html) => {
  const matches = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
  if (!matches.length) return "";
  return matches.map(m => m[1]).join("\n").trim();
};

const rewriteScript = (script, beatStart) => {
  // Strip timeline construction lines + window.__timelines registration
  let s = script;
  s = s.replace(/window\.__timelines\s*=\s*window\.__timelines\s*\|\|\s*\{\s*\};?/g, "");
  s = s.replace(/const\s+tl\s*=\s*gsap\.timeline\([^)]*\);?/g, "const _BASE = " + beatStart + "; const _tl = window.__masterTl; const tl = { from: (sel,vars,p)=>_tl.from(sel,vars,_offset(p)), to: (sel,vars,p)=>_tl.to(sel,vars,_offset(p)), fromTo: (sel,a,b,p)=>_tl.fromTo(sel,a,b,_offset(p)), set: (sel,vars,p)=>_tl.set(sel,vars,_offset(p)), call: (fn,args,p)=>_tl.call(fn,args,_offset(p)), add: (x,p)=>_tl.add(x,_offset(p)) }; function _offset(p){ if(p===undefined||p===null) return _BASE; if(typeof p==='number') return _BASE + p; return p; }");
  s = s.replace(/window\.__timelines\["[^"]+"\]\s*=\s*tl;?/g, "");
  return s;
};

let masterStyles = "";
let masterBody = "";
let masterScripts = "";

for (const n of Object.keys(beats).sort((a, b) => +a - +b)) {
  const b = beats[n];
  const html = readFileSync(b.file, "utf8");
  const css = extractStyle(html);
  const body = extractTemplateContent(html);
  const script = extractScript(html);

  masterStyles += `\n/* ====== BEAT ${n} (${b.name}) ====== */\n${css}\n`;
  masterBody += `\n<!-- ====== BEAT ${n} (${b.name}) ${b.start.toFixed(2)}s -> ${b.end.toFixed(2)}s ====== -->\n${body}\n`;
  masterScripts += `\n// ====== BEAT ${n} (${b.name}) start=${b.start.toFixed(2)} dur=${b.dur.toFixed(2)} ======\n(function(){\n${rewriteScript(script, b.start)}\n})();\n`;
}

const sceneBgs = {
  1: "#1658FF", 2: "#FFFFFF", 3: "#F8F8F9", 4: "#FFFFFF", 5: "#1658FF",
  6: "#FFFFFF", 7: "#1658FF", 8: "#FFFFFF", 9: "#1658FF", 10: "#FFFFFF",
  11: "#1658FF", 12: "#FFFFFF", 13: "#1658FF"
};
let sceneInitCss = "";
for (const n of Object.keys(sceneBgs)) {
  sceneInitCss += `#beat${n} { background: ${sceneBgs[n]}; opacity: 0; visibility: hidden; }\n`;
}
sceneInitCss += `#beat1 { opacity: 1; visibility: visible; }\n`;

const totalDur = 73.3;

const beatBoundsArr = Object.keys(beats).map(n => ({ n: +n, s: beats[n].start, e: beats[n].end }));

const out = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=1080, height=1920" />
  <title>Bloom Lesson — Compound Interest</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:ital,wght@0,700;0,800;1,700;1,800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      background: #000;
      font-family: "Inter Tight", "Inter", system-ui, sans-serif;
    }
    #root {
      position: relative;
      width: 1080px;
      height: 1920px;
      overflow: hidden;
    }
    .scene {
      position: absolute;
      inset: 0;
      width: 1080px;
      height: 1920px;
      overflow: hidden;
    }
    ${sceneInitCss}
    ${masterStyles}
  </style>
</head>
<body>
  <div id="root" data-composition-id="bloom-compound-interest" data-width="1080" data-height="1920" data-start="0" data-duration="${totalDur}">
    <audio id="narration" class="clip" data-start="0" data-duration="${totalDur}" data-track-index="0" data-volume="1" src="narration.mp3" muted></audio>
    ${masterBody}
  </div>
  <script>
    window.__timelines = window.__timelines || {};
    const masterTl = gsap.timeline({ paused: true });
    window.__timelines["bloom-compound-interest"] = masterTl;
    window.__masterTl = masterTl;

    const _beatBoundaries = ${JSON.stringify(beatBoundsArr)};
    for (let i = 0; i < _beatBoundaries.length; i++) {
      const b = _beatBoundaries[i];
      const sel = "#beat" + b.n;
      if (b.n > 1) {
        masterTl.set(sel, { visibility: "visible" }, b.s - 0.05);
        masterTl.to(sel, { opacity: 1, duration: 0.18, ease: "power2.out" }, b.s);
        const prev = _beatBoundaries[i - 1];
        masterTl.to("#beat" + prev.n, { opacity: 0, duration: 0.18, ease: "power2.in" }, b.s);
        masterTl.set("#beat" + prev.n, { visibility: "hidden" }, b.s + 0.2);
      }
    }
    masterTl.to("#beat13", { opacity: 0, duration: 0.18, ease: "power2.in" }, ${totalDur} - 0.2);
  </script>
${masterScripts}
</body>
</html>
`;

writeFileSync("index.html", out);
console.log("Wrote monolithic index.html, length:", out.length);
