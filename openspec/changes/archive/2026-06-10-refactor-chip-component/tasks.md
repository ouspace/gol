# Tasks: Refactor Chip Component to Match Checkbox Pattern

## Implementation Checklist

### 1. Filesystem scaffolding

- [x] 1.1 `git mv apps/ui/src/components/chip/chip.tsx apps/ui/src/components/chip/root.tsx`
- [x] 1.2 `git mv apps/ui/src/components/chip/helpers.tsx apps/ui/src/components/chip/helpers.ts`
- [x] 1.3 `git mv apps/ui/src/components/chip/__test__/chip.test.tsx apps/ui/src/components/chip/__tests__/chip.test.tsx`
- [x] 1.4 `rmdir apps/ui/src/components/chip/__test__`
- [x] 1.5 `git mv apps/ui/src/components/chip/styles/state.css apps/ui/src/components/chip/styles/states.css`

### 2. Index and stories wiring

- [x] 2.1 Edit `apps/ui/src/components/chip/index.ts`: replace `export { default as Chip } from './chip';` with `export { default as Chip } from './root';`. Keep the `export type { Properties } from './types';` line as-is.
- [x] 2.2 Edit `apps/ui/src/components/chip/styles/index.css`: change `@import './state.css';` to `@import './states.css';`.
- [x] 2.3 Edit `apps/ui/src/components/chip/__stories__/chip.stories.tsx`: change `import Chip from '../chip';` to `import { Chip } from '../index';` (or `import Chip from '../root';` — pick one and be consistent). Note: the existing stories use `import Chip from '../chip';` (default import); the public barrel now does `export { default as Chip } from './root';` (named export of the default). The story must use `import { Chip } from '../index';` to match the public API.

### 3. Types simplification (`apps/ui/src/components/chip/types.ts`)

- [x] 3.1 Delete the four `*ExcludedProperties` type aliases (lines 5-8).
- [x] 3.2 Delete the four per-role `*Properties` interfaces (`AssistProperties`, `FilterProperties`, `InputProperties`, `SuggestionProperties`, lines 187-212).
- [x] 3.3 Delete the `ChipsProperties` union (line 217).
- [x] 3.4 Add a `@remarks` JSDoc tag to the `avatar` prop explaining it is only rendered for `role="input"`.
- [x] 3.5 Add a `@remarks` JSDoc tag to the `onRemove` prop explaining it is only fired for `role="input"`.
- [x] 3.6 Add a `@remarks` JSDoc tag to the `onToggle` prop explaining it is only fired for `role="filter"`.
- [x] 3.7 Add a `@remarks` JSDoc tag to the `icon` prop explaining it is silently ignored for `role="suggestion"`.

### 4. Helpers (`apps/ui/src/components/chip/helpers.ts`)

- [x] 4.1 Add an explicit `DefaultedProperties` type alias (mirror `checkbox/helpers.ts:26-27`):
  ```ts
  export type DefaultedProperties = Properties &
    Required<Pick<Properties,
      'role' | 'children' | 'label' | 'color' | 'variant' | 'size' | 'radius' |
      'icon' | 'avatar' | 'href' | 'target' | 'selected' | 'disabled' |
      'className' | 'onClick' | 'onRemove' | 'onToggle'
    >>;
  ```
- [x] 4.2 Update `toDefaults`'s return-type cast to `as DefaultedProperties` (replace the current `as Required<Properties>`).
- [x] 4.3 Update `toClasses`, `toRadius`, `toColor`, `toSize` signatures to use `DefaultedProperties` in place of `Required<Properties>`.
- [x] 4.4 Add a `toNativeAnchorProps(properties?: Properties)` helper that returns `_.omit(properties, [...])` over a `BASE_PROPERTY_KEYS` array containing: `role`, `children`, `label`, `color`, `variant`, `size`, `radius`, `icon`, `avatar`, `selected`, `disabled`, `className`, `style`, `onClick`, `onRemove`, `onToggle`, `ref`, `key`. Anchor-specific keys (`href`, `target`) must be retained.
- [x] 4.5 Add a `NativeAnchorProperties` type alias as `Omit<Properties, ...>` for the keys omitted, intersected with `React.AnchorHTMLAttributes<HTMLAnchorElement>` — used by the `root.tsx` JSX spread.

### 5. Root component (`apps/ui/src/components/chip/root.tsx`)

- [x] 5.1 Remove imports: `useRef`, `useLayoutEffect`, `useMemo`. Keep only `useRef` (for the ref fallback) and `isValidElement` (for the label branch).
- [x] 5.2 Add import of `toNativeAnchorProps`, `NativeAnchorProperties`, `DefaultedProperties` from `./helpers`.
- [x] 5.3 Change the function signature: `export default function Chip(properties?: Properties)` (drop `ChipsProperties`).
- [x] 5.4 Compute `size = toSize(defaults)`, `color = toColor(defaults)`, `radius = toRadius(defaults)` directly (no `useMemo`).
- [x] 5.5 Compute `const ref = properties?.ref ?? useRef<HTMLElement | null>(null)`.
- [x] 5.6 Build the `style` object: `{ '--chip-size-inject': \`${size}px\`, '--chip-color-inject': color, '--chip-border-radius-inject': radius, ...properties?.style } as React.CSSProperties`.
- [x] 5.7 Delete the `useLayoutEffect` block.
- [x] 5.8 Replace the `<Element ref={callbackRef} ...>` opening tag with a branched JSX:
  ```tsx
  return defaults.href ? (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={defaults.href}
      target={defaults.target}
      style={style}
      className={toClasses(defaults)}
      aria-disabled={defaults.disabled || undefined}
      aria-pressed={defaults.selected || undefined}
      onClick={...}
      {...toNativeAnchorProps(properties)}
    >
      {/* children */}
    </a>
  ) : (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      style={style}
      className={toClasses(defaults)}
      aria-disabled={defaults.disabled || undefined}
      aria-pressed={defaults.selected || undefined}
      onClick={...}
    >
      {/* children */}
    </span>
  );
  ```
- [x] 5.9 Inside the `onClick` handler, preserve the existing logic: if `disabled`, return; if `role === 'filter'` and `onToggle !== _.noop`, call `onToggle(event, !selected, defaults)`; else call `onClick(event, defaults)`.
- [x] 5.10 Preserve the icon/avatar/remove button sub-rendering as-is. The `Icon` import is still needed for the remove button.

### 6. Tests (`apps/ui/src/components/chip/__tests__/chip.test.tsx`)

- [x] 6.1 Change the import line: `import Chip from '../chip';` → `import { Chip } from '../index';`.
- [x] 6.2 Append a new `describe('Structural contracts (refactor)')` block with 10 tests, one per scenario B-1..B-10 from `tests.md`. Use Node's `fs` and `path` to assert file existence; use `render` and `screen` for the runtime assertions in B-9 and B-10.
- [x] 6.3 Do not modify any of the 35 pre-existing test assertions.

### 7. Verification

- [x] 7.1 Run `pnpm nx test ui --testPathPattern=chip` (or `nx test ui --testPathPattern=chip` depending on the package manager) and confirm all 45 tests (35 pre-existing + 10 new structural) pass.
- [x] 7.2 Run `pnpm nx lint ui` and confirm zero new lint errors.
- [x] 7.3 Run `pnpm nx build ui` (or typecheck) and confirm no TypeScript errors.
- [ ] 7.4 Run `pnpm nx storybook ui` and click through the existing `chip.stories.tsx` stories; confirm the rendered DOM matches the pre-refactor baseline.
- [x] 7.5 Spot-check the public API: in any consumer file, the import `import { Chip } from '@gol/ui/components/chip'` (or the workspace path) must still resolve and TypeScript must accept `Properties` as a type-only import.

### 8. Cleanup

- [x] 8.1 Verify the `__mocks__/` directory in `chip/` is unchanged (it was empty pre-refactor and should remain so).
- [x] 8.2 `git status` should show the rename, the move, the import edits, the test import change, the styles rename, and the index.css update — and nothing else.
- [x] 8.3 No `package.json` or `tsconfig.json` changes.

---

## The Ledger (State Machine)

| Agent | Action | Status | Hash / Detail |
| :--- | :--- | :--- | :--- |
| Blueprint | Draft Proposal | DONE | `proposal.md` — 5 invariants, 8 context-bound files, 3 explicit non-goals |
| Blueprint | Draft Specs | DONE | `specs/chip-component.md` — 16 functional requirements, 17 acceptance criteria in Given/When/Then |
| Blueprint | Draft Design | DONE | `design.md` — 4 mechanical passes, 4 architecture decisions with rationale, mermaid data flow, 4 risks identified |
| Censor | Audit | DONE | `audit.md` — PASS, 5 ambiguity checks, 6 scope checks, 5 implementation notes |
| Justice | Write Tests | DONE | `tests.md` — 10 new structural tests (RED against pre-refactor) + 35 pre-existing behavioral tests (must remain GREEN) |
| Mason | Implement | PENDING | Awaiting `/opsx-apply` invocation. Task list 1-8 above. |
