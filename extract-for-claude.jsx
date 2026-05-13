// extract-for-claude-lean.jsx
// Lean version — just what's needed to recreate motion in code

(function () {

    function safeRead(fn, fallback) {
        try { return fn(); } catch (e) { return fallback; }
    }

    function toISOString(d) {
        function pad(n) { return n < 10 ? "0" + n : "" + n; }
        return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" +
            pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" +
            pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
    }

    function round(n, places) {
        if (typeof n !== "number") return n;
        var p = Math.pow(10, places || 3);
        return Math.round(n * p) / p;
    }

    function roundValue(v) {
        if (typeof v === "number") return round(v, 3);
        if (v instanceof Array) {
            var arr = [];
            for (var i = 0; i < v.length; i++) arr.push(roundValue(v[i]));
            return arr;
        }
        return v;
    }

    // Only capture properties we care about for motion recreation
    var TRANSFORM_PROPS = {
        "ADBE Anchor Point": "anchor",
        "ADBE Position": "position",
        "ADBE Scale": "scale",
        "ADBE Rotate Z": "rotation",
        "ADBE Rotate X": "rotationX",
        "ADBE Rotate Y": "rotationY",
        "ADBE Opacity": "opacity"
    };

    function extractAnimatedProp(prop) {
        var numKeys = safeRead(function () { return prop.numKeys; }, 0);
        var hasExpression = safeRead(function () { return prop.expressionEnabled; }, false);

        // Static (no keyframes, no expression) — just store value
        if (numKeys === 0 && !hasExpression) {
            return { v: roundValue(safeRead(function () { return prop.value; })) };
        }

        var out = {};
        if (hasExpression) {
            out.expr = safeRead(function () { return prop.expression; });
        }

        if (numKeys > 0) {
            out.kf = [];
            for (var k = 1; k <= numKeys; k++) {
                var kf = {
                    t: round(safeRead(function () { return prop.keyTime(k); }), 4),
                    v: roundValue(safeRead(function () { return prop.keyValue(k); }))
                };

                // Easing — compact format: just influence values (speed is usually 0)
                var easeIn = safeRead(function () { return prop.keyInTemporalEase(k); });
                var easeOut = safeRead(function () { return prop.keyOutTemporalEase(k); });
                if (easeIn && easeIn[0]) kf.eIn = round(easeIn[0].influence, 1);
                if (easeOut && easeOut[0]) kf.eOut = round(easeOut[0].influence, 1);

                out.kf.push(kf);
            }
        }
        return out;
    }

    function extractTransform(layer) {
        var t = layer.transform;
        var result = {};
        for (var matchName in TRANSFORM_PROPS) {
            var key = TRANSFORM_PROPS[matchName];
            var prop = safeRead(function () { return t.property(matchName); });
            if (prop) {
                var data = extractAnimatedProp(prop);
                // Only include if animated or non-default
                if (data.kf || data.expr) {
                    result[key] = data;
                } else if (data.v !== undefined) {
                    // Skip defaults to reduce size
                    result[key] = data.v;
                }
            }
        }
        return result;
    }

    function extractEffectsSummary(layer) {
        var effectsRoot = safeRead(function () { return layer.property("ADBE Effect Parade"); });
        if (!effectsRoot || effectsRoot.numProperties === 0) return null;

        var effects = [];
        for (var e = 1; e <= effectsRoot.numProperties; e++) {
            var fx = effectsRoot.property(e);
            // Just name + match name + key animated parameters
            var fxData = {
                name: fx.name,
                mn: fx.matchName,
                enabled: fx.enabled
            };

            // Capture animated parameters only
            var animatedParams = [];
            for (var p = 1; p <= fx.numProperties; p++) {
                var param = fx.property(p);
                var nKeys = safeRead(function () { return param.numKeys; }, 0);
                var hasExpr = safeRead(function () { return param.expressionEnabled; }, false);
                if (nKeys > 0 || hasExpr) {
                    animatedParams.push({
                        name: param.name,
                        data: extractAnimatedProp(param)
                    });
                }
            }
            if (animatedParams.length > 0) fxData.animated = animatedParams;

            effects.push(fxData);
        }
        return effects;
    }

    function extractLayer(layer) {
        var data = {
            i: layer.index,
            name: layer.name,
            type: layer instanceof TextLayer ? "text" :
                layer instanceof ShapeLayer ? "shape" :
                    layer instanceof CameraLayer ? "camera" :
                        layer instanceof LightLayer ? "light" :
                            layer instanceof AVLayer ? "av" : "other",
            t: { "in": round(layer.inPoint, 4), "out": round(layer.outPoint, 4) }
        };

        if (!layer.enabled) data.disabled = true;
        if (safeRead(function () { return layer.threeDLayer; })) data["3d"] = true;
        if (safeRead(function () { return layer.adjustmentLayer; })) data.adj = true;
        if (safeRead(function () { return layer.parent; })) data.parent = layer.parent.index;
        if (safeRead(function () { return layer.blendingMode; }) !== BlendingMode.NORMAL) {
            data.blend = layer.blendingMode;
        }
        if (safeRead(function () { return layer.trackMatteType; })) {
            data.matte = layer.trackMatteType;
        }

        data.transform = extractTransform(layer);

        var effects = extractEffectsSummary(layer);
        if (effects) data.effects = effects;

        // Source for AV layers
        if (layer instanceof AVLayer) {
            var src = safeRead(function () { return layer.source; });
            if (src) {
                data.src = {
                    name: src.name,
                    type: src instanceof CompItem ? "comp" : "footage"
                };
            }
        }

        // Text content (just the string, not the full animator tree)
        if (layer instanceof TextLayer) {
            data.text = safeRead(function () {
                return layer.property("Source Text").value.text;
            });
        }

        return data;
    }

    function extractComp(comp) {
        var data = {
            name: comp.name,
            w: comp.width,
            h: comp.height,
            fps: comp.frameRate,
            dur: round(comp.duration, 4),
            layers: []
        };
        for (var i = 1; i <= comp.numLayers; i++) {
            try {
                data.layers.push(extractLayer(comp.layer(i)));
            } catch (err) {
                data.layers.push({ i: i, error: err.message });
            }
        }
        return data;
    }

    if (!app.project || !app.project.file) {
        alert("Please open and save an AE project first.");
        return;
    }

    app.beginSuppressDialogs();

    var project = app.project;
    var result = {
        meta: {
            aeVersion: app.version,
            project: project.file.name,
            extractedAt: toISOString(new Date())
        },
        footage: [],
        comps: []
    };

    try {
        for (var i = 1; i <= project.numItems; i++) {
            var item = project.item(i);
            if (item instanceof CompItem) {
                result.comps.push(extractComp(item));
            } else if (item instanceof FootageItem) {
                var f = { name: item.name };
                var srcFile = safeRead(function () { return item.file; });
                if (srcFile) f.file = srcFile.name;
                if (item.width) f.w = item.width;
                if (item.height) f.h = item.height;
                if (item.duration) f.dur = round(item.duration, 4);
                result.footage.push(f);
            }
        }
    } catch (e) {
        app.endSuppressDialogs(false);
        alert("Failed: " + e.message);
        return;
    }

    app.endSuppressDialogs(false);

    var projectFile = project.file;
    var outputPath = projectFile.path + "/" + projectFile.name.replace(/\.aep$/i, "") + ".lean.json";
    var outputFile = new File(outputPath);
    outputFile.encoding = "UTF-8";
    outputFile.open("w");
    outputFile.write(JSON.stringify(result));  // No pretty-print = ~30% smaller
    outputFile.close();

    var sizeKB = Math.round(outputFile.length / 1024);
    alert("Wrote: " + outputFile.fsName + "\n" +
        "Size: " + sizeKB + " KB\n" +
        "Comps: " + result.comps.length + "\n" +
        "Footage: " + result.footage.length);
})();