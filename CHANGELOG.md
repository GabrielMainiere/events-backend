# Changelog - Sistema de Gerenciamento de Eventos

Este documento registra as principais mudanças e evoluções do sistema.

---

## [2.0.0] - Segunda Etapa - 2025

### Principais Mudanças

#### Mensageria com RabbitMQ
- **Adicionado**: RabbitMQ como message broker para comunicação assíncrona
- **Migração**: Substituição de gRPC por RabbitMQ em fluxos assíncronos
- **Benefícios**: Maior desacoplamento, resiliência e escalabilidade

#### Arquitetura Hexagonal e DDD
- **Reestruturação**: 3 microsserviços migrados para Arquitetura Hexagonal
  - MS Notifications (NestJS)
  - MS Events (NestJS)
  - MS Currency (Spring Boot)
- **Implementação**: Domain-Driven Design com Aggregates, Value Objects, Entities
- **Benefícios**: Isolamento do domínio, maior testabilidade, independência de frameworks

### Microsserviços Atualizados

#### MS Notifications
- Arquitetura Hexagonal implementada
- RabbitMQ Consumer (substitui gRPC)
- Domain Layer: NotificationAggregate, Email VO, Factories
- Mantém Strategy + Decorator patterns

#### MS Events
- Arquitetura Hexagonal implementada
- RabbitMQ Publisher para eventos de domínio
- Domain Layer: Event Entity, Value Objects (Capacity, EventDate, Price)
- Mantém Builder pattern

#### MS Currency
- Arquitetura Hexagonal implementada
- RabbitMQ Publisher para notificações
- Domain Layer: CurrencyPrice Entity, Value Objects (CurrencyCode, Price)
- Scheduler para sincronização periódica

#### MS Users
- RabbitMQ Producer adicionado
- Publica eventos de notificação para MS Notifications

#### MS Events Registration
- RabbitMQ Consumer adicionado
- Consome eventos de MS Events
- Mantém gRPC para operações síncronas

### Comunicação Entre Serviços

#### Antes (Primeira Etapa)
```
MS Users → MS Notifications: gRPC
MS Events → MS Registration: gRPC
MS Registration → MS Payments: gRPC
```

#### Depois (Segunda Etapa)
```
MS Users → RabbitMQ → MS Notifications: Assíncrono (eventos de notificação)
MS Events → RabbitMQ → MS Registration: Assíncrono (eventos de capacidade)
MS Currency → RabbitMQ → MS Payments: Assíncrono (eventos de cotação)

MS Registration → MS Users: gRPC (validação síncrona)
MS Events → MS Registration: gRPC (consulta de inscritos)
```

### Diagramas Atualizados

- Diagrama de Contexto (C4 Level 1)
- Diagrama de Contêineres (C4 Level 2)
- Diagrama de Componentes - MS Notifications (C4 Level 3)
- Diagrama de Componentes - MS Events (C4 Level 3)
- Diagrama de Componentes - MS Currency (C4 Level 3)

### Documentação Atualizada

- `README.md`: Adicionadas informações sobre RabbitMQ e Hexagonal
- `ARCHITECTURE.md`: Nova seção sobre evolução arquitetural, DDD e Hexagonal
- `DIAGRAMS.md`: Descrições atualizadas com destaques da arquitetura hexagonal

### Novos Componentes

- **RabbitMQ**: Message broker com management console (http://localhost:15672)
- **Exchanges e Filas**:
  - `notifications_exchange` + `notifications.dispatch`
  - Dead Letter Queue (DLQ) para retry automático

### Tecnologias Mantidas

- NestJS (TypeScript) para microsserviços Node.js
- Spring Boot (Java) para MS Payments e MS Currency
- PostgreSQL (Database per Service)
- Kong API Gateway
- GraphQL para comunicação com frontend
- Docker e Docker Compose

---

## [1.0.0] - Primeira Etapa - 2025

### Implementação Inicial

#### Arquitetura Base
- Arquitetura de microsserviços
- 6 microsserviços independentes
- Kong API Gateway como ponto único de entrada
- Database per Service (PostgreSQL)

#### Comunicação
- GraphQL para frontend
- gRPC para comunicação entre microsserviços
- JWT para autenticação

#### Padrões de Projeto (GoF)
- Singleton (PrismaClient)
- Strategy (Envio de notificações, Gateways de pagamento)
- Factory (Criação de estratégias)
- Builder (Construção de eventos)
- Decorator (Logs, retry, performance)

#### Microsserviços Implementados
- MS Users (autenticação, roles)
- MS Events (CRUD de eventos)
- MS Events Registration (inscrições, check-in)
- MS Payments (Mercado Pago, Stripe)
- MS Notifications (email via SMTP)
- MS Currency (cotações de moedas)

#### Documentação
- Diagramas C4 (Contexto, Contêineres, Componentes, Código)
- Guia da API GraphQL
- Decisões arquiteturais

---