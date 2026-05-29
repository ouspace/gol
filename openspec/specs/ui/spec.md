# ui Specification

## overview

### glossary
# Glossary

| Term | Definition | Source |
| --- | --- | --- |
| MD3 | Material Design 3 design system guidance for components, tokens, and interaction patterns. | Product direction |
| SDD | Spec-Driven Development: defining specifications before/alongside implementation. | Team practice |
| Storybook | Interactive component documentation and verification workspace. | Current toolchain |
| Contract | Formal API and behavior definition for a component. | `05-contracts/*` |
| Traceability | Mapping requirement IDs to tests and specs. | `06-quality/traceability-matrix.md` |


### problem-statement
# Problem Statement

## Context

Junior developers need practical guidance to learn modern frontend engineering while building a reusable UI system.

## Problem

Without a clear specification baseline, component implementation can drift from MD3 conventions, accessibility expectations, and consistent coding practices.

## Why Now

`apps/ui` already contains multiple component implementations. This is the right moment to formalize SDD artifacts before scaling to more components and pages.

## Success Impact

- Faster onboarding for Jr. Developers.
- Consistent, testable component behavior.
- Better alignment between design intent, implementation, and quality gates.


### scope
# Scope

## In Scope

- MD3-aligned foundational components in `apps/ui/src/components`.
- Component API contracts and behavior specs.
- Storybook and test-driven validation for component behavior.

## Out of Scope

- Backend API implementation.
- Production app feature flows beyond component-level training use cases.
- Native mobile deployment readiness.

## Dependencies

- React 19 / React Native Web stack.
- Nx workspace tooling.
- Storybook and Jest testing setup.

## Constraints

- Must preserve monorepo/Nx conventions.
- Must support training-first readability and maintainability.
- Must keep component APIs predictable and documented.


### success-metrics
# Success Metrics

## Product Metrics

- Storybook coverage: all shared UI components documented with at least one usage story.
- Component completion rate: planned MD3 core components implemented according to contract.

## UX Metrics

- Accessibility conformance target: WCAG 2.1 AA for keyboard and semantic behavior in component surfaces.
- State coverage: each component has documented default, disabled, and selected/checked states.

## Engineering Metrics

- Unit/component test pass rate: 100% on CI for `apps/ui`.
- Lint pass rate: 100% on CI for `apps/ui`.
- Traceability coverage: every active FR linked to at least one test case.


## requirements

### assumptions
# Assumptions

| ID | Assumption | Risk if Wrong | Validation Plan |
| --- | --- | --- | --- |
| A-001 |  |  |  |


### constraints
# Constraints

## Technical

- Must remain compatible with Nx workspace conventions and project structure.
- UI components must be typed with TypeScript and usable in web/react-native-web context.
- Existing component public props should avoid breaking changes without ADR.

## Business

- Primary audience is Jr. Developers; documentation clarity is a hard requirement.
- Implementation must prioritize learnability over over-optimization.

## Compliance

- Accessibility behavior must trend toward WCAG 2.1 AA component-level compliance.


### functional-requirements
# Functional Requirements

| ID | Requirement | Priority | Notes |
| --- | --- | --- | --- |
| FR-001 | The system must provide a reusable `Icon` component supporting MD symbol names, size, color, variant, weight, and rotation options. | Must | Implemented |
| FR-002 | The system must provide an MD3-style `Button` with variants `filled`, `elevated`, `tonal`, `outlined`, `text`. | Must | Implemented |
| FR-003 | `Button` must support icon, full width, selected state, link behavior (`href`), and layout options. | Must | Implemented |
| FR-004 | The system must provide a `Checkbox` supporting checked, unchecked, and indeterminate states. | Must | Implemented |
| FR-005 | `Checkbox` must support custom icons, label positions, custom color/size, and disabled behavior. | Must | Implemented |
| FR-006 | The system must provide a `Radio` component with label/content customization and native input attributes support. | Must | Implemented |
| FR-007 | The system must provide a `Chip` component with roles: `assist`, `filter`, `input`, `suggestion`. | Must | Implemented |
| FR-008 | `Chip` must support role-specific actions (`onClick`, `onToggle`, `onRemove`) and optional icon/avatar. | Must | Implemented |
| FR-009 | Every implemented component must have Storybook stories demonstrating key states and variants. | Must | Implemented |
| FR-010 | Every implemented component must have automated tests covering rendering and key interactions. | Must | Implemented |
| FR-011 | The app root should provide a training sandbox to exercise components in development. | Should | Partially implemented in `application/root.tsx` |
| FR-012 | A root provider/domain layer should expose reusable app-level state hooks for training scenarios. | Should | Not implemented yet (scaffold only) |
| FR-ICON-001 | The Icon component must map weight enums to standard Material Symbols range (100-700). | Must | Implemented |
| FR-ICON-002 | The Icon component must support all 7 levels of sizing enums (smallest to biggest). | Must | Implemented |
| FR-ICON-003 | The SVG element in Icon must always fill its container (100% width/height). | Must | Implemented |
| FR-ICON-004 | The Icon component must correctly handle the ref prop (React 19 standard). | Must | Implemented |
| FR-CHIP-STRUCT-01 | The Chip component must be authored as a default-exported pure function in `root.tsx` (not `chip.tsx`). | Must | Pending |
| FR-CHIP-STRUCT-02 | Helper functions must live in `helpers.ts` (not `helpers.tsx`). | Must | Pending |
| FR-CHIP-STRUCT-03 | The `index.ts` barrel must re-export the default from `./root` and the `Properties` type from `./types`. | Must | Pending |
| FR-CHIP-STRUCT-04 | Tests must live in `__tests__/chip.test.tsx` (plural), not `__test__/chip.test.tsx`. | Must | Pending |
| FR-CHIP-STRUCT-05 | The test file must import the component from `../index` (the public barrel), not `../chip` (the internal file). | Must | Pending |
| FR-CHIP-STRUCT-06 | The `styles/state.css` file must be renamed to `styles/states.css` (plural), and the `@import` in `styles/index.css` must be updated accordingly. | Must | Pending |
| FR-CHIP-TYPES-01 | A single `Properties` interface must be the only exported properties type. The `ChipsProperties` union and per-role variants (`AssistProperties`, `FilterProperties`, `InputProperties`, `SuggestionProperties`) must not exist. | Must | Pending |
| FR-CHIP-TYPES-02 | The helper `ExcludedProperties` type aliases must be removed. | Must | Pending |
| FR-CHIP-TYPES-03 | Props that are only meaningful for specific roles (`avatar` for `role="input"`, `onRemove` for `role="input"`, `onToggle` for `role="filter"`, `icon` for `role="suggestion"`) must carry a `@remarks` JSDoc tag documenting that they are silent no-ops for other roles. | Must | Pending |
| FR-CHIP-IMPL-01 | The component must not use `useLayoutEffect` to inject CSS variables or ARIA attributes. | Must | Pending |
| FR-CHIP-IMPL-02 | CSS custom properties (`--chip-size-inject`, `--chip-color-inject`, `--chip-border-radius-inject`) must be passed to the rendered element via the `style` prop as a single object, merged with any consumer-provided `style`. | Must | Pending |
| FR-CHIP-IMPL-03 | `aria-disabled` and `aria-pressed` must be passed as React props on the rendered element, not set via `setAttribute` in an effect. `aria-pressed` must be `undefined` when `selected` is falsy (so the attribute is omitted from the DOM). | Must | Pending |
| FR-CHIP-IMPL-04 | The component must not use `useMemo` for `size`/`color`/`radius` derivation. These values must be computed directly in the function body. | Must | Pending |
| FR-CHIP-IMPL-05 | The `ref` must be acquired as `properties?.ref ?? useRef<HTMLElement | null>(null)` and passed as a prop to the element, supporting React 19's ref-as-prop pattern. | Must | Pending |
| FR-CHIP-IMPL-06 | When `defaults.href` is present, the element rendered must be `<a>`; otherwise `<span>`. This is unchanged behavior. | Must | Pending |
| FR-CHIP-IMPL-07 | When rendering an `<a>`, only valid anchor HTML attributes may be spread onto it. A `toNativeAnchorProps` helper must be added to `helpers.ts` to filter out chip-specific keys. | Must | Pending |
| FR-CHIP-PARITY-01 | All 28 existing test cases in `chip.test.tsx` must pass without modification of their assertions. | Must | Pending |
| FR-CHIP-PARITY-02 | The CSS custom property names (`--chip-color-inject`, `--chip-size-inject`, `--chip-border-radius-inject`) must be preserved verbatim in the `style` object. | Must | Pending |
| FR-CHIP-PARITY-03 | The role-based behavior (which props are honored, which are silently ignored) must remain identical to the pre-refactor component. | Must | Pending |
| FR-GL-001 | The system must centralize all duplicate design token typings (color, size, CSS unit types) across Text, Chip, Radio, Checkbox, and TextField into a shared `tokens.ts` module. | Must | Pending |
| FR-GL-002 | The system must enforce Interface Segregation Principle on property definitions, strictly decoupling custom component settings from native HTML attributes and removing unsafe type casts (`as`) from TextField, Radio, and Checkbox rendering. | Must | Pending |


### non-functional-requirements
# Non-Functional Requirements

| ID | Category | Requirement | Target |
| --- | --- | --- | --- |
| NFR-001 | Accessibility | Interactive components expose semantic roles and disabled/selected states correctly. | WCAG 2.1 AA-aligned behavior on component surfaces |
| NFR-002 | Maintainability | Component APIs must be type-safe and documented through stories/tests. | TypeScript types + Storybook + Jest present per component |
| NFR-003 | Consistency | Visual styles should converge on MD3 tokens and states. | Shared token spec and CSS variables across components |
| NFR-004 | Testability | Unit/component tests should cover core rendering and events. | Green tests for icon/button/checkbox/radio/chip suites |
| NFR-005 | Performance | Basic interactions should remain responsive in Storybook and app sandbox. | No perceptible lag in local interaction testing |
| NFR-006 | Developer Experience | Jr. developers should be able to discover behavior from stories and typed props. | Storybook docs and strict prop contracts |


## domain

### domain-model
# Domain Model

## Primary Domain Concepts

- `TrainingComponent`: a teachable UI primitive with typed API, style contract, and tests.
- `ComponentVariant`: visual and behavioral mode (e.g., button variant, chip role).
- `ComponentState`: runtime state (disabled, selected, checked, indeterminate, etc.).
- `TrainingScenario`: story/test context that demonstrates expected behavior.

## Current Aggregates

- `UI Components`: `icon`, `button`, `checkbox`, `radio`, `chip`.
- `Application`: root sandbox that renders components for manual exploration.
- `Provider/Domain`: placeholder aggregate for future app-level state orchestration.

## Known Gaps

- User/domain entity modeling is minimal (`entities/user/user.ts` scaffold only).
- No feature-level pages/routes mapped yet.


### personas
# Personas

## Persona 1: Junior Developer (Primary)

- Role: Learner implementing UI components.
- Goal: Understand how MD3-inspired components are built, typed, and tested.
- Frustrations: Unclear standards, missing examples, inconsistent component behavior.
- Accessibility Needs: Clear labels, keyboard-friendly examples, readable documentation.

## Persona 2: Tech Mentor

- Role: Reviews implementations and coaching outcomes.
- Goal: Validate best practices in architecture, testing, and accessibility.
- Frustrations: Difficult-to-trace requirements and undocumented design decisions.
- Accessibility Needs: Structured artifacts and traceability for fast review.


### ubiquitous-language
# Ubiquitous Language

| Term | Meaning | Do Not Use Instead |
| --- | --- | --- |
| Training Component | Reusable UI unit used for frontend learning and best-practice implementation. | Widget, thing |
| Variant | Visual style option of a component (e.g., filled/outlined). | Type (ambiguous) |
| Role (Chip) | Behavioral mode that defines how chip interactions work. | Category |
| Contract | Typed props/events + behavior expectations of a component. | Informal API |
| Scenario | Acceptance behavior expressed in Given/When/Then form. | Random test note |


### user-journeys
# User Journeys

## Journey ID: J-001 - Learn Component Variants

- Persona: Junior Developer
- Trigger: Open Storybook and inspect component stories.
- Happy Path:
1. Open component story page.
2. Interact with variants and states.
3. Compare behavior with tests/spec contracts.
- Alternate Paths:
1. Inspect source test files when story behavior is unclear.
- Failure Paths:
1. Story missing for a required variant.
2. Behavior differs from tests/contracts.
- Exit Criteria:
1. Developer can explain props, states, and expected behavior.

## Journey ID: J-002 - Implement New MD3 Component

- Persona: Junior Developer
- Trigger: Assigned a new component task.
- Happy Path:
1. Define FR/NFR and component contract.
2. Implement component + styles.
3. Add stories and tests.
4. Update traceability matrix.
- Exit Criteria:
1. Contract, stories, tests, and SDD entries are complete.


## ux

### accessibility-spec
# Accessibility Specification

## Standards Target

- Component-level behavior aligned to WCAG 2.1 AA expectations for semantics and interaction.

## Current Implemented Accessibility

- Checkbox sets `aria-checked` and supports mixed state.
- Radio uses native input semantics and forwards native attributes.
- Chip exposes `aria-disabled` and `aria-pressed` where applicable.
- Button exposes `aria-pressed` when selected.

## Gaps to Close

- Formal keyboard interaction matrix per component.
- Focus-visible and contrast token audits against MD3 theme values.
- Storybook accessibility add-on checks per story.


### content-guidelines
# Content Guidelines

## Tone and Voice

- Educational, concise, and beginner-friendly.
- Explain intent, not just implementation details.

## UI Copy Rules

- Labels and examples should be explicit and instructional.
- Avoid cryptic abbreviations in learner-facing stories.

## Localization Notes

- Keep user-facing examples prepared for i18n extraction.
- Avoid hardcoding copy in reusable components where possible.


### design-tokens-spec
# Design Tokens Specification

Current status: component-level CSS variables exist, but a unified MD3 token dictionary is still pending.

## Current Local Token Patterns

- Button uses variant/layout/core CSS modules.
- Icon/Checkbox/Radio/Chip inject CSS custom properties from props.

## Required MD3 Token Baseline (Next Iteration)

### Color Tokens

- `--md-sys-color-primary`
- `--md-sys-color-on-primary`
- `--md-sys-color-surface`
- `--md-sys-color-on-surface`
- `--md-sys-color-outline`

### Typography Tokens

- `--md-sys-typescale-label-large`
- `--md-sys-typescale-body-medium`

### Shape and Spacing Tokens

- `--md-sys-shape-corner-full`
- `--md-sys-shape-corner-small`
- `--md-sys-spacing-1..N`

## Decision

All component style modules should progressively migrate to shared MD3 tokens to avoid per-component drift.


### information-architecture
# Information Architecture

## Current Route Map

| Route | Purpose | Entry Condition | Exit Condition |
| --- | --- | --- | --- |
| app root (`application/root.tsx`) | Local training sandbox for component trials | App started in local development | User exits app/session |
| Storybook UI (`ui:storybook`) | Component documentation and interactive exploration | Storybook dev server started | User exits Storybook |

## Navigation Rules

- Component discovery should happen first through Storybook categories.
- App root remains a simple sandbox until training pages are introduced.


### interaction-spec
# Interaction Specification

## Component Behavior Matrix

| Component | State | Trigger | Expected Behavior |
| --- | --- | --- | --- |
| Button | default | click/press | invokes click handler when enabled |
| Button | selected | prop `selected=true` | exposes selected style and `aria-pressed` |
| Checkbox | unchecked/checked | click input/label | toggles value and emits `onChange` payload |
| Checkbox | indeterminate | prop `value=null` | renders mixed state (`aria-checked=mixed`) |
| Radio | unchecked/checked | click input/label | sets checked state and emits `onChange` |
| Chip (filter) | selected toggle | click chip | calls `onToggle` with next selected state |
| Chip (filter selected) | `selected={true}` | render | exposes `aria-pressed="true"` |
| Chip (filter unselected) | `selected={false}` | render | `aria-pressed` is omitted from DOM |
| Chip (input) | removable | click remove icon | calls `onRemove` and stops propagation |
| Chip (input with avatar) | `avatar={...}` and `role="input"` | render | renders `<span class="chip__avatar">` with avatar content |
| Chip (disabled) | `disabled` | render | exposes `aria-disabled="true"` and `class="chip ... disabled"` |
| Chip (with href) | `href="/x"` | render | renders `<a>` with only valid anchor HTML attributes; chip-specific keys filtered by `toNativeAnchorProps` |
| Chip (without href) | no `href` | render | renders `<span>` |
| Chip (role-specific prop ignored) | `avatar={...}` with `role="suggestion"` | render | avatar is silently ignored (no `<span class="chip__avatar">`) |
| Icon | interactive | click icon | calls `onClick` when not disabled |

## Error and Guard Behavior

- Disabled components must not fire action handlers.
- Role-specific chip behavior should ignore unsupported handlers.
- Button warns in development when content is missing or invalid handler type is provided.


## architecture

### data-flow
# Data Flow

## Current Component Flow

1. Consumer passes typed props.
2. Component `helpers` normalize defaults.
3. Component injects classes/CSS variables.
4. UI interaction triggers callback with normalized payload.

## Current App Flow

- `application/root.tsx` renders demo content directly.
- No external API request flow is implemented.

## Next Flow Definition

- Introduce training scenario state in root provider.
- Add event instrumentation for learner actions.


### error-handling
# Error Handling

## Error Taxonomy

| Type | Source | User Message | Recovery |
| --- | --- | --- | --- |
| Invalid usage warning | Component guard (development mode) | Console guidance (e.g., missing content in button) | Update component usage in story/consumer |
| Disabled interaction | Component event guard | No action executed | Enable component or adjust expectations |
| Missing token inconsistency | Style layer | Visual mismatch | Align styles to shared MD3 tokens |

## Logging Rules

- Development-only warnings are acceptable for misuse detection.
- Avoid noisy logs in production component paths.


### frontend-architecture
# Frontend Architecture

## Current Structure

- `src/components/*`: reusable UI components with co-located `types`, `helpers`, `styles`, stories, and tests.
- `src/application/*`: app entry sandbox (`root.tsx`, `index.ts`).
- `src/themes/*`: global css imports/bootstrap.
- `src/contexts/root/*`: provider/action scaffolding (currently minimal).
- `src/entities/*`: domain scaffolding (currently minimal).

## Pattern in Use

- Headless-ish prop normalization via helper functions.
- CSS module folders by concern (`base`, `layout`, `state`, `variant`).
- Strong TS typing for component contracts.

## Architectural Gaps

- Provider/domain layer not integrated into component flows.
- No explicit route/page architecture for training modules yet.


### observability
# Observability

## Events to Track (Planned)

| Event | Trigger | Properties | Consumer |
| --- | --- | --- | --- |
| `training.component.rendered` | Component story or sandbox renders | componentName, variant, state | learning analytics (future) |
| `training.component.interacted` | Learner clicks/toggles/selects control | componentName, action, beforeState, afterState | learning analytics (future) |
| `training.exercise.completed` | Learner completes scenario checklist | scenarioId, duration, passStatus | mentor dashboard (future) |

## Dashboards

- No runtime analytics dashboard implemented yet.

## Alerts

- No production alerting required at current training-component stage.


### state-management
# State Management

## Current State Model

- Components are primarily controlled/uncontrolled via props.
- Local rendering state is minimal and delegated to host consumers.
- Root provider returns placeholder values and does not orchestrate shared state yet.

## Current Rules

- Interaction handlers emit next state through callback payloads.
- Disabled state blocks behavior execution.
- Visual state is derived from explicit props and CSS classes.

## Next State Work

- Define provider contract for shared training scenarios.
- Add controlled/uncontrolled guidelines per component in contracts.


## contracts

### api-contracts
# API Contracts

Current status: no external/network API contract is implemented in `apps/ui`.

## Present Contract Surface

- Internal API is component props + callback signatures.
- Storybook stories and tests act as executable behavior contracts.

## Future API Contract Placeholder

If training content or user progress is persisted, define:

- endpoint path and method
- request/response schema
- error behavior
- versioning strategy


### component-contracts
# Component Contracts

| Component | Contract Summary | Implemented Status |
| --- | --- | --- |
| Icon | `name`, `size`, `color`, `weight`, `variant`, `fill`, `rotated`, `disabled`, click callback | Implemented + tested |
| Button | variants (`filled/elevated/tonal/outlined/text`), icon, `fullWidth`, `selected`, `layout`, `href` | Implemented + tested |
| Checkbox | `value: boolean|null`, custom label modes, size/color/circular, custom icons, `onChange` payload | Implemented + tested |
| Radio | checked/disabled/required, label modes, native input attrs, custom icons, `onChange` payload | Implemented + tested |
| Chip | roles (`assist/filter/input/suggestion`), variant/color/radius/size, icon/avatar, role-specific actions; authored as default-exported pure function in `root.tsx`, types in `types.ts`, helpers in `helpers.ts`, styles in `styles/`; CSS variables injected via `style` prop (not `useLayoutEffect`); `aria-disabled`/`aria-pressed` as React props; ref-as-prop (React 19); `toNativeAnchorProps` helper for anchor rendering | Implemented + tested |

## Contract Rules

- Props must remain backward-compatible unless ADR approved.
- New component props require story + test updates.
- Role/state behavior must be explicit in tests.


### events-contracts
# Events Contracts

Current status: no cross-service domain event bus implemented.

## Internal UI Callback Contracts

| Event | Producer | Consumer | Payload Schema |
| --- | --- | --- | --- |
| `button.onClick` | Button | component consumer | `(event, native props)` |
| `checkbox.onChange` | Checkbox | component consumer | `(event, { ...props, value: boolean })` |
| `radio.onChange` | Radio | component consumer | `(event, { ...props, checked: boolean })` |
| `chip.onToggle` | Chip (role=filter) | component consumer | `(event, selected: boolean, props)` |
| `chip.onRemove` | Chip (role=input) | component consumer | `(event, props)` |
| `icon.onClick` | Icon | component consumer | `(event, normalizedProps)` |

## UI Analytics Events

- Planned in `04-architecture/observability.md`; not yet implemented.


## quality

### acceptance-criteria
# Acceptance Criteria

## Feature: MD3 Training Component Baseline

### Scenario AC-001 - Button Variants

Given the button component stories
When the learner renders each variant (`filled`, `elevated`, `tonal`, `outlined`, `text`)
Then the visual variant class must match the selected variant and interaction remains functional

### Scenario AC-002 - Tri-state Checkbox

Given a checkbox with `value=null`
When it is rendered
Then it must expose mixed semantics and indeterminate visual state

### Scenario AC-003 - Role-based Chip Behavior

Given chips of roles `assist`, `filter`, `input`, and `suggestion`
When the user interacts with each role
Then each chip must trigger only role-appropriate actions (`onClick`, `onToggle`, `onRemove`)

### Scenario AC-004 - Storybook + Test Enforcement

Given an implemented component in `src/components`
When the feature is considered complete
Then it must include at least one story and one automated test suite

### Scenario AC-GL-001-1 - Centralized Design Token Imports

Given the core components `Text`, `Chip`, `Radio`, `Checkbox`, `TextField`
When typings for CSS colors, units, or sizes are evaluated
Then they are strictly imported from `tokens.ts` without local duplicates.

### Scenario AC-GL-001-2 - TS Compilation Safety

Given the centralized type module
When executing `pnpm nx typecheck ui`
Then the compiler yields zero errors.

### Scenario AC-GL-002-1 - Strict Decoupled Types

Given helper utilities `toNativeProperties`
When called by components
Then it returns a strictly-typed `NativeProperties` object without manual type assertions.

### Scenario AC-GL-002-2 - Zero Unsafe Type Casts

Given components' JSX blocks
When destructuring native attributes (e.g. `{...nativeProperties}`)
Then no type casts (such as `as React.InputHTMLAttributes...`) are performed.

### Scenario AC-CHIP-STRUCT-01 - File Structure Alignment

Given the refactor is complete
When I list the contents of `apps/ui/src/components/chip/`
Then I see `root.tsx` and `helpers.ts` (no `chip.tsx`, no `helpers.tsx`)
And the `index.ts` barrel re-exports the default from `./root` and the `Properties` type from `./types`
And tests are located in `__tests__/chip.test.tsx` (plural), not `__test__/chip.test.tsx`
And the test file imports from `../index` (the public barrel), not `../chip`

### Scenario AC-CHIP-TYPES-01 - Single Properties Interface

Given the refactor is complete
When I grep `apps/ui/src/components/chip/types.ts` for `ChipsProperties`, `AssistProperties`, `FilterProperties`, `InputProperties`, `SuggestionProperties`, or `ExcludedProperties`
Then no matches are found
And role-specific props carry `@remarks` JSDoc tags documenting silent-no-op behavior for non-matching roles

### Scenario AC-CHIP-IMPL-01 - No useLayoutEffect or useMemo

Given the refactor is complete
When I grep `apps/ui/src/components/chip/root.tsx` for `useLayoutEffect` or `useMemo`
Then no matches are found

### Scenario AC-CHIP-IMPL-02 - CSS Custom Properties via style Prop

Given the refactor is complete
When I render `<Chip size="big" color="primary" />` and inspect the root element's inline style
Then I see `--chip-size-inject: 40px` and `--chip-color-inject: #3B82F6`

### Scenario AC-CHIP-IMPL-03 - ARIA Attributes as React Props

Given the refactor is complete
When I render `<Chip role="filter" selected={true} />` and inspect the root element
Then it has `aria-pressed="true"`
And when I render `<Chip role="filter" selected={false} />`
Then it does NOT have an `aria-pressed` attribute at all

### Scenario AC-CHIP-IMPL-04 - Ref as Prop (React 19)

Given the refactor is complete
When I render `<Chip ref={someRef} />`
Then `someRef.current` is the rendered element
And when I render `<Chip />` without a ref
Then the component still works (no crash from undefined ref)

### Scenario AC-CHIP-IMPL-05 - Anchor vs Span Rendering

Given the refactor is complete
When I render `<Chip href="/x" />`
Then the root element is an `<a>` with valid anchor HTML attributes only (chip-specific keys filtered out by `toNativeAnchorProps`)
And when I render `<Chip />` without href
Then the root element is a `<span>`

### Scenario AC-CHIP-PARITY-01 - Full Test Parity

Given the refactor is complete
When I run `nx test ui --testPathPattern=chip`
Then all 28 existing test cases pass with no assertion modifications
And the CSS custom property names are preserved verbatim
And role-based behavior remains identical to the pre-refactor component


### risk-register
# Risk Register

| ID | Risk | Probability | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- | --- |
| R-001 | MD3 token inconsistency across component style modules | Medium | High | Define shared token dictionary and migration checklist | UI team |
| R-002 | Accessibility regressions as component count grows | Medium | High | Add accessibility assertions to Storybook/tests | UI team |
| R-003 | Provider/domain remains disconnected from training flows | High | Medium | Define provider contract and first scenario implementation | App architecture owner |
| R-004 | Contract drift between stories and tests | Medium | Medium | Require traceability updates in PR checklist | Maintainers |


### test-cases
# Test Cases

| Test ID | Requirement IDs | Type | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-001 | FR-001 | Unit/Component | Icon component available | Render icon with rotation/weight combinations | Correct classes and css vars are applied |
| TC-002 | FR-002, FR-003 | Unit/Component | Button component available | Render each variant and click | Variant class and click behavior are correct |
| TC-003 | FR-004, FR-005 | Unit/Component | Checkbox component available | Render with `value=true/false/null`, click | Checked and mixed states behave correctly |
| TC-004 | FR-006 | Unit/Component | Radio component available | Render with native attributes and click | Input semantics and callback payload are correct |
| TC-005 | FR-007, FR-008 | Unit/Component | Chip component available | Interact by role (`assist/filter/input/suggestion`) | Role-specific actions fire correctly |
| TC-006 | FR-009 | Storybook | Storybook configured | Open component stories | All implemented components have discoverable stories |


### test-strategy
# Test Strategy

## Current Strategy (Implemented)

- Component tests use `@testing-library/react` + Jest.
- Coverage currently exists for: icon, button, checkbox, radio, chip.
- Storybook stories provide interactive verification for same components.

## Quality Gates

- Lint pass for `apps/ui`.
- Typecheck pass for `apps/ui`.
- Test pass for `apps/ui` component suites.
- Storybook build without errors.

## Gaps

- No automated accessibility assertions yet.
- No integration tests for root provider/domain scenarios yet.


### traceability-matrix
# Traceability Matrix

| Requirement ID | Spec Artifact | Contract | Test Cases | Status |
| --- | --- | --- | --- | --- |
| FR-001 | interaction-spec.md | component-contracts.md (Icon) | TC-001 | Implemented |
| FR-002 | interaction-spec.md | component-contracts.md (Button) | TC-002 | Implemented |
| FR-003 | interaction-spec.md | component-contracts.md (Button) | TC-002 | Implemented |
| FR-004 | interaction-spec.md | component-contracts.md (Checkbox) | TC-003 | Implemented |
| FR-005 | interaction-spec.md | component-contracts.md (Checkbox) | TC-003 | Implemented |
| FR-006 | interaction-spec.md | component-contracts.md (Radio) | TC-004 | Implemented |
| FR-007 | interaction-spec.md | component-contracts.md (Chip) | TC-005 | Implemented |
| FR-008 | interaction-spec.md | component-contracts.md (Chip) | TC-005 | Implemented |
| FR-009 | acceptance-criteria.md | component-contracts.md | TC-006 | Implemented |
| FR-010 | test-strategy.md | component-contracts.md | TC-001..TC-005 | Implemented |
| FR-011 | frontend-architecture.md | n/a | n/a | Partial |
| FR-012 | state-management.md | n/a | n/a | Not Started |
| FR-ICON-001 | interaction-spec.md | component-contracts.md (Icon) | TC-001 | Implemented |
| FR-ICON-002 | acceptance-criteria.md | component-contracts.md (Icon) | TC-001 | Implemented |
| FR-ICON-003 | interaction-spec.md | component-contracts.md (Icon) | TC-001 | Implemented |
| FR-ICON-004 | interaction-spec.md | component-contracts.md (Icon) | TC-001 | Implemented |
| FR-CHIP-STRUCT-01 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-STRUCT-02 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-STRUCT-03 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-STRUCT-04 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-STRUCT-05 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-STRUCT-06 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-TYPES-01 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-TYPES-02 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-TYPES-03 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-IMPL-01 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-IMPL-02 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-IMPL-03 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-IMPL-04 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-IMPL-05 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-IMPL-06 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-IMPL-07 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-PARITY-01 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-PARITY-02 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-CHIP-PARITY-03 | chip-component.md (delta) | component-contracts.md (Chip) | n/a | Pending |
| FR-GL-001 | design-tokens-spec.md | tokens.ts (types) | n/a | Pending |
| FR-GL-002 | component-contracts.md | component helpers / native properties | n/a | Pending |


## delivery

### change-log
# SDD Change Log

| Date | Artifact | Change | Author |
| --- | --- | --- | --- |
| 2026-04-25 | `.agents/specs/ui/*` | Replaced generic templates with implementation-aligned SDD for current UI component baseline | Codex |
| 2026-04-26 | `openspec/specs/ui/spec.md` | Formalized Icon component refinements (weight mapping, size support, SVG scaling, forwardRef) | Antigravity |
| 2026-05-29 | `openspec/specs/ui/spec.md` | Synced FR-GL-001 (unified token typings) and FR-GL-002 (ISP property normalization) from global-ui-refinement delta spec | Antigravity |
| 2026-06-10 | `openspec/specs/ui/spec.md` | Synced FR-CHIP-STRUCT-01..FR-CHIP-PARITY-03 (file structure, types, implementation, parity) from refactor-chip-component delta spec | Antigravity |


### definition-of-done
# Definition of Done

- Code mapped to requirements
- Tests mapped to acceptance criteria
- Traceability matrix updated
- No unresolved blocker risks


### definition-of-ready
# Definition of Ready

- Requirement IDs assigned
- Acceptance criteria drafted
- UX states documented
- Contracts drafted
- Risks logged


### implementation-plan
# Implementation Plan

## Work Breakdown

| Work Item | Related Specs | Owner | Estimate | Dependencies |
| --- | --- | --- | --- | --- |
| Finalize MD3 token dictionary and map existing components | design-tokens-spec.md | UI team | 1 sprint | Current CSS modules |
| Formalize accessibility keyboard/focus matrix | accessibility-spec.md | UI team | 1 sprint | Existing component contracts |
| Implement root provider state for training scenarios | state-management.md | App architecture owner | 1 sprint | context scaffolding |
| Add first page-level training flow using existing components | frontend-architecture.md | UI team | 1 sprint | provider state |
| Expand traceability and PR checklist automation | traceability-matrix.md | Maintainers | 0.5 sprint | stable requirement IDs |

## Iteration Plan

- Iteration 1: token alignment + accessibility matrix.
- Iteration 2: provider integration + first training scenario.


### milestones
# Milestones

| Milestone | Date | Exit Criteria |
| --- | --- | --- |
| SDD Baseline Updated | Completed | Existing implementation mapped to requirements/contracts/tests |
| MD3 Token Convergence | TBD | Shared token dictionary applied to all current components |
| Training Flow v1 | TBD | Root provider and one guided training page running end-to-end |
| Quality Gate Hardening | TBD | Accessibility assertions and traceability checklist enforced |


## decisions

### README
# Architecture Decisions

Store ADRs in `adrs/`.

Naming convention:

- `ADR-0001-title.md`
- `ADR-0002-title.md`


## ai-agents

### README
# UI Agent Layer (Reference Only)

This directory is intentionally minimal.

The canonical agent framework lives at repository root:

- Roles: `openspec/roles/*`
- Workflows: `.agent/workflows/*`
- Templates: `openspec/schemas/enterprise/templates/*`
- Examples: `openspec/examples/*`

Use this UI spec path for UI-specific SDD artifacts only (`openspec/specs/ui/*`).

## Why

Keeping one canonical framework avoids drift and makes behavior predictable across domains.

## Optional Check

If you temporarily create mirrors for portability, validate sync with:

```bash
openspec/scripts/check-agents-sync.sh
```


