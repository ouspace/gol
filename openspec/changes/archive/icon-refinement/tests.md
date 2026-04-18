# Tests: Icon Component Refinement

## The Justice's Verdict

### Failing Test Scenarios (RED)
1. **Scenario**: MD3 Weight Mapping
   - GIVEN: Icon with `weight="normal"`
   - WHEN: Rendered
   - THEN: `iconKey` should contain `400`, but currently contains `normal` if not correctly mapped.
   - **Result**: [EXPECTED FAILURE]

2. **Scenario**: SVG Scaling for Enums
   - GIVEN: Icon with `size="small"`
   - WHEN: Rendered
   - THEN: SVG `height`/`width` should be `100%`, but currently might be `undefined` or a specific pixel value.
   - **Result**: [EXPECTED FAILURE]

3. **Scenario**: Ref Forwarding
   - GIVEN: A callback ref passed to `Icon`
   - WHEN: Rendered
   - THEN: The callback should be called with the `<span>` element.
   - **Result**: [EXPECTED FAILURE]

### Test Implementation
- [ ] Test files: `apps/ui/src/components/icon/__tests__/root.test.tsx` (if it exists, update it).
- [ ] Verify failures.
