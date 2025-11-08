# Galeria de Diagramas C4

Este documento contém todos os diagramas arquiteturais do sistema, do Nível 1 (Contexto) ao Nível 4 (Código), utilizando o modelo C4.

## Sobre o Modelo C4

O modelo C4 foi criado para descrever a arquitetura de software em diferentes níveis de zoom, cada um servindo a um público diferente:

-   **Nível 1: Contexto (System Context):** A visão mais ampla. Mostra o sistema como uma "caixa preta" e como ele interage com usuários (Atores) e outros sistemas.
-   **Nível 2: Contêineres (Containers):** Desmembra o sistema em seus principais blocos de construção (microsserviços, bancos de dados, gateways).
-   **Nível 3: Componentes (Components):** Dá um "zoom" em um contêiner específico (como um microsserviço) e mostra seus principais componentes internos.
-   **Nível 4: Código (Code):** (Opcional) Mostra detalhes de implementação, como diagramas de classe ou UML, para ilustrar padrões de projeto.

---

## Nível 1: Diagrama de Contexto

Visão geral do sistema, seus usuários (Atores) e os sistemas externos com os quais ele se comunica.

![Diagrama de Contexto](./images/c4-context.png)

---

## Nível 2: Diagrama de Contêineres

Detalha os microsserviços, bancos de dados, o API Gateway e o fluxo de comunicação (HTTP, gRPC) entre eles.

![Diagrama de Contêineres](./images/c4-container.png)

---

## Nível 3: Diagramas de Componentes

Um "zoom" em cada microsserviço, mostrando seus componentes internos e responsabilidades.

### Componentes - MS Events
![Componentes do MS Events](./images/c4-component-events.png)

### Componentes - MS Events Registration
![Componentes do MS Events Registration](./images/c4-component-registration.png)

### Componentes - MS Notifications
![Componentes do MS Notifications](./images/c4-component-notifications.png)

### Componentes - MS Payments
![Componentes do MS Payments](./images/c4-component-payments.png)

### Componentes - MS Users
![Componentes do MS Users](./images/c4-component-users.png)

---

## Nível 4: Diagramas de Código (Padrões de Projeto)

Diagramas de classe que ilustram a implementação de padrões de projeto chave.

### Padrão Builder (MS Events)
![Padrão Builder](./images/c4-code-builder-pattern.png)

### Padrão Decorator (MS Notifications)
![Padrão Decorator](./images/c4-code-decorator-pattern.png)

### Padrão Factory (MS Notifications)
![Padrão Factory](./images/c4-code-factory-pattern.png)

### Padrão Combinado: Factory + Strategy + Decorator (MS Notifications)
![Padrões Combinados](./images/c4-code-factory-strategy-decorator.png)

### Padrão Singleton (Prisma Client)
![Padrão Singleton](./images/c4-code-singleton-pattern.png)

### Padrão Strategy + Factory (MS Payments)
![Padrão Strategy/Factory Acoplado](./images/c4-code-strategy-factory-pattern.png)
