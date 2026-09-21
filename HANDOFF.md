# Handoff — Ekaterina Sharipova Portfolio

Context dump for picking up this project in a new chat. Read this whole file before touching anything — the design direction has pivoted twice, and the "obviously right" choice from an earlier phase is often the thing we deliberately walked back from.

## Who this is for

Portfolio site for **Ekaterina Sharipova**, Product Designer (4+ years, B2E SaaS / internal enterprise tools — ITSM, on-call scheduling, monitoring dashboards). Audience: hiring design managers and recruiters. Owner is a working product designer herself — treat her as a peer collaborator with strong opinions, not a naive client.

## Where things live

- Project root: `D:\Portfolio`
- Local dev server: `serve.ps1`, port 5500, launched via `.claude/launch.json` (config name `portfolio-static`). Use the Browser tool's `preview_start` with that name, or run the script directly.
- **Production site (live, stable, already polished this session)**: `index.html`, `case-study-1.html`, `case-study-2.html`, `assets/css/style.css`, `assets/js/components.js`, `assets/js/main.js`. Still visually **rounded-corners + pink/magenta accent** (the original v1 look) — see "Design direction history" below for why that hasn't changed yet.
- **Experimental draft (where all the new-direction work is happening)**: `index-edgy.html` + `assets/css/edgy.css`. Not linked from production nav; open directly via the dev server. Despite the filename, it is **no longer the sharp/edgy look** — see history below, it's now on its third distinct direction.
- Headshot: `assets/img/avatar.png` (background already replaced by the user via an external tool — see Known limitations).

## Design direction history (important — don't regress)

1. **v1 (= current production site)**: rounded corners (28px), pink/magenta accent `#d6006f`, soft shadows, circular icon buttons, Archivo font. Copy was generic/templated; this session rewrote it to be specific and personal (see "Production-site fixes already applied").
2. **"Spec sheet" pivot (in `index-edgy.html`)**: sharp corners, corner-tick brackets (mimicking Figma selection marks), ruler-tick section dividers, fully monochrome. Built out fully, user liked it initially, we refined spacing/subtlety — **then she saw two reference portfolios and changed direction again.** Nothing from this phase survives in the current draft.
3. **Current direction ("v3", rounded + monochrome, Arthur-Abrarov-inspired)** — this is the one to build forward from. Rounded corners are back, but no color accent. Structure and mechanics borrowed from two real sites:
   - **arthurabrarov.com** — restraint model: sticky top bar (photo, name, status, Contact/Resume buttons) → one big panel with a short 2-sentence bio → a bold "spotlight" statement about what's next → case list, each shown as two images. First viewport fits top bar + hero, with the next section peeking at the very bottom.
   - **prosvirkin.site** — persistent top bar pattern, and two specific mechanisms we copied exactly (verified via computed styles, not guesswork): (a) hidden-menu contacts that show just platform names with no handle/URL text, click goes straight to the platform; (b) a cursor-follow "Кейс" badge on project preview images (a `position:absolute` label inside the media container, JS `mousemove` sets `left`/`top`, CSS `:hover` toggles opacity — see `.hover-badge` in `edgy.css` for our version, labeled "View case").

## Current state of `index-edgy.html` / `edgy.css` (v3 — build from here)

- **Palette**: fully monochrome (`--ink`, `--ink-soft`, `--muted`, `--panel` #f2f2f3, `--panel-strong`). The **one deliberate exception** is `--status-green` (#2fae5c) for the "Open to work" dot — a real signal, not decoration. Don't reintroduce any other accent color without asking.
- **Radius**: `--radius-lg: 20px`, `--radius-md: 14px`, `--radius-pill: 999px` (buttons only). These were tuned down from an initial 28px/18px because the user felt panels looked "oval" — keep proportions in mind if resizing panels.
- **Top bar**: sticky, pill-shaped, contains avatar photo (44px circle) + `h1` name (modest size, not a big display headline — the H1 is here for semantics, not visual dominance) + "Open to work" status + Contact/Resume pill buttons.
- **Hero + spotlight are ONE panel**, not two. Bio paragraph on top, "Next up: B2E product design." + chevron icon aligned in one row at the bottom of the same box. (They were originally two separate panels; merged per explicit feedback.)
- **Featured work**: no section heading anymore (removed per feedback — redundant). Each case is a rounded grey panel showing **two images side by side** — currently placeholder images reused from existing case assets (`case1-cover-desktop.jpg` + `case1-macbook-a.jpg`, `case2-cover-desktop.jpg` + `case2-app-1.jpg`). **The user is going to send real gallery photos to swap in — ask if she has and use those instead of the placeholders.**
- **Hover badge "View case"**: cursor-follow label on case images, mechanism copied from prosvirkin.site (see above). Hidden on mobile (`display:none` under the touch breakpoint) since cursor-follow doesn't make sense on touch.
- **About**: unchanged copy, plain text, no panel.
- **Experience**: drastically simplified to one line per role — date + `**Company** — Role title`, no bullet descriptions. (Full detail lives only in the Resume PDF now; this was the user's own suggestion after she said the old bulleted block "didn't fit" the new page.)
- **Contacts**: 3 plain pill links (LinkedIn, Email, Telegram) — no handles/URLs shown, no CV link (Resume is already in the top bar, so it was deliberately dropped here to avoid duplication).
- **Footer**: same as production (© year, dynamic; "Back to top" link).

## Production-site fixes already applied (don't redo these)

- Font: Hanken Grotesk → **Archivo**, single family, full weight range 400–900, used everywhere including the draft.
- Rewrote generic copy: homepage project-card descriptions, full About section (added specific personal stories — how she fell into product design via an internship, a mentoring story with mutual learning, a Kamchatka trip, a UI-craft side course), flattened the case-study "decision block" cards into plain subhead+paragraph prose matching the Process section's style.
- `case-study-1.html`: added a "03 — Ship under a hard deadline" process step (real story: 4-month deadline, worked directly with backend engineers); Design Challenges section converted from orphaned headers to a bullet list.
- `case-study-2.html`: the three disconnected "trade-off" cards merged into two connected paragraphs that actually explain the reasoning (metric naming kept for consistency with the source-of-truth web app; layered info architecture for incident-first speed).
- Footer added sitewide via `renderFooter()` in `components.js` (shared component, don't duplicate markup by hand).
- Fixed heading hierarchy on the homepage (was skipping H2 — section eyebrow labels are now real `<h2>` elements, not styled `<p>`).
- Removed dead CSS (`.case-meta-row`/`.case-meta-item`, `.decision-num`).
- `og:description` meta tags updated to match the new card copy.

## Open / pending items

1. **Case gallery images** — swap the 2-image placeholders for real photos once the user sends them (see above for exact current placeholder filenames/locations to replace).
2. **Avatar file size** — `avatar.png` is ~1.8MB, uncompressed. Should be resized/compressed before this goes live. No image tooling is available in this environment (see Known limitations) — either find a working tool or ask the user to compress it externally.
3. **New case-study page navigation** — separate, not-yet-built feature. User wants to replace the current case-study sidebar TOC (desktop) + top mobile bar with a **bottom-floating pill nav**, modeled on prosvirkin.site's case-page nav: fixed at bottom-center, always visible while scrolling (never auto-hides), section links with active-state highlighting on scroll. This was scoped in detail (including the exact CSS of the reference: `border-radius:70px`, `backdrop-filter:blur(4px)`, dark translucent fill) **but the user explicitly rejected the glassmorphism/blur styling** as not fitting — the mechanic should be rebuilt in whatever the current monochrome visual language is. **Not implemented yet.** Confirm which visual direction (see item 4) before building it, since its styling should match.
4. **Whether to port the v3 direction to the case-study pages** — `case-study-1.html`/`case-study-2.html` still use the old `style.css` (rounded, pink v1 look). The user was explicitly asked whether to redesign them to match and **deferred the decision** ("пока не могу ответить" — twice, across two different conversations). Ask again before assuming either way.
5. **Promotion path** — if/when v3 in `index-edgy.html` is approved as final, it needs to replace the real `index.html` (right now it's a parallel, unlinked file kept only for review).

## Known limitations / environment quirks (learned the hard way this session)

- **No image editing tools available.** `fal-image-edit` appears in the skills list but is only a catalogue stub pointing at an uninstalled upstream GitHub bundle requiring a `FAL_KEY` — it does not actually work here. No ImageMagick, no working Python PIL; `convert` on PATH resolves to Windows' unrelated `system32\convert.exe` (do not invoke it). If background removal or image compression is needed, ask the user to do it externally (e.g. remove.bg) and send the result.
- **Browser-pane screenshot can get "stuck"** showing a stale scroll position after several rapid hover/resize calls reused on the same tab, even though `window.scrollY` and computed styles are correct via JS. Fix: open a fresh tab (`tabs_create` + `navigate`) rather than debugging further in the stale one.
- When verifying visual fixes, **check computed styles/measurements via `javascript_tool` rather than eyeballing screenshots** — this caught several real bugs this session (a font-size mismatch between contact values and company names, `:first-child`/`:last-child` padding not applying because an element wasn't actually the DOM-first-child, a stray `position:absolute` corner-tick rendering off-screen because its parent lost `position:relative` in a refactor).

## Working style notes for whoever picks this up

- She iterates a lot and changes direction — that's normal for this project, not a sign something went wrong. Execute redirects without pushback.
- She responds far better to a live rendered preview than to a description — always spin up the dev server and show real screenshots (and cite actual computed values, not guesses) before/instead of describing a change in prose.
- When she references another site as inspiration, **go inspect it for real** (computed styles, exact mechanism) rather than approximating from memory — she's caught and appreciated this rigor before.
- She has good taste and will explicitly call out anything that reads as a generic "AI portfolio" tell (rounded-card kits, eyebrow labels over every heading, arrows appended to every link, decorative 01/02 numbering with no real sequence, scattered scroll-fade-in on every section). The whole engagement has been steering away from that; keep applying that lens by default.
