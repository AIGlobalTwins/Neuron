# Neuron

Process discovery and automation orchestration for Claude Code.

## Install

```bash
npx @kikompg/neuron-cc@latest --claude --global
```

## Update

```bash
npx @kikompg/neuron-cc@latest --update
```

## What it does

- Maps AS-IS processes from meeting transcripts
- Identifies automation opportunities
- Recommends the best agents, plugins and connectors
- Designs TO-BE workflows
- Falls back gracefully when tools are missing

## Main command

```text
/neuron
```

Neuron is a reusable Claude Code plugin for process discovery, capability routing, and automation design.

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

## What's new in v0.2.2

Neuron V2 expands the original project evaluator into a 4-agent pipeline:

1. `as-is-mapper` → builds the current-state process map
2. `opportunity-analyzer` → diagnoses bottlenecks and automation opportunities
3. `project-evaluator` → routes work to the best available capabilities
4. `to-be-mapper` → designs the target-state process and automation insertion points

It also adds a new orchestration command:
- `/neuron-analisar-reuniao`

It now supports two discovery modes:
- `Auto` -> runs the full pipeline in one go
- `Advisor` -> runs one step at a time and suggests the next step

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

## Discovery modes

### Auto mode

`Auto` is the current end-to-end mode.
Neuron runs the full discovery pipeline in one response:

```text
Transcrição
  ↓
AS-IS Mapper
  ↓
Opportunity Analyzer
  ↓
Project Evaluator
  ↓
TO-BE Mapper
```

### Advisor mode

`Advisor` is the guided mode.
Neuron runs one step at a time, shows the result, and suggests the next step for confirmation:

```text
Transcrição
  ↓
1. AS-IS Mapper
  ↓
Mostrar resultado + sugerir próximo passo
  ↓
2. Opportunity Analyzer
  ↓
Mostrar resultado + sugerir próximo passo
  ↓
3. Project Evaluator
  ↓
Mostrar resultado + sugerir próximo passo
  ↓
4. TO-BE Mapper
```

In `Advisor` mode, the user can continue by pasting the previous output back into the next `/neuron-analisar-reuniao advisor ...` call.

## Example usage

### Project evaluation

```text
/neuron-avaliar-projeto Quero criar um SaaS com auth, billing, dashboard admin e automações com IA. Tenho agents de arquitetura, frontend e backend, e tools para docs e GitHub.
```

### Discovery workflow from transcript

```text
/neuron-analisar-reuniao auto Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp, CRM. [colar transcrição]
```

```text
/neuron-analisar-reuniao advisor Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp, CRM. [colar transcrição]
```

## Recommended operating model

### Best for delivery work
Use `/neuron-analisar-reuniao auto` when you want the full pipeline in one go.

Use `/neuron-analisar-reuniao advisor` when you want:
- one stage at a time,
- explicit review between stages,
- a shorter response at each step,
- manual confirmation before moving forward.

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

Neuron is structured to support three installation modes:
- direct use from the GitHub repository,
- `npx` installer for Claude Code,
- future plugin or marketplace distribution.

### npx installer for Claude Code

Global install:

```bash
npx @kikompg/neuron-cc@latest --claude --global
```

Local install in the current project:

```bash
npx @kikompg/neuron-cc@latest --claude --local
```

Update an existing installation:

```bash
npx @kikompg/neuron-cc@latest --update
```

What the installer does:
- copies commands into `~/.claude/commands/` or `./.claude/commands/`
- copies agents into `~/.claude/agents/` or `./.claude/agents/`
- ensures `/neuron` is available in Claude Code
- also installs the direct aliases `/neuron-avaliar-projeto` and `/neuron-analisar-reuniao`
- updates detected Neuron installs when run with `--update`

### Direct use from GitHub

Clone the repository and either use the included `.claude/` structure directly or run the installer script from the repo:

```bash
git clone https://github.com/AIGlobalTwins/Neuron.git
cd Neuron
node scripts/install.js --claude --local
```

### Plugin / marketplace style
Use plugin upload or install flows supported by your Claude environment when you want the `.claude-plugin` package form.

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
/neuron analisar-reuniao auto Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp e CRM.
```

```text
/neuron analisar-reuniao advisor Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp e CRM.
```

```text
/neuron-avaliar-projeto Quero criar um SaaS com auth, billing, dashboard admin e automações com IA.
```

```text
/neuron-analisar-reuniao auto Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp e CRM.
```

```text
/neuron-analisar-reuniao advisor Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual na gestão de leads e follow-ups. Sistemas atuais: Gmail, Google Sheets, WhatsApp e CRM.
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
