# Tests: Refactor Text Component — RED Scenarios

## The Justice: Test Scenarios Before Implementation

These are failing test scenarios that MUST be written RED (failing) before implementation begins.
Each scenario references an Acceptance Criterion from `specs/text-refactor.md`.

---

## Section A — Helper Unit Tests (in `text.test.tsx`)

These tests will fail with "Module not found" or type errors until the helpers are refactored.

### A-01: `toSize` with standard named sizes (AC-07)

```tsx
import { toSize } from '../helpers';

describe('helpers', () => {
  describe('toSize', () => {
    test('toSize_WithSmall_Returns0875rem', () => {
      expect(toSize('small')).toBe('0.875rem');
    });

    test('toSize_WithNormal_ReturnsUndefined', () => {
      // 'normal' is the default — CSS handles it, no injection needed
      expect(toSize('normal')).toBeUndefined();
    });

    test('toSize_WithBig_Returns15rem', () => {
      expect(toSize('big')).toBe('1.5rem');
    });

    test('toSize_WithIntegerNumber_ReturnsFormattedPx', () => {
      expect(toSize(20)).toBe('20px');
    });

    test('toSize_WithRemString_ReturnsAsIs', () => {
      // Arbitrary CSS unit strings are passed through unchanged
      expect(toSize('1.5rem')).toBe('1.5rem');
    });

    test('toSize_WithUndefined_ReturnsUndefined', () => {
      expect(toSize(undefined)).toBeUndefined();
    });
  });
```

---

### A-02: `toStyle` behavior (AC-06)

```tsx
import { toStyle, toDefaults, DefaultedProperties } from '../helpers';
import type { Properties } from '../types';

function buildDefaults(overrides: Partial<Properties> = {}): DefaultedProperties {
  return toDefaults(overrides);
}

describe('toStyle', () => {
  test('toStyle_WithAllDefaults_InjectsNoVars', () => {
    // arrange
    const defaults = buildDefaults(); // color='black', align='left', etc.

    // act
    const result = toStyle(defaults);

    // assert — none of the "skip when default" vars should be present
    expect(result).not.toHaveProperty('--text-color-inject');
    expect(result).not.toHaveProperty('--text-align-inject');
    expect(result).not.toHaveProperty('--text-decoration-inject');
    expect(result).not.toHaveProperty('--text-size-inject'); // 'normal' → undefined
  });

  test('toStyle_WithNonDefaultColor_InjectsColorVar', () => {
    // arrange
    const defaults = buildDefaults({ color: 'red' });

    // act
    const result = toStyle(defaults);

    // assert
    expect(result).toMatchObject({ '--text-color-inject': 'red' });
  });

  test('toStyle_WithWeight700_InjectsWeightVar', () => {
    // arrange
    const defaults = buildDefaults({ weight: 700 });

    // act
    const result = toStyle(defaults);

    // assert — weight is injected as string
    expect(result).toMatchObject({ '--text-weight-inject': '700' });
  });

  test('toStyle_WithSizeSmall_InjectsSizeVar', () => {
    // arrange
    const defaults = buildDefaults({ size: 'small' });

    // act
    const result = toStyle(defaults);

    // assert
    expect(result).toMatchObject({ '--text-size-inject': '0.875rem' });
  });

  test('toStyle_WithOriginalStyle_SpreadsOriginalStyle', () => {
    // arrange
    const defaults = buildDefaults();
    const original: Properties = { style: { opacity: 0.5 } };

    // act
    const result = toStyle(defaults, original);

    // assert
    expect(result).toMatchObject({ opacity: 0.5 });
  });
});
```

---

### A-03: `toEventProperties` contract (AC-08)

```tsx
import { toEventProperties, toDefaults } from '../helpers';
import type { Properties } from '../types';

describe('toEventProperties', () => {
  test('toEventProperties_WithDefaults_ExcludesOnClickKey', () => {
    // arrange
    const defaults = toDefaults({ content: 'hello' });

    // act
    const result = toEventProperties(defaults);

    // assert
    expect(result).not.toHaveProperty('onClick');
  });

  test('toEventProperties_WithDefaults_IncludesAllOtherDefaultedFields', () => {
    // arrange
    const defaults = toDefaults({ content: 'hello' });

    // act
    const result = toEventProperties(defaults);

    // assert — verify the exact shape expected by the existing onClick test
    expect(result).toMatchObject({
      content: 'hello',
      as: 'span',
      disabled: false,
      color: 'black',
      align: 'left',
    });
  });
});
```

---

## Section B — Component Structural Tests (in `text.test.tsx`)

These verify the root component no longer uses hooks.

### B-01: Component renders without hooks errors (AC-04)

The test itself is a rendering test — if `useLayoutEffect` is present, jsdom will not throw (it silently ignores layout effects). The structural guarantee must be tested by code inspection. However, the side effect of NOT having `useLayoutEffect` is that CSS vars are applied via inline `style` instead.

```tsx
test('should apply color as CSS custom property via style attribute', () => {
  // arrange
  const component = <Text content='colored' color='red' />;

  // act
  render(component);

  // assert — color is in the style attribute, not applied imperatively
  const element = screen.getByText('colored');
  expect(element).toHaveStyle({ '--text-color-inject': 'red' });
});

test('should not inject CSS var for default color black', () => {
  // arrange
  const component = <Text content='default color' />;

  // act
  render(component);

  // assert — no injection for default
  const element = screen.getByText('default color');
  expect(element).not.toHaveStyle('--text-color-inject: black');
});

test('should apply size as CSS custom property via style attribute', () => {
  // arrange
  const component = <Text content='small text' size='small' />;

  // act
  render(component);

  // assert
  const element = screen.getByText('small text');
  expect(element).toHaveStyle({ '--text-size-inject': '0.875rem' });
});
```

---

## Section C — Lifecycle and Mock Hygiene

These are the hooks that prevent test pollution. They must be present in the outer `describe` scope.

```tsx
describe('components/text', () => {
  beforeEach(() => {
    // Clear all mock call counts, instances, and results
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore all mocked implementations to their originals
    jest.restoreAllMocks();
  });

  // ... existing tests ...
});
```

---

## Section D — Mock Path Verification (Cascade, in 4 files)

These don't add new test cases — they require updating existing `jest.mock` calls to match the new file path. After the rename, `'../../text/text'` no longer exists as a module. Tests will FAIL with:

```
Cannot find module '../../text/text' from '__tests__/radio.test.tsx'
```

**Files requiring the path update:**

| File | From | To |
|------|------|----|
| `radio/__tests__/radio.test.tsx` line 7 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |
| `chip/__tests__/chip.test.tsx` line 8 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |
| `checkbox/__tests__/checkbox.test.tsx` line 7 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |
| `text-field/__tests__/text-field.test.tsx` line 7 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |

These are the RED state — they fail once `text.tsx` is renamed to `root.tsx`.

---

## Section E — CSS Syntax Verification

No JS test can verify CSS fallback variables. This must be verified visually in Storybook or via browser DevTools. The task verification step will instruct the agent to open the `TypeScale` story and confirm `font-size` is rendering correctly for a Text element without a scale class.

Alternatively, the task step can use:
```bash
grep "var(--text-size, --text-base-size)" apps/ui/src/components/text/styles/base.css
```
This must return 0 results (empty output) after the fix.

---

## RED → GREEN Summary

| ID | Test / Check | RED State | GREEN State |
|----|-------------|-----------|-------------|
| A-01 | `toSize` contract tests | Import fails (function signature changed) | All 6 cases pass |
| A-02 | `toStyle` behavior tests | Import fails (function doesn't exist) | All 5 cases pass |
| A-03 | `toEventProperties` tests | Import fails (function doesn't exist) | Both cases pass |
| B-01 | CSS var via style prop tests | `toHaveStyle` fails (set imperatively, not declaratively) | Passes after style object |
| C-01 | Lifecycle hooks | Not present — static analysis failure | Hooks added at outer describe |
| D-01-04 | Mock path in 4 test files | `Cannot find module '../../text/text'` | Path updated to `'../../text/root'` |
| E-01 | CSS fallback syntax | Bug present — grep returns 3 lines | Bug fixed — grep returns 0 lines |
