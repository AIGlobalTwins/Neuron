# Department Skill Rules

## Source of truth

Generated department agents may only reference skills that exist in `skills/`.
List them as Markdown links to the matching skill file.

Current skill catalogue:
- [process-mapping](../skills/process-mapping.md)
- [opportunity-identification](../skills/opportunity-identification.md)
- [automation-scoping](../skills/automation-scoping.md)
- [to-be-design](../skills/to-be-design.md)
- [sop-generation](../skills/sop-generation.md)

## Skill assignment rules

- assign only skills that are materially useful for the department
- prefer 2-3 core skills
- prefer 0-2 optional skills
- do not assign every available skill by default

## Default matching logic

- use `process-mapping` when the department still has unclear or inconsistent operational flow
- use `opportunity-identification` when the agent should surface bottlenecks, prioritise issues, or highlight automation candidates
- use `automation-scoping` when the agent should define automation boundaries, triggers, inputs, outputs, or implementation shape
- use `to-be-design` when the agent should help redesign a future workflow after the current process is understood
- use `sop-generation` when the workflow is stable enough to convert into repeatable procedures

## Department guidance

- `sales`: usually `opportunity-identification`, `automation-scoping`, optional `process-mapping`
- `finance`: usually `opportunity-identification`, `automation-scoping`, optional `sop-generation`
- `hr`: usually `process-mapping`, `sop-generation`, optional `opportunity-identification`
- `operations`: usually `process-mapping`, `automation-scoping`, optional `to-be-design`

## No-noise rule

If a skill would not visibly change how the agent is used, do not include it.
