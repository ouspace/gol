# Source of Truth Policy

## Purpose

Prevent drift between duplicated role/workflow/template documents.

## Canonical Ownership

- Canonical framework files live in:
  - `.agents/roles`
  - `.agents/workflows`
  - `.agents/templates`
  - `.agents/examples`

## Spec-Level References

- Spec folders should reference canonical framework files.
- If spec-level copies exist for portability/context, they are mirrors and must stay aligned.

## Merge Rule

When conflicts occur, root canonical framework wins unless explicitly superseded by approved governance change.
