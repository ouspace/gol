# Spec: File Structure Alignment

## Requirement IDs

- FR-009: Component implementation must be in `root.tsx` (not `checkbox.tsx`)
- FR-010: Helper utilities must be in `helpers.ts` (not `helpers.tsx`)
- FR-011: Barrel export must import from `./root` (not `./checkbox`)

## Objective

Rename files to align with react-component-standards skill scaffolding requirements.

## UX Behavior

No user-facing changes. File names are internal implementation details.

## Contracts Impacted

- `checkbox.tsx` → `root.tsx` (rename)
- `helpers.tsx` → `helpers.ts` (rename)
- `index.ts` (update import path)

## Acceptance Criteria

**Given** the checkbox component directory
**When** listing files
**Then** `root.tsx` exists and `checkbox.tsx` does not exist

**Given** the checkbox component directory
**When** listing files
**Then** `helpers.ts` exists and `helpers.tsx` does not exist

**Given** the `index.ts` barrel file
**When** inspecting the export
**Then** it imports from `'./root'` (not `'./checkbox'`)

**Given** the test file `checkbox.test.tsx`
**When** inspecting imports
**Then** it imports from `'../root'` or uses barrel import `'..'`

**Given** the component is imported elsewhere in the codebase
**When** the import is resolved
**Then** it works correctly (barrel import abstracts file name)

## Risks

- **Assumption**: No direct imports of `./checkbox` exist outside the component directory (verify with grep)
- **Low Risk**: Barrel imports (`from '../checkbox'`) abstract file names; only internal imports need updating
