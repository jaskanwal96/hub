# context/design.md — Layer 2: Design system

> Answers "what do I do?" when touching tokens, colors, or styles.

## Token pipeline

```
tokens/color/*.json   ← source (Style Dictionary format)
  └─ style-dictionary.config.js
        └─ src/styles/tokens.css   ← CSS custom properties output
        └─ src/styles/tokens.ts    ← TypeScript constants output
```

Run `pnpm build` or the Style Dictionary CLI to regenerate after editing token JSON.

## Token files

| File | Contents |
|------|----------|
| `tokens/color/base.json` | Raw palette values |
| `tokens/color/semantic.json` | Purpose-mapped aliases (bg, fg, border…) |
| `tokens/color/activity.json` | Activity/status colors (fitness, flow states) |
| `tokens/color/zone.json` | Zone-specific overrides |

## Styling conventions

- **Dark theme** — base background `#07070f`, primary text `#e2e8f0` / `#f1f5f9`
- **Inline styles only** — no CSS framework, no component library
- **Muted text** — `#475569` (secondary), `#334155` (tertiary/labels)
- **Accent** — `#22d3ee` (cyan) is the default accent across all current apps
- **Font** — `monospace` stack everywhere
- **Shared CSS class** — `home-grid` is the only shared class; defined in `src/index.css`

## Adding a new color token

1. Add to the appropriate `tokens/color/*.json`
2. Run style-dictionary to regenerate `src/styles/tokens.css` and `tokens.ts`
3. Import from `src/styles/tokens.ts` in app code — do not hardcode hex values that should be tokens
