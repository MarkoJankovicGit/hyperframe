# Step 1 — Project Setup

Create the project folder + bootstrap shared assets.

## Project location

```
hyperframes/videos/bloom-<slug>/
```

The slug is a short kebab-case identifier derived from the topic (`bloom-pick-first-stock`, `bloom-compound-interest`, `bloom-etfs-explained`).

## Bootstrap commands

```bash
# create folders
mkdir -p hyperframes/videos/bloom-<slug>/compositions
mkdir -p hyperframes/videos/bloom-<slug>/logos
mkdir -p hyperframes/videos/bloom-<slug>/generated-assets
mkdir -p hyperframes/videos/bloom-<slug>/snapshots
mkdir -p hyperframes/videos/bloom-<slug>/renders

# copy Bloom marks (always needed)
cp hyperframes/videos/bloomapp-promo/bloom-logo.png  hyperframes/videos/bloom-<slug>/
cp hyperframes/videos/bloomapp-promo/bloom-star.png  hyperframes/videos/bloom-<slug>/
```

## Copy needed stock logos

The shared library is at `hyperframes/assets/logos/` with 29 tickers. Copy ONLY the ones the lesson needs into `hyperframes/videos/bloom-<slug>/logos/` so the renderer can find them via the relative path `logos/<TICKER>.png`.

```bash
cp hyperframes/assets/logos/{AAPL,SBUX,NKE,NFLX}.png  hyperframes/videos/bloom-<slug>/logos/
```

**Why local copies:** the HyperFrames renderer doesn't follow `../../` relative paths reliably. Always copy required logos into `videos/<project>/logos/`.

## Copy chroma-key + split scripts (when generating assets)

If Step 5 will generate assets, drop helpers into `generated-assets/`:

```bash
cp -r .claude/skills/bloom-educational-video/references/chroma-key.py \
      hyperframes/videos/bloom-<slug>/generated-assets/
cp -r .claude/skills/bloom-educational-video/references/split-sheet.py \
      hyperframes/videos/bloom-<slug>/generated-assets/
```

## Reference DESIGN.md

Don't copy it — read it directly from the skill at `.claude/skills/bloom-educational-video/DESIGN.md`. The design is frozen for all Bloom lessons; one source of truth.

## Gate

Before proceeding to Step 2, confirm:

- [ ] `videos/bloom-<slug>/` exists with `compositions/`, `logos/`, `generated-assets/`, `snapshots/`, `renders/` subfolders
- [ ] `bloom-logo.png` and `bloom-star.png` are in the project root
- [ ] Any logos this lesson references (AAPL, SBUX, etc.) are in `videos/bloom-<slug>/logos/`
- [ ] You've read `DESIGN.md` once and have brand colors/fonts in mind
