# Company Discovery Checklist

## Purpose
Help Neuron detect missing company information during discovery and make gaps explicit before agent generation or prioritization moves too far.

## Use when
- analyzing a company from a transcript, brief, or discovery notes
- building or updating canonical company memory
- checking whether there is enough information to create department agents safely

## Status labels

Use one status for every checklist item:
- `confirmed`: explicitly supported by the input or already validated in company memory
- `inferred`: not stated directly, but reasonably implied by the available evidence
- `unknown`: not confirmed and not safe to infer yet

## Checklist categories

### Company Structure
- departments identified
- decision makers

### Systems
- CRM
- communication tools
- finance tools
- internal tools

### Processes
- lead generation
- sales workflow
- customer onboarding
- customer support
- billing

### Automation
- existing automations
- integrations

### Metrics
- main KPIs
- company goals

## How to use it

- mark every item as `confirmed`, `inferred`, or `unknown`
- add one short note explaining the evidence or the gap
- use `unknown` to drive open questions
- use `inferred` carefully and keep it separate from validated facts
- do not block progress if some items stay unknown, but surface the risk clearly

## Guardrails

- do not treat inferred items as confirmed
- do not force every category to be populated
- do not invent systems, processes, or decision makers just to complete the checklist
- use the checklist to expose discovery gaps, not to create fake certainty
