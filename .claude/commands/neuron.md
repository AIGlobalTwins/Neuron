---
description: Neuron entrypoint for project evaluation and discovery workflows inside Claude Code
argument-hint: [avaliar-projeto|analisar-reuniao|help] [contexto]
---

Interpreta `$ARGUMENTS` como:
- ação: o primeiro token
- contexto: o restante input

Ações suportadas:
- `avaliar-projeto`
- `analisar-reuniao`
- `help`

Se a ação for `avaliar-projeto`:
- usa o subagent `project-evaluator`;
- inspeciona o repositório ou contexto local quando existir;
- trata qualquer inventário fornecido pelo utilizador como fonte oficial;
- nunca recomendes agents, skills, plugins, commands ou MCP tools que não estejam visíveis, instalados ou explicitamente listados;
- se faltar inventário, faz a melhor avaliação possível e assinala a limitação;
- se o input for curto ou vago, faz uma avaliação provisória com a menor complexidade razoável.

Devolve exatamente nesta estrutura:

# Neuron Evaluation

## 1. Project summary
## 2. Classification
## 3. What this project actually needs
## 4. Recommended capabilities
## 5. Capabilities to avoid or defer
## 6. Suggested execution order
## 7. Gaps and missing context
## 8. Next best action

Se a ação for `analisar-reuniao`:
- usa os subagents nesta ordem:
  1. `as-is-mapper`
  2. `opportunity-analyzer`
  3. `project-evaluator`
  4. `to-be-mapper`
- não inventes passos que não estejam sustentados no input;
- lista ambiguidades explicitamente;
- não recomendes tools não instaladas ou não listadas como disponíveis;
- mantém separadas observações explícitas, inferências fortes e questões em aberto;
- o TO-BE tem de indicar triggers, inputs, outputs, owner e exceções para cada automação sugerida.

Devolve exatamente nesta estrutura:

# Neuron Discovery Report

## 1. Meeting summary
## 2. AS-IS process map
## 3. Opportunity analysis
## 4. Capability routing
## 5. TO-BE process map
## 6. Top risks / unknowns
## 7. Recommended next step

Se a ação for `help` ou estiver ausente:
- explica que o comando disponível no Claude Code é `/neuron`;
- mostra estes exemplos:
  - `/neuron avaliar-projeto Quero criar um SaaS com auth, billing e automações com IA.`
  - `/neuron analisar-reuniao Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual em leads e follow-ups.`
- pede ao utilizador que forneça uma destas ações antes do contexto.
