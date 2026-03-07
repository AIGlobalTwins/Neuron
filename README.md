# Neuron

Neuron is a reusable Claude Code plugin that acts as a project evaluator and orchestration layer.

Give it a project idea, feature request, or repository and it will assess the work, identify the current phase, and recommend the most appropriate available agents, skills, plugins, commands, and MCP tools.

## What Neuron does

- Evaluates a project or idea before execution
- Maps the real project needs behind the request
- Recommends the best available capabilities for the job
- Distinguishes between critical, recommended, optional, and avoid
- Suggests a rational execution order
- Flags missing context, overlap, risk, and overengineering

## Included components

- `agents/project-evaluator.md` → specialised evaluation subagent
- `commands/avaliar-projeto.md` → slash command `/avaliar-projeto`
- `.claude-plugin/plugin.json` → plugin manifest

## Recommended use cases

- You maintain multiple Claude Code agents and want smarter routing
- You use MCP servers and want help choosing the right one per task
- You want a lightweight AI project manager inside Claude Code
- You want consistent capability recommendations across projects

## Install options

### Option 1: install as a plugin from a Git repository

Publish this repository to GitHub, then install it through Claude Code's plugin flow.

### Option 2: install manually

Copy the folders into a Claude Code-compatible plugin directory or use upload/install flows in Claude Desktop / Claude Code.

## Project structure

```text
neuron/
├── .claude-plugin/
│   └── plugin.json
├── agents/
│   └── project-evaluator.md
├── commands/
│   └── avaliar-projeto.md
├── examples/
│   └── inventory-template.md
├── .gitignore
├── LICENSE
└── README.md
```

## Example usage

```text
/avaliar-projeto Quero criar um SaaS com auth, billing, dashboard e automações com IA.
```

```text
/avaliar-projeto Analisa este repositório e diz-me que agents e plugins devo usar para acabar o MVP.
```

## Best results

Neuron is strongest when you provide one or more of the following:

- a repository
- a technical brief
- a list of installed agents / skills / plugins / MCP tools
- constraints such as budget, deadline, stack, or deployment target

## Suggested repo improvements

If you want to grow Neuron into a community mini-product, the next sensible additions are:

- `/evaluate-project` English alias
- examples for SaaS / agentic workflows / internal tools
- inventory schema in JSON or YAML
- optional scoring model for capability ranking
- optional hook or MCP integration for automatic inventory discovery

## License

MIT
