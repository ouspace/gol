# Design: Refactor Text Component to Match Workspace Standard

## Technical Approach

Pure structural refactoring plus a targeted CSS bug fix. No behavioral changes except correcting the broken CSS variable fallback syntax in `base.css`.

The implementation follows the canonical pattern established in `apps/ui/src/components/radio/root.tsx`.

---

### Phase 1 — Filesystem (git mv)

Rename files using `git mv` to preserve git history:

| From | To |
|------|----|
| `text.tsx` | `root.tsx` |
| `__test__/` (directory) | `__tests__/` |
| `__mocks__/text.tsx` | `__mocks__/root.tsx` |

### Phase 2 — Import path updates

All references to the old filename must be updated after the rename.

**Inside `text/`:**

| File | Find | Replace |
|------|------|---------|
| `index.ts` line 1 | `import TextComponent from './text'` | `import TextComponent from './root'` |
| `factory.tsx` line 3 | `import Text from './text'` | `import Text from './root'` |
| `text.stories.tsx` line 3 | `import Text from '../text'` | `import Text from '../root'` |
| `text.test.tsx` line 6 | `import Text from '../text'` | `import Text from '../root'` |

**Outside `text/` — mock path cascade (4 files, 1 line each):**

| File | Find | Replace |
|------|------|---------|
| `radio/radio.test.tsx` line 7 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |
| `chip/chip.test.tsx` line 8 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |
| `checkbox/checkbox.test.tsx` line 7 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |
| `text-field/text-field.test.tsx` line 7 | `jest.mock('../../text/text')` | `jest.mock('../../text/root')` |

### Phase 3 — helpers.ts refactoring

**Add `DefaultedProperties` type.** Only the fields that have concrete non-null defaults in `toDefaults` are `Required`. Fields defaulted to `null` (weight, lineHeight, letterSpacing, scale, children, content) are NOT forced to Required — they remain `null | undefined` in the type.

```ts
export type DefaultedProperties = Properties &
  Required<Pick<Properties,
    'as' | 'size' | 'color' | 'align' | 'decoration' |
    'italic' | 'transform' | 'wrap' | 'unselectable' |
    'disabled' | 'className' | 'onClick'
  >>;
```

**Update `toDefaults` return type** from `Required<Properties>` to `DefaultedProperties`.

**Refactor `toSize`** — receives only `Properties['size']`, not the full object:

```ts
// Before:
export function toSize(properties: Required<Properties>): string | null

// After:
export function toSize(size: Properties['size']): string | undefined {
  if (size == null) return undefined;
  return match(size)
    .with('small', () => '0.875rem')
    .with('normal', () => undefined)   // CSS handles default, no injection needed
    .with('big', () => '1.5rem')
    .with(P.number, (n) => `${n}px`)
    .with(P.string, (s) => s)          // arbitrary CSS unit (e.g. '2rem', '1.25em')
    .otherwise(() => undefined);
}
```

**Update `toClasses`** signature to accept `DefaultedProperties` instead of `Required<Properties>`.

**Add `toStyle`** — encapsulates all CSS variable injections:

```ts
export function toStyle(
  defaults: DefaultedProperties,
  original?: Properties,
): React.CSSProperties {
  const size = toSize(defaults.size);
  return {
    ...original?.style,
    ...(size != null && { '--text-size-inject': size }),
    ...(defaults.weight != null && { '--text-weight-inject': `${defaults.weight}` }),
    ...(defaults.lineHeight != null && { '--text-line-height-inject': `${defaults.lineHeight}` }),
    ...(defaults.letterSpacing != null && { '--text-letter-spacing-inject': defaults.letterSpacing }),
    ...(defaults.color !== 'black' && { '--text-color-inject': defaults.color }),
    ...(defaults.align !== 'left' && { '--text-align-inject': defaults.align }),
    ...(defaults.decoration !== 'none' && { '--text-decoration-inject': defaults.decoration }),
  } as React.CSSProperties;
}
```

**Add `toEventProperties`** — prepares the second argument for `onClick` callbacks:

```ts
export function toEventProperties(defaults: DefaultedProperties): Omit<DefaultedProperties, 'onClick'> {
  return _.omit(defaults, ['onClick']);
}
```

Note: `toStyle` must be in `helpers.ts` (no JSX). It returns a plain object, so `React.CSSProperties` is a type import only — acceptable in a `.ts` file.

### Phase 4 — root.tsx refactoring

Replace the entire component implementation:

```tsx
import type { Properties } from './types';
import { toDefaults, toClasses, toStyle, toEventProperties } from './helpers';
import './styles/index.css';

/**
 * Text component
 * ...existing JSDoc unchanged...
 */
export default function Text(properties?: Properties) {
  const defaults = toDefaults(properties);
  const Element = defaults.as;

  const style = toStyle(defaults, properties);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (defaults.disabled) return;
    defaults.onClick(event, toEventProperties(defaults));
  };

  return (
    <Element className={toClasses(defaults)} style={style} onClick={handleClick}>
      {defaults.children ?? defaults.content}
    </Element>
  );
}
```

**Removed from root.tsx:**
- `useRef` import and call
- `useLayoutEffect` import and call
- `useMemo` import and call
- `_` (lodash) import — all lodash calls moved to helpers
- `toSize` import (used internally by `toStyle` in helpers, not needed in root)

**Kept:**
- JSDoc comment block (unchanged)
- `{defaults.children ?? defaults.content}` render logic (unchanged)
- `defaults.as` as the polymorphic element selector

### Phase 5 — CSS bug fix (base.css)

Fix 3 lines with broken fallback syntax. The pattern `var(--a, --b)` treats `--b` as a literal string, not a variable reference. The correct syntax is `var(--a, var(--b))`.

| Line | Before (broken) | After (correct) |
|------|----------------|-----------------|
| 6 | `font-size: var(--text-size, --text-base-size)` | `font-size: var(--text-size, var(--text-base-size))` |
| 7 | `font-weight: var(--text-weight, --text-base-weight)` | `font-weight: var(--text-weight, var(--text-base-weight))` |
| 9 | `letter-spacing: var(--text-letter-spacing, --text-base-letter-spacing)` | `letter-spacing: var(--text-letter-spacing, var(--text-base-letter-spacing))` |

Note: Line 8 (`line-height`) already uses the correct syntax and must NOT be changed.

### Phase 6 — Tests update (text.test.tsx)

**Move to `__tests__/` directory** (consequence of Phase 1 rename).

**Add lifecycle hooks** inside outer `describe('components/text', ...)`:
```tsx
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

**Add `describe('helpers', ...)` block** at the bottom of the outer describe, after existing `describe('Events', ...)`:

```tsx
import { toSize, toStyle, toEventProperties, toDefaults } from '../helpers';
import type { Properties } from '../types';

function buildDefaults(overrides: Partial<Properties> = {}): DefaultedProperties {
  return toDefaults(overrides);
}

describe('helpers', () => {
  describe('toSize', () => {
    test('toSize_WithSmall_Returns0875rem', () => {
      expect(toSize('small')).toBe('0.875rem');
    });
    test('toSize_WithNormal_ReturnsUndefined', () => {
      expect(toSize('normal')).toBeUndefined();
    });
    test('toSize_WithBig_Returns15rem', () => {
      expect(toSize('big')).toBe('1.5rem');
    });
    test('toSize_WithNumber_ReturnsFormattedPxString', () => {
      expect(toSize(20)).toBe('20px');
    });
    test('toSize_WithRemString_ReturnsAsIs', () => {
      expect(toSize('1.5rem')).toBe('1.5rem');
    });
    test('toSize_WithUndefined_ReturnsUndefined', () => {
      expect(toSize(undefined)).toBeUndefined();
    });
  });

  describe('toStyle', () => {
    test('toStyle_WithDefaults_ReturnsEmptyStyleObject', () => {
      const defaults = buildDefaults();
      const result = toStyle(defaults);
      // color='black', align='left', decoration='none' — none should be injected
      // size='normal' → undefined — should not be injected
      expect(result).not.toHaveProperty('--text-color-inject');
      expect(result).not.toHaveProperty('--text-align-inject');
      expect(result).not.toHaveProperty('--text-decoration-inject');
      expect(result).not.toHaveProperty('--text-size-inject');
    });

    test('toStyle_WithNonDefaultColor_InjectsColorVar', () => {
      const defaults = buildDefaults({ color: 'red' });
      const result = toStyle(defaults);
      expect(result).toMatchObject({ '--text-color-inject': 'red' });
    });

    test('toStyle_WithWeight_InjectsWeightVar', () => {
      const defaults = buildDefaults({ weight: 700 });
      const result = toStyle(defaults);
      expect(result).toMatchObject({ '--text-weight-inject': '700' });
    });
  });

  describe('toEventProperties', () => {
    test('toEventProperties_WithDefaults_ExcludesOnClick', () => {
      const defaults = buildDefaults({ content: 'hello' });
      const result = toEventProperties(defaults);
      expect(result).not.toHaveProperty('onClick');
    });

    test('toEventProperties_WithDefaults_IncludesAllOtherFields', () => {
      const defaults = buildDefaults({ content: 'hello' });
      const result = toEventProperties(defaults);
      expect(result).toMatchObject({ content: 'hello', disabled: false });
    });
  });
});
```

### Phase 7 — Stories update (text.stories.tsx)

**Update import** from `'../text'` to `'../root'`.

**Add `States` story:**
```tsx
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text content='Default' />
      <Text content='Disabled' disabled />
      <Text content='Italic' italic />
      <Text content='No wrap — this text will not wrap to the next line no matter how long it is' nowrap />
      <Text content='Unselectable — try to select this text' unselectable />
    </div>
  ),
};
```

**Add `Colors` story** (dynamic map):
```tsx
const colorTokens = ['black', 'red', 'green', 'blue', 'orange', 'purple', 'teal'] as const;

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {colorTokens.map((color) => (
        <Text key={color} content={color} color={color} />
      ))}
    </div>
  ),
};
```

**Add `Weights` story:**
```tsx
export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text content='weight: 300 (light)' weight={300} />
      <Text content='weight: 400 (normal)' weight={400} />
      <Text content='weight: 700 (bold)' weight={700} />
      <Text content='weight: bold (keyword)' weight='bold' />
    </div>
  ),
};
```

**Add `Interactions` story with `play` function:**
```tsx
export const Interactions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text content='Click me' onClick={() => {}} data-testid='clickable-text' />
      <Text content='Disabled — not clickable' disabled onClick={() => {}} data-testid='disabled-text' />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clickable text responds to click', async () => {
      const el = canvas.getByTestId('clickable-text');
      await userEvent.click(el);
      await expect(el).toBeInTheDocument();
    });

    await step('Disabled text ignores click', async () => {
      const el = canvas.getByTestId('disabled-text');
      await expect(el).toHaveClass('disabled');
    });
  },
};
```

## Architecture Decisions

- **Decision**: `toStyle` lives in `helpers.ts`, not `root.tsx`
- **Rationale**: All CSS variable logic is pure computation (inputs → CSS object). No side effects. Testable in isolation. Keeps `root.tsx` focused on structure.

- **Decision**: `factory.tsx` remains a separate file with unchanged logic
- **Rationale**: It contains JSX (`<Text ... />`) and imports the Text component, creating a dependency on `root.tsx`. Moving it to `helpers.ts` would: (a) require `.tsx` extension, violating the no-JSX rule for helpers, (b) create a circular import (`helpers.ts` → `root.tsx` → `helpers.ts`).

- **Decision**: `toSize('normal')` returns `undefined`
- **Rationale**: When the CSS variable `--text-size-inject` is not set, `--text-size` resolves to `var(--text-size-inject)` which is invalid, BUT the scale blocks (`.display-large`, etc.) provide their own fallback. For the base `.text` block without a scale, after the CSS bug fix, `font-size: var(--text-size, var(--text-base-size))` will fall back to `1rem`. This is correct behavior — no injection needed for normal size.

- **Decision**: `toEventProperties` returns `DefaultedProperties` without `onClick`, not `Properties`
- **Rationale**: The existing test explicitly expects the defaulted values (e.g. `children: null`, `scale: null`, `as: 'span'`). This is intentional — consumers receive the fully normalized state, not just the user-supplied props.

- **Decision**: CSS bug fix included in this change
- **Rationale**: The bug (`var(--text-size, --text-base-size)`) affects `font-size`, `font-weight`, and `letter-spacing` fallbacks when no injection variable is set. It's in the same file being touched. Fixing it separately would require another change cycle for 3 lines. The fix is surgical (3 lines, no logic change).

## Data Flow

```
Properties (optional)
       │
       ▼
  toDefaults()         → DefaultedProperties
       │
       ├──► toClasses()          → className string
       ├──► toStyle(d, original) → React.CSSProperties (7 CSS vars, conditional)
       │      └── toSize(size)   → string | undefined
       ├──► handleClick()        → calls defaults.onClick(event, toEventProperties(defaults))
       │
       ▼
  <Element className={...} style={style} onClick={handleClick}>
    {defaults.children ?? defaults.content}
  </Element>
```

## Impact Analysis

**Files modified (content changes):**
- `text.tsx` → renamed to `root.tsx`, entire component body replaced
- `helpers.ts` — `DefaultedProperties`, `toSize`, `toClasses` updated; `toStyle`, `toEventProperties` added
- `factory.tsx` — import path only
- `index.ts` — import path only
- `styles/base.css` — 3 line CSS syntax fix
- `text.test.tsx` — lifecycle hooks + helper tests + import path
- `text.stories.tsx` — new stories + import path

**Files renamed:**
- `text.tsx` → `root.tsx`
- `__test__/` → `__tests__/`
- `__mocks__/text.tsx` → `__mocks__/root.tsx`

**Files with 1-line change (mock path) in other components:**
- `radio/radio.test.tsx`
- `chip/chip.test.tsx`
- `checkbox/checkbox.test.tsx`
- `text-field/text-field.test.tsx`

**No changes to:**
- `types.ts`
- `styles/variables.css`
- `styles/states.css`
- `styles/index.css`
- `factory.tsx` logic
- `__mocks__/root.tsx` content (only renamed)
