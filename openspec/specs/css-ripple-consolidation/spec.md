# Spec: CSS Ripple Consolidation

## Requirement IDs

- FR-007: Duplicate ripple pseudo-element rules must be consolidated
- FR-008: Visual behavior of ripple effect must remain unchanged

## Objective

Consolidate duplicate ripple `::before` pseudo-element rules in `module.css` to reduce duplication while maintaining identical visual behavior.

## UX Behavior

No visual changes. Ripple effect on hover and active states remains identical.

## Contracts Impacted

- `styles/module.css`: Refactor ripple rules

## Acceptance Criteria

**Given** a Checkbox component without custom icons
**When** the user hovers over the checkbox
**Then** the ripple effect appears with the same size, color, and animation as before

**Given** a Checkbox component with custom icons (`icon` and `checkedIcon` props)
**When** the user hovers over the checkbox
**Then** the ripple effect appears with the same size, color, and animation as before

**Given** a Checkbox component
**When** the user clicks and holds (active state)
**Then** the ripple effect scales and changes color as before

**Given** the `module.css` file
**When** inspecting the CSS
**Then** there is no duplicate `::before` pseudo-element rule with identical properties

## Risks

- **Assumption**: CSS specificity after consolidation matches current behavior (verify with visual regression tests)
- **Low Risk**: CSS refactoring with identical output; visual regression tests will catch any discrepancies
