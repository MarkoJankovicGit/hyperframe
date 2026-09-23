# Claude Code zadatak — Mamin vodič razvojni timeline

Radi na repou `MarkoJankovicGit/hyperframe`, na postojećoj grani:

```bash
git fetch origin
git switch feat/mamin-vodic-video
git pull --ff-only origin feat/mamin-vodic-video
```

## Cilj

Napravi jednu samostalnu HyperFrames kompoziciju koja za 7 sekundi jasno prikazuje plan razvoja projekta Mamin vodič. Kompozicija će kasnije biti ugrađena u najavni video za 2027.

Pre pisanja koda pročitaj `AGENTS.md` i `CLAUDE.md`, zatim koristi `/hyperframes` i `/gsap` veštine.

Pre nego što napraviš svoju komponentu, otvori postojeću
`compositions/mamin-vodic-app-collapse.html` u HyperFrames preview-u. Proveri približno kadrove
`0.8s`, `2.8s`, `4.8s`, `6.5s` i `7.8s`. Nemoj menjati taj fajl: ako primetiš problem,
zapiši tačan kadar i opis problema u završnom izveštaju.

## Fajl

Napravi samo:

`compositions/mamin-vodic-development-timeline.html`

Ne menjaj `compositions/mamin-vodic-app-collapse.html`, postojeće video projekte, `package.json`, konfiguraciju niti druge kompozicije.

## Tehnički zahtevi

- Format: `1080 × 1920`, vertikalni video, 30 fps.
- Trajanje: tačno `7` sekundi.
- Composition ID: `mamin-vodic-development-timeline`.
- Jedan skriveni driver element mora imati `class="clip"`, `data-start="0"`, `data-duration="7"`, `data-track-index="0"`.
- GSAP timeline mora biti `paused: true` i registrovan kao:

```js
window.__timelines["mamin-vodic-development-timeline"] = tl;
```

- Koristi HTML/CSS/SVG i GSAP 3.14.2.
- Bez `requestAnimationFrame`, `Date.now`, `Math.random`, beskonačnih animacija i `setTimeout` inicijalizacije.
- Bez mrežnih slika, Google Fonts zahteva i novih CDN biblioteka. Dozvoljen je postojeći GSAP CDN obrazac iz projekta.
- Sav tekst mora ostati čitljiv u mobilnom prikazu i u safe zoni od najmanje 72 px sa svih strana.

## Vizuelni jezik

Koristi identitet Maminog vodiča:

- navy `#24345F`
- coral `#F26973`
- cream `#FFF8F2`
- peach `#FFDCCB`
- soft lavender `#E8E0F5`
- font stack: `"Manrope", "Inter", system-ui, sans-serif`

Izgled treba da bude topao, premium i precizan. Bez neon boja, cyberpunk efekata, glitcha, glassmorphism preterivanja ili generičnog korporativnog plavog dizajna.

## Sadržaj

Naslov na početku:

**Plan razvoja Maminog vodiča**

Prikaži četiri etape na jednoj vertikalnoj putanji:

1. **Demo je spreman**  
   Oznaka: `DANAS`  
   Podtekst: `Interaktivni prototip`

2. **Testiranje sa zajednicom**  
   Oznaka: `SLEDEĆE`  
   Podtekst: `100 mama + 50 trudnica`

3. **Web aplikacija**  
   Oznaka: `6 MESECI`  
   Podtekst: `Od početka finansiranog razvoja`

4. **iOS i Android**  
   Oznaka: `12 MESECI`  
   Podtekst: `Mobilna aplikacija`

Na dnu sitnije, ali jasno:

**Rokovi se računaju od početka finansiranog razvoja.**

Ne predstavljaj web ili mobilnu aplikaciju kao već završenu. Samo demo je trenutna faza.

## Animacija

- `0.0–0.8s`: naslov ulazi maskiranim vertikalnim revealom.
- `0.5–5.8s`: coral linija raste odozgo nadole kroz četiri etape.
- Svaka etapa se aktivira kada je linija dostigne: tačka dobija kratak pulse, kartica izlazi iz dubine i tekst postaje oštar.
- Trenutna etapa `Demo je spreman` treba da ostane vizuelno najnaglašenija.
- Buduće etape su jasne, ali nešto mirnije.
- Kroz ceo kadar koristi veoma blag parallax pozadinskih oblika.
- `5.8–7.0s`: sve četiri etape ostaju vidljive da gledalac može da pročita plan.
- Animacija mora izgledati ispravno pri nasumičnom seek-u; svako stanje mora zavisiti samo od GSAP timeline vremena.

## Logo

Ako koristiš znak Maminog vodiča, ugradi ovaj SVG direktno u HTML:

```html
<svg viewBox="0 0 100 100" aria-label="Mamin vodič">
  <path d="M18,84 V44 A16,16 0 0 1 50,44 V58 M50,44 A16,16 0 0 1 82,44 V84"
    fill="none" stroke="#24345F" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="50" cy="78" r="9" fill="#F26973" />
</svg>
```

## Provera i završetak

Pokreni:

```bash
npx hyperframes lint
```

Ispravi sve greške. Zatim otvori preview i proveri kadrove približno na `0.5s`, `2.0s`, `3.5s`, `5.0s` i `6.5s`. Proveri da ništa nije isečeno i da se svih četiri etape mogu pročitati na 1080 × 1920.

Commituj samo svoj novi fajl:

```bash
git add compositions/mamin-vodic-development-timeline.html
git commit -m "feat: add Mamin vodic development timeline"
git push origin feat/mamin-vodic-video
```

Na kraju vrati:

1. commit SHA;
2. rezultat linta;
3. putanje do screenshotova ili preview rendera;
4. kratak opis eventualnog odstupanja od specifikacije.
