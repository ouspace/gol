---
applyTo: '**'
---

You have access to the `mcp-storybook` MCP server and the `mcp-storybook` skill for the `@gol/ui` design system.

The MCP server exposes live, source-of-truth component docs at `http://localhost:6006/mcp` (Storybook must be running: `npx nx run ui:storybook`). The `mcp-storybook` skill is the playbook that orchestrates those tools. Follow these guidelines to avoid inventing component APIs.

# General Guidelines
- When building or editing `@gol/ui` (Button, TextField, Chip, Checkbox, Radio, Text, Icon), invoke the `mcp-storybook` skill first, never relying on memory of prop names
- If Storybook is not running, start it with `npx nx run ui:storybook` before using MCP tools

# UI Building Workflow
Use the MCP tools in this order:

- call `mcp-storybook_list-all-documentation` once to discover component and docs IDs (with `withStoryIds`)
- call `mcp-storybook_get-documentation` for each design-system component you will use
- call `mcp-storybook_get-documentation-for-story` to see specific variant usage if a story is relevant
- implement using only documented props; if a prop you need is not documented, ask the user
- call `mcp-storybook_preview-stories` after changes and include the returned URLs
- call `mcp-storybook_run-story-tests` to verify (focused runs while iterating, broad pass before handoff)

# Writing Stories Workflow
If you create or edit `.stories.tsx` files:

- call `mcp-storybook_get-storybook-story-instructions` first and treat it as the source of truth for CSF/testing conventions
- follow the repo's CSF conventions documented in the `storybook` skill
- use one concept per story, add a JSDoc `@summary` on component and story, and tag agent-irrelevant demos with `tags: ['!manifest']`

# Verification

- Do not report completion while story tests are failing; fix them first
- Run the passing project checks: `npx nx test ui` and `npx nx run ui:build-storybook`
- Do not use `ui:lint` or `ui:typecheck` as completion gates until their existing repository errors are fixed.

# Fallback

If the MCP server is unavailable, tell the user and read the source of truth on disk (`apps/ui/src/components/<name>/types.ts` and `__stories__/*`). Still do not invent props — prefer asking the user.
