/**
 * One-off Kie sprite-sheet generator.
 * Posts a prompt to gpt-image-2-text-to-image, polls for the result,
 * downloads the image to the given path, then prints the URL so we can split it.
 *
 * Usage:
 *   node --strip-types --env-file=../../../.env kie-sprite.mts <out-name> "<prompt>"
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";

const API_BASE = "https://api.kie.ai/api/v1";
const MODEL = "gpt-image-2-text-to-image";

const KEY = process.env.KIE_API_KEY;
if (!KEY) {
  console.error("Missing KIE_API_KEY");
  process.exit(1);
}

const [, , outName, prompt] = process.argv;
if (!outName || !prompt) {
  console.error('Usage: kie-sprite.mts <out-name> "<prompt>"');
  process.exit(1);
}

interface TaskResp { code: number; msg: string; data: { taskId: string } }
interface RecordResp {
  code: number; msg: string;
  data: { taskId: string; state: string; resultJson: string; failMsg: string; progress: number };
}

async function createTask(): Promise<string> {
  const resp = await fetch(`${API_BASE}/jobs/createTask`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      input: { prompt, aspect_ratio: "16:9", resolution: "2K", output_format: "png" },
    }),
  });
  if (!resp.ok) throw new Error(`createTask ${resp.status}: ${await resp.text()}`);
  const j = (await resp.json()) as TaskResp;
  if (j.code !== 200) throw new Error(`createTask err: ${j.msg}`);
  return j.data.taskId;
}

async function poll(taskId: string): Promise<string> {
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const resp = await fetch(`${API_BASE}/jobs/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${KEY}` },
    });
    if (!resp.ok) continue;
    const j = (await resp.json()) as RecordResp;
    if (j.data.state === "success") {
      const result = JSON.parse(j.data.resultJson);
      return (result.resultUrls ?? [])[0];
    }
    if (j.data.state === "fail") throw new Error(`failed: ${j.data.failMsg}`);
    process.stdout.write(`\r  [${outName}] ${j.data.state} ${j.data.progress ?? 0}%`);
  }
  throw new Error("timeout");
}

const outDir = "generated-assets/_sheets";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/${outName}.png`;

console.log(`Creating task for ${outName}...`);
const taskId = await createTask();
console.log(`  taskId: ${taskId}`);

const url = await poll(taskId);
console.log(`\n  url: ${url}`);

// download
const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
writeFileSync(outPath, buf);
console.log(`Saved ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
console.log(`URL=${url}`);
