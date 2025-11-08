# Decisões Arquiteturais e Técnicas

Este documento detalha as principais decisões arquiteturais tomadas durante o desenvolvimento do sistema.

---

## Índice

1. [Arquitetura de Microsserviços](#arquitetura-de-microsserviços)
2. [Escolha de Tecnologias](#escolha-de-tecnologias)
3. [Comunicação Entre Serviços](#comunicação-entre-serviços)
4. [Gerenciamento de Dados](#gerenciamento-de-dados)
5. [Segurança](#segurança)

---

## Arquitetura de Microsserviços

### Decisão: Por que Microsserviços?

**Escolha**: Arquitetura de microsserviços

**Justificativa**:
- **Escalabilidade Independente**: Cada serviço pode escalar conforme demanda específica
- **Desenvolvimento Paralelo**: Times podem trabalhar em serviços diferentes simultaneamente
- **Tecnologias Heterogêneas**: Possibilidade de usar diferentes stacks (NestJS e Spring Boot)
- **Resiliência**: Falha em um serviço não derruba o sistema completo

**Trade-offs**:
- Complexidade operacional maior
- Necessidade de comunicação inter-serviços
- Transações distribuídas mais complexas

### Divisão de Responsabilidades

#### MS Users
**Responsabilidade**:
- Autenticação e autorização
- Gerenciamento de usuários
- Controle de roles e permissões


#### MS Events
**Responsabilidade**:
- CRUD de eventos
- Validações de capacidade
- Controle de status

#### MS Events Registration
**Responsabilidade**:
- Processamento de registros
- Check-in de participantes
- Validações de disponibilidade

#### MS Payments
**Responsabilidade**:
- Integração com gateways
- Processamento de pagamentos
- Webhooks de status


#### MS Notifications
**Responsabilidade**:
- Envio de emails
- Gerenciamento de templates
- Processamento assíncrono

**Justificativa**:
- Processamento assíncrono não bloqueia operações críticas
- Permite retry sem afetar outros serviços
- Facilita implementação de novos canais

---

## Escolha de Tecnologias
- NestJS (TypeScript) - Microsserviços Node.js
- Spring Boot (Java) - MS Payments
- PostgreSQL - Bancos de Dados
- Kong API Gateway

---

## Comunicação Entre Serviços

### GraphQL para Frontend

**Escolha**: GraphQL ao invés de REST

**Justificativa**:
- Cliente solicita apenas dados necessários (menos over-fetching)
- Schema strongly-typed facilita desenvolvimento
- Documentação automática (GraphQL Playground)
- Mutations e queries em único endpoint

### gRPC para Comunicação Interna

**Escolha**: gRPC para comunicação entre microsserviços

**Justificativa**:
- Performance superior a REST (Protocol Buffers binário)
- Strongly-typed contracts (arquivos .proto)
- Suporte a streaming bidirecional
- Ideal para comunicação interna

**Exemplo**:
- MS Registration → MS Payments (solicitar pagamento)
- MS Events → MS Registration (consultar total de inscritos)
- Qualquer MS → MS Notifications (enviar notificação)

---

## Gerenciamento de Dados

### Database per Service Pattern

**Escolha**: Cada microsserviço tem seu próprio banco de dados

**Justificativa**:
- Isolamento completo de dados
- Cada serviço pode escolher schema ideal
- Facilita escalabilidade independente
- Evita acoplamento por banco de dados

### Prisma ORM (TypeScript)

**Escolha**: Prisma para microsserviços NestJS

**Justificativa**:
- Type-safety end-to-end
- Migrations automáticas
- Performance excelente

### JPA/Hibernate (Java)

**Escolha**: JPA/Hibernate para MS Payments

**Justificativa**:
- Padrão enterprise estabelecido
- Integração nativa com Spring Boot

---

### Estratégia de Cache

**Implementado**:
- MS Payments: Cache de eventos e usuários (evita chamadas gRPC)
- MS Events: Contagem de inscritos em cache

---

## Segurança

### Autenticação JWT

**Escolha**: JWT (JSON Web Tokens) para autenticação

**Justificativa**:
- Stateless
- Escalável horizontalmente
- Claims customizados (userId, roles)
- Suporte nativo no Kong

**Implementação**:
```
1. User faz login → MS Users gera JWT
2. Cada requisição envia JWT no header
3. Kong valida JWT antes de rotear
4. Plugin injeta claims no header para microsserviços
```

### Containerização

**Escolha**: Docker para todos os serviços

**Justificativa**:
- Ambiente consistente dev/prod
- Fácil deploy
- Isolamento de dependências
