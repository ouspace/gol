# Spec: Text Component Refactoring

## Requirement IDs

- FR-01: File naming must match workspace standard (`root.tsx`, `__tests__/`, `__mocks__/root.tsx`)
- FR-02: CSS variable injection must use declarative `toStyle()` helper pattern — no `useLayoutEffect`, no `useRef`
- FR-03: Helper functions must be pure and the file must not contain JSX
- FR-04: Component JSX must be declarative — no inline logic, no anonymous handlers
- FR-05: Test suites must include mock lifecycle hooks
- FR-06: Stories must import from `'../root'` and include interaction stories with `play` functions
- FR-07: CSS variable fallback syntax must be correct in `base.css`
- FR-08: Mock path `'../../text/root'` must be used by all consuming test files after rename

## Objective

- Standardize the Text component's file structure, patterns, and test hygiene to match the `Radio`, `Chip`, and `Checkbox` baseline.
- Fix a pre-existing CSS bug that causes `font-size`, `font-weight`, and `letter-spacing` base fallbacks to silently fail when no injection variable is set.

## UX Behavior

- No UX behavior change for the refactoring work.
- The CSS bug fix WILL slightly change rendered output: after the fix, Text elements without a scale and without size injection will correctly fall back to `var(--text-base-size)` (1rem) instead of silently receiving no fallback. This is a correction to unintended behavior, not a regression.

## Contracts Impacted

- **`index.ts` public barrel**: no change in exported API. `Text` and `Text.createFrom` remain identical.
- **`toSize` signature**: changes from `(properties: Required<Properties>): string | null` to `(size: Properties['size']): string | undefined`. Internal contract only — only `toStyle` calls it after the refactor.
- **`toStyle` (new)**: `(defaults: DefaultedProperties, original?: Properties): React.CSSProperties`
- **`toEventProperties` (new)**: `(defaults: DefaultedProperties): Omit<DefaultedProperties, 'onClick'>`
- **`DefaultedProperties` (new)**: exported type alias for the return of `toDefaults()`
- **mock path**: `'../../text/text'` → `'../../text/root'` in 4 consuming test files

## Acceptance Criteria

### AC-01 — File renaming

Given the existing text component files,
When the refactoring is applied,
Then:
- `apps/ui/src/components/text/root.tsx` exists
- `apps/ui/src/components/text/__tests__/text.test.tsx` exists (in `__tests__`, plural)
- `apps/ui/src/components/text/__mocks__/root.tsx` exists
- `apps/ui/src/components/text/text.tsx` does NOT exist
- `apps/ui/src/components/text/__test__/` directory does NOT exist
- `apps/ui/src/components/text/__mocks__/text.tsx` does NOT exist

### AC-02 — Import path updates inside text/

Given the renamed files,
When any file inside `text/` imports from `'./text'` or `'../text'`,
Then no such import remains — all references use `'./root'` or `'../root'`.

Files to verify: `index.ts`, `factory.tsx`, `text.stories.tsx`, `text.test.tsx`.

### AC-03 — Mock path cascade updates

Given the renamed mock file `__mocks__/root.tsx`,
When any test file outside `text/` calls `jest.mock('../../text/text')`,
Then no such call remains — all references use `jest.mock('../../text/root')`.

Files to verify: `radio/radio.test.tsx`, `chip/chip.test.tsx`, `checkbox/checkbox.test.tsx`, `text-field/text-field.test.tsx`.

### AC-04 — No `useLayoutEffect`, `useRef`, or `useMemo` in root.tsx

Given the refactored `root.tsx`,
When inspected,
Then:
- There is NO `useLayoutEffect` import or call
- There is NO `useRef` call
- There is NO `useMemo` call
- There IS a `style` object assigned from `toStyle(defaults, properties)`
- The `<Element>` receives `style={style}` as a prop

### AC-05 — Named handler

Given the refactored `root.tsx`,
When inspected,
Then:
- A `handleClick` function is declared before the `return` statement
- The `<Element>` uses `onClick={handleClick}`, not an anonymous arrow function

### AC-06 — `toStyle` helper behavior

Given `toStyle` in `helpers.ts`,
When called with default properties (color='black', align='left', decoration='none', size='normal'):
Then the returned object does NOT contain `--text-color-inject`, `--text-align-inject`, `--text-decoration-inject`, or `--text-size-inject`.

When called with `color='red'`:
Then the returned object contains `{ '--text-color-inject': 'red' }`.

When called with `weight=700`:
Then the returned object contains `{ '--text-weight-inject': '700' }`.

When called with `size='small'`:
Then the returned object contains `{ '--text-size-inject': '0.875rem' }`.

When called with `original.style = { opacity: 0.5 }`:
Then the returned object spreads the original style at the top level.

### AC-07 — `toSize` return contract

Given `toSize` in `helpers.ts`:
- `toSize('small')` → `'0.875rem'`
- `toSize('normal')` → `undefined`
- `toSize('big')` → `'1.5rem'`
- `toSize(20)` → `'20px'`
- `toSize('1.5rem')` → `'1.5rem'`
- `toSize(undefined)` → `undefined`
- `toSize(null)` → `undefined`

### AC-08 — `toEventProperties` excludes `onClick`

Given `toEventProperties` in `helpers.ts`,
When called with a `DefaultedProperties` object,
Then:
- The result does NOT have an `onClick` property
- The result DOES have all other defaulted fields (e.g. `disabled: false`, `content`, `as: 'span'`, etc.)

### AC-09 — `DefaultedProperties` type exported

Given `helpers.ts`,
When inspected,
Then `DefaultedProperties` is exported as a named type that satisfies:
`Properties & Required<Pick<Properties, 'as' | 'size' | 'color' | 'align' | 'decoration' | 'italic' | 'transform' | 'wrap' | 'unselectable' | 'disabled' | 'className' | 'onClick'>>`

### AC-10 — CSS bug fix

Given `styles/base.css`,
When inspected,
Then:
- Line 6 reads: `font-size: var(--text-size, var(--text-base-size));`
- Line 7 reads: `font-weight: var(--text-weight, var(--text-base-weight));`
- Line 9 reads: `letter-spacing: var(--text-letter-spacing, var(--text-base-letter-spacing));`
- Line 8 (`line-height`) is unchanged: `line-height: var(--text-line-height, var(--text-base-line-height));`

### AC-11 — Test lifecycle hooks

Given the refactored `text.test.tsx`,
When inspected,
Then:
- Inside `describe('components/text', ...)` there is `beforeEach(() => { jest.clearAllMocks(); })`
- Inside `describe('components/text', ...)` there is `afterEach(() => { jest.restoreAllMocks(); })`

### AC-12 — Helper unit tests present

Given the refactored `text.test.tsx`,
When inspected,
Then there is a `describe('helpers', ...)` block containing:
- `describe('toSize', ...)` with at least 6 test cases
- `describe('toStyle', ...)` with at least 3 test cases
- `describe('toEventProperties', ...)` with at least 2 test cases

### AC-13 — Stories import from root

Given the refactored `text.stories.tsx`,
When inspected,
Then: `import Text from '../root'` (NOT `'../text'`).

### AC-14 — Stories coverage

Given the refactored `text.stories.tsx`,
When inspected,
Then there are at least these named exports:
- `Default` (existing)
- `TypeScale` (existing)
- `States` (new — disabled, italic, nowrap, unselectable)
- `Colors` (new — dynamic color map)
- `Weights` (new)
- `Interactions` (new — with `play` function)

### AC-15 — All existing tests pass

Given the fully refactored component,
When `npx nx run ui:test` is executed,
Then all tests pass with exit code 0 — including tests from radio, chip, checkbox, and text-field that use the text mock.

## Risks and Assumptions

- **Risk**: `jest.mock('../../text/root')` relies on Jest auto-resolving to `__mocks__/root.tsx`. This is the same pattern already working for Icon (`jest.mock('../../icon/root')` → `__mocks__/root.tsx`). Assumption: consistent behavior confirmed by prior implementation.
- **Assumption**: `Text.createFrom` consumers (radio, chip, checkbox) are unaffected because they import from `'../text'` (the barrel `index.ts`), not from the file directly. The barrel is not renamed.
- **Assumption**: `factory.tsx` is imported by no external consumer directly — only through `index.ts`. Confirmed by codebase search.
- **Risk**: `toSize('normal')` returning `undefined` means `--text-size-inject` is never set for normal size. After the CSS bug fix, `font-size: var(--text-size, var(--text-base-size))` will correctly fall back to `1rem`. Assumption: this is the intended behavior.
