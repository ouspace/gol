# OpenSpec Workspace Guide

This directory contains the AI-agent operating model and specs for this repository, strictly following the [OpenSpec framework specification](https://openspec.dev/).

## Canonical Locations

- **Source of Truth**: `openspec/specs/<domain>/spec.md`
- **Active Changes**: `openspec/changes/<change-name>/`
- **Custom Schemas**: `openspec/schemas/enterprise/`
- **Agent Roles**: `openspec/roles/`
- **Rules**: `openspec/rules/`
- **Tool-Specific Skills**: `.agent/skills/` (Antigravity standard)
- **Tool-Specific Workflows**: `.agent/workflows/` (Antigravity standard)

## Rules

1. Update system behavior by creating a change in `openspec/changes/`.
2. Delta specs in changes merge into `openspec/specs/` upon archival.
3. Every agent-driven change must follow the active schema (default: `enterprise`).
4. Project-level configuration is managed in `openspec/config.yaml`.

## Recommended Workflow

1. Propose a change: `/opsx:propose <name>` or manually create `openspec/changes/<name>/`.
2. Draft artifacts: Follow the `enterprise` schema (Proposal -> Specs -> Design -> Tasks).
3. Implement: Work through tasks in `tasks.md`.
4. Archive: Merge delta specs into the main `spec.md` files and move the change to `openspec/changes/archive/`.
