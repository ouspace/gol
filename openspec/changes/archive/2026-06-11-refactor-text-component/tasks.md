# Tasks: Refactor Text Component to Match Workspace Standard

## Implementation Checklist

> **Agent contract**: Read `design.md`, `specs/text-refactor.md`, and `audit.md` in full before starting.
> Complete sections in ORDER — do NOT skip ahead.
> Every section has a verification gate. Do not proceed until the gate passes.

---

### Section 1 — Filesystem (git mv)

> **Purpose**: Rename files using `git mv` to preserve git history.
> Do NOT modify file contents in this section.

#### 1.1 — Rename main component file

```bash
git mv apps/ui/src/components/text/text.tsx apps/ui/src/components/text/root.tsx
```

#### 1.2 — Rename mock file

```bash
git mv apps/ui/src/components/text/__mocks__/text.tsx apps/ui/src/components/text/__mocks__/root.tsx
```

#### 1.3 — Rename test directory (singular → plural)

The directory rename requires two steps because `git mv` on a directory can be unreliable on case-sensitive filesystems:

```bash
git mv apps/ui/src/components/text/__test__/text.test.tsx \
       apps/ui/src/components/text/__tests__/text.test.tsx
rmdir apps/ui/src/components/text/__test__/
```

#### 1.4 — Verification gate

```bash
ls apps/ui/src/components/text/
```

Must show: `root.tsx`, `factory.tsx`, `helpers.ts`, `types.ts`, `index.ts`, `__mocks__/`, `__tests__/`, `__stories__/`, `styles/`
Must NOT show: `text.tsx`, `__test__/`

```bash
ls apps/ui/src/components/text/__mocks__/
```

Must show: `root.tsx`
Must NOT show: `text.tsx`

**✅ AC-01 verified after this section.**

---

### Section 2 — Import path updates (inside text/)

> **Purpose**: Update all file references to the renamed files.
> Edit exactly these imports — do not refactor any logic in this section.

#### 2.1 — `index.ts`

FIND (line 1): `import TextComponent from './text';`
REPLACE WITH: `import TextComponent from './root';`

#### 2.2 — `factory.tsx`

FIND (line 3): `import Text from './text';`
REPLACE WITH: `import Text from './root';`

#### 2.3 — `text.stories.tsx`

FIND (line 3): `import Text from '../text';`
REPLACE WITH: `import Text from '../root';`

#### 2.4 — `text.test.tsx` (now in `__tests__/`)

FIND (line 6): `import Text from '../text';`
REPLACE WITH: `import Text from '../root';`

#### 2.5 — Untouched files (verify they do NOT need changes)

- `__stories__/text.mdx` — uses `@storybook` imports only, no relative component import
- `__stories__/default.snippet.tsx` — imports from `@gol/ui` barrel, NOT from relative path

Do NOT modify these files.

#### 2.6 — Verification gate

```bash
grep -rn "from '../text'" apps/ui/src/components/text/
grep -rn "from './text'" apps/ui/src/components/text/
```

Both commands must return NO output.

**✅ AC-02 verified after this section.**

---

### Section 3 — Mock path cascade (outside text/)

> **Purpose**: Update `jest.mock` paths in the 4 consuming test files.
> This is required because `__mocks__/text.tsx` was renamed to `__mocks__/root.tsx`.
> The module path in `jest.mock()` must match the actual file being mocked.
>
> **These are 1-line changes in 4 files. Do not modify anything else in these files.**

#### 3.1 — `radio/__tests__/radio.test.tsx` (line 7)

FIND: `jest.mock('../../text/text');`
REPLACE WITH: `jest.mock('../../text/root');`

#### 3.2 — `chip/__tests__/chip.test.tsx` (line 8)

FIND: `jest.mock('../../text/text');`
REPLACE WITH: `jest.mock('../../text/root');`

#### 3.3 — `checkbox/__tests__/checkbox.test.tsx` (line 7)

FIND: `jest.mock('../../text/text');`
REPLACE WITH: `jest.mock('../../text/root');`

#### 3.4 — `text-field/__tests__/text-field.test.tsx` (line 7)

FIND: `jest.mock('../../text/text');`
REPLACE WITH: `jest.mock('../../text/root');`

#### 3.5 — Verification gate

```bash
grep -rn "jest.mock.*text/text" apps/ui/src/components/
```

Must return NO output.

#### 3.6 — Run affected tests

```bash
npx nx run ui:test --testPathPattern="radio|chip|checkbox|text-field"
```

All must pass (exit code 0).

**✅ AC-03 and AC-15 (partial) verified after this section.**

---

### Section 4 — helpers.ts refactoring

> **Purpose**: Export `DefaultedProperties`, refactor `toSize` and `toClasses`,
> and add `toStyle` and `toEventProperties`.
>
> **CRITICAL**: This file must have NO JSX. Only TypeScript.
> The import for `CSSProperties` must be a type-only import: `import type { CSSProperties } from 'react';`

#### 4.1 — Update imports in `helpers.ts`

The current imports are:
```ts
import _ from 'lodash';
import type { Properties } from './types';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';
```

Add: `import type { CSSProperties } from 'react';`

#### 4.2 — Add and export `DefaultedProperties` type

Add AFTER the imports and BEFORE `toDefaults`:

```ts
export type DefaultedProperties = Properties &
  Required<
    Pick<
      Properties,
      | 'as'
      | 'size'
      | 'color'
      | 'align'
      | 'decoration'
      | 'italic'
      | 'transform'
      | 'wrap'
      | 'unselectable'
      | 'disabled'
      | 'className'
      | 'onClick'
    >
  >;
```

#### 4.3 — Update `toDefaults` return type

FIND: `): Required<Properties> {`
REPLACE WITH: `): DefaultedProperties {`

FIND: `}) as Required<Properties>;`
REPLACE WITH: `}) as DefaultedProperties;`

#### 4.4 — Replace `toSize` function

FIND and replace the ENTIRE `toSize` function:

```ts
// BEFORE:
export function toSize(properties: Required<Properties>): string | null {
  return match({ size: properties.size })
    .with({ size: 'small' }, () => '0.875rem')
    .with({ size: 'normal' }, () => null)
    .with({ size: 'big' }, () => '1.5rem')
    .with({ size: P.number }, ({ size }) => `${size}px`)
    .with({ size: P.string }, ({ size }) => size)
    .otherwise(() => null);
}

// AFTER:
export function toSize(size: Properties['size']): string | undefined {
  if (size == null) return undefined;
  return match(size)
    .with('small', () => '0.875rem')
    .with('normal', () => undefined)
    .with('big', () => '1.5rem')
    .with(P.number, (n) => `${n}px`)
    .with(P.string, (s) => s as string)
    .otherwise(() => undefined);
}
```

#### 4.5 — Update `toClasses` signature

FIND: `export function toClasses(properties: Required<Properties>): string {`
REPLACE WITH: `export function toClasses(properties: DefaultedProperties): string {`

#### 4.6 — Add `toStyle` function (at END of file, after all existing functions)

```ts
export function toStyle(defaults: DefaultedProperties, original?: Properties): CSSProperties {
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
  } as CSSProperties;
}
```

#### 4.7 — Add `toEventProperties` function (at END of file, after `toStyle`)

```ts
export function toEventProperties(defaults: DefaultedProperties): Omit<DefaultedProperties, 'onClick'> {
  return _.omit(defaults, ['onClick']);
}
```

#### 4.8 — Verification gate

```bash
grep -n "JSX\|<[A-Z]\|<[a-z]" apps/ui/src/components/text/helpers.ts | grep -v "^.*//\|^.*\*"
```

Must return NO output (no JSX in the file, ignoring comments).

```bash
npx nx run ui:typecheck
```

Must pass with no new errors.

**✅ AC-06, AC-07, AC-08, AC-09 verified after this section.**

---

### Section 5 — CSS bug fix (base.css)

> **Purpose**: Fix 3 lines with broken CSS variable fallback syntax.
> IMPORTANT: This section MUST be completed before root.tsx verification.
> The `toSize('normal')` → `undefined` design decision relies on this fix.
>
> **Only modify lines 6, 7, and 9. Do NOT touch any other line.**

#### 5.1 — Edit `styles/base.css`

FIND (line 6): `font-size: var(--text-size, --text-base-size);`
REPLACE WITH: `font-size: var(--text-size, var(--text-base-size));`

FIND (line 7): `font-weight: var(--text-weight, --text-base-weight);`
REPLACE WITH: `font-weight: var(--text-weight, var(--text-base-weight));`

FIND (line 9): `letter-spacing: var(--text-letter-spacing, --text-base-letter-spacing);`
REPLACE WITH: `letter-spacing: var(--text-letter-spacing, var(--text-base-letter-spacing));`

IMPORTANT: Line 8 (`line-height`) uses the CORRECT syntax already: `var(--text-line-height, var(--text-base-line-height))`. Do NOT change it.

#### 5.2 — Verification gate

```bash
grep "var(--text-size, --text-base-size)" apps/ui/src/components/text/styles/base.css
grep "var(--text-weight, --text-base-weight)" apps/ui/src/components/text/styles/base.css
grep "var(--text-letter-spacing, --text-base-letter-spacing)" apps/ui/src/components/text/styles/base.css
```

All 3 commands must return NO output (empty — the broken syntax no longer exists).

**✅ AC-10 verified after this section.**

---

### Section 6 — root.tsx refactoring

> **Purpose**: Replace the entire component implementation to use the declarative
> `style` object pattern, named event handler, and no hooks.
>
> **CRITICAL**: Verify Section 4 (helpers) and Section 5 (CSS fix) are complete FIRST.
>
> **Remove**: `useRef`, `useLayoutEffect`, `useMemo`, `_` (lodash) imports.
> **Remove**: `toSize` from imports (it's now called internally by `toStyle`).

#### 6.1 — Replace the import block (top of `root.tsx`)

Replace the ENTIRE import section with:

```tsx
import type { Properties } from './types';
import { toDefaults, toClasses, toStyle, toEventProperties } from './helpers';
import './styles/index.css';
```

NOTE: The JSDoc comment block MUST be preserved unchanged. Only the imports change.

#### 6.2 — Replace the entire component function body

```tsx
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

#### 6.3 — Verification gate

```bash
grep -n "useRef\|useLayoutEffect\|useMemo\|import _\|from 'lodash'" apps/ui/src/components/text/root.tsx
```

Must return NO output.

```bash
npx nx run ui:typecheck
```

Must pass with no new errors.

**✅ AC-04 and AC-05 verified after this section.**

---

### Section 7 — Tests update

> **Purpose**: Add lifecycle hooks, helper unit tests, and inline CSS var tests.
> Do NOT modify any existing test case. Only ADD.

#### 7.1 — Add imports at top of `text.test.tsx` (after existing imports)

```tsx
import { toSize, toStyle, toEventProperties, toDefaults } from '../helpers';
import type { Properties } from '../types';
import type { DefaultedProperties } from '../helpers';
```

#### 7.2 — Add `buildDefaults` factory function

Add inside the outer `describe('components/text', ...)`, immediately after the opening brace — BEFORE the first nested `describe`:

```tsx
function buildDefaults(overrides: Partial<Properties> = {}): DefaultedProperties {
  return toDefaults(overrides);
}
```

#### 7.3 — Add lifecycle hooks

Add AFTER `buildDefaults`, BEFORE the first nested `describe`:

```tsx
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

#### 7.4 — Add CSS var inline tests (inside existing `describe('Layout', ...)`)

Add after the existing `should be render by default` test:

```tsx
test('should apply color as CSS custom property via style attribute', () => {
  // arrange
  const component = <Text content='colored' color='red' />;

  // act
  render(component);

  // assert
  expect(screen.getByText('colored')).toHaveStyle({ '--text-color-inject': 'red' });
});

test('should not inject CSS var for default color', () => {
  // arrange
  const component = <Text content='default color' />;

  // act
  render(component);

  // assert
  expect(screen.getByText('default color')).not.toHaveStyle('--text-color-inject: black');
});

test('should apply size as CSS custom property via style attribute', () => {
  // arrange
  const component = <Text content='small text' size='small' />;

  // act
  render(component);

  // assert
  expect(screen.getByText('small text')).toHaveStyle({ '--text-size-inject': '0.875rem' });
});
```

#### 7.5 — Add `describe('helpers', ...)` block

Add at the BOTTOM of the outer `describe('components/text', ...)`, after the existing `describe('Events', ...)` block:

```tsx
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

    test('toSize_WithIntegerNumber_ReturnsFormattedPx', () => {
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
    test('toStyle_WithAllDefaults_InjectsNoVars', () => {
      const defaults = buildDefaults();
      const result = toStyle(defaults);
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

    test('toStyle_WithWeight700_InjectsWeightVar', () => {
      const defaults = buildDefaults({ weight: 700 });
      const result = toStyle(defaults);
      expect(result).toMatchObject({ '--text-weight-inject': '700' });
    });

    test('toStyle_WithSizeSmall_InjectsSizeVar', () => {
      const defaults = buildDefaults({ size: 'small' });
      const result = toStyle(defaults);
      expect(result).toMatchObject({ '--text-size-inject': '0.875rem' });
    });

    test('toStyle_WithOriginalStyle_SpreadsOriginalStyle', () => {
      const defaults = buildDefaults();
      const original: Properties = { style: { opacity: 0.5 } };
      const result = toStyle(defaults, original);
      expect(result).toMatchObject({ opacity: 0.5 });
    });
  });

  describe('toEventProperties', () => {
    test('toEventProperties_ExcludesOnClickKey', () => {
      const defaults = toDefaults({ content: 'hello' });
      const result = toEventProperties(defaults);
      expect(result).not.toHaveProperty('onClick');
    });

    test('toEventProperties_IncludesAllOtherDefaultedFields', () => {
      const defaults = toDefaults({ content: 'hello' });
      const result = toEventProperties(defaults);
      expect(result).toMatchObject({
        content: 'hello',
        as: 'span',
        disabled: false,
        color: 'black',
        align: 'left',
      });
    });
  });
});
```

#### 7.6 — Run text tests

```bash
npx nx run ui:test --testPathPattern="text/__tests__/text.test"
```

All tests must PASS (exit code 0).

**✅ AC-07, AC-08, AC-11, AC-12 verified after this section.**

---

### Section 8 — Stories update

> **Purpose**: Update import path and add new stories.

#### 8.1 — Update import

Already done in Section 2.3. Verify: `import Text from '../root';`

#### 8.2 — Add imports for play functions (top of stories file)

```tsx
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/test';
```

#### 8.3 — Add new stories after `TypeScale`

Add these exports at the END of the file:

```tsx
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text content='Default' />
      <Text content='Disabled' disabled />
      <Text content='Italic' italic />
      <Text content='No wrap — this long text will not wrap no matter how wide or narrow the container is' wrap={false} />
      <Text content='Unselectable — try to select this text' unselectable />
    </div>
  ),
};

const colorTokens = [
  'black', 'red', 'green', 'blue', 'orange',
  'purple', 'teal', 'pink', 'brown', 'grey',
] as const;

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {colorTokens.map((color) => (
        <Text key={color} content={color} color={color} />
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text content='weight: 300 (light)' weight={300} />
      <Text content='weight: 400 (normal)' weight={400} />
      <Text content='weight: 600 (semibold)' weight={600} />
      <Text content='weight: 700 (bold)' weight={700} />
      <Text content='weight: bold (keyword)' weight='bold' />
    </div>
  ),
};

export const Interactions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text content='Click me' onClick={() => {}} data-testid='clickable-text' />
      <Text content='Disabled — not clickable' disabled onClick={() => {}} data-testid='disabled-text' />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clickable text is in the document', async () => {
      const el = canvas.getByTestId('clickable-text');
      await expect(el).toBeInTheDocument();
      await expect(el).not.toHaveClass('disabled');
    });

    await step('Disabled text has disabled class', async () => {
      const el = canvas.getByTestId('disabled-text');
      await expect(el).toHaveClass('disabled');
    });

    await step('Click on enabled text does not throw', async () => {
      const el = canvas.getByTestId('clickable-text');
      await userEvent.click(el);
    });
  },
};
```

**✅ AC-13 and AC-14 verified after this section.**

---

### Section 9 — Final verification

#### 9.1 — Full test suite

```bash
npx nx run ui:test
```

Must exit with code 0. All tests pass — including radio, chip, checkbox, text-field.

#### 9.2 — TypeScript check

```bash
npx nx run ui:typecheck
```

No errors related to the text component or any consuming file.

#### 9.3 — File structure check

```bash
ls apps/ui/src/components/text/
ls apps/ui/src/components/text/__mocks__/
ls apps/ui/src/components/text/__tests__/
```

- `text/` must contain `root.tsx` (not `text.tsx`)
- `__mocks__/` must contain `root.tsx` (not `text.tsx`)
- `__tests__/` must contain `text.test.tsx`

#### 9.4 — No hooks in root.tsx

```bash
grep -n "useRef\|useLayoutEffect\|useMemo" apps/ui/src/components/text/root.tsx
```

Must return NO output.

#### 9.5 — No broken CSS var syntax

```bash
grep "var(--text-size, --text-base-size)\|var(--text-weight, --text-base-weight)\|var(--text-letter-spacing, --text-base-letter-spacing)" apps/ui/src/components/text/styles/base.css
```

Must return NO output.

**✅ AC-15 final verification complete.**

---

## The Ledger

| Agent | Action | Status | Detail |
|:------|:-------|:-------|:-------|
| Blueprint | Draft Proposal | ✅ DONE | `proposal.md` created |
| Blueprint | Draft Design | ✅ DONE | `design.md` created |
| Blueprint | Draft Specs | ✅ DONE | `specs/text-refactor.md` — AC-01 through AC-15 |
| Censor | Audit | ✅ DONE | PASS — 2 clarifications, 1 dependency. `audit.md` created |
| Justice | Write Tests | ✅ DONE | RED scenarios documented in `tests.md` |
| Mason | Section 1 (Filesystem) | ✅ DONE | `git mv` text.tsx→root.tsx, __mocks__/text.tsx→root.tsx, __test__/text.test.tsx→__tests__/text.test.tsx |
| Mason | Section 2 (Imports inside text/) | ✅ DONE | index.ts, factory.tsx, text.stories.tsx, text.test.tsx — todos `from './root'`/`from '../root'` |
| Mason | Section 3 (Mock cascade) | ✅ DONE | radio/chip/checkbox/text-field tests → 132/132 passing. Haste-map warning pre-existente (icon+text `__mocks__/root.tsx` duplicados) — fuera de scope |
| Mason | Section 4 (helpers.ts) | ✅ DONE | DefaultedProperties + toSize refactor. **CORRECCIÓN** (vs tasks.md original): NO se exportan `toStyle` ni `toEventProperties` — el patrón del workspace (chip/radio/checkbox) construye el `style` object inline en `root.tsx` y el `_.omit` inline en el handler. OpenSpec tasks.md había inventado ambos helpers sin precedente. `style?: CSSProperties` agregado a types.ts (alineado con chip) |
| Mason | Section 5 (CSS bug fix) | ✅ DONE | 3 líneas en `.text` base: `font-size`, `font-weight`, `letter-spacing` ahora con `var(...)` anidado. Línea 8 (`line-height`) ya estaba correcta, no tocada |
| Mason | Section 6 (root.tsx) | ✅ DONE | Removidos useRef/useLayoutEffect/useMemo. `style` object construido inline (7 CSS vars) — patrón chip/radio/checkbox. `handleClick` named + `_.omit` inline. 14/14 tests passing. **Note:** `import _ from 'lodash'` se mantiene (omit inline, no se delega a helper) |
| Mason | Section 7 (Tests) | ✅ DONE | Lifecycle hooks (`beforeEach`/`afterEach`) + 2 CSS var integration tests en `Layout` describe. **Skipped:** `describe('helpers', ...)` unit tests block — viola patrón "2 describes only" del workspace; `toStyle`/`toEventProperties` ya no existen (Sección 4 corregida) |
| Mason | Section 8 (Stories) | ✅ DONE | 4 new stories: `States`, `Colors`, `Weights`, `Interactions` (con `play` function estilo chip/radio) |
| Mason | Section 9 (Final verification) | ✅ DONE | 7 suites / 185 tests passing (1 skipped pre-existing). Typecheck limpio (solo TS6133 pre-existente en icon mock). Estructura de archivos correcta. 0 hooks en root.tsx. 0 syntax CSS rota |
