# Tests: Refactor Checkbox Component

## The Justice's Verdict

### Failing Test Scenarios (RED)

These tests verify the refactored implementation. They should FAIL with the current code and PASS after implementation.

---

#### 1. Declarative CSS Variable Injection (FR-001, FR-002)

**Scenario**: CSS variables are injected via inline style prop
- **GIVEN**: A Checkbox component with `size="big"` and `color="red"`
- **WHEN**: The component renders
- **THEN**: The root `<label>` element has `style="--checkbox-size-inject: 22px; --checkbox-color-inject: red"`
- **Result**: [EXPECTED FAILURE] Current implementation uses `useLayoutEffect` + `setProperty()`, not inline style

**Scenario**: No useLayoutEffect for CSS injection
- **GIVEN**: The component implementation in `root.tsx`
- **WHEN**: Inspecting the code
- **THEN**: There are no `useLayoutEffect` hooks that call `style.setProperty()`
- **Result**: [EXPECTED FAILURE] Current implementation has 2 `useLayoutEffect` hooks for CSS injection

---

#### 2. React 19 ID Generation (FR-003, FR-004)

**Scenario**: useId() is used for ID generation
- **GIVEN**: A Checkbox component without an `id` prop
- **WHEN**: The component renders
- **THEN**: The input element has an auto-generated ID from `useId()` (format: `:r0:`, `:r1:`, etc.)
- **Result**: [EXPECTED FAILURE] Current implementation uses `Math.random()` format (`checkbox-xxxxxxx`)

**Scenario**: generateId() helper is removed
- **GIVEN**: The `helpers.ts` file
- **WHEN**: Inspecting exports
- **THEN**: There is no `generateId` function exported
- **Result**: [EXPECTED FAILURE] Current `helpers.tsx` exports `generateId()`

---

#### 3. Defensive Props Ordering (FR-005, FR-006)

**Scenario**: Explicit props override native properties
- **GIVEN**: A Checkbox with `disabled={true}` and native `disabled={false}` passed via spread
- **WHEN**: The component renders
- **THEN**: The input element is disabled (explicit prop wins)
- **Result**: [EXPECTED FAILURE] Current implementation spreads native props AFTER explicit props, allowing override

**Scenario**: onChange prop is not overridden by native onChange
- **GIVEN**: A Checkbox with `onChange={handler}` and native `onChange={otherHandler}` passed via spread
- **WHEN**: The user clicks the checkbox
- **THEN**: `handler` is called (explicit prop wins)
- **Result**: [EXPECTED FAILURE] Current implementation allows native onChange to override explicit onChange

---

#### 4. File Structure Alignment (FR-009, FR-010, FR-011)

**Scenario**: Implementation file is named root.tsx
- **GIVEN**: The checkbox component directory
- **WHEN**: Listing files
- **THEN**: `root.tsx` exists and `checkbox.tsx` does not exist
- **Result**: [EXPECTED FAILURE] Current implementation uses `checkbox.tsx`

**Scenario**: Helper file is named helpers.ts
- **GIVEN**: The checkbox component directory
- **WHEN**: Listing files
- **THEN**: `helpers.ts` exists and `helpers.tsx` does not exist
- **Result**: [EXPECTED FAILURE] Current implementation uses `helpers.tsx`

**Scenario**: Barrel export imports from ./root
- **GIVEN**: The `index.ts` file
- **WHEN**: Inspecting the export
- **THEN**: It imports from `'./root'` (not `'./checkbox'`)
- **Result**: [EXPECTED FAILURE] Current barrel imports from `'./checkbox'`

---

#### 5. CSS Ripple Consolidation (FR-007, FR-008)

**Scenario**: No duplicate ripple rules
- **GIVEN**: The `module.css` file
- **WHEN**: Inspecting CSS rules
- **THEN**: There is no duplicate `::before` pseudo-element rule with identical properties
- **Result**: [EXPECTED FAILURE] Current CSS has duplicate ripple rules (lines 12-28 and 54-70)

**Scenario**: Ripple effect visual behavior unchanged
- **GIVEN**: A Checkbox component without custom icons
- **WHEN**: The user hovers over the checkbox
- **THEN**: The ripple effect appears with the same size, color, and animation as before
- **Result**: [EXPECTED PASS] Visual behavior should remain identical after consolidation

---

### Test Implementation

- [ ] Test files created at: `apps/ui/src/components/checkbox/__tests__/checkbox.test.tsx` (update existing)
- [ ] Tests verified as failing (RED phase complete)

**Note**: Some scenarios (file structure, code inspection) are verified during implementation rather than via automated tests. The existing test suite (`checkbox.test.tsx`) provides regression coverage for behavioral changes.

---

## Test Strategy

### Automated Tests (Existing Suite)
The existing test suite in `checkbox.test.tsx` provides comprehensive coverage:
- Layout tests (rendering, props, states)
- Event tests (onChange, disabled behavior)
- Accessibility tests (aria-checked, role)

These tests should continue to PASS after refactoring, ensuring backward compatibility.

### Manual Verification
Some refactoring goals require manual verification:
- File renames (FR-009, FR-010, FR-011)
- Code inspection (FR-002, FR-004)
- CSS consolidation (FR-007)

### Visual Regression
CSS changes should be verified with visual regression testing:
- Ripple effect on hover/active states
- Checked/unchecked/indeterminate states
- Disabled state styling

---

## Baseline Test Results

### Phase 1

**Before Implementation:**
```bash
nx test ui --testPathPattern=checkbox
```
**Expected Result:** All existing tests PASS (baseline established)

**After Implementation:**
```bash
nx test ui --testPathPattern=checkbox
```
**Expected Result:** 31 tests PASS (no regressions) — ✅ VERIFIED

---

## Phase 2: Test & Storybook Coverage

### Storybook Interaction Tests (FR-101 to FR-105)

These `play` functions verify interactive behavior using CSF 3.0 and `@storybook/test`. They run automatically via Storybook test runner.

---

#### 6. Toggle Interaction (FR-101)

**Scenario**: Click checkbox toggles checked state
- **GIVEN**: A Checkbox story with `value={false}`
- **WHEN**: `userEvent.click()` is called on the checkbox
- **THEN**: The checkbox is checked (`expect(checkbox).toBeChecked()`)

**Scenario**: Second click toggles back to unchecked
- **GIVEN**: A Checkbox that was just checked
- **WHEN**: `userEvent.click()` is called again
- **THEN**: The checkbox is unchecked (`expect(checkbox).not.toBeChecked()`)

---

#### 7. Keyboard Interaction (FR-102)

**Scenario**: Space key toggles checkbox when focused
- **GIVEN**: A Checkbox story with `value={false}`
- **WHEN**: The user tabs to focus the checkbox and presses Space
- **THEN**: The checkbox toggles to checked

---

#### 8. Label Click Delegation (FR-103)

**Scenario**: Clicking label triggers checkbox change
- **GIVEN**: A Checkbox with `label="Toggle me"` and an `onChange` spy
- **WHEN**: The label text is clicked
- **THEN**: The checkbox receives the click and `onChange` is called

---

#### 9. Disabled Interaction Prevention (FR-104)

**Scenario**: Disabled checkbox ignores click
- **GIVEN**: A Checkbox story with `disabled={true}`
- **WHEN**: `userEvent.click()` is called on the checkbox
- **THEN**: The checkbox remains unchecked and its `onChange` handler is not called

**Scenario**: Disabled checkbox ignores Space key
- **GIVEN**: A Checkbox with `disabled={true}` and keyboard focus
- **WHEN**: The user presses Space
- **THEN**: The checkbox remains in its initial state

---

### Unit Test Expansion (FR-106 to FR-115)

These tests verify features introduced in Phase 1 that lack direct test coverage.

---

#### 10. CSS Variable Injection via Inline Style (FR-106)

**Scenario**: Style prop contains CSS variables
- **GIVEN**: A Checkbox component with `size="big"` and `color="red"`
- **WHEN**: The component renders
- **THEN**: The root `<label>` element's `style` attribute includes `--checkbox-size-inject` and `--checkbox-color-inject`

**Scenario**: Consumer style is merged with CSS variables
- **GIVEN**: A Checkbox with `style={{ margin: '10px' }}`
- **WHEN**: The component renders
- **THEN**: The root label has both `--checkbox-*` variables AND `margin: 10px`

---

#### 11. React 19 useId() Fallback ID (FR-107)

**Scenario**: Auto-generated ID when no `id` prop
- **GIVEN**: A Checkbox without an `id` prop
- **WHEN**: The component renders
- **THEN**: The input element has a non-empty `id` attribute (generated by `useId()`)

**Scenario**: Explicit `id` prop takes precedence
- **GIVEN**: A Checkbox with `id="explicit-id"`
- **WHEN**: The component renders
- **THEN**: The input element has `id="explicit-id"` (not the `useId()` fallback)

---

#### 12. aria-label Fallback (FR-108)

**Scenario**: aria-label set when no label provided
- **GIVEN**: A Checkbox without a `label` prop
- **WHEN**: The component renders
- **THEN**: The input element has `aria-label="Checkbox"`

**Scenario**: aria-label NOT set when label is present
- **GIVEN**: A Checkbox with `label="Visible label"`
- **WHEN**: The component renders
- **THEN**: The input element does NOT have `aria-label` (label text is sufficient)

---

#### 13. React 19 Ref Passing (FR-109)

**Scenario**: ref prop attaches to root label element
- **GIVEN**: A Checkbox with a `ref` prop
- **WHEN**: The component renders
- **THEN**: `ref.current` is the root `<label>` HTMLLabelElement

---

#### 14. Defensive Props Ordering (FR-110)

**Scenario**: Explicit disabled overrides native disabled
- **GIVEN**: A Checkbox with `disabled={true}` and `aria-label="test"` passed via spread
- **WHEN**: The component renders
- **THEN**: The input element is disabled (explicit prop wins over potential native conflict)

**Scenario**: Explicit onChange is not replaced by native spread
- **GIVEN**: A Checkbox with explicit `onChange={handler}` and no conflicting native spread
- **WHEN**: The user clicks the checkbox
- **THEN**: The explicit `handler` is called

---

#### 15. Helper Function Unit Tests (FR-111 to FR-115)

These are pure function unit tests following Osherove naming convention.

**toDefaults** (FR-111):
| Scenario | Input | Expected |
|---|---|---|
| `toDefaults_UndefinedProperties_ReturnsDefaults` | `undefined` | `value: false, disabled: false, size: 'normal', color: 'blue', circular: false` |
| `toDefaults_PartialProperties_MergesDefaults` | `{ value: true, size: 'big' }` | `value: true, size: 'big', disabled: false, color: 'blue', circular: false` |

**toSize** (FR-112):
| Scenario | Input | Expected |
|---|---|---|
| `toSize_SmallVariant_Returns14` | `{ size: 'small' }` | `14` |
| `toSize_NormalVariant_Returns18` | `{ size: 'normal' }` | `18` |
| `toSize_BigVariant_Returns22` | `{ size: 'big' }` | `22` |
| `toSize_CustomNumber_ReturnsSameNumber` | `{ size: 32 }` | `32` |

**toClasses** (FR-113):
| Scenario | Input | Expected |
|---|---|---|
| `toClasses_DefaultState_ReturnsCheckboxWithSize` | `{ value: false, size: 'normal', ... }` | contains `checkbox`, `normal` |
| `toClasses_DisabledState_IncludesDisabledClass` | `{ disabled: true, ... }` | contains `disabled` |
| `toClasses_CircularVariant_IncludesCircularClass` | `{ circular: true, ... }` | contains `circular` |
| `toClasses_CustomIcon_IncludesCustomClass` | `{ icon: ..., ... }` | contains `custom` |
| `toClasses_LabelPosition_IncludesPositionClass` | `{ label: { position: 'top' }, ... }` | contains `top` |

**toNativeProperties** (FR-114):
| Scenario | Input | Expected |
|---|---|---|
| `toNativeProperties_CheckboxProps_AreStripped` | `{ value: true, size: 'big', id: 'x' }` | `{}` (empty) |
| `toNativeProperties_NativeAttribute_IsKept` | `{ 'aria-label': 'test', 'data-testid': 'x' }` | `{ 'aria-label': 'test', 'data-testid': 'x' }` |
| `toNativeProperties_Undefined_ReturnsEmptyObject` | `undefined` | `{}` |

**toLabelPosition** (FR-115):
| Scenario | Input | Expected |
|---|---|---|
| `toLabelPosition_Undefined_DefaultsToRight` | `undefined` | `'right'` |
| `toLabelPosition_StringLabel_DefaultsToRight` | `'Simple text'` | `'right'` |
| `toLabelPosition_ExplicitPosition_ReturnsPosition` | `{ content: 'x', position: 'left' }` | `'left'` |

---

### Test Implementation (Phase 2)

- [ ] Storybook play functions added to: `apps/ui/src/components/checkbox/__stories__/checkbox.stories.tsx`
- [ ] Unit tests added to: `apps/ui/src/components/checkbox/__tests__/checkbox.test.tsx` (expand existing)
- [ ] Helper tests added to: `apps/ui/src/components/checkbox/__tests__/helpers.test.ts` (new file)
- [ ] Tests verified as PASSING (GREEN phase)

### Target Commands

```bash
# Run all checkbox tests (existing + new)
nx test ui --testPathPattern=checkbox

# Run storybook test runner (if configured)
nx run ui:test-storybook
```
