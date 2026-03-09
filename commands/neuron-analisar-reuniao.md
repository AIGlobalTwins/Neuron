---
description: Analisa uma transcrição de reunião em modo Auto ou Advisor, produzindo AS-IS, oportunidades, capability routing e TO-BE
argument-hint: [auto|advisor] [transcrição, resumo ou contexto acumulado]
---

Interpreta o primeiro token de `$ARGUMENTS` como modo:
- `auto`
- `advisor`

Se nenhum modo for fornecido, assume `auto`.

Executa o pipeline Neuron V2 com base neste input:

$ARGUMENTS

Ordem obrigatória de trabalho:
1. Usa o subagent `as-is-mapper` para construir o processo atual.
2. Usa o subagent `opportunity-analyzer` para diagnosticar gargalos, quick wins e oportunidades.
3. Usa o subagent `project-evaluator` para construir um capability routing baseado em inventário e separado em `AVAILABLE_NOW`, `RECOMMENDED_TO_ADD` e `FALLBACK_OUTPUTS`.
4. Usa o subagent `to-be-mapper` para desenhar o processo futuro com pontos de automação, respeitando as capabilities disponíveis e os fallbacks definidos.

## Mode semantics

### Auto mode

Em `auto`, executa o pipeline completo numa só resposta.
Este é o comportamento por omissão.

### Advisor mode

Em `advisor`, nunca executes os quatro passos de uma vez.
Executa apenas o próximo passo necessário e termina a resposta aí.

Regras de progressão em `advisor`:
- Se ainda não existir um resultado AS-IS no contexto, executa apenas o `as-is-mapper`.
- Se já existir AS-IS mas ainda não existir Opportunity Analysis, executa apenas o `opportunity-analyzer`.
- Se já existir Opportunity Analysis mas ainda não existir Capability Routing, executa apenas o `project-evaluator`.
- Se já existir Capability Routing mas ainda não existir TO-BE, executa apenas o `to-be-mapper`.
- Se já existir TO-BE, não repitas o pipeline completo; resume o estado e sugere o próximo uso lógico do Neuron.

Em `advisor`, assume que o utilizador pode colar resultados anteriores no próximo pedido.
Por isso, usa os títulos e estruturas do Neuron de forma estável para facilitar a continuação passo a passo.

Regras obrigatórias:
- Não inventes passos que não estejam sustentados no input.
- Se houver ambiguidades, lista-as explicitamente.
- Não recomendes tools não instaladas ou não listadas como disponíveis dentro de `AVAILABLE_NOW`.
- Se faltar uma capability importante, coloca-a em `RECOMMENDED_TO_ADD` e mantém o workflow vivo com um `FALLBACK_OUTPUT`.
- Se não houver tool de diagrama disponível, devolve pelo menos um fallback utilizável, como markdown estruturado, Mermaid ou JSON de especificação.
- Mantém separadas observações explícitas, inferências fortes e questões em aberto.
- O TO-BE tem de indicar triggers, inputs, outputs, owner e exceções para cada automação sugerida.

Se o modo for `auto`, devolve a resposta final nesta estrutura:

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

Se o modo for `advisor`, devolve apenas a etapa executada agora e termina com esta estrutura:

# Neuron Advisor

## 1. Current mode
Indica explicitamente `Advisor`.

## 2. Completed now
Indica qual dos quatro passos foi executado nesta resposta.

## 3. Output
Inclui apenas o output do agente executado agora.

## 4. Why this is the next best step
Explica porque este era o passo certo neste momento.

## 5. Suggested next step
Indica exatamente qual o próximo passo do pipeline e sugere ao utilizador que confirme antes de continuar.

## 6. Continue with
Dá o comando recomendado para a próxima interação, por exemplo:
- `/neuron-analisar-reuniao advisor [colar output anterior + contexto adicional]`
- `/neuron analisar-reuniao advisor [colar output anterior + contexto adicional]`
