---
title: Sistema de gestão de vendas e comissões
summary: Controle de vendas e comissões com regras congeladas no momento da venda e pagamentos parciais conciliados por FIFO.
order: 7
role: Desenvolvedor full stack
mockup: commissions
stack: [React, Node.js, PostgreSQL]
highlights:
  - Snapshot da regra de comissão no momento da venda
  - Pagamento parcial conciliado por FIFO
---

## Contexto

Uma operação comercial calculava comissões em planilhas, com regras que mudavam ao longo do tempo e pagamentos feitos em parcelas.

## Problema

- Alterar a regra de comissão recalculava vendas antigas, gerando divergências.
- Pagamentos parciais não deixavam claro quais comissões já tinham sido quitadas.

## Solução

Um sistema web em React, Node.js e PostgreSQL que registra vendas, calcula comissões e concilia pagamentos de forma auditável.

## Decisões técnicas

1. **Snapshot de comissão congelado na venda.** Percentuais e regras são copiados para a venda no momento em que ela acontece; mudanças futuras não afetam o histórico.
2. **Pagamento parcial por FIFO.** Cada pagamento quita primeiro as comissões mais antigas, com rastreio de quanto de cada uma foi pago.

## Resultado

Comissões previsíveis e auditáveis: o valor de uma venda não muda depois de registrada, e qualquer pagamento pode ser explicado item a item.
