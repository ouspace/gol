# Grammar

Use English grammar to name Fluent CSS selectors.

## Class Roles

- **Nouns** are modules or structural objects: `.card`, `.button`, `.text`, `.icon`, `.header`, `.sidebar`, `.field`, `.dialog`.
- **Adjectives** are variants or conditions: `.primary`, `.active`, `.selected`, `.compact`, `.error`, `.disabled`.
- **Verbs** are actions or animations: `.fade`, `.collapse`, `.slide`.
- **Adverbs** modify verbs only when useful: `.slowly`, `.quickly`.

## Rules

- Avoid artificial prefixes and suffixes: `l-`, `m-`, `is-`, `has-`, `--`, `__`.
- Prefer composition over compound names.
- Avoid names such as `.card-title`, `.card__text`, `.button--primary`, or `.is-active`.
- Use a clearer explicit name when plain grammar would be ambiguous or collide with local styles.

```css
.button.primary {}
.card {
    .text.title {}
    &.active {}
}
```
