# UI Context

## Theme

Dark only. No light mode, no theme toggle, no `dark:` variants.

The design language is a **dark technical workspace** — the app should feel
like an instrument for architects, not a marketing page. Near-black base with
a cool blue cast, surfaces separated by hairline borders instead of shadows,
and a single vivid accent used sparingly so that anything glowing is
something you can act on.

Five rules define the look:

1. **Never pure black, never pure white.** Base is `#07080A`, primary text is
   `#E8ECF2`. Pure values feel cheap and cause halation on OLED.
2. **Depth comes from hairlines, not shadows.** Surfaces are distinguished by
   a 1px border and a small lightness step. Drop shadows are reserved for
   things that genuinely float above the canvas (modals, popovers, floating
   toolbars).
3. **Glow, not shadow, signals interactivity.** Focused and active elements
   get a soft accent bloom (`--glow-brand`), never a heavier shade of grey.
4. **Cyan means "you"; violet means "the agent".** Human-driven interactive
   elements use `--accent-primary`. Anything AI-generated, streaming, or
   agent-owned uses `--accent-agent`. This mapping is never mixed — it is how
   users tell their own work apart from generated work on a shared canvas.
5. **Mono for machine facts.** Node types, IDs, protocols, run states, and
   spec previews render in `--font-mono`. Prose and UI chrome render in
   `--font-sans`.

## Colors

All color tokens are declared as CSS custom properties in `app/globals.css`
and exposed to Tailwind through `@theme inline`. Components must use the
Tailwind utility name — never a raw hex value, and never a stock Tailwind
palette class such as `zinc-800` or `cyan-400`.

### Surfaces

| Role                       | CSS Variable    | Tailwind utility | Value     |
| -------------------------- | --------------- | ---------------- | --------- |
| Page background            | `--bg-base`     | `bg-base`        | `#07080A` |
| Cards, sidebars, panels    | `--bg-surface`  | `bg-surface`     | `#0E1014` |
| Modals, popovers, hover    | `--bg-elevated` | `bg-elevated`    | `#16191F` |
| Inputs, wells, code blocks | `--bg-sunken`   | `bg-sunken`      | `#0A0C10` |

### Text

| Role                        | CSS Variable     | Tailwind utility    | Value     |
| --------------------------- | ---------------- | ------------------- | --------- |
| Primary text                | `--text-primary` | `text-copy-primary` | `#E8ECF2` |
| Muted text, labels, meta    | `--text-muted`   | `text-copy-muted`   | `#8A93A3` |
| Placeholder, disabled       | `--text-subtle`  | `text-copy-subtle`  | `#5A6273` |
| Text on a filled accent     | `--text-invert`  | `text-copy-invert`  | `#04070A` |

`--text-subtle` fails AA against `--bg-base`. Use it only for decorative or
disabled content, never for information the user needs to read.

### Accents

| Role                        | CSS Variable        | Tailwind utility | Value                 |
| --------------------------- | ------------------- | ---------------- | --------------------- |
| Primary accent (user)       | `--accent-primary`  | `brand`          | `#22D3EE`             |
| Primary accent, pressed     | `--accent-primary-strong` | `brand-strong` | `#67E8F9`          |
| Primary accent, tint fill   | `--accent-primary-soft`   | `brand-soft`   | `#22D3EE1A`        |
| Agent accent (AI)           | `--accent-agent`    | `agent`          | `#A78BFA`             |
| Agent accent, tint fill     | `--accent-agent-soft` | `agent-soft`   | `#A78BFA1A`           |

### Borders

| Role                        | CSS Variable       | Tailwind utility        | Value     |
| --------------------------- | ------------------ | ----------------------- | --------- |
| Default hairline            | `--border-default` | `border-surface-border` | `#1E222B` |
| Hover / emphasis            | `--border-strong`  | `border-surface-strong` | `#2C3240` |
| Focus ring                  | `--border-focus`   | `ring-focus`            | `#22D3EE` |

### State

| Role     | CSS Variable      | Tailwind utility     | Value     |
| -------- | ----------------- | -------------------- | --------- |
| Error    | `--state-error`   | `state-error`        | `#F87171` |
| Success  | `--state-success` | `state-success`      | `#4ADE80` |
| Warning  | `--state-warning` | `state-warning`      | `#FBBF24` |
| Info     | `--state-info`    | `state-info`         | `#60A5FA` |

Each state color has a `-soft` variant at 10% alpha for badge and banner
fills (`--state-error-soft`, etc.).

### Canvas

The React Flow surface has its own tokens so canvas styling never reaches
into app chrome tokens.

| Role                     | CSS Variable        | Value       |
| ------------------------ | ------------------- | ----------- |
| Canvas backdrop          | `--canvas-bg`       | `#05060A`   |
| Dot grid                 | `--canvas-grid`     | `#161A22`   |
| Node fill                | `--node-bg`         | `#0E1014`   |
| Node border              | `--node-border`     | `#242A35`   |
| Node border, selected    | `--node-selected`   | `#22D3EE`   |
| Node border, AI-generated| `--node-agent`      | `#A78BFA`   |
| Edge stroke              | `--edge-stroke`     | `#3A4250`   |
| Edge stroke, active      | `--edge-active`     | `#22D3EE`   |

Canvas backdrop is one step darker than `--bg-base` so the canvas reads as
recessed behind the surrounding panels.

### Presence

Live cursors and avatars cycle through a fixed eight-color palette, assigned
by a stable hash of the Liveblocks connection ID so a collaborator keeps the
same color across a session. These are the only saturated colors permitted
outside the accent system.

`--presence-1` `#22D3EE` · `--presence-2` `#A78BFA` · `--presence-3` `#F472B6`
· `--presence-4` `#4ADE80` · `--presence-5` `#FBBF24` · `--presence-6` `#60A5FA`
· `--presence-7` `#FB923C` · `--presence-8` `#2DD4BF`

### Effects

| Role                 | CSS Variable       | Value                                                          |
| -------------------- | ------------------ | -------------------------------------------------------------- |
| Brand glow           | `--glow-brand`     | `0 0 0 1px #22D3EE40, 0 0 24px -6px #22D3EE66`                 |
| Agent glow           | `--glow-agent`     | `0 0 0 1px #A78BFA40, 0 0 24px -6px #A78BFA66`                 |
| Floating element     | `--shadow-float`   | `0 16px 48px -12px #00000099`                                  |
| Ambient aurora       | `--gradient-aurora`| `radial-gradient(60% 50% at 50% 0%, #22D3EE14, transparent)`   |

`--gradient-aurora` is the one decorative flourish in the system. It belongs
behind hero and empty states only — never behind dense working UI.

## Typography

| Role      | Font       | Variable      | Tailwind utility |
| --------- | ---------- | ------------- | ---------------- |
| UI text   | Geist Sans | `--font-sans` | `font-sans`      |
| Code/mono | Geist Mono | `--font-mono` | `font-mono`      |

Both are already loaded in `app/layout.tsx` via `next/font/google` as
`--font-geist-sans` and `--font-geist-mono`; `@theme inline` aliases them.

### Scale

| Role                | Class                                      |
| ------------------- | ------------------------------------------ |
| Page title          | `text-2xl font-semibold tracking-tight`    |
| Section heading     | `text-lg font-medium tracking-tight`       |
| Body                | `text-sm`                                  |
| Meta / label        | `text-xs text-copy-muted`                  |
| Overline            | `text-[11px] uppercase tracking-[0.14em] text-copy-subtle` |
| Technical value     | `font-mono text-xs`                        |

Headings use `tracking-tight`; overlines use wide tracking. Nothing else
adjusts letter-spacing. Body copy caps at `max-w-prose`.

## Border Radius

| Context                             | Class          | Value |
| ----------------------------------- | -------------- | ----- |
| Inline / small UI — buttons, inputs, badges, canvas nodes | `rounded-xl`   | 12px  |
| Cards / panels — project cards, sidebar sections, template tiles | `rounded-2xl`  | 16px  |
| Modals / overlays — dialogs, command palette, floating toolbars | `rounded-3xl`  | 24px  |

Avatars and status dots are `rounded-full`. Nothing in the app is square-
cornered.

## Component Library

shadcn/ui on top of Tailwind v4. Components live in `components/ui/` and are
added through the CLI (`npx shadcn@latest add <component>`) rather than
written by hand.

Per `ai-workflow-rules.md`, `components/ui/*` is a **protected foundation** —
do not edit generated primitives. Restyle by composing them in app-level
components under `components/`, or by extending the token layer in
`globals.css`.

Expected primitives for this project: `button`, `dialog`, `dropdown-menu`,
`input`, `textarea`, `tooltip`, `sheet`, `tabs`, `badge`, `avatar`,
`skeleton`, `sonner`, `command`, `scroll-area`, `separator`.

### Buttons

| Variant     | Appearance                                                       |
| ----------- | ---------------------------------------------------------------- |
| Primary     | `bg-brand text-copy-invert`, no border, `--glow-brand` on hover  |
| Agent       | `bg-agent text-copy-invert` — AI generation actions only         |
| Secondary   | `bg-surface border border-surface-border`, hover to `bg-elevated` |
| Ghost       | transparent, hover to `bg-elevated`                              |
| Destructive | `bg-state-error-soft text-state-error border border-state-error/30` |

Height `h-9` default, `h-8` for toolbars, `h-10` for primary page actions.

### Focus

Every interactive element shows `ring-2 ring-focus ring-offset-2
ring-offset-base` on `:focus-visible`. Focus is never removed, never replaced
by a color change alone.

## Layout Patterns

- **App shell** — fixed 56px top bar (`bg-surface`, `border-b
  border-surface-border`), content fills the remaining viewport. The bar holds
  project name, presence avatars, and account menu.
- **Dashboard** — centered `max-w-6xl` container, responsive grid of project
  cards (`rounded-2xl bg-surface border border-surface-border`, hover raises
  border to `border-surface-strong`).
- **Workspace** — full-viewport three-column split with no page scroll: left
  sidebar 280px (starter template library), center canvas `flex-1`, right
  sidebar 360px (spec panel / node inspector). Both sidebars are collapsible;
  the canvas never unmounts on collapse.
- **Sidebars** — fixed width, `bg-surface`, separated by a single
  `border-surface-border` hairline. No shadow — sidebars are level with the
  shell, not above it.
- **Canvas overlays** — floating controls sit *on* the canvas as pills:
  `rounded-3xl bg-elevated/80 backdrop-blur-xl border border-surface-border
  shadow-[--shadow-float]`. Zoom controls bottom-left, prompt composer
  bottom-center, minimap bottom-right.
- **Prompt composer** — the primary AI entry point. Floating pill, mono
  placeholder, agent-violet submit button, expands upward as the user types.
- **Modals** — centered overlay, `bg-base/70 backdrop-blur-sm` scrim,
  `rounded-3xl bg-elevated border border-surface-border` panel,
  `max-w-lg` default.
- **Spec panel** — right sidebar renders generated Markdown in a
  `bg-sunken rounded-2xl` well with mono type and a sticky download action.
- **Empty states** — centered icon in a `brand-soft` circle, one-line
  heading, one-line muted description, single primary action, with
  `--gradient-aurora` behind.

## Motion

Fast and subtle — motion confirms an action, it does not perform.

| Interaction               | Duration | Easing        |
| ------------------------- | -------- | ------------- |
| Hover, focus, color       | 150ms    | `ease-out`    |
| Panels, sheets, collapse  | 200ms    | `ease-out`    |
| Modal enter               | 200ms    | `ease-out`    |
| Live cursor position      | 80ms     | `linear`      |

Only two things loop: the agent "generating" pulse on in-flight nodes, and
edge flow animation on active edges. Everything respects
`prefers-reduced-motion: reduce` by dropping to an opacity change.

## AI and Real-Time States

These states are specific to Ghost AI and must be visually distinct.

- **Agent generating** — node renders at 60% opacity with a pulsing
  `--glow-agent` ring and a mono `generating` label.
- **Agent complete** — glow fades over 400ms into the standard
  `--node-agent` border, which persists so generated nodes stay identifiable.
- **Agent failed** — `--state-error` border with a retry action in the node
  footer.
- **Remote selection** — a node another user has selected takes a 2px border
  in that collaborator's presence color, with their name in a small mono
  label pinned to the top-left corner of the node.
- **Live cursor** — presence-colored arrow with a `rounded-xl` name chip in
  the same color at 90% opacity.
- **Connection lost** — a persistent `--state-warning` banner below the top
  bar; the canvas goes read-only rather than accepting edits that cannot sync.

## Icons

Lucide React. Stroke-based only, `stroke-width={1.5}` throughout — the
default 2 is too heavy for this palette.

| Context                   | Size      |
| ------------------------- | --------- |
| Inline with text, buttons | `h-4 w-4` |
| Standalone icon buttons   | `h-5 w-5` |
| Empty-state illustration  | `h-6 w-6` |

Icons inherit `currentColor` and default to `text-copy-muted`, brightening to
`text-copy-primary` on hover. Never fill icons with an accent color unless
the element itself is active.

## Token Definition

Tokens are declared once in `app/globals.css` and consumed everywhere through
Tailwind utilities:

```css
@import "tailwindcss";

:root {
  --bg-base: #07080a;
  --bg-surface: #0e1014;
  --bg-elevated: #16191f;
  --bg-sunken: #0a0c10;

  --text-primary: #e8ecf2;
  --text-muted: #8a93a3;
  --text-subtle: #5a6273;
  --text-invert: #04070a;

  --accent-primary: #22d3ee;
  --accent-primary-strong: #67e8f9;
  --accent-primary-soft: #22d3ee1a;
  --accent-agent: #a78bfa;
  --accent-agent-soft: #a78bfa1a;

  --border-default: #1e222b;
  --border-strong: #2c3240;

  --state-error: #f87171;
  --state-success: #4ade80;
  --state-warning: #fbbf24;
  --state-info: #60a5fa;
}

@theme inline {
  --color-base: var(--bg-base);
  --color-surface: var(--bg-surface);
  --color-elevated: var(--bg-elevated);
  --color-sunken: var(--bg-sunken);

  --color-copy-primary: var(--text-primary);
  --color-copy-muted: var(--text-muted);
  --color-copy-subtle: var(--text-subtle);
  --color-copy-invert: var(--text-invert);

  --color-brand: var(--accent-primary);
  --color-brand-strong: var(--accent-primary-strong);
  --color-brand-soft: var(--accent-primary-soft);
  --color-agent: var(--accent-agent);
  --color-agent-soft: var(--accent-agent-soft);

  --color-surface-border: var(--border-default);
  --color-surface-strong: var(--border-strong);
  --color-focus: var(--accent-primary);

  --color-state-error: var(--state-error);
  --color-state-success: var(--state-success);
  --color-state-warning: var(--state-warning);
  --color-state-info: var(--state-info);

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

The canvas, presence, and effect tokens listed above are declared in the same
`:root` block but are **not** mapped into `@theme` — they are consumed
directly via `var()` inside React Flow styles and inline styles, since they
do not correspond to Tailwind utility categories.
