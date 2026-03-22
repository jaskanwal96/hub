# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # TypeScript check + Vite build
pnpm preview    # Preview production build
```

No test framework is configured.

## Architecture

A personal hub of small single-purpose apps, built with React 19 + TypeScript + Vite. Configured as a PWA (via `vite-plugin-pwa`) with `base: "./"` for relative-path deployment.

**Routing** — `src/index.tsx` uses `HashRouter` with route-per-app. Each app lives at `/<slug>`.

**Adding an app:**
1. Create `src/apps/YourApp.tsx` (default export a React component)
2. Register the route in `src/index.tsx`
3. Add an entry to the `apps` array in `src/pages/Home.tsx` (slug, icon, name, desc, color, border, bg, status)

**Existing apps:**
- `/fitness` — 40-day gym + running plan for a Tokyo 5K. Tracks session completion in `localStorage` under the key `fitness-done`. Entirely self-contained in `src/apps/Fitness.tsx`.
- `/flow` — stub app; types defined in `src/types/flow.ts` (`BaseNode` with shape union: RECTANGLE, CIRCLE, PARALLELOGRAM)

**Styling** — inline styles throughout; dark theme using `#07070f` background. No CSS framework or component library. The shared `home-grid` class is in `src/index.css`.
