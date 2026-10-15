---
title: Plataforma de vagas com chat entre candidato e recrutador
summary: Publicação e busca de vagas, candidatura, acompanhamento do processo seletivo e conversa direta entre candidato e recrutador.
order: 4
draft: true # [PREENCHER] stack e diferenciais específicos antes de publicar
role: '[PREENCHER]'
mockup: jobs
stack: ['[PREENCHER]']
highlights:
  - Máquinas de estado para vagas e candidaturas
  - Mensageria em tempo real entre candidato e recrutador
  - Dados pessoais de candidatos protegidos por LGPD
---

## Contexto

Empresas queriam um canal próprio para divulgar vagas e conversar com candidatos, no estilo de uma rede profissional, mas focado exclusivamente em recrutamento.

## Problema

- Candidatos não sabiam em que etapa do processo estavam.
- A conversa com recrutadores acontecia fora da plataforma, sem histórico.
- Currículos e dados pessoais circulavam sem controle de acesso.

## Solução

Uma plataforma com publicação e busca de vagas, candidatura, acompanhamento do status do processo seletivo e chat entre candidato e recrutador.

## Decisões técnicas

1. **Máquinas de estado para vagas e candidaturas.** Uma vaga só passa por estados válidos (rascunho, publicada, encerrada) e cada candidatura segue as etapas do processo, sempre com histórico.
2. **Mensageria em tempo real** entre candidato e recrutador, com o histórico vinculado à candidatura.
3. **Controle de acesso por perfil.** Candidato e empresa têm permissões distintas; uma empresa só vê candidatos das próprias vagas.
4. **Proteção de dados pessoais (LGPD).** Exposição mínima de dados do candidato, acesso registrado e finalidade definida para cada informação.

## Resultado

[PREENCHER: resultado e uso da plataforma]
