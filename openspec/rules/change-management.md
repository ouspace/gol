# Change Management Rules

## Governance Changes

A governance change includes modifications to:

- `openspec/roles/*`
- `.agent/workflows/*`
- `openspec/schemas/enterprise/templates/*`
- `openspec/rules/*`

## Required Actions

1. Update relevant changelog in impacted spec domain.
2. State migration impact (if any) for current in-flight work.
3. Re-run gate checklist for affected stage.

## Compatibility

- Prefer additive updates.
- If removing a rule/template/role section, document replacement path.
