# Company Memory: Acme Industrial

## Identity
- company_name: Acme Industrial
- company_slug: acme-industrial
- industry: B2B manufacturing
- business_model: mid-sized industrial company with inbound sales, quoting, delivery, invoicing, and internal support functions
- last_updated: 2026-03-12

## Validated facts
- The company operates across Sales, Finance, HR, and Operations.
- The current toolset includes Gmail, Google Sheets, ERP, CRM, and a shared drive.
- The business has manual handoffs between lead intake, quoting, operational execution, and invoice follow-up.
- Multiple teams update information across more than one system.

## Working hypotheses
- Quote approval logic may differ by team or deal type.
- Operational planning may be under Operations rather than a separate planning department.
- HR onboarding work appears informal, but the exact steps still need validation.

## Systems in use
- Gmail
- Google Sheets
- ERP
- CRM
- shared drive

## Core operational flows
- inbound lead to qualification
- quote follow-up and commercial handoff
- quote-to-order handoff into operations
- invoice follow-up
- employee onboarding

## Departments

### Sales
- status: confirmed
- canonical_key: sales
- responsibilities: lead qualification, quote follow-up, CRM hygiene, handoff to operations
- dependencies: Operations, Finance
- current pain points: duplicated updates, weak handoff context, inconsistent next-step ownership
- agent_status: generated
- agent_file: agents/generated/acme-industrial/sales-agent.md

### Finance
- status: confirmed
- canonical_key: finance
- responsibilities: invoice follow-up, payment visibility, finance handoff support
- dependencies: Sales, Operations
- current pain points: delayed invoice follow-up, fragmented status visibility
- agent_status: generated
- agent_file: agents/generated/acme-industrial/finance-agent.md

### HR
- status: confirmed
- canonical_key: hr
- responsibilities: onboarding coordination, internal people-process follow-up
- dependencies: Operations
- current pain points: onboarding tracked informally, weak process visibility
- agent_status: generated
- agent_file: agents/generated/acme-industrial/hr-agent.md

### Operations
- status: confirmed
- canonical_key: operations
- responsibilities: execution readiness, quote-to-delivery handoff, coordination after commercial approval
- dependencies: Sales, Finance
- current pain points: inconsistent handoff data, delays before execution starts
- agent_status: generated
- agent_file: agents/generated/acme-industrial/operations-agent.md

### CEO
- status: confirmed
- canonical_key: ceo
- responsibilities: leadership prioritisation, cross-functional decision-making, review of department improvement agenda
- dependencies: Sales, Finance, HR, Operations
- current pain points: fragmented visibility across department needs and shared bottlenecks
- agent_status: generated
- agent_file: agents/generated/acme-industrial/ceo-agent.md

## Operational problems
- duplicated manual updates between systems
- slow quote-to-order handoff
- invoice follow-up delays
- onboarding tasks tracked informally

## Automation opportunities
- reduce duplicate data entry between Gmail, CRM, Sheets, and ERP
- standardise handoff data between Sales and Operations
- improve invoice follow-up visibility
- formalise onboarding workflow tracking

## Decisions made
- The canonical company memory should be stored in `company-data/acme-industrial/company-context.md`.
- One strong agent per department is preferred over multiple overlapping agents.

## Existing generated agents
- department: Sales
  canonical_key: sales
  file: agents/generated/acme-industrial/sales-agent.md
  status: generated
  notes: active sales operations support agent
- department: Finance
  canonical_key: finance
  file: agents/generated/acme-industrial/finance-agent.md
  status: generated
  notes: finance coordination and receivables support
- department: HR
  canonical_key: hr
  file: agents/generated/acme-industrial/hr-agent.md
  status: generated
  notes: onboarding and HR operations support
- department: Operations
  canonical_key: operations
  file: agents/generated/acme-industrial/operations-agent.md
  status: generated
  notes: execution readiness and handoff support
- department: CEO
  canonical_key: ceo
  file: agents/generated/acme-industrial/ceo-agent.md
  status: generated
  notes: executive synthesis of department improvement needs

## Discovery checklist

### Company Structure
- departments identified:
  status: confirmed
  note: Sales, Finance, HR, Operations, and CEO are explicit in the current company memory.
- decision makers:
  status: inferred
  note: CEO is explicit, but the full operating decision-maker set by department is still incomplete.

### Systems
- CRM:
  status: confirmed
  note: CRM is explicitly listed in systems in use.
- communication tools:
  status: confirmed
  note: Gmail is explicitly used for communication.
- finance tools:
  status: confirmed
  note: ERP is explicitly used in finance-related work.
- internal tools:
  status: confirmed
  note: Google Sheets and shared drive are explicitly used internally.

### Processes
- lead generation:
  status: inferred
  note: Inbound lead handling is visible, but the full lead generation model is not fully described.
- sales workflow:
  status: confirmed
  note: Qualification, quote follow-up, and commercial handoff are explicit.
- customer onboarding:
  status: unknown
  note: No customer onboarding process is clearly described in the current memory.
- customer support:
  status: unknown
  note: No dedicated support workflow is confirmed.
- billing:
  status: confirmed
  note: Invoice follow-up and payment visibility are explicit.

### Automation
- existing automations:
  status: unknown
  note: The current memory does not confirm any live automation already in place.
- integrations:
  status: inferred
  note: Multiple systems exchange information operationally, but explicit integrations are not yet confirmed.

### Metrics
- main KPIs:
  status: unknown
  note: No explicit KPIs are listed in the current discovery material.
- company goals:
  status: inferred
  note: Reducing duplication, delays, and weak handoffs is implied, but formal company goals are not explicit.

## Open questions
- How many approval stages exist before a quote becomes operational work?
- Is credit control inside Finance already a distinct sub-function?
- Should onboarding remain under HR only, or include Operations dependencies explicitly?

## Update log
- 2026-03-12: canonical company memory created from initial Acme discovery context
