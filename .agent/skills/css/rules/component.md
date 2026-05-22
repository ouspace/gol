# Component

Define a component contract before writing or refactoring reusable or CMS-customizable CSS.

For a concrete artifact example, see [../resources/templates/contracts/icon.md](../resources/templates/contracts/icon.md).

## Template

```text
Component: icon
Root: .icon
Implementation mode: nested CSS
Children: none
States: .active, .disabled
Actions: .fade
Adverbs: .slowly

Theme variables:
### Theme Variables

### Spacing
- `--{noun}-padding-top`, `--{noun}-padding-bottom`, `--{noun}-padding-left`, `--{noun}-padding-right`
- `--{noun}-margin-top`, `--{noun}-margin-bottom`, `--{noun}-margin-left`, `--{noun}-margin-right`

### Borders
- `--{noun}-border-top`, `--{noun}-border-bottom`, `--{noun}-border-left`, `--{noun}-border-right`
- `--{noun}-border-radius`

### Decoration
- `--{noun}-background-color`
- `--{noun}-color`

### Layout
- `--{noun}-width`, `--{noun}-height`

## CMS Customization

- External theme files may set all theme variables.
- Database values may override variables at the site, page, block, or instance scope.
- Instance-level values should be scoped to the component root when possible.

## Restriction Policy

- Flexible by default.
- Restrict variables on demand when required by branding or security policies.

## Example CSS

```css
.{noun} {
    padding-block-start: var(--{noun}-padding-top, 0);
    padding-inline-start: var(--{noun}-padding-left, 0);
}
```
```

## Rules

- Use the contract as the source of truth for selectors and variables.
- Keep selector names aligned with the grammar rule.
- Keep public variables aligned with the customization rule.
- If a style is not part of the contract, keep it private to the component or leave it out.
- Update the contract when adding children, states, actions, adverbs, or public variables.
