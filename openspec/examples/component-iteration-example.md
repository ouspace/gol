# Example: New Component Iteration (Switch)

## 1. Product Scope Agent

- Adds `FR-013`: system provides MD3 `Switch` component with checked/disabled states.
- Adds `NFR-007`: switch must be keyboard-operable and screen-reader clear.

## 2. Domain Agent

- Adds journey: learner toggles setting using switch control.

## 3. UX Accessibility Agent

- Defines states: default, checked, disabled, focus-visible.
- Defines expected keyboard behavior and ARIA semantics.

## 4. Architecture Agent

- Adds `switch` component contract and prop signatures.
- Adds ADR only if introducing new shared state pattern.

## 5. QA Traceability Agent

- Adds `AC-005` scenarios for switch behavior.
- Adds `TC-007` and maps `FR-013 -> TC-007` in traceability matrix.

## 6. Delivery Agent

- Adds iteration tasks and milestone target.
- Fails gate if traceability or tests are missing.
