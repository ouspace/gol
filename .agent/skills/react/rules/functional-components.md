# React Component Authoring Rules

All AI agents and developers must adhere to these standards when creating or updating React components in this workspace.

## 1. React 19 Paradigm

Every component must be authored for **React 19**.

- **Ref Handling**: Utilize the new `ref` as a property pattern, eliminating the need for `forwardRef`.
- **Resource Loading**: Leverage `use` for handling promises or context in a more declarative manner.
- **Compiler Optimization**: Write code optimized for the React Compiler (avoiding unnecessary manual `useMemo`/`useCallback` unless dealing with complex heavy computations or unstable references).

## 2. Functional Purity (Pure Function Pattern)

Components must behave as **Pure Functions**:

- **Determinism**: The same `properties` must always yield the same UI output.
- **No Side Effects**: The component body must not mutate external state or perform I/O. Side effects must be encapsulated within `useEffect` or event handlers.
- **Immutability**: Props and internal state must be treated as immutable.
- **State Management**: For components supporting dual modes (controlled/uncontrolled), use a consistent pattern (e.g., `useControllableState`) to ensure predictable behavior.

## 3. Standardized Scaffolding

Every component must follow this directory structure to ensure discoverability and maintainability:

```text
component-name/
├── index.tsx              # Public API (Exporting the component and types)
├── root.tsx               # MANDATORY: The Implementation (The Pure Function)
├── types.ts               # Component-specific interfaces and Enums
├── constants.ts           # (Optional) Shared constants and magic strings
├── helpers.ts             # Internal unit-specific utilities/logic (including toDefaults)
├── styles/                # Encapsulated styling
│   ├── index.css          # Scoped styles and MD3 token mappings
│   └── theme-vars.css     # (Optional) Component-specific theme overrides
├── __tests__/             # Unit and Integration tests
│   └── component.test.tsx
└── __stories__/           # Storybook documentation
    └── component.stories.tsx
```

### Implementation Standards (root.tsx)

- **Default Export**: Components must be exported as a default function directly.
- **Optional Properties**: The component function must accept an optional `properties` argument.
- **Defaults Normalization**: Use a `toDefaults` helper (from `helpers.ts`) at the beginning of the component to normalize properties and assign default values (e.g., using `_.noop` for events).

```tsx
// root.tsx example
import { toDefaults } from './helpers';
import { type Properties } from './types';

export default function MyComponent(properties?: Properties) {
    const defaults = toDefaults(properties);
    // ... logic using defaults
}
```

## 4. Injectable Styling via CSS Variables

Components must implement a "Themeable Interface" using CSS Custom Properties (Variables).

- **Mechanism**: Components must accept a `style` prop (or specialized theme prop) that injects CSS variables into the component's root element.
- **MD3 Integration**: Component-level variables MUST map to global MD3 tokens (e.g., `--ui-button-bg: var(--md-sys-color-primary)`).
- **Namespace**: All injected variables must follow a strict namespace (e.g., `--ui-button-bg`, `--ui-icon-size`).
- **Implementation Example**:
  ```tsx
  // root.tsx
  const style = {
    '--ui-comp-color': defaults.color,
    '--ui-comp-size': defaults.size
  } as React.CSSProperties;

  return <span style={style} className="ui-comp">...</span>;
  ```

## 5. Accessibility (A11y) Standards

- **Semantic HTML**: Prioritize native elements (`button`, `input`, `a`) to inherit default browser behaviors.
- **ARIA Roles**: Explicitly define roles and states (e.g., `aria-expanded`, `aria-checked`, `role="listbox"`) when building custom interactive patterns.
- **Focus Management**: All interactive elements must have a visible `:focus-visible` state and support full keyboard navigation (Tab, Enter, Space, Arrows).

## 6. TypeScript Strictness

- **No Prefixes**: Avoid component prefixes in type names (e.g., use `Properties` instead of `ButtonProperties`, `Option` instead of `DropdownOption`) as they are already scoped by the directory.
- **Optional Properties**: All fields in the `Properties` interface should be optional to ensure the component can be rendered with minimal configuration.
- **Explicit Exports**: Always export types as `Properties`, `Option`, etc., from `types.ts`.
- **Enums for Variants**: Use string literal unions or Enums for variants to ensure type safety and IDE autocomplete.
- **Ref Typing**: Use specific HTML element types for refs (e.g., `HTMLButtonElement`).

## 7. Performance & Optimization

- **Compiler First**: Rely on the React Compiler for automatic memoization.
- **Manual Memoization**: Only use `React.memo`, `useMemo`, or `useCallback` when interacting with third-party libraries that rely on stable references or for extremely heavy computations.
- **Heavy Logic**: Move complex data transformations and property normalization (like `toDefaults`) into `helpers.ts` to keep the component body clean and focused on rendering.
