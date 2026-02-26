# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Worth Find Pro (禄马真经)** is a client-side "workplace value calculator" wrapped in a Chinese fortune-telling aesthetic. All calculations happen in the browser—no backend API calls for core functionality.

**Tech Stack**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + Zustand + React Hook Form + Zod + ECharts
**Deployment**: Cloudflare Pages via `@opennextjs/cloudflare` adapter

---

## Essential Commands

```bash
# Development
pnpm dev              # Start local dev server
pnpm lint             # Run ESLint

# Testing
pnpm test             # Run all tests
pnpm test -- scoring.test.ts  # Run specific test file

# Build (Standard)
pnpm build            # Standard Next.js build (outputs to .next/)

# Build & Deploy (Cloudflare Pages)
pnpm build:cloudflare # Runs opennextjs-cloudflare build (outputs to .open-next/)
pnpm deploy           # Runs opennextjs-cloudflare deploy (via wrangler)
```

**For Cloudflare Pages CI/CD**: Set build command to `pnpm run build:cloudflare` and deploy command to `pnpm run deploy`.

---

## Architecture: Client-First Static App

### Key Design Decisions

1. **Pure Client-Side Calculation**: All scoring logic runs in the browser. No API routes for the calculator—Zustand state + localStorage only.

2. **Static Export with Cloudflare Adapter**: The app uses `@opennextjs/cloudflare` to deploy to Cloudflare Pages. This is NOT a traditional server deployment.
   - `open-next.config.ts` uses `defineCloudflareConfig({})` wrapper
   - `wrangler.toml` specifies `main = ".open-next/worker.js"` and `[assets]` binding

3. **Zustand for State**: Form state is persisted to localStorage under `"worth-find-pro-state"`. The store pattern:
   ```typescript
   // lib/store.ts
   const useStore = create<CalcState>()(
     persist(
       (set) => ({ ... }),
       { name: "worth-find-pro-state" }
     )
   )
   ```

4. **Form + Schema Pattern**: React Hook Form uses Zod schemas from `lib/schema.ts`. Custom handling for arrays (PUA items checkbox group).

---

## App Structure

```
app/
├── layout.tsx          # Root layout with Google Fonts (ZCOOL XiaoWei, Noto Serif SC)
├── page.tsx            # Landing: 天机阁
├── calc/page.tsx       # 4-step form: 四柱排盘
├── result/page.tsx     # Results with radar chart + export to PNG
└── globals.css         # Custom Chinese aesthetic CSS classes
```

**No dynamic routes, no middleware, no API routes**—just 3 static pages.

---

## Scoring Algorithm (Core Logic)

Located in `lib/scoring.ts`. The K-Score formula:

```
K = (actualHourly × benefitFactor × moodFactor) / (commuteLoss × puaLoss)
```

**Five rating levels**:
- `K > 3.0`: 大罗金仙
- `2.0 < K < 3.0`: 元婴老怪
- `1.0 < K < 2.0`: 筑基散修
- `0.5 < K < 1.0`: 凡人牛马
- `K < 0.5`: 万年尸王

**Four radar dimensions**: `valuePower` (含金量), `wellness` (养生度), `freedom` (逍遥值), `harmony` (人和值)

---

## Styling System

### Custom CSS Classes (in `globals.css`)

These classes define the Chinese aesthetic:
- `.scroll-card` - Scroll/paper card with inset shadows
- `.seal-btn` - Red stamp-style button (故宫红: #C8102E)
- `.ghost-btn` - Ink-outlined button
- `.scroll-input`, `.scroll-select` - Form styling
- `.check-tag` - Checkbox as selectable tag with seal indicator
- `.scroll-range` - Custom range slider

### Tailwind Config (tailwind.config.ts)

- **Custom colors**: `ink` (#1a1a1a), `vermilion` (#C8102E), `gold` (#D4AF37), `parchment` (#F5E6C8), `jade` (#7B9E87)
- **Fonts**: ZCOOL XiaoWei (headers), Noto Serif SC (body)
- **Path alias**: `@/*` maps to root

### Background Texture

Uses SVG noise + repeating linear gradient for parchment paper effect (defined in `globals.css` body).

---

## Export Functionality

Uses `html-to-image` for client-side PNG export:
- Individual talisman card export (`TalismanCard`)
- Full result page export (`ResultPage`)

No server-side generation. ECharts radar chart is dynamically imported to avoid SSR issues.

---

## Type Safety & Validation

- **Zod schemas** in `lib/schema.ts` for runtime validation
- **Shared types** in `lib/types.ts`
- **Full TypeScript strict mode**

---

## Reserved API Contract (Future)

The PRD (`docs/prd.md`) specifies a future anonymous reporting API (company name + score only) for a "宗门排行榜" (company rankings). Not implemented in MVP.

---

## Deployment Notes

### OpenNext + Cloudflare Pages

The app is deployed as a Cloudflare Worker (not a traditional Pages static site):

1. `opennextjs-cloudflare build` generates `.open-next/` with `worker.js` entry point
2. `wrangler.toml` configures the worker binding and assets directory
3. `opennextjs-cloudflare deploy` uses wrangler to deploy

**Important**: The `build` script is `next build` (standard), while `build:cloudflare` runs the OpenNext bundler. These produce different outputs (`.next/` vs `.open-next/`).

### Environment Variables

API keys should be stored in Cloudflare dashboard as secrets, not in code. For local dev, use `wrangler.toml` secrets (don't commit actual keys).

---

## Common Patterns

### Adding a New Form Field

1. Add field to `CalcInput` type in `lib/types.ts`
2. Add validation rule to Zod schema in `lib/schema.ts`
3. Add input component to appropriate step in `app/calc/page.tsx`
4. Update `scoring.ts` to use the new value in calculations

### Styling a New Component

Use existing custom classes from `globals.css` for Chinese aesthetic. For new UI patterns, follow the naming convention `.scroll-*` or `.seal-*` and define in globals.css.

### Testing

Scoring logic tests are in `tests/scoring.test.ts`. Copywriting (文案) tests are in `tests/copywriting.test.ts`. Jest is configured with `jsdom` environment and path alias support.
