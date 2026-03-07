---
description: Analisa uma transcrição de reunião de discovery e devolve AS-IS, oportunidades, capability routing e TO-BE com AVAILABLE_NOW, RECOMMENDED_TO_ADD e FALLBACK_OUTPUTS
argument-hint: [transcrição ou resumo estruturado da reunião]
---

Executa o pipeline Neuron V2 com base neste input:

$ARGUMENTS

Ordem obrigatória de trabalho:
1. Usa o subagent `as-is-mapper` para construir o processo atual.
2. Usa o subagent `opportunity-analyzer` para diagnosticar gargalos, quick wins e oportunidades.
3. Usa o subagent `project-evaluator` para construir um capability routing baseado em inventário e separado em `AVAILABLE_NOW`, `RECOMMENDED_TO_ADD` e `FALLBACK_OUTPUTS`.
4. Usa o subagent `to-be-mapper` para desenhar o processo futuro com pontos de automação, respeitando as capabilities disponíveis e os fallbacks definidos.

Regras obrigatórias:
- Não inventes passos que não estejam sustentados no input.
- Se houver ambiguidades, lista-as explicitamente.
- Não recomendes tools não instaladas ou não listadas como disponíveis dentro de `AVAILABLE_NOW`.
- Se faltar uma capability importante, coloca-a em `RECOMMENDED_TO_ADD` e mantém o workflow vivo com um `FALLBACK_OUTPUT`.
- Se não houver tool de diagrama disponível, devolve pelo menos um fallback utilizável, como markdown estruturado, Mermaid ou JSON de especificação.
- Mantém separadas observações explícitas, inferências fortes e questões em aberto.
- O TO-BE tem de indicar triggers, inputs, outputs, owner e exceções para cada automação sugerida.

Devolve a resposta final nesta estrutura:

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
