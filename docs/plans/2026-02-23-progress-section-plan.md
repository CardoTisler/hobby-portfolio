# Progress Section + Compact Gallery — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the thumbnail grid gallery with a compact carousel, and add a new Progress Timeline section to the project detail view.

**Architecture:** Two new Astro components (`ImageCarousel`, `ProgressTimeline`) replace the existing `ImageGallery`. The content schema gets an optional `progress` array. The carousel is reused inside the timeline for per-step images.

**Tech Stack:** Astro 5, Tailwind CSS 4, vanilla JS (no framework), Sharp for images

---

### Task 1: Extend Content Schema

**Files:**
- Modify: `src/content.config.ts:4-23`

**Step 1: Add progress field to the Zod schema**

Add the `progress` optional array after the `costs` field:

```typescript
costs: z.array(z.object({
  item: z.string(),
  cost: z.number(),
})).optional(),
progress: z.array(z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(image()),
})).optional(),
```

**Step 2: Verify the build still works**

Run: `npx astro check`
Expected: No errors (progress is optional, no existing content uses it yet)

**Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add progress field to project content schema"
```

---

### Task 2: Create ImageCarousel Component

**Files:**
- Create: `src/components/ImageCarousel.astro`

**Context:** This component replaces `ImageGallery`. It must:
- Accept `images: ImageMetadata[]` and `title: string` props
- Render inside a `hammered-border` box with rivet + "Gallery" workshop-label header
- Show counter "N / Total" in the header
- Display one image at a time with prev/next copper arrow buttons
- Click image to open lightbox (reuse the same lightbox pattern from ImageGallery)
- Keyboard navigation: left/right arrows, escape to close lightbox
- No dot indicators (projects can have 20-40+ images)

**Step 1: Create the component**

Reference these existing patterns:
- `src/components/CostSummary.astro` — for hammered-border box, rivet + workshop-label header
- `src/components/ImageGallery.astro:50-89` — for lightbox HTML structure
- `src/components/ImageGallery.astro:164-303` — for lightbox CSS
- `src/components/ImageGallery.astro:305-359` — for lightbox JS pattern (showSlide, openLightbox, closeLightbox, keyboard nav)
- `src/styles/global.css:108-124` — for `.hammered-border` class
- `src/styles/global.css:160-167` — for `.workshop-label` class
- `src/styles/global.css:190-197` — for `.rivet` class

The component structure:

```
hammered-border bg-timber/50
├── Header: rivet + "Gallery" label ... "1 / 26" counter
├── Carousel area (relative container):
│   ├── Single <Image> displayed (swap on nav)
│   ├── Prev button (left arrow, copper styled)
│   └── Next button (right arrow, copper styled)
└── Lightbox (hidden by default, same as ImageGallery lightbox)
```

Arrow button style: match `lightbox-nav` from ImageGallery (timber bg, walnut border, bone text, copper on hover) but smaller (40x40px) and positioned at left/right edges of the carousel image area.

Image area: `aspect-[16/10]` to match the hero image aspect ratio. Images use `object-cover`.

**Step 2: Verify it builds**

Run: `npx astro check`

**Step 3: Commit**

```bash
git add src/components/ImageCarousel.astro
git commit -m "feat: add ImageCarousel component with lightbox"
```

---

### Task 3: Wire Up ImageCarousel in Project Detail Page

**Files:**
- Modify: `src/pages/[category]/[slug].astro:2-7` (imports)
- Modify: `src/pages/[category]/[slug].astro:107-112` (gallery section)

**Step 1: Replace import**

Change:
```typescript
import ImageGallery from '@/components/ImageGallery.astro';
```
To:
```typescript
import ImageCarousel from '@/components/ImageCarousel.astro';
```

**Step 2: Replace component usage**

Change lines 107-112:
```astro
{project.data.images && project.data.images.length > 0 && (
  <ImageGallery
    images={project.data.images}
    title={project.data.title}
  />
)}
```
To:
```astro
{project.data.images && project.data.images.length > 0 && (
  <ImageCarousel
    images={project.data.images}
    title={project.data.title}
  />
)}
```

**Step 3: Verify with dev server**

Run: `npx astro dev`
Navigate to a project with images (e.g. coffee-table or kitchen).
Check: Carousel displays, arrows work, lightbox opens on click.

**Step 4: Commit**

```bash
git add src/pages/[category]/[slug].astro
git commit -m "feat: replace ImageGallery with ImageCarousel on project detail"
```

---

### Task 4: Create ProgressTimeline Component

**Files:**
- Create: `src/components/ProgressTimeline.astro`

**Context:** This is the main new feature. It renders a vertical timeline of build steps.

**Props:**
```typescript
interface Props {
  steps: {
    title: string;
    description: string;
    images: ImageMetadata[];
  }[];
  projectTitle: string;
}
```

**Structure:**

```
Section header: rivet + "Build Progress" workshop-label + copper-line
Timeline container (relative, centered copper line):
  For each step:
    ├── Numbered copper circle on the line
    ├── Step content (alternating sides):
    │   ├── Text side: title (Cinzel) + description (ash text)
    │   └── Image side: mini ImageCarousel (smaller, no lightbox header)
    └── Connector line segment
```

**Step 1: Create the component**

Key visual details:
- The vertical copper line: `absolute left-1/2 w-0.5 bg-copper/40` on desktop, `left-4` on mobile
- Step number circles: 32x32px, `bg-copper text-charwood font-display font-bold` with copper border glow, positioned on the line
- Step cards: `hammered-border bg-timber/50 p-6` containing a 2-column grid (`grid-cols-2` on desktop, stacked on mobile)
- Alternating layout: use CSS `even:` and `odd:` selectors or pass index to alternate which column gets text vs images
- Each step's image carousel: reuse `ImageCarousel` component but pass a smaller variant. OR, embed a simpler inline carousel (just the image area with arrows, no hammered-border wrapper) to avoid nesting hammered-border boxes.
- fadeUp animation via `IntersectionObserver` in the `<script>` block — add `.opacity-0.translate-y-4` initially, remove on intersect

**Recommendation for step images:** Use a simpler inline carousel (no hammered border, no header, just image + arrows) to avoid visual clutter from nested boxes. The step card itself is already in a hammered-border.

Reference files:
- `src/styles/global.css:127-135` — `.copper-line` gradient
- `src/styles/global.css:190-197` — `.rivet` for circle inspiration
- `src/components/CostSummary.astro` — collapsible pattern (not needed here but shows box style)
- `src/styles/global.css:62-71` — `fadeUp` animation

**Step 2: Verify it builds**

Run: `npx astro check`

**Step 3: Commit**

```bash
git add src/components/ProgressTimeline.astro
git commit -m "feat: add ProgressTimeline component with alternating layout"
```

---

### Task 5: Wire Up ProgressTimeline in Project Detail Page

**Files:**
- Modify: `src/pages/[category]/[slug].astro`

**Step 1: Add import**

Add to the imports (after ImageCarousel import):
```typescript
import ProgressTimeline from '@/components/ProgressTimeline.astro';
```

**Step 2: Add ProgressTimeline section**

After the closing `</div>` of the main grid section (after line 159's `</div>`), add:

```astro
<!-- Progress Timeline -->
{project.data.progress && project.data.progress.length > 0 && (
  <div class="px-8 lg:px-12 mt-24">
    <div class="max-w-6xl mx-auto">
      <ProgressTimeline
        steps={project.data.progress}
        projectTitle={project.data.title}
      />
    </div>
  </div>
)}
```

This goes inside the `<article>` but below the main grid, making it full-width.

**Step 3: Verify with dev server**

Run: `npx astro dev`
Note: No projects have progress data yet, so this won't render. The page should still build without errors.

**Step 4: Commit**

```bash
git add src/pages/[category]/[slug].astro
git commit -m "feat: wire ProgressTimeline into project detail page"
```

---

### Task 6: Add Sample Progress Data to a Project

**Files:**
- Modify: one project markdown file (e.g. `src/content/projects/coffee-table.md` or `kitchen.md`)
- Create: sample progress images in `src/assets/projects/<slug>/progress/`

**Step 1: Choose a project and add progress frontmatter**

Pick a project that has existing images. Add 2-3 progress steps to its frontmatter. For initial testing, reuse some existing gallery images as progress images (to avoid needing new image files):

```yaml
progress:
  - title: "Step Title Here"
    description: >
      Description of this build stage.
    images:
      - ./relative/path/to/existing/image.jpg
  - title: "Another Step"
    description: >
      Description of this stage.
    images:
      - ./relative/path/to/another/image.jpg
      - ./relative/path/to/yet/another.jpg
```

**Step 2: Verify with dev server**

Run: `npx astro dev`
Navigate to the project. The Progress Timeline should now render below the gallery.
Check:
- Timeline copper line is visible
- Steps alternate left/right on desktop
- Steps stack vertically on mobile (resize browser)
- Step image carousels work (if multiple images per step)
- fadeUp animations trigger on scroll

**Step 3: Commit**

```bash
git add src/content/projects/<chosen-project>.md
git commit -m "feat: add sample progress data to <project> for testing"
```

---

### Task 7: Delete ImageGallery Component

**Files:**
- Delete: `src/components/ImageGallery.astro`

**Step 1: Verify no other imports**

Search for `ImageGallery` across the codebase. It should only appear in the design doc now (not in any `.astro` or `.ts` files).

**Step 2: Delete the file**

```bash
git rm src/components/ImageGallery.astro
```

**Step 3: Verify build**

Run: `npx astro build`
Expected: Clean build, no missing import errors.

**Step 4: Commit**

```bash
git commit -m "chore: remove unused ImageGallery component"
```

---

### Task 8: Final Visual QA

**Files:** None (verification only)

**Step 1: Full visual check**

Run: `npx astro dev`

Check these pages:
- A project WITH progress data: timeline renders, alternating layout, mobile responsive
- A project WITHOUT progress data: no timeline section appears, no errors
- A project WITH images but no progress: carousel works, lightbox works
- A project WITH before/after: before/after slider still works, carousel below still works

**Step 2: Build check**

Run: `npx astro build`
Expected: Clean build, no warnings.

**Step 3: Final commit (if any fixups needed)**

```bash
git add -A
git commit -m "fix: visual QA fixups for carousel and timeline"
```
