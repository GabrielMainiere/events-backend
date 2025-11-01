// prisma/seed.ts
import { PrismaClient, NotificationChannel, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seeds...');

  await prisma.notificationLog.deleteMany();
  await prisma.userPreference.deleteMany();
  await prisma.notificationTemplate.deleteMany();

  console.log('Dados antigos removidos');

  const welcomeTemplate = await prisma.notificationTemplate.create({
    data: {
      template_name: 'account_welcome_email',
      notification_type: NotificationType.ACCOUNT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Bem-vindo ao Events Project, {{userName}}!',
      body_template: `
        <h1>Olá {{userName}}!</h1>
        <p>Bem-vindo ao <strong>Events Project</strong>!</p>
        <p>Estamos felizes em tê-lo conosco.</p>
        <p>Seu email: {{userEmail}}</p>
      `,
    },
  });

  const verificationTemplate = await prisma.notificationTemplate.create({
    data: {
      template_name: 'account_verification_email',
      notification_type: NotificationType.ACCOUNT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Verificação de conta - Events Project',
      body_template: `
        <h1>Verificação de Conta</h1>
        <p>Olá {{userName}},</p>
        <p>Clique no link abaixo para verificar sua conta:</p>
        <a href="{{verificationLink}}">Verificar Conta</a>
      `,
    },
  });

  const passwordResetTemplate = await prisma.notificationTemplate.create({
    data: {
      template_name: 'account_password_reset_email',
      notification_type: NotificationType.ACCOUNT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Redefinição de senha - Events Project',
      body_template: `
        <h1>Redefinição de Senha</h1>
        <p>Olá {{userName}},</p>
        <p>Você solicitou redefinição de senha.</p>
        <p>Clique no link abaixo:</p>
        <a href="{{resetLink}}">Redefinir Senha</a>
      `,
    },
  });

  const eventRegistrationTemplate = await prisma.notificationTemplate.create({
    data: {
      template_name: 'event_registration_email',
      notification_type: NotificationType.EVENT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Inscrição confirmada: {{eventName}}',
      body_template: `
        <h1>Inscrição Confirmada!</h1>
        <p>Olá {{userName}},</p>
        <p>Sua inscrição no evento <strong>{{eventName}}</strong> foi confirmada!</p>
        <p>Data: {{eventDate}}</p>
        <p>Local: {{eventLocation}}</p>
        <p>ID do Evento: {{eventId}}</p>
      `,
    },
  });

  const eventCancellationTemplate = await prisma.notificationTemplate.create({
    data: {
      template_name: 'event_cancellation_email',
      notification_type: NotificationType.EVENT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Evento cancelado: {{eventName}}',
      body_template: `
        <h1>Evento Cancelado</h1>
        <p>Olá {{userName}},</p>
        <p>Infelizmente, o evento <strong>{{eventName}}</strong> foi cancelado.</p>
        <p>ID do Evento: {{eventId}}</p>
        <p>Entraremos em contato em breve.</p>
      `,
    },
  });

  const paymentConfirmationTemplate = await prisma.notificationTemplate.create({
    data: {
      template_name: 'payment_confirmation_email',
      notification_type: NotificationType.PAYMENTS,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Pagamento confirmado - R$ {{amount}}',
      body_template: `
        <h1>Pagamento Confirmado!</h1>
        <p>Olá {{userName}},</p>
        <p>Seu pagamento foi confirmado com sucesso.</p>
        <p>Valor: R$ {{amount}}</p>
        <p>ID do Pagamento: {{paymentId}}</p>
        <p>Obrigado!</p>
      `,
    },
  });

  const paymentFailedTemplate = await prisma.notificationTemplate.create({
    data: {
      template_name: 'payment_failed_email',
      notification_type: NotificationType.PAYMENTS,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Falha no pagamento - R$ {{amount}}',
      body_template: `
        <h1>Falha no Pagamento</h1>
        <p>Olá {{userName}},</p>
        <p>Seu pagamento de R$ {{amount}} falhou.</p>
        <p>ID do Pagamento: {{paymentId}}</p>
        <p>Por favor, tente novamente.</p>
      `,
    },
  });

  console.log('✅ Templates criados:', {
    welcomeTemplate: welcomeTemplate.template_name,
    verificationTemplate: verificationTemplate.template_name,
    passwordResetTemplate: passwordResetTemplate.template_name,
    eventRegistrationTemplate: eventRegistrationTemplate.template_name,
    eventCancellationTemplate: eventCancellationTemplate.template_name,
    paymentConfirmationTemplate: paymentConfirmationTemplate.template_name,
    paymentFailedTemplate: paymentFailedTemplate.template_name,
  });

  const exampleUserId = '123e4567-e89b-12d3-a456-426614174000'; // UUID exemplo

  await prisma.userPreference.create({
    data: {
      user_id: exampleUserId,
      notification_type: NotificationType.MARKETING,
      channel: NotificationChannel.EMAIL,
      is_enabled: false,
    },
  });

  console.log('User preferences criadas');

  console.log('Seeds concluídas!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });