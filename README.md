# Neuron

Process discovery, capability routing, and department-agent generation for Claude Code, coordinated by a central Neuron orchestrator.

## Install

```bash
npx @kikompg/neuron-cc@latest --claude --global
```

## Update

```bash
npx @kikompg/neuron-cc@latest --update
```

## Main command

```text
/neuron
```

Additional direct commands:

```text
/neuron-avaliar-projeto
/neuron-analisar-reuniao
/neuron-gerar-agents-empresa
/neuron-atualizar-agents-empresa
```

## What it does

- Analyses company context from transcripts or business descriptions
- Identifies relevant departments, challenges, and automation opportunities
- Generates specialised department agents as Markdown files
- Generates a CEO-facing agent that consolidates department improvement needs
- Updates generated agents when new company information appears
- Uses a central orchestrator to control the main execution flow and avoid redundant runs
- Reuses shared skills for process mapping, opportunity analysis, scoping, design, and SOP work

## Repository architecture

```text
neuron/
├── agents/
│   ├── core/
│   │   ├── neuron-orchestrator.md
│   │   ├── company-analyzer.md
│   │   ├── opportunity-analyzer.md
│   │   ├── project-evaluator.md
│   │   ├── department-agent-designer.md
│   │   ├── department-agent-updater.md
│   │   └── ceo-agent-designer.md
│   └── generated/
│       └── acme-industrial/
├── skills/
├── company-data/
│   └── acme-industrial/
├── commands/
├── .claude/
├── .claude-plugin/
├── scripts/
└── README.md
```

## Core agents

- `neuron-orchestrator` -> controls the main Neuron flow and decides which agents run next
- `company-analyzer` -> identifies company context, departments, and agent candidates
- `opportunity-analyzer` -> identifies operational and automation opportunities
- `project-evaluator` -> routes work across available capabilities and fallbacks
- `department-agent-designer` -> generates department-specific Markdown agents
- `department-agent-updater` -> updates existing generated agents without duplication
- `ceo-agent-designer` -> generates a CEO-facing synthesis agent from all department agents

## Reusable skills

- [process-mapping](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/process-mapping.md)
- [company-discovery-checklist](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/company-discovery-checklist.md)
- [opportunity-identification](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/opportunity-identification.md)
- [opportunity-scoring](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/opportunity-scoring.md)
- [automation-scoping](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/automation-scoping.md)
- [sop-generation](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/sop-generation.md)

## Main workflows

### 1. Initial meeting diagnosis

Use:

```text
/neuron analisar-reuniao [transcrição ou resumo]
```

Output format:

```text
# Neuron

## Resumo
## Top oportunidades
## Recomendação
## Próximo passo
```

This step is intentionally short:
- no JSON
- no capability routing
- no full report

### 1b. Short project evaluation

Use:

```text
/neuron avaliar-projeto [contexto]
```

Output format:

```text
# Neuron Evaluation

## Resumo
## O que já existe
## O que falta
## Fallback agora
## Próximo passo
```

### 2. Generate company department agents

Use:

```text
/neuron gerar-agents-empresa [descrição da empresa ou transcrição]
```

What it does:
1. `neuron-orchestrator` coordinates the flow
2. analyses the company
3. creates a canonical company memory in `company-data/<company-slug>/company-context.md`
4. identifies relevant departments
5. identifies department improvement needs
6. creates department agents in `agents/generated/<company-slug>/`
7. creates `ceo-agent.md` with the consolidated executive view

### 3. Update generated agents

Use:

```text
/neuron atualizar-agents-empresa [nova informação da empresa]
```

What it does:
1. `neuron-orchestrator` checks the current pipeline state
2. reads canonical company memory
3. identifies affected agents
4. updates company memory first
5. updates only the necessary files
6. preserves validated information
7. avoids duplicate department agents

## Generated agent model

Each generated agent should contain:
- YAML metadata block
- name
- canonical key
- department
- purpose
- company context
- when to use
- when not to use
- inputs
- outputs
- responsibilities
- useful tools
- core skills
- optional skills
- skill usage
- department analysis
- update rules

Required YAML metadata:
- `agent_id`
- `department`
- `company`
- `base_agent`
- `version`
- `created_by`
- `last_updated`

Each department agent should use this fixed analysis contract:
- `## Departamento`
- `## Problemas encontrados`
- `## Melhorias recomendadas`
- `## O que pode ser automatizado`
- `## O que deve continuar manual`
- `## Prioridade`
- `## Dependências`

Inside `## Prioridade`, every agent should score:
- `impacto`
- `complexidade`
- `urgencia`
- `decisao`

These scores should follow:
- [opportunity-scoring](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/opportunity-scoring.md)

The CEO agent should then consolidate those scores into:
- `## Executive Summary`
- `## Top Priorities`
- `## Quick wins`
- `## Cross-Department Issues`
- `## Dependencies`
- `## Recommended Roadmap`
- `## Next Step`

Example files:
- [ceo-agent.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/agents/generated/acme-industrial/ceo-agent.md)
- [sales-agent.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/agents/generated/acme-industrial/sales-agent.md)
- [finance-agent.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/agents/generated/acme-industrial/finance-agent.md)
- [hr-agent.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/agents/generated/acme-industrial/hr-agent.md)
- [operations-agent.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/agents/generated/acme-industrial/operations-agent.md)

## Company context storage

Reusable company knowledge lives in:
- [company-context.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/company-data/acme-industrial/company-context.md)

This context is the base for:
- agent generation
- agent updates
- preserving validated information over time

Neuron now treats this file as a canonical company memory, not a loose summary.
That memory should separate:
- validated facts
- working hypotheses
- departments
- existing generated agents
- discovery checklist items marked as `confirmed`, `inferred`, or `unknown`
- decisions made
- open questions

Reference template:
- [examples/company-memory-template.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/examples/company-memory-template.md)

## Guardrails

- do not create redundant agents
- do not duplicate overlapping departments or roles
- create department agents only when there is clear operational need
- prefer updating an existing agent over creating a new one
- resolve departments to stable canonical keys before creating files
- keep deterministic file names such as `sales-agent.md`, `finance-agent.md`, `operations-agent.md`

Reference rules:
- [examples/department-agent-rules.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/examples/department-agent-rules.md)
- [examples/department-skill-rules.md](/Users/daniloguerreiro/Desktop/Neuron/neuron/examples/department-skill-rules.md)

## Example commands

```text
/neuron analisar-reuniao Cliente industrial com vendas, finanças, RH e operações. Sistemas atuais: Gmail, CRM, ERP e folhas de cálculo. [colar transcrição]
```

```text
/neuron gerar-agents-empresa Empresa industrial B2B com equipas de vendas, finanças, RH e operações. Sistemas atuais: Gmail, CRM, ERP e folhas de cálculo. [colar transcrição]
```

```text
/neuron atualizar-agents-empresa Nova informação: operações foi dividida entre logística e planeamento, e finanças passou a incluir controlo de crédito. [colar update]
```
