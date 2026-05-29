# Audit: Refactor Radio Component to Match Workspace Standard

## The Censor's Review

### Ambiguity Detection

- [x] Requirements are clear and verifiable.
- [x] No "Vibe Coding" language detected.

**Findings:**

1. **AC-10 is ambiguous** — "either `import Radio from '../root'` or `import { Radio } from '../index'` — either is acceptable". This creates a choice for the implementing agent where there should be a single answer. **Resolution**: Use `import Radio from '../root'` (default import, consistent with how stories import all other components in this workspace). The agent must not use `'../index'` to avoid confusion.

2. **`toLabelContent` import in root.tsx** — The design says `isValidElement` and `clsx` and `_` (lodash) move OUT of `root.tsx`, but does not explicitly state what `root.tsx` DOES import from helpers after the change. **Resolution**: Specified in the tasks — `root.tsx` must import `toLabelContent` from `'./helpers'`.

3. **`aria-disabled` moved to `<label>`** — The current code sets `aria-disabled` via `useLayoutEffect` on the `ref`. The design moves it to a JSX attribute. Both approaches are correct, but the migration must preserve the attribute semantics. The attribute value must be `true` (not the string `"true"`) when disabled, and absent when not disabled (`undefined`, not `false`). **Resolution**: Use `aria-disabled={defaults.disabled || undefined}` — consistent with the Chip pattern.

4. **`ref` prop** — The current `radio.tsx` has `const reference = useRef<HTMLLabelElement>(null)` but the component signature `Properties` extends `RefAttributes<HTMLLabelElement>`. After removing `useRef`, the `ref` from `properties` is ignored. This is a pre-existing limitation (ref was not forwarded in the original). The refactoring does NOT need to fix this — it is out of scope per the proposal's "Out of scope" section. **No change needed.**

### Scope Check

- [x] Change is atomic and manageable.
- [x] No hidden migrations or secondary changes.

**Findings:**

- The `toSize` return type change (number → string) is an internal contract change only. No consumer outside `root.tsx` calls `toSize` directly. Safe.
- The `styles/state.css` → `states.css` rename is a git mv + one import line change. Atomic.
- No changes to `types.ts`. Public API is frozen. Confirmed clean.

### Veto Status

- **Status**: PASS
- **Reasoning**: All requirements are concrete and machine-verifiable. Every acceptance criterion has a clear true/false outcome. No vague language. Scope is tightly bounded to the 7 files listed in `context_bounds`. No secondary changes detected.
