# Build-progress step title conventions

How to title the steps in a woodworking project's `progress:` list
(`src/content/projects/*.md`). Read this before adding steps to a new project so
titles stay consistent across the whole portfolio.

## The shape

Each step renders in `ProgressTimeline.astro` as:

```
leftTitle  ———  ( N )  ———  rightTitle
```

`N` is the step number, auto-generated from array order — you never write it.
So a step header reads as a sentence:

> **\<Activity\>** \<step N\> **\<Object\>** — e.g. "Joinery (2) Side panels"

- **`leftTitle` = the Activity.** *What you are doing.* Always a verb-like term
  from the lexicon below.
- **`rightTitle` = the Object.** *The workpiece/component you are doing it to.*
  A noun. On the final step it's usually the whole piece.

The two columns are visually symmetric around the number, so the reader expects
the same *kind* of word in each column on every step. Keep the part of speech
consistent: left is always the activity, right is always the thing.

## The Activity lexicon (left column)

Use one of these, in Title Case. They're listed in rough build order:

| Term          | Use it when the step is…                                                        |
| ------------- | ------------------------------------------------------------------------------- |
| **Milling**   | Turning rough stock into flat, square, dimensioned boards/panels. Includes glue-ups and laminations (forming a blank). |
| **Joinery**   | Cutting features that join parts — mortises, tenons, dovetails, box joints, grooves, cross-laps. |
| **Shaping**   | Removing material to refine *form*, not to join — curves, tapers, chamfers, profiling, template routing for looks. |
| **Patching**  | Fixing or hiding defects — bowties, plugs, inlays, filling knots/cracks.        |
| **Assembly**  | Bringing parts together — dry-fit, glue-up, fasteners, sliding panels in.       |
| **Finishing** | Sanding, oiling, waxing, final touches, closing thoughts on the build.          |

### Adding a term

The lexicon is extensible, but **reuse before you mint.** Only add a new term
when no existing one honestly describes the step. If you add one:

1. Pick a single Title-Case word.
2. Add it to the table above with a "use it when…" rule.
3. Apply it consistently — go back and use it anywhere else it now fits better.

A new term that's only ever used once is usually a sign an existing term would
have done the job.

## The Object (right column)

The specific component being worked, in **sentence case** (capitalize the first
word only): `Table legs`, `Side panels`, `Bottom panel`, `Center panel`,
`Back panel`, `Connectors`, `Stretchers`, `Shelves`, `Tabletop`, `Frame`,
`Bowties`. No hyphens inside the noun phrase (`Side panels`, not `Side-panels`).

On the final assembly/finishing step the object is the whole piece:
`Bookshelf`, `Coffee table`, `Dining table`, `Dresser`.

## Picking the Activity when a step does two things

A single step sometimes spans two activities (e.g. milling a blank *and* cutting
its mortises). Don't use `&` to list both. Instead **name the activity that is
the point of the step** — the distinctive craft you'd want a viewer to notice —
and let the description cover the rest.

Examples from existing projects:

- Cutting sliding dovetails *and* attaching battens → **Joinery** (the dovetail
  is the point; the attaching is incidental).
- Gluing up connector blanks *and* cutting their mortises → **Joinery** (the
  mortise is the joint-defining work).
- Cutting a cross-lap to connect top to frame *and* cutting cover plugs →
  **Joinery** (the structural joint is the point; the plugs are a detail).

## Do / don't

- ✅ `Milling` / `Panels` — activity, then object.
- ✅ `Assembly` / `Bookshelf` — final step, whole piece as object.
- ❌ `Table legs` / `Mortise and tenon` — columns inverted (object on the left).
- ❌ `Milling & Sawing` / `Legs` — `&` compound; pick the single defining term.
- ❌ `Joints` / `Joinery` / `Tenons` for the same kind of work — pick one term
  (`Joinery`) and use it everywhere.
