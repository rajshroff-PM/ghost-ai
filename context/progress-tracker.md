# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Pick the next feature unit from `context/feature-specs/`.

## Completed

- 01-design-system: shadcn/ui initialized (Nova preset, radix, Lucide/Geist), 7
  primitives added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea),
  `lucide-react` installed, `lib/utils.ts` created with `cn()`. All shadcn
  semantic tokens (`--background`, `--primary`, `--border`, etc.) in
  `app/globals.css` are wired to the Ghost AI dark palette from
  `context/ui-context.md`, plus the full canvas/presence/effects token set.
  Verified: components import without errors, `cn()` merges classes
  correctly, no default light-mode styling renders, `npm run build` passes.
- 02-editor: editor chrome components created under `components/editor/`.
  `editor-navbar.tsx` — 56px (`h-14`) top bar on `bg-surface` with a
  `border-b border-surface-border`, split into left / center / right sections;
  left holds the sidebar toggle (`PanelLeftOpen` when closed,
  `PanelLeftClose` when open), center and right are empty placeholders.
  `project-sidebar.tsx` — 280px panel that floats above the canvas
  (`absolute inset-y-0 left-0 z-40`, `--shadow-float`) and slides in on
  `translate-x`, so opening it never reflows page content; header with
  `Projects` title and close button, shadcn `Tabs` for `My Projects` /
  `Shared` each rendering an empty placeholder state, and a full-width
  `New Project` button with `Plus` at the bottom. `editor-dialog.tsx` — the
  shared dialog shell (title, optional description, optional footer actions,
  children slot) built by composing the shadcn `Dialog` primitive with Ghost
  AI tokens; no concrete dialogs built yet. Verified: `npx tsc --noEmit`
  clean, `npm run lint` clean, `npm run build` passes, and the navbar +
  sidebar were rendered in-browser (toggle open/close, canvas content stays
  put, no console errors) via a temporary `app/page.tsx` that was reverted.

## In Progress

- None.

## Next Up

- Editor route/shell that mounts `EditorNavbar` + `ProjectSidebar` over the
  canvas, and the first concrete dialogs composed on `EditorDialog`.

## Open Questions

- Modal scrim: `ui-context.md` specifies `bg-base/70 backdrop-blur-sm`, but
  the generated `components/ui/dialog.tsx` renders its overlay internally
  (`bg-black/10`, `backdrop-blur-xs`) with no way to pass a class through
  `DialogContent`. `EditorDialog` therefore inherits the primitive's scrim.
  Resolving this requires either an overlay rule in `globals.css` or editing
  a protected foundation file — deferred until a real dialog ships.

## Architecture Decisions

- shadcn/ui's semantic CSS variables (`--background`, `--primary`, `--card`,
  `--border`, `--input`, `--ring`, etc.) are kept as-is because
  `components/ui/*` reference them directly and are protected foundation
  files. Instead of overriding those component files, `app/globals.css` maps
  each shadcn variable to the corresponding Ghost AI token (e.g.
  `--primary: var(--accent-primary)`), so generated primitives inherit the
  dark theme without modification.
- App is dark-only: the shadcn `.dark` class variant was dropped and the
  Ghost AI palette is defined directly in `:root`, since there is no light
  mode to toggle to.
- Editor chrome components are presentational and stateless: `EditorNavbar`
  and `ProjectSidebar` take `isOpen` / `onToggleSidebar` / `onClose` props
  rather than owning sidebar state, so the editor shell stays the single
  owner of layout state. Both are `"use client"` because they render
  interactive controls.
- The project sidebar is an absolutely positioned overlay inside the editor
  content area rather than a flex column, which is what keeps the canvas from
  reflowing (and later, from remounting) when it opens. Its host element must
  be `relative` and `overflow-hidden`.
- Dialogs are composed through the app-level `EditorDialog` shell instead of
  using `components/ui/dialog` directly, so token styling and the
  title/description/footer structure live in one app-level file and the
  shadcn primitive stays untouched.

## Session Notes

- `components.json` uses the `radix-nova` style/preset (Lucide icons, Geist
  fonts) to match the existing font setup in `app/layout.tsx`.
- Verification for 01 was done by temporarily importing all 7 primitives into
  `app/page.tsx`, checking the rendered result in-browser, then reverting
  `page.tsx` to its minimal "Ghost AI" placeholder — no changes to page.tsx
  were part of that unit's scope. 02 was verified the same way and
  `app/page.tsx` was likewise reverted.
- The closed sidebar is marked `aria-hidden` + `inert` so its controls are not
  focusable or announced while it is off-screen.
- Panel motion is `duration-200 ease-out` with `motion-reduce:transition-none`
  per the motion table in `ui-context.md`.
