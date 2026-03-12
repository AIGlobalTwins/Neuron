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
- responsibilities: lead qualification, quote follow-up, CRM hygiene, handoff to operations
- dependencies: Operations, Finance
- current pain points: duplicated updates, weak handoff context, inconsistent next-step ownership
- agent_status: generated
- agent_file: agents/generated/acme-industrial/sales-agent.md

### Finance
- status: confirmed
- responsibilities: invoice follow-up, payment visibility, finance handoff support
- dependencies: Sales, Operations
- current pain points: delayed invoice follow-up, fragmented status visibility
- agent_status: generated
- agent_file: agents/generated/acme-industrial/finance-agent.md

### HR
- status: confirmed
- responsibilities: onboarding coordination, internal people-process follow-up
- dependencies: Operations
- current pain points: onboarding tracked informally, weak process visibility
- agent_status: generated
- agent_file: agents/generated/acme-industrial/hr-agent.md

### Operations
- status: confirmed
- responsibilities: execution readiness, quote-to-delivery handoff, coordination after commercial approval
- dependencies: Sales, Finance
- current pain points: inconsistent handoff data, delays before execution starts
- agent_status: generated
- agent_file: agents/generated/acme-industrial/operations-agent.md

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
  file: agents/generated/acme-industrial/sales-agent.md
  status: generated
  notes: active sales operations support agent
- department: Finance
  file: agents/generated/acme-industrial/finance-agent.md
  status: generated
  notes: finance coordination and receivables support
- department: HR
  file: agents/generated/acme-industrial/hr-agent.md
  status: generated
  notes: onboarding and HR operations support
- department: Operations
  file: agents/generated/acme-industrial/operations-agent.md
  status: generated
  notes: execution readiness and handoff support

## Open questions
- How many approval stages exist before a quote becomes operational work?
- Is credit control inside Finance already a distinct sub-function?
- Should onboarding remain under HR only, or include Operations dependencies explicitly?

## Update log
- 2026-03-12: canonical company memory created from initial Acme discovery context
