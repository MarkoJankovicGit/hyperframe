#!/usr/bin/env node
// meshy.mjs — Meshy AI API CLI helper
//
// Usage:
//   node meshy.mjs <command> [options]
//
// Commands:
//   text-to-3d   Create a text-to-3D task (preview or refine)
//   image-to-3d  Create an image-to-3D task
//   retexture    Create a retexture task
//   remesh       Create a remesh task
//   status       Get task status
//   list         List tasks
//   download     Download model files from a completed task
//   wait         Poll until task completes, optionally download

import { writeFile, mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { resolve, join, basename } from "node:path";

const API_KEY = "msy_E4Xy0Eu75vWq711eQVToSBLIn60SQkrjlX2U";
const BASE_URL = "https://api.meshy.ai";

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ─── API helpers ─────────────────────────────────────────────────────────────

async function apiPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, { headers: HEADERS });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function apiDelete(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: HEADERS,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(data)}`);
  }
  return res.status === 204 ? {} : await res.json().catch(() => ({}));
}

// ─── Commands ────────────────────────────────────────────────────────────────

const COMMANDS = {
  "text-to-3d": cmdTextTo3D,
  "image-to-3d": cmdImageTo3D,
  retexture: cmdRetexture,
  remesh: cmdRemesh,
  status: cmdStatus,
  list: cmdList,
  download: cmdDownload,
  wait: cmdWait,
};

async function cmdTextTo3D(args) {
  const mode = args.mode || "preview";
  if (mode !== "preview" && mode !== "refine") {
    die("--mode must be 'preview' or 'refine'");
  }

  const body = { mode };

  if (mode === "preview") {
    if (!args.prompt) die("--prompt is required for preview mode");
    body.prompt = args.prompt;
    if (args.aiModel) body.ai_model = args.aiModel;
    if (args.modelType) body.model_type = args.modelType;
    if (args.topology) body.topology = args.topology;
    if (args.targetPolycount) body.target_polycount = Number(args.targetPolycount);
    if (args.shouldRemesh !== undefined) body.should_remesh = args.shouldRemesh === "true";
    if (args.symmetryMode) body.symmetry_mode = args.symmetryMode;
    if (args.poseMode !== undefined) body.pose_mode = args.poseMode;
    if (args.moderation !== undefined) body.moderation = args.moderation === "true";
    if (args.targetFormats) body.target_formats = args.targetFormats.split(",");
    if (args.autoSize !== undefined) body.auto_size = args.autoSize === "true";
  } else {
    if (!args.previewTaskId) die("--preview-task-id is required for refine mode");
    body.preview_task_id = args.previewTaskId;
    if (args.aiModel) body.ai_model = args.aiModel;
    if (args.enablePbr !== undefined) body.enable_pbr = args.enablePbr === "true";
    if (args.texturePrompt) body.texture_prompt = args.texturePrompt;
    if (args.textureImageUrl) body.texture_image_url = args.textureImageUrl;
    if (args.removeLighting !== undefined) body.remove_lighting = args.removeLighting === "true";
    if (args.moderation !== undefined) body.moderation = args.moderation === "true";
  }

  const data = await apiPost("/openapi/v2/text-to-3d", body);
  console.log(JSON.stringify(data, null, 2));
  return data.result;
}

async function cmdImageTo3D(args) {
  if (!args.imageUrl && !args.inputTaskId) {
    die("--image-url or --input-task-id is required");
  }

  const body = {};
  if (args.imageUrl) body.image_url = args.imageUrl;
  if (args.inputTaskId) body.input_task_id = args.inputTaskId;
  if (args.aiModel) body.ai_model = args.aiModel;
  if (args.modelType) body.model_type = args.modelType;
  if (args.shouldTexture !== undefined) body.should_texture = args.shouldTexture === "true";
  if (args.shouldRemesh !== undefined) body.should_remesh = args.shouldRemesh === "true";
  if (args.symmetryMode) body.symmetry_mode = args.symmetryMode;
  if (args.poseMode !== undefined) body.pose_mode = args.poseMode;
  if (args.imageEnhancement !== undefined) body.image_enhancement = args.imageEnhancement === "true";
  if (args.removeLighting !== undefined) body.remove_lighting = args.removeLighting === "true";
  if (args.moderation !== undefined) body.moderation = args.moderation === "true";
  if (args.targetFormats) body.target_formats = args.targetFormats.split(",");
  if (args.autoSize !== undefined) body.auto_size = args.autoSize === "true";

  const data = await apiPost("/openapi/v1/image-to-3d", body);
  console.log(JSON.stringify(data, null, 2));
  return data.result;
}

async function cmdRetexture(args) {
  if (!args.inputTaskId && !args.modelUrl) {
    die("--input-task-id or --model-url is required");
  }
  if (!args.textStylePrompt && !args.imageStyleUrl) {
    die("--text-style-prompt or --image-style-url is required");
  }

  const body = {};
  if (args.inputTaskId) body.input_task_id = args.inputTaskId;
  if (args.modelUrl) body.model_url = args.modelUrl;
  if (args.textStylePrompt) body.text_style_prompt = args.textStylePrompt;
  if (args.imageStyleUrl) body.image_style_url = args.imageStyleUrl;
  if (args.aiModel) body.ai_model = args.aiModel;
  if (args.enableOriginalUv !== undefined) body.enable_original_uv = args.enableOriginalUv === "true";
  if (args.enablePbr !== undefined) body.enable_pbr = args.enablePbr === "true";
  if (args.removeLighting !== undefined) body.remove_lighting = args.removeLighting === "true";

  const data = await apiPost("/openapi/v1/retexture", body);
  console.log(JSON.stringify(data, null, 2));
  return data.result;
}

async function cmdRemesh(args) {
  if (!args.inputTaskId && !args.modelUrl) {
    die("--input-task-id or --model-url is required");
  }

  const body = {};
  if (args.inputTaskId) body.input_task_id = args.inputTaskId;
  if (args.modelUrl) body.model_url = args.modelUrl;
  if (args.targetFormats) body.target_formats = args.targetFormats.split(",");
  if (args.topology) body.topology = args.topology;
  if (args.targetPolycount) body.target_polycount = Number(args.targetPolycount);
  if (args.resizeHeight) body.resize_height = Number(args.resizeHeight);
  if (args.autoSize !== undefined) body.auto_size = args.autoSize === "true";
  if (args.originAt) body.origin_at = args.originAt;
  if (args.convertFormatOnly !== undefined) body.convert_format_only = args.convertFormatOnly === "true";

  const data = await apiPost("/openapi/v1/remesh", body);
  console.log(JSON.stringify(data, null, 2));
  return data.result;
}

function taskPath(type, id) {
  const map = {
    "text-to-3d": `/openapi/v2/text-to-3d/${id}`,
    "image-to-3d": `/openapi/v1/image-to-3d/${id}`,
    retexture: `/openapi/v1/retexture/${id}`,
    remesh: `/openapi/v1/remesh/${id}`,
  };
  const path = map[type];
  if (!path) die(`Unknown task type: ${type}. Use: text-to-3d, image-to-3d, retexture, remesh`);
  return path;
}

async function cmdStatus(args) {
  if (!args.type) die("--type is required");
  if (!args.id) die("--id is required");
  const data = await apiGet(taskPath(args.type, args.id));
  console.log(JSON.stringify(data, null, 2));
  return data;
}

async function cmdList(args) {
  const type = args.type || "text-to-3d";
  const page = args.page || "1";
  const limit = args.limit || "10";
  const sort = args.sort || "-created_at";

  const pathMap = {
    "text-to-3d": `/openapi/v2/text-to-3d?page_num=${page}&page_size=${limit}&sort_by=${sort}`,
    "image-to-3d": `/openapi/v1/image-to-3d?page_num=${page}&page_size=${limit}&sort_by=${sort}`,
    retexture: `/openapi/v1/retexture?page_num=${page}&page_size=${limit}&sort_by=${sort}`,
    remesh: `/openapi/v1/remesh?page_num=${page}&page_size=${limit}&sort_by=${sort}`,
  };
  const path = pathMap[type];
  if (!path) die(`Unknown task type: ${type}`);

  const data = await apiGet(path);
  console.log(JSON.stringify(data, null, 2));
  return data;
}

async function cmdDownload(args) {
  if (!args.type) die("--type is required");
  if (!args.id) die("--id is required");
  const outDir = resolve(args.out || ".");
  const formats = (args.formats || "glb").split(",");

  const task = await apiGet(taskPath(args.type, args.id));
  if (task.status !== "SUCCEEDED") {
    die(`Task status is ${task.status}, cannot download.`);
  }

  await mkdir(outDir, { recursive: true });
  const downloads = [];

  for (const fmt of formats) {
    const url = task.model_urls?.[fmt];
    if (!url) {
      console.error(`Format ${fmt} not available. Available: ${Object.keys(task.model_urls || {}).join(", ")}`);
      continue;
    }
    const filePath = join(outDir, `${args.id}.${fmt}`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to download ${fmt}: HTTP ${res.status}`);
      continue;
    }
    await pipeline(res.body, createWriteStream(filePath));
    console.log(`Downloaded: ${filePath}`);
    downloads.push(filePath);
  }

  // Also download thumbnail
  if (task.thumbnail_url && args.thumbnail !== "false") {
    const thumbPath = join(outDir, `${args.id}_thumbnail.jpg`);
    const res = await fetch(task.thumbnail_url);
    if (res.ok) {
      await pipeline(res.body, createWriteStream(thumbPath));
      console.log(`Downloaded: ${thumbPath}`);
    }
  }

  return downloads;
}

async function cmdWait(args) {
  if (!args.type) die("--type is required");
  if (!args.id) die("--id is required");
  const interval = Number(args.interval || "10") * 1000;
  const maxWait = Number(args.maxWait || "600") * 1000;
  const start = Date.now();

  while (true) {
    const task = await apiGet(taskPath(args.type, args.id));
    const elapsed = ((Date.now() - start) / 1000).toFixed(0);
    console.log(`[${elapsed}s] status=${task.status} progress=${task.progress}%`);

    if (task.status === "SUCCEEDED") {
      console.log("\nTask completed successfully!");
      console.log(JSON.stringify(task, null, 2));

      if (args.download) {
        args.out = args.download;
        if (!args.formats) args.formats = "glb";
        await cmdDownload(args);
      }
      return task;
    }

    if (task.status === "FAILED" || task.status === "CANCELED") {
      die(`Task ${task.status}: ${task.task_error?.message || "Unknown error"}`);
    }

    if (Date.now() - start > maxWait) {
      die("Max wait time exceeded.");
    }

    await sleep(interval);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── CLI parsing ─────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const out = {};
  let positional = 0;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const v = argv[i + 1]?.startsWith("--") ? true : argv[++i];
      out[k] = v;
    } else if (positional === 0) {
      out._command = a;
      positional++;
    }
  }
  return out;
}

function die(msg) {
  console.error(`meshy: ${msg}`);
  process.exit(2);
}

function printHelp() {
  console.log(`
meshy.mjs — Meshy AI API CLI

Usage:
  node meshy.mjs <command> [options]

Commands:
  text-to-3d    Create a text-to-3D task
  image-to-3d   Create an image-to-3D task
  retexture     Create a retexture task
  remesh        Create a remesh task
  status        Get task status
  list          List tasks
  download      Download model files
  wait          Poll until completion and optionally download

Global options:
  --help              Show this help

Text to 3D options:
  --mode preview|refine
  --prompt <text>
  --preview-task-id <id>   (for refine)
  --texture-prompt <text>  (for refine)
  --texture-image-url <url> (for refine)
  --ai-model meshy-5|meshy-6|latest
  --model-type standard|lowpoly
  --topology quad|triangle
  --target-polycount <n>
  --should-remesh true|false
  --symmetry-mode off|auto|on
  --pose-mode ""|a-pose|t-pose
  --moderation true|false
  --target-formats glb,obj,fbx,...
  --auto-size true|false
  --enable-pbr true|false       (refine)
  --remove-lighting true|false  (refine)

Image to 3D options:
  --image-url <url>
  --input-task-id <id>
  --should-texture true|false
  --image-enhancement true|false
  (plus common options)

Retexture options:
  --input-task-id <id>
  --model-url <url>
  --text-style-prompt <text>
  --image-style-url <url>
  --enable-original-uv true|false
  --enable-pbr true|false

Remesh options:
  --input-task-id <id>
  --model-url <url>
  --target-formats glb,fbx,obj,...
  --convert-format-only true|false
  --resize-height <meters>
  --origin-at bottom|center

Status / Download / Wait options:
  --type text-to-3d|image-to-3d|retexture|remesh
  --id <task_id>
  --out <dir>                   (download output dir)
  --formats glb,obj,...         (download formats)
  --download <dir>              (wait: auto-download on success)
  --interval <seconds>          (wait: poll interval, default 10)
  --max-wait <seconds>          (wait: timeout, default 600)

List options:
  --type text-to-3d|image-to-3d|retexture|remesh
  --page <n>
  --limit <n>
  --sort +created_at|-created_at

Examples:
  node meshy.mjs text-to-3d --mode preview --prompt "a cute robot"
  node meshy.mjs status --type text-to-3d --id <task_id>
  node meshy.mjs wait --type text-to-3d --id <task_id> --download ./models --formats glb,obj
`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

const args = parseArgs(process.argv.slice(2));
if (!args._command || args.help || args._command === "help") {
  printHelp();
  process.exit(0);
}

const cmd = COMMANDS[args._command];
if (!cmd) {
  die(`Unknown command: ${args._command}. Run --help for usage.`);
}

cmd(args).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
