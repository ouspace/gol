# Spec: Radio Component Refactoring

## Requirement IDs

- FR-01: File naming must match workspace standard (`root.tsx`, `helpers.ts`, `states.css`)
- FR-02: CSS variable injection must use declarative `style` object pattern
- FR-03: Helper functions must be pure and not import React unless necessary
- FR-04: Component JSX must be declarative — no conditional trees in return
- FR-05: Test suites must include mock lifecycle hooks
- FR-06: Stories must import from the public barrel (`index`)

## Objective

- Standardize the Radio component's file structure, patterns, and test hygiene to match the `Chip` and `Checkbox` baseline.
- Ensure any developer or LLM agent maintaining this codebase encounters the same conventions in every component directory.

## UX Behavior

- No UX behavior change. This is a pure refactoring.
- The rendered output (HTML, CSS classes, CSS variables, ARIA attributes) must be byte-for-byte identical after the refactoring.

## Contracts Impacted

- **`index.ts` public barrel**: export path changes from `'./radio'` to `'./root'`. Consumers that import from `@gol/ui` are unaffected (re-exported via the package barrel). Direct deep imports of `'../radio'` in stories must be updated.
- **`toSize` return type**: changes from `number` to `string | undefined`. Internal contract only — callers in `root.tsx` must be updated accordingly.
- **`toLabelContent` (new)**: new exported helper replacing inline label logic. Takes `NonNullable<Properties['label']>` (a `TextLike`), returns the value unchanged for function / string / ReactElement inputs, or a `_.defaults`-merged `TextProperties` for object inputs. Mirrors the existing `text-field` pattern.

## Acceptance Criteria

### AC-01 — File renaming

Given the existing radio component files,
When the refactoring is applied,
Then:
- `apps/ui/src/components/radio/root.tsx` exists
- `apps/ui/src/components/radio/helpers.ts` exists (no `.tsx`)
- `apps/ui/src/components/radio/styles/states.css` exists (plural)
- `apps/ui/src/components/radio/radio.tsx` does NOT exist
- `apps/ui/src/components/radio/helpers.tsx` does NOT exist
- `apps/ui/src/components/radio/styles/state.css` does NOT exist

### AC-02 — Barrel wiring

Given the updated `index.ts`,
When a consumer imports `{ Radio }` from `@gol/ui`,
Then the component resolves correctly and renders without error.

Given the updated `styles/index.css`,
When the styles are loaded,
Then `states.css` is imported (not `state.css`).

### AC-03 — No `useLayoutEffect` or `useRef` in root.tsx

Given the refactored `root.tsx`,
When inspected,
Then:
- There is NO `useLayoutEffect` import or call
- There is NO `useRef` call for CSS variable injection
- There IS a `style` object with `'--radio-size-inject'` and `'--radio-color-inject'` keys
- The `style` object is passed directly to the root `<label>` element

### AC-04 — No `useMemo` for toSize

Given the refactored `root.tsx`,
When inspected,
Then there is NO `useMemo` wrapping the `toSize` call.

### AC-05 — Named onChange handler

Given the refactored `root.tsx`,
When inspected,
Then:
- A `handleChange` function is declared before the `return` statement
- The `<input>` element uses `onChange={handleChange}`, not an anonymous arrow function

### AC-06 — Label logic in helpers.ts (text-field pattern)

Given the refactored `helpers.ts`,
When inspected,
Then:
- A `toLabelContent(label: NonNullable<Properties['label']>)` function is exported
- The function is a **pure shape normalizer** that mirrors `text-field/helpers.tsx:75-80`
- It handles 3 cases: function / string / ReactElement labels → returned as-is; TextProperties objects → `_.defaults`-merged with `{ className: clsx('radio__label', label.className) }`
- It does NOT handle `children`, `null`, or `undefined` — those are the caller's responsibility

Given the refactored `root.tsx`,
When inspected,
Then the label slot is resolved with `children` taking priority over `label`:
- If `defaults.children` is non-empty → render `defaults.children`
- Else if `defaults.label != null` → render `Text.createFrom(toLabelContent(defaults.label))`
- Else → render `null`

### AC-07 — toSize returns string | undefined

Given the refactored `helpers.ts`,
When `toSize('small')` is called, Then it returns `'16px'`
When `toSize('normal')` is called, Then it returns `'20px'`
When `toSize('big')` is called, Then it returns `'24px'`
When `toSize(26)` is called, Then it returns `'26px'`
When `toSize(undefined)` is called, Then it returns `undefined`

### AC-08 — helpers.ts has no JSX

Given the refactored `helpers.ts`,
When inspected,
Then:
- The file extension is `.ts` (not `.tsx`)
- The file contains NO JSX syntax (`<`, `/>`)
- The file may import `ReactNode` as a TYPE import (for return type annotation) — this is fine

### AC-09 — Test lifecycle hooks

Given the refactored `radio.test.tsx`,
When inspected,
Then:
- Inside the outer `describe('components/radio', ...)` block, there is a `beforeEach(() => { jest.clearAllMocks(); })` call
- Inside the outer `describe('components/radio', ...)` block, there is an `afterEach(() => { jest.restoreAllMocks(); })` call
- All existing test cases (`describe('Layout', ...)` and `describe('Events', ...)`) pass without modification

### AC-10 — Stories import from barrel

Given the refactored `radio.stories.tsx`,
When inspected,
Then the import reads `import Radio from '../root'` (or `import { Radio } from '../index'` — either is acceptable, but NOT `'../radio'`).

### AC-11 — Stories play function

Given the `States` story in `radio.stories.tsx`,
When Storybook runs the story's `play` function,
Then:
- The "Checked" radio (`label='Checked'`) is found by role
- `userEvent.click` is called on it
- The assertion `expect(radio).toBeChecked()` passes

### AC-12 — All existing tests pass

Given the fully refactored component,
When `npx nx run ui:test` is executed,
Then all tests in `radio.test.tsx` pass with exit code 0.

## Risks and Assumptions

- **Assumption**: `Text.createFrom` is a stable API that accepts the same arguments as before. If its signature changes, `toLabelContent` must be updated accordingly.
- **Assumption**: The CSS custom properties `--radio-size-inject` and `--radio-color-inject` are already consumed by the existing CSS files. The injection mechanism changes (effect → style), but the variable names stay the same.
- **Risk**: If any consumer outside this workspace does a deep import (`import Radio from '@gol/ui/src/components/radio/radio'`), that import will break. Considered acceptable — deep imports are undocumented and unsupported.
