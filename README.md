# Neuron

Neuron is a reusable Claude Code plugin for **process discovery, capability routing, and automation design**.

Feed it a project brief, repository, or client meeting transcript and Neuron can help you:
- map the current process (AS-IS),
- diagnose bottlenecks and automation opportunities,
- recommend the best available agents / plugins / MCP tools,
- design a realistic future-state process (TO-BE).

This is not just a tool recommender. It is a lightweight delivery framework for discovery and automation projects.

## Capability routing model

Neuron is designed to work with a real capability inventory instead of assuming all tools exist.

For each important outcome, Neuron separates capabilities into:

1. `AVAILABLE_NOW`  
Capabilities already present in the user's environment.

2. `RECOMMENDED_TO_ADD`  
Capabilities that are missing but would materially improve the case.

3. `FALLBACK_OUTPUTS`  
Useful intermediate outputs Neuron can still generate if the ideal capability is not available.

Example:
- If an Excalidraw connector exists, Neuron can route diagram work there.
- If it does not exist, Neuron can recommend adding it.
- If the user still does not have it, Neuron should continue with Mermaid, structured markdown, or JSON diagram specs instead of blocking.

## What's new in v0.2.0

Neuron V2 expands the original project evaluator into a 4-agent pipeline:

1. `as-is-mapper` → builds the current-state process map
2. `opportunity-analyzer` → diagnoses bottlenecks and automation opportunities
3. `project-evaluator` → routes work to the best available capabilities
4. `to-be-mapper` → designs the target-state process and automation insertion points

It also adds a new orchestration command:
- `/neuron-analisar-reuniao`

## Included components

### Agents
- `agents/as-is-mapper.md`
- `agents/opportunity-analyzer.md`
- `agents/project-evaluator.md`
- `agents/to-be-mapper.md`

### Commands
- `commands/neuron-avaliar-projeto.md` → evaluate a project / repo / transcript
- `commands/neuron-analisar-reuniao.md` → run the Neuron discovery pipeline on a client call transcript

### Examples
- `examples/inventory-template.md`
- `examples/transcript-input-template.md`

### Plugin manifest
- `.claude-plugin/plugin.json`

## Recommended use cases

- AI automation consultancy
- discovery calls with clients
- internal process mapping
- pre-sales solution design
- selecting the right Claude Code agents and tools for a delivery case
- designing automation proposals from transcript evidence instead of vibes

## Project structure

```text
neuron/
├── .claude-plugin/
│   └── plugin.json
├── agents/
│   ├── as-is-mapper.md
│   ├── opportunity-analyzer.md
│   ├── project-evaluator.md
│   └── to-be-mapper.md
├── commands/
│   ├── neuron-analisar-reuniao.md
│   └── neuron-avaliar-projeto.md
├── examples/
│   ├── inventory-template.md
│   └── transcript-input-template.md
├── .gitignore
├── LICENSE
└── README.md
```

## How the V2 pipeline works

```text
Meeting transcript
   ↓
AS-IS Mapper
   ↓
Opportunity Analyzer
   ↓
Project Evaluator
   ↓
TO-BE Mapper
   ↓
Discovery report / proposal material
```

## Example usage

### Project evaluation

```text
/neuron-avaliar-projeto Quero criar um SaaS com auth, billing, dashboard admin e automações com IA. Tenho agents de arquitetura, frontend e backend, e tools para docs e GitHub.
```

### Discovery workflow from transcript

```text
/neuron-analisar-reuniao Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp, CRM. [colar transcrição]
```

## Recommended operating model

### Best for delivery work
Use `/neuron-analisar-reuniao` when you have:
- a real client transcript,
- a discovery call summary,
- meeting notes with process details.

### Best for routing / planning work
Use `/neuron-avaliar-projeto` when you want:
- capability selection,
- project orchestration,
- tool / agent recommendations,
- sequencing advice.

## Best results

Neuron gets materially better when you provide:
- a capability inventory,
- the client transcript,
- known systems and constraints,
- any current repo or existing implementation,
- budget / deadline / compliance constraints.

The capability inventory should reflect real environment state and help Neuron distinguish between:
- what already exists,
- what should be added,
- what fallback output is still executable now.

## Product positioning

**Recommended positioning:**

> Neuron is a Claude Code plugin for process discovery, automation design, and capability routing.

That is stronger and more honest than describing it only as an agent recommender.

## Installation

### Local testing
Use plugin upload / install flows supported by your Claude environment.

### Claude Code local commands
If you want Neuron to appear in the Claude Code `/` command menu, use the local Claude Code structure included in this repo:
- `.claude/commands/neuron.md`
- `.claude/agents/*.md`

The Claude Code entrypoint is:

```text
/neuron
```

You can also call the direct aliases:

```text
/neuron-avaliar-projeto
/neuron-analisar-reuniao
```

Examples:

```text
/neuron avaliar-projeto Quero criar um SaaS com auth, billing, dashboard admin e automações com IA.
```

```text
/neuron analisar-reuniao Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp e CRM.
```

```text
/neuron-avaliar-projeto Quero criar um SaaS com auth, billing, dashboard admin e automações com IA.
```

```text
/neuron-analisar-reuniao Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp e CRM.
```

### GitHub distribution
Publish the repository and share it as a reusable plugin package.

## Suggested next evolutions

- English command aliases (`/analyze-meeting`, `/evaluate-project`)
- JSON schema validation between agents
- marketplace-ready repository wrapper
- Excalidraw exporter or MCP integration
- proposal generator agent
- scoring model for automation impact vs complexity

## License

MIT
