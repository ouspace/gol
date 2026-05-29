# Chip Component — Delta Specification

## Requirement IDs

- FR-CHIP-STRUCT-01: The Chip component must be authored as a default-exported pure function in `root.tsx` (not `chip.tsx`).
- FR-CHIP-STRUCT-02: Helper functions must live in `helpers.ts` (not `helpers.tsx`).
- FR-CHIP-STRUCT-03: The `index.ts` barrel must re-export the default from `./root` and the `Properties` type from `./types`.
- FR-CHIP-STRUCT-04: Tests must live in `__tests__/chip.test.tsx` (plural), not `__test__/chip.test.tsx`.
- FR-CHIP-STRUCT-05: The test file must import the component from `../index` (the public barrel), not `../chip` (the internal file).
- FR-CHIP-STRUCT-06: The `styles/state.css` file must be renamed to `styles/states.css` (plural), and the `@import` in `styles/index.css` must be updated accordingly.
- FR-CHIP-TYPES-01: A single `Properties` interface must be the only exported properties type. The `ChipsProperties` union and per-role variants (`AssistProperties`, `FilterProperties`, `InputProperties`, `SuggestionProperties`) must not exist.
- FR-CHIP-TYPES-02: The helper `ExcludedProperties` type aliases must be removed.
- FR-CHIP-TYPES-03: Props that are only meaningful for specific roles (`avatar` for `role="input"`, `onRemove` for `role="input"`, `onToggle` for `role="filter"`, `icon` for `role="suggestion"`) must carry a `@remarks` JSDoc tag documenting that they are silent no-ops for other roles.
- FR-CHIP-IMPL-01: The component must not use `useLayoutEffect` to inject CSS variables or ARIA attributes.
- FR-CHIP-IMPL-02: CSS custom properties (`--chip-size-inject`, `--chip-color-inject`, `--chip-border-radius-inject`) must be passed to the rendered element via the `style` prop as a single object, merged with any consumer-provided `style`.
- FR-CHIP-IMPL-03: `aria-disabled` and `aria-pressed` must be passed as React props on the rendered element, not set via `setAttribute` in an effect. `aria-pressed` must be `undefined` when `selected` is falsy (so the attribute is omitted from the DOM).
- FR-CHIP-IMPL-04: The component must not use `useMemo` for `size`/`color`/`radius` derivation. These values must be computed directly in the function body.
- FR-CHIP-IMPL-05: The `ref` must be acquired as `properties?.ref ?? useRef<HTMLElement | null>(null)` and passed as a prop to the element, supporting React 19's ref-as-prop pattern.
- FR-CHIP-IMPL-06: When `defaults.href` is present, the element rendered must be `<a>`; otherwise `<span>`. This is unchanged behavior.
- FR-CHIP-IMPL-07: When rendering an `<a>`, only valid anchor HTML attributes may be spread onto it. A `toNativeAnchorProps` helper must be added to `helpers.ts` to filter out chip-specific keys.
- FR-CHIP-PARITY-01: All 28 existing test cases in `chip.test.tsx` must pass without modification of their assertions.
- FR-CHIP-PARITY-02: The CSS custom property names (`--chip-color-inject`, `--chip-size-inject`, `--chip-border-radius-inject`) must be preserved verbatim in the `style` object.
- FR-CHIP-PARITY-03: The role-based behavior (which props are honored, which are silently ignored) must remain identical to the pre-refactor component.

## Objective

Bring the `Chip` component's file structure, type system, and DOM-update mechanism into alignment with the conventions established by the recently-refactored `Checkbox` component, without altering public API, runtime behavior, or visual output.

## UX Behavior

There is no UX change. Every story in `apps/ui/src/components/chip/__stories__/chip.stories.tsx` must produce the same rendered output as before the refactor. Specifically:

- `Chip` default (assist, filled, no icon, no avatar): renders a `<span class="chip assist filled">` with text content. `aria-disabled` and `aria-pressed` are not set.
- `Chip` with `href`: renders an `<a class="chip assist filled" href="..." target="...">`.
- `Chip role="filter" selected={true}`: renders a span with `aria-pressed="true"`.
- `Chip role="input" avatar={...}`: renders a span with a `<span class="chip__avatar">` containing the avatar.
- `Chip role="input" onRemove={...}`: renders a span with a `<button class="chip__remove" aria-label="Remove">`.
- `Chip role="suggestion" icon={...}`: the icon is silently ignored (no `<span class="chip__icon">` rendered).
- `Chip disabled`: renders with `aria-disabled="true"` and `class="chip ... disabled"`.
- `Chip color="primary" size="big"`: the rendered root element's inline `style` must contain `--chip-color-inject: #3B82F6` and `--chip-size-inject: 40px`.

## Contracts Impacted

- **Public TypeScript API**: `Properties` (the union is removed; this is a breaking change for any consumer that explicitly named `ChipsProperties` or any of the per-role types). Per the proposal's invariants, no internal consumer in the workspace does so, so the impact is null in practice.
- **Public CSS contract**: `--chip-color-inject`, `--chip-size-inject`, `--chip-border-radius-inject`. Unchanged.
- **Component default export from `index.ts`**: still named `Chip`. Unchanged.
- **DOM structure**: identical (same elements, same classes, same attributes for the same inputs).

## Acceptance Criteria

### FR-CHIP-STRUCT-01 / FR-CHIP-STRUCT-02
- **Given** the refactor is complete
- **When** I list the contents of `apps/ui/src/components/chip/`
- **Then** I see `root.tsx` and `helpers.ts` (no `chip.tsx`, no `helpers.tsx`)

### FR-CHIP-STRUCT-03
- **Given** the refactor is complete
- **When** I read `apps/ui/src/components/chip/index.ts`
- **Then** it contains `export { default as Chip } from './root';` and `export type { Properties } from './types';`

### FR-CHIP-STRUCT-04
- **Given** the refactor is complete
- **When** I list the contents of `apps/ui/src/components/chip/__tests__/`
- **Then** I see `chip.test.tsx` (the test file)
- **And** the directory `apps/ui/src/components/chip/__test__/` does not exist

### FR-CHIP-STRUCT-05
- **Given** the refactor is complete
- **When** I read the first import line of `chip.test.tsx`
- **Then** it is `import { Chip } from '../index';` (not `import Chip from '../chip';`)

### FR-CHIP-STRUCT-06
- **Given** the refactor is complete
- **When** I read `apps/ui/src/components/chip/styles/index.css`
- **Then** it contains `@import url('./states.css');` (not `@import url('./state.css');`)
- **And** the file `styles/state.css` does not exist

### FR-CHIP-TYPES-01 / FR-CHIP-TYPES-02
- **Given** the refactor is complete
- **When** I grep `apps/ui/src/components/chip/types.ts` for `ChipsProperties`, `AssistProperties`, `FilterProperties`, `InputProperties`, `SuggestionProperties`, or `ExcludedProperties`
- **Then** no matches are found

### FR-CHIP-TYPES-03
- **Given** the refactor is complete
- **When** I read the JSDoc for `avatar`, `onRemove`, `onToggle` in `types.ts`
- **Then** each contains a `@remarks` tag explaining the silent-no-op behavior for non-matching roles

### FR-CHIP-IMPL-01
- **Given** the refactor is complete
- **When** I grep `apps/ui/src/components/chip/root.tsx` for `useLayoutEffect`
- **Then** no matches are found

### FR-CHIP-IMPL-02
- **Given** the refactor is complete
- **When** I render `<Chip size="big" color="primary" />` and inspect the root element's inline style
- **Then** I see `--chip-size-inject: 40px` and `--chip-color-inject: #3B82F6`
- **And** no other `--chip-*-inject` keys are present (radius is also injected for completeness, with the value derived from `defaults.radius`)

### FR-CHIP-IMPL-03
- **Given** the refactor is complete
- **When** I render `<Chip role="filter" selected={true} />` and inspect the root element
- **Then** it has `aria-pressed="true"`
- **And** when I render `<Chip role="filter" selected={false} />`
- **Then** it does NOT have an `aria-pressed` attribute at all

### FR-CHIP-IMPL-04
- **Given** the refactor is complete
- **When** I grep `apps/ui/src/components/chip/root.tsx` for `useMemo`
- **Then** no matches are found

### FR-CHIP-IMPL-05
- **Given** the refactor is complete
- **When** I render `<Chip ref={someRef} />`
- **Then** `someRef.current` is the rendered element
- **And** when I render `<Chip />` without a ref
- **Then** the component still works (no crash from undefined ref)

### FR-CHIP-IMPL-06
- **Given** the refactor is complete
- **When** I render `<Chip href="/x" />` and inspect the root element's tag
- **Then** it is an `<a>` with `href="/x"`
- **And** when I render `<Chip />` without href
- **Then** the root element is a `<span>`

### FR-CHIP-IMPL-07
- **Given** the refactor is complete
- **When** I render `<Chip href="/x" role="filter" onToggle={fn} />` and inspect the `<a>` element
- **Then** it does not have a `role` attribute (because `role` is filtered out by `toNativeAnchorProps`)
- **And** it does not have a custom `on*` attribute other than valid anchor attributes

### FR-CHIP-PARITY-01
- **Given** the refactor is complete
- **When** I run `nx test ui --testPathPattern=chip`
- **Then** all 28 existing test cases pass with no assertion modifications
- **And** the only change to the test file is the import line

### FR-CHIP-PARITY-02
- **Given** the refactor is complete
- **When** I render `<Chip color="red" size="small" radius="square" />`
- **Then** the inline style contains exactly the keys: `--chip-size-inject`, `--chip-color-inject`, `--chip-border-radius-inject`, plus any consumer-provided `style` keys

### FR-CHIP-PARITY-03
- **Given** the refactor is complete
- **When** I render `<Chip role="suggestion" avatar={...} />`
- **Then** no `<span class="chip__avatar">` is rendered (silent no-op, as before)
- **And** when I render `<Chip role="assist" icon={...} avatar={...} />`
- **Then** the avatar is silently ignored (avatar only renders when `role="input"`)

## Assumptions

- The workspace uses `clsx`, `lodash`, and `ts-pattern` as already-existing dependencies; no new install is required.
- The 28 existing tests accurately represent the desired behavior. No test changes (other than the import path) are needed.
- `chip.stories.tsx` stories render the same output before and after the refactor.
- The `react-component-standards` skill is the canonical reference for the convention this refactor aligns with.

## Open Questions / Risks

- **Q1**: Does any external consumer (outside this repo) import `ChipsProperties` or the per-role variant types? — *Risk: a breaking change for unknown consumers.* The proposal's invariants assert this is not the case inside the workspace; an out-of-workspace consumer is out of scope.
- **Q2**: Should `aria-pressed` be set for any role with `selected`, or only for `role ∈ {filter, input}`? — *Current behavior sets it for any role; the refactor preserves this.* A future accessibility-focused change can tighten this.
- **Q3**: Is the `__test__/` (singular) directory a deliberate convention in `text/` and `chip/` (currently), suggesting the team prefers singular? — *Checkbox uses `__tests__/` (plural) and the canonical skill template uses `__tests__/`. Aligning with checkbox+skill is the chosen direction.*
