# Design: Fix Icon Compliance and Logic

## Technical Approach
We will refactor the `helpers.ts` and `root.tsx` files to strictly align with MD3 and fix the discovered logic bugs.

## Architecture Decisions
- **Weight Mapping**: 
    - `lightest`: 100 | `light`: 200 | `lightless`: 300 | `normal`: 400 | `boldless`: 500 | `bold`: 600 | `boldest`: 700.
    - This shift ensures `normal` matches the MD3 standard of 400.
- **Size Enums**:
    - Update `isSizeEnum` to include `smallest`, `normal`, and `biggest`.
- **SVG Scaling**:
    - Update `root.tsx` to pass `100%` to `SvgXml` width/height when a size enum is detected, forcing the container to control sizing.

## Impact Analysis
- **Affected Files**:
    - `helpers.ts`: Core normalization logic.
    - `root.tsx`: Component structure and prop passing.
- **Dependencies**: No external dependencies changed.
