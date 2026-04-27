// Rewire the monolith so each beat IIFE uses the master timeline directly
// with its position parameter offset by _BASE (the beat's start time).
// This avoids GSAP's child-timeline embedding pattern which doesn't seek
// reliably under the renderer.

import { readFileSync, writeFileSync } from "node:fs";

const beats = JSON.parse(readFileSync("beat-data.json", "utf8"));
let html = readFileSync("index.monolith.bak", "utf8");

// For each beat IIFE block, swap the timeline construction.
for (const n of Object.keys(beats)) {
  const b = beats[n];
  const compId = `bloom-compound-interest-beat-${n}`;
  const start = b.start;

  // Replace inside this beat's IIFE only.
  // We locate the IIFE by its marker comment.
  const marker = `// ====== BEAT ${n} (${b.name}) start=${start.toFixed(2)} dur=${b.dur.toFixed(2)} ======`;
  const idx = html.indexOf(marker);
  if (idx < 0) {
    console.warn("Marker not found for beat", n);
    continue;
  }
  // IIFE ends at "})();" after this marker
  const iifeStart = html.indexOf("(function(){", idx);
  const iifeEnd = html.indexOf("})();", iifeStart);
  if (iifeStart < 0 || iifeEnd < 0) continue;

  let body = html.slice(iifeStart + "(function(){".length, iifeEnd);

  // Strip lines we don't want
  body = body.replace(/window\.__timelines\s*=\s*window\.__timelines\s*\|\|\s*\{\s*\};?/g, "");
  body = body.replace(/window\.__timelines\["[^"]+"\]\s*=\s*tl;?/g, "");
  body = body.replace(/if\s*\(typeof tl !== 'undefined' && window\.__masterTl\)\s*\{[^}]*\}/gs, "");
  body = body.replace(/window\.__masterTl\.add\(tl,\s*[0-9.]+\);\s*(tl\.resume\(\);)?/g, "");
  body = body.replace(/window\.__masterTl\.add\(tl,\s*[0-9.]+\);/g, "");
  body = body.replace(/tl\.resume\(\);?/g, "");

  // Replace `const tl = gsap.timeline(...)` with the proxy
  const proxy = `
const _BASE = ${start};
const _M = window.__masterTl;
function _shift(a) {
  if (a.length > 0 && typeof a[a.length - 1] === 'number') {
    const copy = a.slice();
    copy[copy.length - 1] = copy[copy.length - 1] + _BASE;
    return copy;
  }
  return a;
}
const tl = {
  from:    function() { return _M.from.apply(_M, _shift(Array.from(arguments))); },
  to:      function() { return _M.to.apply(_M, _shift(Array.from(arguments))); },
  fromTo:  function() { return _M.fromTo.apply(_M, _shift(Array.from(arguments))); },
  set:     function() { return _M.set.apply(_M, _shift(Array.from(arguments))); },
  call:    function() { return _M.call.apply(_M, _shift(Array.from(arguments))); },
  add:     function() { return _M.add.apply(_M, _shift(Array.from(arguments))); },
  totalDuration: function() { return _M.totalDuration(); },
  duration: function() { return _M.duration(); }
};
`;

  body = body.replace(/const\s+tl\s*=\s*gsap\.timeline\([^)]*\);?/, proxy);

  // Reinsert
  html = html.slice(0, iifeStart + "(function(){".length) + body + html.slice(iifeEnd);
}

writeFileSync("index.html", html);
console.log("Rewired. Length:", html.length);
