# Feature Spec: Global UI Code Architecture and Type-Safety Refinement

## Requirement IDs
- FR-GL-001: Unified UI Design Token Typings (DRY)
- FR-GL-002: Segregated Property Normalization and ISP Patterns

---

## FR-GL-001: Unified UI Design Token Typings (DRY)

### Objective
Unify all duplicate design token typings across `Text`, `Chip`, `Radio`, `Checkbox`, and `TextField` by centralizing color, size, and CSS unit definitions in `apps/ui/src/types/tokens.ts`. Eliminate local duplication and resolve `TextField`'s missing type imports compile error.

### Contracts Impacted
- `apps/ui/src/types/tokens.ts` (New module of types).
- `apps/ui/src/components/text-field/types.ts` (Importing `Size` and `CssColor` strictly).
- `apps/ui/src/components/text/types.ts`, `apps/ui/src/components/chip/types.ts`, `apps/ui/src/components/radio/types.ts`, `apps/ui/src/components/checkbox/types.ts` (Importing shared types, removing duplicate local definitions).

### Acceptance Criteria
- **AC-GL-001-1: Centralized Imports**
  - GIVEN the core components `Text`, `Chip`, `Radio`, `Checkbox`, `TextField`
  - WHEN typings for CSS colors, units, or sizes are evaluated
  - THEN they are strictly imported from `tokens.ts` without local duplicates.
- **AC-GL-001-2: TS Compilation Safety**
  - GIVEN the centralized type module
  - WHEN executing `pnpm nx typecheck ui`
  - THEN the compiler yields zero errors.

---

## FR-GL-002: Segregated Property Normalization and ISP Patterns

### Objective
Enforce the Interface Segregation Principle (ISP) on core properties definitions. Refactor types and parameter helper adapters to decouple custom component settings from native HTML elements attributes, fully removing unsafe type casting (`as`) from the rendering lifecycle of `TextField`, `Radio` and `Checkbox`.

### Acceptance Criteria
- **AC-GL-002-1: Strict Decoupled Types**
  - GIVEN helper utilities `toNativeProperties`
  - WHEN called by components
  - THEN it returns a strictly-typed `NativeProperties` object without manual type assertions.
- **AC-GL-002-2: Zero Unsafe Type Casts**
  - GIVEN components' JSX blocks
  - WHEN destructuring native attributes (e.g. `{...nativeProperties}`)
  - THEN no type casts (such as `as React.InputHTMLAttributes...`) are performed.
