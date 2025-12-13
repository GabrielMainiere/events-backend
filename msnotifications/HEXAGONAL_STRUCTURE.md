# MS Notifications - Estrutura Hexagonal

Esta é a estrutura completa do microsserviço MS Notifications seguindo **Arquitetura Hexagonal (Ports & Adapters)** e **Domain-Driven Design (DDD)**.

---

## Estrutura de Pastas

```
src/
├── main.ts                                    # Bootstrap da aplicação
├── schema.gql                                 # Schema GraphQL
│
├── common/                                    # Utilitários compartilhados
│   ├── auth.decorators.ts
│   ├── auth.guard.ts
│   ├── auth.provider.ts
│   └── roles.enum.ts
│
└── Hexagonal/                                 # ARQUITETURA HEXAGONAL
    │
    ├── domain/                                # ═══════════════════════════════
    │   │                                      # CAMADA INTERNA (NÚCLEO)
    │   │                                      # - Não depende de nada externo
    │   │                                      # - Lógica de negócio pura
    │   │                                      # ═══════════════════════════════
    │   │
    │   ├── aggregates/                        # Aggregate Roots (DDD)
    │   │   └── notification.aggregate.ts      # NotificationAggregate (raiz)
    │   │
    │   ├── entities/                          # Entidades do domínio
    │   │   ├── template.entity.ts             # Template (email templates)
    │   │   └── user-preference.entity.ts      # UserPreference (config usuário)
    │   │
    │   ├── value-objects/                     # Value Objects (imutáveis)
    │   │   └── email.vo.ts                    # Email VO (validação)
    │   │
    │   ├── enums/                             # Enums do domínio
    │   │   ├── notification-channel.enum.ts   # EMAIL, SMS, PUSH
    │   │   ├── notification-status.enum.ts    # PENDING, SENT, FAILED
    │   │   └── notification-type.enum.ts      # ACCOUNT, REGISTRATION, PAYMENT
    │   │
    │   ├── factories/                         # Factories (criação de entidades)
    │   │   ├── notification.factory.ts        # NotificationFactory
    │   │   ├── template.factory.ts            # TemplateFactory
    │   │   ├── user-preference.factory.ts     # UserPreferenceFactory
    │   │   └── types/                         # Tipos para factories
    │   │       ├── notification.types.ts      # Tipos de NotificationFactory
    │   │       ├── template.types.ts          # Tipos de TemplateFactory
    │   │       └── user-preference.type.ts    # Tipos de UserPreferenceFactory
    │   │
    │   ├── helper/                            # Helpers do domínio
    │   │   └── notification-type.helper.ts    # Lógica auxiliar de tipos
    │   │
    │   ├── repositories/                      # PORTS OUT (Interfaces)
    │   │   ├── notification-repository.interface.ts
    │   │   ├── template-repository.interface.ts
    │   │   └── user-preference-repository.interface.ts
    │   │
    │   └── services/                          # Domain Services
    │       ├── notification-processor.service.ts      # Processa notificações
    │       ├── template-rendering.service.ts          # Renderiza templates
    │       ├── user-preference-permission.service.ts  # Valida permissões
    │       └── interface/
    │           ├── template-renderer.interface.ts
    │           └── user-preference-permission.interface.ts
    │
    ├── application/                           # ═══════════════════════════════
    │   │                                      # CAMADA MÉDIA (ORQUESTRAÇÃO)
    │   │                                      # - Use Cases (casos de uso)
    │   │                                      # - Coordena domínio + infra
    │   │                                      # ═══════════════════════════════
    │   │
    │   ├── dtos/                              # Data Transfer Objects
    │   │   ├── notifications/
    │   │   │   ├── notification.response.ts           # DTO de resposta
    │   │   │   └── process-notification.command.ts    # Command para processar
    │   │   │
    │   │   ├── templates/
    │   │   │   ├── create-template.command.ts         # Command criar template
    │   │   │   ├── template.response.ts               # DTO resposta template
    │   │   │   └── update-template.command.ts         # Command atualizar
    │   │   │
    │   │   └── user-preferences/
    │   │       ├── upsert-user-preference.command.ts  # Command upsert
    │   │       └── user-preference.response.ts        # DTO resposta
    │   │
    │   ├── mappers/                           # Mapeadores (Domain ↔ DTO)
    │   │   ├── notification.mapper.ts         # NotificationAggregate ↔ DTO
    │   │   ├── template.mapper.ts             # Template ↔ DTO
    │   │   └── user-preference.mapper.ts      # UserPreference ↔ DTO
    │   │
    │   ├── ports/                             # Definição de Ports
    │   │   ├── input/                         # PORTS IN (Use Cases)
    │   │   │   ├── notifications/
    │   │   │   │   └── process-notification.port.ts
    │   │   │   │
    │   │   │   ├── templates/
    │   │   │   │   ├── create-template.port.ts
    │   │   │   │   ├── delete-template.port.ts
    │   │   │   │   ├── get-template.port.ts
    │   │   │   │   ├── list-templates.port.ts
    │   │   │   │   └── update-template.port.ts
    │   │   │   │
    │   │   │   └── user-preferences/
    │   │   │       ├── get-user-preferences.port.ts
    │   │   │       └── upsert-user-preference.port.ts
    │   │   │
    │   │   └── output/                        # PORTS OUT (Adapters externos)
    │   │       ├── email-gateway.port.ts      # Port para envio de email
    │   │       ├── notification-strategy.port.ts  # Port para estratégias
    │   │       ├── sms-gateway.ts             # Port para SMS
    │   │       └── strategy-factory.port.ts   # Port para factory de estratégias
    │   │
    │   └── use-cases/                         # Implementação dos Use Cases
    │       ├── notifications/
    │       │   └── process-notification.use-case.ts
    │       │
    │       ├── templates/
    │       │   ├── create-template.use-case.ts
    │       │   ├── delete-template.use-case.ts
    │       │   ├── get-by-id-template.use-case.ts
    │       │   ├── list-template.use-case.ts
    │       │   └── update-template.use-case.ts
    │       │
    │       └── user-preferences/
    │           ├── get-user-preference.use-case.ts
    │           └── upsert-user-preference.use-case.ts
    │
    └── infrastructure/                        # ═══════════════════════════════
        │                                      # CAMADA EXTERNA (DETALHES TÉCNICOS)
        │                                      # - Implementa os Ports
        │                                      # - Frameworks e tecnologias
        │                                      # ═══════════════════════════════
        │
        ├── adapters/                          # Adapters (implementações)
        │   │
        │   ├── input/                         # ADAPTERS INPUT (Drivers)
        │   │   │                              # Recebem requisições externas
        │   │   │
        │   │   ├── graphql/                   # Adapter GraphQL
        │   │   │   ├── template.resolver.ts
        │   │   │   ├── user-preference.resolver.ts
        │   │   │   │
        │   │   │   ├── enums/
        │   │   │   │   └── register-enums.ts      # Enums GraphQL
        │   │   │   │
        │   │   │   ├── input/
        │   │   │   │   ├── create-template.input.ts
        │   │   │   │   ├── update-template.input.ts
        │   │   │   │   └── upsert-user-preference.input.ts
        │   │   │   │
        │   │   │   └── types/
        │   │   │       ├── template.type.ts
        │   │   │       └── user-preference.type.ts
        │   │   │
        │   │   └── messaging/                 # Adapter RabbitMQ
        │   │       ├── notification.consumer.ts      # Consumer (EventPattern)
        │   │       └── config/
        │   │           ├── constants.ts              # Constantes RabbitMQ
        │   │           └── rabbitMQ.config.ts        # Config RabbitMQ
        │   │
        │   └── output/                        # ADAPTERS OUTPUT (Driven)
        │       │                              # Implementam interfaces do domain
        │       │
        │       ├── email/                     # Email Gateway
        │       │   └── nodemailer-email.gateway.ts   # Implementação Nodemailer
        │       │
        │       ├── notification-channels/     # Notification Channels (Strategy + Decorator)
        │       │   ├── strategy.factory.ts    # Factory de estratégias
        │       │   │
        │       │   ├── decorators/            # Decorator Pattern
        │       │   │   ├── audit-log.decorator.ts
        │       │   │   ├── performance-log.decorator.ts
        │       │   │   └── retry.decorator.ts
        │       │   │
        │       │   └── strategies/            # Strategy Pattern
        │       │       ├── email.strategy.ts
        │       │       ├── push.strategy.ts
        │       │       └── sms.strategy.ts
        │       │
        │       ├── persistence/               # Persistence (Prisma)
        │       │   ├── mappers/               # Mappers Prisma ↔ Domain
        │       │   │   ├── prisma-notification.mapper.ts
        │       │   │   ├── prisma-template.mapper.ts
        │       │   │   └── prisma-user-preference.mapper.ts
        │       │   │
        │       │   └── prisma/
        │       │       ├── prisma-client.singleton.ts    # Singleton do Prisma
        │       │       │
        │       │       └── repositories/
        │       │           ├── prisma-notification.repository.ts
        │       │           ├── prisma-template.repository.ts
        │       │           └── prisma-user-preference.repository.ts
        │       │
        │       └── template-engine/           # Template Engine (Handlebars)
        │           └── handlebars-template-renderer.ts
        │
        └── modules/                           # NestJS Modules (DI)
            ├── app.module.ts                  # Módulo principal
            ├── graphql.module.ts              # Config GraphQL
            ├── notification.module.ts         # Módulo de notificações
            ├── rabbitmq.module.ts             # Módulo RabbitMQ
            ├── template.module.ts             # Módulo de templates
            └── user-preference.module.ts      # Módulo de preferências
```

---

## Camadas da Arquitetura Hexagonal

### 1**Domain** (Núcleo)
- **Responsabilidade**: Lógica de negócio pura
- **Dependências**: Nenhuma (independente de frameworks)
- **Conteúdo**: Entidades, Value Objects, Aggregates, Domain Services, Interfaces (Ports)

### 2**Application** (Orquestração)
- **Responsabilidade**: Casos de uso, coordena domínio e infraestrutura
- **Dependências**: Apenas Domain
- **Conteúdo**: Use Cases, DTOs, Mappers

### **Infrastructure** (Detalhes Técnicos)
- **Responsabilidade**: Implementações concretas (Prisma, NestJS, RabbitMQ, SMTP)
- **Dependências**: Domain e Application
- **Conteúdo**: Adapters (Input/Output), Modules, Configurações

---

## Padrões de Projeto Implementados

| Padrão | Localização | Descrição |
|--------|-------------|-----------|
| **Singleton** | `infrastructure/adapters/output/repositories/` | PrismaClient (instância única) |
| **Strategy** | `infrastructure/adapters/output/notification/strategies/` | EmailStrategy (troca algoritmo de envio) |
| **Decorator** | `infrastructure/adapters/output/notification/decorators/` | Adiciona funcionalidades (retry, logs) |
| **Factory** | `domain/factories/` e `infrastructure/adapters/output/notification/factories/` | Cria entidades e strategies |

---

## Fluxo de Dados

### Exemplo: Processar Notificação via RabbitMQ

```
RabbitMQ (mensagem)
    ↓
[INPUT ADAPTER] notification.consumer.ts (@EventPattern)
    ↓
[USE CASE] process-notification.use-case.ts (O Orquestrador) 
            ↓
        [PORT OUT] TemplateRepository (Busca Template)
            ↓
        [DOMAIN SERVICE] UserPreferencePermissionService (Verifica Permissão)
            ↓
        [FACTORY] NotificationFactory (Cria o Aggregate)
            ↓
        [DOMAIN SERVICE] NotificationProcessorService (Regra de Negócio: Iniciar/Renderizar)
            ↓
        [PORT OUT] NotificationRepository (Salva PENDING)
            ↓
        [OUTPUT ADAPTER] StrategyFactory + Decorators (Envia o Email/SMS)
            ↓
        [PORT OUT] NotificationRepository (Atualiza para SENT)
    ↓
PostgreSQL
```

---

## Benefícios

- **Testabilidade**: Domínio testável sem mocks de Prisma/NestJS
- **Manutenibilidade**: Mudanças em infra não afetam domínio
- **Independência**: Domínio não conhece frameworks
- **Flexibilidade**: Fácil trocar adapters (ex: Prisma → TypeORM)

---
