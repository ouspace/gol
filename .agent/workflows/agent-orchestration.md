# Agent Orchestration

## Stage Order

1. Product Scope Agent
2. Domain Agent
3. UX Accessibility Agent
4. Architecture Agent
5. QA Traceability Agent
6. Delivery Agent

## Spec Root Convention

- Default spec root for UI work: `.agents/specs/ui`
- For other domains, replace with `.agents/specs/<domain>` and keep the same stage model.

## Ownership Map

| Agent | Primary Artifacts | Writes To |
| --- | --- | --- |
| Product Scope Agent | Problem, scope, FR/NFR | `<spec-root>/00-overview/*`, `<spec-root>/01-requirements/*` |
| Domain Agent | Personas, journeys, language, domain model | `<spec-root>/02-domain/*` |
| UX Accessibility Agent | Interactions, IA, accessibility, tokens intent | `<spec-root>/03-ux/*` |
| Architecture Agent | Frontend architecture, state/data flow, contracts, ADRs | `<spec-root>/04-architecture/*`, `<spec-root>/05-contracts/*`, `<spec-root>/08-decisions/adrs/*` |
| QA Traceability Agent | Acceptance, test strategy/cases, traceability matrix, risks | `<spec-root>/06-quality/*` |
| Delivery Agent | Plan, milestones, DoR/DoD, changelog updates | `<spec-root>/07-delivery/*` |

## Handoff Protocol

Each agent must produce:

- Inputs consumed
- Artifact updates
- Requirement IDs impacted
- Assumptions
- Risks and mitigations
- Next agent action required

Use: `.agents/templates/handoff-template.md`.

## Escalation Rules

Escalate to reviewer when:

- Requirement conflicts across artifacts.
- UX behavior conflicts with accessibility criteria.
- New prop/contract introduces breaking change.
- Traceability matrix has missing links.
