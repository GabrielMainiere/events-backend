# Decisões Arquiteturais e Técnicas

Este documento detalha as principais decisões arquiteturais tomadas durante o desenvolvimento do sistema.

---

## Índice

1. [Arquitetura de Microsserviços](#arquitetura-de-microsserviços)
2. [Escolha de Tecnologias](#escolha-de-tecnologias)
3. [Comunicação Entre Serviços](#comunicação-entre-serviços)
4. [Padrões de Projeto](#padroes-de-projeto)
5. [Gerenciamento de Dados](#gerenciamento-de-dados)
6. [Segurança](#segurança)

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

## Padrões de Projeto

**Singleton**

O PrismaClient gerencia o pool de conexões com o banco de dados. Criar uma nova instância do PrismaClient para cada repositório ou serviço esgotaria rapidamente o limite de conexões do PostgreSQL. O Singleton garante que todos os repositórios em um microsserviço compartilhem a mesma instância e o mesmo pool de conexões.

**Builder (MSEVENTS)**

A entidade Evento é complexa, possuindo muitos campos obrigatórios (título, datas, capacidade) e opcionais (descrição, preço, datas de venda). Em vez de um construtor com 10+ argumentos, o EventBuilder é usado pelo EventDirector para construir um objeto EventProps passo a passo, garantindo que o objeto final seja sempre válido antes de ser enviado ao repositório.

**Strategy**

- (MSNOTIFICATIONS) Permite que a lógica de envio seja trocada. O NotificationSender não precisa saber como enviar um e-mail, ele apenas chama o método send() de uma INotificationStrategy. Podemos adicionar SMSStrategy ou PushStrategy sem alterar o NotificationSender.

- (MSPAYMENTS) É a base do serviço, o PaymentService usa duas estratégias: PaymentMethodStrategy (para tratar a lógica de Pix vs. CreditCard) e PaymentGatewayStrategy (para tratar a lógica de MercadoPago vs. Stripe).

- (MSEVENTSREGISTRATION) O RegistrationService usa o RegistrationStrategyService para escolher entre FreeRegistrationStrategy (status CONFIRMED) ou PaidRegistrationStrategy (status WAITING_PAYMENT) com base no is_free do evento.

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
