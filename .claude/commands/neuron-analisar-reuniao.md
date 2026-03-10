---
description: Analisa uma transcrição de reunião e devolve um diagnóstico inicial curto e claro
argument-hint: [transcrição ou resumo estruturado da reunião]
---

Lê este input e devolve apenas um diagnóstico inicial do processo:

$ARGUMENTS

Objetivo:
- não devolver um relatório completo;
- não correr o pipeline inteiro;
- não produzir capability routing nesta fase;
- não produzir TO-BE nesta fase;
- focar em clareza e utilidade imediata.

Regras obrigatórias:
- máximo 4 secções;
- sem JSON;
- sem tabelas;
- sem capability routing;
- sem TO-BE;
- sem lista extensa de riscos;
- usar linguagem direta e curta;
- o resumo deve ter 2 a 4 linhas;
- as oportunidades devem ser práticas e priorizadas por impacto;
- a recomendação deve dizer qual é o passo mais sensato agora;
- o próximo passo deve ser uma ação concreta.

Se o input estiver incompleto:
- faz o melhor diagnóstico inicial possível;
- evita fingir detalhe que não existe;
- usa a recomendação e o próximo passo para indicar a clarificação mais útil.

Devolve exatamente nesta estrutura:

# Neuron

## Resumo
[2-4 linhas a explicar o processo atual e o principal problema]

## Top oportunidades
1. [oportunidade] — [impacto]
2. [oportunidade] — [impacto]
3. [oportunidade] — [impacto]

## Recomendação
[qual é o passo mais sensato neste momento]

## Próximo passo
[uma ação concreta]
