# Architecture Context

## Stack

| Layer              | Technology                  | Role                                                           |
| ------------------ | --------------------------- | -------------------------------------------------------------- |
| Framework          | Next.js 16 + TypeScript     | Full-stack app with server/client boundaries                   |
| UI                 | Tailwind + shadcn/ui        | Component composition and styling                              |
| Auth               | Clerk                       | User identity and route protection                             |
| Database           | Prisma + PostgreSQL         | Relational metadata: projects, collaborators, specs, task runs |
| Canvas             | Liveblocks + React Flow     | Real-time collaborative canvas, presence, and cursors          |
| Background tasks   | Trigger.dev                 | Durable AI design generation and spec generation workflows     |
| Artifact storage   | Vercel Blob                 | Canvas snapshots and generated Markdown specs                  |

## System Boundaries

- **`app/api`** — Authenticated request handlers: input validation, ownership checks,
  task triggering, and persistence. Handlers are thin; complexity belongs in shared
  modules or background tasks.
- **`trigger`** — Long-running background jobs: AI design generation from prompts and
  Markdown spec generation from the canvas graph.
- **`lib`** — Shared infrastructure: Prisma client, access control helpers, Clerk
  utilities, and domain logic utilities.
- **`components`** — UI composition: canvas surfaces, sidebars, dialogs, and
  interactive elements. No business logic, no data fetching.
- **`prisma`** — Database schema and generated client output. Schema is the source of
  truth for data structure and relationships.
- **`data`** — Legacy local directory. Not used for new artifacts; retained for
  backwards compatibility only.

## Storage Model

- **Database (PostgreSQL via Prisma)**: Project metadata, ownership, collaborator
  relationships, specification records, and task run records. All relational data
  with ownership and auth invariants lives here.
- **Vercel Blob**: Generated artifacts — canvas snapshots stored at
  `canvas/{projectId}.json` and specs stored at `specs/{projectId}/{specId}.md`.
  Prisma stores only the blob URL reference (`canvasJsonPath`, `filePath`).

**Critical rule**: Do not store large generated content directly in the database.
Only store references to blob URLs. Canvas and spec content is retrieved from Blob
on demand.

## Auth and Access Model

- Every user signs in via Clerk. Every project has a single owner (Clerk user ID).
- Projects can include additional collaborators, stored in the `ProjectCollaborator`
  table.
- Only authenticated users can access protected routes. Route protection uses Clerk
  middleware.
- Only the owner or a collaborator can mutate project resources. Ownership checks
  run on every mutation API.
- Liveblocks room tokens are issued only after verifying project membership in the
  database. A user cannot enter a canvas unless they own or collaborate on the
  project.

## Starter System Designs

- Prebuilt templates are static canvas snapshots stored in the codebase under
  `data/templates/` (e.g., monolith, microservices, event-driven, serverless).
- Templates are JSON-serialized in the same node/edge schema as the user-created
  canvas.
- When a user imports a template, the snapshot is loaded into the active Liveblocks
  room, merging with existing content.
- Import can occur on canvas creation or from within the editor at any time.
- Template data follows the exact same node/edge schema as user-created canvas —
  no special handling or transformation.

## Invariants

1. Request handlers do not run long-lived AI work — that belongs in background
   tasks (Trigger.dev). Handlers trigger tasks and return immediately.
2. Metadata and large generated artifacts are stored in separate layers. Prisma
   holds only references; Blob holds content.
3. Auth and ownership are enforced at every mutation boundary. No operation mutates
   a project resource without first verifying the user is the owner or a
   collaborator.
4. Client components are used only where browser interactivity, hooks, or real-time
   state require them. Default to React Server Components.
5. The canvas schema must remain consistent between user-created content and
   imported templates. Both use the same node/edge types and data structures.
