---
description: Analisa uma transcrição de reunião de discovery e devolve AS-IS, oportunidades, capability routing e TO-BE
argument-hint: [transcrição ou resumo estruturado da reunião]
---

Executa o pipeline Neuron V2 com base neste input:

$ARGUMENTS

Ordem obrigatória de trabalho:
1. Usa o subagent `as-is-mapper` para construir o processo atual.
2. Usa o subagent `opportunity-analyzer` para diagnosticar gargalos, quick wins e oportunidades.
3. Usa o subagent `project-evaluator` para recomendar os agents, plugins, skills, commands e MCP tools mais adequados com base no contexto e no inventário disponível.
4. Usa o subagent `to-be-mapper` para desenhar o processo futuro com pontos de automação.

Regras obrigatórias:
- Não inventes passos que não estejam sustentados no input.
- Se houver ambiguidades, lista-as explicitamente.
- Não recomendes tools não instaladas ou não listadas como disponíveis.
- Mantém separadas observações explícitas, inferências fortes e questões em aberto.
- O TO-BE tem de indicar triggers, inputs, outputs, owner e exceções para cada automação sugerida.

Devolve a resposta final nesta estrutura:

# Neuron Discovery Report

## 1. Meeting summary
## 2. AS-IS process map
## 3. Opportunity analysis
## 4. Capability routing
## 5. TO-BE process map
## 6. Top risks / unknowns
## 7. Recommended next step
