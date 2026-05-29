# Spec: Defensive Props Ordering

## Requirement IDs

- FR-005: Native properties spread must occur before explicit props
- FR-006: Explicit props (`onChange`, `disabled`, `id`, `name`) must override native properties

## Objective

Move `{...nativeProperties}` spread operator before explicit props to prevent accidental overrides of critical props like `onChange`, `disabled`, `id`, and `name`.

## UX Behavior

No user-facing changes. Component behavior remains identical; this is a defensive improvement.

## Contracts Impacted

None. Props ordering is an implementation detail.

## Acceptance Criteria

**Given** a Checkbox component with `disabled={true}` and native `disabled={false}` passed via spread
**When** the component renders
**Then** the input element is disabled (explicit prop wins)

**Given** a Checkbox component with `onChange={handler}` and native `onChange={otherHandler}` passed via spread
**When** the user clicks the checkbox
**Then** `handler` is called (explicit prop wins)

**Given** a Checkbox component with `id="my-id"` and native `id="other-id"` passed via spread
**When** the component renders
**Then** the input element has `id="my-id"` (explicit prop wins)

**Given** the component implementation
**When** inspecting the JSX
**Then** `{...nativeProperties}` appears before explicit props like `onChange`, `disabled`, `id`, `name`

## Risks

- **Assumption**: No current consumers rely on native props overriding explicit props (unlikely, as this would be a bug)
- **Low Risk**: This is a defensive improvement; behavior only changes if there was a bug where native props were overriding explicit props
