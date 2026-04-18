# Delta for Icon Component

## MODIFIED Requirements

### Requirement: MD3 Weight Mapping
The component SHALL map weight enums to the standard Material Symbols range (100-700).

#### Scenario: Normal weight
- GIVEN an Icon with `weight="normal"`
- WHEN the component renders
- THEN the injected CSS variable `--icon-weight-inject` MUST be `400`
- AND the icon key MUST include `400`

#### Scenario: Bold weight
- GIVEN an Icon with `weight="boldest"`
- WHEN the component renders
- THEN the injected CSS variable `--icon-weight-inject` MUST be `700`
- AND the icon key MUST include `700`

### Requirement: Complete Size Enum Support
The component SHALL support all 7 levels of sizing enums defined in the design system.

#### Scenario: Boundary enums
- GIVEN an Icon with `size="smallest"` or `size="biggest"`
- WHEN `isSizeEnum` is called
- THEN it MUST return `true`
- AND the corresponding CSS class MUST be applied to the `<span>`

### Requirement: SVG Scaling Consistency
The SVG element SHALL always fill its container to avoid alignment issues.

#### Scenario: Enum sizing
- GIVEN an Icon with `size="small"`
- WHEN the SVG renders
- THEN the `height` and `width` attributes of the `SvgXml` MUST be `100%` or match the container size
- AND the container `<span>` MUST control the final dimensions via CSS.

## ADDED Requirements

### Requirement: Ref Type Safety
The component SHALL handle both `RefObject` and `callback` refs safely.

#### Scenario: Standard ref
- GIVEN a `useRef` object passed to the Icon
- WHEN the component renders
- THEN the ref is attached to the `<span>` element without runtime casting errors.
