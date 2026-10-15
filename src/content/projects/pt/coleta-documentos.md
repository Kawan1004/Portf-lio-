---
title: Coleta de documentos por link seguro
summary: Link individual e seguro para cada destinatário enviar documentos, com acompanhamento do recebimento e trilha de auditoria.
order: 5
draft: true # [PREENCHER] stack e volume/uso antes de publicar
role: '[PREENCHER]'
mockup: documents
stack: ['[PREENCHER]']
highlights:
  - Token de uso único com expiração
  - Validação de upload por extensão, MIME type e tamanho
  - Armazenamento privado com trilha de auditoria
---

## Contexto

Solicitar documentos a clientes por e-mail ou mensagem gerava arquivos espalhados, versões perdidas e nenhum controle de quem enviou o quê.

## Problema

- Documentos pessoais trafegando por canais sem controle.
- Impossível saber, de forma confiável, o que já tinha sido recebido.
- Uploads abertos são um vetor clássico de ataque.

## Solução

Geração de um link seguro e individual para cada destinatário enviar os documentos solicitados, com painel de acompanhamento do recebimento.

## Decisões técnicas

1. **Links com token de uso único e expiração.** Tokens aleatórios e imprevisíveis, invalidados após o uso ou o prazo.
2. **Validação de upload em camadas.** Extensão em allowlist, conferência do MIME type real do arquivo e limite de tamanho, tudo no servidor.
3. **Armazenamento privado.** Arquivos fora de qualquer pasta pública, acessíveis só por usuários autorizados.
4. **Controle de acesso e trilha de auditoria.** Cada geração de link, envio e visualização fica registrada.

## Resultado

[PREENCHER: volume e uso]
