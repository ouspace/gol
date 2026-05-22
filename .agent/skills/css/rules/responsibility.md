# Responsibility

Organize CSS by responsibility. SMACSS categories are the starting point, but Fluent CSS uses responsibility as the durable mental model.

## Files

- `base.css`: element defaults and low-level resets.
- `layout.css`: page regions and large structural arrangement.
- `index.css`: reusable modules and composition.
- `states.css`: state and variant rules.
- `animations.css`: verbs, adverbs, keyframes, and motion timing.
- `variables.css`: shared tokens and defaults.
- `themes/*.css`: external theme values.

## Categories

### Base

Base rules define element defaults. They do not use class or ID selectors.

```css
html,
body {
    margin: 0;
}
```

### Layout

Layout rules divide the page into major regions and hold modules together.

```css
.main {}
.section {}
.sidebar {}
```

### Module

Modules are reusable pieces of UI that can move between layouts.

```css
.card {}
.button {}
.icon {}
```

### State

States and variants describe a condition.

```css
.card {
    &.active {}
}
```

Prefer accessible state hooks such as `[aria-expanded="true"]` or `[disabled]` when they already exist.

### Animation

Animation rules hold verbs, adverbs, keyframes, and motion-specific timing.

```css
.card {
    &.fade {}
    &.fade.slowly {}
}
```

### Theme

Theme rules define visual identity through CSS variables and design tokens.

```css
[data-theme="dracula-dark"] {
    --card-background-color: #282a36;
}
```
