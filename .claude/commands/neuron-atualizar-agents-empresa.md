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
4. Atualiza `company-data/<company-slug>/company-context.md` com o novo contexto validado.

Regras obrigatórias:
- preserva informação validada;
- adiciona novo contexto sem destruir contexto útil existente;
- não cries duplicados de agents existentes;
- se detectares sobreposição entre agents, recomenda merge em vez de duplicação;
- cria um novo agent apenas quando o novo contexto justificar um novo domínio operacional.

Deliverables mínimos:
- lista de agents afetados;
- ação tomada por agent: keep / update / merge / create-new;
- ficheiros Markdown atualizados quando aplicável.
