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

## In Progress

- None yet.

## Next Up

- [First unit to build]

## Open Questions

- [Any unresolved product or technical decisions]

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

## Session Notes

- `components.json` uses the `radix-nova` style/preset (Lucide icons, Geist
  fonts) to match the existing font setup in `app/layout.tsx`.
- Verification was done by temporarily importing all 7 primitives into
  `app/page.tsx`, checking the rendered result in-browser, then reverting
  `page.tsx` to its minimal "Ghost AI" placeholder — no changes to page.tsx
  were part of this unit's scope.
