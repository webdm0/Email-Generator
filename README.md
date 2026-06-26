# AI Email Generator

Full-stack MVP for AI email generation built with `Next.js 16`, `TypeScript`, `Tailwind CSS`, `Supabase SSR Auth`, and `Google Gemini`.

## Overview

The project includes:

- landing page with hero, benefits, FAQ, and CTA
- Supabase authentication with sign up, sign in, and sign out
- protected dashboard for email generation
- Gemini or explicit mock generation mode
- pricing page with upgrade stub flow
- profile page with current user info
- global error boundaries and responsive UI

## Tech Stack

- `Next.js 16` App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Supabase` with `@supabase/ssr`
- `@google/generative-ai`
- `Radix UI` primitives
- `framer-motion`
- `Vitest`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Copy env file:

```bash
cp .env.example .env.local
```

3. Fill required Supabase variables in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Choose generation mode:

- Mock mode for local MVP work:
  Set `USE_MOCK=true`
- Real Gemini mode:
  Set `USE_MOCK=false` and provide `GEMINI_API_KEY`

Important: if `USE_MOCK=false` and `GEMINI_API_KEY` is empty, generation will fail by design.

5. Create the Supabase table using:

- [supabase/migrations/0001_init.sql](/home/blood/project/Email-Generator/supabase/migrations/0001_init.sql)

6. Start the app:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Project Structure

```text
src/
  app/                 App Router pages, API routes, error boundaries
  components/          shared layout, UI, motion, toast, error components
  features/            feature modules for auth, dashboard, marketing, pricing, profile
  lib/
    ai/                Gemini/mock generation logic, schemas, provider switching
    supabase/          browser/server/middleware Supabase clients
    env.ts             typed env access
  types/               shared domain and auth types
supabase/
  migrations/          SQL schema for saved generations
```

## Architecture Notes

- Auth is implemented through `@supabase/ssr` so Server Components and Route Handlers can read the active session through cookies.
- `proxy.ts` refreshes Supabase auth state on matching requests.
- `/dashboard` and `/profile` are protected on the server.
- `/api/generate` validates payloads, checks the authenticated user, generates text, and saves every successful generation into `email_generations`.
- AI generation is isolated in `src/lib/ai` so provider behavior stays easy to evolve.
- `USE_MOCK` makes the active mode explicit instead of silently falling back.

## Testing

Current automated coverage includes:

- generation input schema validation
- provider mode switching
- generation orchestration for `gemini` and `mock`

Run:

```bash
npm run test
```

## Docker

The project includes:

- [Dockerfile](/home/blood/project/Email-Generator/Dockerfile)
- [.dockerignore](/home/blood/project/Email-Generator/.dockerignore)

The Docker image uses a multi-stage build and Next.js standalone output.

## AI Development Report

Development history and AI-assisted workflow are documented in:

- [AI-DEVELOPMENT-REPORT.md](/home/blood/project/Email-Generator/AI-DEVELOPMENT-REPORT.md)

## Key Decisions

- Supabase was chosen for fast MVP auth with SSR-safe cookies.
- Gemini is the primary real model because it offers a strong free-tier path for MVP usage.
- Explicit mock mode is preserved for demos, local development, and safe fallback testing.
- Pricing uses a Stripe-ready stub flow instead of live billing, which matches the MVP scope.
