---
status: drafting
version: 1.0.0
context_bounds:
  - "apps/ui/src/components/chip/**"
  - "apps/ui/src/components/chip/__stories__/**"
invariants:
  - "Public API of Chip (named export from `apps/ui/src/components/chip/index.ts`) must remain `export { Chip } from ...` with type `Properties` re-exported; consumers must not break."
  - "All 28 existing tests in `chip.test.tsx` must continue to pass after the refactor (no behavioral regressions)."
  - "Visual output must be byte-identical to the pre-refactor component for every existing story in `chip.stories.tsx`."
  - "No new dependencies may be added; only existing `react`, `lodash`, `ts-pattern`, `clsx` may be used."
  - "Component must remain React 19 idiom compliant: no `forwardRef`, no manual `useMemo`/`useCallback` for trivial derivations, CSS variables injected via the `style` prop (not `useLayoutEffect` mutations)."
---

# Proposal: Refactor Chip Component to Match Checkbox Pattern

## Intent

The `Chip` component at `apps/ui/src/components/chip/` was authored before the workspace adopted a unified component scaffolding convention. The recently-refactored `Checkbox` component at `apps/ui/src/components/chip/../checkbox/` establishes the canonical pattern (per the `react-component-standards` and `fluent-css` skills), and `Chip` now deviates from it in several ways.

This refactor realigns `Chip` to the same conventions **without changing its public behavior or visual output**. The goal is consistency: every component in `apps/ui/src/components/` should be readable, modifiable, and testable using the same mental model.

## Scope

### In scope
- Renaming `chip/chip.tsx` → `chip/root.tsx` to match `checkbox/root.tsx`.
- Renaming `chip/helpers.tsx` → `chip/helpers.ts` (no JSX in helpers; extension should not be `.tsx`).
- Renaming `chip/__test__/chip.test.tsx` → `chip/__tests__/chip.test.tsx` and removing the now-empty `__test__/` directory. The empty `__tests__/` directory becomes the canonical location (matching `checkbox/__tests__/`).
- Renaming `chip/styles/state.css` → `chip/styles/states.css` (plural, matching `checkbox/styles/states.css`) and updating the `@import` in `chip/styles/index.css`.
- Replacing the discriminated-union `ChipsProperties` type with a single `Properties` interface (matching `checkbox/types.ts`). Per-role constraints move to JSDoc `@remarks`. Out-of-role props (e.g. `avatar` on `role="suggestion"`) remain silent no-ops at runtime, as today.
- Replacing the `useRef` + `useLayoutEffect` DOM-mutation pattern (which writes `--chip-color-inject`, `--chip-size-inject`, `--chip-border-radius-inject`, `aria-disabled`, `aria-pressed`) with a declarative `style` object on the rendered element (matching `checkbox/root.tsx` lines 30-34).
- Removing `useMemo` for `radius`/`color`/`size` derivation — values come from `toDefaults` and are trivial to compute; the React Compiler handles memoization.
- Updating `chip/__stories__/chip.stories.tsx` to import `Chip` from `../root` instead of `../chip`.
- Updating `chip/index.ts` to re-export the default from `./root` instead of `./chip`.
- Updating the test file's import to use the public `index.ts` barrel.

### Out of scope (explicit non-goals)
- **No changes to CSS files** other than the `state.css` → `states.css` rename and its `@import`. Hex literals in `helpers.tsx`'s `toColor` (e.g. `#3B82F6` for `primary`) stay as-is. A future change can extract them to CSS custom properties.
- **No changes to the `__stories__/chip.mdx` or `__stories__/default.snippet.tsx`** (if they exist; not inspected yet).
- **No new stories, no new tests, no API additions.** This is a pure structural refactor.
- **No changes to `onClick` semantics for `<span>` chips** (the existing `tabIndex={0}` is preserved). Switching to `<button>` for clickable spans is a separate accessibility concern.
- **No replacement of the `Icon` import** (`import { Icon } from '../icon'`) inside `root.tsx` — the current usage is correct and matches `checkbox/root.tsx`.
- **No migration to a controlled/uncontrolled `useControllableState` pattern.** Out of scope for a structural refactor; the current `selected` prop is already externally controlled by convention.

## Technical Approach

The refactor follows the same recipe that was applied to `checkbox`:

1. **Scaffolding normalization**: rename files to the convention, move the test to `__tests__/`, fix the empty directory.
2. **Type simplification**: collapse the `ChipsProperties = AssistProperties | FilterProperties | InputProperties | SuggestionProperties` union into a single `Properties` interface. This is possible because the union's discriminators (`role`) don't actually narrow props at the type level for external consumers (the union has no `never` returns — every variant permits every prop the other variants also have). The type was load-bearing only inside `chip.tsx`, and even there it is no longer needed once we accept silent no-ops.
3. **Decoupling helpers from JSX**: `helpers.tsx` contains only pure functions returning strings/numbers — no JSX. The `.tsx` extension is wrong and forces the consumer to pay a JSX transform cost for a file that produces none.
4. **Declarative CSS variable injection**: instead of mutating `style` and ARIA attributes in `useLayoutEffect`, build a `style` object once and pass it to the rendered element. For `aria-disabled` and `aria-pressed`, pass them as React props. This eliminates an entire effect and a `useMemo`, and is more React 19-idiomatic.
5. **Discriminated element via `as` prop or type cast**: the current `const Element = defaults.href ? 'a' : 'span'` works at runtime but is tricky to type. We will keep the same pattern and add a `toNativeAnchorProps` helper (mirroring `toNativeProperties` in `checkbox/helpers.ts`) to filter out chip-specific props so that `<a>` receives only valid anchor attributes.

## Context Bounds

The implementation agent is permitted to modify only the following files:

- `apps/ui/src/components/chip/chip.tsx` (renamed to `root.tsx`)
- `apps/ui/src/components/chip/helpers.tsx` (renamed to `helpers.ts`)
- `apps/ui/src/components/chip/types.ts` (edited in place)
- `apps/ui/src/components/chip/index.ts` (edited in place)
- `apps/ui/src/components/chip/__test__/chip.test.tsx` (moved to `__tests__/chip.test.tsx`)
- `apps/ui/src/components/chip/__stories__/chip.stories.tsx` (import path fix only)
- `apps/ui/src/components/chip/styles/state.css` (renamed to `states.css`)
- `apps/ui/src/components/chip/styles/index.css` (updated `@import`)

The agent must NOT modify:
- Any other component in `apps/ui/src/components/`
- Any file in `apps/ui/src/components/chip/styles/` other than `index.css` and the renamed `state.css` → `states.css`
- Any file in `apps/ui/src/components/chip/__stories__/` other than `chip.stories.tsx`
- The `__mocks__/` directory (already empty, leave as-is)

## Invariants

1. **Public API stability**: `import { Chip } from '@gol/ui/components/chip'` (or the workspace's equivalent) and `import type { Properties } from '@gol/ui/components/chip'` must continue to resolve and behave identically.
2. **Test parity**: All 28 existing test cases in `chip.test.tsx` must pass without modification of their assertions. The only allowed edit to the test file is the import path (`'../chip'` → `'../index'`).
3. **Visual parity**: The rendered DOM and computed styles for any given story must be byte-identical to the pre-refactor output. The CSS variable names (`--chip-color-inject`, `--chip-size-inject`, `--chip-border-radius-inject`) are part of the public CSS contract and must be preserved.
4. **Dependency minimalism**: No new entries in `package.json`. Only `react`, `lodash`, `ts-pattern`, `clsx` (all already in use) may appear in imports.
5. **React 19 compliance**: No `forwardRef`. The `ref` prop is consumed via `useRef` and passed to the element. No manual `useMemo`/`useCallback` for trivial derivations.
