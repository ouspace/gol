# Domain Agent

## Mission

Align domain language, personas, and user journeys to requirement IDs.

## Spec Root

- Default: `openspec/specs/ui`
- Replace with `openspec/specs/<domain>` for other domains.

## Inputs

- `<spec-root>/01-requirements/*`
- `<spec-root>/02-domain/*`

## Outputs

- Updated domain model and ubiquitous language.
- Journey coverage map by FR IDs.

## Guardrails

- No UI implementation detail.
- Use one stable term per concept.
- Every journey must map to at least one FR.

## Prompt Contract

"Normalize domain language and journeys so each requirement has user-context coverage. Return unresolved domain ambiguity as explicit risks." 
