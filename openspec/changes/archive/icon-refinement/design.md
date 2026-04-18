# Design: Icon Component Refinement

## Technical Approach

### 1. Helper Logic Updates
- **Weight Mapping**: Ensure `toWeight` handles both the lookup for `iconKey` (numeric) and the CSS variable injection.
- **Size Validation**: Update `isSizeEnum` to include the full set of enums if any are missing.

### 2. Root Component Refactoring
- **React 19 Ref Handling**: Access `ref` as a standard prop. In React 19, `forwardRef` is no longer necessary as `ref` is passed like any other property.
- **SVG Dimensioning**: 
    - The `SvgXml` will always use `height="100%"` and `width="100%"`.
    - Visual sizing is exclusively controlled by the container `<span>` via CSS classes (enums) or `--icon-size-inject` (custom sizes).

## Architecture Decisions
- **Decision**: Access `ref` as a standard prop (React 19).
- **Rationale**: React 19 eliminates the need for `forwardRef` by allowing `ref` to be passed as a regular prop. This simplifies the component signature and resolves potential shadowing conflicts.
- **Decision**: Hardcode `100%` on `SvgXml` height/width.
- **Rationale**: Eliminates the "size conflict" by ensuring the SVG always fills its CSS-controlled container, regardless of how the size was specified (enum or custom).

## Impact Analysis
- **Affected Files**:
    - `apps/ui/src/components/icon/helpers.ts`
    - `apps/ui/src/components/icon/root.tsx`
    - `apps/ui/src/components/icon/types.ts`
- **Dependencies**: `react-native-svg` (specifically `SvgXml` behavior).
