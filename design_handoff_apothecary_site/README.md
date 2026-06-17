# Handoff: Cardo Tisler — Victorian Apothecary Site

## Overview
A redesign of **cardotisler.ee**, the portfolio site of Cardo Tisler — a maker working in woodworking, home renovation, and garden construction in Tartu, Estonia. The redesign reframes the portfolio as a **Victorian apothecary catalogue**: cream paper grounds, sepia-brown ink, numbered "plates" for each project, and engraved-label typographic detailing. Three views are included: a **Home** page, an **All Work** gallery with category filtering, and a **Project Detail** entry.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/JS** — prototypes that communicate the intended look, typography, and behavior. They are **not production code to copy verbatim**. The task is to **recreate this design direction in the target codebase's environment** (React/Next, Astro, vanilla, a CMS theme, etc.) using its established patterns, then wire it to real project data and photography. If no environment exists yet, pick the most appropriate stack for a small content-driven portfolio.

Treat this explicitly as **design inspiration, not a 1:1 implementation spec.** Where the codebase's conventions, component library, or content model differ, prefer those. The goal is to carry across the *aesthetic system* (palette, type, the "catalogue plate" framing, the calm density) — not the exact DOM structure or the placeholder data.

## Fidelity
**High-fidelity (hifi)** for visual styling — colors, typography, spacing, borders, and hover states are final and specified below. **Conceptual** for content and imagery: all project data (titles, materials, Latin-numeral years, joinery notes) is illustrative placeholder, and every image is a styled placeholder ("plate"). Swap in real projects and photos.

## Screens / Views

### 1. Home (`index.html`)
- **Purpose**: Set the tone and surface recent work.
- **Layout**: Single centered column, max-width 1180px, horizontal gutter `clamp(20px, 5vw, 72px)`.
  - **Masthead** (full-bleed, dark): a thin top rule with right-aligned "TARTU · ESTONIA" eyebrow, then a bar with the "Cardo Tisler" wordmark (left) and a 4-item nav (right): Woodworking / Renovation / Garden / All Work.
  - **Hero**: centered eyebrow label "CATALOGUE OF WORKS", a large headline ("Woodworking, renovation & *garden* craft" — the word "garden" italic and brown), an ornamental divider (`❧` flanked by hairlines), and a single ghost button "VIEW THE WORK". No descriptive paragraph.
  - **Recent Work**: section header ("Recent Work" + "View all projects →" link) above a hairline rule, then a **3-column grid** of project cards (`gap: clamp(18px, 2.4vw, 30px)`).
  - **Footer** (full-bleed, dark): a single centered logo slot (client supplies a white logo). No nav or text columns.
- **Components**: see *Project Card* and *Masthead/Footer* below.

### 2. All Work — Gallery (`gallery.html`)
- **Purpose**: Browse the full catalogue, filterable by discipline.
- **Layout**: Centered page header (eyebrow "THE COMPLETE CATALOGUE", H1 "All Work", one-line deck, ornament divider). Below: a centered **filter bar** (All Work / Woodworking / Renovation / Garden), a monospace count line ("N projects recorded"), then the same 3-column project-card grid.
- **Behavior**: Clicking a filter shows only matching projects; active filter is filled dark. Cards fade/slide in with a staggered delay (~55ms each). Nav links from other pages can deep-link a filter via `?cat=`.

### 3. Project Detail (`project.html`)
- **Purpose**: A single catalogue entry.
- **Layout**:
  - **Breadcrumb**: Home / {Category} / {Title}.
  - **Entry header**: small eyebrow "{numeral} · ANNO {year}", large H1 title, italic category line.
  - **Body**: 2-column grid (`1.5fr / 1fr`, collapses to 1 column ≤960px). Left = a large 4:3 hero plate followed by drop-cap prose. Right = a **Specifications** ledger (dark header bar; rows for Material, Finish, Joinery, Dimensions, Completed, Discipline).
  - **Further Plates**: centered "FURTHER PLATES" label + ornament, then a 2-column grid of 16:10 plates (Fig. 1–N).
  - **Pager**: prev/next row linking adjacent projects (wraps around).
- **Behavior**: Reads `?p={slug}` and renders from the shared data file; prev/next are computed by array position.

## Project Card (shared component)
- Container: background `--paper-card`, `1px solid --line`, padding `14px 14px 18px`.
- Contents top→bottom: a **plate** (placeholder image, 4:3), a category eyebrow (small-caps, `--brown-mid`), the title (H3, serif 700, ~1.32rem), and a monospace sub-label ("{Material} · {Year}").
- **Hover**: lift `translateY(-4px)`, shadow `0 14px 30px -18px rgba(43,29,16,0.55)`, border darkens to `--brown`. Transition 0.3s ease.

## Plate (placeholder imagery)
A stand-in for real photography that should be **replaced with `<img>`** in production. Visual recipe: ground `--paper-deep` with a 45° repeating-hairline overlay (`rgba(91,61,38,0.10)`), `1px solid --line` border, a corner numeral label (top-left, small-caps), and a centered monospace caption in a cream chip (`[ caption ]`). Aspect-ratio variants: 4:3 (default), 3:4 (tall), 16:9 (wide), 1:1 (square), 16:10 (detail plates).

## Masthead / Footer (shared)
- **Masthead**: background `--ink` (#2b1d10), text `--paper`. Eyebrow row bottom-bordered with a faint cream line; nav links are small-caps with a transparent bottom border that fills on hover; the active link shows a solid cream underline. Wordmark is serif 700, `white-space: nowrap`.
- **Footer**: background `--ink`, `3px double` cream top border, a single centered logo (300×116 slot). In production, replace the drop-slot with the client's actual logo `<img>`.

## Interactions & Behavior
- **Navigation**: standard links between the three pages; category nav deep-links the gallery via `?cat=`.
- **Gallery filter**: client-side filter, staggered fade-in on render, count text updates.
- **Hovers**: cards lift + shadow; nav and text links animate an underline (border-color, 0.2–0.25s).
- **Responsive**: grids drop 3→2 columns ≤860px and 2→1 ≤560px; detail body goes 2→1 column ≤960px.
- **Reduced motion**: entrance animations are decorative — gate them behind `prefers-reduced-motion: no-preference` when reimplementing.

## State / Data
- A single shared data source (`projects.js` here) is the array of projects. Each record: `slug, title, cat, no` (Roman numeral), `year` (Roman numeral), `wood, finish, joinery, dims, cap` (hero caption), `blurb`, `plates[]` (caption strings). In production this should come from the CMS/content model; the numerals and joinery specs here are placeholder.

## Design Tokens
Colors (sepia/cream system):
- Paper: `--paper #e9dcc3`, `--paper-deep #e0d0b2`, `--paper-card #f1e8d4`, `--paper-edge #d6c4a3`
- Ink/brown: `--ink #2b1d10`, `--brown #5b3d26`, `--brown-mid #8a6a48`, `--brown-soft #a98c66`
- Lines: `--line rgba(43,29,16,0.30)`, `--line-soft rgba(43,29,16,0.16)`
- Accent (used sparingly): `--accent #3a5a42` (bottle green), `--accent-deep #28402f`, `--oxblood #6e2f2a`

Typography:
- Primary face: **Cardo** (serif) — used for headings, body, labels, and small-caps eyebrows (uppercased + letter-spaced). Google Fonts: `Cardo:ital,wght@0,400;0,700;1,400`.
- Monospace (captions, counts, colophon): **Cutive Mono**.
- Body: 19px / line-height 1.72. Headlines use `clamp()` fluid scaling (hero up to ~3.9rem). Eyebrow labels ~0.72–0.8rem, uppercase, letter-spacing 0.16–0.28em.
- Background texture: a subtle SVG fractal-noise paper grain + a faint top radial highlight (decorative; optional to reproduce).

Spacing / detail:
- Gutter `clamp(20px, 5vw, 72px)`; grid gaps `clamp(18px, 2.4vw, 30px)`.
- Borders are 1px hairlines; the only heavier rule is the footer's `3px double`.
- **Corners are square throughout — no border-radius.** Shadows are used only on card hover.

## Assets
- **No real images** are included — every picture is a CSS "plate" placeholder. The developer/client must supply project photography and a white logo for the footer.
- Fonts load from Google Fonts (Cardo, Cutive Mono). Self-host for production if preferred.
- No icon set is used; the only ornament is the `❧` (U+2767) glyph plus hairline rules.

## Files
- `index.html` — Home
- `gallery.html` — All Work / gallery with filtering
- `project.html` — Project detail (reads `?p=slug`)
- `apothecary.css` — shared design system (tokens, masthead, footer, plate, card, ornaments)
- `projects.js` — shared placeholder project data
- `image-slot.js` — drag-and-drop logo placeholder helper (prototype only; replace with a real logo in production)
