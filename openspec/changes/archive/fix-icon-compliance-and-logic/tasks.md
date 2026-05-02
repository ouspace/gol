# Tasks: Fix Icon Compliance and Logic

## Implementation Checklist

### 1. Refactor Helpers
- [x] 1.1 Update `toWeight` mapping to MD3 range (100-700).
- [x] 1.2 Update `isSizeEnum` to support all 7 enum values.
- [x] 1.3 Fix `toSize` to handle enum strings if necessary.

### 2. Component Refactor
- [x] 2.1 Update `root.tsx` to pass `100%` dimensions to `SvgXml` for enums.
- [x] 2.2 Fix unsafe `ref` casting.

### 3. Verification
- [x] 3.1 Update unit tests in `__tests__/index.tsx`.
- [x] 3.2 Verify MD3 compliance in Storybook.

## The Ledger (State Machine)
| Agent | Action | Status | Hash / Detail |
| :--- | :--- | :--- | :--- |
| Blueprint | Draft Proposal | ✅ DONE | axiomatic-v1 |
| Blueprint | Draft Delta Specs| ✅ DONE | md3-alignment |
| Censor | Audit | ✅ PASS | clear-scope |
| Justice | Write Tests | ✅ DONE | red-scenarios |
| Blueprint | Design | ✅ DONE | refactor-plan |
| Mason | Implement | ✅ DONE | md3-fix |
