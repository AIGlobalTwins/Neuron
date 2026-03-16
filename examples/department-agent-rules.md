# Department Agent Rules

## Canonical department keys

Use these canonical keys and file names whenever the responsibilities fit:

- `sales` -> `sales-agent.md`
- `finance` -> `finance-agent.md`
- `hr` -> `hr-agent.md`
- `operations` -> `operations-agent.md`
- `marketing` -> `marketing-agent.md`
- `customer-success` -> `customer-success-agent.md`
- `support` -> `support-agent.md`
- `ceo` -> `ceo-agent.md`
- `product` -> `product-agent.md`
- `engineering` -> `engineering-agent.md`
- `data` -> `data-agent.md`
- `legal` -> `legal-agent.md`
- `procurement` -> `procurement-agent.md`
- `logistics` -> `logistics-agent.md`
- `planning` -> `planning-agent.md`

## Default merge rules

Do not create a separate agent for a sub-function unless all of these are true:

1. it has a distinct owner or team
2. it has recurring workflows that are materially different
3. it uses distinct systems, approvals, or KPIs
4. it would be used independently from the parent function

If those conditions are not met, merge the sub-function into the nearest canonical department agent.

## Typical merge examples

- `sales ops` -> merge into `sales` unless it is a clearly separate operating team
- `collections` -> merge into `finance` unless it has its own owner, workflow, and tooling
- `billing ops` -> merge into `finance` unless it is truly distinct
- `people ops` -> merge into `hr` unless it is structurally independent
- `project coordination` -> merge into `operations` unless there is a distinct PMO function
- `revops` -> merge into `sales` or `operations` unless a separate revenue operations team is explicitly confirmed

## Create-new threshold

Create a new department agent only when:
- the department is confirmed or strongly evidenced
- the workflow is operationally distinct
- the agent would reduce ambiguity or execution effort
- reusing an existing canonical agent would create confusion

## No-agent rule

If a department or role has:
- low repetition
- low operational surface area
- mostly judgment-based work
- no distinct workflow

then set `agent_status: not-needed` in company memory instead of creating a file.
