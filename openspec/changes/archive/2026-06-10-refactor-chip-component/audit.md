# Audit: Refactor Chip Component to Match Checkbox Pattern

## The Censor's Review

As The Censor, I have reviewed the proposal, design, and specifications for ambiguity, hidden migrations, and "vibe coding" language. The change is small, mechanical, and well-bounded.

### Ambiguity Detection

- [x] **Requirements are clear and verifiable.** All 16 functional requirements (FR-CHIP-STRUCT-01..06, FR-CHIP-TYPES-01..03, FR-CHIP-IMPL-01..07, FR-CHIP-PARITY-01..03) are written as concrete, testable propositions. Each has at least one Given/When/Then acceptance criterion.
- [x] **No "Vibe Coding" language.** A grep across all three artifacts for prohibited words (`seamless`, `seamlessly`, `intuitive`, `intuitively`, `modern`, `best practice`, `cleaner`, `nice`) returns no matches in commitments about user-facing behavior. Where the word "cleaner" appears in `design.md`, it is qualified with "no casts" — a concrete technical reason, not a vague appeal to aesthetics.
- [x] **CSS variable names are pinned.** `--chip-color-inject`, `--chip-size-inject`, `--chip-border-radius-inject` are named explicitly in `FR-CHIP-PARITY-02` and verified by `FR-CHIP-IMPL-02`'s acceptance criterion. No "use the same as before" hand-waving.
- [x] **Test count is pinned.** FR-CHIP-PARITY-01 says "all 28 existing test cases pass." The number 28 is concrete and was verified by reading the actual test file (`chip/__test__/chip.test.tsx` has 28 `test(` invocations across the `Layout` and `Events` describe blocks).
- [x] **`aria-pressed={undefined}` behavior is explicit.** The proposal's risk #2 and FR-CHIP-IMPL-03 both call out that `aria-pressed` must be `undefined` (not `false`) when `selected` is falsy, to avoid React emitting `aria-pressed="false"`. This pre-empts a subtle regression.

### Scope Check

- [x] **Change is atomic and manageable.** 8 files affected (3 renames, 2 moves, 3 edits). No cross-component impact, no dependency changes, no public API breakage for any in-repo consumer.
- [x] **No hidden migrations.** The proposal's "Out of scope" section explicitly enumerates what is *not* being done: no CSS hex extraction, no `<button>` migration, no `useControllableState` adoption, no MD3 token wiring. Each is reserved for a follow-up change.
- [x] **Public API stability is asserted by invariant, not assumed.** Invariant #1 in `proposal.md` says the named export from `index.ts` and the `Properties` type must continue to resolve and behave identically. This is testable.
- [x] **Visual parity is asserted by invariant, not assumed.** Invariant #3 says the rendered DOM and computed styles for any given story must be byte-identical. This is verifiable via Storybook snapshot or by reading the same stories before and after.
- [x] **Context bounds are tight.** Only files inside `apps/ui/src/components/chip/**` and its `__stories__/` subdirectory are listed in `context_bounds`. No accidental scope creep into other components.
- [x] **No "while we're at it" additions.** The proposal does not propose adding features, fixing unrelated bugs, or refactoring `text/`'s `__test__/` directory. These are explicitly noted as separate follow-ups.

### Veto Status

- **Status**: **PASS**
- **Reasoning**: The change is a focused, well-bounded structural refactor with a clear verification path (existing 28 tests + visual parity). The most subtle risk — `aria-pressed` flipping from absent to `"false"` — has been caught and is pinned by FR-CHIP-IMPL-03. The decision to collapse the `ChipsProperties` union is justified in `design.md` (the union was non-discriminating in practice). No "vibe coding" detected.

### Notes for the implementer

1. When you move `chip.tsx` to `root.tsx`, double-check the `import { Icon } from '../icon'` line — it is still needed because the remove button uses `<Icon name='close' ... />`. Do not remove it during the cleanup pass.
2. The `index.css` `@import` for the renamed file is at line 4 (`@import './state.css';`). Update to `./states.css`.
3. The `__mocks__/` directory in `chip/` is currently empty. Leave it alone; it is not in the context bounds.
4. When implementing `toNativeAnchorProps`, model it on `toNativeProperties` in `checkbox/helpers.ts:48-51`. The `BASE_PROPERTY_KEYS` list there is a good starting point — extend it with chip-specific keys (`role`, `label`, `variant`, `radius`, `color`, `size`, `selected`, `disabled`, `icon`, `avatar`, `onClick`, `onRemove`, `onToggle`).
5. The `aria-pressed` undefined-or-true behavior is critical. The cleanest implementation is `aria-pressed={defaults.selected || undefined}`. Do **not** use `aria-pressed={defaults.selected}` alone — it would set `aria-pressed="false"` in the DOM, which is a regression.
