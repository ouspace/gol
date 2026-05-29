# Tasks: Refactor Checkbox Component

## Implementation Checklist

### 1. Pre-Implementation Verification
- [x] 1.1 Run existing test suite to establish baseline: `nx test ui --testPathPattern=checkbox`
- [x] 1.2 Verify React version is 18+ (required for `useId()`)
- [x] 1.3 Search for direct imports of `./checkbox` outside component directory: `grep -r "from.*checkbox/checkbox" apps/ui/src`

### 2. File Renames
- [x] 2.1 Rename `checkbox.tsx` → `root.tsx`
- [x] 2.2 Rename `helpers.tsx` → `helpers.ts`
- [x] 2.3 Update `index.ts` to import from `'./root'` instead of `'./checkbox'`
- [x] 2.4 Update test file imports if using relative paths

### 3. Declarative CSS Variable Injection
- [x] 3.1 Remove first `useLayoutEffect` hook (CSS variable injection)
- [x] ~~3.2 Remove second `useLayoutEffect` hook (indeterminate state)~~ **DISCARDED** - `indeterminate` is a DOM property, not an HTML attribute. Must remain imperative.
- [x] 3.3 Add inline `style` prop to root `<label>` element with CSS variables, merging with `properties.style` for consumer overrides
- [x] ~~3.4 Move indeterminate state logic to render phase (before return)~~ **DISCARDED** - Cannot be declarative; preserve `useLayoutEffect` for indeterminate state
- [x] 3.5 **NEW**: Merge `properties.style` into inline style to preserve consumer custom styles: `style={{ '--checkbox-size-inject': ..., '--checkbox-color-inject': ..., ...properties.style }}`

### 4. React 19 ID Generation
- [x] 4.1 Import `useId` from React
- [x] 4.2 Add `const generatedId = useId()` in component
- [x] 4.3 Update ID logic: `const id = defaults.id ?? generatedId`
- [x] 4.4 Remove `generateId()` function from `helpers.ts`
- [x] 4.5 Update `toDefaults()` to not generate ID (set to `undefined` or remove)

### 5. Remove Unnecessary Memoization
- [x] 5.1 Remove `useMemo` import if no longer used
- [x] 5.2 Replace `const size = useMemo(() => toSize(defaults), [defaults.size])` with `const size = toSize(defaults)`

### 6. Defensive Props Ordering
- [x] 6.1 Move `{...nativeProperties}` before explicit props in `<input>` element
- [x] 6.2 Verify explicit props (`onChange`, `disabled`, `id`, `name`) appear after spread

### 7. Accessibility Enhancement
- [x] 7.1 Add `aria-label` fallback when no label is provided: `aria-label={defaults.label ? undefined : 'Checkbox'}`

### 7.5 React 19 Ref Typing
- [x] 7.5.1 Receive `ref` from `properties.ref` (React 19 pattern, no `forwardRef`)
- [x] 7.5.2 Inject `ref` into root `<label>` element to satisfy `RefAttributes<HTMLLabelElement>` type contract
- [x] 7.5.3 Verify ref typing matches `types.ts` definition: `RefAttributes<HTMLLabelElement>`

### 8. CSS Consolidation
- [x] 8.1 Analyze duplicate ripple rules in `module.css` (lines 12-28 and 54-70)
- [x] 8.2 Consolidate shared `::before` pseudo-element styles
- [x] 8.3 Separate normal checkbox and custom icon specific styles
- [x] 8.4 Verify visual behavior unchanged (hover, active states)

### 9. Post-Implementation Verification
- [x] 9.1 Run test suite: `nx test ui --testPathPattern=checkbox`
- [x] 9.2 Verify all existing tests pass (no regressions)
- [x] 9.3 Run lint: `nx lint ui`
- [x] 9.4 Run typecheck: `nx build ui` or equivalent
- [x] 9.5 Manual visual verification of checkbox states (checked, unchecked, indeterminate, disabled, hover)

### 10. Documentation
- [x] 10.1 Update component JSDoc if needed
- [x] 10.2 Document `useId()` fallback behavior

---

## Phase 2: Test & Storybook Coverage

### 11. Storybook Interaction Tests (`storybook` skill — CSF 3.0 `play`)
- [x] 11.1 Add `@storybook/test` imports (`userEvent`, `within`, `expect`, `step`) to `checkbox.stories.tsx`
- [x] 11.2 Add `Interactions: Toggle` story with `play` — click checkbox toggles checked state, click again toggles back
- [x] 11.3 Add `Interactions: Keyboard` story with `play` — Tab to focus, Space to toggle, verify checked state
- [x] 11.4 Add `Interactions: LabelClick` story with `play` — click label triggers onChange on associated checkbox
- [x] 11.5 Add `Interactions: Disabled` story with `play` — click/space on disabled checkbox has no effect

### 12. Unit Test Expansion (`jest-unit-testing` skill)
- [x] 12.1 Add test: CSS variable injection — root `<label>` has `style` with `--checkbox-size-inject` and `--checkbox-color-inject`
- [x] 12.2 Add test: useId() fallback — input auto-generates ID when no `id` prop provided
- [x] 12.3 Add test: aria-label fallback — input has `aria-label="Checkbox"` when no label prop
- [x] 12.4 Add test: React 19 ref passing — `ref` prop attaches to root `<label>` element
- [x] 12.5 Add test: Defensive props ordering — explicit `disabled={true}` overrides native `disabled={false}`
- [x] 12.6 Add test helper: `toDefaults` — normalizes optional properties with correct defaults
- [x] 12.7 Add test helper: `toSize` — maps size variants to pixel values (small→14, normal→18, big→22, custom number passthrough)
- [x] 12.8 Add test helper: `toClasses` — generates correct class string with disabled, circular, custom, position, size states
- [x] 12.9 Add test helper: `toNativeProperties` — strips known Checkbox props, passes through native HTML attributes
- [x] 12.10 Add test helper: `toLabelPosition` — extracts label position (defaults to `right`)

### 13. Post-Implementation Verification (Phase 2)
- [x] 13.1 Run test suite: `nx test ui --testPathPattern=checkbox`
- [x] 13.2 Verify all new and existing tests pass (no regressions)
- [x] 13.3 Run storybook test runner: `nx run ui:test-storybook` (if configured)

---

## The Ledger (State Machine)

| Agent | Action | Status | Hash / Detail |
| :--- | :--- | :--- | :--- |
| Blueprint | Draft Proposal | ✅ DONE | proposal.md created |
| Blueprint | Draft Design | ✅ DONE | design.md created |
| Blueprint | Draft Specs | ✅ DONE | 5 spec files created (css-variable-injection, react-19-id-generation, defensive-props-ordering, css-ripple-consolidation, file-structure-alignment) |
| Censor | Audit | ✅ DONE | audit.md - PASS (no ambiguity detected) |
| Justice | Write Tests (Phase 1) | ✅ DONE | tests.md - RED scenarios documented |
| Mason | Implement (Phase 1) | ✅ DONE | All tasks completed: file renames, declarative CSS injection, useId(), defensive props, aria-label, React 19 ref typing. 31 tests passing. |
| Blueprint | Draft Phase 2 Scope | ✅ DONE | proposal.md updated — Storybook interaction tests + unit test expansion |
| Justice | Write Tasks (Phase 2) | ✅ DONE | tasks.md sections 11-13 defined |
| Mason | Implement (Phase 2) | ✅ DONE | Storybook play functions (4 interaction stories) + unit test expansion (8 component tests + 17 helper tests). 56 tests passing. |

---

## Execution Order

### Phase 1 (Completed)
1. **Pre-Implementation Verification** (1.1 - 1.3)
2. **File Renames** (2.1 - 2.4)
3. **Core Refactoring** (3.1 - 7.1)
4. **CSS Consolidation** (8.1 - 8.4)
5. **Post-Implementation Verification** (9.1 - 9.5)
6. **Documentation** (10.1 - 10.2)

### Phase 2 (Pending)
1. **Storybook Interaction Tests** (11.1 - 11.5)
   - Add play functions for click, keyboard, label, disabled interactions
2. **Unit Test Expansion** (12.1 - 12.10)
   - Add tests for Phase 1 features + helper unit tests
3. **Post-Implementation Verification** (13.1 - 13.3)
   - Run tests, verify no regressions, run storybook test runner

---

## Rollback Plan

All changes are localized to the checkbox component directory (`__tests__/` and `__stories__/`), making rollback straightforward.

### Phase 1 Rollback
1. Revert file renames: `root.tsx` → `checkbox.tsx`, `helpers.ts` → `helpers.tsx`
2. Revert `index.ts` import to `'./checkbox'`
3. Restore `useLayoutEffect` hooks for CSS injection
4. Restore `generateId()` helper
5. Restore `useMemo` for `toSize()`
6. Revert props ordering
7. Revert CSS changes

### Phase 2 Rollback
1. Remove `play` functions from `checkbox.stories.tsx` (revert to visual-only stories)
2. Revert test additions in `__tests__/checkbox.test.tsx` to Phase 1 state
