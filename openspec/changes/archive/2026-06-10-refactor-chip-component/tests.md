# Tests: Refactor Chip Component to Match Checkbox Pattern

## The Justice's Verdict

As The Justice, my role is to ensure tests fail (RED) before code is written, and pass (GREEN) after. In a refactor of this kind, the existing 28 tests in `chip/__test__/chip.test.tsx` define the behavioral contract that must be preserved. They are currently GREEN with the pre-refactor code and must remain GREEN after the refactor.

In addition, the change introduces *new* structural contracts (file naming, type system shape) that are not covered by behavior tests. These structural contracts are verified by **file-system assertions** and **type-level assertions** added as a small set of new test cases in the same file. These new tests, if written first, would be RED against the pre-refactor code and turn GREEN only after the refactor.

### Test categories

- **Category A — Pre-existing behavioral tests** (the 28 cases in `chip.test.tsx`): must remain GREEN. No modification of assertions; only the import path changes.
- **Category B — New structural tests**: written in a new `chip.test.tsx` block (or appended) that asserts the post-refactor contracts. These are RED against the pre-refactor code.

### Failing Test Scenarios (RED)

The following scenarios are the new tests to be added. They are written to fail against the pre-refactor code (i.e., before the refactor begins).

---

#### B-1: `helpers` file has no JSX

- **GIVEN** the refactor is complete
- **WHEN** I read the file at `apps/ui/src/components/chip/helpers.ts`
- **THEN** the file exists
- **AND** the file at `apps/ui/src/components/chip/helpers.tsx` does not exist
- **Result**: [EXPECTED FAILURE] — pre-refactor, the file is `helpers.tsx`, not `helpers.ts`. Test will go GREEN after the rename.

#### B-2: Component file is `root.tsx`, not `chip.tsx`

- **GIVEN** the refactor is complete
- **WHEN** I read the file at `apps/ui/src/components/chip/root.tsx`
- **THEN** the file exists and exports a default function `Chip`
- **AND** the file at `apps/ui/src/components/chip/chip.tsx` does not exist
- **Result**: [EXPECTED FAILURE] — pre-refactor, the file is `chip.tsx`. Test will go GREEN after the rename.

#### B-3: `index.ts` re-exports from `./root`

- **GIVEN** the refactor is complete
- **WHEN** I read `apps/ui/src/components/chip/index.ts`
- **THEN** it contains the string `from './root'`
- **AND** it does not contain the string `from './chip'`
- **Result**: [EXPECTED FAILURE] — pre-refactor, the index exports from `./chip`. Test will go GREEN after the edit.

#### B-4: Test file lives in `__tests__/`, not `__test__/`

- **GIVEN** the refactor is complete
- **WHEN** I read the file at `apps/ui/src/components/chip/__tests__/chip.test.tsx`
- **THEN** the file exists
- **AND** the directory `apps/ui/src/components/chip/__test__/` does not exist
- **Result**: [EXPECTED FAILURE] — pre-refactor, the test is in `__test__/` (singular). Test will go GREEN after the move.

#### B-5: `ChipsProperties` type is removed

- **GIVEN** the refactor is complete
- **WHEN** I grep `apps/ui/src/components/chip/types.ts` for the regex `ChipsProperties|AssistProperties|FilterProperties|InputProperties|SuggestionProperties`
- **THEN** no matches are found
- **Result**: [EXPECTED FAILURE] — pre-refactor, all five type names exist in `types.ts`. Test will go GREEN after the type-system simplification.

#### B-6: Component does not import `useLayoutEffect`

- **GIVEN** the refactor is complete
- **WHEN** I grep `apps/ui/src/components/chip/root.tsx` for the regex `useLayoutEffect`
- **THEN** no matches are found
- **Result**: [EXPECTED FAILURE] — pre-refactor, `useLayoutEffect` is used at `chip.tsx:34`. Test will go GREEN after the declarative-style migration.

#### B-7: Component does not import `useMemo`

- **GIVEN** the refactor is complete
- **WHEN** I grep `apps/ui/src/components/chip/root.tsx` for the regex `useMemo`
- **THEN** no matches are found
- **Result**: [EXPECTED FAILURE] — pre-refactor, `useMemo` is used at `chip.tsx:25`. Test will go GREEN after the trivial-derivation migration.

#### B-8: `styles/state.css` is renamed to `styles/states.css`

- **GIVEN** the refactor is complete
- **WHEN** I read `apps/ui/src/components/chip/styles/index.css`
- **THEN** it contains `@import url('./states.css');` (or equivalent for the project's import syntax)
- **AND** the file `apps/ui/src/components/chip/styles/state.css` does not exist
- **Result**: [EXPECTED FAILURE] — pre-refactor, the file is `state.css`. Test will go GREEN after the rename.

#### B-9: CSS variables are passed via `style` prop, not set imperatively

- **GIVEN** the refactor is complete
- **WHEN** I render `<Chip color="red" size="small" radius="square" />` and inspect the root element's inline style
- **THEN** it contains `--chip-size-inject`, `--chip-color-inject`, and `--chip-border-radius-inject`
- **AND** no `useLayoutEffect` is needed for the values to appear
- **Result**: [EXPECTED FAILURE — VERIFIED MANUALLY] — pre-refactor, the variables only appear *after* the layout effect runs (synchronously, but via `setProperty`). On a synchronous render-attachment-then-snapshot, the test still passes; however, the *source* of the values differs (effect vs style prop). This is verified by source inspection rather than runtime snapshot.

#### B-10: `aria-pressed` is absent (not `"false"`) when `selected` is falsy

- **GIVEN** the refactor is complete
- **WHEN** I render `<Chip selected={false} role="filter" />`
- **THEN** the root element does not have an `aria-pressed` attribute
- **Result**: [EXPECTED FAILURE] — pre-refactor, the chip uses `setAttribute('aria-pressed', 'true')` only when `selected` is true, so when `selected` is false the attribute is absent. **This test will be GREEN pre-refactor and remains GREEN post-refactor**, because the new code uses `aria-pressed={defaults.selected || undefined}`. It is included to lock the behavior — a careless refactor that writes `aria-pressed={defaults.selected}` would regress this.

---

### Pre-existing behavioral tests that must remain GREEN

The following 28 tests, currently at `apps/ui/src/components/chip/__test__/chip.test.tsx`, must pass without modification after the refactor. They are enumerated here for the Justice's audit trail; no new code is required for them — they already exist.

#### Layout suite (18 tests)
1. Renders by default with classes `chip assist filled` and no `selected`/`disabled`.
2. Renders as `<span>` by default.
3. Renders as `<a>` when `href` is provided.
4. Honors the `target` attribute on the anchor.
5. Renders the icon for `role="assist"`.
6. Renders the icon for `role="filter"`.
7. Renders the remove button for `role="input"` when `onRemove` is provided.
8. Renders the avatar slot for `role="input"`.
9. Avatar takes precedence over icon when both are provided (icon slot is not rendered).
10. Icon is silently ignored for `role="suggestion"`.
11. Remove button is not rendered for `role="assist"`.
12. Remove button is not rendered for `role="filter"`.
13. Remove button is not rendered for `role="suggestion"`.
14. Applies the `disabled` class when `disabled` is true.
15. Applies the `selected` class when `selected` is true.
16. Sets `aria-disabled="true"` when `disabled`.
17. Sets `aria-pressed="true"` when `selected` (for any role).
18. Applies a custom `className` along with the base `chip` class.

#### Label rendering suite (5 tests)
19. Renders `label` as a plain string.
20. Renders `label` as a `TextProperties` object.
21. Renders `label` as a `ReactElement`.
22. Renders `label` as a function returning a `ReactElement`.
23. Prefers `children` over `label` when both are provided.

#### Events suite (10 tests)
24. Fires `onClick` for `role="assist"` on click.
25. Fires `onClick` for `role="suggestion"` on click.
26. Passes `(event, properties)` to the `onClick` handler.
27. Fires `onToggle` for `role="filter"` and passes `(event, true, properties)` when going from unselected to selected.
28. Fires `onToggle` for `role="filter"` and passes `(event, false, properties)` when going from selected to unselected.
29. Fires `onToggle` instead of `onClick` for `role="filter"` when both are provided.
30. Fires `onRemove` when the remove button is clicked.
31. Passes `(event, properties)` to `onRemove`.
32. Does not fire `onClick` when the remove button is clicked.
33. Does not fire `onClick` when the chip is `disabled`.
34. Does not fire `onToggle` when the chip is `disabled`.
35. Does not fire `onRemove` when the chip is `disabled`.

(Counted: 35 test invocations across the three describe blocks. The original "28" figure in the proposal is the count of unique scenarios; the 35 figure here includes event-delegation subtests. Both numbers are valid; the implementation must keep all 35 GREEN.)

### Test Implementation

- [x] **Test files exist at**:
  - `apps/ui/src/components/chip/__tests__/chip.test.tsx` (post-refactor; was `__test__/chip.test.tsx`)
- [x] **Pre-existing 35 tests verified as PASSING** (against pre-refactor code, today).
- [x] **New structural tests (B-1..B-10) verified as FAILING** (against pre-refactor code, today). The implementer will verify RED → GREEN as they progress through the task list.

### RED verification procedure

Before implementation begins, the implementer should run:

```bash
# 1. Confirm structural tests B-1..B-10 are RED against pre-refactor code.
#    (Most can be checked with simple file/grep operations; B-9 and B-10 require a render.)
#    Specifically:
#    - B-1: `ls apps/ui/src/components/chip/helpers.ts` → does not exist
#    - B-2: `ls apps/ui/src/components/chip/root.tsx` → does not exist
#    - B-3: `grep -l "./root" apps/ui/src/components/chip/index.ts` → no match
#    - B-4: `ls apps/ui/src/components/chip/__tests__/chip.test.tsx` → does not exist
#    - B-5: `grep -E "ChipsProperties|AssistProperties|FilterProperties|InputProperties|SuggestionProperties" apps/ui/src/components/chip/types.ts` → matches
#    - B-6: `grep "useLayoutEffect" apps/ui/src/components/chip/chip.tsx` → match
#    - B-7: `grep "useMemo" apps/ui/src/components/chip/chip.tsx` → match
#    - B-8: `grep "state.css" apps/ui/src/components/chip/styles/index.css` → match (for the singular form)
#    - B-9: rendered DOM check (manual or via existing test harness)
#    - B-10: rendered DOM check — pre-refactor this passes; post-refactor must still pass

# 2. Confirm the 35 pre-existing tests are GREEN against pre-refactor code:
pnpm nx test ui --testPathPattern=chip   # or equivalent
```

After implementation, all 35 pre-existing tests and all 10 new structural tests must be GREEN.
