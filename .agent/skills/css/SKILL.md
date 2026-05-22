---
name: fluent-css
description: Applies Fluent CSS, a framework-agnostic methodology where selectors follow English grammar, files are organized by responsibility, and CSS variables provide a customization contract for themes and CMS data.
---

# Fluent CSS

Use this skill when writing, reviewing, or refactoring CSS. Fluent CSS is a framework-agnostic styling methodology: selectors follow English grammar, files are organized by responsibility, and components expose a stable CSS variable API for themes, CMS data, and runtime overrides.

## Core Workflow

1. Inspect the existing CSS architecture, build tooling, token system, and naming conventions.
2. Choose the implementation mode: plain CSS, nested CSS, Shadow DOM, or CMS runtime.
3. Organize rules by responsibility: base, layout, module, state, animation, theme.
4. Name selectors with English grammar: nouns, adjectives, verbs, and occasional adverbs.
5. Encapsulate module styles under a root noun such as `.card`.
6. Define a component contract for reusable or CMS-customizable modules.
7. Expose CSS variables for the component's intended customization surface.
8. Keep component selectors stable; customize by setting variables in theme files, scoped styles, inline variables, or database-injected values.
9. Use MD3 as UI/UX design specification only. The implementation must be fully independent of MD3 runtime tokens or implementation details.

## Atomic Rules

Load only the rule files needed for the current task:

- [rules/grammar.md](./rules/grammar.md): selector naming with English grammar.
- [rules/responsibility.md](./rules/responsibility.md): file organization and CSS responsibilities.
- [rules/encapsulation.md](./rules/encapsulation.md): root scoping, nested CSS, expanded fallback, and Shadow DOM root mapping.
- [rules/customization.md](./rules/customization.md): CSS variable contracts and property-family variables.
- [rules/theming.md](./rules/theming.md): theme files, CMS/database variables, override precedence, and flexible restrictions.
- [rules/modes.md](./rules/modes.md): plain CSS, nested CSS, Shadow DOM, and CMS runtime modes.
- [rules/component.md](./rules/component.md): component contract template.

## Rule Loading Matrix

- Styling a component: grammar, responsibility, encapsulation, customization, component
- Adding CMS theming: customization, theming, component
- Supporting Shadow DOM: encapsulation, modes, customization
- Organizing files: responsibility
- Reviewing CSS: grammar, responsibility, encapsulation, customization

## Bundled References

- [examples/module-pattern.css](./examples/module-pattern.css): example module, state, theme, and variable pattern.
- [resources/templates/styles/](./resources/templates/styles/): starter component CSS structure for greenfield work.
- [resources/templates/themes/dracula-dark.css](./resources/templates/themes/dracula-dark.css): example external CMS theme file.
- [resources/templates/contracts/icon.md](./resources/templates/contracts/icon.md): example component contract artifact.

## When To Bend The Rules

Use Fluent CSS as a default, not as a reason to fight the project.

- Preserve mature local conventions when the project already uses CSS Modules, Tailwind, BEM, Angular style encapsulation, or a design system.
- Use a more explicit class name when plain grammar would be ambiguous or collide with existing styles.
- Allow compound names when they describe a real reusable concept better than nested composition, especially inside component-scoped CSS.
- Keep module-specific states near the module when that is clearer than placing them in `states.css`.
- Prefer project tokens over MD3-inspired values whenever both exist.
- Avoid deep composition selectors. If a selector needs more than two meaningful class parts, introduce a clearer module or variant.
- Do not expose variables for every possible CSS property by default. Expose variables for properties that are part of the module's CMS customization surface.
