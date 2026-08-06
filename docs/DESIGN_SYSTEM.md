# Design System

The visual language shared by every surface of Roadside Platform: marketing,
customer/mechanic/staff/admin dashboards, and mobile. This document describes
what exists and how to use it — no page content is implemented here.

Stack: Tailwind CSS v4 (CSS-first `@theme` tokens), shadcn/ui (Nova preset,
built on Base UI), Framer Motion, Geist.

## 1. Design tokens

All tokens live in `app/globals.css` as CSS custom properties (`:root` /
`.dark`), then get exposed to Tailwind as utility-generating theme keys inside
`@theme inline`. **Always use the semantic utility, never a hardcoded color**
(no `bg-white`, `text-gray-900`, `shadow-lg` with a raw hex, etc.).

### Color

| Semantic role | Light | Dark | Utility |
| --- | --- | --- | --- |
| Primary (brand ink) | near-black | near-white | `bg-primary` / `text-primary-foreground` |
| Secondary | light neutral | dark neutral | `bg-secondary` / `text-secondary-foreground` |
| Accent (interaction surface) | light neutral | dark neutral | `bg-accent` — used internally by shadcn for hover/selection states, e.g. dropdown items. **Not a brand color.** |
| Highlight (brand accent) | blue-600 | blue-400 | `bg-highlight` / `text-highlight` — for links, active states, data-viz emphasis. Distinct from `accent` above. |
| Success | green-600 | green-400 | `text-success`, `bg-success/10` |
| Warning | amber-600 | amber-400 | `text-warning`, `bg-warning/10` |
| Error | red-600 | red-400 | `text-destructive`, `bg-destructive/10` — "Error" maps to the existing shadcn `destructive` slot; there is no separate `error` token to avoid duplicating the same semantic color under two names. |
| Neutral | `background`/`card`/`popover`/`muted` scale | — | see Background/Surface hierarchy below |

Status colors (`success`/`warning`/`destructive`) follow one consistent
pattern established by shadcn's Nova preset: a **tinted background at 10%
opacity (20% in dark mode) with the full-strength color as text/icon**, not a
solid fill with a contrasting foreground:

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Failed</Badge>
```

### Background & surface hierarchy

Don't invent new surface colors — compose from this existing stack, lightest
to most elevated:

`background` (page canvas) → `muted` (subtle recessed panel) → `card` /
`popover` (raised surface) → an overlay's own scrim (Dialog/Sheet handle this
internally).

### Border hierarchy

| Token | Utility | Use for |
| --- | --- | --- |
| `border-subtle` | `border-border-subtle` | faint dividers, low-emphasis separation |
| `border` (default) | `border-border` | standard component borders (inputs, cards) |
| `border-strong` | `border-border-strong` | emphasized separation, rarely needed |

### Typography scale

Defined as Tailwind font-size utilities (each paired with a matched
line-height) in `@theme inline`:

| Utility | Size | Use for |
| --- | --- | --- |
| `text-display` | 72px / 1.05 | Hero Display |
| `text-h1` | 48px / 1.1 | H1 |
| `text-h2` | 36px / 1.15 | H2 |
| `text-h3` | 28px / 1.25 | H3 |
| `text-h4` | 22px / 1.3 | H4 |
| `text-body-lg` | 18px / 1.6 | Body Large |
| `text-body` | 16px / 1.6 | Body |
| `text-caption` | 13px / 1.4 | Caption |
| `text-label` | 13px / 1.2 | Label |
| `text-button` | 14px / 1 | reference only — the Button primitive already applies `text-sm font-medium` internally, which is the same 14px size |

Reusable React components for these live in `components/patterns/typography.tsx`
(see [§2](#2-typography)). Tailwind's default numeric scale (`text-xs` …
`text-9xl`) still exists underneath and remains available for one-off cases.

### Font weights & tracking

Use Tailwind's default scale directly: `font-normal` (400), `font-medium`
(500), `font-semibold` (600), `font-bold` (700). Headings in this system use
medium/semibold only — never `font-bold` — for a refined, Linear/Stripe-like
weight. Tighten large headings with `tracking-tight`.

### Radius scale

Unchanged from the existing Nova preset, all derived from a single `--radius`
base: `rounded-sm` → `rounded-4xl`. Don't use arbitrary radius values.

### Shadow / elevation scale

Tailwind's default `shadow-*` utilities exist, but for elevated surfaces use
the semantic **elevation** tokens instead — they're tuned per theme instead of
being a naive color inversion (dark mode leans on a faint light rim rather
than a muddy dark drop-shadow):

```tsx
<div className="shadow-[var(--elevation-sm)]" />  {/* subtle: cards at rest */}
<div className="shadow-[var(--elevation-md)]" />  {/* dropdowns, popovers */}
<div className="shadow-[var(--elevation-lg)]" />  {/* dialogs, glass surfaces */}
```

### Spacing scale

Tailwind v4's spacing system is a single 4px base unit (`--spacing: 0.25rem`);
every numeric spacing utility (`p-4`, `gap-6`, `-mt-2`, …) is a multiple of it.
There's no separate spacing token list to keep in sync — use the numeric
utilities directly. For section-level vertical rhythm, use the `Section`
layout primitive instead of hand-picking padding (see [§4](#4-layout-system)).

### Z-index scale

Semantic stacking tokens for **app-level** overlays you build yourself:

```
--z-dropdown: 1000   --z-modal-backdrop: 1300   --z-popover: 1500
--z-sticky:   1100   --z-modal:          1400   --z-tooltip: 1600
--z-fixed:    1200                              --z-toast:   1700
```

Consume via arbitrary value: `z-[var(--z-sticky)]`. shadcn's Radix/Base-UI-driven
overlays (Dialog, DropdownMenu, Select, Sheet, Toast) manage their own
stacking internally via portals — this scale is for custom in-flow elements
like a sticky navbar or dashboard topbar.

### Breakpoints

Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl`
1536px) plus one addition for ultra-wide displays: `3xl` at 1920px.

## 2. Typography

Reusable components in `components/patterns/typography.tsx`, each polymorphic
via an `as` prop (defaults to a sensible semantic tag):

```tsx
import { Display, H1, H2, H3, H4, BodyLarge, Body, Caption, Label } from "@/components/patterns/typography";

<Display>Roadside, on demand.</Display>
<H1 as="h2">Section heading rendered as an h2</H1>
<Body className="max-w-prose">Paragraph copy…</Body>
```

Fonts: Geist Sans (`font-sans`, body) and Geist Mono (`font-mono`, code/data).
Headings use `font-heading`, currently aliased to Geist Sans — this is the
seam to introduce a distinct display typeface later without touching every
component that uses it.

## 3. Component standards

**Primitives already exist as generated shadcn/ui components in
`components/ui/`** — don't rebuild them, extend via `className` or, for
new variants, edit the component's `cva` config directly (as done for
`success`/`warning` below):

Alert, Avatar (+ Group/Badge), Badge, Button, Card, Dialog, DropdownMenu,
Input, Select, Separator, Sheet, Skeleton, Table, Tabs, Textarea, Toast,
**Breadcrumb** (added in this pass).

### Buttons

All required variants exist on the primitive (`components/ui/button.tsx`):
`default` (primary), `secondary`, `outline`, `ghost`, `destructive`, `link`,
plus `icon`/`icon-sm`/`icon-lg`/`icon-xs` sizes for icon-only buttons.

```tsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button size="icon" aria-label="Settings"><Settings /></Button>
```

**Loading** is a state, not a style, so it's a composed wrapper rather than a
new variant on the primitive — `components/patterns/loading-button.tsx`:

```tsx
<LoadingButton loading={isSubmitting}>Save changes</LoadingButton>
```

### Cards

`Card` (`components/ui/card.tsx`) is the base primitive. Composed variants in
`components/patterns/`:

- `FeatureCard` — icon + title + description, for marketing feature grids.
- `GlassCard` — translucent, blurred surface for use over imagery/gradients.
- `DashboardCard` — optional title/action header over content, for dashboard panels.
- `MetricCard` — label + value + optional trend indicator, for KPI rows.

### Inputs, Badges, Alerts, Tables, Dialogs, Dropdowns, Avatars

Unchanged primitives — they already consume semantic tokens exclusively, so
every token refinement above applies automatically. `Badge` and `Alert` got
`success`/`warning` variants added alongside their existing `destructive`
variant, using the same tinted-background pattern.

### Navigation & Breadcrumbs

`Navbar` (`components/layout/navbar.tsx`) is a content-agnostic top-nav shell
(logo/navigation/actions slots). `Breadcrumb` (`components/ui/breadcrumb.tsx`)
follows the standard shadcn composition:

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## 4. Layout system

`components/layout/`:

- **`Container`** — horizontal centering + padding + a content-width rule via
  `size`: `sm` (48rem) · `md` (64rem) · `lg` (72rem, default) · `xl` (80rem) ·
  `full`. Narrow sizes suit marketing copy columns; dashboards typically want
  `lg`/`xl`/`full`.
- **`Section`** — responsive vertical rhythm (`py-12 sm:py-16 lg:py-24`) for
  stacking page sections.
- **`Grid`** — responsive column counts (`cols`: 1/2/3/4/6/12) with a `gap`
  scale (`sm`/`md`/`lg`).
- **`Stack`** — vertical flex with a consistent `gap` scale and `align`. For
  horizontal layouts, use Tailwind's native flex utilities directly
  (`flex items-center gap-2`) — wrapping every flex arrangement in a component
  would just be indirection.
- **`Navbar`** — top navigation shell, see [§3](#3-component-standards).
- **`DashboardShell`** — the shared structural shell for every dashboard role
  (sidebar + optional topbar + content grid). Takes `sidebar`/`topbar` as
  props so each role (`app/(dashboard)/customer` etc.) supplies its own nav
  once built; the shell itself stays content-free.

### Dashboard layout rules

- Sidebar is fixed at `w-64`, full-height, `bg-sidebar`/`text-sidebar-foreground`
  (already themed tokens, distinct from the page's `background`/`foreground`).
- Content area padding: `p-6 lg:p-8`.
- A dashboard page's own `layout.tsx` (e.g. `app/(dashboard)/customer/layout.tsx`,
  once created) is where `DashboardShell` gets its real `sidebar` content —
  don't put navigation directly in page components.

## 5. Motion system

Framer Motion presets in `lib/motion.ts`: `fadeIn`, `slideUp`, `scaleIn`
variants, `cardHover` (for `whileHover`), and three `transitions` durations
(`fast` 150ms, `base` 250ms, `slow` 400ms) sharing one easing curve
(`[0, 0, 0.2, 1]`, matching Tailwind's `--ease-out`).

```tsx
import { motion } from "framer-motion";
import { slideUp } from "@/lib/motion";

<motion.div initial="hidden" animate="visible" variants={slideUp}>…</motion.div>
```

- **Hover / card hover**: `whileHover="hover" initial="rest" variants={cardHover}` —
  a 2px lift, 150ms, nothing flashier.
- **Button animation**: already built into the Button primitive
  (`active:translate-y-px`) — no motion library needed for a press state.
- **Page transition**: `components/patterns/page-transition.tsx` wraps
  children in a fade + 8px rise, and is **not** wired into the root layout —
  adopt it per route group once real page content exists.
- **Reduced motion**: `PageTransition` calls Framer Motion's `useReducedMotion()`
  and skips the initial animation when set. Independently, `styles/animations.css`
  adds a global `prefers-reduced-motion: reduce` media query that collapses
  all CSS animation/transition durations to near-zero, covering shadcn's own
  CSS-driven state transitions (which don't go through Framer Motion at all).

Keep motion subtle: short durations, small distances (≤12px), no bounce/elastic
easing anywhere in the system.

## 6. Iconography

[Lucide](https://lucide.dev) via `lucide-react` (already a dependency).
Standard sizes in `lib/icons.ts`:

```ts
ICON_SIZE = { sm: 16, md: 20, lg: 24, xl: 32 }
```

```tsx
import { Settings } from "lucide-react";
import { ICON_SIZE } from "@/lib/icons";

<Settings size={ICON_SIZE.md} />
```

Inside shadcn primitives, icons default to `size-4` (16px) unless the
component's own CSS overrides it (e.g. badges use `size-3`) — that's handled
automatically by each primitive's `[&_svg]` rules.

## 7. Responsive system

Mobile-first throughout, using Tailwind's breakpoints (`sm`/`md`/`lg`/`xl`/`2xl`,
plus the custom `3xl` for ultra-wide):

| Breakpoint | Width | Role |
| --- | --- | --- |
| (base) | < 640px | Mobile |
| `sm` | ≥ 640px | Large mobile / small tablet |
| `md` | ≥ 768px | Tablet |
| `lg` | ≥ 1024px | Laptop |
| `xl` | ≥ 1280px | Desktop |
| `2xl` | ≥ 1536px | Large desktop |
| `3xl` | ≥ 1920px | Ultra-wide |

Spacing rules are expressed through the layout primitives rather than
per-breakpoint tokens: `Section`'s `py-12 sm:py-16 lg:py-24` and `Container`'s
`px-4 sm:px-6 lg:px-8` are the canonical vertical/horizontal rhythm — reuse
them instead of hand-writing responsive padding on new pages.

## 8. Accessibility

- **Focus rings**: every interactive primitive already applies
  `focus-visible:ring-3 focus-visible:ring-ring/50` (see `button.tsx`,
  `input.tsx`) — never remove focus styles, and new interactive components
  should follow the same pattern.
- **Keyboard navigation & ARIA**: handled by Base UI (the primitive layer
  under shadcn's Nova preset) for all interactive components — dialogs trap
  focus, dropdowns/select are arrow-key navigable, roles/aria attributes are
  applied automatically.
- **Color contrast**: semantic status colors were chosen at the ~600 shade in
  light mode / ~400 shade in dark mode specifically for text-on-background
  contrast, mirroring the existing `destructive` token's ratio.
- **Reduced motion**: see [§5](#5-motion-system) — handled at both the CSS
  and Framer Motion level.

## 9. Dark mode

Toggled via the `dark` class on `<html>` (see `providers/theme-provider.tsx`,
already wired through `next-themes`). Every token in this document has a
`.dark` override in `app/globals.css` — dark mode is a deliberately distinct
palette, not an inversion:

- Surfaces get lighter as they elevate (`background` → `card` → `popover`),
  same direction as light mode, just recalibrated values — not simply flipped.
- Borders switch from solid grays to low-alpha whites (`oklch(1 0 0 / 10%)`),
  which reads correctly against any dark surface underneath instead of a
  fixed gray that would look inconsistent across surface levels.
- Elevation shadows change *strategy*, not just color: light mode uses a soft
  drop shadow; dark mode uses a mostly-flat shadow plus a 1px translucent
  white rim, since large dark shadows on dark backgrounds just look muddy.
- Status colors shift to a lighter, slightly less saturated shade (600 → 400)
  to stay legible against dark surfaces.

## 10. Where things live

| Path | Contents |
| --- | --- |
| `app/globals.css` | All design tokens (color, typography scale, elevation, z-index, radius) |
| `styles/animations.css` | Keyframes + the global reduced-motion override |
| `styles/utilities.css` | Small hand-written utility classes |
| `components/ui/` | Generated shadcn/ui primitives (don't hand-edit except deliberate variant additions, as done here) |
| `components/layout/` | Structural primitives: `Container`, `Section`, `Grid`, `Stack`, `Navbar`, `DashboardShell` |
| `components/patterns/` | Composed, opinionated components built from primitives + tokens: `typography.tsx`, `FeatureCard`, `GlassCard`, `DashboardCard`, `MetricCard`, `LoadingButton`, `PageTransition` |
| `lib/motion.ts` | Framer Motion variants and transition presets |
| `lib/icons.ts` | Icon size constants |

## How future pages should use this system

1. **Never hardcode a color, shadow, or font size.** Reach for a semantic
   token/utility from this document first; if nothing fits, that's a signal
   to extend the token system (in `app/globals.css`), not to reach for an
   arbitrary value.
2. **Compose pages from `components/layout/` + `components/patterns/` +
   `components/ui/`**, in that order: layout primitives for structure,
   patterns for opinionated content blocks, ui primitives for raw controls.
3. **New composed components belong in `components/patterns/`**, built from
   existing `components/ui/` primitives — don't duplicate a primitive's
   internals.
4. **Feature-specific UI** (e.g. a service-request form) still lives in its
   own `features/<name>/` module per `docs/ARCHITECTURE.md`, but should be
   built entirely from this design system rather than one-off styling.
