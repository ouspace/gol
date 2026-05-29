# Design: Refactor Checkbox Component

## Technical Approach

The refactoring applies targeted improvements to align the Checkbox component with workspace standards while maintaining backward compatibility. Changes are organized into three categories:

### 1. Declarative CSS Variable Injection

**Current Implementation (Imperative):**
```tsx
useLayoutEffect(() => {
  if (!reference.current) return;
  reference.current.style.setProperty('--checkbox-size-inject', `${size}px`);
  reference.current.style.setProperty('--checkbox-color-inject', defaults.color);
}, [defaults.color, size, defaults.value]);
```

**Target Implementation (Declarative):**
```tsx
const style = {
  '--checkbox-size-inject': `${size}px`,
  '--checkbox-color-inject': defaults.color,
  ...properties.style,
} as React.CSSProperties;

return <label style={style} ...>
```

This eliminates the first `useLayoutEffect` hook for CSS variable injection and aligns with the skill's requirement for injectable styling via CSS variables. The spread of `properties.style` ensures consumer-provided inline styles are preserved and can override CSS variables if needed.

**CRITICAL: Indeterminate State Preservation**

The second `useLayoutEffect` hook for indeterminate state **MUST BE PRESERVED**:

```tsx
useLayoutEffect(() => {
  if (inputReference.current) {
    inputReference.current.indeterminate = defaults.value === null;
  }
}, [defaults.value]);
```

**Rationale**: The `indeterminate` property is a DOM-only property (`HTMLInputElement.prototype.indeterminate`), not an HTML attribute. It cannot be set declaratively via JSX. React cannot map `<input indeterminate={true} />` to the DOM because the attribute does not exist in the HTML specification. This imperative mutation is mandatory for correct behavior.

### 2. React 19 Idioms

**ID Generation:**
- Replace `generateId()` helper using `Math.random()` with React 19's `useId()` hook
- This ensures SSR-safe ID generation and eliminates hydration mismatches
- The `id` prop remains optional; when not provided, `useId()` generates a stable fallback

**Memoization:**
- Remove `useMemo(() => toSize(defaults), [defaults.size])` 
- Trust React Compiler for automatic memoization per skill §7
- `toSize()` is a trivial computation (pattern matching on size string)

### 3. File Structure Alignment

**Renames:**
- `checkbox.tsx` → `root.tsx` (matches skill scaffolding requirement)
- `helpers.tsx` → `helpers.ts` (no JSX present, incorrect extension)

**Import Updates:**
- `index.ts`: Update export from `'./checkbox'` to `'./root'`
- Tests: Update import path if using relative imports

### 4. Defensive Props Ordering

**Current (Vulnerable):**
```tsx
<input
  ref={inputReference}
  type='checkbox'
  // ... explicit props
  {...nativeProperties}  // Can override onChange, disabled, id
  aria-checked={defaults.value ?? 'mixed'}
/>
```

**Target (Defensive):**
```tsx
<input
  {...nativeProperties}  // Spread first
  ref={inputReference}
  type='checkbox'
  // ... explicit props override native
  aria-checked={defaults.value ?? 'mixed'}
/>
```

### 5. CSS Consolidation

**Duplicate Ripple Rules:**
- Lines 12-28: Normal checkbox hover/active ripple
- Lines 54-70: Custom icon hover/active ripple

**Consolidation Strategy:**
```css
.checkbox:not(.disabled) .checkbox__box::before {
  /* Shared ripple styles */
}

.checkbox:not(.disabled):not(.has-custom-icon) .checkbox__box:hover::before {
  /* Normal checkbox specific */
}

.checkbox:not(.disabled).has-custom-icon .checkbox__box:hover::before {
  /* Custom icon specific */
}
```

### 6. React 19 Ref Typing

**Current Pattern (React 18 with forwardRef):**
```tsx
// types.ts
export type Properties = CustomProperties & NativeProperties & RefAttributes<HTMLLabelElement>;

// checkbox.tsx
const reference = useRef<HTMLLabelElement>(null);
return <label ref={reference} ...>
```

**Target Pattern (React 19 without forwardRef):**
```tsx
// types.ts (unchanged)
export type Properties = CustomProperties & NativeProperties & RefAttributes<HTMLLabelElement>;

// root.tsx
export default function Checkbox(properties?: Properties) {
  const defaults = toDefaults(properties);
  const reference = properties?.ref ?? useRef<HTMLLabelElement>(null);
  
  return <label ref={reference} ...>
}
```

**Rationale**: React 19 eliminates `forwardRef` by allowing `ref` to be passed as a regular prop. The component must receive `ref` from `properties.ref` and inject it into the root `<label>` element to satisfy the `RefAttributes<HTMLLabelElement>` type contract defined in `types.ts`.

## Architecture Decisions

- **Decision**: Keep controlled-only mode (no internal state)
- **Rationale**: No current use case for uncontrolled mode; adding complexity without benefit

- **Decision**: Maintain `onChange(event, properties)` signature
- **Rationale**: Breaking change to public API; existing consumers depend on this signature

- **Decision**: Use inline `style` prop for CSS variables instead of `useLayoutEffect`
- **Rationale**: Declarative, SSR-safe, aligns with skill §4 and Button component example

- **Decision**: Replace `Math.random()` with `useId()` for ID generation
- **Rationale**: SSR-safe, eliminates hydration mismatches, React 19 best practice

- **Decision**: Remove `useMemo` for `toSize()` computation
- **Rationale**: Trivial computation; trust React Compiler per skill §7

- **Decision**: Preserve `useLayoutEffect` for indeterminate state
- **Rationale**: `indeterminate` is a DOM-only property (`HTMLInputElement.prototype.indeterminate`), not an HTML attribute. Cannot be set declaratively via JSX. This is mandatory for correct behavior.

- **Decision**: Merge `properties.style` into inline style prop
- **Rationale**: Allows consumers to override CSS variables or add custom inline styles. Ensures backward compatibility with existing usage patterns.

- **Decision**: Use React 19 ref-as-prop pattern (no `forwardRef`)
- **Rationale**: React 19 allows `ref` to be passed as a regular prop. Aligns with skill §1 requirement for React 19 paradigm.

## Data Flow

```
Properties (optional)
    ↓
toDefaults() → Required<Properties>
    ↓
toSize() → number
toNativeProperties() → NativeProperties
toClasses() → string
    ↓
useId() → fallback ID (if not provided)
    ↓
Render: <label style={cssVars}> <input {...native} ...explicit /> <span> {label} </label>
```

## Impact Analysis

**Affected Files:**
- `apps/ui/src/components/checkbox/checkbox.tsx` → `root.tsx` (rename + refactor)
- `apps/ui/src/components/checkbox/helpers.tsx` → `helpers.ts` (rename + remove `generateId`)
- `apps/ui/src/components/checkbox/index.ts` (update import path)
- `apps/ui/src/components/checkbox/styles/module.css` (consolidate ripple rules)
- `apps/ui/src/components/checkbox/__tests__/checkbox.test.tsx` (update import if needed)

**Dependencies:**
- React 19 (already in use)
- lodash (unchanged usage)
- clsx (unchanged usage)
- ts-pattern (unchanged usage)

**Risk Assessment:**
- **Low Risk**: File renames, import updates, CSS consolidation
- **Medium Risk**: `useId()` adoption (verify SSR compatibility)
- **Low Risk**: Removing `useMemo` (React Compiler handles memoization)
- **Low Risk**: Props reordering (defensive improvement, no behavior change)

---

## Phase 2: Test & Storybook Coverage

### Storybook Interaction Tests (CSF 3.0 `play`)

**Approach**: Add `play` functions to existing `checkbox.stories.tsx` using `@storybook/test` (`userEvent`, `within`, `expect`, `step`). Each interaction story wraps assertions in `step()` calls for readable Given/When/Then output in Storybook's interaction panel.

**Stories to add:**

| Story | Interaction | Assertions |
|-------|-------------|------------|
| `Interactions: Toggle` | `userEvent.click(checkbox)` | `toBeChecked()` / `not.toBeChecked()` |
| `Interactions: Keyboard` | `userEvent.tab()` + `userEvent.keyboard(' ')` | `toBeChecked()` after Space |
| `Interactions: LabelClick` | `userEvent.click(label)` | `expect(onChange).toHaveBeenCalledTimes(1)` |
| `Interactions: Disabled` | `userEvent.click(disabledCheckbox)` | `not.toBeChecked()` — no state change |

**Pattern:**
```tsx
import { expect, userEvent, within } from '@storybook/test';

export const ToggleInteraction: Story = {
  args: { label: 'Toggle me', value: false },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click checkbox to check', async () => {
      await userEvent.click(canvas.getByRole('checkbox'));
      await expect(canvas.getByRole('checkbox')).toBeChecked();
    });
  },
};
```

### Unit Test Expansion (`jest-unit-testing` skill)

**Approach**: Add tests for Phase 1 features that lack coverage, plus helper unit tests. Follow AAA pattern, matching existing BDD naming (`should <expected> when <condition>`) for component tests, Osherove convention (`UnitOfWork_StateUnderTest_ExpectedBehavior`) for helper tests.

**Test file strategy:**
- `__tests__/checkbox.test.tsx` — Add component feature tests (CSS vars, useId, aria-label, ref, props ordering)
- `__tests__/helpers.test.ts` — New file for helper pure function tests (toDefaults, toSize, toClasses, toNativeProperties, toLabelPosition)

**Component test pattern (matching existing BDD style):**
```tsx
test('should inject CSS variables via inline style when size and color are provided', () => {
  // Arrange
  const target = <Checkbox size='big' color='red' />;
  // Act
  const { container } = render(target);
  // Assert
  expect(container.firstChild).toHaveStyle({
    '--checkbox-size-inject': '22px',
    '--checkbox-color-inject': 'red',
  });
});
```

**Helper test pattern (Osherove naming):**
```tsx
// helpers.test.ts
describe('apps/ui/src/components/checkbox/helpers', () => {
  describe('toSize', () => {
    test('toSize_SmallVariant_Returns14', () => {
      expect(toSize({ size: 'small' } as DefaultedProperties)).toBe(14);
    });
  });
});
```

**Dependencies:**
- `@storybook/test` ~8.6 (root devDependency, used by existing icon stories)
- `@testing-library/react` (already in use by existing tests)
- `@testing-library/jest-dom` (already in use)

**Risk Assessment:**
- **No Risk**: Storybook play functions — additive, don't affect component code
- **No Risk**: Helper unit tests — test pure functions, no external dependencies
- **Low Risk**: Component feature tests — test existing behavior, reveal regressions if any
