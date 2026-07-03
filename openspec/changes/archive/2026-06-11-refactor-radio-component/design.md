# Design: Refactor Radio Component to Match Workspace Standard

## Technical Approach

This is a structural refactoring. No behavior changes. The implementation follows the canonical pattern established in `apps/ui/src/components/chip/root.tsx` and `apps/ui/src/components/checkbox/`.

### Phase 1 — Filesystem (git mv)

Rename files using `git mv` to preserve history:

| From | To |
|------|----|
| `radio.tsx` | `root.tsx` |
| `helpers.tsx` | `helpers.ts` |
| `styles/state.css` | `styles/states.css` |

### Phase 2 — Wiring (index + styles imports)

- `index.ts`: change `export { default as Radio } from './radio'` → `export { default as Radio } from './root'`
- `styles/index.css`: change `@import url('./state.css')` → `@import url('./states.css')`

### Phase 3 — helpers.ts refactor

**Add `toLabelContent(label)` helper** — a **pure shape normalizer** that mirrors the existing
`text-field` pattern (`apps/ui/src/components/text-field/helpers.tsx:75-80`). The helper is **not**
a slot-content resolver; `children` priority and `Text.createFrom` wrapping live in the caller
(`root.tsx`).

The helper handles 3 cases:
1. `function` / `string` / `ReactElement` label → return the value as-is
2. `TextProperties` object label → return `_.defaults({ className: clsx('radio__label', label.className) }, label)`

The caller (`root.tsx`) resolves the slot with this priority:
1. If `defaults.children` is non-empty → render `defaults.children`
2. Else if `defaults.label != null` → render `Text.createFrom(toLabelContent(defaults.label))`
3. Else → render `null`

**Update `toSize`** to return `string | undefined` (matching the Chip pattern):
- `'small'` → `'16px'`
- `'normal'` → `'20px'`
- `'big'` → `'24px'`
- `number` → `'${n}px'`
- `undefined` / `null` → `undefined`

### Phase 4 — root.tsx refactor

Replace the entire component body with the canonical pattern:

```tsx
export default function Radio(properties?: Properties) {
  const defaults = toDefaults(properties);
  const nativeProperties = toNativeProperties(properties);

  // CSS variable injection — declarative, no side effects
  const style = {
    ...properties?.style,
    '--radio-size-inject': toSize(defaults.size),
    '--radio-color-inject': defaults.color,
  } as React.CSSProperties;

  // Named handler — not anonymous lambda in JSX
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (defaults.disabled) return;
    defaults.onChange(event, { ...properties, checked: event.target.checked });
  };

  return (
    <label
      style={style}
      className={toClasses(defaults)}
      aria-disabled={defaults.disabled || undefined}
    >
      <input
        type='radio'
        id={defaults.id}
        name={defaults.name}
        value={defaults.value}
        checked={defaults.checked}
        disabled={defaults.disabled}
        required={defaults.required}
        onChange={handleChange}
        {...nativeProperties}
        className='radio__input'
      />
      <span className='radio__box'>
        {defaults.checked ? defaults.checkedIcon : defaults.icon}
      </span>
      {toLabelContent(defaults)}
    </label>
  );
}
```

**Removed:**
- `useRef` (no longer needed)
- `useLayoutEffect` (replaced by declarative `style`)
- `useMemo` (React Compiler handles this; `toSize` is pure and cheap)
- `isValidElement` import from root (moved to helpers)
- `clsx` import from root (moved to helpers)
- `_` (lodash) import from root (all lodash calls move to helpers)

**Kept:**
- `aria-disabled` on the `<label>` — accessibility requirement for disabled state

### Phase 5 — Tests hygiene

Add lifecycle hooks at the top of the outer `describe`:

```tsx
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

No test cases are added or removed. Existing assertions are preserved exactly.

### Phase 6 — Stories update

- Change import in `radio.stories.tsx`: `import Radio from '../radio'` → `import Radio from '../root'`
- Add a `play` function to the `States` story using `@storybook/test` `userEvent` and `within` to simulate clicking the "Checked" radio and asserting `toBeChecked()`.

## Architecture Decisions

- **Decision**: Use `style` object for CSS var injection, not `useLayoutEffect`
- **Rationale**: The `style` approach is declarative (renders are synchronous and predictable), avoids a DOM mutation side effect, and aligns with how every other component in this workspace does it. `useLayoutEffect` was the old pattern before the workspace standard was established.

- **Decision**: Move label shape normalization to `helpers.ts` as `toLabelContent` (text-field pattern); keep `children` priority in the caller.
  - **Rationale**: The single existing `toLabelContent` in this workspace (`text-field/helpers.tsx`) is a 6-line shape normalizer — it takes a `TextLike`, normalizes it to either a raw value or a `_.defaults`-merged `TextProperties`, and lets the caller wrap it in `Text.createFrom`. Mirroring that pattern keeps the helper focused, makes slot priority a 2-line ternary in `root.tsx`, and avoids re-implementing `Text.createFrom`'s dispatch logic (function / string / element / object) inside the radio helper.

- **Decision**: `toSize` returns `string | undefined`, not `number`
- **Rationale**: Matches the `Chip` helper contract. CSS custom properties are strings; returning a pre-formatted `'20px'` string eliminates the template literal concat at the call site and removes a source of inconsistency.

- **Decision**: Remove `useMemo` around `toSize`
- **Rationale**: `toSize` is a pure function with O(1) cost and a primitive input. The React Compiler optimizes this automatically. Manual `useMemo` for cheap computations adds noise and violates the "Compiler First" rule from the React skill.

## Data Flow

```
Properties (optional)
       │
       ▼
  toDefaults()          → DefaultedProperties (all fields guaranteed)
  toNativeProperties()  → NativeProperties (spread onto <input>)
       │
       ├──► toSize()        → '--radio-size-inject' CSS var
       ├──► toClasses()     → className string
       ├──► toLabelContent() → ReactNode (label slot)
       │
       ▼
  <label style={style} className={...} aria-disabled={...}>
    <input ... onChange={handleChange} {...nativeProperties} />
    <span className="radio__box">icon or checkedIcon</span>
    {labelContent}
  </label>
```

## Impact Analysis

- **Affected Files**:
  - `radio.tsx` (deleted via git mv → becomes `root.tsx`)
  - `helpers.tsx` (deleted via git mv → becomes `helpers.ts`)
  - `styles/state.css` (deleted via git mv → becomes `styles/states.css`)
  - `styles/index.css` (updated import)
  - `index.ts` (updated export path)
  - `__tests__/radio.test.tsx` (added lifecycle hooks)
  - `__stories__/radio.stories.tsx` (updated import + play function)

- **Dependencies**: No external dependency changes. `lodash`, `clsx`, `ts-pattern`, `react` all stay.
