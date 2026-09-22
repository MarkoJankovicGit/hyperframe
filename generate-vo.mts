/**
 * Voiceover generation script with word-level timing.
 *
 * Usage:
 *   node --strip-types --env-file=.env generate-vo.mts <composition-id>
 *
 * Reads scenes from scripts/<composition-id>.json and generates:
 *   - assets/voiceover/<composition-id>/scene-XX.mp3  (audio)
 *   - assets/voiceover/<composition-id>/scene-XX.timing.json  (word timestamps)
 *   - assets/voiceover/<composition-id>/timing.json  (all scenes combined)
 *
 * Scene script format (scripts/<id>.json):
 *   [{ "id": "scene-01", "text": "Your narration here." }, ...]
 *
 * Reference audio in compositions:
 *   <audio id="vo" data-start="0" data-duration="auto" data-track-index="2"
 *          src="assets/voiceover/<id>/scene-01.mp3" data-volume="1"></audio>
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";

// --- Config ---
const voiceOverride = process.argv.find((a) => a.startsWith("--voice="))?.split("=")[1];
const modelOverride = process.argv.find((a) => a.startsWith("--model="))?.split("=")[1];
const speedOverride = Number(process.argv.find((a) => a.startsWith("--speed="))?.split("=")[1] ?? "1");
const VOICE_ID = voiceOverride ?? "JZ3e95uoTACVf6tXaaEi";
const MODEL_ID = modelOverride ?? "eleven_multilingual_v2";
const VOICE_SPEED = Number.isFinite(speedOverride) ? speedOverride : 1;
const FPS = 30;

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY — copy .env.example to .env and add your key");
  process.exit(1);
}

const compositionId = process.argv[2];
if (!compositionId) {
  console.error("Usage: node --strip-types --env-file=.env generate-vo.mts <composition-id>");
  console.error("Example: node --strip-types --env-file=.env generate-vo.mts market-time");
  process.exit(1);
}

// --- Types ---
interface Scene {
  id: string;
  text: string;
}

interface WordTiming {
  word: string;
  start: number;
  end: number;
  startFrame: number;
  endFrame: number;
}

interface SceneTiming {
  sceneId: string;
  text: string;
  words: WordTiming[];
  durationSeconds: number;
  durationFrames: number;
}

interface ElevenLabsTimestampResponse {
  audio_base64: string;
  alignment: {
    characters: string[];
    character_start_times_seconds: number[];
    character_end_times_seconds: number[];
  };
}

// --- Load scenes ---
const scriptPath = `scripts/${compositionId}.json`;
if (!existsSync(scriptPath)) {
  console.error(`Script file not found: ${scriptPath}`);
  console.error(`Create it as a JSON array: [{ "id": "scene-01", "text": "..." }, ...]`);
  process.exit(1);
}

const SCENES: Scene[] = JSON.parse(readFileSync(scriptPath, "utf-8"));

// --- Output dirs ---
const outDir = `assets/voiceover/${compositionId}`;
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
if (!existsSync("scripts")) mkdirSync("scripts", { recursive: true });

// --- Character to word conversion ---
function charsToWords(
  chars: string[],
  starts: number[],
  ends: number[],
): WordTiming[] {
  const words: WordTiming[] = [];
  let currentWord = "";
  let wordStart = -1;
  let wordEnd = -1;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === " " || char === "\n" || char === "\t") {
      if (currentWord.length > 0) {
        words.push({
          word: currentWord,
          start: wordStart,
          end: wordEnd,
          startFrame: Math.round(wordStart * FPS),
          endFrame: Math.round(wordEnd * FPS),
        });
        currentWord = "";
        wordStart = -1;
      }
    } else {
      if (currentWord.length === 0) wordStart = starts[i];
      currentWord += char;
      wordEnd = ends[i];
    }
  }

  if (currentWord.length > 0) {
    words.push({
      word: currentWord,
      start: wordStart,
      end: wordEnd,
      startFrame: Math.round(wordStart * FPS),
      endFrame: Math.round(wordEnd * FPS),
    });
  }

  return words;
}

// --- Generate a single scene ---
async function generateScene(scene: Scene): Promise<SceneTiming> {
  const audioPath = `${outDir}/${scene.id}.mp3`;
  const timingPath = `${outDir}/${scene.id}.timing.json`;

  if (existsSync(audioPath) && existsSync(timingPath)) {
    console.log(`  ✓ ${scene.id} already exists, loading timing`);
    return JSON.parse(readFileSync(timingPath, "utf-8"));
  }

  console.log(`  ⏳ Generating ${scene.id}...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: MODEL_ID,
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.3, speed: VOICE_SPEED },
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ElevenLabs error for ${scene.id}: ${response.status} ${body}`);
  }

  const data = (await response.json()) as ElevenLabsTimestampResponse;

  const audioBuf = Buffer.from(data.audio_base64, "base64");
  writeFileSync(audioPath, audioBuf);

  const words = charsToWords(
    data.alignment.characters,
    data.alignment.character_start_times_seconds,
    data.alignment.character_end_times_seconds,
  );

  const lastWord = words[words.length - 1];
  const durationSeconds = lastWord ? lastWord.end + 0.5 : 3;
  const durationFrames = Math.round(durationSeconds * FPS);

  const sceneTiming: SceneTiming = {
    sceneId: scene.id,
    text: scene.text,
    words,
    durationSeconds,
    durationFrames,
  };

  writeFileSync(timingPath, JSON.stringify(sceneTiming, null, 2));

  console.log(
    `  ✅ ${scene.id} (${(audioBuf.length / 1024).toFixed(1)} KB, ${words.length} words, ${durationFrames}f)`,
  );

  return sceneTiming;
}

// --- Concurrency limiter ---
// 1 = serial. ElevenLabs returns 409 "already_running" when multiple requests hit
// the same voice concurrently, so parallel scene generation must stay disabled.
const MAX_CONCURRENT = 1;

async function runWithConcurrency<T>(
  items: T[],
  fn: (item: T) => Promise<unknown>,
): Promise<void> {
  let idx = 0;
  const workers = Array.from({ length: Math.min(MAX_CONCURRENT, items.length) }, async () => {
    while (idx < items.length) {
      const i = idx++;
      await fn(items[i]);
    }
  });
  await Promise.all(workers);
}

// --- Main ---
async function main() {
  console.log(`\nGenerating voiceover for "${compositionId}" with word timing...`);
  console.log(`  Concurrency: ${MAX_CONCURRENT} parallel requests\n`);

  const allTimings: SceneTiming[] = new Array(SCENES.length);

  await runWithConcurrency(
    SCENES.map((scene, i) => ({ scene, i })),
    async ({ scene, i }) => {
      allTimings[i] = await generateScene(scene);
    },
  );

  writeFileSync(`${outDir}/timing.json`, JSON.stringify(allTimings, null, 2));

  const totalFrames = allTimings.reduce((sum, s) => sum + s.durationFrames, 0);
  const totalWords = allTimings.reduce((sum, s) => sum + s.words.length, 0);

  console.log(`\n--- Summary ---`);
  console.log(`Scenes:  ${allTimings.length}`);
  console.log(`Words:   ${totalWords}`);
  console.log(`Frames:  ${totalFrames} (${(totalFrames / FPS).toFixed(1)}s at ${FPS}fps)`);
  console.log(`\nsceneDurations: [${allTimings.map((s) => s.durationFrames).join(", ")}]`);
  console.log(`\nFiles: ${outDir}/`);
}

main().catch((err) => { console.error(err); process.exit(1); });
