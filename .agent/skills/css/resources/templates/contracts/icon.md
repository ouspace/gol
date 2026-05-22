# Icon Contract

Component: icon
Root: `.icon`
Implementation mode: nested CSS
Children: none
States: `.active`, `.disabled`
Actions: `.fade`
Adverbs: `.slowly`

## Theme Variables

### Spacing
- `--icon-padding-top`, `--icon-padding-bottom`, `--icon-padding-left`, `--icon-padding-right`
- `--icon-margin-top`, `--icon-margin-bottom`, `--icon-margin-left`, `--icon-margin-right`

### Dimensions
- `--icon-width`
- `--icon-height`

### Decoration
- `--icon-color`
- `--icon-background-color`
- `--icon-background-image`
- `--icon-background-size`
- `--icon-border-top`, `--icon-border-bottom`, `--icon-border-left`, `--icon-border-right`
- `--icon-border-radius`

### Motion
- `--icon-transition-duration`
- `--icon-transition-timing-function`

## CMS Customization

- External theme files may set all theme variables.
- Database values may override variables at the site, page, block, or instance scope.
- Instance-level values should be scoped to the component root when possible.

## Restriction Policy

- Flexible by default.
- Restrict `--icon-background-image` on demand to `none` or approved media-library URLs.

## Example CSS

```css
.icon {
    /* Dimensions */
    inline-size: var(--icon-width, 1.5rem);
    block-size: var(--icon-height, 1.5rem);
    
    /* Spacing (Mapping physical CMS vars to logical CSS) */
    padding-block-start: var(--icon-padding-top, 0);
    padding-block-end: var(--icon-padding-bottom, 0);
    padding-inline-start: var(--icon-padding-left, 0);
    padding-inline-end: var(--icon-padding-right, 0);
    
    margin-block-start: var(--icon-margin-top, 0);
    margin-block-end: var(--icon-margin-bottom, 0);
    margin-inline-start: var(--icon-margin-left, 0);
    margin-inline-end: var(--icon-margin-right, 0);

    /* Decoration */
    color: var(--icon-color, currentColor);
    background-color: var(--icon-background-color, transparent);
    background-image: var(--icon-background-image, none);
    background-size: var(--icon-background-size, contain);
    
    border-block-start: var(--icon-border-top, none);
    border-block-end: var(--icon-border-bottom, none);
    border-inline-start: var(--icon-border-left, none);
    border-inline-end: var(--icon-border-right, none);
    border-radius: var(--icon-border-radius, 0);

    &.fade {
        transition-duration: var(--icon-transition-duration, 0.2s);
        transition-timing-function: var(--icon-transition-timing-function, ease);
    }
}
```
