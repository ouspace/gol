# Review Policy

## Mandatory Review Findings

A review must fail when:

- New behavior has no requirement ID.
- A requirement has no acceptance criteria.
- A test case has no linked requirement.
- A breaking contract change has no ADR.

## Severity Model

- P0: Blocks stage progression immediately.
- P1: Must be fixed in current iteration before approval.
- P2: Can proceed with tracked mitigation.

## Reviewer Output Format

- Finding
- Impacted artifacts
- Evidence (file + section)
- Required action
- Severity
