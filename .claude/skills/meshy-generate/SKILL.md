---
name: meshy-generate
description: Generate 3D models using the Meshy AI API. Supports text-to-3D, image-to-3D, retexturing, and remeshing. Use when the user wants to create 3D assets, generate models from prompts or images, apply textures, or convert/optimize 3D meshes.
---

# Meshy Generate

Generate high-quality 3D models via the [Meshy AI](https://www.meshy.ai) API.

## API Key

```
msy_E4Xy0Eu75vWq711eQVToSBLIn60SQkrjlX2U
```

> This key is stored in plaintext because this repo is private and has limited credits.
> Base URL: `https://api.meshy.ai`
> Authorization header: `Authorization: Bearer <API_KEY>`

## Pricing (credits per call)

| Endpoint | Credits |
|----------|---------|
| Text to 3D (Preview) — meshy-6 | 20 |
| Text to 3D (Preview) — other | 10 |
| Text to 3D (Refine) — texture | 10 |
| Image to 3D — meshy-6, no texture | 20 |
| Image to 3D — meshy-6, with texture | 30 |
| Image to 3D — other, no texture | 5 |
| Image to 3D — other, with texture | 15 |
| Multi-Image to 3D — no texture | 5 |
| Multi-Image to 3D — with texture | 15 |
| Retexture | 10 |
| Remesh | 5 |
| Auto-Rigging | 5 |
| Animation | 3 |

Rate limits: 20 req/s, up to 10 concurrent queued tasks (Pro tier). Models expire after 3 days.

## Text to 3D

Two-stage workflow: **Preview** → evaluate geometry → **Refine** → generate textures.

### Preview Stage

`POST /openapi/v2/text-to-3d`

```json
{
  "mode": "preview",
  "prompt": "A cute low-poly robot companion, white and blue colors",
  "ai_model": "latest",
  "model_type": "standard",
  "topology": "triangle",
  "target_polycount": 30000,
  "should_remesh": false,
  "symmetry_mode": "auto",
  "pose_mode": "",
  "moderation": false,
  "target_formats": ["glb", "obj", "fbx"],
  "auto_size": false
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `mode` | string | yes | — | `"preview"` |
| `prompt` | string | yes | — | Description of object, max 600 chars |
| `ai_model` | string | no | `"latest"` | `"meshy-5"`, `"meshy-6"`, `"latest"` |
| `model_type` | string | no | `"standard"` | `"standard"` or `"lowpoly"` |
| `topology` | string | no | `"triangle"` | `"quad"` or `"triangle"` |
| `target_polycount` | int | no | `30000` | 100–300,000 |
| `should_remesh` | bool | no | `false` (meshy-6) | Enable remesh phase |
| `symmetry_mode` | string | no | `"auto"` | `"off"`, `"auto"`, `"on"` |
| `pose_mode` | string | no | `""` | `"a-pose"`, `"t-pose"`, `""` |
| `moderation` | bool | no | `false` | Screen for harmful content |
| `target_formats` | string[] | no | all except 3mf | `["glb","obj","fbx","stl","usdz","3mf"]` |
| `auto_size` | bool | no | `false` | Auto-estimate real-world height |

**Response:** `{ "result": "<task_id>" }`

### Refine Stage

`POST /openapi/v2/text-to-3d`

```json
{
  "mode": "refine",
  "preview_task_id": "<preview_task_id>",
  "ai_model": "latest",
  "enable_pbr": false,
  "texture_prompt": "rusted metal with scratches",
  "remove_lighting": true,
  "moderation": false
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `mode` | string | yes | — | `"refine"` |
| `preview_task_id` | string | yes | — | Succeeded preview task ID |
| `ai_model` | string | no | `"latest"` | Model for refining |
| `enable_pbr` | bool | no | `false` | Generate metallic/roughness/normal maps |
| `texture_prompt` | string | no | — | Text guide for texturing, max 600 chars |
| `texture_image_url` | string | no | — | Image URL/data URI guide for texturing |
| `remove_lighting` | bool | no | `true` | Remove baked shadows/highlights |
| `moderation` | bool | no | `false` | Content moderation |

> Only one of `texture_prompt` or `texture_image_url` should be used. If both provided, `texture_prompt` takes priority.

## Image to 3D

`POST /openapi/v1/image-to-3d`

```json
{
  "image_url": "https://example.com/photo.jpg",
  "ai_model": "latest",
  "model_type": "standard",
  "should_texture": true,
  "should_remesh": false,
  "symmetry_mode": "auto",
  "pose_mode": "",
  "image_enhancement": true,
  "remove_lighting": true,
  "moderation": false,
  "target_formats": ["glb", "obj", "fbx"],
  "auto_size": false
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `image_url` | string | yes* | — | Image URL or base64 data URI |
| `input_task_id` | string | yes* | — | ID of a completed Text-to-Image task |
| `ai_model` | string | no | `"latest"` | `"meshy-5"`, `"meshy-6"`, `"latest"` |
| `model_type` | string | no | `"standard"` | `"standard"` or `"lowpoly"` |
| `should_texture` | bool | no | `true` | Generate textures |
| `should_remesh` | bool | no | `false` (meshy-6) | Enable remesh phase |
| `symmetry_mode` | string | no | `"auto"` | `"off"`, `"auto"`, `"on"` |
| `pose_mode` | string | no | `""` | `"a-pose"`, `"t-pose"`, `""` |
| `image_enhancement` | bool | no | `true` | Optimize input image (meshy-6/latest) |
| `remove_lighting` | bool | no | `true` | Remove baked lighting (meshy-6/latest) |
| `moderation` | bool | no | `false` | Content moderation |
| `target_formats` | string[] | no | all except 3mf | Output formats |
| `auto_size` | bool | no | `false` | Auto-estimate real-world height |

> One of `image_url` or `input_task_id` is required.

## Retexture

Apply new textures to an existing 3D model.

`POST /openapi/v1/retexture`

```json
{
  "input_task_id": "<task_id>",
  "text_style_prompt": "cyberpunk neon glowing circuit patterns",
  "ai_model": "latest",
  "enable_original_uv": true,
  "enable_pbr": false,
  "remove_lighting": true
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `input_task_id` | string | yes* | — | Completed task ID (text-to-3d, image-to-3d, remesh) |
| `model_url` | string | yes* | — | 3D model URL/data URI (glb, gltf, obj, fbx, stl) |
| `text_style_prompt` | string | yes* | — | Texture description, max 600 chars |
| `image_style_url` | string | yes* | — | Style reference image URL/data URI |
| `ai_model` | string | no | `"latest"` | Model for retexturing |
| `enable_original_uv` | bool | no | `true` | Preserve original UVs |
| `enable_pbr` | bool | no | `false` | Generate PBR maps |
| `remove_lighting` | bool | no | `true` | Remove baked lighting |

> One of `input_task_id`/`model_url` and one of `text_style_prompt`/`image_style_url` required.
> If both provided, `input_task_id` and `image_style_url` take priority.

## Remesh

Convert/optimize an existing model to different formats or polygon counts.

`POST /openapi/v1/remesh`

```json
{
  "input_task_id": "<task_id>",
  "target_formats": ["glb", "fbx", "obj"],
  "topology": "triangle",
  "target_polycount": 30000,
  "auto_size": false
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `input_task_id` | string | yes* | — | Completed task ID |
| `model_url` | string | yes* | — | Model URL/data URI |
| `target_formats` | string[] | no | `["glb"]` | `["glb","fbx","obj","usdz","blend","stl","3mf"]` |
| `topology` | string | no | `"triangle"` | `"quad"` or `"triangle"` |
| `target_polycount` | int | no | `30000` | 100–300,000 |
| `resize_height` | number | no | `0` | Resize to height in meters |
| `auto_size` | bool | no | `false` | Auto-estimate height (mutually exclusive with `resize_height`) |
| `origin_at` | string | no | `"bottom"` if auto_size | `"bottom"` or `"center"` |
| `convert_format_only` | bool | no | `false` | Only convert format, ignore remesh params |

## Task Status & Retrieval

All tasks share a common status lifecycle: `PENDING` → `IN_PROGRESS` → `SUCCEEDED` | `FAILED` | `CANCELED`

### Retrieve a Task

- Text to 3D: `GET /openapi/v2/text-to-3d/:id`
- Image to 3D: `GET /openapi/v1/image-to-3d/:id`
- Retexture: `GET /openapi/v1/retexture/:id`
- Remesh: `GET /openapi/v1/remesh/:id`

**Task object fields:**

| Field | Description |
|-------|-------------|
| `id` | Task UUID |
| `type` | Task type (`text-to-3d-preview`, `text-to-3d-refine`, `image-to-3d`, `retexture`, `remesh`) |
| `status` | `PENDING`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`, `CANCELED` |
| `progress` | 0–100 |
| `model_urls` | Object with download URLs: `glb`, `fbx`, `obj`, `usdz`, `mtl`, `stl`, `3mf`, `blend` |
| `texture_urls` | Array of `{ base_color, metallic, normal, roughness, emission }` |
| `thumbnail_url` | Preview thumbnail image |
| `task_error.message` | Error details if failed |
| `preceding_tasks` | Queue position (meaningful when `PENDING`) |
| `created_at`, `started_at`, `finished_at` | Millisecond timestamps |

### List Tasks

- Text to 3D: `GET /openapi/v2/text-to-3d?page_num=1&page_size=10&sort_by=-created_at`
- Image to 3D: `GET /openapi/v1/image-to-3d?...`
- Retexture: `GET /openapi/v1/retexture?...`
- Remesh: `GET /openapi/v1/remesh?...`

### Delete a Task

- Text to 3D: `DELETE /openapi/v2/text-to-3d/:id`
- Image to 3D: `DELETE /openapi/v1/image-to-3d/:id`
- Retexture: `DELETE /openapi/v1/retexture/:id`
- Remesh: `DELETE /openapi/v1/remesh/:id`

### Stream Progress (SSE)

- Text to 3D: `GET /openapi/v2/text-to-3d/:id/stream`
- Image to 3D: `GET /openapi/v1/image-to-3d/:id/stream`
- Retexture: `GET /openapi/v1/retexture/:id/stream`
- Remesh: `GET /openapi/v1/remesh/:id/stream`

Server-Sent Events stream. For pending/in-progress tasks, only `progress` and `status` are sent.

## CLI Tool

A Node.js helper script is included in `scripts/meshy.mjs`:

```bash
node .claude/skills/meshy-generate/scripts/meshy.mjs <command> [options]
```

### Commands

| Command | Description |
|---------|-------------|
| `text-to-3d` | Create a text-to-3D preview or refine task |
| `image-to-3d` | Create an image-to-3D task |
| `retexture` | Create a retexture task |
| `remesh` | Create a remesh task |
| `status` | Check task status |
| `list` | List tasks |
| `download` | Download model files from a completed task |
| `wait` | Poll a task until it succeeds or fails |

### Examples

```bash
# Text to 3D preview
node .claude/skills/meshy-generate/scripts/meshy.mjs text-to-3d \
  --mode preview \
  --prompt "a cyberpunk drone with glowing blue thrusters"

# Refine a preview task
node .claude/skills/meshy-generate/scripts/meshy.mjs text-to-3d \
  --mode refine \
  --preview-task-id <id> \
  --texture-prompt "rusted weathered metal with scratches"

# Image to 3D
node .claude/skills/meshy-generate/scripts/meshy.mjs image-to-3d \
  --image-url "https://example.com/chair.jpg"

# Check status
node .claude/skills/meshy-generate/scripts/meshy.mjs status \
  --type text-to-3d \
  --id <task_id>

# Wait for completion and download
node .claude/skills/meshy-generate/scripts/meshy.mjs wait \
  --type text-to-3d \
  --id <task_id> \
  --download ./models \
  --formats glb,obj

# List recent tasks
node .claude/skills/meshy-generate/scripts/meshy.mjs list \
  --type text-to-3d \
  --limit 10
```

## Best Practices

1. **Preview before refine** — Always check the preview mesh geometry before spending credits on refinement.
2. **Specify target_formats** — Request only the formats you need to reduce task completion time.
3. **Download promptly** — API-generated models expire after 3 days.
4. **Use moderation sparingly** — Only enable if generating user-facing content.
5. **Low-poly for games** — Use `model_type: "lowpoly"` for real-time applications.
6. **PBR for realism** — Enable `enable_pbr` during refine/retexture for metallic/roughness/normal maps.
7. **Queue awareness** — Check `preceding_tasks` to estimate wait time when status is `PENDING`.

## Error Codes

| Code | Meaning |
|------|---------|
| `400` | Bad Request — missing/invalid params, prompt too long |
| `401` | Unauthorized — invalid API key |
| `402` | Payment Required — insufficient credits |
| `404` | Not Found — task does not exist |
| `429` | Too Many Requests — rate limit exceeded |
