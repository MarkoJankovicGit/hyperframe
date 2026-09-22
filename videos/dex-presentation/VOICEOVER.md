# DEX — Voiceover produkciona skripta (ElevenLabs)

**Jezik:** engleski · **Video:** 1920×1080 @ **30 fps** · **Ukupno:** 1611 frejmova = **53.70 s**
Naracija je podeljena na **8 klipova** (po jedan po sceni). Svaki klip se generiše zasebno i
snima kao `scene-01.mp3 … scene-08.mp3` u `assets/voiceover/dex-presentation/`.

> Tempo je „premium / keynote" — smireno, sa pauzama. Crtice `—` i tačke nose pauze; ne žuri.

---

## ElevenLabs podešavanja (isto kao u trenutnom videu)

| Parametar | Vrednost | UI slajder |
| --------- | -------- | ---------- |
| **Model** | `eleven_multilingual_v2` | „Multilingual v2" |
| **Voice ID** | `JZ3e95uoTACVf6tXaaEi` | (default projekta — slobodno zameni svojim glasom) |
| **Stability** | `0.5` | 50% |
| **Similarity** | `0.75` | 75% |
| **Style** | `0.3` | 30% |
| **Speed** | `1.0` | normalno |
| **Format** | MP3, 30 fps reference | — |

API (po klipu): `POST /v1/text-to-speech/JZ3e95uoTACVf6tXaaEi` (ili `/with-timestamps`) sa
`voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.3, speed: 1 }`.

---

## Mapa scena → frejmovi → tekst

> „Trajanje" uključuje ~0.5 s tišine na kraju klipa (tako legne u scenu). Govor je za toliko kraći.

### scene-01 · Hook
- **Timecode:** 0:00.0 – 0:09.1 · **Frejmovi:** 0 – 274 · **Trajanje:** 9.13 s (274f) · ~20 reči
```
Behind Southeast Europe's most demanding software — the banks, the institutions, the enterprises — you'll often find the same name.
```

### scene-02 · Logo reveal
- **Timecode:** 0:09.1 – 0:11.8 · **Frejmovi:** 274 – 353 · **Trajanje:** 2.63 s (79f) · ~3 reči
```
DEX. Digital Experience.
```

### scene-03 · Heritage
- **Timecode:** 0:11.8 – 0:21.6 · **Frejmovi:** 353 – 649 · **Trajanje:** 9.87 s (296f) · ~23 reči
```
For three decades, we've engineered the systems that run serious business — innovative software, built to automate the work that holds companies back.
```

### scene-04 · Proizvodi
- **Timecode:** 0:21.6 – 0:29.6 · **Frejmovi:** 649 – 887 · **Trajanje:** 7.93 s (238f) · ~17 reči
```
A modular platform you can shape to fit. Custom development, end to end. Human resources. Document management.
```

### scene-05 · RPA
- **Timecode:** 0:29.6 – 0:36.5 · **Frejmovi:** 887 – 1096 · **Trajanje:** 6.97 s (209f) · ~17 reči
```
And robotic process automation — so the repetitive work runs itself, and your people don't have to.
```

### scene-06 · Scale
- **Timecode:** 0:36.5 – 0:42.1 · **Frejmovi:** 1096 – 1263 · **Trajanje:** 5.57 s (167f) · ~13 reči
```
More than a hundred experts. Over fifty clients. Trusted right across the region.
```

### scene-07 · Leadership
- **Timecode:** 0:42.1 – 0:47.8 · **Frejmovi:** 1263 – 1434 · **Trajanje:** 5.70 s (171f) · ~13 reči
```
That's what makes us the region's leader in custom development and intelligent automation.
```

### scene-08 · Outro
- **Timecode:** 0:47.8 – 0:53.7 · **Frejmovi:** 1434 – 1611 · **Trajanje:** 5.90 s (177f) · ~13 reči
```
We don't just deliver software. We become your digital colleague. DEX. Digital Experience.
```

---

## Alternativa: jedan blok sa pauzama (ako generišeš jedan fajl)

Koristi `<break>` tagove da pauze legnu na rez između scena (radi sa multilingual v2):

```
Behind Southeast Europe's most demanding software — the banks, the institutions, the enterprises — you'll often find the same name. <break time="0.7s" />
DEX. Digital Experience. <break time="0.8s" />
For three decades, we've engineered the systems that run serious business — innovative software, built to automate the work that holds companies back. <break time="0.6s" />
A modular platform you can shape to fit. Custom development, end to end. Human resources. Document management. <break time="0.6s" />
And robotic process automation — so the repetitive work runs itself, and your people don't have to. <break time="0.6s" />
More than a hundred experts. Over fifty clients. Trusted right across the region. <break time="0.6s" />
That's what makes us the region's leader in custom development and intelligent automation. <break time="0.6s" />
We don't just deliver software. We become your digital colleague. <break time="0.5s" /> DEX. Digital Experience.
```

---

## Važno za sinhronizaciju

- Ako generišeš **istim glasom i tekstom**, trajanja će biti praktično ista i klipovi legnu bez izmena.
- Ako **promeniš glas** (ili tekst), trajanja se menjaju → reci mi nova trajanja po sceni (ili mi pošalji nove `scene-0X.mp3`), pa **resinhronizujem ofsete** u `index.html` i ponovo renderujem.
- Postojeći klipovi i tačan word-level timing su u `assets/voiceover/dex-presentation/` (`scene-0X.mp3`, `scene-0X.timing.json`, `timing.json`).
- Najlakši put za nov glas: izmeni voice ID i pokreni `node --strip-types --env-file=../../.env ../../generate-vo.mts dex-presentation --voice=<NOVI_ID>` (skripta sama pravi MP3 + timing).
