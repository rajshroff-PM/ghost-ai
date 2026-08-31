# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Pick the next feature unit from `context/feature-specs/`. The project dialogs
  now need real data behind them: project persistence (Prisma) and the API
  routes that `useProjectDialogs.submit` will call.

## Completed

- 04-project-dialogs: editor home + project dialogs, UI only (no API calls, no
  persistence). `components/editor/editor-home.tsx` renders the centered
  `Create a project or open an existing one` heading, its description, and a
  `New Project` button with a `Plus` icon over `--gradient-aurora` — no cards,
  and it replaced the old `canvas placeholder` div in `app/editor/page.tsx`.
  Three dialogs compose `EditorDialog`: `create-project-dialog.tsx` (name input
  plus a live slug preview in a `bg-sunken` well that updates on every
  keystroke), `rename-project-dialog.tsx` (prefilled + `autoFocus` input, the
  current name in the dialog description, Enter submits via a real `<form>` the
  footer button targets with `form=`), and `delete-project-dialog.tsx`
  (confirmation only, no input, destructive-styled confirm). `lib/slug.ts`
  exports `toSlug()` (NFKD fold, non-alphanumeric runs collapse to one hyphen,
  ends trimmed). `lib/projects.ts` holds the `Project` interface and the two
  mock lists. `hooks/use-project-dialogs.ts` is the dedicated hook owning which
  dialog is open, the active project, the shared name field, and
  `isSubmitting`; `submit()` is the seam where the project API call will go.
  `project-sidebar.tsx` now renders the mock lists (empty states still show when
  a list is empty), with rename/delete icon actions rendered only when the
  handlers are passed — the Shared tab passes none, so collaborator projects
  have no actions — plus a `md:hidden` backdrop scrim that closes the sidebar
  when tapped. Verified: `npx tsc --noEmit` clean, `npx eslint app components
  lib hooks` clean, `npm run build` passes, and the whole flow was exercised
  in-browser — slug preview turned `Realtime Notifications v2!` into
  `realtime-notifications-v2`, Enter submitted the create form, the rename
  dialog opened prefilled and focused with the old name in its description, the
  delete dialog named the project with a red confirm, the Shared tab showed no
  item actions, and clicking the scrim closed the sidebar. No console errors.
- 03-auth: Clerk wired into the app end to end. `lib/clerk-appearance.ts` composes
  Clerk's `dark` theme with an overrides object that maps every Clerk `Variables`
  key (colors, fonts, radius) to the app's existing CSS custom properties — no
  hardcoded colors. `app/layout.tsx` wraps the root layout in `ClerkProvider`
  with that appearance; the old `@clerk/ui/themes/shadcn.css` import was
  dropped from `app/globals.css` since the `dark` theme needs no companion
  stylesheet. `proxy.ts` (Next.js 16 renamed `middleware.ts`) uses
  `clerkMiddleware` + `createRouteMatcher` to treat `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
  and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` as the only public routes and calls
  `auth.protect()` on everything else. `components/auth/auth-layout.tsx` is
  the shared two-panel shell (`hidden lg:flex` left rail with a compact
  wordmark, one-line tagline, and a plain-text feature list; centered form
  slot on the right) used by both `app/sign-in/[[...sign-in]]/page.tsx` and
  `app/sign-up/[[...sign-up]]/page.tsx`; on small screens the left rail
  disappears and only the Clerk form renders. The old `app/page.tsx` (editor
  chrome placeholder) moved unchanged to `app/editor/page.tsx`; the new
  `app/page.tsx` is a server component that reads `auth()` and redirects to
  `/editor` or `/sign-in`. `components/editor/editor-navbar.tsx` now renders
  Clerk's `UserButton` in the right section (only — no sign-in/sign-up
  buttons, since the route is already protected by the time it renders).
  Verified: `npx tsc --noEmit` clean, `npm run lint` clean (one pre-existing
  unrelated warning in `.agents/skills/`), `npm run build` passes, and the
  full flow was exercised in-browser — `/` and `/editor` both redirect signed-
  out visitors to `/sign-in`, the two-panel layout renders correctly on
  desktop and collapses to form-only on a 375px viewport, and both auth pages
  render with the dark Clerk theme and the app's cyan accent (no shadcn Clerk
  theme, no default Clerk purple).
- 03-auth visual pass: `components/auth/auth-layout.tsx` reworked from a
  fixed-420px text-only left rail to a true 50/50 split (`lg:w-1/2` on both
  panels) with a distinct left-panel treatment — a solid color-mixed
  background (`color-mix(in oklab, var(--bg-elevated) 88%, var(--accent-primary) 12%)`,
  no gradient) so it reads as clearly separate from the near-black form side.
  Left panel now carries a logo mark, a bold two-line heading, a description,
  and an icon-badged feature list (`bg-brand-soft` rounded-xl badges with
  Lucide icons) instead of a plain bullet list, plus a copyright footer
  pinned to the bottom via `justify-between`-style flex structure. Also fixed
  a pre-existing bug while touching typography: `app/globals.css`'s
  `@theme inline` block had `--font-sans: var(--font-sans)` (a dead
  self-reference) and no `--font-mono` mapping at all, so the whole app
  silently rendered in the browser's default serif; both now point at
  `var(--font-geist-sans)` / `var(--font-geist-mono)`, the variables set on
  `<html>` in `app/layout.tsx`. Verified: `npx tsc --noEmit` clean, `npm run
  build` passes, and confirmed in-browser that `body`/`h1` compute to
  `Geist, "Geist Fallback"` and that the layout matches at both desktop
  (50/50 split, teal-tinted left panel) and 375px (form-only, left panel
  hidden) viewports, on both `/sign-in` and `/sign-up`.
  **Caution for whoever picks this up next**: a separately spawned background
  task (`task_e65ef47e`, "Fix broken --font-sans token in globals.css") was
  already started by the user in a different worktree before this fix
  landed here — it targets the exact same lines in `app/globals.css`. Diff
  that worktree against this fix before merging to avoid duplicate/conflicting
  changes.

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

- Project persistence: the Prisma `Project` / `ProjectCollaborator` models and
  the API routes behind them, replacing `lib/projects.ts`'s mock lists and
  filling in `useProjectDialogs.submit`. Opening a project from the sidebar is
  also still unbuilt — list items are deliberately non-interactive text until a
  project workspace route exists.

## Open Questions

- None.

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
- Route protection lives in `proxy.ts` (Next.js 16's renamed `middleware.ts`)
  using `clerkMiddleware` + the deprecated-but-still-supported
  `createRouteMatcher`, per the explicit instruction in
  `context/feature-specs/03-auth.md` to protect everything by default off of
  the public sign-in/sign-up env vars. Clerk's own docs now steer toward
  resource-based (per-route) auth checks instead of middleware path matching,
  but the spec calls for the middleware pattern specifically, so that took
  precedence here.
- Clerk's `dark` prebuilt theme is the base (per spec), not `shadcn`; app
  tokens are layered on top via a `variables` object in
  `lib/clerk-appearance.ts` so every Clerk color/font/radius resolves through
  a `var(--...)` reference into `app/globals.css` — never a literal color.
  This is the one shared source of truth for Clerk appearance; both
  `ClerkProvider` and any component-level `appearance` overrides (e.g.
  `UserButton`'s avatar sizing in `editor-navbar.tsx`) should compose with it
  rather than redefining colors.
- `/` is a server component that only branches on `auth()` and redirects; the
  actual editor chrome lives at `/editor` so that route protection in
  `proxy.ts` has a real protected route to guard, and so the root route
  doesn't need to be a client component.
- The auth-layout left panel's distinct background is a solid
  `color-mix(in oklab, var(--bg-elevated) 88%, var(--accent-primary) 12%)`
  rather than a new named token or a gradient — it stays within the "no
  gradients" rule from `ui-context.md` while still composing entirely from
  existing tokens (no literal hex). If this treatment gets reused elsewhere,
  promote it to a real `--bg-*` token instead of repeating the `color-mix`
  expression.
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
- Modal scrim (resolves the earlier open question): `components/ui/dialog.tsx`
  renders its overlay internally with no class hook, so `app/globals.css` now
  carries an `@layer components` rule targeting `[data-slot="dialog-overlay"]`
  that applies the `bg-base/70 backdrop-blur-sm` scrim from `ui-context.md`.
  Styling by data-slot keeps the protected primitive unedited and applies to
  every dialog in the app at once.
- Project dialog state lives in one hook (`hooks/use-project-dialogs.ts`) rather
  than in each dialog, so only one dialog can be open at a time by construction
  and the create/rename name field is a single piece of state. The dialogs
  themselves are controlled and stateless.
- Sidebar item actions are gated by whether handlers are passed rather than by a
  role flag on the project: `ProjectList` renders rename/delete only when both
  callbacks exist, and the Shared tab passes neither. Ownership stays a property
  of which list a project is in, which is what the API will return anyway.
- Sidebar list items are non-interactive text, not buttons. Opening a project is
  not in this unit's spec, and a button that does nothing is worse than plain
  text for keyboard and screen-reader users.

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
