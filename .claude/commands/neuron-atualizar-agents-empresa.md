---
description: Atualiza agents gerados por empresa quando surgem novas informações, preservando contexto validado e evitando duplicação
argument-hint: [nova informação da empresa, transcrição ou update notes]
---

Usa este input para atualizar agents existentes:

$ARGUMENTS

Fluxo obrigatório:
1. Usa `neuron-orchestrator` para coordenar a sequência correta do pipeline.
2. Lê o contexto existente em `company-data/<company-slug>/` quando existir.
3. Identifica quais departments e agents são afetados pela nova informação.
4. Usa `department-agent-updater` para atualizar os ficheiros relevantes.
5. Atualiza `company-data/<company-slug>/company-context.md` como memória canónica, preservando factos validados e hipóteses separadas.
6. Regenera `ceo-agent.md` para refletir o novo estado dos department agents.

Regras obrigatórias:
- preserva informação validada;
- adiciona novo contexto sem destruir contexto útil existente;
- mantém `company-context.md` como source of truth para departments e agents existentes;
- não cries duplicados de agents existentes;
- se detectares sobreposição entre agents, recomenda merge em vez de duplicação;
- mantém naming determinístico por canonical key;
- cria um novo agent apenas quando o novo contexto justificar um novo domínio operacional.
- preserva o contrato curto dos department agents:
  - `## Departamento`
  - `## Problemas encontrados`
  - `## Melhorias recomendadas`
  - `## O que pode ser automatizado`
  - `## O que deve continuar manual`
  - `## Prioridade`
  - `## Dependências`
- em `## Prioridade`, garante sempre:
  - `impacto`
  - `complexidade`
  - `urgencia`
  - `decisao`
- regenera `ceo-agent.md` no formato board-ready:
  - `## Resumo executivo`
  - `## Principais problemas por departamento`
  - `## Melhorias prioritarias`
  - `## Dependencias criticas`
  - `## Quick wins`
  - `## Proximo passo recomendado`
- evita texto longo, repetição, e output em tom de ensaio.

Deliverables mínimos:
- lista de agents afetados;
- ação tomada por agent: keep / update / merge / create-new;
- ficheiros Markdown atualizados quando aplicável;
- `ceo-agent.md` atualizado quando houver mudanças relevantes.
- resumo final board-ready com:
  - agents afetados
  - principais mudanças
  - prioridades revistas
  - quick wins
  - próximo passo recomendado
