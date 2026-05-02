# Feature Spec: Icon Component Refinement

## Requirement IDs

- FR-ICON-001: MD3 Weight Mapping
- FR-ICON-002: Complete Size Enum Support
- FR-ICON-003: SVG Scaling Consistency
- FR-ICON-004: React 19 Ref Support

## Objective

Standardize the Icon component's behavior to match Material Design 3 specifications and improve implementation robustness.

## UX Behavior

- Icons should visually scale correctly according to the provided size enum or custom size.
- Icon "weight" (thickness) should correspond to the MD3 numeric scale (e.g., normal = 400).

## Contracts Impacted

- `Icon` component props (`weight`, `size`, `ref`).

## Acceptance Criteria

### Requirement: MD3 Weight Mapping
The component SHALL map weight enums to the standard Material Symbols range (100-700).

#### Scenario: Normal weight
- GIVEN an Icon with `weight="normal"`
- WHEN the component renders
- THEN the injected CSS variable `--icon-weight-inject` MUST be `400`
- AND the icon key MUST include `normal`

#### Scenario: Bold weight
- GIVEN an Icon with `weight="boldest"`
- WHEN the component renders
- THEN the injected CSS variable `--icon-weight-inject` MUST be `700`
- AND the icon key MUST include `boldest`

### Requirement: Complete Size Enum Support
The component SHALL support all 7 levels of sizing enums defined in the design system.

#### Scenario: Boundary enums
- GIVEN an Icon with `size="smallest"` or `size="biggest"`
- WHEN `isSizeEnum` is called
- THEN it MUST return `true`
- AND the corresponding CSS class MUST be applied to the `<span>`

### Requirement: SVG Scaling Consistency
The SVG element SHALL always fill its container (`100%` width/height) to ensure visual alignment is controlled by the parent `<span>`.

#### Scenario: Any sizing
- GIVEN an Icon with any `size` prop
- WHEN the `SvgXml` renders
- THEN the `height` and `width` attributes of the `SvgXml` MUST be `'100%'`.
- AND the container `<span>` MUST control the final dimensions via CSS.

### Requirement: React 19 Ref Support
The component SHALL correctly handle the `ref` prop as a standard property (React 19 standard).

#### Scenario: Standard or Callback ref
- GIVEN a `ref` passed to the Icon
- WHEN the component renders
- THEN the `ref` prop is accessed directly from the properties and passed to the underlying `<span>`.
