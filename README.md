# Sistema de Gerenciamento de Eventos

Sistema de gerenciamento de eventos similar ao Sympla, desenvolvido com arquitetura de microsserviços (NestJS e Spring Boot), gRPC, GraphQL e Kong API Gateway.

---

## Navegação Rápida (Índice)

* [Sobre o Projeto](#-sobre-o-projeto)
* [Arquitetura do Sistema](#-arquitetura-do-sistema)
* [Documentação Completa](#-documentação-completa)
    * [Diagramas C4 (Contexto, Contêineres, etc.)](./docs/diagrams/README.md)
    * [Guia da API (GraphQL)](./docs/API_GUIDE.md)
    * [Decisões de Arquitetura (SOLID, Patterns)](./docs/ARCHITECTURE.md)
* [Como Executar (Instalação)](#-guia-de-instalação-e-execução)
* [Autores](#-autores)

---

## Sobre o Projeto

Este projeto é um sistema completo de gerenciamento de eventos, desenvolvido utilizando arquitetura de microsserviços. O sistema permite a criação e inscrição em eventos, sejam eles pagos ou gratuitos, com suporte a pagamentos via cartão de crédito e PIX.

### Funcionalidades Principais

-   **Gerenciamento de Usuários**: Cadastro, autenticação e autorização (JWT).
-   **Criação de Eventos**: Permite criar eventos pagos ou gratuitos com informações detalhadas.
-   **Sistema de Inscrições**: Registro em eventos com validações de capacidade.
-   **Processamento de Pagamentos**: Integração com Mercado Pago e Stripe.
-   **Notificações em Tempo Real**: Sistema de notificações via email com processamento assíncrono.
-   **Check-in de Participantes**: Controle de presença nos eventos.

### Requisitos Arquiteturais

-   **API Gateway (Kong)**: Ponto único de entrada que centraliza todas as requisições externas.
-   **Arquitetura de Microsserviços**: 5 microsserviços independentes (NestJS e Spring Boot).
-   **GraphQL**: Comunicação otimizada com frontend.
-   **gRPC**: Comunicação de alta performance entre microsserviços.
-   **Isolamento de Dados**: Cada microsserviço possui seu próprio banco de dados PostgreSQL.
-   **Containerização**: Todos os serviços containerizados com Docker.

---

## Arquitetura do Sistema

O sistema é composto por 5 microsserviços principais, um API Gateway e bancos de dados isolados, todos orquestrados via Docker Compose.

1.  **ms-users** (NestJS): Gerencia usuários, autenticação e roles.
2.  **ms-events** (NestJS): Gerencia a criação e listagem de eventos.
3.  **ms-events-registration** (NestJS): Gerencia inscrições e check-ins.
4.  **ms-payments** (Java/Spring Boot): Processa pagamentos (Stripe, Mercado Pago).
5.  **ms-notifications** (NestJS): Envia notificações (Email) e gerencia templates.
6.  **gateway** (Kong): Ponto de entrada único (roteia `http://localhost:8000/<ms-name>`).

---

## Documentação Completa

Toda a documentação detalhada do projeto, incluindo diagramas, guias de API e decisões arquiteturais, está centralizada na pasta `/docs`.

| Documento | Descrição |
| :--- | :--- |
| **[Guia da API (GraphQL)](./docs/API_GUIDE.md)** | Contém todas as *queries* e *mutations* de todos os microsserviços, com exemplos prontos para teste. |
| **[Decisões de Arquitetura](./docs/ARCHITECTURE.md)** | Detalha o *porquê* das escolhas técnicas, incluindo a aplicação dos **Padrões de Projeto** e **Princípios SOLID**. |
| **[Diagramas C4](./docs/diagrams/DIAGRAMS.md)** | Contém todos os diagramas C4 (Contexto, Contêineres, Componentes e Código) que ilustram a arquitetura. |

---

## Guia de Instalação e Execução

### Pré-requisitos

-   [Docker](https://www.docker.com/get-started) (versão 20.10 ou superior)
-   [Docker Compose](https://docs.docker.com/compose/install/) (versão 2.0 ou superior)

### Passo 1: Clone o Repositório

```bash
git clone [https://github.com/GabrielMainiere/events-backend.git](https://github.com/GabrielMainiere/events-backend.git)
cd events-backend

---

### Passo 2: Configurar Variáveis de Ambiente

Cada microsserviço possui um arquivo `.env.example`. Copie e configure conforme necessário:

```bash
# MS Users
cp msusers/.env.example msusers/.env.docker

# MS Events
cp msevents/.env.example msevents/.env.docker

# MS Events Registration
cp mseventsregistration/.env.Example mseventsregistration/.env.docker

# MS Payments
cp mspayments/.env-example mspayments/.env

# MS Notifications
cp msnotifications/.env.example msnotifications/.env.docker
```

Variáveis importantes a configurar:

**SMTP para notificações** (`msnotifications/.env.docker`):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
```

**Chaves de pagamento** (`mspayments/.env`):

```env
MERCADOPAGO_ACCESS_TOKEN=seu-token-mp
STRIPE_SECRET_KEY=seu-secret-key-stripe
```

**JWT Secret** (`msusers/.env.docker`):

```env
JWT_SECRET=sua-chave-secreta-aqui
JWT_ALGORITHM=HS256
```

---

### Passo 3: Iniciar os Serviços

```bash
docker-compose up -d
```

---

### Passo 4: Acessar a Aplicação

O API Gateway (Kong) é o ponto de entrada principal e está disponível em [http://localhost:8000](http://localhost:8000).

- **MS Users (GraphQL):** http://localhost:8000/msusers/graphql
- **MS Events (GraphQL):** http://localhost:8000/msevents/graphql
- **MS Registration (GraphQL):** http://localhost:8000/mseventsregistration/graphql
- **MS Payments (GraphQL):** http://localhost:8000/mspayments/graphql
- **MS Notifications (GraphQL):** http://localhost:8000/msnotifications/graphql

> **Nota:** Para testar as mutations e queries, consulte o [Guia da API (GraphQL)](./docs/API_GUIDE.md).

## 👨‍💻 Autores

- Gabriel Mainiere - [GitHub](https://github.com/GabrielMainiere)
- Luiz Reis - [GitHub](https://github.com/LuizReis-dev)
- Lucas Castellano - [GitHub](https://github.com/Lucas-Cast)
- Rafael Belmont - [GitHub](https://github.com/BelmontRafael)
---
