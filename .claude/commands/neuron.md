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
- usa sempre o modelo de 3 níveis:
  - `AVAILABLE_NOW`
  - `RECOMMENDED_TO_ADD`
  - `FALLBACK_OUTPUTS`
- nunca coloques uma capability não confirmada dentro de `AVAILABLE_NOW`;
- se faltar uma capability importante, recomenda-a em `RECOMMENDED_TO_ADD` e define o respetivo `FALLBACK_OUTPUT`;
- se faltar inventário, faz a melhor avaliação possível e assinala a limitação;
- se o input for curto ou vago, faz uma avaliação provisória com a menor complexidade razoável.

Devolve exatamente nesta estrutura:

# Neuron Evaluation

## 1. Project summary
## 2. Classification
## 3. What this project actually needs
## 4. Capability inventory snapshot
## 5. AVAILABLE_NOW
## 6. RECOMMENDED_TO_ADD
## 7. FALLBACK_OUTPUTS
## 8. Suggested execution order
## 9. Capabilities to avoid or defer
## 10. Gaps and missing context
## 11. Next best action

Se a ação for `analisar-reuniao`:
- usa os subagents nesta ordem:
  1. `as-is-mapper`
  2. `opportunity-analyzer`
  3. `project-evaluator`
  4. `to-be-mapper`
- não inventes passos que não estejam sustentados no input;
- lista ambiguidades explicitamente;
- não recomendes tools não instaladas ou não listadas como disponíveis dentro de `AVAILABLE_NOW`;
- se faltar uma capability importante, coloca-a em `RECOMMENDED_TO_ADD` e mantém o workflow vivo com um `FALLBACK_OUTPUT`;
- se não houver tool de diagrama disponível, devolve pelo menos markdown estruturado, Mermaid ou JSON de especificação;
- mantém separadas observações explícitas, inferências fortes e questões em aberto;
- o TO-BE tem de indicar triggers, inputs, outputs, owner e exceções para cada automação sugerida.

Devolve exatamente nesta estrutura:

# Neuron Discovery Report

## 1. Meeting summary
## 2. AS-IS process map
## 3. Opportunity analysis
## 4. Capability routing
### 4.1 AVAILABLE_NOW
### 4.2 RECOMMENDED_TO_ADD
### 4.3 FALLBACK_OUTPUTS
## 5. TO-BE process map
## 6. Top risks / unknowns
## 7. Recommended next step

Se a ação for `help` ou estiver ausente:
- explica que o comando disponível no Claude Code é `/neuron`;
- mostra estes exemplos:
  - `/neuron avaliar-projeto Quero criar um SaaS com auth, billing e automações com IA.`
  - `/neuron analisar-reuniao Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual em leads e follow-ups.`
- pede ao utilizador que forneça uma destas ações antes do contexto.
