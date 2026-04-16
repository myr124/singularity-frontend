# AGENTS.md

## Commands

- `pnpm dev` — start dev server (uses Turbopack)
- `pnpm build` — production build
- `pnpm lint` — ESLint via `next lint`
- `pnpm typecheck` — `tsc --noEmit`

No test framework is configured. There are no test scripts, test files, or test runners.

## Database

- **Production**: Neon Postgres (serverless). Uses `PrismaNeon` adapter (HTTP-based) for connections that work in all network environments.
- **Local dev**: Docker Postgres on **port 5433** (not the default 5432). Start with `pnpm docker:up`. Switch `.env` `DATABASE_URL` to `postgresql://postgres:postgres@localhost:5433/singularity` for local dev.
- Prisma v7 uses `prisma.config.ts` for datasource config (not `url`/`directUrl` in schema.prisma). CLI commands (`db:push`, `migrate`) require TCP access to Postgres — use local Docker or run from an environment with TCP access.
- Prisma output is set to `../generated/prisma`, so the generated client lives at `generated/prisma/`. Runs automatically on `postinstall`.
- Required env var: `DATABASE_URL` (see `.env.example`). `SKIP_ENV_VALIDATION=1` bypasses env checks during build.
- Current tRPC routers return mock data only. The DB schema exists (`DevUser`, `RunSession`, `RunStep`) but is not wired into any routes yet.

## Architecture

- **T3 Stack**: Next.js 15 (App Router) + tRPC v11 + Prisma + Tailwind CSS v4 + Zod
- **Path alias**: `~/*` maps to `./src/*` in tsconfig
- **RSC data flow**: Server components call `api` from `src/trpc/server.ts` (server-side tRPC caller). No client-side tRPC hooks are used for the main data fetch.

### Task system

The app supports multiple MCTS visualization tasks. Each task defines its own state type, action type, mock data, and UI renderers.

- **Generic MCTS types**: `src/lib/mcts/types.ts` — parameterized by state `S` and action `A` (e.g. `MCTSNode<S, A>`, `RunDataset<S, A>`)
- **Task config**: `src/lib/tasks/types.ts` — `TaskConfig<S, A>` defines a task's data provider, components, and metadata
- **Task registry**: `src/lib/tasks/registry.ts` — maps task IDs to configs; `getTaskConfig(id)` and `getAllTasks()`
- **ARC task** (`src/lib/tasks/arc/`): the primary task, re-exported from `src/lib/contracts.ts` and `src/lib/mock-data.ts` for backward compat
- **Template task** (`src/lib/tasks/template/`): a minimal starter task showing the pattern
- **Adding a new task**: create a directory under `src/lib/tasks/<name>/` with `contracts.ts` (Zod schemas), `mock-data.ts` (data generator), and `index.tsx` (TaskConfig with UI components). Register it in `src/lib/tasks/registry.ts`.

### Shared components and render props

Shared visualization components (`TreeCanvas`, `IterationTimeline`, `CandidateActions`, `DecisionSummary`) accept **render props** for task-specific content:

- `TreeCanvas` → `renderNodePreview(state, size, circular?)`
- `IterationTimeline` → `renderFramePreview(state)`
- `CandidateActions` → `renderActionMeta(action)` and `formatActionKey(action)`
- `DecisionSummary` → `renderActionMeta(action)`

`VisualizerWorkspace` wires these together via a `TaskConfig<S, A>` prop.

### Routes

| Path | Description |
|---|---|
| `/` | Landing page |
| `/mcts` | ARC task visualizer (default) |
| `/mcts/[task]` | Task-specific visualizer (e.g. `/mcts/template`) |

## Key directories

| Path | Purpose |
|---|---|
| `src/app/` | Next.js App Router pages |
| `src/components/` | Shared React components (accept render props for task-specific content) |
| `src/lib/mcts/` | Generic MCTS type definitions |
| `src/lib/tasks/arc/` | ARC-AGI task (contracts, mock data, task config) |
| `src/lib/tasks/math/` | Arithmetic Solver task (contracts, mock data, task config) |
| `src/lib/tasks/word-puzzle/` | Word Puzzle task (contracts, mock data, task config) |
| `src/lib/tasks/template/` | Template task (starter for new tasks) |
| `src/lib/tasks/types.ts` | `TaskConfig` interface |
| `src/lib/tasks/registry.ts` | Task registry (add new tasks here) |
| `src/lib/contracts.ts` | Re-exports ARC types for backward compat |
| `src/lib/mock-data.ts` | Re-exports ARC mock data for backward compat |
| `src/lib/tree-layout.ts` | Generic tree layout algorithm |
| `src/lib/utils.ts` | `cn()` utility |
| `src/server/api/routers/` | tRPC routers (`run.ts`) |
| `src/trpc/` | Server-side tRPC caller |
| `generated/prisma/` | Prisma generated client (gitignored, created on postinstall) |
| `singularity-app/` | **Stale scaffold** — excluded from tsconfig `exclude`. Do not edit. |

## Conventions

- `tsconfig.json` enables `noUncheckedIndexedAccess` and `verbatimModuleSyntax`. Array/object index access returns `T | undefined`; use `!` only when you've verified the index exists.
- Tailwind v4 with `@tailwindcss/postcss` — styles use the new `@theme` and `@import "tailwindcss"` syntax (see `src/styles/globals.css`).
- Animations use `framer-motion`; the landing page is a custom canvas particle system (`ParticleSystem` class in `src/lib/particle-system.ts`).
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use this for conditional class merging.
- `src/lib/contracts.ts` and `src/lib/mock-data.ts` are **re-export shims**. Import ARC-specific types from `src/lib/tasks/arc/contracts` and data from `src/lib/tasks/arc/mock-data` in new code.
- Component files in `src/lib/tasks/*/index.tsx` contain JSX — they must use the `.tsx` extension.