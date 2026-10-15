---
title: Sistema multi-tenant de gestão de vistorias veiculares
summary: Plataforma de inspeções com agendamento, app de campo, checklists baseados em formulários oficiais, laudos em PDF, pagamentos e integração com ERP legado.
order: 2
role: Dev principal
mockup: inspection
stack: [React, Node.js, SQL Server, SQLite (WAL), Playwright]
highlights:
  - Checklists condicionais a partir de formulários oficiais
  - Sincronização bidirecional com outbox e change tracking
  - Múltiplas empresas na mesma plataforma, com níveis Master, Admin e Operador
---

## Contexto

Empresas de vistoria trabalham com formulários oficiais extensos, equipes em campo e um ERP legado que concentra o faturamento. Boa parte do processo era feita em papel e redigitada depois.

## Problema

- Formulários com dezenas de itens que mudam conforme o tipo de veículo e de vistoria.
- O ERP não tinha API: só banco SQL Server e uma interface web antiga.
- Vistoriadores, conferentes e gestores precisam ver coisas diferentes, e a mesma pessoa pode mudar de função.
- Várias empresas operando na mesma plataforma, cada uma com seus dados isolados.
- Inspeções feitas em campo por engenheiros e vistoriadores, longe do escritório.
- Cobrança e integração com outros sistemas dependiam de processos manuais.

## Solução

Um sistema multi-tenant que cobre o ciclo inteiro da inspeção:

- **Agendamento** das inspeções.
- **Várias empresas vinculadas** na mesma plataforma, com níveis de acesso Master, Admin e Operador.
- **Aplicativo de campo** para o engenheiro e o vistoriador responsáveis executarem a inspeção.
- **Checklist condicional** gerado a partir do formulário oficial e **laudo em PDF**.
- **Gateway de pagamentos** integrado à cobrança.
- **APIs** para integração com sistemas externos e sincronização bidirecional com o ERP.

## Decisões técnicas

1. **RBAC baseado em atribuição ativa.** Os níveis Master, Admin e Operador valem por empresa vinculada, e a permissão vem da atribuição vigente da pessoa; trocar de função ou de empresa não exige recriar usuários.
2. **Integração com ERP via SQL Server.** Gravações executadas como uma sequência de stored procedures, com controle de concorrência e uma tabela de correlação entre IDs internos e do ERP.
3. **Sincronização bidirecional.** Padrão outbox para envio confiável e change tracking do SQL Server para capturar alterações feitas no ERP.
4. **RPA com Playwright** para as etapas que só existem na interface web legada, isolado atrás da mesma interface dos demais conectores.
5. **SQLite em modo WAL** no armazenamento local, garantindo leituras concorrentes durante a sincronização.

## Resultado

Do agendamento ao pagamento em um só fluxo: a inspeção é registrada uma única vez no app de campo, o laudo sai na hora e tudo é refletido no ERP sem redigitação, mesmo sem o sistema legado oferecer API.
