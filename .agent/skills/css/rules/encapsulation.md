# Encapsulation

Encapsulate module styles under a root noun. The root owns local composition, states, motion hooks, and variable consumption.

## Nested Form

Use this form when the project supports native CSS nesting or a build transform:

```css
.card {
    background-color: var(--card-background-color, var(--color-surface, #ffffff));
    border-radius: var(--card-border-radius, 12px);

    &.active {
        outline: var(--card-active-outline-width, 2px) solid var(--card-active-outline-color, currentColor);
    }

    .button {
        align-self: flex-end;
    }

    .text.title {
        margin-block-end: var(--card-title-margin-block-end, 0.5rem);
    }
}
```

## Expanded Fallback

Use expanded selectors when nesting is unsupported:

```css
.card {}
.card.active {}
.card .button {}
.card .text.title {}
```

## Shadow DOM

When Shadow DOM is introduced, keep the same variable contract and move the root boundary to `:host` when appropriate:

```css
:host {
    background-color: var(--card-background-color, var(--color-surface, #ffffff));
}

:host(.active) {}
::slotted(.button) {}
```

Custom properties can cross the Shadow DOM boundary from host or ancestor scope. Prefer variables for public styling APIs.
