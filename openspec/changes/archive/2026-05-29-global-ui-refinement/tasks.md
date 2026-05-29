# Tasks: Global UI Code Architecture and Type-Safety Refinement

## Implementation Checklist

### Phase 1: Shared Token Module & Types Centralization (FR-GL-001)
- [x] 1.1 Create `apps/ui/src/types/tokens.ts` with all shared types (ColorName, Color<>, Size<>, CssUnit, etc.)
- [x] 1.2 Refactor `text/types.ts` — import types from `tokens.ts` and delete duplicate definitions
- [x] 1.3 Refactor `chip/types.ts` — import types from `tokens.ts` and delete duplicate definitions
- [x] 1.4 Refactor `radio/types.ts` — import types from `tokens.ts` and delete duplicate definitions
- [x] 1.5 Refactor `checkbox/types.ts` — import types from `tokens.ts` and delete duplicate definitions
- [x] 1.6 Fix missing types `Size` and `CssColor` imports in `text-field/types.ts`

### Phase 2: Property Normalization & Interface Segregation (FR-GL-002)
- [x] 2.1 Refactor properties segregation in `text-field/types.ts` to strictly decouple Custom and Native properties
- [x] 2.2 Refactor properties segregation in `radio/types.ts` to strictly decouple Custom and Native properties
- [x] 2.3 Refactor properties segregation in `checkbox/types.ts` to strictly decouple Custom and Native properties
- [x] 2.4 Update helper utilities (`toNativeProperties` in text-field, radio, checkbox) to return strictly-typed interface objects
- [x] 2.5 Clean up JSX rendering in components, eliminating all double-casting (`as React.InputHTMLAttributes...`)

### Phase 3: QA Verification & Testing
- [x] 3.1 Run `pnpm nx typecheck ui` to verify TS compile safety
- [x] 3.2 Run `pnpm nx lint ui` to guarantee code style and linting purity
- [x] 3.3 Run `npx nx test ui` inside `apps/ui/` to assert all unit tests pass cleanly


## The Ledger (State Machine)

| Agent | Action | Status | Hash / Detail |
| :--- | :--- | :--- | :--- |
| Blueprint | Reopen & Expand Spec | DONE | FR-GL-001/002, 2026-05-29 |
| Blueprint | Draft Code Architecture | DONE | Shared typings + Segregated properties (ISP) |
| Mason | Phase 1: Shared Token Module | DONE | 2026-05-29 |
| Mason | Phase 2: Interface Segregation | DONE | 2026-05-29 |
| Mason | Phase 3: QA Verification | DONE | 2026-05-29 |
| Delivery | Archive | PENDING | |
