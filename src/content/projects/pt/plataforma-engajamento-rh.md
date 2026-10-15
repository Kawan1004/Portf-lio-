---
title: Plataforma SaaS B2B de engajamento e compliance de RH
summary: Plataforma multi-tenant que une gamificação, bem-estar com privacidade forte e integrações com folha, ponto e ERP — web e apps nativos.
order: 1
role: Dev principal e product owner
mockup: engagement
stack: [React, Node.js, PostgreSQL, Capacitor, AES-256-GCM]
highlights:
  - Ledger imutável de pontos com regras paramétricas
  - Marketplace de conectores com credenciais criptografadas e proteção SSRF
  - Bem-estar com k-anonimato e consentimento LGPD
---

## Contexto

Empresas de médio porte precisavam engajar colaboradores e, ao mesmo tempo, cumprir a atualização da NR-1, que passou a exigir a gestão de riscos psicossociais. As ferramentas existentes resolviam só uma parte do problema e não conversavam com os sistemas de RH já em uso.

## Problema

- Cada cliente tem regras próprias de reconhecimento e premiação.
- Dados de bem-estar são sensíveis: o RH precisa de indicadores, mas nunca pode identificar respostas individuais.
- Integrar folha de pagamento, ponto e ERP de dezenas de fornecedores sem virar um código diferente para cada um.
- O mesmo produto precisava ser vendido com a marca de parceiros.

## Solução

Uma plataforma multi-tenant com web e apps nativos Android/iOS (Capacitor), organizada em módulos: gamificação, bem-estar, vagas internas, previsões e um marketplace de integrações. A marca, as cores e os recursos de cada instalação white-label são definidos por variáveis de ambiente, sem fork de código.

## Decisões técnicas

1. **Ledger imutável de pontos.** Saldo é sempre derivado de lançamentos; nenhum valor é editado. Regras de pontuação são paramétricas por tenant, o que dá auditoria completa e permite estornos rastreáveis.
2. **Conectores com arquitetura reutilizável.** Cada integração é registrada de forma declarativa (credenciais, endpoints, mapeamento). A base comum cuida de credenciais criptografadas, validação de destino contra SSRF, rate limiting e retentativas.
3. **Privacidade no módulo de bem-estar.** Respostas cifradas com AES-256-GCM, consentimento LGPD explícito e relatórios agregados com k-anonimato: grupos pequenos demais não são exibidos.
4. **Vagas internas com máquinas de estado.** Cada candidatura só transita por estados válidos, o que elimina inconsistências e simplifica a trilha de auditoria.
5. **Previsão por regressão** para antecipar tendências de engajamento e risco, apresentada como apoio à decisão, não como verdade absoluta.

## Resultado

Um produto único que atende clientes diretos e parceiros white-label, com integrações novas entrando por configuração em vez de código específico, e com um modelo de privacidade que permite oferecer indicadores psicossociais aderentes à NR-1 sem expor ninguém.
