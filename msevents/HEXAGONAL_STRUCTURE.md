# MS Events - Estrutura Hexagonal

Esta é a estrutura completa do microsserviço MS Events seguindo **Arquitetura Hexagonal (Ports & Adapters)** e **Domain-Driven Design (DDD)**.

---

## Estrutura de Pastas

```
src/
├── main.ts                                    # Bootstrap da aplicação
├── schema.gql                                 # Schema GraphQL
├── app.controller.ts                          # Controller principal
├── app.module.ts                              # Módulo raiz
├── app.service.ts                             # Service principal
│
├── auth/                                      # Módulo de autenticação
│   ├── auth.decorators.ts
│   ├── auth.guard.ts
│   ├── auth.module.ts
│   ├── auth.provider.ts
│   └── auth.service.ts
│
├── core/                                      # Utilitários compartilhados
│   ├── constants.ts
│   ├── environment.ts
│   ├── enum/
│   │   ├── eventChangeAction.ts               # Enums de mudanças
│   │   ├── registerEnums.ts                   # Enums de registro
│   │   └── roles.ts                           # Roles de usuários
│   └── prisma/
│       └── prismaSingleton.ts                 # Singleton do Prisma
│
└── modules/
    └── events/                                # MÓDULO EVENTS (HEXAGONAL)
        │
        ├── domain/                            # ═══════════════════════════════
        │   │                                  # CAMADA INTERNA (NÚCLEO)
        │   │                                  # - Não depende de nada externo
        │   │                                  # - Lógica de negócio pura
        │   │                                  # ═══════════════════════════════
        │   │
        │   ├── entities/                      # Entidades do domínio
        │   │   └── event.entity.ts            # Event (entidade principal)
        │   │
        │   ├── value-objects/                 # Value Objects (imutáveis)
        │   │   └── address.entity.ts          # Address VO (encapsula endereço)
        │   │
        │   ├── factories/                     # Factories (criação de entidades)
        │   │   └── builder/                   # Builder Pattern (GoF)
        │   │       ├── eventsBuilder.ts       # EventsBuilder (construção passo a passo)
        │   │       ├── eventDirector.ts       # EventDirector (coordena construção)
        │   │       └── IEventsBuilder.ts      # Interface do Builder
        │   │
        │   ├── services/                      # Domain Services
        │   │   └── priceValidation.ts         # Valida lógica de preços
        │   │
        │   └── ports/                         # PORTS (Interfaces)
        │       └── in/                        # PORTS IN (Use Cases)
        │           ├── createEvent.port.ts
        │           ├── updateEvent.port.ts
        │           ├── cancelEvent.port.ts
        │           ├── getEventById.port.ts
        │           └── findAllEvents.port.ts
        │
        ├── application/                       # ═══════════════════════════════
        │   │                                  # CAMADA MÉDIA (ORQUESTRAÇÃO)
        │   │                                  # - Use Cases (casos de uso)
        │   │                                  # - Coordena domínio + infra
        │   │                                  # ═══════════════════════════════
        │   │
        │   ├── dto/                           # Data Transfer Objects
        │   │   ├── address.input.ts           # DTO de endereço (input)
        │   │   ├── create-event.input.ts      # DTO criar evento
        │   │   ├── update-event-input.ts      # DTO atualizar evento
        │   │   └── cancel-event.input.ts      # DTO cancelar evento
        │   │
        │   ├── mappers/                       # Mapeadores (Domain ↔ DTO)
        │   │   ├── event.mapper.ts            # Event Entity ↔ DTO
        │   │   └── eventNotification.mapper.ts # Mapper para notificações
        │   │
        │   └── use-cases/                     # Implementação dos Use Cases
        │       ├── create-event.usecase.ts    # Criar evento
        │       ├── update-event.usecase.ts    # Atualizar evento
        │       ├── cancel-event.usecase.ts    # Cancelar evento
        │       ├── get-event-by-id.usecase.ts # Buscar por ID
        │       └── findAll-event.usecase.ts   # Listar eventos
        │
        └── infrastructure/                    # ═══════════════════════════════
            │                                  # CAMADA EXTERNA (DETALHES TÉCNICOS)
            │                                  # - Implementa os Ports
            │                                  # - Frameworks e tecnologias
            │                                  # ═══════════════════════════════
            │
            ├── adapters/                      # Adapters (implementações)
            │   │
            │   └── in/                        # 🔌 ADAPTERS INPUT (Drivers)
            │       │                          # Recebem requisições externas
            │       │
            │       ├── graphql/               # Adapter GraphQL
            │       │   └── events.resolver.ts # Resolver GraphQL (queries/mutations)
            │       │
            │       ├── mappers/               # Mappers de GraphQL
            │       │   ├── address.mapper.ts  # Address Entity ↔ GraphQL Model
            │       │   └── event.mapper.ts    # Event Entity ↔ GraphQL Model
            │       │
            │       └── models/                # GraphQL Models (schema)
            │           ├── address-graphql-model.ts
            │           └── event-graphql.model.ts
            │
            └── modules/                       # NestJS Modules (DI)
                └── events.module.ts           # Módulo de eventos (providers, imports)
```

---

## Camadas da Arquitetura Hexagonal

### **Domain** (Núcleo)
- **Responsabilidade**: Lógica de negócio pura
- **Dependências**: Nenhuma (independente de frameworks)
- **Conteúdo**: Entidades, Value Objects, Factories (Builder), Domain Services, Ports (interfaces)

### **Application** (Orquestração)
- **Responsabilidade**: Casos de uso, coordena domínio e infraestrutura
- **Dependências**: Apenas Domain
- **Conteúdo**: Use Cases, DTOs, Mappers

### **Infrastructure** (Detalhes Técnicos)
- **Responsabilidade**: Implementações concretas (NestJS, GraphQL, Prisma, RabbitMQ, gRPC)
- **Dependências**: Domain e Application
- **Conteúdo**: Adapters (Input), Modules, Configurações

---

## Padrões de Projeto Implementados

| Padrão | Localização | Descrição |
|--------|-------------|-----------|
| **Builder** | `domain/factories/builder/` | EventsBuilder + EventDirector (construção passo a passo) |
| **Singleton** | `core/prisma/prismaSingleton.ts` | PrismaClient (instância única) |

---

## Fluxo de Dados

### Exemplo: Criar Evento via GraphQL

```
Cliente (GraphQL Mutation)
    ↓
[INPUT ADAPTER] events.resolver.ts (@Mutation)
    ↓
[USE CASE] create-event.usecase.ts
    ↓
[DOMAIN] EventDirector + EventsBuilder (constrói Event Entity)
    ↓
[DOMAIN SERVICE] priceValidation.ts (valida preço)
    ↓
[REPOSITORY] Prisma Repository (save)
    ↓
PostgreSQL
    ↓
[RABBITMQ] Publica evento "EventCreated"
```

---

## Comunicação Externa

### GraphQL (Frontend)
- **Entrada**: `events.resolver.ts`
- **Saída**: Schema GraphQL (`schema.gql`)

### gRPC (MS Registration)
- **Saída**: Consulta contagem de inscritos
- **Localização**: Implementado em infraestrutura (não mostrado na estrutura)

### RabbitMQ (Eventos de Domínio)
- **Saída**: Publica eventos (`EventCreated`, `EventCapacityChanged`, `EventCancelled`)
- **Localização**: Implementado em infraestrutura (não mostrado na estrutura)

---

## 💡 Benefícios da Estrutura

- **Separação Clara**: Domain não conhece GraphQL, NestJS ou Prisma
- **Testabilidade**: Use Cases testáveis sem mocks de infra
- **Builder Pattern**: Construção de eventos complexos de forma controlada
- **Value Objects**: Address encapsula validação de endereços
- **Escalabilidade**: Fácil adicionar novos use cases

---

## 🔧 Arquivos de Configuração

```
prisma/
├── schema.prisma              # Schema do banco de dados
└── migrations/                # Migrações do Prisma

proto/
└── event-registration.proto   # Contrato gRPC (MS Registration)
```

---
