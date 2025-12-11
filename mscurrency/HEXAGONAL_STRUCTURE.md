# MS Currency - Estrutura Hexagonal

Esta é a estrutura completa do microsserviço MS Currency seguindo **Arquitetura Hexagonal (Ports & Adapters)** e **Domain-Driven Design (DDD)**.

---

## Estrutura de Pastas

```
src/main/java/br/com/mscurrency/
│
├── MscurrencyApplication.java                 # Bootstrap da aplicação Spring Boot
│
├── domain/                                    # ═══════════════════════════════
│   │                                          # CAMADA INTERNA (NÚCLEO)
│   │                                          # - Não depende de nada externo
│   │                                          # - Lógica de negócio pura
│   │                                          # ═══════════════════════════════
│   │
│   ├── entity/                                # Entidades do domínio
│   │   └── CurrencyPrice.java                # CurrencyPrice (entidade principal)
│   │
│   ├── valueobjects/                          # Value Objects (imutáveis)
│   │   ├── CurrencyCode.java                 # CurrencyCode VO (USD, EUR, BRL)
│   │   └── Price.java                        # Price VO (valida valores > 0)
│   │
│   ├── exceptions/                            # Domain Exceptions
│   │   ├── DomainException.java              # Exception base do domínio
│   │   ├── CurrencyPriceNotFoundException.java
│   │   ├── InvalidCurrencyCodeException.java
│   │   └── InvalidPriceException.java
│   │
│   └── ports/                                 # PORTS (Interfaces/Contratos)
│       │
│       ├── in/                                # PORTS IN (Use Cases)
│       │   ├── CreateCurrencyPricePort.java
│       │   ├── UpdateCurrencyPricePort.java
│       │   ├── DeleteCurrencyPricePort.java
│       │   ├── GetCurrencyPricePort.java
│       │   ├── ListAllCurrencyPricesPort.java
│       │   └── SyncCurrencyRatesPort.java    # Sincroniza com API externa
│       │
│       └── out/                               # PORTS OUT (Integrações Externas)
│           ├── CurrencyPriceRepositoryPort.java      # Persistência
│           ├── ExchangeRateProviderPort.java         # API externa (cotações)
│           └── CurrencyPriceNotificationPort.java    # Notificações (RabbitMQ)
│
├── application/                               # ═══════════════════════════════
│   │                                          # CAMADA MÉDIA (ORQUESTRAÇÃO)
│   │                                          # - Use Cases (casos de uso)
│   │                                          # - Coordena domínio + infra
│   │                                          # ═══════════════════════════════
│   │
│   └── usecase/                               # Implementação dos Use Cases
│       ├── CreateCurrencyPriceUseCase.java   # Criar moeda
│       ├── UpdateCurrencyPriceUseCase.java   # Atualizar preço de moeda
│       ├── DeleteCurrencyPriceUseCase.java   # Remover moeda
│       ├── GetCurrencyPriceUseCase.java      # Buscar moeda por código
│       ├── ListAllCurrencyPricesUseCase.java # Listar todas as moedas
│       └── SyncCurrencyRatesUseCase.java     # Sincronizar com API externa
│
└── infrastructure/                            # ═══════════════════════════════
    │                                          # CAMADA EXTERNA (DETALHES TÉCNICOS)
    │                                          # - Implementa os Ports
    │                                          # - Frameworks e tecnologias
    │                                          # ═══════════════════════════════
    │
    ├── adapters/                              # Adapters (implementações)
    │   │
    │   ├── in/                                # 🔌 ADAPTERS INPUT (Drivers)
    │   │   │                                  # Recebem requisições externas
    │   │   │
    │   │   ├── graphql/                       # Adapter GraphQL
    │   │   │   ├── CurrencyPriceController.java      # Controller GraphQL
    │   │   │   │
    │   │   │   ├── dto/                       # DTOs GraphQL
    │   │   │   │   ├── CreateCurrencyPriceInput.java
    │   │   │   │   ├── UpdateCurrencyPriceInput.java
    │   │   │   │   └── CurrencyPriceResponse.java
    │   │   │   │
    │   │   │   └── mapper/                    # Mappers GraphQL
    │   │   │       └── CurrencyPriceGraphQLMapper.java
    │   │   │
    │   │   └── scheduler/                     # Adapter Scheduler
    │   │       └── CurrencyRateScheduler.java # Job agendado (@Scheduled)
    │   │                                      # - Executa a cada 3h
    │   │                                      # - Executa no startup
    │   │
    │   └── out/                               # 🔌 ADAPTERS OUTPUT (Driven)
    │       │                                  # Implementam interfaces do domain
    │       │
    │       ├── persistence/                   # Persistence Adapter (JPA)
    │       │   ├── CurrencyPriceJpaRepository.java    # Interface JPA
    │       │   ├── CurrencyPriceRepositoryAdapter.java # Implementa Port
    │       │   └── CurrencyPriceEntity.java           # Entity JPA
    │       │
    │       ├── exchangerate/                  # Exchange Rate Adapter
    │       │   ├── ExchangeRateProviderAdapter.java   # Implementa Port
    │       │   ├── AwesomeApiClient.java              # Cliente REST
    │       │   └── dto/
    │       │       └── ExchangeRateResponse.java      # DTO da API
    │       │
    │       └── messaging/                     # Messaging Adapter (RabbitMQ)
    │           ├── RabbitMQNotificationAdapter.java   # Implementa Port
    │           └── dto/
    │               └── CurrencyPriceUpdateMessage.java # DTO mensagem
    │
    └── config/                                # Configurações Spring
        ├── GraphQLConfig.java                 # Config GraphQL
        ├── GraphQLAuthFilter.java             # Filtro de autenticação JWT
        ├── RabbitMQConfig.java                # Config RabbitMQ
        ├── RestTemplateConfig.java            # Config RestTemplate (HTTP)
        └── CachedBodyHttpServletRequest.java  # Wrapper para cache de request
```

---

## Recursos (Resources)

```
src/main/resources/
├── application.yml                            # Configurações da aplicação
│
├── db/migration/                              # Flyway Migrations
│   ├── V0001__creating_currency_price_table.sql
│   └── V0002__update_currency_price_to_float.sql
│
└── graphql/                                   # Schema GraphQL
    └── currency-price.graphqls
```

---

## Arquivos de Configuração (Proto)

```
src/main/proto/
└── currency.proto                             # Contrato gRPC (opcional)
```

---

## Camadas da Arquitetura Hexagonal

### **Domain** (Núcleo)
- **Responsabilidade**: Lógica de negócio pura
- **Dependências**: Nenhuma (independente de Spring, JPA, etc.)
- **Conteúdo**: Entidades, Value Objects, Exceptions, Ports (interfaces)

### **Application** (Orquestração)
- **Responsabilidade**: Casos de uso, coordena domínio e infraestrutura
- **Dependências**: Apenas Domain
- **Conteúdo**: Use Cases (implementam Ports IN)

### **Infrastructure** (Detalhes Técnicos)
- **Responsabilidade**: Implementações concretas (Spring Boot, JPA, RabbitMQ, RestTemplate)
- **Dependências**: Domain e Application
- **Conteúdo**: Adapters (Input/Output), Configurações

---

## Padrões de Projeto Implementados

| Padrão | Localização | Descrição |
|--------|-------------|-----------|
| **Value Object** | `domain/valueobjects/` | CurrencyCode, Price (validação encapsulada) |
| **Repository** | `domain/ports/out/` (interface) + `infrastructure/adapters/out/persistence/` (impl) | Abstração de persistência |
| **Adapter** | `infrastructure/adapters/` | Implementam Ports (Dependency Inversion) |
| **Dependency Injection** | Spring Boot `@Component`, `@Service` | Injeta adapters nos use cases |

---

## Fluxo de Dados

### Exemplo 1: Criar Moeda via GraphQL

```
Cliente (GraphQL Mutation)
    ↓
[INPUT ADAPTER] CurrencyPriceController.java (@MutationMapping)
    ↓
[USE CASE] CreateCurrencyPriceUseCase.java
    ↓
[DOMAIN] CurrencyPrice + Value Objects (validação)
    ↓
[PORT OUT] CurrencyPriceRepositoryPort
    ↓
[OUTPUT ADAPTER] CurrencyPriceRepositoryAdapter (JPA)
    ↓
PostgreSQL
```

### Exemplo 2: Sincronizar Cotações (Scheduled)

```
Spring @Scheduled (a cada 3h)
    ↓
[INPUT ADAPTER] CurrencyRateScheduler.java
    ↓
[USE CASE] SyncCurrencyRatesUseCase.java
    ↓
[PORT OUT] ExchangeRateProviderPort
    ↓
[OUTPUT ADAPTER] ExchangeRateProviderAdapter (RestTemplate)
    ↓
API Externa (AwesomeAPI)
    ↓
[USE CASE] SyncCurrencyRatesUseCase.java (salva no DB)
    ↓
[PORT OUT] CurrencyPriceRepositoryPort
    ↓
PostgreSQL
    ↓
[PORT OUT] CurrencyPriceNotificationPort
    ↓
[OUTPUT ADAPTER] RabbitMQNotificationAdapter
    ↓
RabbitMQ → MS Payments (notificação)
```

---


---

## Comunicação Externa

### GraphQL (Frontend/Admin)
- **Entrada**: `CurrencyPriceController.java`
- **Schema**: `currency-price.graphqls`
- **Operações**: CRUD de moedas

### API Externa (AwesomeAPI)
- **Saída**: `ExchangeRateProviderAdapter.java`
- **Endpoint**: `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`
- **Função**: Busca cotações em tempo real

### RabbitMQ (MS Payments)
- **Saída**: `RabbitMQNotificationAdapter.java`
- **Evento**: `CurrencyPriceUpdated`
- **Função**: Notifica MS Payments sobre mudanças de cotação

---

## Benefícios da Estrutura

- **Independência de Frameworks**: Domain não conhece Spring, JPA ou RabbitMQ
- **Testabilidade**: Use Cases testáveis com mocks simples (interfaces)
- **Value Objects**: Validação encapsulada (CurrencyCode, Price)
- **Dependency Inversion**: Use Cases dependem de interfaces, não de implementações
- **Sincronização Automática**: Cotações atualizadas periodicamente
- **Notificações**: MS Payments recebe atualizações via RabbitMQ

---