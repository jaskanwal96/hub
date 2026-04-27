# context/apps.md — Layer 2: Apps area

> Answers "what do I do?" when working inside `src/apps/`.

## App registry

| Slug | File | Purpose | Persistence |
|------|------|---------|-------------|
| `/fitness` | `Fitness.tsx` | 40-day gym + running plan (Tokyo 5K) | `localStorage['fitness-done']` (JSON array of completed session IDs) |
| `/flow` | `Flow.tsx` | Flowchart canvas (stub, in progress) | `src/store/flow.ts` (Zustand-style store) |
| `/bjp` | `bjp/` folder | Political data dashboard — BJP India analysis | none (static data) |
| `/krabi` | `Krabi.tsx` | Thailand trip planner | `window.storage` (custom persistence API — declared in `vite-env.d.ts`) |

## Home.tsx card fields

Each entry in the `apps` array (`src/pages/Home.tsx`) requires:

```ts
{
  slug: string;       // matches route path and file name
  icon: string;       // emoji
  name: string;       // display name
  desc: string;       // short description shown on card
  color: string;      // accent hex (used for status badge text)
  border: string;     // rgba border
  bg: string;         // rgba card background
  status: string;     // "active" | "wip" | etc. — displayed as badge
}
```

## File vs folder convention

- Single-file apps live at `src/apps/AppName.tsx`
- Multi-component apps get a folder: `src/apps/appname/` with an `index.tsx` entry point
- BJP is the only multi-component app; its sub-components are in `src/apps/bjp/`

## Krabi sub-component layout

Six sub-components defined below the main `Krabi` export in the same file (single-file pattern, not split):
`CurrentBanner`, `ActivityCard`, `Sheet`, `EditSheet`, `DatePickerSheet`, `ConfirmSheet`

## localStorage / storage conventions

- Keys are kebab-case prefixed by app slug: `fitness-done`, etc.
- `window.storage` in Krabi is a custom API (not the native `localStorage`); its type is declared as `Window` interface extension in `src/vite-env.d.ts`
