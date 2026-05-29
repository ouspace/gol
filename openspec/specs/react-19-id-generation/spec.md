# Spec: React 19 ID Generation

## Requirement IDs

- FR-003: Component must use `useId()` for SSR-safe ID generation
- FR-004: `generateId()` helper must be removed from `helpers.ts`

## Objective

Replace `Math.random()`-based ID generation with React 19's `useId()` hook to ensure SSR-safe ID generation and eliminate hydration mismatches.

## UX Behavior

No user-facing changes. IDs remain optional; when not provided via `id` prop, a stable fallback is generated.

## Contracts Impacted

- `helpers.ts`: Remove `generateId()` function
- `root.tsx`: Add `useId()` hook call

## Acceptance Criteria

**Given** a Checkbox component without an `id` prop
**When** the component renders on the server
**Then** the generated ID is deterministic and matches the client-side ID (no hydration mismatch)

**Given** a Checkbox component with `id="custom-id"`
**When** the component renders
**Then** the input element has `id="custom-id"` (prop takes precedence)

**Given** a Checkbox component without an `id` prop
**When** the component renders
**Then** the input element has an auto-generated ID from `useId()`

**Given** the `helpers.ts` file
**When** inspecting the implementation
**Then** there is no `generateId()` function exported

## Risks

- **Assumption**: Project uses React 19 or later (verified: skill requires React 19)
- **Assumption**: `useId()` is available in the React version used (verified: React 18.0+ includes `useId()`)
- **Open Question**: Does the project use SSR? If client-only, `useId()` still provides benefits (stable IDs across renders)
