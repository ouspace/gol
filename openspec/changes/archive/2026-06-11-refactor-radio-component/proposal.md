---
status: drafting
version: 1.0.0
context_bounds:
  - "apps/ui/src/components/radio/radio.tsx"
  - "apps/ui/src/components/radio/helpers.tsx"
  - "apps/ui/src/components/radio/types.ts"
  - "apps/ui/src/components/radio/index.ts"
  - "apps/ui/src/components/radio/styles/state.css"
  - "apps/ui/src/components/radio/styles/index.css"
  - "apps/ui/src/components/radio/__tests__/radio.test.tsx"
  - "apps/ui/src/components/radio/__stories__/radio.stories.tsx"
invariants:
  - "The Radio component public API (Properties type) must not change — no new required props, no removed props."
  - "All existing tests must pass after refactoring."
  - "The component must render identically before and after — no visual regression."
  - "CSS class names used in existing tests (.radio, .radio__input, .radio__box, .radio__label) must not change."
  - "No new runtime dependencies may be added."
  - "The helpers file must NOT contain JSX — it is a .ts file."
  - "The root component file must be named root.tsx."
  - "The component barrel (index.ts) must export from './root', not './radio'."
---

# Proposal: Refactor Radio Component to Match Workspace Standard

## Intent

Bring the `Radio` component up to the workspace standard established during the refactor of `Chip`, `Checkbox`, and `Icon`. The goal is architectural consistency — same file naming, same CSS variable injection pattern, same helper structure, same test hygiene — so that every UI component is maintained and extended the same way.

This is a pure refactoring change: no new features, no API changes, no visual changes.

## Scope

**In scope:**
- Rename `radio.tsx` → `root.tsx`
- Rename `helpers.tsx` → `helpers.ts`
- Rename `styles/state.css` → `styles/states.css` and update the `@import` in `styles/index.css`
- Update `index.ts` to export from `'./root'`
- Replace `useLayoutEffect` + `ref.current.style.setProperty` with a declarative `style` object containing CSS custom properties (matching `Chip` pattern)
- Remove unnecessary `useMemo` wrapping `toSize()` (React Compiler handles this)
- Extract the inline `onChange` handler into a named `handleChange` function
- Extract the label rendering logic from JSX into a `toLabelContent(defaults)` helper in `helpers.ts`
- Add `beforeEach(jest.clearAllMocks)` and `afterEach(jest.restoreAllMocks)` lifecycle hooks to the test file
- Update `radio.stories.tsx` to import from `'../index'` instead of `'../radio'`
- Add at least one Storybook `play` function for the interactive `States` story

**Out of scope:**
- Changes to `types.ts` (public API is frozen for this change)
- Changes to CSS files other than the rename of `state.css` → `states.css`
- New features or prop additions
- Changes to the `Text` component or any other component

## Technical Approach

The workspace has a canonical pattern established by `Chip/root.tsx`:

1. **File naming**: `root.tsx` for the component, `helpers.ts` for utilities (no `.tsx` unless JSX is present)
2. **CSS variable injection**: Pass a `style` object with `--radio-*-inject` custom properties directly on the root element — no DOM manipulation via refs or effects
3. **Handler extraction**: Named functions (`handleChange`) before the `return`, not anonymous lambdas inside JSX
4. **Helper delegation**: All conditional rendering logic (label resolution) lives in `helpers.ts`, not inlined in JSX
5. **Test hygiene**: `beforeEach`/`afterEach` lifecycle hooks present in every test suite

## Context Bounds

- `apps/ui/src/components/radio/radio.tsx`
- `apps/ui/src/components/radio/helpers.tsx`
- `apps/ui/src/components/radio/types.ts`
- `apps/ui/src/components/radio/index.ts`
- `apps/ui/src/components/radio/styles/state.css`
- `apps/ui/src/components/radio/styles/index.css`
- `apps/ui/src/components/radio/__tests__/radio.test.tsx`
- `apps/ui/src/components/radio/__stories__/radio.stories.tsx`

## Invariants

- The Radio component public API (Properties type) must not change — no new required props, no removed props.
- All existing tests must pass after refactoring.
- The component must render identically before and after — no visual regression.
- CSS class names used in existing tests (`.radio`, `.radio__input`, `.radio__box`, `.radio__label`) must not change.
- No new runtime dependencies may be added.
- The helpers file must NOT contain JSX — it is a `.ts` file.
- The root component file must be named `root.tsx`.
- The component barrel (`index.ts`) must export from `'./root'`, not `'./radio'`.
