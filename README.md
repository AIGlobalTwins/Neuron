# Neuron

Process discovery, automation orchestration, and department-agent generation for Claude Code.

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

## What it does

- Analyses company context from transcripts or business descriptions
- Identifies relevant departments, challenges, and automation opportunities
- Maps AS-IS and TO-BE views for operational domains
- Generates specialised department agents as Markdown files
- Updates generated agents when new company information appears
- Reuses shared skills for process mapping, opportunity analysis, scoping, design, and SOP work

## Repository architecture

```text
neuron/
├── agents/
│   ├── core/
│   │   ├── company-analyzer.md
│   │   ├── as-is-mapper.md
│   │   ├── opportunity-analyzer.md
│   │   ├── project-evaluator.md
│   │   ├── to-be-mapper.md
│   │   ├── department-agent-designer.md
│   │   └── department-agent-updater.md
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

- `company-analyzer` -> identifies company context, departments, and agent candidates
- `as-is-mapper` -> summarises current-state process reality
- `opportunity-analyzer` -> identifies operational and automation opportunities
- `project-evaluator` -> routes work across available capabilities and fallbacks
- `to-be-mapper` -> defines future-state process direction
- `department-agent-designer` -> generates department-specific Markdown agents
- `department-agent-updater` -> updates existing generated agents without duplication

## Reusable skills

- [process-mapping](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/process-mapping.md)
- [opportunity-identification](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/opportunity-identification.md)
- [automation-scoping](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/automation-scoping.md)
- [to-be-design](/Users/daniloguerreiro/Desktop/Neuron/neuron/skills/to-be-design.md)
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
- no TO-BE
- no full report

### 2. Generate company department agents

Use:

```text
/neuron gerar-agents-empresa [descrição da empresa ou transcrição]
```

What it does:
1. analyses the company
2. identifies relevant departments
3. maps department AS-IS and TO-BE summaries
4. identifies department automation opportunities
5. creates department agents in `agents/generated/<company-slug>/`

### 3. Update generated agents

Use:

```text
/neuron atualizar-agents-empresa [nova informação da empresa]
```

What it does:
1. reads current company context
2. identifies affected agents
3. updates only the necessary files
4. preserves validated information
5. avoids duplicate department agents

## Generated agent model

Each generated agent should contain:
- name
- department
- purpose
- company context
- when to use
- when not to use
- inputs
- outputs
- responsibilities
- useful tools
- update rules

Example files:
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

## Guardrails

- do not create redundant agents
- do not duplicate overlapping departments or roles
- create department agents only when there is clear operational need
- prefer updating an existing agent over creating a new one

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
