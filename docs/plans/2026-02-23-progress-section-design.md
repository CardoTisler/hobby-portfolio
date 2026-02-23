# Progress Section + Compact Gallery Design

**Date:** 2026-02-23
**Status:** Approved

## Overview

Two changes to the project detail view:

1. **Compact Gallery Carousel** — Replace the thumbnail grid with a single-image carousel in a hammered-border box
2. **Progress Timeline** — New section below everything showing build process steps as a vertical timeline

Both features are category-agnostic (woodworking, renovation, garden, etc.).

## Data Model Extension

Add optional `progress` array to the project content schema:

```typescript
progress: z.array(z.object({
  leftTitle: z.string(),
  rightTitle: z.string(),
  description: z.string(),
  images: z.array(image()),
})).optional(),
```

Authored in frontmatter:

```yaml
progress:
  - title: Rough Milling
    description: >
      Selected ash boards from the local mill.
      Checked for twist and cup before purchasing.
    images:
      - ./progress/step1a.jpg
      - ./progress/step1b.jpg
  - title: Joinery
    description: >
      Cut mortise and tenon joints for the
      leg-to-apron connection.
    images:
      - ./progress/step2a.jpg
```

## Component Architecture

| Component | Status | Purpose |
|-----------|--------|---------|
| `ImageCarousel.astro` | New | Replaces `ImageGallery`. Hammered-border box, single image display, prev/next, counter, click-to-lightbox |
| `ProgressTimeline.astro` | New | Vertical timeline with copper connector line, alternating text/image steps |
| `[slug].astro` | Modified | Wire up new components |

## Compact Gallery Carousel

- Hammered-border container matching sidebar widget style
- Rivet + "Gallery" workshop-label header with "N / Total" counter in top-right
- Single image displayed at current aspect ratio
- Copper-styled prev/next arrow buttons overlaid on the image
- Click image to open full-screen lightbox (reuse existing lightbox logic from ImageGallery)
- Keyboard support: left/right arrow keys to navigate, escape to close lightbox
- Dot indicators below image (only if reasonable count, e.g. <= 10; otherwise counter only)

## Progress Timeline

### Layout
- Full-width section below the main content grid
- Section header: rivet + "Build Progress" workshop-label + copper-line divider

### Timeline Structure
- Vertical copper line down the center (desktop) or left edge (mobile)
- Each step:
  - Numbered copper circle on the timeline line
  - Title in Cinzel display font
  - Description text in ash color
  - Mini carousel for step images (reuse ImageCarousel component at smaller size)
  - Alternating layout: odd steps = text left / images right, even steps = images left / text right
  - On mobile: stacked vertically (title, images, text), timeline on left edge
- Subtle fadeUp animation on each step as it enters viewport

### Visual Style
- Follows forge/metalwork aesthetic: copper accents, dark timber backgrounds
- Uses existing design tokens: charwood, timber, walnut, copper, bone, ash, smoke
- Hammered-border boxes for step containers
- Rivet decorations on step number circles
- All transitions 0.3s ease consistent with rest of site

## Page Layout Change

Current order:
1. Header
2. Hero image / before-after slider
3. Grid: [Content + Gallery] | [Sidebar]

New order:
1. Header
2. Hero image / before-after slider
3. Grid: [Content + Compact Gallery Carousel] | [Sidebar]
4. Progress Timeline (full-width, below grid) — only if progress data exists

## Files Affected

- `src/content.config.ts` — Add progress field to schema
- `src/components/ImageCarousel.astro` — New component
- `src/components/ProgressTimeline.astro` — New component
- `src/pages/[category]/[slug].astro` — Replace ImageGallery with ImageCarousel, add ProgressTimeline
- `src/components/ImageGallery.astro` — Can be removed after migration (or kept if used elsewhere)
