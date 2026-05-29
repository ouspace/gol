# Design: Global UI Code Architecture and Type-Safety Refinement

## Technical Approach

### 1. Shared Tokens Module (`apps/ui/src/types/tokens.ts`)
To eliminate duplicate code (violating DRY) and stabilize compile safety across core components, we consolidate all design token types under a single unified module:

```ts
// apps/ui/src/types/tokens.ts
export type RGB = `rgb(${string})`;
export type RGBA = `rgba(${string})`;
export type HEX = `#${string}`;
export type HSL = `hsl(${string})`;
export type HSLA = `hsla(${string})`;

export type EM = `${number}em`;
export type REM = `${number}rem`;
export type PX = `${number}px`;
export type PERCENT = `${number}%`;
export type VW = `${number}vw`;
export type VH = `${number}vh`;

export type CssUnit = EM | REM | PX | PERCENT | VW | VH;

export type ColorName =
  | 'orange' | 'yellow' | 'olive' | 'teal' | 'violet'
  | 'purple' | 'pink' | 'brown' | 'grey'
  | 'red' | 'green' | 'blue' | 'black';

export type CssColor = ColorName | RGB | RGBA | HEX | HSL | HSLA;

export type Color<T extends string = never> = [T] extends [never] ? CssColor : T | CssColor;
export type Size<T extends string = never> = [T] extends [never] ? number | CssUnit : T | number | CssUnit;
export type LineHeight<T extends string = never> = T | number | CssUnit;
export type LetterSpacing<T extends string = never> = T | CssUnit;
```

We update component-specific types files (`text/types.ts`, `chip/types.ts`, `radio/types.ts`, `checkbox/types.ts`, and `text-field/types.ts`) to import these types. This ensures immediate type stabilization in `TextField` by importing `Size` and `CssColor` from `tokens.ts`.

---

### 2. Interface Segregation and Safe Property Segregation Pattern
Currently, properties decoupling in `TextField`, `Radio` and `Checkbox` relies on unsafe double type casting in the render return block:

```tsx
// BEFORE (Unsafe type coercion violating compile-safety boundaries)
{...toNativeProperties(properties) as React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>}
```

We refactor components properties using the **Interface Segregation Principle (ISP)** and strict typed adapters:
*   Define a dedicated, clear `CustomProperties` type interface to hold only the component's unique configurations.
*   Segregate native HTML attributes cleanly using `NativeProperties = Omit<React.InputHTMLAttributes<HTMLInputElement>, ...>`.
*   Ensure that the `toNativeProperties` helper utilizes strict TS types checking, returning `NativeProperties` explicitly. This allows clean, safe destructuring in the JSX block (`{...nativeProperties}`) without any runtime type assertions or casts (`as`).

---

## Architectural Decisions

- **Decision**: Avoid all changes to CSS stylesheets, styling behaviors, and DOM layout effects.
- **Justification**: The scope is strictly limited to code-level design patterns, SOLID principles, and type-safety engineering.
- **Decision**: Restructure property interfaces using Interface Segregation (ISP).
- **Justification**: Decoupling custom parameters from native DOM attributes at compile-time prevents type pollution and removes unsafe type casting (`as`) from components' rendering path.

## Impact

- **Files modified**: 5 types files, 3 helper files, 3 React components.
- **New file**: `apps/ui/src/types/tokens.ts` (unifying design system typings).
- **Risk**: Low — public API signatures are unchanged.
