import { PrismaClient, NotificationChannel, NotificationType } from '@prisma/client';

export async function seedPaymentTemplates(prisma: PrismaClient) {
  console.log('Criando templates de Payment...');

  await prisma.notificationTemplate.create({
  data: {
    template_name: 'payment_confirmation_email',
    notification_type: NotificationType.PAYMENTS,
    channel: NotificationChannel.EMAIL,
    subject_template: 'Pagamento confirmado - {{title}}',
    body_template: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #F5F5F5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            background: #274156;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px 20px;
          }
          .payment-info {
            background: #F5F5F5;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .footer {
            background: #f9f9f9;
            text-align: center;
            padding: 15px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Pagamento Confirmado</h1>
          </div>
          <div class="content">
            <p>Olá <strong>{{userName}}</strong>,</p>
            <p>Seu pagamento para o evento <strong>{{title}}</strong> foi confirmado com sucesso.</p>
            
            <div class="payment-info">
              <p><strong>Valor pago:</strong> R$ {{amountPaid}}</p>
              <p><strong>Método de pagamento:</strong> {{paymentMethod}}</p>
              <p><strong>Data do pagamento:</strong> {{paymentDate}}</p>
            </div>

            <p>Agora você está confirmado no evento. Nos vemos lá!</p>
          </div>
          <div class="footer">
            <p>Events Project © 2025</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
});

  await prisma.notificationTemplate.create({
  data: {
    template_name: 'payment_failed_email',
    notification_type: NotificationType.PAYMENTS,
    channel: NotificationChannel.EMAIL,
    subject_template: 'Pagamento cancelado - {{title}}',
    body_template: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #F5F5F5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            background: #274156;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px 20px;
          }
          .payment-info {
            background: #F5F5F5;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .footer {
            background: #f9f9f9;
            text-align: center;
            padding: 15px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Pagamento Cancelado</h1>
          </div>
          <div class="content">
            <p>Olá <strong>{{userName}}</strong>,</p>
            <p>Seu pagamento para o evento <strong>{{title}}</strong> foi cancelado.</p>

            <div class="payment-info">
              <p><strong>Valor pago:</strong> R$ {{amountPaid}}</p>
              <p><strong>Método de pagamento:</strong> {{paymentMethod}}</p>
              {{#if refundProcessed}}
                <p><strong>Status do reembolso:</strong> Processado</p>
              {{else}}
                <p><strong>Status do reembolso:</strong> Em análise</p>
              {{/if}}
            </div>

            <p>Se você acredita que houve um erro, entre em contato com nosso suporte.</p>
          </div>
          <div class="footer">
            <p>Events Project © 2025</p>
          </div>
        </div>
      </body>
      </html>
    `,
    },
  });

  console.log('Templates de Payment criados');
}