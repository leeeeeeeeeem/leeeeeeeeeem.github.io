# SPEC: Stefano Lemerle's homepage

Build spec for Claude Code. Read this whole file before writing code. Where it says **[CONFIRM]**, ask Stefano instead of guessing. Where it says **[VERIFY]**, the claim came from docs or search and was never run, so test it early.

## 0. Working rules for the agent

- Design tone is restrained: read section 1.1 before any visual work. When in doubt, subtract.
- Never invent content: no papers, results, metrics, project descriptions, quotes, or dates. Missing facts become explicit placeholders (`[TODO: ...]`) that fail the build in CI if left in production content (see section 12).
- Static site only. No server code, no runtime API calls, no analytics, no third-party requests (no CDN fonts, no embeds).
- No new runtime dependencies without asking. Dev dependencies are fine.
- Keep EN and IT content in lockstep. Italian copy is a draft by an AI and must be marked `// REVIEW` until Stefano approves it.
- Before every commit: `npm run check && npm run build`. Before calling a milestone done, run the acceptance checks in section 12 and look at screenshots at 1440, 1024 and 390 px wide in both languages.
- The site is NOT an interactive terminal. Nothing is typed. It is a normal website that looks like a TUI.

## 1. Purpose and audience

A general personal homepage for Stefano Lemerle (MSc student, Computer Engineering, AI and data analytics, Politecnico di Torino; BSc also Computer Engineering; exchange semester at KAIST, fall 2026).

Audiences: research labs (first: KAIST MACLab, Prof. Juhan Nam), companies, and Italian readers. It must satisfy what MACLab asks for when contacting the professor: a **portfolio as a homepage** with introduction, research interests, research papers, class or personal projects, and music/art/creative works, plus a **CV**. There are no papers yet: do not render a papers pane until the data file has an entry (section 6.6).

Tone: understated, concrete, short sentences. A busy professor should see who Stefano is, what he has built, and how to reach him within one screen.

### 1.1 Design tone (read this first; it overrides every other section on decoration)

**Very simple and clean. Nothing flashy.** Plain and austere, the way a TUI is. Content comes first. The TUI look comes from monospace type, a character grid, thin borders and one statusline, not from effects.

Reference points (Stefano's judgement; both pages could only be read as extracted text, not seen rendered, so the notes below come from their structure):

- **stefvuck.dev: too much, looks vibe-coded, exactly what to avoid.** From its text it appears to stack a fake terminal window title bar, a theme switcher, a neovim-style statusline (mode, filename, encoding, cursor position), shell prompt lines with an "interactive" command and a cursor, emoji beside labels, a row of stat counters, an ASCII portrait, a command-styled call to action, and repeated terminal blocks. It also appears to use the same ingredients as this spec (Catppuccin Mocha base, WebTUI), so the stack is not the problem. Stacking metaphors and decoration is.
- **justin.run: better, but slightly too simple.** A short nav of five plain text links, one heading, a one-sentence bio, a line of links, a horizontal rule. This site needs more structure than that (a photo, project rows, a player, research notes) and a clear hierarchy, but no added decoration.

Target: between the two, much nearer to justin.run. Ship the restrained version first; Stefano and Claude iterate on design together, and anything beyond the budget below is proposed as a small, separate change.

**One metaphor only:** bordered panes plus a tmux-style statusline. Do not layer others on top (window chrome, vim statusline, shell prompts, filenames as labels).

**Not allowed in v1** (add only if Stefano asks):

- terminal window chrome (title bar, traffic-light dots), fake prompts or commands (`$ cat ...`), command-styled calls to action, typing, boot or loading animations
- blinking cursor, glow, text shadow, gradients, blur, scanlines, CRT effects, parallax, particles, hover transforms, scroll animations, a theme switcher
- emoji; icon decoration (icons only in the links row, small, with text labels)
- ASCII-art banners or portraits; decorative rules built from repeated characters other than the pane borders
- stat counters, skill bars, tag or badge walls, "10+ technologies" summaries, testimonials, "hire me" buttons
- more than one accent colour, border style or border weight; boxes nested inside boxes
- marketing copy ("passionate", "crafting", "building the future"); write plain statements

**Style budget:**

- Backgrounds: `base` for the page, `mantle` for the statusline only.
- Text: `text`, plus `subtext0` for labels. Nothing else.
- One accent (blue): links, focus ring, pane titles, the active statusline window. Green and yellow appear only on `[live]` and `[wip]` labels.
- One border style (round or square, pick one; start with round) in `overlay0`.
- Motion: none, except an instant (or at most 100ms) colour change on hover and focus.
- Spacing generous: `1lh` between blocks, `2ch` padding inside panes.
- Type: one body size. The name may be modestly larger (at most 1.5x); headings differ by colour or weight, not size.

**Restraint review** before every milestone: for each visible element ask "does this help someone read or reach something?" If not, remove it. Check the not-allowed list. The default response to "this feels like too much" is to subtract, never to restyle.

## 2. Hosting (decided)

- GitHub user `leeeeeeeeeem`. Repo `leeeeeeeeeem/leeeeeeeeeem.github.io` (public). Site: `https://leeeeeeeeeem.github.io`. No custom domain. Base path is empty.
- GitHub Pages is static hosting only: no PHP/Ruby/Python or any server-side code. Free accounts need a public repo for Pages.
- Limits (docs): published site at most 1 GB, repo recommended at most 1 GB, soft bandwidth 100 GB/month, soft 10 builds/hour (does not apply to a custom Actions workflow), deploys time out after 10 minutes. This site should be well under 20 MB. Source: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Consequences: contact is `mailto:`; audio is static files; no form backend.

## 3. Stack

- **SvelteKit + `@sveltejs/adapter-static`**, Svelte 5, TypeScript, plain CSS (custom properties). Scaffold with `npx sv create`.
- **SvelteKit 3 note:** as of the docs read on 2026-10-17, config lives in `vite.config.js` (`sveltekit({...})` plugin options), and `svelte.config.js` is no longer supported. Most tutorials online are older. Follow https://svelte.dev/docs/kit/adapter-static **[VERIFY against current docs]**.
- Prerender everything: `export const prerender = true;` in the root `+layout.ts`. Do NOT set `ssr = false` (it would prerender empty shells). Do NOT use SPA fallback mode (docs note large performance and SEO costs). Use `fallback: '404.html'` for the GitHub Pages 404 page.
- `trailingSlash = 'always'` in the root layout, so output is `/it/index.html`, which Pages always serves **[VERIFY after first deploy]**.
- Internal links via `resolve()` from `$app/paths`.
- Deploy via GitHub Actions (section 11), not a branch push.

## 4. Visual design

### 4.1 Concept

A page that looks like a terminal multiplexer session: titled bordered panes stacked in a column, a sticky tmux-style statusline at the bottom as navigation, monospace everywhere, everything snapped to a character grid. Nothing else: section 1.1 lists what is not allowed.

### 4.2 Palette: Catppuccin Mocha with blue accent

Hex values from the Catppuccin README (MIT). Contrast ratios are against `base` `#1e1e2e` (computed, WCAG relative luminance).

| Token | Hex | Role | Contrast on base |
|---|---|---|---|
| base | `#1e1e2e` | page background | n/a |
| mantle | `#181825` | statusline, pane headers | n/a |
| crust | `#11111b` | deepest wells (player track, photo frame bg) | n/a |
| surface0 | `#313244` | selected row, inline code bg | n/a |
| surface1 | `#45475a` | subtle dividers (decorative only) | 1.8 |
| surface2 | `#585b70` | decorative only, never text | 2.5 |
| overlay0 | `#6c7086` | pane borders (3.4:1 passes for UI borders) | 3.4 |
| overlay1 | `#7f849c` | decoration only (4.4:1 misses AA for text) | 4.4 |
| overlay2 | `#9399b2` | secondary text | 5.8 |
| subtext0 | `#a6adc8` | secondary text, labels | 7.4 |
| subtext1 | `#bac2de` | body secondary | 9.3 |
| text | `#cdd6f4` | body text | 11.3 |
| **blue** | `#89b4fa` | **the accent**: links, focus ring, active window, pane titles, `>` markers | 7.8 |
| lavender | `#b4befe` | accent hover | 9.2 |
| sapphire | `#74c7ec` | secondary accent (sparingly) | 8.7 |
| green | `#a6e3a1` | `[live]` status | 11.0 |
| yellow | `#f9e2af` | `[wip]` status | 12.9 |
| red | `#f38ba8` | errors only | 7.1 |
| mauve `#cba6f7`, peach `#fab387`, teal `#94e2d5`, sky `#89dceb`, pink `#f5c2e7`, rosewater `#f5e0dc`, flamingo `#f2cdcd`, maroon `#eba0ac` | | unused by default; available | |

Rules: dark only (`color-scheme: dark`); one accent (blue); status colors are semantic, always paired with a text label (`[live]`, `[wip]`), never color alone. The style budget in section 1.1 applies. Define all tokens as `--ctp-*` custom properties on `:root`, then semantic aliases (`--bg`, `--bg-alt`, `--fg`, `--fg-muted`, `--accent`, `--border`).

### 4.3 Typography

- **JetBrains Mono**, self-hosted variable woff2 (OFL-1.1, free for any use; include the licence file in the repo). Source: the JetBrains/JetBrainsMono repo or the `@fontsource-variable/jetbrains-mono` package, your choice. Needed coverage: Basic Latin, Latin-1 Supplement (Italian accents: à è é ì ò ù), box-drawing U+2500 to U+257F, block elements U+2580 to U+259F, and the arrows/punctuation used in copy.
- **Ligatures ON** (the default `calt` behaviour). Do not use the NL (no-ligature) variant. Apply to all text. Ligatures must not change cell widths.
- **Nerd Font icons:** do not ship a full patched font. Use JetBrains Mono plus **Symbols Nerd Font Mono** as the last family in the stack (Mono variant: one cell wide). The release zip ships TTF, so convert to woff2 and subset to only the glyphs used (fontTools `pyftsubset` with `--flavor=woff2`, needs `brotli`) **[VERIFY]**. Keep its licence file. WebTUI's `@webtui/plugin-nf` shows the same pattern (append "Symbols Nerd Font" to the end of `--font-family`).
- Nerd Font glyphs are Private Use Area characters: always `aria-hidden="true"` and always paired with a visible text label.
- Stack: `"JetBrains Mono", "Symbols Nerd Font Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace`.
- Preload the main woff2. Use `font-display: block`: a fallback with a different advance width would reflow the whole character grid.
- Base size 16px, line-height 1.5 (so `1lh` = 24px). Scale only with `rem`/`ch`/`lh`; no `px` for layout.
- No emoji anywhere (width is unpredictable in a grid).

### 4.4 TUI styling layer: WebTUI

Use **WebTUI** (`@webtui/css`, MIT, pre-1.0, pin the exact version) as the base, with `@webtui/theme-catppuccin` and optionally `@webtui/plugin-nf`. Facts from its docs **[VERIFY while integrating]**:

- Import order in the global CSS: `@layer base, utils, components;` then `@import '@webtui/css/base.css';` then utils/components you use (`utils/box.css`, `components/typography.css`, `components/button.css`, `components/badge.css`, maybe `accordion`, `range`, `separator`, `table`), then the theme last.
- Theme: `<html data-webtui-theme="catppuccin-mocha">`. The plugin colours headings, makes links `--sky`, inline code `--red`: override links and focus to blue, code to `text` on `surface0`.
- Boxes: `box-="square" | "round" | "double"` attributes (note the trailing hyphen) draw borders with `::before/::after`, mimicking box-drawing characters. `shear-="top|bottom|both"` lets a header sit on the border (used for pane titles). CSS vars: `--box-border-color`, `--box-rounded-radius`, `--box-border-width`, `--box-double-border-width`.
- Layout is in character cells: `ch` (width of `0`) and `lh` (line height). Use them for padding, gaps and widths.
- Risks: Svelte accepting `box-=` attributes and TypeScript typing them. Add a `declare module 'svelte/elements'` augmentation for the custom attributes if `svelte-check` complains. If WebTUI becomes a fight, replace it with a small hand-written stylesheet providing `.pane`, `.badge`, `.btn` and the same tokens. The look is the contract, not the library.

### 4.5 Layout

- One prerendered page per language. Centered column, `max-width: 100ch`, side gutters of 2ch (1ch below 60ch).
- Panes are `<section aria-labelledby>` with `box-="round"` and the title on the top border. Gap between panes is `1lh`.
- **Statusline (tmux style), sticky at the bottom**, full width, `mantle` background:
  - left: session name `[stefano]`, then windows as real anchor links `1:about 2:projects 3:music 4:research 5:links`
  - right: language switch `[EN] IT` (real links, section 7)
  - the window whose section is in view is highlighted (accent background, `base` text). Highlighting is a progressive enhancement via IntersectionObserver; without JS no window is highlighted and everything still works.
  - below ~70ch: window labels collapse to numbers plus the active window's name; keep it a single line
  - respect `env(safe-area-inset-bottom)`; add bottom padding to `main` so content is never hidden behind the bar
  - on coarse pointers, links need at least 44px tap height (`@media (pointer: coarse)`)
- No decorative elements in v1 (no cursor blink, no banner; see section 1.1).
- No scroll animation (instant jumps); `scroll-margin-bottom` so anchored panes clear the statusline.

Wireframe (desktop, EN):

```
╭─ about ──────────────────────────────────────────────────────────────────╮
│ ┌──────────┐  Stefano Lemerle                                            │
│ │  photo   │  role    MSc Computer Engineering (AI & data analytics)     │
│ │          │  school  Politecnico di Torino                              │
│ │          │  now     exchange semester at KAIST                         │
│ └──────────┘  focus   audio ML | music tech | DSP                        │
│               open    github  mail  cv.pdf                               │
╰──────────────────────────────────────────────────────────────────────────╯
╭─ projects ───────────────────────────────────────────────────────────────╮
│ [live] chorus-plugin     Rust, Truce, AU/VST       [repo] [demo]         │
│        one-line description of what it does and why                      │
│ [wip]  chorus-estimator  PyTorch, audio ML         [repo] [notes]        │
│        one-line description                                              │
╰──────────────────────────────────────────────────────────────────────────╯
╭─ music ──────────────────────────────────────────────────────────────────╮
│ >  track-01          =====o---------------------   01:12 / 03:40         │
│    track-02          ---------------------------   00:00 / 02:58         │
╰──────────────────────────────────────────────────────────────────────────╯
╭─ research ───────────────────────────────────────────────────────────────╮
│ - score following beyond piano    - robustness of audio-language models  │
╰──────────────────────────────────────────────────────────────────────────╯
 [stefano] 1:about 2:projects 3:music 4:research 5:links            [EN] IT
```

(A `links` pane follows `research`. Project names and stacks above are examples; see 6.2.) Mobile: panes stack full width; the photo moves above the key/value block; the key/value block becomes two lines per entry if needed.

## 5. Information architecture

Panes in order (window number in the statusline equals pane order): `about`, `projects`, `music`, `research`, `links`. Anchors: `#about #projects #music #research #links`. A `papers` pane is inserted after `research` only if `papers.length > 0`, and then gets window 5 with `links` becoming 6.

## 6. Content model

All content lives in typed data files under `src/lib/content/`. Components contain no copy.

### 6.1 about

Name as `<h1>`, key/value block, a 2 to 3 sentence bio, then an `open` row with links (github, mail, CV).

- No photo on the site (decided 2026-10-18): the photo appears in the CV only.
- Key/value rows (labels in `subtext0`, values in `text`): `role`, `school`, `now`, `focus`, optionally `status` **[CONFIRM]** (for example: looking for an MSc thesis in audio/music ML from spring 2027; do not publish this unless Stefano says so).
- `now` is time-sensitive (exchange is fall 2026). Put the date in the data file so it is easy to update.
- Draft bio EN: "MSc student in Computer Engineering (AI and data analytics) at Politecnico di Torino, currently on exchange at KAIST. I am interested in machine learning for audio and music. I make music and build audio tools, including a chorus AU/VST plugin written in Rust."
- Draft bio IT `// REVIEW`: "Studente di laurea magistrale in Ingegneria Informatica (AI e analisi dei dati) al Politecnico di Torino, attualmente in scambio al KAIST. Mi interessano il machine learning per l'audio e la musica. Faccio musica e costruisco strumenti audio, tra cui un plugin chorus AU/VST scritto in Rust."

### 6.2 projects

Source of truth for the list: Stefano's GitHub, `https://github.com/leeeeeeeeeem?tab=repositories`. It could not be read while writing this spec. Run `gh repo list leeeeeeeeeem --limit 100 --json name,description,primaryLanguage,pushedAt,isFork,repositoryTopics` and propose a shortlist; **[CONFIRM] which to feature and the one-line summary for each**. Do not invent descriptions.

Known anchors (confirm repo names): the chorus AU/VST plugin (Rust, Truce framework) and the chorus-settings estimator (a model that recovers chorus parameters from audio, using his own plugin).

`projects.ts` shape:

```ts
export type Project = {
	id: string; // slug, also the <details> id
	name: string; // not translated
	status: 'live' | 'wip' | 'archived';
	stack: string[]; // not translated
	links: { repo?: string; demo?: string; notes?: string };
	summary: { en: string; it: string }; // one line
	detail?: { en: string; it: string }; // optional longer text, shown in <details>
};
```

Render each as a row: status badge, name, stack, links, summary. `detail` expands with a native `<details>` (no JS). Order: featured first, then by last activity. Cap at about 6 rows; more goes behind a link to the GitHub profile.

### 6.3 music (hobby: making music)

Self-hosted players (decided). `tracks.ts`:

```ts
export type Track = {
	id: string;
	title: string;
	files: { src: string; type: string }[]; // e.g. mp3 baseline, optional opus/ogg first
	duration?: number; // seconds, optional hint
	year?: number;
	note?: { en: string; it: string };
};
```

- Audio in `static/audio/`. Baseline MP3 at about 128 kbps (about 1 MB per minute) or AAC/M4A; an Opus/Ogg source may be listed first. Keep each file to a few MB and fewer than about 10 tracks.
- Custom player component `Player.svelte` on a native `<audio>` element: play/pause button, seek `<input type="range">`, elapsed / total time, track list as a list of buttons with `aria-current` on the active one. A text progress bar (`=====o-----`) is drawn from the same value.
- Rules: no autoplay; one track plays at a time; `preload="metadata"`; keyboard operable (Space toggles, arrow keys seek via the range); announce state with an `aria-live="polite"` region; optional Media Session API metadata.
- This is the only client-side JS besides the statusline highlight. The pane must still render the track list and native `<audio controls>` fallback if JS fails.
- If `tracks` is empty, omit the pane and its statusline window.
- **[CONFIRM]** what exists to publish (bounces, stems, live takes), that Stefano owns the rights, and titles/years. Do not generate placeholder "music".

### 6.4 research

Two or three bullets, each one line plus an optional one-line reason. Draft (**[CONFIRM] each is really his interest**): score following beyond piano (building on the Matchmaker library and the KRAISLER violin-piano dataset from KAIST MACLab); robustness of audio-language models. Name the works but claim no results.

### 6.5 links

GitHub `https://github.com/leeeeeeeeeem`; email **[CONFIRM address]** (never hard-code in markup if Stefano wants anti-scraping; default is a plain `mailto:` built from the data file); CV PDF `static/cv/` (EN, and IT if Stefano provides one); optional LinkedIn **[CONFIRM]**. Each link shows a Nerd Font glyph (`aria-hidden`) plus a text label. External links: `rel="noopener"`; visible text, not "click here".

### 6.6 papers (conditional)

`papers.ts` exists and is empty. When non-empty, render a pane with title, venue, year, links. Never ship placeholder papers.

## 7. Internationalisation (EN / IT)

Required: a way to switch between English and Italian.

- **Route-based, no i18n library.** English at `/`, Italian at `/it/`. Route `src/routes/[[lang=lang]]/+page.svelte` with a param matcher `lang` that matches only `it`, both pages prerendered (the root layout's `prerender = true`; add an `entries()` export if the crawler does not discover `/it/` from links).
- Content: `src/lib/content/en.ts` and `it.ts` both typed as one `Content` type, so a missing Italian key is a compile error. Structured data (projects, tracks) carry `{ en, it }` strings as in section 6.
- `<html lang>`: set per page in the prerendered HTML via a `%lang%` placeholder in `app.html` replaced in `hooks.server.ts` `handle` with `transformPageChunk`. **[VERIFY]** that `event.params`/`event.url.pathname` is available at prerender time; the built `build/it/index.html` must contain `lang="it"`.
- Each page: `<title>`, meta description, OG/Twitter tags in its own language; `<link rel="canonical">`; `<link rel="alternate" hreflang="en|it|x-default">` pointing at both.
- **Switch:** `[EN] IT` in the statusline as two real links to the equivalent page (preserve the hash). The current language is `aria-current="true"` and highlighted in accent; each link has `hreflang` and `lang` attributes and an `aria-label` ("Switch to Italian" / "Passa all'inglese").
- No automatic redirect by browser language in v1 **[CONFIRM]**. If added later: first visit to `/` only, only when `navigator.language` starts with `it`, no stored choice, wrapped in try/catch, remembered in `localStorage`, never for crawlers.
- Do not translate: project names, repo names, tech terms, track titles (unless Stefano says), URLs.
- UI labels (drafts, `// REVIEW`):

| key | EN | IT |
|---|---|---|
| window about | `about` | `chi-sono` |
| window projects | `projects` | `progetti` |
| window music | `music` | `musica` |
| window research | `research` | `ricerca` |
| window links | `links` | `link` |
| kv role | `role` | `ruolo` |
| kv school | `school` | `università` |
| kv now | `now` | `ora` |
| kv focus | `focus` | `focus` |
| kv open | `open` | `contatti` |
| skip link | `Skip to content` | `Vai al contenuto` |
| player play / pause | `play` / `pause` | `riproduci` / `pausa` |

Window names stay single tokens (no spaces) so the statusline never wraps mid-label.

## 8. Accessibility (target: WCAG 2.2 AA)

- Landmarks: skip link first, `<header>`, `<nav aria-label>` for the statusline (it is `<nav>`, positioned at the bottom), `<main>`, `<footer>`. One `<h1>`; pane titles are `<h2>`.
- Visible focus: 2px `blue` outline with offset, never removed. Focus must not be hidden behind the sticky statusline (`scroll-padding-bottom`).
- Contrast per the table in 4.2; never convey meaning by colour alone.
- Decorative glyphs, ASCII art, box-drawing text: `aria-hidden="true"`. Real text always exists beside Nerd Font icons.
- Motion: none in v1 beyond instant hover and focus colour changes. If motion is ever added, it must respect `prefers-reduced-motion`.
- Reflow: no horizontal scroll at 320px wide (code or pre blocks may scroll inside their own box). Text-only zoom to 200% must not clip.
- Mixed language: if a phrase is in the other language, give it a `lang` attribute.
- Touch targets at least 44px on coarse pointers.

## 9. Performance and SEO

- No third-party requests of any kind. Total transfer for first view (excluding audio and photo) target under 150 KB.
- Lighthouse (mobile) at least 95 for performance, accessibility, best practices, SEO, on both `/` and `/it/`.
- `robots.txt`, a static `sitemap.xml` listing both URLs with hreflang alternates, favicon (plain `>_` or the initials `SL`, SVG), an OG image (1200x630: name and one line on the `base` background, no decoration; one per language or a shared one).
- Optional JSON-LD `Person` (name, url, alumniOf/affiliation only with Stefano's approval).
- Fonts: preload the main woff2 with `crossorigin`; only the Latin subset plus box-drawing.

## 10. Repository layout

```
.
├── SPEC.md                      # this file
├── CLAUDE.md                    # imports @SPEC.md (optional)
├── vite.config.js               # sveltekit({ adapter, ... }) per SvelteKit 3 docs
├── package.json
├── .github/workflows/deploy.yml
├── static/
│   ├── fonts/                   # JetBrainsMono-*.woff2, SymbolsNerdFontMono-subset.woff2, LICENSE files
│   ├── audio/                   # tracks (Stefano supplies)
│   ├── cv/                      # stefano-lemerle-cv.pdf
│   ├── photo/                   # photo-480.webp/jpg, photo-960.*
│   ├── og-en.png  og-it.png  favicon.svg  robots.txt  sitemap.xml
└── src/
    ├── app.html                 # %lang% placeholder
    ├── app.css                  # @layer order, tokens, @font-face, WebTUI imports, overrides
    ├── hooks.server.ts          # sets lang
    ├── params/lang.ts           # matcher: 'it'
    ├── lib/
    │   ├── components/          # Pane, Statusline, Badge, ProjectRow, Player, KeyValue, LangSwitch, Icon
    │   └── content/             # types.ts, en.ts, it.ts, projects.ts, tracks.ts, papers.ts, profile.ts
    └── routes/
        ├── +layout.ts           # prerender = true; trailingSlash = 'always'
        ├── +layout.svelte
        └── [[lang=lang]]/+page.svelte
```

## 11. Deployment

- Repo Settings, Pages, Source: **GitHub Actions**. The workflow from the SvelteKit docs (adapter-static page) as of 2026-10-17: trigger on push to `main`; job `build_site` with `actions/checkout@v7`, `actions/setup-node@v7` (Node 24, npm cache), `npm i` (prefer `npm ci` once a lockfile exists), `actions/configure-pages@v6`, `npm run build` with `BASE_PATH` from the configure-pages output (empty for a user site; keep the plumbing), `actions/upload-pages-artifact@v5` with `path: build/` and `include-hidden-files: true`; job `deploy` with `permissions: pages: write, id-token: write`, `environment: github-pages`, `actions/deploy-pages@v5`. Check for newer action versions **[VERIFY]**.
- `.nojekyll` is only needed when pushing built output to a branch. Harmless to add to `static/`.
- Add a CI job on pull requests: `npm run check`, lint, `npm run build`, plus the smoke tests below.

## 12. Acceptance criteria and tests

Definition of done for v1:

1. `npm run build` produces `build/index.html` and `build/it/index.html`, with `lang="en"` and `lang="it"` respectively, full text content present with JavaScript disabled.
2. The language switch works both ways and keeps the hash; hreflang, canonical and meta tags are correct in both pages.
3. Every Content key exists in EN and IT (compile-time). A CI grep fails the build on `[TODO` or `// REVIEW` left in `src/lib/content/` when a `PRODUCTION=1` flag is set.
4. Statusline links scroll to the right panes without being covered; highlight works with JS and degrades without it.
5. Player: play, pause, seek, switch track, keyboard use, and fallback with JS off. No audio autoplay.
6. Accessibility: axe (via Playwright) reports no serious or critical issues on either page; keyboard-only walkthrough completes; 320px width has no horizontal scroll.
7. Playwright screenshots reviewed at 1440, 1024, 390 px for EN and IT, including a long Italian string case. Verify `ch`/`lh` rendering in WebKit as well (iOS Safari rendering was never tested while writing this spec).
8. Lighthouse targets met (section 9). No request leaves `leeeeeeeeeem.github.io` (check the network log).
9. Restraint review against section 1.1: nothing from the not-allowed list is present, the style budget holds, and screenshots were shown to Stefano before any addition.

## 13. Open decisions for Stefano

1. Photo: decided, CV only, not on the site.
2. Email address and whether to obfuscate it from scrapers.
3. Which repos to feature and their one-line summaries; what the second chorus project repo is called.
4. Which tracks to publish, with titles, years and rights.
5. Confirm the research bullets, and whether to show a `status` line about looking for a thesis (and its wording).
6. CV: English only, or also Italian.
7. LinkedIn or other profiles to list.
8. Auto-redirect by browser language: no for v1 unless he says otherwise.
9. Design iteration: v0 ships the plain version. Anything beyond section 1.1's budget is proposed as a small, separate change.

## 14. Things that were not verified

This spec was written without being able to install packages or build, so none of the following has been run: WebTUI attribute syntax in Svelte and its TypeScript typings; `event.params` during prerender for `<html lang>`; woff2 conversion and subsetting of Symbols Nerd Font; `trailingSlash = 'always'` behaviour on GitHub Pages; the exact current versions of SvelteKit, Svelte, WebTUI and the GitHub Actions; rendering of `ch`/`lh` units on iOS Safari. Facts taken from docs (Pages limits and static-only, SvelteKit 3 config location, adapter-static and Pages setup, WebTUI features and theme, JetBrains Mono licence, Catppuccin palette) were read on 2026-10-17 and may change.
