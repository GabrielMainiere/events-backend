# Guia Completo de APIs GraphQL

Este documento contém todos os endpoints GraphQL disponíveis no sistema, com exemplos práticos de uso.

## Autenticação

Todas as requisições (exceto login e criação de usuário) requerem um token JWT no header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## MS Users - Gerenciamento de Usuários

**Base URL**: `http://localhost:8000/msusers/graphql`

# Criar Usuario
```graphql
mutation CreateUser {
  createUser(createUserInput: {
    email: "novo.usuario@example.com"
    name: "Novo Usuário"
    birthDatetime: "1990-01-01T00:00:00Z"
    cpf: "12345678900"
    phoneNumber: "11999998888"
    password: "Password@123"
    roles: ["user-role-uuid"]
  }) {
    id
    message
  }
}
```

# Ativar Usuario
```graphql
mutation ActivateUser {
  activateUser(
    activateUserId: "user-uuid-here"
    activationCode: "123456"
  ) {
    email
    name
    token
    roles {
      name
    }
  }
}
```

# Atualizar Usuario
```graphql
mutation UpdateUser {
  updateUser(
    id: "user-uuid-here"
    updateUserInput: {
      name: "Nome Atualizado"
      phoneNumber: "11988887777"
    }
  ) {
    id
    name
    phoneNumber
  }
}
```

# Desativar Usuario
```graphql
mutation DeleteUser {
  deleteUser(id: "user-uuid-here")
}
```

# Autenticar Usuario
```graphql
query AuthenticateUser {
  authenticateUser(
    email: "novo.usuario@example.com"
    password: "Password@123"
  ) {
    email
    name
    token
    roles {
      id
      name
    }
  }
}
```

# Buscar pelo id
```graphql
query FindUser {
  findUser(id: "user-uuid-here") {
    id
    email
    name
    cpf
    isActive
    roles {
      name
    }
  }
}
```

# Listar todos
```graphql
query ListUsers {
  listUsers {
    id
    name
    email
    isActive
  }
}
```

# Criar Role
```graphql
mutation CreateRole {
  createRole(createRoleInput: {
    name: "ADMIN"
  }) {
    id
    name
  }
}
```

# Atualizar Role
```graphql
mutation UpdateRole {
  updateRole(
    id: "role-uuid-here"
    updateRoleInput: {
      name: "SUPER_ADMIN"
    }
  ) {
    id
    name
  }
}
```

# Deletar Role
```graphql
mutation DeleteRole {
  deleteRole(id: "role-uuid-here")
}
```

# Listar Role
```graphql
query ListRoles {
  listRoles {
    id
    name
  }
}
```

# Buscar Role por ID
```graphql
query FindRole {
  findRole(id: "role-uuid-here") {
    id
    name
  }
}
```

## MS Events - Gerenciamento de Eventos

**Base URL**: `http://localhost:8000/msevents/graphql`

# Criar Evento
```graphql
mutation CreateEvent {
  createEvent(input: {
    title: "Workshop de NestJS e Microsserviços"
    description: "Um dia intensivo sobre arquitetura."
    startAt: "2025-12-01T09:00:00Z"
    endAt: "2025-12-01T18:00:00Z"
    capacity: 100
    isFree: false
    price: 15000 # Preço em centavos (R$ 150,00)
    address: {
      street: "Av. Paulista"
      number: "1000"
      city: "São Paulo"
      state: "SP"
      zipcode: "01310100"
      country: "Brasil"
    }
    saleStartAt: "2025-11-01T10:00:00Z"
    saleEndAt: "2025-11-30T23:59:59Z"
    status: DRAFT
    eventType: WORKSHOP
  }) {
    id
    title
    status
    price
    address {
      city
    }
  }
}
```

# Atualizar Evento
```graphql
mutation UpdateEvent {
  updateEvent(input: {
    id: "event-uuid-here"
    title: "Novo Título do Evento"
    capacity: 150
  }) {
    id
    title
    capacity
  }
}
```

# Cancelar Evento
```graphql
mutation CancelEvent {
  cancelEvent(input: {
    id: "event-uuid-here"
  }) {
    id
    status
  }
}

```
# Listar todos os eventos
```graphql
query ListEvents {
  events {
    id
    title
    startAt
    capacity
    isFree
    price
    status
    address {
      city
    }
  }
}
```
# Buscar Evento pelo id
```graphql
query GetEvent {
  getEventById(id: "event-uuid-here") {
    id
    title
    description
    startAt
    endAt
    capacity
    isFree
    price
    status
    eventType
    address {
      street
      number
      city
      state
    }
  }
}
```
## MS Events Registration - Inscrições

**Base URL**: `http://localhost:8000/mseventsregistration/graphql`

# Inscrever em evento
```graphql
mutation RegisterUser {
  registerUser(data: {
    userId: "user-uuid-here"
    eventId: "event-uuid-here"
  }) {
    id
    status
    user {
      id
      name
    }
    event {
      id
      title
    }
  }
}
```
# Fazer Check-in
```graphql
mutation CheckInUser {
  checkInUser(data: {
    userId: "user-uuid-here"
    eventId: "event-uuid-here"
  }) {
    id
    status
    checkInTime
  }
}
```
# Listar Usuarios de um Evento
```graphql
query ListParticipants {
  getAllUsersByEvent(eventId: "event-uuid-here") {
    event {
      id
      title
    }
    users {
      id
      name
      email
    }
  }
}
```
## MS Payments - Pagamentos

**Base URL**: `http://localhost:8000/mspayments/graphql`

# Criar Pagamento (Cartão de Credito)
```graphql
mutation CreatePaymentCreditCard {
  createPayment(input: {
    userId: "user-uuid-here"
    eventId: "event-uuid-here"
    paymentMethod: "CREDIT_CARD"
    paymentGateway: "STRIPE" # ou MERCADO_PAGO
    cardToken: "tok_visa" # Token gerado no frontend
    installments: 1
    paymentMethodId: "pm_card_visa" # ID do método (Stripe)
  }) {
    payment {
      id
      status
      amount
      gatewayTransactionId
    }
    creditCardData {
      id
      status
    }
  }
}
```
# Criar Pagamento Pix
```graphql
mutation CreatePaymentPix {
  createPayment(input: {
    userId: "user-uuid-here"
    eventId: "event-uuid-here"
    paymentMethod: "PIX"
    paymentGateway: "MERCADO_PAGO"
  }) {
    payment {
      id
      status
      amount
    }
    pixData {
      id
      qrCode
      qrCodeBase64
    }
  }
}
```

# Listar Todos os Pagamentos
```graphql
query ListPayments {
  payments {
    id
    status
    amount
    method
    gateway
    createdAt
  }
}
```

# Buscar Pagamento por ID
```graphql
query GetPayment {
  paymentById(id: "payment-uuid-here") {
    id
    status
    amount
    method
    gateway
    gatewayTransactionId
    user {
      id
      name
    }
    event {
      id
      title
    }
  }
}
```

# Listar Pagamentos por Evento
```graphql
query GetPaymentsByEvent {
  paymentsByEvent(eventId: "event-uuid-here") {
    id
    status
    amount
    user {
      id
      name
    }
  }
}
```

## MS Notifications - Notificações

**Base URL**: `http://localhost:8000/msnotifications/graphql`

# Criar Template
```graphql
mutation CreateTemplate {
  createNotificationTemplate(input: {
    template_name: "EVENT_REGISTRATION_EMAIL"
    notification_type: EVENT
    channel: EMAIL
    subject_template: "Confirmação de Inscrição: {{eventName}}"
    body_template: "<h1>Olá {{name}}!</h1><p>Você está inscrito no evento {{eventName}}.</p>"
  }) {
    id
    template_name
    notification_type
    channel
  }
}
```

# Atualizar Template
```graphql
mutation UpdateTemplate {
  updateNotificationTemplate(
    id: "template-uuid-here"
    input: {
      subject_template: "Inscrição Confirmada! {{eventName}}"
    }
  ) {
    id
    subject_template
  }
}
```

# Deletar Template
```graphql
mutation DeleteTemplate {
  deleteNotificationTemplate(id: "template-uuid-here") {
    id
  }
}
```

# Definir Preferencias de Notificação
```graphql
mutation SetPreferences {
  upsertUserPreference(input: {
    user_id: "user-uuid-here"
    notification_type: MARKETING
    channel: EMAIL
    is_enabled: false
  }) {
    id
    notification_type
    channel
    is_enabled
  }
}
```

# Deletar Preferencias
```graphql
mutation DeletePreferences {
  deleteUserPreferences(user_id: "user-uuid-here")
}
```

# Listar Preferencias Usuario
```graphql
query MyPreferences {
  userOptionalPreferences(user_id: "user-uuid-here") {
    id
    notification_type
    channel
    is_enabled
  }
}
```

# Listar Tipos de Notificação Opcionais
```graphql
query OptionalTypes {
  optionalNotificationTypes
}
```

# Listar Templates
```graphql
query ListTemplates {
  notificationTemplates {
    id
    template_name
    notification_type
    channel
    subject_template
  }
}
```

# Buscar Pelo ID
```graphql
query GetTemplate {
  notificationTemplate(id: "template-uuid-here") {
    id
    template_name
    body_template
  }
}
```

# Buscar pelo nome
```graphql
query GetTemplateByName {
  notificationTemplateByName(template_name: "EVENT_REGISTRATION_EMAIL") {
    id
    template_name
  }
}
```

## Notas Importantes

1. **Datas**: Sempre use formato ISO 8601 com timezone UTC (ex: `2025-12-01T09:00:00Z`)
2. **IDs**: Todos os IDs são UUIDs v4
3. **Rate Limiting**: 100 requisições por minuto por IP (configurado no Kong)
4. **Validações**: Campos obrigatórios e formatos são validados antes do processamento

---

Para mais informações, consulte a documentação completa no [README principal](../../README.md).
