<!--
  Sync Impact Report
  ===================
  Version change: N/A → 1.0.0 (initial ratification)
  Modified principles: N/A (initial)
  Added sections:
    - Core Principles (4): Code Quality, Testing Standards,
      UX Consistency, Performance Requirements
    - Security & Data Integrity
    - Development Workflow & Quality Gates
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
      (Constitution Check is dynamically filled)
    - .specify/templates/spec-template.md ✅ no changes needed
      (requirements/success criteria align with principles)
    - .specify/templates/tasks-template.md ✅ no changes needed
      (polish phase covers quality/performance/security)
  Follow-up TODOs: none
-->

# Learn AI Studio Constitution

## Core Principles

### I. Code Quality

All production code MUST adhere to the following non-negotiable rules:

- **Type Safety**: TypeScript strict mode MUST be enabled. Use of
  `any` is prohibited except at system boundaries with explicit
  runtime validation.
- **Linting & Formatting**: ESLint and Prettier (or equivalent)
  MUST run on every commit. Zero warnings policy—warnings are
  treated as errors in CI.
- **Component Architecture**: React components MUST follow
  single-responsibility. Shared UI components live in
  `src/components/ui/`; feature components co-locate with their
  route in `src/app/`.
- **Naming Conventions**: Files use kebab-case. React components
  use PascalCase. Hooks use `use` prefix. API routes mirror their
  URL path structure.
- **No Dead Code**: Unused imports, variables, and unreachable
  code MUST be removed before merge. No commented-out code blocks
  in production branches.
- **Dependency Discipline**: New dependencies MUST be justified.
  Prefer standard library and existing dependencies over adding
  new packages. Pin versions in `package.json`.

**Rationale**: A Next.js + Prisma + AI pipeline codebase grows
complex quickly. Strict code quality prevents technical debt from
compounding across the frontend, API routes, and AI integration
layers.

### II. Testing Standards

Every feature MUST include sufficient test coverage to prevent
regressions:

- **Unit Tests**: All utility functions in `src/lib/`, server
  actions in `src/actions/`, and data access in `src/data/` MUST
  have unit tests covering happy path and primary error cases.
- **Integration Tests**: API routes (`src/app/api/`) MUST have
  integration tests validating request/response contracts,
  authentication guards, and error responses.
- **AI Output Validation**: AI-generated content (course outlines,
  modules) MUST be validated against a schema before persistence.
  Tests MUST cover malformed LLM output scenarios.
- **Test Isolation**: Tests MUST NOT depend on external services
  (Gemini API, Pinecone, Redis) in CI. Use mocks or fixtures for
  external dependencies.
- **Regression Gate**: No PR may be merged if any existing test
  fails. New code touching existing modules MUST verify existing
  tests still pass.

**Rationale**: The system integrates multiple external services
(Gemini, Pinecone, Redis, PostgreSQL). Without disciplined testing,
a change in one integration can silently break others.

### III. User Experience Consistency

The user-facing interface MUST deliver a coherent, predictable
experience:

- **Design System Compliance**: All UI MUST use components from
  `src/components/ui/`. Custom one-off styling is prohibited—
  extend the design system instead.
- **Loading & Error States**: Every async operation MUST display
  a loading indicator (skeleton or spinner) and a meaningful error
  message on failure. Empty states MUST be handled explicitly.
- **Responsive Design**: All pages MUST render correctly at
  mobile (360px), tablet (768px), and desktop (1280px) breakpoints.
  Touch targets MUST be at least 44×44px on mobile.
- **Accessibility Baseline**: Interactive elements MUST have
  accessible labels. Color MUST NOT be the sole indicator of state.
  Keyboard navigation MUST work for all primary flows.
- **Toast & Feedback Patterns**: User feedback MUST use the
  existing toast system (`src/components/ui/toast.tsx`). Success,
  error, and info toasts MUST be visually distinct.
- **Theme Support**: Light and dark modes MUST both be fully
  functional. No hardcoded color values—use CSS variables and
  Tailwind theme tokens.

**Rationale**: Learn AI Studio targets learners of varying
technical ability. Inconsistent UX erodes trust in AI-generated
content and increases support burden.

### IV. Performance Requirements

The application MUST meet these performance targets:

- **Page Load**: Largest Contentful Paint (LCP) MUST be under
  2.5 seconds on a 4G connection. First Contentful Paint (FCP)
  MUST be under 1.8 seconds.
- **API Response Time**: Non-AI API routes MUST respond within
  500ms at p95. AI generation endpoints MUST stream responses and
  deliver first chunk within 2 seconds.
- **Bundle Size**: Client-side JavaScript bundle per route MUST
  NOT exceed 200KB gzipped. Dynamic imports MUST be used for
  heavy components (charts, markdown renderer).
- **Database Queries**: Prisma queries MUST avoid N+1 patterns.
  Queries returning lists MUST use pagination. No unbounded
  `findMany()` calls without `take` limits.
- **Caching Strategy**: Frequently accessed, rarely changing data
  (course outlines, user credit counts) MUST leverage Redis
  caching with explicit TTL. Cache invalidation MUST be
  deterministic—no stale reads after writes.
- **Image & Asset Optimization**: All images MUST use Next.js
  `Image` component or equivalent optimization. SVG assets MUST
  be inlined or served from `public/assets/svg/`.

**Rationale**: Learners access the platform on varied devices and
connections. Slow page loads and API latency directly reduce course
completion rates and user retention.

## Security & Data Integrity

All code MUST comply with these security requirements:

- **Authentication**: All non-public routes MUST be protected via
  NextAuth middleware (`src/middleware.ts`). Session tokens MUST
  be HTTP-only, Secure, SameSite=Lax.
- **Input Validation**: All user input entering API routes MUST
  be validated with Zod schemas (as defined in `src/schemas/`).
  Never trust client-side validation alone.
- **SQL Injection Prevention**: All database access MUST go
  through Prisma ORM. Raw SQL is prohibited unless reviewed and
  parameterized.
- **Secrets Management**: API keys, database URLs, and auth
  secrets MUST live in environment variables. Never commit
  `.env` files. Secrets MUST NOT appear in client-side bundles.
- **Credit System Integrity**: Credit deduction MUST be atomic.
  Race conditions in credit checks MUST be prevented via
  database transactions or Redis locks.

## Development Workflow & Quality Gates

The team MUST follow this workflow for all changes:

- **Branch Strategy**: Feature branches from `main`. Branch
  names follow `<type>/<short-description>` (e.g.,
  `feat/course-export`, `fix/credit-race-condition`).
- **PR Requirements**: Every PR MUST include a description of
  what changed and why. PRs touching UI MUST include screenshots
  or a screen recording.
- **CI Pipeline**: On every PR: lint, type-check, test suite.
  All three MUST pass before merge is allowed.
- **Database Migrations**: Schema changes MUST use Prisma
  migrations (`prisma migrate dev`). Direct database
  manipulation is prohibited in staging/production.
- **Environment Parity**: Local development, staging, and
  production MUST use the same database engine (PostgreSQL)
  and cache layer (Redis). SQLite or in-memory substitutes
  are not acceptable for integration testing.

## Governance

This constitution is the authoritative source of engineering
standards for Learn AI Studio. It supersedes informal practices,
ad-hoc decisions, and individual preferences.

- **Compliance**: All PRs and code reviews MUST verify adherence
  to these principles. Reviewers MUST cite the relevant principle
  number when requesting changes for constitution violations.
- **Amendments**: Changes to this constitution require:
  1. A written proposal describing the change and rationale.
  2. Review and approval by at least one maintainer.
  3. A migration plan for existing code if the change is
     backward-incompatible.
- **Versioning**: This constitution follows semantic versioning:
  - MAJOR: Removal or redefinition of an existing principle.
  - MINOR: Addition of a new principle or material expansion.
  - PATCH: Clarifications, wording, or formatting fixes.
- **Complexity Justification**: Any deviation from these
  principles MUST be documented in the relevant PR with an
  explicit justification and a plan to resolve the deviation.

**Version**: 1.0.0 | **Ratified**: 2026-03-07 | **Last Amended**: 2026-03-07
