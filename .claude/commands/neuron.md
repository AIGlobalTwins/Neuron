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
- `gerar-agents-empresa`
- `atualizar-agents-empresa`
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
- mantém o output curto, direto e orientado à decisão;
- não devolvas classificação longa, taxonomy excessiva, nem listas grandes.

Devolve exatamente nesta estrutura:

# Neuron Evaluation

## Resumo
## O que já existe
## O que falta
## Fallback agora
## Próximo passo

Se a ação for `analisar-reuniao`:
- lê a transcrição ou resumo da reunião e devolve apenas um diagnóstico inicial;
- não inventes passos que não estejam sustentados no input;
- foca-te no processo atual e nas oportunidades mais óbvias;
- não devolvas capability routing;
- não devolvas JSON;
- mantém o output curto e claro.

Devolve exatamente nesta estrutura:

# Neuron

## Resumo
## Top oportunidades
## Recomendação
## Próximo passo

Se a ação for `gerar-agents-empresa`:
- usa `company-analyzer` para identificar departamentos relevantes, desafios e oportunidades;
- usa `opportunity-analyzer` por departamento para identificar necessidades de melhoria;
- usa `department-agent-designer` para gerar ficheiros Markdown em `agents/generated/<company-slug>/`;
- usa `ceo-agent-designer` para gerar `ceo-agent.md` com o report consolidado dos department agents;
- usa a pasta `skills/` como biblioteca de competências reutilizáveis;
- cria ou atualiza `company-data/<company-slug>/company-context.md` como memória canónica da empresa;
- usa `company-context.md` como source of truth para departments, hipóteses, decisões e agents existentes;
- resolve departments para canonical keys estáveis antes de criar ou atualizar ficheiros;
- usa naming determinístico no formato `<canonical-key>-agent.md`;
- evita agentes redundantes e prefere consolidar roles semelhantes.
- obriga cada department agent a devolver um formato curto e comparável:
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
- garante que o `ceo-agent.md` usa exatamente:
  - `## Resumo executivo`
  - `## Principais problemas por departamento`
  - `## Melhorias prioritarias`
  - `## Dependencias criticas`
  - `## Quick wins`
  - `## Proximo passo recomendado`
- no fim, devolve um resumo board-ready curto com:
  - empresa analisada
  - departamentos gerados
  - principais prioridades
  - quick wins
  - próximo passo recomendado
- evita texto longo e output em tom de ensaio.

Se a ação for `atualizar-agents-empresa`:
- lê contexto existente em `company-data/` e `agents/generated/`;
- identifica apenas os agents afetados;
- usa `department-agent-updater` para preservar informação validada e integrar novo contexto;
- atualiza primeiro a memória canónica da empresa e só depois os agents afetados;
- regenera o `ceo-agent.md` quando qualquer department agent mudar;
- preserva naming determinístico por canonical key;
- evita duplicação e recomenda merge quando houver sobreposição.

Se a ação for `help` ou estiver ausente:
- explica que o comando disponível no Claude Code é `/neuron`;
- mostra estes exemplos:
  - `/neuron avaliar-projeto Quero criar um SaaS com auth, billing e automações com IA.`
  - `/neuron analisar-reuniao Cliente: consultora imobiliária. Objetivo: reduzir trabalho manual em leads e follow-ups.`
  - `/neuron gerar-agents-empresa Empresa industrial B2B com equipas de vendas, finanças, RH e operações. [colar contexto]`
  - `/neuron atualizar-agents-empresa Nova informação da empresa: operações foi dividida entre logística e planeamento. [colar update]`
- pede ao utilizador que forneça uma destas ações antes do contexto.
