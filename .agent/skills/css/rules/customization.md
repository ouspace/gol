# Customization

CSS variables are the Fluent CSS customization contract. Components consume variables; themes, CMS data, and runtime overrides provide values.

## Naming

Use the pattern:

```text
--{noun}-{property-name}
```

Use full CSS property names. Do not abbreviate.

| Proper | Avoid |
| :--- | :--- |
| `--card-background-color` | `--card-bg` |
| `--button-border-radius` | `--btn-rad` |
| `--icon-font-size` | `--icon-sz` |

## Global Variable Minimalism

Global variables defined in `:root` should be minimalist and avoid redundant prefixes or suffixes.
- **No Prefixes**: Avoid `--global-` prefix. Global scope is implied by `:root`.
- **No Redundant Suffixes**: Properties intended to be responsive should not use suffixes like `-mobile` or `-base`. The baseline value is defined in `:root`, and overrides occur in media queries.

## Mobile-First Responsiveness

Follow a **Mobile-First** pattern for adaptive variables. Define the base value for mobile in `:root`, then override the *same variable name* in media queries for larger breakpoints.

```css
:root {
    --spacing: 1rem;      /* Mobile Baseline */
    --font-size: 1rem;
}

@media (min-width: 768px) {
    :root {
        --spacing: 1.5rem; /* Tablet Override */
        --font-size: 1.125rem;
    }
}

@media (min-width: 1200px) {
    :root {
        --spacing: 2rem;   /* Desktop Override */
        --font-size: 1.25rem;
    }
}
```

## Component Variables

CMS-ready components should expose a comprehensive customization surface. This allows external themes and CMS users to adjust all visual aspects of a component instance.

## Property Families

Every component should support the following standard variable families for granular control:

### Spacing (Padding & Margin)
- **Logical**: `--{noun}-padding-block-start`, `--{noun}-padding-block-end`, `--{noun}-padding-inline-start`, `--{noun}-padding-inline-end`.
- **Physical (CMS Support)**: `--{noun}-padding-top`, `--{noun}-padding-bottom`, `--{noun}-padding-left`, `--{noun}-padding-right`.

### Borders
- **Logical**: `--{noun}-border-block-start`, `--{noun}-border-block-end`, `--{noun}-border-inline-start`, `--{noun}-border-inline-end`.
- **Physical (CMS Support)**: `--{noun}-border-top`, `--{noun}-border-bottom`, `--{noun}-border-left`, `--{noun}-border-right`.
- **Radius**: `--{noun}-border-start-start-radius`, `--{noun}-border-start-end-radius`, `--{noun}-border-end-start-radius`, `--{noun}-border-end-end-radius`.

### Size & Layout
- **Dimensions**: `--{noun}-width`, `--{noun}-height`, `--{noun}-min-width`, `--{noun}-max-width`.
- **Flex/Grid**: `--{noun}-gap`, `--{noun}-align-self`, `--{noun}-justify-self`.

### Decoration
- **Background**: `--{noun}-background-color`, `--{noun}-background-image`, `--{noun}-background-size`.
- **Typography**: `--{noun}-color`, `--{noun}-font-family`, `--{noun}-font-size`, `--{noun}-font-weight`.

## Implementation Strategy

Map physical CMS variables to logical CSS properties to maintain internationalization support:

```css
.card {
    padding-block-start: var(--card-padding-top, var(--card-padding-block-start, 0));
    padding-inline-start: var(--card-padding-left, var(--card-padding-inline-start, 0));
}
```

## Strict Fallback Guidelines

To ensure components are "theme-ready" by default, component CSS must include safe fallbacks following a strict 3-tier hierarchy:

1. **Tier 1: Semantic Inheritance**: Prefer browser-native inheritance (`currentColor`, `transparent`, `inherit`, `100%`). This ensures the component adapts to its environment automatically.
2. **Tier 2: Global Design Tokens**: If explicit values are needed (e.g., solid backgrounds, specific brand colors), fall back to global tokens defined by the root themes (e.g., `var(--color-surface)`).
3. **Tier 3: Hardcoded Safety Nets**: Use raw values (`#ffffff`, `12px`) only as the absolute final fallback to prevent total failure if the global theme is missing.

```css
/* Good: Variable -> Semantic Inheritance */
.icon {
    color: var(--icon-color, currentColor);
    background-color: var(--icon-background-color, transparent);
}

/* Good: Variable -> Global Token -> Hardcoded Safety Net */
.card {
    background-color: var(--card-background-color, var(--color-surface, #ffffff));
    border-radius: var(--card-border-radius, var(--shape-corner-medium, 12px));
}
```
