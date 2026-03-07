---
description: Avalia um projeto, ideia, repositório ou transcrição com o fluxo Neuron dentro do Claude Code
argument-hint: [descrição livre do projeto, objetivo, repo ou contexto]
---

Usa o subagent `project-evaluator` para avaliar este projeto/ideia:

$ARGUMENTS

Instruções obrigatórias:
1. Se existir repositório ou contexto local, inspeciona-o antes de recomendar.
2. Se o utilizador tiver listado agents, skills, plugins, slash commands ou ferramentas MCP disponíveis, trata essa lista como inventário oficial.
3. Nunca recomendes capacidades que não estejam visíveis, instaladas ou explicitamente listadas.
4. Se faltar inventário, faz a melhor avaliação possível com base no contexto disponível e assinala claramente a limitação.
5. Se o input for uma transcrição de reunião, ativa transcript-aware mode.
6. Devolve a resposta exatamente nesta estrutura:

# Neuron Evaluation

## 1. Project summary
## 2. Classification
## 3. What this project actually needs
## 4. Recommended capabilities
## 5. Capabilities to avoid or defer
## 6. Suggested execution order
## 7. Gaps and missing context
## 8. Next best action

Se o input do utilizador for curto, incompleto ou vago, faz uma avaliação provisória e assume a menor complexidade razoável.
