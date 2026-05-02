---
status: drafting
version: 1.0.0
context_bounds:
  - "apps/ui/src/components/icon/root.tsx"
  - "apps/ui/src/components/icon/helpers.ts"
  - "apps/ui/src/components/icon/types.ts"
  - "apps/ui/src/components/icon/styles/*.css"
invariants:
  - "Weights MUST be within Material Symbols range (100-700)."
  - "Normal weight MUST be 400 per MD3 specification."
  - "Size enums MUST handle all defined types (smallest to biggest)."
  - "Icon key generation MUST match standard naming convention: name__variant_fill_weight."
---

# Proposal: Fix Icon Compliance and Logic

## Intent
Align the `Icon` component with **Material Design 3 (MD3)** specifications and fix logic bugs in the sizing and weighting helpers.

## Scope
- **Weight Mapping**: Shift enums to align with MD3 (400=Normal, Max=700).
- **Size Enums**: Fix `isSizeEnum` and `toSize` to support all 7 defined enum levels.
- **SVG Scaling**: Ensure SVG takes `100%` width/height when enums are used.
- **Ref Type Safety**: Correct the unsafe `RefObject` cast in `root.tsx`.

## Technical Approach
- Update `toWeight` in `helpers.ts` to map enums to 100-700 range.
- Expand `isSizeEnum` and `toSize` logic to handle all `Properties['size']` enums.
- Update `root.tsx` to handle `Ref` more safely and ensure SVG fills the `<span>` container.

## Context Bounds
- `apps/ui/src/components/icon/root.tsx`
- `apps/ui/src/components/icon/helpers.ts`
- `apps/ui/src/components/icon/types.ts`
- `apps/ui/src/components/icon/styles/base.css`

## Invariants
- Weights MUST NOT exceed 700.
- Normal weight is exactly 400.
- All size enums defined in `types.ts` MUST have corresponding logic in `helpers.ts`.
