import { PrismaClient, NotificationChannel, NotificationType } from '@prisma/client';

export async function seedAccountTemplates(prisma: PrismaClient) {
  console.log('Criando templates de Account...');

  await prisma.notificationTemplate.create({
  data: {
    template_name: 'account_welcome_email',
    notification_type: NotificationType.ACCOUNT,
    channel: NotificationChannel.EMAIL,
    subject_template: '🎉 Bem-vindo ao Events Project, {{name}}!',
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
            background-color: #f4f4f4; 
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 32px; 
          }
          .welcome-icon { 
            font-size: 80px; 
            margin-bottom: 15px; 
          }
          .content { 
            padding: 30px 20px; 
          }
          .user-info { 
            background: #f9f9f9; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
            border-left: 4px solid #667eea; 
          }
          .info-row { 
            display: flex; 
            align-items: center; 
            margin: 10px 0; 
          }
          .info-icon { 
            font-size: 20px; 
            margin-right: 10px; 
            min-width: 25px; 
          }
          .features { 
            margin: 25px 0; 
          }
          .feature-item { 
            display: flex; 
            align-items: start; 
            margin: 15px 0; 
            padding: 15px; 
            background: #f9f9f9; 
            border-radius: 5px; 
          }
          .feature-icon { 
            font-size: 24px; 
            margin-right: 15px; 
          }
          .feature-text h4 { 
            margin: 0 0 5px 0; 
            color: #667eea; 
          }
          .feature-text p { 
            margin: 0; 
            color: #666; 
            font-size: 14px; 
          }
          .btn { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 15px 35px; 
            text-decoration: none; 
            border-radius: 5px; 
            font-weight: bold; 
            margin: 20px 0; 
          }
          .footer { 
            background: #f9f9f9; 
            text-align: center; 
            padding: 20px; 
            color: #666; 
            font-size: 12px; 
            border-top: 1px solid #eee; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="welcome-icon">🎉</div>
            <h1>Bem-vindo!</h1>
            <p style="margin: 10px 0; font-size: 18px; opacity: 0.9;">
              Estamos felizes em ter você conosco
            </p>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;">Olá <strong>{{name}}</strong>,</p>
            
            <p>Sua conta foi criada com sucesso! Agora você faz parte da comunidade Events Project.</p>
            
            <div class="user-info">
              <h3 style="margin: 0 0 15px 0; color: #667eea;">Seus Dados</h3>
              
              <div class="info-row">
                <span class="info-icon">📧</span>
                <span><strong>Email:</strong> {{email}}</span>
              </div>
              
              <div class="info-row">
                <span class="info-icon">📱</span>
                <span><strong>Telefone:</strong> {{phoneNumber}}</span>
              </div>
              
              <div class="info-row">
                <span class="info-icon">🆔</span>
                <span><strong>CPF:</strong> {{cpf}}</span>
              </div>
              
              <div class="info-row">
                <span class="info-icon">🎂</span>
                <span><strong>Data de Nascimento:</strong> {{birthDate}}</span>
              </div>
            </div>
            
            <div class="features">
              <h3 style="color: #333; margin-bottom: 15px;">O que você pode fazer agora:</h3>
              
              <div class="feature-item">
                <span class="feature-icon">🎫</span>
                <div class="feature-text">
                  <h4>Descobrir Eventos</h4>
                  <p>Explore eventos incríveis na sua região</p>
                </div>
              </div>
              
              <div class="feature-item">
                <span class="feature-icon">✅</span>
                <div class="feature-text">
                  <h4>Inscrições Rápidas</h4>
                  <p>Garanta sua vaga em poucos cliques</p>
                </div>
              </div>
              
              <div class="feature-item">
                <span class="feature-icon">🔔</span>
                <div class="feature-text">
                  <h4>Notificações Personalizadas</h4>
                  <p>Receba lembretes dos seus eventos</p>
                </div>
              </div>
              
              <div class="feature-item">
                <span class="feature-icon">👤</span>
                <div class="feature-text">
                  <h4>Perfil Personalizado</h4>
                  <p>Gerencie suas inscrições e preferências</p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{exploreEventsLink}}" class="btn">Explorar Eventos</a>
            </div>
            
            <div style="background: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin-top: 25px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px;">
                <strong>💡 Dica:</strong> Complete seu perfil para receber recomendações personalizadas de eventos!
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Bem-vindo à família Events Project!</strong></p>
            <p>Se tiver dúvidas, estamos à disposição: <strong>{{supportEmail}}</strong></p>
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
    subject_template: '🔐 Verificação de conta - Events Project',
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
            background-color: #f4f4f4; 
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
          }
          .header { 
            background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
          }
          .lock-icon { 
            font-size: 60px; 
            margin-bottom: 15px; 
          }
          .content { 
            padding: 30px 20px; 
          }
          .verification-box { 
            background: #e3f2fd; 
            border: 2px dashed #2196F3; 
            padding: 30px; 
            margin: 25px 0; 
            border-radius: 10px; 
            text-align: center; 
          }
          .btn { 
            display: inline-block; 
            background: #2196F3; 
            color: white; 
            padding: 15px 40px; 
            text-decoration: none; 
            border-radius: 5px; 
            font-weight: bold; 
            font-size: 16px; 
            margin: 15px 0; 
          }
          .security-note { 
            background: #fff3cd; 
            border-left: 4px solid #ffc107; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 4px; 
          }
          .footer { 
            background: #f9f9f9; 
            text-align: center; 
            padding: 20px; 
            color: #666; 
            font-size: 12px; 
            border-top: 1px solid #eee; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="lock-icon">🔐</div>
            <h1>Verificação de Conta</h1>
            <p style="margin: 10px 0; opacity: 0.9;">Confirme seu email para ativar sua conta</p>
          </div>
          
          <div class="content">
            <p>Olá <strong>{{name}}</strong>,</p>
            
            <p>Obrigado por se cadastrar no Events Project! Para garantir a segurança da sua conta, precisamos verificar seu email.</p>
            
            <div class="verification-box">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #1976D2;">
                O seu código de verificação é:
              </p>
              <p style="font-size: 24px; font-weight: bold; color: #1976D2;">
                {{userActivationCode}}
              </p>
            </div>
            
            <div class="security-note">
              <p style="margin: 0; font-weight: bold;">🔒 Segurança em Primeiro Lugar</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                Se você não criou uma conta no Events Project, por favor ignore este email.
              </p>
            </div>
            
          </div>
          
          <div class="footer">
            <p>Events Project © 2025</p>
            <p>Dúvidas? Entre em contato: <strong>{{supportEmail}}</strong></p>
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
    subject_template: '🔑 Redefinição de senha - Events Project',
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
            background-color: #f4f4f4; 
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
          }
          .header { 
            background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
          }
          .key-icon { 
            font-size: 60px; 
            margin-bottom: 15px; 
          }
          .content { 
            padding: 30px 20px; 
          }
          .reset-box { 
            background: #fff3e0; 
            border: 2px dashed #FF9800; 
            padding: 30px; 
            margin: 25px 0; 
            border-radius: 10px; 
            text-align: center; 
          }
          .btn { 
            display: inline-block; 
            background: #FF9800; 
            color: white; 
            padding: 15px 40px; 
            text-decoration: none; 
            border-radius: 5px; 
            font-weight: bold; 
            font-size: 16px; 
            margin: 15px 0; 
          }
          .alert-box { 
            background: #ffebee; 
            border-left: 4px solid #f44336; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 4px; 
          }
          .info-box { 
            background: #f9f9f9; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 5px; 
          }
          .footer { 
            background: #f9f9f9; 
            text-align: center; 
            padding: 20px; 
            color: #666; 
            font-size: 12px; 
            border-top: 1px solid #eee; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="key-icon">🔑</div>
            <h1>Redefinir Senha</h1>
            <p style="margin: 10px 0; opacity: 0.9;">Solicitação de nova senha</p>
          </div>
          
          <div class="content">
            <p>Olá <strong>{{name}}</strong>,</p>
            
            <p>Recebemos uma solicitação para redefinir a senha da sua conta no Events Project.</p>
            
            <div class="reset-box">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #E65100;">
                Clique no botão abaixo para criar uma nova senha:
              </p>
              <a href="{{resetLink}}" class="btn">Redefinir Minha Senha</a>
              <p style="margin: 20px 0 0 0; font-size: 14px; color: #666;">
                Este link é válido por <strong>1 hora</strong>
              </p>
            </div>
            
            <div class="info-box">
              <p style="margin: 0; font-size: 14px;"><strong>ℹ️ Informações da Conta:</strong></p>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
                <strong>Email:</strong> {{email}}<br>
                <strong>CPF:</strong> {{cpf}}<br>
                <strong>Solicitado em:</strong> {{requestedAt}}
              </p>
            </div>
            
            <div class="alert-box">
              <p style="margin: 0; font-weight: bold;">⚠️ Não solicitou esta alteração?</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                Se você não solicitou a redefinição de senha, ignore este email e sua senha permanecerá inalterada. 
                Recomendamos que você entre em contato conosco imediatamente.
              </p>
            </div>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 13px; color: #666;">
              <p style="margin: 0;"><strong>Problemas com o botão?</strong></p>
              <p style="margin: 5px 0 0 0;">
                Copie e cole este link no seu navegador:<br>
                <span style="word-break: break-all; color: #FF9800;">{{resetLink}}</span>
              </p>
            </div>
            
            <div style="background: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px;">
                <strong>💡 Dica de Segurança:</strong> Escolha uma senha forte com pelo menos 8 caracteres, 
                incluindo letras maiúsculas, minúsculas, números e símbolos.
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p>Events Project © 2025</p>
            <p>Suporte: <strong>{{supportEmail}}</strong> | <strong>{{supportPhone}}</strong></p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
});

  console.log('Templates de Account criados.');
}