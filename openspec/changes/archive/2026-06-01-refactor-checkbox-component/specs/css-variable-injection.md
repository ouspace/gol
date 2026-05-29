# Spec: Declarative CSS Variable Injection

## Requirement IDs

- FR-001: CSS variables must be injected via inline `style` prop
- FR-002: Component must not use `useLayoutEffect` for CSS variable injection

## Objective

Replace imperative CSS variable injection using `useLayoutEffect` and `style.setProperty()` with declarative inline `style` prop, aligning with react-component-standards skill §4.

## UX Behavior

No visual or behavioral changes. CSS variables `--checkbox-size-inject` and `--checkbox-color-inject` continue to function identically.

## Contracts Impacted

None. CSS variable names remain stable.

## Acceptance Criteria

**Given** a Checkbox component with `size="big"` and `color="red"`
**When** the component renders
**Then** the root `<label>` element has `style="--checkbox-size-inject: 22px; --checkbox-color-inject: red"`

**Given** a Checkbox component with default props
**When** the component renders
**Then** the root `<label>` element has `style="--checkbox-size-inject: 18px; --checkbox-color-inject: blue"`

**Given** a Checkbox component
**When** inspecting the component implementation
**Then** there are no `useLayoutEffect` hooks that call `style.setProperty()`

## Risks

- **Assumption**: Inline `style` prop is SSR-safe (verified: React handles inline styles correctly during SSR)
- **Assumption**: CSS variables in inline styles have same specificity as `setProperty()` (verified: both apply to element's style attribute)
