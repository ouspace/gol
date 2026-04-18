---
status: drafting
version: 1.0.0
context_bounds:
  - "apps/ui/src/components/icon/*.ts"
  - "apps/ui/src/components/icon/*.tsx"
invariants:
  - "Must preserve existing Storybook behavior"
  - "Must not break existing icon lookups"
  - "Must remain compatible with React Native Web (react-native-svg)"
---

# Proposal: Icon Component Refinement

## Intent
The goal is to refine the `Icon` component to fully align with MD3 standards and improve developer experience through better type safety and predictable visual scaling. Specifically, we need to map weight enums to MD3 numeric values, support all size enums, ensure SVG elements scale correctly within their containers, and handle React refs safely.

## Scope
- **In Scope**:
    - `apps/ui/src/components/icon/helpers.ts`: Weight mapping, size enum validation.
    - `apps/ui/src/components/icon/root.tsx`: SVG scaling logic, ref handling.
    - `apps/ui/src/components/icon/types.ts`: Type definitions for sizes and weights.
- **Out of Scope**:
    - Adding new icons to the library.
    - Modifying global styles outside the icon component.

## Technical Approach
- **Weight Mapping**: Standardize `toWeight` to return MD3-compliant weights (100-700) for all enums.
- **Size Enums**: Ensure `smallest` and `biggest` are fully supported in both logic and styles.
- **SVG Scaling**: Modify `root.tsx` to set SVG `height` and `width` to `100%` when an enum size is used, letting the container control dimensions.
- **Ref Safety**: Implement a robust ref forwarding pattern that handles both `RefObject` and callback refs.

## Context Bounds
- `apps/ui/src/components/icon/helpers.ts`
- `apps/ui/src/components/icon/root.tsx`
- `apps/ui/src/components/icon/types.ts`

## Invariants
- Visual consistency across existing usages must be maintained.
- The `iconKey` generation logic must remain stable to avoid breaking icon rendering.
