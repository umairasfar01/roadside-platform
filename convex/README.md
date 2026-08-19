# Convex

This directory is reserved for Convex backend code (schema, queries, mutations).

Intentionally empty for now — this phase only wires up the client connection
(`providers/convex-provider.tsx`). Schema and functions land in a later phase.

To connect a local Convex deployment, run `npx convex dev` from the repo root
and follow the prompts. It will populate `NEXT_PUBLIC_CONVEX_URL` and
`CONVEX_DEPLOYMENT` in `.env.local` and generate `convex/_generated` here.
