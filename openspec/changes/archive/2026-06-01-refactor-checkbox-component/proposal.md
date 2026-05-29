---
status: drafting
version: 1.0.0
context_bounds:
  - "apps/ui/src/components/checkbox/**/*"
invariants:
  - "All components must follow react-component-standards skill (React 19, pure functions, toDefaults pattern)"
  - "CSS must follow fluent-css skill (SMACSS organization, CSS variables for theming)"
  - "Tests must pass before and after refactoring"
  - "Public API (Properties type) must remain backward compatible"
---

# Proposal: Refactor Checkbox Component

## Intent

Refactor the Checkbox component to align with workspace standards defined in the `react-component-standards` skill and recommendations from previous PR reviews (memory #15, #18, #28). The current implementation uses imperative `useLayoutEffect` for CSS variable injection, has file naming inconsistencies, and lacks React 19 idioms like `useId()` for SSR-safe ID generation.

## Scope

**In Scope:**
- Replace imperative `useLayoutEffect` CSS injection with declarative `style` prop inline
- Rename `checkbox.tsx` → `root.tsx` and `helpers.tsx` → `helpers.ts` to match skill scaffolding
- Replace `Math.random()` ID generation with React 19's `useId()` hook
- Remove unnecessary `useMemo` (trust React Compiler per skill §7)
- Move `{...nativeProperties}` before explicit props to prevent override vulnerabilities
- Consolidate duplicate ripple CSS rules in `module.css`
- Add `aria-label` fallback for accessibility when no label is provided

**Out of Scope:**
- Adding uncontrolled component mode (no current use case)
- Compound Component pattern (component is atomic)
- Polymorphic component support (always renders `<input type="checkbox">`)
- Reducing lodash usage (trivial impact, consistent with codebase)
- CSS namespace changes (`--checkbox-*` → `--ui-checkbox-*`)

---

## Phase 2: Test & Storybook Coverage (Skills-Guided)

After completing the core refactoring, the component's test and story coverage must be strengthened using workspace skills.

### Storybook Interaction Tests (`storybook` skill — CSF 3.0 `play` functions)

**In Scope:**
- Add `play` functions to stories for interactive behavior verification (click, keyboard, disabled)
- Use `@storybook/test` (`userEvent`, `within`, `expect`, `step`) for Given/When/Then assertions
- Cover key interactions: toggle via click, toggle via keyboard, label click, disabled prevention

**Out of Scope:**
- Visual regression or screenshot testing
- Accessibility audit plugins (axe-storybook)

### Unit Test Expansion (`jest-unit-testing` skill)

**In Scope:**
- Add tests for features introduced in Phase 1: CSS variable injection, useId() fallback, aria-label fallback, React 19 ref passing, defensive props ordering
- Add unit tests for internal helpers: `toDefaults`, `toSize`, `toClasses`, `toNativeProperties`, `toLabelPosition`
- Apply AAA (Arrange-Act-Assert) pattern with visual separation
- Follow Osherove naming convention: `[UnitOfWork]_[StateUnderTest]_[ExpectedBehavior]`
- Use `jest.mocked()` for type-safe mock assertions where applicable

**Out of Scope:**
- Snapshot testing
- Integration or E2E tests
- Rewriting existing tests (maintain backward compatibility with existing BDD-style naming)

## Technical Approach

The refactoring follows the established pattern from the Button component example in the skill and applies cross-cutting recommendations from memory:

1. **Declarative CSS Variables**: Inject `--checkbox-size-inject` and `--checkbox-color-inject` via inline `style` prop instead of imperative DOM manipulation
2. **React 19 Idioms**: Use `useId()` for SSR-safe ID generation, eliminating the need for `generateId()` helper
3. **File Structure Alignment**: Rename files to match the skill's required scaffolding (`root.tsx`, `helpers.ts`)
4. **Defensive Props Ordering**: Move spread operator before explicit props to prevent accidental overrides
5. **CSS Consolidation**: Merge duplicate ripple pseudo-element rules using combined selectors

## Context Bounds

- `apps/ui/src/components/checkbox/checkbox.tsx` → `root.tsx`
- `apps/ui/src/components/checkbox/helpers.tsx` → `helpers.ts`
- `apps/ui/src/components/checkbox/index.ts`
- `apps/ui/src/components/checkbox/styles/module.css`
- `apps/ui/src/components/checkbox/__tests__/checkbox.test.tsx`

## Invariants

- All existing tests must pass without modification (except import path updates)
- The `Properties` type exported from `types.ts` must remain unchanged
- CSS variable names (`--checkbox-size-inject`, `--checkbox-color-inject`) must remain stable
- The component must continue to support controlled mode only (no internal state)
- The `onChange` callback signature `(event, properties)` must remain unchanged
