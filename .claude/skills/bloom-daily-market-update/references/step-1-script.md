# Step 1 — Today's Script

The skill doesn't research the market itself. It hands the user a research-agent prompt to paste into Perplexity / Gemini Deep Research / Claude with web access / their tool of choice. The agent returns a single paragraph; the skill saves it as JSON and continues.

## What to do when this step fires

When the slash command `/bloom-daily-market-update [date]` runs, output **exactly** the message below to the user, filled in with today's date. Don't paraphrase, don't shorten, don't comment on it — just print the prompt for them to copy.

---

## The hand-off message (output this verbatim, with the date filled in)

> **Step 1 — get today's script**
>
> Pass this prompt to your research agent (Perplexity, Gemini Research, Claude with web access, etc.). It will return a single paragraph of narration. Paste the result back here and I'll save it to `scripts/bloom-market-<DATE>.json` and continue.
>
> ---
>
> ```
> You are writing a 30–40 second narration script for Bloom's Daily Market Update — a vertical short for Bloom (a Gen-Z investing app). Voice: confident, friendly, clear. Think "trusted older sibling who's good with money."
>
> DATE: <DATE>
>
> Research today's US market session and write the narration as ONE conversational paragraph following this structure:
>
> 1. OPENER (always exactly): "Today's market, in thirty seconds."
> 2. LEADERS + LAGGARDS (1 sentence): Name 2–3 specific indices or tickers, with directional %s, that led and lagged today.
> 3. STORY 1 (1–2 sentences): The biggest market story today — sector breakout, geopolitical, earnings surprise, or major data release.
> 4. STORY 2 (1–2 sentences): The other big story, ideally the second-order effect of story 1 (e.g. "higher energy keeps inflation sticky, which makes the Fed's path harder to read").
> 5. BOTTOM LINE (1 sentence): Three quick stances — "bullish on X, cautious on Y, focused on Z."
> 6. SIGN-OFF (always exactly): "That's your daily pulse. See you tomorrow."
>
> CONSTRAINTS
> - Total: ≈ 85–115 words (reads in 30–40s at natural pace).
> - Tone: confident, conversational, slightly punchy. Use contractions ("Fed's", "doesn't", "rally's"). Never academic.
> - Audience: a young investor scrolling Instagram/TikTok. Speak like a friend, not a Bloomberg terminal.
> - Use specific tickers / indices / %s ONLY from real, today's data. Never invent numbers.
> - No bullet points, no markdown, no emojis, no headings — return one flowing paragraph.
> - Don't address the viewer as "you" or open with "Good morning" — neutral observer voice.
> - Don't include disclaimers, sources, or research footnotes.
>
> OUTPUT
> Return only the narration paragraph, ready to paste. No preamble, no explanation, no formatting. Just the spoken text.
> ```
>
> ---
>
> When you have the script, paste it here and I'll save it + start step 2 (VO generation).

---

## What to do when the user pastes the script back

1. Save it to `scripts/bloom-market-<date>.json` in this exact format:

```json
[
  { "id": "scene-01", "text": "<the entire returned narration>" }
]
```

2. Don't edit the script — preserve commas, capitalization, contractions exactly. The TTS pipeline + word-timing depends on the exact text the user approved.

3. Light validation:
   - Word count between 80 and 130 (otherwise gently flag — too short = sparse beats, too long = >40s won't fit)
   - Opens with "Today's market, in thirty seconds."
   - Closes with "See you tomorrow."
   - If either opener / sign-off is missing, ask the user once: "the opener / sign-off is missing — should I add it for brand consistency, or did you want a custom intro?"

4. After saving, move on to step 2 (VO generation via `node --strip-types --env-file=.env generate-vo.mts <date-id>`).

## Edge cases

- **User pastes their own script directly** (skipping the research agent): same flow — save it, validate lightly, continue.
- **User wants to research themselves and skip the prompt**: also fine. Same save + validate.
- **Markets closed today** (weekend / holiday): the research agent should default to "the most recent trading session" and the script can lead with "On Friday's close…" Validate the opener still appears.
- **User wants a different opener/sign-off** (e.g. branded variations like "Bloom Market Pulse, Wednesday edition"): save without flagging — they're explicitly overriding brand defaults.

## Why hand-off and not in-skill research

The skill's job is video production, not market research. Research agents have:
- Live web access
- Better source-aggregation for timely data
- Configurable depth (Perplexity Pro, Gemini Deep Research)
- Are owned by the user — they choose their tool

This keeps the skill focused and lets the user pick whichever research agent they trust most that day.
