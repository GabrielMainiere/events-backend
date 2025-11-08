import { PrismaClient, NotificationChannel, NotificationType } from '@prisma/client';

export async function seedEventTemplates(prisma: PrismaClient) {
  console.log('Criando templates de Event...');

  await prisma.notificationTemplate.create({
  data: {
      template_name: 'event_registration_email',
      notification_type: NotificationType.EVENT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Confirmação de inscrição - {{eventName}}',
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
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
          }
          .content {
            padding: 30px 20px;
          }
          .btn {
            display: inline-block;
            background: #274156;
            color: #F5F5F5 !important;
            padding: 12px 24px;
            text-decoration: none !important;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            transition: background 0.3s;
          }
          .btn:hover {
            background: #1f3445;
          }
          a, a:visited, a:hover, a:active {
            color: #F5F5F5 !important;
            text-decoration: none !important;
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
            <h1>Inscrição confirmada</h1>
          </div>
          <div class="content">
            <p>Olá <strong>{{name}}</strong>,</p>
            <p>Sua inscrição no evento <strong>{{eventName}}</strong> foi confirmada.</p>
            <p>Data do evento: {{eventDate}}</p>
            <p>Local: {{eventLocation}}</p>
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
      template_name: 'event_cancellation_email',
      notification_type: NotificationType.EVENT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Cancelamento de evento - {{eventName}}',
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
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
          }
          .content {
            padding: 30px 20px;
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
            <h1>Evento cancelado</h1>
          </div>
          <div class="content">
            <p>Olá <strong>{{name}}</strong>,</p>
            <p>Informamos que o evento <strong>{{eventName}}</strong> foi cancelado.</p>
            <p>Em breve você receberá informações sobre reembolso ou reagendamento.</p>
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
    template_name: 'event_waiting_payment_email',
    notification_type: NotificationType.EVENT,
    channel: NotificationChannel.EMAIL,
    subject_template: 'Aguardando pagamento - {{eventName}}',
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
          background: #F59E0B;
          color: #fff;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
        }
        .content {
          padding: 30px 20px;
        }
        .alert-box {
          background: #FEF3C7;
          border-left: 4px solid #F59E0B;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .alert-box p {
          margin: 5px 0;
        }
        .btn {
          display: inline-block;
          background: #F59E0B;
          color: #fff !important;
          padding: 12px 24px;
          text-decoration: none !important;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
          transition: background 0.3s;
        }
        .btn:hover {
          background: #D97706;
        }
        a, a:visited, a:hover, a:active {
          color: #fff !important;
          text-decoration: none !important;
        }
        .footer {
          background: #f9f9f9;
          text-align: center;
          padding: 15px;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #eee;
        }
        .event-details {
          background: #F9FAFB;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .event-details p {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Aguardando Pagamento</h1>
        </div>
        <div class="content">
          <p>Olá <strong>{{name}}</strong>,</p>
          <p>Sua pré-inscrição no evento <strong>{{eventName}}</strong> foi recebida com sucesso!</p>
          
          <div class="alert-box">
            <p><strong>Atenção:</strong></p>
            <p>Sua inscrição só será confirmada após a aprovação do pagamento.</p>
          </div>

          <div class="event-details">
            <p><strong>Data do evento:</strong> {{eventDate}}</p>
            <p><strong>Local:</strong> {{eventLocation}}</p>
            <p><strong>Valor:</strong> {{eventPrice}}</p>
          </div>

          <p>Você receberá um e-mail de confirmação assim que o pagamento for aprovado.</p>
          <p>Caso tenha alguma dúvida, entre em contato conosco.</p>
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
    template_name: 'event_reminder_email',
    notification_type: NotificationType.MARKETING,
    channel: NotificationChannel.EMAIL,
    subject_template: '{{title}} acontece em breve!',
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
          .event-title {
            color: #274156;
            font-size: 20px;
            margin: 10px 0 20px 0;
          }
          .event-info {
            background: #F5F5F5;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .info-row {
            margin: 10px 0;
          }
          .btn {
            display: inline-block;
            background: #274156;
            color: #F5F5F5;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 15px;
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
            <h1>Lembrete de Evento</h1>
          </div>
          <div class="content">
            <p>Olá <strong>{{name}}</strong>,</p>
            <p>O evento <strong>{{title}}</strong> acontecerá em breve.</p>

            <div class="event-info">
              <p><strong>Data e hora:</strong> {{startAt}}</p>
              <p><strong>Local:</strong> {{addressStreet}}{{#if addressNumber}}, {{addressNumber}}{{/if}}, {{addressCity}} - {{addressState}}</p>
              {{#if isFree}}
                <p><strong>Entrada:</strong> Gratuita</p>
              {{else}}
                <p><strong>Valor:</strong> R$ {{price}}</p>
              {{/if}}
            </div>

            <div style="text-align: center;">
              <a href="{{eventLink}}" class="btn">Ver Detalhes do Evento</a>
            </div>
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
      template_name: 'event_checkin_email',
      notification_type: NotificationType.EVENT,
      channel: NotificationChannel.EMAIL,
      subject_template: 'Confirmação de check-in - {{eventName}}',
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
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
          }
          .content {
            padding: 30px 20px;
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
            <h1>Confirmação de Check-in</h1>
          </div>
          <div class="content">
            <p>Olá <strong>{{name}}</strong>,</p>
            <p>Seu check-in para o evento <strong>{{eventName}}</strong> foi confirmado com sucesso!</p>
            <p>Aguardamos você no dia {{eventDate}}.</p>
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

  console.log('Templates de Event criados.');
}