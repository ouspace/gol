# Modes

Apply Fluent CSS according to the project's rendering and styling environment.

## Plain CSS

Use expanded selectors while preserving the root concept.

```css
.card {}
.card.active {}
.card .button {}
```

## Nested CSS

Use root encapsulation with native CSS nesting or a build transform.

```css
.card {
    &.active {}

    .button {}
}
```

## Web Components / Shadow DOM

Use `:host` as the root and keep CSS variables as the public styling API.

```css
:host {
    background-color: var(--card-background-color, #ffffff);
}

:host(.active) {}
::slotted(.button) {}
```

## CMS Runtime

Inject variables through external theme files, scoped `<style>` blocks, or scoped inline variables.

```html
<style>
  [data-block="hero-card"] {
    --card-background-color: #282a36;
    --button-background-color: #bd93f9;
  }
</style>
```

Choose the mode that matches the current project. Do not introduce nesting, Shadow DOM, runtime style injection, or a new build transform unless the project already supports it or the user asks for it.
