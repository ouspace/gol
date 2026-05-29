# Tests: Refactor Radio Component to Match Workspace Standard

## The Justice's Verdict

This is a pure refactoring change. The existing test file (`radio.test.tsx`) already covers all rendered behavior. The new failing scenarios are structural — they verify the *new structural requirements* (lifecycle hooks, `helpers.ts` exports, `root.tsx` shape) that do not exist yet.

Because we are not adding new behavioral test cases but instead restructuring the existing suite and adding helpers, the RED state is achieved by:
1. The `toSize` helper currently returns `number` — after spec, it must return `string | undefined`. A test for the new contract will fail against the current implementation.
2. The `toLabelContent` helper does not exist yet — any test importing it will fail.
3. The lifecycle hooks (`beforeEach`/`afterEach`) do not exist yet in the test file.

### Failing Test Scenarios (RED)

1. **Scenario**: `toSize` returns a formatted string
   - GIVEN: `helpers.ts` exports `toSize`
   - WHEN: `toSize('normal')` is called
   - THEN: returns `'20px'` (string)
   - **Result**: [EXPECTED FAILURE] — current implementation returns `20` (number)

2. **Scenario**: `toLabelContent` is exported from helpers (text-field pattern)
   - GIVEN: `helpers.ts` exports `toLabelContent(label: NonNullable<Properties['label']>)`
   - WHEN: imported in a test
   - THEN: resolves without error
   - **Result**: [EXPECTED FAILURE] — function does not exist yet

3. **Scenario**: `toLabelContent` returns the value as-is for function / string / ReactElement inputs
   - GIVEN: a `label` that is a function, string, or ReactElement
   - WHEN: `toLabelContent(label)` is called
   - THEN: returns the input unchanged (no `Text.createFrom` wrapping inside the helper)
   - **Result**: [EXPECTED FAILURE] — function does not exist yet

4. **Scenario**: `toLabelContent` merges className for TextProperties object inputs
   - GIVEN: `label = { content: 'hi', color: 'red' }`
   - WHEN: `toLabelContent(label)` is called
   - THEN: returns a TextProperties with `className: 'radio__label'` prepended to the existing className
   - **Result**: [EXPECTED FAILURE] — function does not exist yet

### Test Implementation

The agent implementing this change must:

**Step A — Add tests for the new `helpers.ts` contract** in a NEW describe block inside the existing `radio.test.tsx`:

```tsx
// Add inside radio.test.tsx, as a new top-level describe:

import { toSize, toLabelContent } from '../helpers';

describe('helpers', () => {
  describe('toSize', () => {
    test('toSize_WithSmall_Returns16px', () => {
      expect(toSize('small')).toBe('16px');
    });

    test('toSize_WithNormal_Returns20px', () => {
      expect(toSize('normal')).toBe('20px');
    });

    test('toSize_WithBig_Returns24px', () => {
      expect(toSize('big')).toBe('24px');
    });

    test('toSize_WithNumber_ReturnsFormattedPxString', () => {
      expect(toSize(26)).toBe('26px');
    });

    test('toSize_WithUndefined_ReturnsUndefined', () => {
      expect(toSize(undefined)).toBeUndefined();
    });
  });

  describe('toLabelContent', () => {
    // Pure shape normalizer — mirrors text-field pattern.
    // Children priority and Text.createFrom wrapping live in root.tsx, not here.

    test('toLabelContent_WithStringLabel_ReturnsStringUnchanged', () => {
      expect(toLabelContent('hello')).toBe('hello');
    });

    test('toLabelContent_WithFunctionLabel_ReturnsFunctionUnchanged', () => {
      const fn = () => <em>label</em>;
      expect(toLabelContent(fn)).toBe(fn);
    });

    test('toLabelContent_WithReactElementLabel_ReturnsElementUnchanged', () => {
      const element = <em>label</em>;
      expect(toLabelContent(element)).toBe(element);
    });

    test('toLabelContent_WithTextPropertiesObject_MergesRadioLabelClassName', () => {
      const result = toLabelContent({ content: 'hi' });
      expect(result).toMatchObject({ content: 'hi', className: 'radio__label' });
    });

    test('toLabelContent_WithTextPropertiesAndCustomClassName_AppendsRadioLabel', () => {
      const result = toLabelContent({ content: 'hi', className: 'custom' });
      expect(result).toMatchObject({ content: 'hi' });
      expect((result as { className?: string }).className).toContain('radio__label');
      expect((result as { className?: string }).className).toContain('custom');
    });
  });
});
```

Where `buildDefaults` is a local test-only factory (still useful for the lifecycle hooks
and other future tests, even if `toLabelContent` tests no longer need it):
```tsx
import { toDefaults } from '../helpers';

function buildDefaults(overrides: Partial<Properties> = {}): Required<Properties> {
  return toDefaults(overrides) as Required<Properties>;
}
```

**Step B — Add lifecycle hooks** to the outer `describe('components/radio', ...)` block:

```tsx
describe('components/radio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ... existing describe blocks unchanged
});
```

- [x] Tests documented above
- [ ] Tests verified as failing (will fail until implementation is complete — `toSize` returns number, `toLabelContent` does not exist)
