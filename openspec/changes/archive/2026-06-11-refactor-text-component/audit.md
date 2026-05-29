# Audit: Refactor Text Component

## The Censor: Ambiguity Scan

Reviewing `proposal.md`, `design.md`, and `specs/text-refactor.md` for ambiguities, contradictions, and items that could cause an implementing agent to deviate from intent.

---

### [FINDING-01] — `toSize('normal')` returns `undefined` — impact on CSS

**Location**: `design.md` Phase 3, AC-07 in specs

**Observation**: The design says `toSize('normal') → undefined`, meaning `--text-size-inject` is never set when `size='normal'`. This relies on the CSS bug fix (AC-10) to be correct. If the agent implements `toStyle` but skips the CSS bug fix, `normal` size produces no fallback.

**Resolution**: The tasks must enforce that Phase 5 (CSS bug fix) is completed BEFORE Phase 4 (root.tsx) is verified working. Explicitly note the dependency in tasks.md.

**Verdict**: DEPENDENCY — must be captured in task ordering.

---

### [FINDING-02] — `__test__` directory rename mechanism

**Location**: `design.md` Phase 1, AC-01 in specs

**Observation**: The directory rename from `__test__/` to `__tests__/` using `git mv` will fail if the agent tries `git mv __test__ __tests__` — git moves the directory contents but the OS treats the directory as a new entity. The correct command depends on whether it's a single-file directory.

**Resolution**: Since `__test__/` contains only `text.test.tsx`, the correct approach is:
```bash
git mv apps/ui/src/components/text/__test__/text.test.tsx \
       apps/ui/src/components/text/__tests__/text.test.tsx
rmdir apps/ui/src/components/text/__test__/
```
Not `git mv __test__ __tests__`. The tasks must specify this exact sequence.

**Verdict**: CLARIFICATION — add exact git mv commands to tasks.

---

### [FINDING-03] — `DefaultedProperties` Pick list vs `toDefaults` actual defaults

**Location**: `design.md` Phase 3, AC-09 in specs

**Observation**: The spec lists these as Required in the Pick: `'as' | 'size' | 'color' | 'align' | 'decoration' | 'italic' | 'transform' | 'wrap' | 'unselectable' | 'disabled' | 'className' | 'onClick'`.

Verifying against `toDefaults` in `helpers.ts`:
```ts
as: 'span'            ✅ has concrete default
size: 'normal'        ✅
color: 'black'        ✅
align: 'left'         ✅
decoration: 'none'    ✅
italic: false         ✅
transform: 'none'     ✅
wrap: true            ✅
unselectable: false   ✅
disabled: false       ✅
className: ''         ✅
onClick: _.noop       ✅
children: null        ❌ null is not a concrete value, correct to omit
content: null         ❌ correct to omit
scale: null           ❌ correct to omit
weight: null          ❌ correct to omit
lineHeight: null      ❌ correct to omit
letterSpacing: null   ❌ correct to omit
```

All 12 listed fields have concrete (non-null) defaults. The 6 omitted fields default to `null`. **The spec Pick list is correct.**

**Verdict**: PASS — no ambiguity.

---

### [FINDING-04] — `toStyle` signature uses `React.CSSProperties` in a `.ts` file

**Location**: `design.md` Phase 3

**Observation**: The design puts `toStyle` in `helpers.ts` (not `.tsx`). `React.CSSProperties` is a type from `@types/react`, available as a type import in any `.ts` file. However, the agent might be confused because `React.CSSProperties` typically appears in JSX-heavy files.

**Resolution**: Explicitly note that `React.CSSProperties` is a type-only import and works in `.ts` files. The import line in helpers.ts should be:
```ts
import type { CSSProperties } from 'react';
```
And the function return type: `: CSSProperties`.

**Verdict**: CLARIFICATION — specify the exact import syntax to avoid `.tsx` confusion.

---

### [FINDING-05] — `text.mdx` and `default.snippet.tsx` not mentioned

**Location**: `__stories__/` directory

**Observation**: There are two files in `__stories__/` not mentioned in the proposal or design:
- `text.mdx` — Storybook documentation page
- `default.snippet.tsx` — imports from `@gol/ui`, NOT from relative path

**Analysis**: Neither file imports `'../text'` directly (confirmed by grep). `default.snippet.tsx` uses `import { Text } from '@gol/ui'` which goes through the barrel. No changes needed in either file.

**Verdict**: PASS — explicitly document these files as untouched in tasks to avoid an agent incorrectly modifying them.

---

### [FINDING-06] — `Interactions` story `onClick` callback

**Location**: `design.md` Phase 7

**Observation**: The `Interactions` story uses `onClick={() => {}}` (empty callback). The `play` function checks that the element `toBeInTheDocument()` — which is trivially always true and doesn't actually test the click behavior.

**Resolution**: The `play` function should use a spy or check for a state change. Since stories don't easily use `jest.fn()`, the better approach is to use a visible state indicator (e.g. a `useState` counter). However, for a simple interaction verification, checking the element responds (doesn't throw, doesn't get disabled) is acceptable for stories. The spec doesn't require deep behavioral coverage in stories — that's for unit tests.

**Verdict**: ACCEPTABLE — stories verify presence and disabled state, unit tests cover the behavior. No change needed.

---

### [FINDING-07] — `toEventProperties` return type precision

**Location**: `design.md` Phase 3

**Observation**: `toEventProperties` returns `Omit<DefaultedProperties, 'onClick'>`. But the test in `text.test.tsx` currently asserts the callback receives an object that does NOT have `ref` and `key` (React internal props). The `_.omit(defaults, ['onClick'])` used to be inline — `defaults` here is already processed through `_.defaults`, so it won't contain React's `ref` or `key` unless passed explicitly. This is fine.

However, the existing test asserts the second argument to `onClick` has exactly these fields:
```ts
{ children: null, content: 'Click me', scale: null, as: 'span', size: 'normal',
  weight: null, color: 'black', lineHeight: null, align: 'left', letterSpacing: null,
  decoration: 'none', italic: false, transform: 'none', wrap: true,
  unselectable: false, disabled: false, className: '' }
```

After refactoring, `toEventProperties(defaults)` must produce exactly this object. The `DefaultedProperties` type guarantees all these fields are present. **No risk.**

**Verdict**: PASS — contract is preserved.

---

## Summary

| Finding | Status | Action Required |
|---------|--------|-----------------|
| FINDING-01 | DEPENDENCY | Phase 5 (CSS fix) must precede Phase 4 verification in tasks |
| FINDING-02 | CLARIFICATION | Add exact `git mv` + `rmdir` commands for directory rename |
| FINDING-03 | PASS | Pick list is correct |
| FINDING-04 | CLARIFICATION | Specify `import type { CSSProperties } from 'react'` in helpers.ts |
| FINDING-05 | PASS | Note `text.mdx` and `default.snippet.tsx` as untouched |
| FINDING-06 | ACCEPTABLE | Stories interaction coverage is sufficient |
| FINDING-07 | PASS | `toEventProperties` contract matches existing test assertion |

**Audit verdict: PASS with 2 clarifications and 1 dependency captured for tasks.**
