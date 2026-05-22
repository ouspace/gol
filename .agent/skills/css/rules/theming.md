# Theming

Fluent CSS supports external theme files and CMS/database-provided variables.

## Sources

1. External theme files such as `themes/dracula-dark.css`.
2. Scoped `<style>` blocks.
3. Scoped inline variables.
4. Database-injected variables from CMS settings.

## Theme Files

Scope theme values to a theme selector:

```css
[data-theme="dracula-dark"] {
    --icon-background-color: #282a36;
    --icon-background-image: none;
    --icon-background-position: center;
    --icon-background-repeat: no-repeat;
    --icon-background-size: contain;
    --icon-color: #f8f8f2;
}
```

## Database Values

Scope database-injected variables as narrowly as possible:

```html
<span
  class="icon"
  style="--icon-background-color: #282a36; --icon-color: #ff79c6;"
></span>
```

## Precedence

Prefer this override order:

1. Component fallback values.
2. Global design tokens.
3. External theme file variables.
4. CMS/database variables scoped to a page, block, or component instance.

## Restrictions

Keep CMS variables flexible by default. Restrict values on demand when a project, tenant, component, property, or security context requires it.

```text
Flexible by default:
- --icon-background-color: any CSS color value
- --icon-background-size: any valid background-size value

Restricted on demand:
- --icon-background-image: none or approved media-library URLs only
- --button-font-family: approved font tokens only
```

When restrictions are enabled, define an allowlist for the affected variables and validate database-provided values before injection.

## MD3 Design System

MD3 is utilized as a UI/UX design specification only. The Fluent CSS implementation must remain fully independent of MD3 runtime tokens (e.g., `--md-sys-*`) or implementation details. Component variables and global tokens must be defined locally within the project's own variable contract.
