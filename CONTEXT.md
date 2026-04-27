# CONTEXT.md — Layer 1: Navigation

> Read CLAUDE.md first. This file answers "where do I go?"

## Areas

| Area | Layer 2 context | Working files |
|------|----------------|---------------|
| Apps | [context/apps.md](context/apps.md) | `src/apps/`, `src/pages/Home.tsx`, `src/index.tsx` |
| Design system | [context/design.md](context/design.md) | `tokens/`, `src/styles/`, `style-dictionary.config.js` |
| Coding patterns | [context/patterns.md](context/patterns.md) | repo-wide |
| Scripts | — (self-documenting) | `scripts/apartment-searcher.py` |

## Quick orientation

```
src/
  index.tsx          ← HashRouter root; register new routes here
  pages/Home.tsx     ← app grid; add entries to the `apps` array here
  apps/              ← one file (or folder) per app
  styles/            ← design token CSS + TS exports
  types/             ← shared TypeScript types
  store/             ← state (currently flow.ts only)
tokens/              ← Style Dictionary source JSON
scripts/             ← automation (apartment checker → GitHub Actions)
```

## Adding a new app — checklist

1. `src/apps/YourApp.tsx` — default-export a React component  
2. `src/index.tsx` — add `<Route path="/slug" element={<YourApp />} />`  
3. `src/pages/Home.tsx` — add entry to the `apps` array  
4. See `context/apps.md` for the card field spec
