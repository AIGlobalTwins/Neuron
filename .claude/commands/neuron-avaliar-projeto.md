---
description: Avalia um projeto, ideia, repositório ou transcrição e separa capabilities em AVAILABLE_NOW, RECOMMENDED_TO_ADD e FALLBACK_OUTPUTS
argument-hint: [descrição livre do projeto, objetivo, repo ou contexto]
---

Usa o subagent `project-evaluator` para avaliar este projeto/ideia:

$ARGUMENTS

Instruções obrigatórias:
1. Se existir repositório ou contexto local, inspeciona-o antes de recomendar.
2. Se o utilizador tiver listado agents, skills, plugins, connectors, slash commands ou ferramentas MCP disponíveis, trata essa lista como inventário oficial.
3. Usa sempre o modelo de 3 níveis do Neuron:
   - `AVAILABLE_NOW`
   - `RECOMMENDED_TO_ADD`
   - `FALLBACK_OUTPUTS`
4. Nunca coloques uma capability não confirmada dentro de `AVAILABLE_NOW`.
5. Se uma capability importante não existir, recomenda-a em `RECOMMENDED_TO_ADD` e define o respetivo `FALLBACK_OUTPUT` executável.
6. Se faltar inventário, faz a melhor avaliação possível com base no contexto disponível e assinala claramente a limitação.
7. Se o input for uma transcrição de reunião, ativa transcript-aware mode.
8. Mantém a resposta curta, direta e orientada à decisão.
9. Não devolvas classificação longa, taxonomy excessiva, nem listas grandes.
10. Devolve a resposta exatamente nesta estrutura:

# Neuron Evaluation

## Resumo
## O que já existe
## O que falta
## Fallback agora
## Próximo passo

Se o input do utilizador for curto, incompleto ou vago, faz uma avaliação provisória e assume a menor complexidade razoável.
