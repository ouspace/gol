# Stage Gates

## Gate 1: Draft

Required:

- Problem statement and scope updated.
- Initial FR/NFR IDs assigned.
- At least one journey and acceptance scenario drafted.

Exit checks:

- No ambiguous requirement language ("maybe", "optional" without priority).
- Every FR has owner artifact.

## Gate 2: Review

Required:

- Domain and UX artifacts aligned to FR/NFR.
- Contract impact identified.

Exit checks:

- No unresolved contradictions between UX and architecture docs.
- Accessibility expectations are explicit.

## Gate 3: Approved

Required:

- Component/API contracts marked stable for current iteration.
- Test cases mapped to requirements.

Exit checks:

- Traceability matrix links FR/NFR -> spec -> test IDs.
- Risks logged with mitigation and owner.

## Gate 4: Implement

Required:

- Delivery plan references approved artifacts.

Exit checks:

- Any implementation delta is reflected in contract/ADR docs.

## Gate 5: Verify

Required:

- Tests executed and reported.
- Storybook/usage docs updated where relevant.

Exit checks:

- Traceability matrix status updated.
- DoD checklist complete.
