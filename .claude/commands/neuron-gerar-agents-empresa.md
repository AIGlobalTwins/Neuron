---
description: Analisa uma empresa, identifica departamentos relevantes e gera agents especializados em Markdown
argument-hint: [descrição da empresa, transcrição ou discovery notes]
---

Usa este input para gerar a estrutura de agents por empresa:

$ARGUMENTS

Fluxo obrigatório:
1. Usa `company-analyzer` para identificar empresa, departamentos, desafios e oportunidades.
2. Para cada departamento relevante, usa `as-is-mapper` para resumir o estado atual.
3. Para cada departamento relevante, usa `to-be-mapper` apenas para desenhar uma visão futura operacional sucinta.
4. Usa `opportunity-analyzer` para listar oportunidades de automação por departamento.
5. Usa `department-agent-designer` para criar um agent Markdown para cada departamento que realmente precise de melhoria operacional.
6. Guarda primeiro uma memória canónica da empresa em `company-data/<company-slug>/company-context.md` e usa-a como source of truth para os agents.

Regras obrigatórias:
- cria ficheiros apenas quando existe justificação operacional;
- não dupliques departamentos com responsabilidades sobrepostas;
- prefere um agent forte por departamento a vários agents redundantes;
- resolve sempre o department para uma canonical key estável antes de criar ficheiros;
- usa naming determinístico no formato `<canonical-key>-agent.md`;
- prefere merge para funções parciais como collections, sales ops, people ops ou revops quando não houver separação operacional clara;
- guarda os agents em `agents/generated/<company-slug>/`;
- guarda contexto reutilizável da empresa em `company-data/<company-slug>/`;
- trata `company-context.md` como memória canónica, não como resumo solto;
- separa sempre factos validados de hipóteses de trabalho;
- preserva nomes estáveis de ficheiro, por exemplo `sales-agent.md`, `finance-agent.md`;
- se um department agent não for necessário, explica porquê.

Deliverables mínimos:
- `company-data/<company-slug>/company-context.md`
- um ou mais ficheiros em `agents/generated/<company-slug>/`
- resumo final com departamentos gerados e rationale
