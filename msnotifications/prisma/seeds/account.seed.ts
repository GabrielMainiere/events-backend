import { PrismaClient, NotificationChannel, NotificationType } from '@prisma/client';

export async function seedAccountTemplates(prisma: PrismaClient) {
  console.log('Criando templates de Account...');

  await prisma.notificationTemplate.create({
  data: {
  template_name: 'account_welcome_email',
  notification_type: NotificationType.ACCOUNT,
  channel: NotificationChannel.EMAIL,
  subject_template: 'Bem-vindo ao Events Project, {{name}}!',
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
          <h1>Bem-vindo!</h1>
          <p>Estamos felizes em ter você conosco 🎉</p>
        </div>
        <div class="content">
          <p>Olá <strong>{{name}}</strong>,</p>
          <p>Sua conta foi criada com sucesso no <strong>Events Project</strong>.</p>
          <p>Agora você pode explorar e participar de eventos incríveis!</p>
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
  template_name: 'account_verification_email',
  notification_type: NotificationType.ACCOUNT,
  channel: NotificationChannel.EMAIL,
  subject_template: 'Verificação de conta - Events Project',
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
        .verification-box {
          background: #F5F5F5;
          border: 2px dashed #274156;
          padding: 25px;
          border-radius: 8px;
          text-align: center;
          margin: 25px 0;
        }
        .verification-box p {
          font-size: 20px;
          font-weight: bold;
          color: #274156;
          margin: 0;
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
          <h1>Verificação de Conta</h1>
          <p>Confirme seu email para ativar sua conta</p>
        </div>
        <div class="content">
          <p>Olá <strong>{{name}}</strong>,</p>
          <p>Obrigado por se cadastrar no <strong>Events Project</strong>! Use o código abaixo para verificar sua conta:</p>
          <div class="verification-box">
            <p>{{userActivationCode}}</p>
          </div>
          <p style="font-size:14px; color:#666;">
            Se você não criou esta conta, ignore este email.
          </p>
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
    template_name: 'account_password_reset_email',
    notification_type: NotificationType.ACCOUNT,
    channel: NotificationChannel.EMAIL,
    subject_template: 'Redefinição de senha solicitada, {{name}}',
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
            text-align: center;
          }
          .btn {
            display: inline-block;
            background: #E0E0E0; /* cor clara consistente com o fundo */
            color: #274156; /* mesmo tom do cabeçalho */
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            transition: background 0.3s;
          }
          .btn:hover {
            background: #d5d5d5; /* leve escurecimento no hover */
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
            <h1>Redefinição de senha</h1>
            <p>Vamos te ajudar a recuperar o acesso</p>
          </div>
          <div class="content">
            <p>Olá <strong>{{name}}</strong>,</p>
            <p>Recebemos uma solicitação para redefinir sua senha.</p>
            <a href="{{resetLink}}" class="btn">Redefinir Senha</a>
            <p>Se você não solicitou essa ação, apenas ignore este e-mail.</p>
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

  console.log('Templates de Account criados.');
}