---
name: mcp-storybook
description: "USE WHEN building or editing UI with @gol/ui / design-system components. ALSO USE WHEN the agent might invent component props, or when composing screens from Button, TextField, Chip, Checkbox, Radio, Text, or Icon. INVOKE BEFORE writing JSX that uses those components. EXAMPLES: 'login form with TextField', 'what props does Chip have', 'build a settings card with @gol/ui', 'compose a form from the design system'."
---

# Storybook MCP — Design system via live docs

Playbook for using the Storybook MCP server (`mcp-storybook`) so agents **consult real component APIs** instead of guessing. Mirrors the nx-mcp pattern: MCP = truth; this skill = workflow.

Live props, stories, and examples always come from MCP tools — **never hardcode component APIs in this file**.

## Key principles

1. **MCP first** — Do not write `@gol/ui` JSX until you have checked docs for each component you will use.
2. **Never invent props** — Only use properties documented by MCP or shown in example stories. If missing, ask the user.
3. **Storybook must be running** — MCP is HTTP at `http://localhost:6006/mcp` (not stdio). No server → no reliable docs.
4. **One concept per new story** — Prefer focused stories; use `@summary` JSDoc; exclude noise with `tags: ['!manifest']` when needed.
5. **Hand off conventions** — CSF/file layout → `storybook` skill. Formal new components → `openspec-*` skills after MCP docs.

## When to stop and use another skill

| Need | Skill |
|---|---|
| Only start Storybook / CSF syntax / play functions | `storybook` |
| Nx targets, generate app/lib | `nx-workspace` / `nx-generate` |
| OpenSpec proposal for a new composite component | `openspec-propose` (after MCP docs on primitives) |

## Steps

### 1. Preflight — Storybook + MCP

```bash
npx nx run ui:storybook
```

- Expected: Storybook on **port 6006**, MCP at `http://localhost:6006/mcp`.
- Clients: server name **`mcp-storybook`** (see `opencode.json`, `.mcp.json`, `.cursor/mcp.json`, `.gemini/settings.json`).
- If MCP tools are unavailable, say so and use the fallback (step 6). Do not pretend you consulted live docs.

### 2. Discover components (once per task)

Call MCP:

- `list-all-documentation` (optionally `withStoryIds: true`)

Use returned ids only. Do not guess ids (e.g. slug may be `components-textfield`, not `text-field`).

### 3. Load docs before each component you use

For every design-system component in the task:

- `get-documentation` with that component `id`
- If you need a specific variant: `get-documentation-for-story` with `componentId` + `storyName`

Extract: prop names, types/enums, defaults, callback signatures, real story examples.

### 4. Before writing or changing stories

- `get-storybook-story-instructions` — follow current CSF/testing guidance from the server.

Then implement stories/components using only documented APIs. For file/CSF conventions of this repo, also follow the `storybook` skill.

### 5. Verify UI

After changes:

- `preview-stories` — include returned URLs for the user when available
- `run-story-tests` — **only if** it appears in the server tool list (may be missing depending on addon version/config)
- Passing project checks: `npx nx test ui` and `npx nx run ui:build-storybook`
- Do not use `ui:lint` or `ui:typecheck` as completion gates until their existing repository errors are fixed.

### 6. Fallback if MCP is down

1. Tell the user Storybook/MCP is unavailable.
2. Read source of truth on disk: `apps/ui/src/components/<name>/types.ts` and existing `__stories__/*`.
3. Still **do not invent** props. Prefer asking the user over guessing.

## Anti-patterns

- Using props from other libraries (`helperText`, `size="sm"`, `leftIcon=...`) without checking gol docs
- Skipping `list-all-documentation` / `get-documentation` because “you already know Button”
- Committing UI that imports components not verified against docs
- Duplicating long prop tables inside skills or AGENTS.md (they drift; MCP does not)
- Assuming `run-story-tests` or `display-review` exist — check tools first

## Manifest quality (when creating stories)

Aligned with Storybook AI best practices:

- One use case per story when possible
- JSDoc `@summary` on components and stories (why, not only what)
- `tags: ['!manifest']` for anti-patterns, layout demos, or agent-irrelevant stories

## Quick checklist

- [ ] Storybook up on :6006 (or user knows MCP is down)
- [ ] `list-all-documentation` done
- [ ] `get-documentation` for each DS component used
- [ ] No undocumented props
- [ ] Stories: instructions tool + `storybook` skill conventions
- [ ] Preview / tests when tools allow
