# 📁 ESTRUTURA DE PASTAS - ARQUITETURA HEXAGONAL

```
mscurrency/
│
├── 📦 src/main/java/br/com/mscurrency/
│   │
│   ├── 🎯 domain/ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ NÚCLEO (CAMADA INTERNA)
│   │   ├── entity/
│   │   │   └── CurrencyPrice.java 
│   │   │
│   │   ├── valueobjects/
│   │   │   ├── CurrencyCode.java
│   │   │   └── Price.java
│   │   │
│   │   ├── exceptions/
│   │   │   ├── DomainException.java
│   │   │   ├── CurrencyPriceNotFoundException.java
│   │   │   ├── InvalidCurrencyCodeException.java
│   │   │   └── InvalidPriceException.java
│   │   │
│   │   └── ports/ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ INTERFACES (CONTRATOS)
│   │       │
│   │       ├── in/ ━━━━━━━━━━━━━━━━━━━━━━━━━━ ENTRADA (Use Cases)
│   │       │   ├── CreateCurrencyPricePort.java 📥
│   │       │   ├── UpdateCurrencyPricePort.java 📥
│   │       │   ├── DeleteCurrencyPricePort.java 📥
│   │       │   ├── GetCurrencyPricePort.java 📥
│   │       │   ├── ListAllCurrencyPricesPort.java 📥
│   │       │   └── SyncCurrencyRatesPort.java 📥
│   │       │
│   │       └── out/ ━━━━━━━━━━━━━━━━━━━━━━━━━ SAÍDA (Integrações)
│   │           ├── CurrencyPriceRepositoryPort.java 📤
│   │           ├── ExchangeRateProviderPort.java 📤
│   │           └── CurrencyPriceNotificationPort.java 📤
│   │
│   ├── 🎭 application/ ━━━━━━━━━━━━━━━━━━━━━━━━━ ORQUESTRAÇÃO (CAMADA MÉDIA)
│   │   └── usecase/
│   │       ├── CreateCurrencyPriceUseCase.java ⚙️ (implementa Port IN)
│   │       ├── UpdateCurrencyPriceUseCase.java ⚙️
│   │       ├── DeleteCurrencyPriceUseCase.java ⚙️
│   │       ├── GetCurrencyPriceUseCase.java ⚙️
│   │       ├── ListAllCurrencyPricesUseCase.java ⚙️
│   │       └── SyncCurrencyRatesUseCase.java ⚙️
│   │
│   └── 🔌 infrastructure/ ━━━━━━━━━━━━━━━━━━━━━ DETALHES TÉCNICOS (CAMADA EXTERNA)
│       │
│       ├── config/ ━━━━━━━━━━━━━━━━━━━━━━━━━━━ Configurações Spring
│       │   ├── GraphQLConfig.java
│       │   ├── GraphQLAuthFilter.java
│       │   ├── RabbitMQConfig.java
│       │   ├── RestTemplateConfig.java
│       │   └── CachedBodyHttpServletRequest.java
│       │
│       └── adapters/
│           │
│           ├── in/ ━━━━━━━━━━━━━━━━━━━━━━━━━ ADAPTADORES DE ENTRADA (Drivers)
│           │   │
│           │   ├── graphql/ ━━━━━━━━━━━━━━━ 🌐 GraphQL
│           │   │   ├── CurrencyPriceController.java 🎮
│           │   │   ├── dto/
│           │   │   │   ├── CreateCurrencyPriceInput.java
│           │   │   │   ├── UpdateCurrencyPriceInput.java
│           │   │   │   └── CurrencyPriceResponse.java
│           │   │   └── mapper/
│           │   │       └── CurrencyPriceGraphQLMapper.java 🔄
│           │   │
│           │   └── scheduler/ ━━━━━━━━━━━━━ ⏰ Agendamento
│           │       └── CurrencyRateScheduler.java 🕐
│           │
│           └── out/ ━━━━━━━━━━━━━━━━━━━━━━━ ADAPTADORES DE SAÍDA (Driven)
│               │
│               ├── persistence/ ━━━━━━━━━━━ 💾 Banco de Dados (JPA)
│               │   ├── CurrencyPriceJpaAdapter.java 🔌 (implementa RepositoryPort)
│               │   ├── entity/
│               │   │   └── CurrencyPriceEntity.java 📊 (com anotações JPA)
│               │   ├── repository/
│               │   │   └── CurrencyPriceJpaRepository.java 🗄️
│               │   └── mapper/
│               │       └── CurrencyPriceMapper.java 🔄 (Domain ↔ Entity)
│               │
│               ├── external/ ━━━━━━━━━━━━━━ 🌍 API Externa
│               │   ├── ExchangeRateApiAdapter.java 🔌 (implementa ProviderPort)
│               │   └── dto/
│               │       └── ExchangeRateApiResponse.java
│               │
│               └── messaging/ ━━━━━━━━━━━━━ 📨 RabbitMQ
│                   ├── RabbitMQNotificationAdapter.java 🔌 (implementa NotificationPort)
│                   └── dto/
│                       └── CurrencyPriceUpdateMessage.java
│
├── 📦 src/main/resources/
│   ├── application.yml
│   ├── graphql/
│   │   └── currency-price.graphqls
│   └── db/migration/
│       ├── V0001__creating_currency_price_table.sql
│       └── V0002__update_currency_price_to_float.sql
│
├── 📦 src/test/java/br/com/mscurrency/
│   └── (testes a implementar)
│
└── 📄 pom.xml