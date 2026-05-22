---
name: react-component-standards
description: Enforces React 19 standards, functional purity, MD3 styling, and standardized project structure for all React components in this workspace.
---

# React Component Skill

This skill ensures all React development adheres to the workspace's high standards for performance, accessibility, and maintainability.

## ⚠️ Mandatory Directives

Before creating or modifying any React component, you **MUST**:
1.  **Consult the Rules**: Read [functional-components.md](./rules/functional-components.md) for the full specification.
2.  **Follow the Scaffold**: Adhere to the directory structure defined in the rules (index, root, types, etc.).
3.  **Target React 19**: Use the React 19 paradigm (no `forwardRef`, use `use` hook, etc.).
4.  **Ensure Purity**: Components must be pure functions with property normalization via `toDefaults`.

## 📂 Skill Organization

- **[rules/](./rules/)**: Detailed authoring guidelines.
- **[examples/](./examples/)**: Reference implementations.
- **[resources/](./resources/templates/base-component/)**: Shared templates and skeletons.

## 🚀 Usage

When the user asks to "create a component" or "refactor UI":
1.  Initialize the folder structure.
2.  Define types in `types.ts`.
3.  Implement the pure logic in `root.tsx` using the `toDefaults` pattern.
4.  Expose the component via `index.tsx`.
