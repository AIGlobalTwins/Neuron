---
description: Atualiza agents gerados por empresa quando surgem novas informações, preservando contexto validado e evitando duplicação
argument-hint: [nova informação da empresa, transcrição ou update notes]
---

Usa este input para atualizar agents existentes:

$ARGUMENTS

Fluxo obrigatório:
1. Lê o contexto existente em `company-data/<company-slug>/` quando existir.
2. Identifica quais departments e agents são afetados pela nova informação.
3. Usa `department-agent-updater` para atualizar os ficheiros relevantes.
4. Atualiza `company-data/<company-slug>/company-context.md` como memória canónica, preservando factos validados e hipóteses separadas.
5. Regenera `ceo-agent.md` para refletir o novo estado dos department agents.

Regras obrigatórias:
- preserva informação validada;
- adiciona novo contexto sem destruir contexto útil existente;
- mantém `company-context.md` como source of truth para departments e agents existentes;
- não cries duplicados de agents existentes;
- se detectares sobreposição entre agents, recomenda merge em vez de duplicação;
- mantém naming determinístico por canonical key;
- cria um novo agent apenas quando o novo contexto justificar um novo domínio operacional.

Deliverables mínimos:
- lista de agents afetados;
- ação tomada por agent: keep / update / merge / create-new;
- ficheiros Markdown atualizados quando aplicável.
- `ceo-agent.md` atualizado quando houver mudanças relevantes.
