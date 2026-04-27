import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const slug = "bloom-diversification";
const project = path.join(root, "videos", slug);
const transcript = JSON.parse(fs.readFileSync(path.join(project, "transcript.json"), "utf8"));

const beats = [
  { n: 1, id: "hook", title: "Hook", start: 0, end: 6.2, bg: "#1658FF" },
  { n: 2, id: "tesla-risk", title: "Tesla Risk", start: 6.15, end: 14.45, bg: "#FFFFFF" },
  { n: 3, id: "five-companies", title: "Five Companies", start: 14.64, end: 25.42, bg: "#1658FF" },
  { n: 4, id: "definition", title: "Definition", start: 25.47, end: 37.6, bg: "#FFFFFF" },
  { n: 5, id: "risk-reduction", title: "Risk Reduction", start: 37.74, end: 44.4, bg: "#F8F8F9" },
  { n: 6, id: "tech-slump", title: "Tech Slump", start: 44.48, end: 55.6, bg: "#1658FF" },
  { n: 7, id: "healthcare", title: "Healthcare Hedge", start: 55.48, end: 65.1, bg: "#FFFFFF" },
  { n: 8, id: "profit-balance", title: "Profit Balance", start: 65.16, end: 73.65, bg: "#1658FF" },
  { n: 9, id: "real-world", title: "Real World", start: 73.67, end: 81.8, bg: "#F8F8F9" },
  { n: 10, id: "tease", title: "ETF Tease", start: 81.84, end: 87.3, bg: "#1658FF" },
].map((beat, index) => ({
  ...beat,
  file: `beat-${beat.n}-${beat.id}.html`,
  compId: `${slug}-beat-${beat.n}`,
  duration: +(beat.end - beat.start).toFixed(2),
  track: index % 2 === 0 ? 1 : 2,
}));

function wordsFor(beat) {
  return transcript.words
    .filter((w) => w.start >= beat.start && w.start < beat.end)
    .map((w) => ({
      word: w.word,
      t: +(w.start - beat.start).toFixed(3),
      e: +(w.end - beat.start).toFixed(3),
    }));
}

function wordJson(beat) {
  return JSON.stringify(wordsFor(beat)).replace(/},{/g, "},\n        {");
}

const baseCss = `
      .scene-root {
        position: absolute;
        inset: 0;
        width: 1080px;
        height: 1920px;
        overflow: hidden;
        font-family: "Inter", system-ui, sans-serif;
        box-sizing: border-box;
      }
      .scene-content {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 118px 82px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 36px;
      }
      .eyebrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 16px 32px;
        background: rgba(28,35,41,0.18);
        color: #fff;
        font-size: 32px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .eyebrow.dark { background: #1C2329; color: #fff; }
      .eyebrow.blue { background: #1658FF; color: #fff; }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #1C2329;
        color: #fff;
        border-radius: 26px;
        padding: 34px 50px 42px;
        box-shadow: 0 24px 60px rgba(6,10,30,0.28);
        max-width: 930px;
      }
      .badge-text {
        font-family: "Inter Tight", "Inter", system-ui, sans-serif;
        font-weight: 800;
        font-style: italic;
        text-transform: uppercase;
        letter-spacing: -0.012em;
        line-height: 0.92;
        color: #fff;
        text-align: center;
      }
      .title-dark {
        font-family: "Inter Tight", "Inter", system-ui, sans-serif;
        font-weight: 800;
        font-style: italic;
        text-transform: uppercase;
        letter-spacing: -0.012em;
        line-height: 0.93;
        color: #1C2329;
        text-align: center;
      }
      .subcopy {
        color: #4A4F54;
        font-size: 42px;
        font-weight: 700;
        line-height: 1.12;
        text-align: center;
        max-width: 860px;
      }
      .white-text { color: #fff; }
      .green { color: #01CD74; }
      .blue { color: #1658FF; }
      .logo-orb {
        width: 142px;
        height: 142px;
        border-radius: 50%;
        background: #1C2329;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 22px 50px rgba(6,10,30,0.24);
      }
      .logo-orb img {
        max-width: 82px;
        max-height: 82px;
        object-fit: contain;
      }
      .bloom-logo {
        width: 190px;
        height: 190px;
        object-fit: contain;
      }
      .star-bg {
        position: absolute;
        width: 820px;
        height: 820px;
        opacity: 0.16;
        object-fit: contain;
        z-index: 0;
      }
      .card {
        background: #fff;
        border: 2px solid #E8E9EA;
        border-radius: 34px;
        box-shadow: 0 20px 60px rgba(6,10,30,0.12);
      }
      .dark-card {
        background: #1C2329;
        color: #fff;
        border-radius: 34px;
        box-shadow: 0 24px 64px rgba(6,10,30,0.26);
      }
      .sparkline {
        width: 760px;
        height: 220px;
      }
      .sparkline path {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 18;
      }
`;

const helper = `
        const _norm = (s) => s.toLowerCase().replace(/[^\\p{L}\\p{N}\\s]/gu, "").trim();
        function _findPhrase(phrase) {
          const ws = _norm(phrase).split(/\\s+/);
          const out = [];
          for (let i = 0; i <= W.length - ws.length; i++) {
            let ok = true;
            for (let j = 0; j < ws.length; j++) {
              if (_norm(W[i + j].word) !== ws[j]) { ok = false; break; }
            }
            if (ok) out.push({ start: W[i].t, end: W[i + ws.length - 1].e });
          }
          if (out.length === 0) throw new Error('landOn: phrase "' + phrase + '" not found in beat W');
          if (out.length > 1) throw new Error('landOn: phrase "' + phrase + '" matched ' + out.length + ' positions');
          return out[0];
        }
        function landOn(phrase, dur) { return Math.max(0, _findPhrase(phrase).start - dur); }
        function landAfter(phrase, dur) { return Math.max(0, _findPhrase(phrase).end - dur); }
        function at(phrase) { return _findPhrase(phrase).start; }
`;

function wrap(beat, body, css, js) {
  return `<template>
  <div class="scene-root" data-composition-id="${beat.compId}" data-width="1080" data-height="1920" data-start="0" data-duration="${beat.duration.toFixed(2)}">
    <style>
${baseCss}
      [data-composition-id="${beat.compId}"] { background: ${beat.bg}; }
${css}
    </style>
${body}
    <script>
      (function () {
        const W = ${wordJson(beat)};
${helper}
        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        tl.set('[data-composition-id="${beat.compId}"]', { opacity: 1 }, 0);
${js}
        tl.to('[data-composition-id="${beat.compId}"]', { opacity: 0, duration: 0.2, ease: "none", overwrite: "auto" }, ${Math.max(0, beat.duration - 0.2).toFixed(2)});
        window.__timelines["${beat.compId}"] = tl;
      })();
    </script>
  </div>
</template>
`;
}

const beatTemplates = {
  1: (b) => wrap(
    b,
    `    <canvas id="ticker-canvas" width="1080" height="1920"></canvas>
    <div class="scene-content">
      <div id="b1-eyebrow" class="eyebrow">Lower Risk</div>
      <div id="b1-badge" class="badge"><span class="badge-text" style="font-size:132px">CHASE REWARD</span></div>
      <div id="b1-answer" class="subcopy white-text">The technique is called diversification.</div>
    </div>`,
    `      #ticker-canvas { position: absolute; inset: 0; opacity: 0.18; z-index: 1; }
      #b1-answer { opacity: 0; }`,
    `        const canvas = document.getElementById("ticker-canvas");
        const ctx = canvas.getContext("2d");
        const items = [
          ["AAPL", 80, 260], ["TSLA", 620, 220], ["META", 160, 680], ["MRNA", 720, 760],
          ["SPY", 120, 1180], ["QQQ", 650, 1260], ["MSFT", 360, 1580], ["NVDA", 760, 1660]
        ];
        const proxy = { t: 0 };
        function draw(t) {
          ctx.clearRect(0, 0, 1080, 1920);
          ctx.font = "italic 800 82px 'Inter Tight', sans-serif";
          ctx.fillStyle = "rgba(255,255,255,0.42)";
          items.forEach(([s, x, y], i) => ctx.fillText(s, x, Math.round((y + t * (18 + i * 2)) % 2000) - 40));
        }
        tl.to(proxy, { t: ${b.duration.toFixed(2)}, duration: ${b.duration.toFixed(2)}, ease: "none", onUpdate: () => draw(proxy.t) }, 0);
        tl.fromTo("#b1-eyebrow", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" }, landOn("lower risk", 0.5));
        tl.fromTo("#b1-badge", { y: 80, scale: 0.76, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.62, ease: "back.out(1.8)", overwrite: "auto" }, landOn("chasing reward", 0.62));
        tl.fromTo("#b1-answer", { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, ease: "power2.out", overwrite: "auto" }, landOn("called diversification", 0.48));`,
  ),
  2: (b) => wrap(
    b,
    `    <div class="scene-content">
      <div id="b2-label" class="eyebrow blue">Concentration Risk</div>
      <div id="b2-money" class="title-dark" style="font-size:168px">$1,000</div>
      <div id="b2-card" class="dark-card">
        <div class="logo-orb"><img src="../logos/TSLA.png" /></div>
        <div class="badge-text" style="font-size:112px">ALL IN TESLA</div>
      </div>
      <div id="b2-loss" class="badge"><span class="badge-text" style="font-size:118px">CAN DISAPPEAR</span></div>
    </div>`,
    `      #b2-card { width: 820px; min-height: 330px; display: flex; align-items: center; justify-content: center; gap: 42px; padding: 42px; box-sizing: border-box; }
      #b2-loss { background: #1C2329; }`,
    `        tl.fromTo("#b2-label", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "power2.out", overwrite: "auto" }, landOn("Imagine you", 0.42));
        tl.fromTo("#b2-money", { y: 70, opacity: 0, scale: 0.86 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "expo.out", overwrite: "auto" }, landOn("invest one thousand", 0.55));
        tl.fromTo("#b2-card", { x: 150, opacity: 0, rotation: 4 }, { x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" }, landOn("all in Tesla", 0.6));
        tl.fromTo("#b2-loss", { y: 80, opacity: 0, scale: 0.78 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", overwrite: "auto" }, landOn("can disappear", 0.5));
        tl.to("#b2-card", { rotation: -2, duration: 1.1, yoyo: true, repeat: 2, ease: "sine.inOut", overwrite: "auto" }, at("Tesla fails"));`,
  ),
  3: (b) => wrap(
    b,
    `    <div class="scene-content">
      <div id="b3-badge" class="badge"><span class="badge-text" style="font-size:112px">SPREAD IT OUT</span></div>
      <div id="b3-grid">
        ${["TSLA", "AAPL", "META", "MRNA", "JPM"].map((t, i) => `<div id="b3-slot-${i}" class="split-slot"><div class="logo-orb"><img src="../logos/${t}.png" /></div><div class="slot-amount">$200</div></div>`).join("\n        ")}
      </div>
      <div id="b3-four" class="subcopy white-text">Four others can keep working.</div>
    </div>`,
    `      #b3-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 26px; width: 840px; }
      .split-slot { min-height: 220px; border-radius: 34px; background: rgba(255,255,255,0.12); display:flex; align-items:center; justify-content:center; gap: 28px; padding: 26px; box-sizing: border-box; }
      .slot-amount { color: #fff; font: italic 800 76px "Inter Tight", sans-serif; }
      #b3-slot-4 { grid-column: 1 / span 2; }
      #b3-four { opacity: 0; }`,
    `        tl.fromTo("#b3-badge", { y: 70, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", overwrite: "auto" }, landOn("better move", 0.5));
        tl.fromTo(".split-slot", { x: 120, opacity: 0, scale: 0.88 }, { x: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: "power3.out", overwrite: "auto" }, landOn("five companies", 0.45));
        tl.fromTo(".slot-amount", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.32, stagger: 0.08, ease: "back.out(2)", overwrite: "auto" }, landOn("two hundred dollars", 0.32));
        tl.fromTo("#b3-four", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", overwrite: "auto" }, landOn("four others", 0.45));
        tl.to(".split-slot", { y: -8, duration: 1.2, yoyo: true, repeat: 4, stagger: 0.08, ease: "sine.inOut", overwrite: "auto" }, 5.7);`,
  ),
  4: (b) => wrap(
    b,
    `    <div class="scene-content">
      <div id="b4-title" class="title-dark" style="font-size:118px">SPREAD ACROSS</div>
      <div id="b4-pills">
        <div class="def-pill">Companies</div>
        <div class="def-pill">Industries</div>
        <div class="def-pill">Asset Classes</div>
      </div>
      <div id="b4-word" class="badge"><span class="badge-text" style="font-size:94px">DIVERSIFICATION</span></div>
      <div id="b4-basket" class="subcopy">Not all your eggs in one basket.</div>
    </div>`,
    `      #b4-pills { display: flex; flex-direction: column; gap: 24px; width: 820px; }
      .def-pill { height: 132px; border-radius: 999px; background: #1658FF; color:#fff; display:flex; align-items:center; justify-content:center; font: italic 800 62px "Inter Tight", sans-serif; text-transform: uppercase; }
      #b4-basket { color: #1C2329; }`,
    `        tl.fromTo("#b4-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, ease: "power3.out", overwrite: "auto" }, landOn("spreading investments", 0.48));
        tl.fromTo(".def-pill", { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.48, stagger: 0.18, ease: "power3.out", overwrite: "auto" }, landOn("different companies", 0.48));
        tl.fromTo("#b4-word", { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.7)", overwrite: "auto" }, landOn("is diversification", 0.55));
        tl.fromTo("#b4-basket", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, ease: "power2.out", overwrite: "auto" }, landOn("eggs in one", 0.48));`,
  ),
  5: (b) => wrap(
    b,
    `    <div class="scene-content">
      <div id="b5-badge" class="badge"><span class="badge-text" style="font-size:104px">REDUCES RISK</span></div>
      <div id="b5-row">
        <div class="risk-dot">AAPL</div><div class="risk-dot">META</div><div class="risk-dot">MRNA</div><div class="risk-dot">JPM</div><div class="risk-dot">KO</div>
      </div>
      <div id="b5-copy" class="subcopy">Different investments rarely all crash at the same time.</div>
    </div>`,
    `      #b5-row { display:flex; flex-wrap:wrap; justify-content:center; gap:24px; max-width:900px; }
      .risk-dot { width: 156px; height:156px; border-radius:50%; background:#1C2329; color:#fff; display:flex; align-items:center; justify-content:center; font: italic 800 42px "Inter Tight", sans-serif; box-shadow: 0 18px 40px rgba(6,10,30,0.18); }
      #b5-copy { color:#1C2329; }`,
    `        tl.fromTo("#b5-badge", { y: 60, opacity: 0, scale: 0.82 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", overwrite: "auto" }, landOn("reduces risk", 0.5));
        tl.fromTo(".risk-dot", { y: 80, opacity: 0, scale: 0.7 }, { y: 0, opacity: 1, scale: 1, duration: 0.42, stagger: 0.08, ease: "power3.out", overwrite: "auto" }, landOn("different investments", 0.42));
        tl.fromTo("#b5-copy", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }, landOn("same time", 0.4));
        tl.to(".risk-dot", { y: -8, duration: 0.8, yoyo: true, repeat: 5, stagger: 0.06, ease: "sine.inOut", overwrite: "auto" }, 2.7);`,
  ),
  6: (b) => wrap(
    b,
    `    <div class="scene-content">
      <div id="b6-top" class="eyebrow">One Industry</div>
      <div id="b6-logos"><div class="logo-orb"><img src="../logos/AAPL.png" /></div><div class="logo-orb"><img src="../logos/META.png" /></div></div>
      <div id="b6-badge" class="badge"><span class="badge-text" style="font-size:110px">TECH SLUMP</span></div>
      <div id="b6-stat" class="dark-card"><span>-70%</span><small>Meta in 2022</small></div>
    </div>`,
    `      #b6-logos { display:flex; gap:42px; }
      #b6-stat { width: 760px; height: 260px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; }
      #b6-stat span { font: italic 800 154px "Inter Tight", sans-serif; color:#fff; line-height:0.9; }
      #b6-stat small { color:#fff; font-size:36px; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; }`,
    `        tl.fromTo("#b6-top", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "power2.out", overwrite: "auto" }, landOn("tech stocks", 0.42));
        tl.fromTo("#b6-logos .logo-orb", { scale: 0.68, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.48, stagger: 0.16, ease: "back.out(1.8)", overwrite: "auto" }, landOn("Apple and Meta", 0.48));
        tl.fromTo("#b6-badge", { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" }, landOn("tech slump", 0.5));
        tl.fromTo("#b6-stat", { y: 90, opacity: 0, scale: 0.82 }, { y: 0, opacity: 1, scale: 1, duration: 0.56, ease: "back.out(1.6)", overwrite: "auto" }, landOn("seventy percent", 0.56));
        tl.to("#b6-logos .logo-orb", { y: 18, duration: 0.8, yoyo: true, repeat: 4, stagger: 0.1, ease: "sine.inOut", overwrite: "auto" }, 5.6);`,
  ),
  7: (b) => wrap(
    b,
    `    <div class="scene-content">
      <div id="b7-title" class="title-dark" style="font-size:104px">ADD ANOTHER ENGINE</div>
      <div id="b7-card" class="card"><div class="logo-orb"><img src="../logos/MRNA.png" /></div><div><div class="badge-text blue" style="font-size:92px">MODERNA</div><div class="subcopy" style="font-size:36px">healthcare exposure</div></div></div>
      <svg id="b7-line" class="sparkline" viewBox="0 0 760 220"><path id="b7-path" d="M40 170 C150 160 220 155 310 120 S520 70 720 42" stroke="#01CD74"/></svg>
    </div>`,
    `      #b7-card { width:850px; min-height:270px; display:flex; align-items:center; justify-content:center; gap:44px; padding:38px; box-sizing:border-box; }
      #b7-path { stroke-dasharray: 900; stroke-dashoffset: 900; }`,
    `        tl.fromTo("#b7-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, ease: "power3.out", overwrite: "auto" }, landOn("healthcare stocks", 0.48));
        tl.fromTo("#b7-card", { x: 120, opacity: 0, scale: 0.9 }, { x: 0, opacity: 1, scale: 1, duration: 0.54, ease: "power3.out", overwrite: "auto" }, landOn("portfolio had", 0.54));
        tl.to("#b7-path", { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", overwrite: "auto" }, landOn("Moderna surged", 1.1));
        tl.to("#b7-card", { y: -10, duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut", overwrite: "auto" }, 4.8);`,
  ),
  8: (b) => wrap(
    b,
    `    <img class="star-bg" src="../bloom-star.png" />
    <div class="scene-content">
      <div id="b8-not" class="eyebrow">Not Just Defense</div>
      <div id="b8-badge" class="badge"><span class="badge-text" style="font-size:112px">MORE WAYS TO PROFIT</span></div>
      <div id="b8-scale">
        <div class="scale-side">Risk</div><div class="scale-arm"></div><div class="scale-side green">Reward</div>
      </div>
    </div>`,
    `      .star-bg { left: 130px; top: 360px; }
      #b8-scale { width:820px; height:190px; display:flex; align-items:center; justify-content:center; gap:28px; }
      .scale-side { width:250px; height:150px; border-radius:32px; background:#1C2329; color:#fff; display:flex; align-items:center; justify-content:center; font: italic 800 58px "Inter Tight", sans-serif; text-transform:uppercase; }
      .scale-arm { width:180px; height:16px; border-radius:999px; background:#fff; }`,
    `        tl.fromTo(".star-bg", { rotation: -18, scale: 0.8, opacity: 0 }, { rotation: 0, scale: 1, opacity: 0.16, duration: 0.7, ease: "power2.out", overwrite: "auto" }, 0.2);
        tl.fromTo("#b8-not", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "power2.out", overwrite: "auto" }, landOn("not just", 0.42));
        tl.fromTo("#b8-badge", { y: 70, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.56, ease: "back.out(1.8)", overwrite: "auto" }, landOn("ways to profit", 0.56));
        tl.fromTo("#b8-scale .scale-side", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.46, stagger: 0.16, ease: "power3.out", overwrite: "auto" }, landOn("market conditions", 0.46));
        tl.to(".star-bg", { rotation: 10, duration: 3, yoyo: true, repeat: 2, ease: "sine.inOut", overwrite: "auto" }, 1.1);`,
  ),
  9: (b) => wrap(
    b,
    `    <div class="scene-content">
      <div id="b9-title" class="title-dark" style="font-size:96px">TWO MARKET WAVES</div>
      <div id="b9-panels">
        <div class="wave-card"><div>2014-2021</div><strong>Tech Wave</strong><div class="mini-logos"><img src="../logos/AAPL.png" /><img src="../logos/META.png" /></div></div>
        <div class="wave-card"><div>2022</div><strong>Healthcare Rally</strong><div class="mini-logos"><img src="../logos/MRNA.png" /></div></div>
      </div>
    </div>`,
    `      #b9-panels { display:flex; flex-direction:column; gap:28px; width:860px; }
      .wave-card { min-height:300px; border-radius:34px; background:#fff; padding:38px; box-sizing:border-box; box-shadow:0 20px 60px rgba(6,10,30,0.12); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; }
      .wave-card div:first-child { font-size:34px; font-weight:800; letter-spacing:0.12em; color:#4A4F54; }
      .wave-card strong { font: italic 800 74px "Inter Tight", sans-serif; text-transform:uppercase; color:#1C2329; }
      .mini-logos { display:flex; gap:18px; }
      .mini-logos img { width:72px; height:72px; object-fit:contain; background:#1C2329; padding:18px; border-radius:50%; }`,
    `        tl.fromTo("#b9-title", { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 0.44, ease: "power3.out", overwrite: "auto" }, landOn("ride the", 0.44));
        tl.fromTo(".wave-card:first-child", { x: -110, opacity: 0 }, { x: 0, opacity: 1, duration: 0.52, ease: "power3.out", overwrite: "auto" }, landOn("tech wave", 0.52));
        tl.fromTo(".wave-card:last-child", { x: 110, opacity: 0 }, { x: 0, opacity: 1, duration: 0.52, ease: "power3.out", overwrite: "auto" }, landOn("healthcare rallied", 0.52));
        tl.to(".wave-card", { y: -8, duration: 1.1, yoyo: true, repeat: 3, stagger: 0.12, ease: "sine.inOut", overwrite: "auto" }, 4.4);`,
  ),
  10: (b) => wrap(
    b,
    `    <div class="scene-content">
      <img id="b10-logo" class="bloom-logo" src="../bloom-logo.png" />
      <div id="b10-next" class="eyebrow">Next Lesson</div>
      <div id="b10-badge" class="badge"><span class="badge-text" style="font-size:142px">ETFs</span></div>
      <svg id="b10-chart" class="sparkline" viewBox="0 0 760 220"><path id="b10-path" d="M40 165 C160 150 210 105 310 122 C430 142 500 70 720 44" stroke="#FFFFFF"/></svg>
    </div>`,
    `      #b10-path { stroke-dasharray: 900; stroke-dashoffset: 900; }
      #b10-next { background: rgba(28,35,41,0.42); }`,
    `        tl.fromTo("#b10-logo", { scale: 0.62, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.58, ease: "back.out(1.8)", overwrite: "auto" }, landOn("Next lesson", 0.58));
        tl.fromTo("#b10-next", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }, landOn("Next lesson", 0.4));
        tl.fromTo("#b10-badge", { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", overwrite: "auto" }, landOn("diversify ETFs", 0.5));
        tl.to("#b10-path", { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", overwrite: "auto" }, landOn("easiest way", 1.2));
        tl.to("#b10-logo", { scale: 1.04, duration: 1.1, yoyo: true, repeat: 3, ease: "sine.inOut", overwrite: "auto" }, 1.4);`,
  ),
};

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Bloom Lesson - Diversification</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>body { margin: 0; background: #1C2329; }</style>
  </head>
  <body>
    <div id="root" data-composition-id="${slug}" data-width="1080" data-height="1920" data-start="0" data-duration="${transcript.durationSeconds.toFixed(2)}">
      <audio id="narration" class="clip" data-start="0" data-duration="${transcript.durationSeconds.toFixed(2)}" data-track-index="0" data-volume="1" src="narration.mp3"></audio>
${beats
  .map(
    (b) => `      <div class="clip" data-composition-src="compositions/${b.file}" data-composition-id="${b.compId}" data-width="1080" data-height="1920" data-start="${b.start.toFixed(2)}" data-duration="${b.duration.toFixed(2)}" data-track-index="${b.track}"></div>`,
  )
  .join("\n")}
    </div>
    <script>window.__timelines = window.__timelines || {};</script>
  </body>
</html>
`;

fs.writeFileSync(path.join(project, "index.html"), indexHtml);

for (const beat of beats) {
  fs.writeFileSync(path.join(project, "compositions", beat.file), beatTemplates[beat.n](beat));
}

const scriptMd = `# Bloom Diversification Script

${transcript.text}
`;

const beatsMd = `# Beat Timing

| Beat | File | Start | End | Duration | Track |
|---|---|---:|---:|---:|---:|
${beats.map((b) => `| ${b.n}. ${b.title} | \`${b.file}\` | ${b.start.toFixed(2)} | ${b.end.toFixed(2)} | ${b.duration.toFixed(2)} | ${b.track} |`).join("\n")}
`;

const storyboardMd = `# Storyboard - Bloom Diversification

Format: 1080x1920 portrait. Voiceover duration: ${transcript.durationSeconds.toFixed(2)}s.

| Beat | Type | Visual Direction |
|---|---|---|
| 1 | Hook | Bloom-blue ticker tape, black badge lands on "chasing reward", diversification answer appears. |
| 2 | Stat / Risk | $1,000 and Tesla logo concentrate into one dark card, then "can disappear" badge lands. |
| 3 | Examples | Five dark logo-orb slots split into $200 allocations, then the four-others safety idea appears. |
| 4 | Concept | Three blue definition pills: companies, industries, asset classes. Diversification badge lands. |
| 5 | Insight | Portfolio dots float independently to show different investments rarely all crash together. |
| 6 | Stat-Reveal | Apple and Meta tech concentration, tech slump badge, -70% Meta stat. |
| 7 | Reframe | Moderna healthcare card and green rising sparkline provide the second engine. |
| 8 | Payoff | Bloom star, "more ways to profit", risk/reward balance blocks. |
| 9 | Real Example | Two market wave cards: tech wave 2014-2021 and healthcare rally 2022. |
| 10 | Tease | Bloom logo close and ETF next-lesson badge with line chart draw. |
`;

fs.writeFileSync(path.join(project, "SCRIPT.md"), scriptMd);
fs.writeFileSync(path.join(project, "BEATS.md"), beatsMd);
fs.writeFileSync(path.join(project, "STORYBOARD.md"), storyboardMd);

console.log(`Wrote ${beats.length} beat compositions to ${project}`);
