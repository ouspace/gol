<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix Nx commands with `npx` so the workspace-local CLI is used (e.g., `npx nx build ui`, `npx nx test ui`)
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

<!-- Storybook configuration start-->
# Storybook MCP (UI components)

Requires Storybook running: `npx nx run ui:storybook` → MCP at `http://localhost:6006/mcp`.

- When building or changing UI that uses `@gol/ui` / design-system components, **invoke the `mcp-storybook` skill first** (same idea as `nx-generate` for scaffolding)
- You have access to the `mcp-storybook` MCP server and the `mcp-storybook` skill — both share the name `mcp-storybook`; the **server** provides tools, the **skill** is the playbook to orchestrate them. Use the skill, then its tools.
- **CRITICAL: Never hallucinate component properties.** Before using ANY property on a design-system component, check MCP docs (`list-all-documentation` → `get-documentation`)
- Only use properties that are documented or shown in example stories; if not documented, ask the user
- For CSF / story file conventions only (not design-system composition), use the `storybook` skill
- After story/component changes, call `preview-stories` and, when available, `run-story-tests`

Remember: a story name might not match a prop name — verify through documentation or example stories.

<!-- Storybook configuration end-->
