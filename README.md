# Singularity

Interactive MCTS (Monte Carlo Tree Search) visualization platform. Explore how AI agents reason through problems — from ARC-AGI puzzles to arithmetic — with animated decision trees, live replay, and per-iteration inspection.

<!-- TODO: add screenshot -->

## Tech Stack

- **Next.js 15** (App Router, React 19, Turbopack)
- **tRPC v11** (server-side caller, no client hooks)
- **Prisma v7** + **Neon Postgres** (serverless, HTTP-based adapter)
- **Tailwind CSS v4** + **Framer Motion**
- **Zod** (runtime validation)
- **pnpm**

## Getting Started

```bash
# Install dependencies (runs prisma generate as postinstall)
pnpm install

# Start local Postgres on port 5433
pnpm docker:up

# Copy env file and set DATABASE_URL
cp .env.example .env
# For local dev, .env should contain:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5433/singularity"

# Push schema to database
pnpm db:push

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page (particle brain + task picker)
│   ├── mcts/page.tsx             # ARC task visualizer (default)
│   └── mcts/[task]/page.tsx     # Task-specific visualizer
├── components/                   # Shared visualization components
│   ├── tree-canvas.tsx           # SVG decision tree with path highlighting
│   ├── iteration-timeline.tsx    # Scrub/play timeline with state previews
│   ├── candidate-actions.tsx     # MCTS action list with rationales
│   ├── decision-summary.tsx     # Best action, visit counts, value bars
│   └── visualizer-workspace.tsx  # Orchestrates all panels via TaskConfig
├── lib/
│   ├── mcts/types.ts            # Generic MCTS types (MCTSNode<S,A>, RunDataset<S,A>)
│   ├── tasks/
│   │   ├── types.ts             # TaskConfig<S,A> interface
│   │   ├── registry.ts          # Task registry (getTaskConfig, getAllTasks)
│   │   ├── arc/                 # ARC-AGI task
│   │   ├── math/                # Arithmetic Solver task
│   │   ├── word-puzzle/         # Word Puzzle task
│   │   └── template/            # Starter template
│   ├── particle-system.ts       # Canvas 2D particle animation engine
│   └── tree-layout.ts           # Generic tree layout algorithm
├── server/
│   ├── db.ts                    # Prisma client with Neon adapter
│   └── api/routers/run.ts       # tRPC router (currently returns mock data)
├── styles/globals.css           # Tailwind v4 theme, panel/glass styles
└── env.js                       # Environment variable validation
```

## Architecture

### Task System

The visualization framework is generic over state type `S` and action type `A`. Each task defines:

- **Contracts** — Zod schemas for its state and action types
- **Mock data** — A `RunDataset<S, A>` with simulated MCTS iterations
- **UI components** — Render props for task-specific visualizations

Shared components (`TreeCanvas`, `IterationTimeline`, `CandidateActions`, `DecisionSummary`) accept render props like `renderNodePreview(state)`, `renderActionMeta(action)`, etc. The `VisualizerWorkspace` wires everything together via a single `TaskConfig<S, A>` prop.

### Data Flow

Server components call the tRPC API directly (no client-side hooks). Pages at `/mcts/[task]` use `generateStaticParams` to pre-render all registered tasks.

## Available Tasks

| ID | Name | Description |
|---|---|---|
| `arc` | ARC-AGI | Abstraction and Reasoning Corpus puzzle solver |
| `math` | Arithmetic Solver | Expression search for a target value |
| `word-puzzle` | Word Puzzle | Crossword-style letter placement |
| `template` | Template | Minimal starter for building new tasks |

## Adding a New Task

1. **Create** `src/lib/tasks/<name>/` with three files:
   - `contracts.ts` — Zod schemas for `EnvState`, `ActionCandidate`, and MCTS schemas
   - `mock-data.ts` — `getMockRun()` returning `RunDataset<S, A>`
   - `index.tsx` — Export a `TaskConfig<S, A>` with metadata, data, and components
2. **Register** in `src/lib/tasks/registry.ts` with `register(newTask)`
3. **Done** — the task is available at `/mcts/<name>` automatically

## Database

| Environment | Setup |
|---|---|
| Local dev | Docker Postgres on port 5433 (`pnpm docker:up`) |
| Production | Neon Postgres (serverless, HTTP-based adapter) |

Prisma v7 uses `prisma.config.ts` for datasource config (not `url`/`directUrl` in `schema.prisma`). CLI commands like `db:push` and `migrate` require TCP access to Postgres — use local Docker or a network with direct access.

**Schema:** `DevUser`, `RunSession`, `RunStep` (not yet wired into tRPC routes — all data is currently mock).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm preview` | Build + start production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database |
| `pnpm db:migrate` | Deploy Prisma migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm docker:up` | Start local Postgres |
| `pnpm docker:down` | Stop local Postgres |

## Deployment

Deploy to **Vercel** with **Neon Postgres**:

1. Create a [Neon](https://neon.tech) project and copy the pooled connection string (hostname with `-pooler`)
2. Import your GitHub repo at [vercel.com/new](https://vercel.com/new)
3. Set environment variables in Vercel:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require` |
| `SKIP_ENV_VALIDATION` | `1` |

4. Push to your connected branch — Vercel auto-deploys on push