# context/patterns.md — Layer 3: Reference / rules

> Answers "what rules apply?" across the whole repo.

## Core constraints

- **No CSS framework, no component library** — inline styles only
- **No test framework** — `pnpm build` (TypeScript + Vite) is the only correctness check
- **No over-engineering** — prefer single-file apps; only split into a folder when a file grows unwieldy
- **Self-contained apps** — each app owns its own state, styles, and logic; no shared app-level state
- **PWA + relative paths** — `base: "./"` in vite.config; all asset paths must be relative

## TypeScript

- Strict mode is on (`tsconfig.json`)
- Use `interface` for prop shapes, `type` for unions/aliases
- Extend the `Window` interface in `src/vite-env.d.ts` for any custom browser globals (e.g. `window.storage`)
- No `any` — use proper types or `unknown` + narrowing

## React patterns

- React 19 with `createRoot`
- Functional components only, hooks for state
- `HashRouter` routing (required for static/PWA deployment without server config)
- Default-export the root component from each app file

## Commits & git

- Small, focused commits per change
- Dark theme and monospace aesthetic are intentional — do not "fix" them

## Scripts

- `scripts/apartment-searcher.py` is triggered by `.github/workflows/apartment-checker.yml`
- It runs in CI, not locally — do not add local dependencies it requires without also updating the workflow
