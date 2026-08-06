# Architecture

This document explains how the codebase is organized and the conventions
contributors are expected to follow. It covers structure only — no feature
or business logic is described here since none exists yet.

For visual language (design tokens, typography, motion, component variants),
see [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

## Folder responsibilities

| Folder | Responsibility |
| --- | --- |
| `app/` | Routing only: route groups, layouts, pages, and Next's file-convention endpoints (`robots.ts`, `sitemap.ts`, `favicon.ico`). No business logic. |
| `components/ui/` | Generated shadcn/ui primitives. Don't hand-edit except deliberate, documented variant additions (e.g. the `success`/`warning` badge/alert variants); regenerate via the shadcn CLI otherwise. |
| `components/layout/` | Structural, content-agnostic building blocks (`Container`, `Section`, `Grid`, `Stack`, `Navbar`, `DashboardShell`) reused across route groups. |
| `components/patterns/` | Composed, opinionated components built from `components/ui/` primitives plus design tokens (typography components, `FeatureCard`, `GlassCard`, `DashboardCard`, `MetricCard`, `LoadingButton`, `PageTransition`). See `docs/DESIGN_SYSTEM.md`. |
| `components/theme/` | Theme-related UI (e.g. `ThemeToggle`). |
| `config/` | Typed, human-authored configuration describing *what the app is* (e.g. `siteConfig`). |
| `constants/` | Static, hardcoded readonly values with no logic and no environment dependency (e.g. route paths). |
| `docs/` | Architecture and contributor documentation. |
| `features/` | Self-contained domain modules (empty until feature work begins). Each feature owns its own components, hooks, and logic — see [Feature boundaries](#feature-boundaries). |
| `hooks/` | Shared custom React hooks used by more than one feature. Feature-local hooks live inside the feature instead. |
| `lib/` | Infrastructure glue: environment validation (`env.ts`), font loading (`fonts.ts`), metadata construction (`metadata.ts`), motion presets (`motion.ts`), icon sizing (`icons.ts`), and third-party/library integration code (present and future — Convex client, WorkOS client, etc.). |
| `providers/` | The client-side composition root. `AppProviders` composes every global context provider (theme, and future Convex/WorkOS/Sonner/Analytics providers) so `app/layout.tsx` stays declarative. |
| `public/` | Static assets, organized by kind — see below. |
| `schemas/` | Zod validation schemas — the single source of truth for input shapes at system boundaries (forms, API/server actions). |
| `services/` | Data-access and backend-integration functions (Convex queries/mutations, WorkOS calls) once implemented. |
| `styles/` | Global CSS that isn't Tailwind utility generation — animations and small hand-written utility classes, imported into `app/globals.css`. |
| `types/` | Shared, generic TypeScript types used across the app (`Nullable`, `WithChildren`, etc.). Domain types live with their schema in `schemas/` or with their feature. |
| `utils/` | Pure, library-agnostic helper functions (e.g. `absoluteUrl`). Unlike `lib/`, nothing here depends on Next.js or a specific SDK. |

### `public/` asset structure

```
public/
  images/         Photographic or raster content
  illustrations/  Decorative/vector illustration assets
  icons/          Standalone icon assets not covered by lucide-react
  logos/          Brand and partner logos
  videos/         Video assets
```

## Route groups

Route groups (`(name)`) organize routes without affecting the URL path.

- **`app/(marketing)`** — public, unauthenticated pages (home page today; future
  marketing/landing pages). No shared layout yet — add one here if these
  pages need a common nav/footer.
- **`app/(auth)`** — sign-in / sign-up / auth-callback pages, added once
  WorkOS AuthKit is wired up.
- **`app/(dashboard)`** — authenticated application shell. Has a shared
  `layout.tsx` that all dashboard roles render inside. Role-specific routes
  are nested underneath:
  - `app/(dashboard)/customer`
  - `app/(dashboard)/mechanic`
  - `app/(dashboard)/staff`
  - `app/(dashboard)/admin`

  Each role folder is its own route subtree; give a role its own
  `layout.tsx` if it needs UI beyond the shared dashboard shell (e.g. a
  role-specific sidebar).

`app/robots.ts`, `app/sitemap.ts`, `app/favicon.ico`, and the root
`app/layout.tsx` stay outside every group — they apply globally and route
groups would not change their generated URLs regardless.

## Feature boundaries

- `features/` is reserved for self-contained domains once real functionality
  is built (e.g. `features/dispatch`, `features/vehicles`). Each feature
  should own its own `components/`, `hooks/`, and logic, and expose only
  what other features/routes need.
- Code only used by one feature belongs inside that feature, not in the
  shared `components/`, `hooks/`, or `utils/` folders — promote it to a
  shared folder only once a second consumer needs it.
- Cross-feature contracts (validation shapes, shared types) belong in
  `schemas/` and `types/` so features don't import from one another
  directly.
- Route files under `app/` should stay thin: import and render feature
  components rather than implementing feature UI inline.

## Naming conventions

- **Files & folders**: kebab-case (`theme-toggle.tsx`, `service-request.ts`).
  Route groups use parentheses (`(marketing)`) per Next.js convention.
- **Components**: PascalCase export names, one component per file, filename
  matches the component in kebab-case (`ThemeToggle` in `theme-toggle.tsx`).
- **Hooks**: camelCase, prefixed with `use` (`useSomething`), file named
  the same (`use-something.ts`).
- **Schemas**: camelCase export named `<subject>Schema` (e.g.
  `vehicleSchema`), with an inferred type export `<Subject>Input`.
- **Barrel files**: `index.ts` re-exports (`export * from "./module"`) are
  used for folders with multiple small, related modules (`constants/`,
  `utils/`, `schemas/`) to keep imports at `@/constants`, `@/schemas`, etc.
  Skip barrels for folders where it would just add indirection.
- **Imports**: always via the `@/*` path alias, never deep relative paths
  (`../../../lib/utils`).
