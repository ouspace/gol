---
status: drafting
version: 1.0.0
context_bounds:
  - "apps/ui/src/components/text/text.tsx"
  - "apps/ui/src/components/text/factory.tsx"
  - "apps/ui/src/components/text/helpers.ts"
  - "apps/ui/src/components/text/types.ts"
  - "apps/ui/src/components/text/index.ts"
  - "apps/ui/src/components/text/__mocks__/text.tsx"
  - "apps/ui/src/components/text/__test__/text.test.tsx"
  - "apps/ui/src/components/text/__stories__/text.stories.tsx"
  - "apps/ui/src/components/text/styles/base.css"
  - "apps/ui/src/components/radio/__tests__/radio.test.tsx"
  - "apps/ui/src/components/chip/__tests__/chip.test.tsx"
  - "apps/ui/src/components/checkbox/__tests__/checkbox.test.tsx"
  - "apps/ui/src/components/text-field/__tests__/text-field.test.tsx"
invariants:
  - "The Text component public API (Properties type) must not change — no new required props, no removed props."
  - "Text.createFrom must remain available as a static method on the Text export (Object.assign pattern in index.ts)."
  - "The factory.tsx file must remain separate from helpers.ts — it has JSX and a circular import through Text itself."
  - "All existing tests must pass after refactoring."
  - "The rendered HTML output must be byte-for-byte identical before and after the refactoring."
  - "CSS class names (.text, .disabled, .italic, .nowrap, .unselectable, scale names) must not change."
  - "No new runtime dependencies may be added."
  - "The helpers file must NOT contain JSX — it is a .ts file."
  - "The root component file must be named root.tsx."
---

# Proposal: Refactor Text Component to Match Workspace Standard

## Intent

Bring the `Text` component up to the workspace standard established during the refactor of `Chip`, `Checkbox`, `Icon`, and `Radio`. The goal is architectural consistency — same file naming, same CSS variable injection pattern, same helper structure, same test hygiene — so that every UI component is maintained and extended the same way.

Additionally, this change fixes a pre-existing CSS bug in `styles/base.css` where three CSS variable fallbacks use incorrect syntax (missing `var()` wrapper around the fallback variable reference).

This is primarily a refactoring change. The only behavioral fix is the CSS syntax correction.

## Scope

**In scope:**

**Filesystem renames (git mv):**
- `text.tsx` → `root.tsx`
- `__test__/` → `__tests__/` (directory rename)
- `__mocks__/text.tsx` → `__mocks__/root.tsx`

**Internal import updates (inside text/):**
- `index.ts`: `'./text'` → `'./root'`
- `factory.tsx`: `'./text'` → `'./root'`
- `text.stories.tsx`: `'../text'` → `'../root'`
- `text.test.tsx`: `'../text'` → `'../root'`

**Cascade mock-path updates (outside text/ — unavoidable consequence of rename):**
- `radio/__tests__/radio.test.tsx`: `jest.mock('../../text/text')` → `jest.mock('../../text/root')`
- `chip/__tests__/chip.test.tsx`: same
- `checkbox/__tests__/checkbox.test.tsx`: same
- `text-field/__tests__/text-field.test.tsx`: same

**helpers.ts refactoring:**
- Export `DefaultedProperties` type (only Required over the fields that actually have concrete defaults)
- `toSize(size: Properties['size']): string | undefined` — receives only the size field, not the full object; returns `undefined` for `'normal'` (CSS handles it via fallback)
- Add `toStyle(defaults: DefaultedProperties, original?: Properties): React.CSSProperties` — encapsulates all 7 CSS variable injections
- Add `toEventProperties(defaults: DefaultedProperties): Omit<DefaultedProperties, 'onClick'>` — encapsulates the `_.omit(defaults, ['onClick'])` pattern
- Update `toClasses` signature to use `DefaultedProperties`

**root.tsx refactoring:**
- Remove `useRef`, `useLayoutEffect`, `useMemo`, `_` (lodash) imports
- Replace DOM mutation side-effects with declarative `style` object using `toStyle()`
- Extract `handleClick` as named function before `return`
- Use `toEventProperties(defaults)` inside `handleClick`

**CSS bug fix (styles/base.css):**
- Line 6: `var(--text-size, --text-base-size)` → `var(--text-size, var(--text-base-size))`
- Line 7: `var(--text-weight, --text-base-weight)` → `var(--text-weight, var(--text-base-weight))`
- Line 9: `var(--text-letter-spacing, --text-base-letter-spacing)` → `var(--text-letter-spacing, var(--text-base-letter-spacing))`

**Tests (text.test.tsx):**
- Add `beforeEach(() => jest.clearAllMocks())`
- Add `afterEach(() => jest.restoreAllMocks())`
- Add `describe('helpers', ...)` block with unit tests for `toSize`, `toStyle`, `toEventProperties`
- Import from `'../root'` instead of `'../text'`

**Stories (text.stories.tsx):**
- Import from `'../root'`
- Add `States` story (disabled, italic, nowrap, unselectable variants)
- Add `Colors` story (dynamic map over color tokens)
- Add `Weights` story
- Add `Interactions` story with `useState` + `onClick` + `play` function

**Out of scope:**
- `types.ts` — public API is frozen
- `styles/variables.css` — already correct
- `styles/states.css` — already correct
- `styles/index.css` — already correct (3-file structure: variables, base, states)
- `factory.tsx` logic — only the import path is updated, no logic changes
- `text-field` component refactoring — only its test mock path is updated

## Technical Approach

Follows the canonical pattern from `Radio/root.tsx` and `Chip/root.tsx`:

1. **File naming**: `root.tsx` for the component, `helpers.ts` for pure utilities
2. **CSS variable injection**: `toStyle()` helper returns a `style` object — no DOM mutation, no hooks
3. **Handler extraction**: `handleClick` declared before `return`, uses `toEventProperties(defaults)` for the callback argument
4. **Helper delegation**: All logic for style computation and event argument preparation lives in `helpers.ts`
5. **Test hygiene**: `beforeEach`/`afterEach` + helper unit tests
6. **Mock naming**: `__mocks__/root.tsx` consistent with Icon pattern (`__mocks__/root.tsx`)

## Context Bounds

- `apps/ui/src/components/text/` (all files)
- `apps/ui/src/components/radio/__tests__/radio.test.tsx` (mock path only)
- `apps/ui/src/components/chip/__tests__/chip.test.tsx` (mock path only)
- `apps/ui/src/components/checkbox/__tests__/checkbox.test.tsx` (mock path only)
- `apps/ui/src/components/text-field/__tests__/text-field.test.tsx` (mock path only)

## Invariants

- The Text component public API (Properties type) must not change.
- `Text.createFrom` must remain available as a static method on the Text export.
- `factory.tsx` must remain separate — it contains JSX and a dependency on the component itself.
- All existing tests must pass after refactoring.
- The rendered HTML output must be identical before and after (except the CSS bug fix).
- CSS class names must not change.
- No new runtime dependencies.
- `helpers.ts` must NOT contain JSX.
- The root component file must be named `root.tsx`.
