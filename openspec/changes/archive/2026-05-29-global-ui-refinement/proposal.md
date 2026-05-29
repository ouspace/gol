---
status: drafting
version: 1.0.0
context_bounds:
  - "apps/ui/src/types/tokens.ts"
  - "apps/ui/src/components/text/types.ts"
  - "apps/ui/src/components/chip/types.ts"
  - "apps/ui/src/components/radio/types.ts"
  - "apps/ui/src/components/checkbox/types.ts"
  - "apps/ui/src/components/text-field/types.ts"
invariants:
  - "Must not break the existing public API of components"
  - "Existing Storybook stories must continue to function"
  - "Existing unit tests must pass"
  - "Exported TypeScript types must be structurally identical to previous ones"
---

# Proposal: Global UI Code Architecture and Type-Safety Refinement

## Intent

The UI component library contains code quality and typing issues that violate core software engineering principles (DRY, SOLID) and introduce unstable compilation risks:
1. **Redundancy and Code Duplication (Violates DRY):** Core components independently re-define the exact same design token types (colors, dimensions, units), leading to maintenance overhead.
2. **TypeScript Compilation Instability (Missing Core Interfaces):** The `TextField` component suffers from compiling errors under strict checking due to missing type declarations (`Size`, `CssColor` imports are completely absent from its types file).
3. **Weak Typings and Unsafe Coercions (Violates ISP & SOLID):** Property structures coupling native HTML element properties and component-specific custom properties rely heavily on unsafe double-casting (e.g. `as React.InputHTMLAttributes...` in render layers). This compromises type-safety at compilation boundaries.

This specification unifies the design system's TypeScript architecture, enforces Interface Segregation (ISP), and establishes clean parameters adapter patterns across the component foundation.

## Scope

### In Scope
- **FR-GL-001 (Unified UI Design Token Typings - DRY):** Centralize all shared TS types (colors, dimensions, CSS units) under `apps/ui/src/types/tokens.ts` and import them strictly across the 5 core components (`Text`, `Chip`, `Radio`, `Checkbox`, `TextField`).
- **FR-GL-002 (Decoupled Properties Pattern - Clean Types & ISP):** Eliminate unsafe type assertions/coercions (`as`) in property normalization. Refactor types definitions in `TextField`, `Radio` and `Checkbox` to segregation boundaries (ISP), resolving missing types in `TextField`.

### Out of Scope
- Modifying CSS stylesheets, nested CSS fallbacks, custom properties definitions, typographical scales, colors mapping, or interaction visual layers (hover/focus/pressed styling).
- Changing runtime rendering structures or changing dynamic DOM styling in React.

## Technical Approach

| FR | Improvement | Impact |
|---|---|---|
| FR-GL-001 | Centralized `tokens.ts` module | Strict compile safety, eliminates redundant duplicate code (DRY) |
| FR-GL-002 | Strict Interface Segregation (ISP) and safe parameter mappings | Decoupled types contracts, zero unsafe `as` casting at component render boundaries |

## Invariants
- Component public prop signatures are unchanged.
- Existing Storybook stories render without alterations.
- All existing unit tests pass cleanly.
