# Decisões Arquiteturais e Técnicas

Este documento detalha as principais decisões arquiteturais tomadas durante o desenvolvimento do sistema.

---

## Índice

1. [Evolução Arquitetural](#evolução-arquitetural)
2. [Arquitetura de Microsserviços](#arquitetura-de-microsserviços)
3. [Escolha de Tecnologias](#escolha-de-tecnologias)
4. [Comunicação Entre Serviços](#comunicação-entre-serviços)
5. [Padrões de Projeto](#padroes-de-projeto)
6. [Gerenciamento de Dados](#gerenciamento-de-dados)
7. [Segurança](#segurança)
8. [Arquitetura Hexagonal e DDD](#arquitetura-hexagonal-e-ddd)

---

## Evolução Arquitetural

### Primeira Etapa - Arquitetura Base

Na primeira etapa do projeto, foi implementada a arquitetura base com:
- **Comunicação Externa**: GraphQL para o frontend
- **Comunicação Interna**: gRPC para comunicação síncrona entre microsserviços
- **Arquitetura**: Microsserviços com estrutura em camadas (controller, service, repository)
- **Padrões**: Aplicação de padrões GoF (Singleton, Strategy, Factory, Builder, Decorator)
- **Princípios**: Aderência aos princípios SOLID

### Segunda Etapa - Evolução e Modernização

Na segunda etapa, o sistema evoluiu significativamente:

#### Introdução de Mensageria (RabbitMQ)

**Decisão**: Migração de comunicação síncrona (gRPC) para assíncrona (RabbitMQ) em cenários específicos

**Justificativa**:
- **Desacoplamento**: Reduz dependências diretas entre serviços
- **Resiliência**: Sistema continua operando mesmo com serviços temporariamente indisponíveis
- **Escalabilidade**: Processamento assíncrono permite melhor distribuição de carga
- **Retry Automático**: Dead Letter Queues (DLQ) para tratamento de falhas

**Microsserviços Afetados**:
- **MS Users → MS Notifications**: Migrado completamente para RabbitMQ (envio de notificações)
- **MS Events Registration**: Manteve gRPC (consultas síncronas) + RabbitMQ (eventos assíncronos)
- **MS Events**: Publica eventos de mudanças via RabbitMQ

#### Adoção de DDD e Arquitetura Hexagonal

**Decisão**: Reestruturar microsserviços críticos seguindo Domain-Driven Design e Arquitetura Hexagonal

**Justificativa**:
- **Isolamento de Domínio**: Lógica de negócio independente de frameworks
- **Testabilidade**: Facilita testes unitários do domínio
- **Manutenibilidade**: Separação clara de responsabilidades
- **Evolução**: Facilita mudanças tecnológicas sem impactar o domínio

**Microsserviços Reestruturados**:
1. **MS Notifications** (NestJS + Hexagonal)
2. **MS Events** (NestJS + Hexagonal)
3. **MS Currency** (Spring Boot + Hexagonal)

**Trade-offs da Evolução**:
- Maior resiliência e desacoplamento
- Melhor organização do código (separação domínio/infra)
- Maior complexidade de monitoramento (mensageria)
- Curva de aprendizado (DDD/Hexagonal)

---

## Arquitetura de Microsserviços


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

#### MS Currency
**Responsabilidade**:
- Controle de moedas aceitas (USD, EUR, BRL)
- Sincronia com MS Payments
- Atualização periódica dos valores das moedas

#### MS Notifications
**Responsabilidade**:
- Envio de emails
- Gerenciamento de templates
- Processamento assíncrono

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

### Comunicação Interna - Abordagem Híbrida

O sistema utiliza dois padrões de comunicação interna, escolhidos conforme a natureza da operação:

#### gRPC - Comunicação Síncrona

**Quando usar**: Operações que requerem resposta imediata

**Justificativa**:
- Performance superior (Protocol Buffers binário)
- Strongly-typed contracts (arquivos .proto)
- Timeout controlado
- Ideal para consultas e validações

**Casos de Uso Atuais**:
- MS Registration → MS Users (validar usuário via gRPC)
- MS Events → MS Registration (consultar total de inscritos via gRPC)
- MS Payments → MS Users (consultar dados de usuário via gRPC)

#### RabbitMQ - Comunicação Assíncrona

**Quando usar**: Operações que não requerem resposta imediata, eventos de domínio

**Justificativa**:
- Desacoplamento temporal entre serviços
- Garantia de entrega (mensagens persistentes)
- Retry automático com Dead Letter Queue (DLQ)
- Escalabilidade horizontal (múltiplos consumers)
- Resiliência (mensagens não são perdidas se o consumer estiver offline)

**Arquitetura RabbitMQ**:
```
Exchange: notifications_exchange (topic)
  ├── Queue: notifications.dispatch
  │   └── Routing Key: notification.dispatch
  └── Dead Letter Queue: notifications.dlq
      └── Retry automático após falhas
```

**Casos de Uso Atuais**:
- MS Users → MS Notifications (envio de email via RabbitMQ)
- MS Events → MS Events Registration (evento de mudança de capacidade via RabbitMQ)
- MS Events Registration → MS Payments (evento de registro criado via RabbitMQ)

**Exemplo de Fluxo Híbrido (MS Registration)**:
1. **Criar Registro** → Valida usuário via gRPC (síncrono)
2. **Criar Registro** → Publica evento de registro via RabbitMQ (assíncrono)
3. **MS Payments** consome evento e processa pagamento
4. **MS Notifications** consome evento e envia confirmação

---

## Padrões de Projeto

**Singleton**

O PrismaClient gerencia o pool de conexões com o banco de dados. Criar uma nova instância do PrismaClient para cada repositório ou serviço esgotaria rapidamente o limite de conexões do PostgreSQL. O Singleton garante que todos os repositórios em um microsserviço compartilhem a mesma instância e o mesmo pool de conexões.

**Builder (MSEVENTS)**

A entidade Evento é complexa, possuindo muitos campos obrigatórios (título, datas, capacidade) e opcionais (descrição, preço, datas de venda). Em vez de um construtor com 10+ argumentos, o EventBuilder é usado pelo EventDirector para construir um objeto EventProps passo a passo, garantindo que o objeto final seja sempre válido antes de ser enviado ao repositório.

**Strategy**

- (MSNOTIFICATIONS) Permite que a lógica de envio seja trocada. O NotificationSender não precisa saber como enviar um e-mail, ele apenas chama o método send() de uma INotificationStrategy. Podemos adicionar SMSStrategy ou PushStrategy sem alterar o NotificationSender.

- (MSPAYMENTS) É a base do serviço, o PaymentService usa duas estratégias: PaymentMethodStrategy (para tratar a lógica de Pix vs. CreditCard) e PaymentGatewayStrategy (para tratar a lógica de MercadoPago vs. Stripe).


**Factory (MSPAYMENTS)**

O PaymentService não contém new MercadoPagoGateway(). Ele pede ao PaymentGatewayFactory.getPaymentGateway(...) pela estratégia necessária. A Factory esconde a complexidade de qual classe concreta instanciar.

**Decorator (MSNOTIFICATIONS)**

EmailStrategy tem apenas uma responsabilidade: enviar o e-mail. Para adicionar funcionalidades de logs, novas tentativas (retry) e monitoramento de performance, não modificamos a EmailStrategy. Em vez disso, o StrategyFactory "embrulha" a estratégia em RetryDecorator, AuditLogDecorator e PerformanceLogDecorator. Isso permite que essas funcionalidades sejam adicionadas ou removidas sem alterar a lógica de negócio principal.

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

---

## Arquitetura Hexagonal e DDD

### Visão Geral

Três microsserviços foram reestruturados seguindo **Domain-Driven Design (DDD)** e **Arquitetura Hexagonal (Ports & Adapters)** para melhorar a separação de responsabilidades e facilitar a evolução do sistema.

### Microsserviços com Arquitetura Hexagonal

#### 1. MS Notifications (NestJS)
* [Estrutura Hexagonal](../msnotifications/HEXAGONAL_STRUCTURE.md)

#### 2. MS Events (NestJS)
* [Estrutura Hexagonal](../msevents/HEXAGONAL_STRUCTURE.md)

#### 3. MS Currency (Spring Boot)
* [Estrutura Hexagonal](../mscurrency/HEXAGONAL_STRUCTURE.md)

### Benefícios da Arquitetura Hexagonal

1. **Testabilidade**
   - Domínio testável sem dependências externas
   - Mocks fáceis de criar (interfaces ports)

2. **Independência de Frameworks**
   - Lógica de negócio não depende de NestJS, Spring, Prisma
   - Facilita migração tecnológica

3. **Separação de Responsabilidades**
   - Domínio: O quê (regras de negócio)
   - Aplicação: Como (orquestração)
   - Infraestrutura: Com o quê (tecnologias)

4. **Evolução Controlada**
   - Mudanças em adapters não afetam domínio
   - Novos adapters podem ser adicionados facilmente

