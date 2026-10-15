---
title: Agenda corporativa com lembretes via WhatsApp
summary: Agenda para secretárias e supervisores com disparo automático de avisos de compromisso pelo WhatsApp.
order: 6
draft: true # [PREENCHER] stack e diferenciais antes de publicar
role: '[PREENCHER]'
mockup: agenda
stack: ['[PREENCHER]']
highlights:
  - Filas e agendamento de envios
  - Sessão do WhatsApp persistente com reconexão
  - Prevenção de envios duplicados
---

## Contexto

Secretárias gerenciavam a agenda de supervisores e avisavam cada compromisso manualmente, uma mensagem por vez.

## Problema

- Lembretes esquecidos ou enviados fora de hora.
- Mensagens duplicadas quando alguém reenviava "por garantia".
- Secretárias e supervisores precisam de permissões diferentes.

## Solução

Uma agenda compartilhada em que cada compromisso agenda automaticamente o aviso pelo WhatsApp para o horário certo.

## Decisões técnicas

1. **Filas e agendamento de envios.** Cada lembrete vira um job agendado, com retentativa em caso de falha.
2. **Persistência e reconexão da sessão do WhatsApp.** A sessão sobrevive a reinícios do servidor e se reconecta sozinha, sem novo pareamento.
3. **Perfis de acesso.** Secretária gerencia agendas; supervisor acompanha os próprios compromissos.
4. **Prevenção de envios duplicados.** Chave de idempotência por compromisso e horário, para que o mesmo aviso nunca seja enviado duas vezes.

## Resultado

[PREENCHER: resultado e uso]
