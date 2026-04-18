# Tests: Fix Icon Compliance and Logic

## The Justice's Verdict

### Failing Test Scenarios (RED)

1. **Scenario: MD3 Weight Mapping**
   - **GIVEN**: Icon with `weight="normal"`.
   - **WHEN**: Checking `--icon-weight-inject` style.
   - **CURRENT RESULT**: `500` (Non-compliant).
   - **EXPECTED FAILURE**: Should fail when expecting `400`.

2. **Scenario: Size Enum "smallest"**
   - **GIVEN**: Icon with `size="smallest"`.
   - **WHEN**: Checking `isSizeEnum("smallest")`.
   - **CURRENT RESULT**: `false` (Bug).
   - **EXPECTED FAILURE**: Should fail when expecting `true`.

3. **Scenario: SVG Scaling**
   - **GIVEN**: Icon with `size="small"`.
   - **WHEN**: Checking `SvgXml` height/width props.
   - **CURRENT RESULT**: `undefined`.
   - **EXPECTED FAILURE**: Should fail when expecting `100%`.

### Test Implementation
- [ ] Update `apps/ui/src/components/icon/__tests__/index.tsx`.
- [ ] Verify existing tests fail with new MD3 expectations.
