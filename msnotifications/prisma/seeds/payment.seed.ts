import { PrismaClient, NotificationChannel, NotificationType } from '@prisma/client';

export async function seedPaymentTemplates(prisma: PrismaClient) {
  console.log('Criando templates de Payment...');

  await prisma.notificationTemplate.create({
  data: {
    template_name: 'payment_confirmation_email',
    notification_type: NotificationType.PAYMENTS,
    channel: NotificationChannel.EMAIL,
    subject_template: 'Pagamento confirmado - R$ {{amount}}',
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
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
          }
          .success-icon { 
            font-size: 60px; 
            margin-bottom: 10px; 
          }
          .content { 
            padding: 30px 20px; 
          }
          .amount-box { 
            background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); 
            border-left: 4px solid #4CAF50; 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 8px; 
            text-align: center; 
          }
          .amount-label { 
            font-size: 14px; 
            color: #2e7d32; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
            margin-bottom: 10px; 
          }
          .amount-value { 
            font-size: 42px; 
            font-weight: bold; 
            color: #1b5e20; 
          }
          .info-box { 
            background: #f9f9f9; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
          }
          .info-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 12px 0; 
            border-bottom: 1px solid #eee; 
          }
          .info-row:last-child { 
            border-bottom: none; 
          }
          .info-label { 
            color: #666; 
            font-size: 14px; 
          }
          .info-value { 
            font-weight: bold; 
            color: #333; 
            text-align: right; 
          }
          .status-badge { 
            display: inline-block; 
            background: #4CAF50; 
            color: white; 
            padding: 8px 20px; 
            border-radius: 20px; 
            font-size: 14px; 
            font-weight: bold; 
            margin: 20px 0; 
          }
          .btn { 
            display: inline-block; 
            background: #4CAF50; 
            color: white; 
            padding: 12px 30px; 
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
          .payment-id { 
            background: #e8f5e9; 
            padding: 15px; 
            border-radius: 5px; 
            text-align: center; 
            margin: 20px 0; 
            font-family: monospace; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✅</div>
            <h1>Pagamento Confirmado!</h1>
            <p style="margin: 10px 0; opacity: 0.9;">Transação aprovada com sucesso</p>
          </div>
          
          <div class="content">
            <p>Olá <strong>{{userName}}</strong>,</p>
            
            <p>Seu pagamento foi processado e confirmado com sucesso! Obrigado pela sua confiança.</p>
            
            <div class="amount-box">
              <div class="amount-label">Valor Pago</div>
              <div class="amount-value">R$ {{amount}}</div>
            </div>
            
            <div style="text-align: center;">
              <span class="status-badge">PAGO</span>
            </div>
            
            <div class="info-box">
              <h3 style="margin: 0 0 15px 0; color: #333;">Detalhes da Transação</h3>
              
              <div class="info-row">
                <span class="info-label">Data e Hora</span>
                <span class="info-value">{{paidAt}}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Método de Pagamento</span>
                <span class="info-value">{{paymentMethod}}</span>
              </div>
              
              {{#if installments}}
              <div class="info-row">
                <span class="info-label">Parcelamento</span>
                <span class="info-value">{{installments}}x de R$ {{installmentAmount}}</span>
              </div>
              {{/if}}
              
              {{#if eventTitle}}
              <div class="info-row">
                <span class="info-label">Evento</span>
                <span class="info-value">{{eventTitle}}</span>
              </div>
              {{/if}}
              
              <div class="info-row">
                <span class="info-label">CPF</span>
                <span class="info-value">{{cpf}}</span>
              </div>
            </div>
            
            <div class="payment-id">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">
                ID DA TRANSAÇÃO
              </div>
              <div style="font-size: 16px; font-weight: bold; color: #4CAF50;">
                {{paymentId}}
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="{{receiptLink}}" class="btn">Ver Comprovante</a>
            </div>
            
            <div style="background: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px;">
                <strong>📧 Comprovante enviado!</strong><br>
                Uma cópia deste comprovante foi enviada para <strong>{{userEmail}}</strong>.
              </p>
            </div>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 12px; color: #666;">
              <p style="margin: 0;"><strong>Em caso de dúvidas:</strong></p>
              <p style="margin: 5px 0 0 0;">
                Entre em contato conosco através do email <strong>{{supportEmail}}</strong> 
                ou telefone <strong>{{supportPhone}}</strong>.
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Obrigado pela sua compra!</strong></p>
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
    subject_template: '❌ Falha no pagamento - R$ {{amount}}',
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
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
          }
          .alert-icon { 
            font-size: 60px; 
            margin-bottom: 10px; 
          }
          .content { 
            padding: 30px 20px; 
          }
          .amount-box { 
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); 
            border-left: 4px solid #ff6b6b; 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 8px; 
            text-align: center; 
          }
          .amount-label { 
            font-size: 14px; 
            color: #c62828; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
            margin-bottom: 10px; 
          }
          .amount-value { 
            font-size: 42px; 
            font-weight: bold; 
            color: #b71c1c; 
          }
          .alert-box { 
            background: #fff3cd; 
            border-left: 4px solid #ffc107; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 4px; 
          }
          .info-box { 
            background: #f9f9f9; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
          }
          .info-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 12px 0; 
            border-bottom: 1px solid #eee; 
          }
          .info-row:last-child { 
            border-bottom: none; 
          }
          .info-label { 
            color: #666; 
            font-size: 14px; 
          }
          .info-value { 
            font-weight: bold; 
            color: #333; 
            text-align: right; 
          }
          .status-badge { 
            display: inline-block; 
            background: #ff6b6b; 
            color: white; 
            padding: 8px 20px; 
            border-radius: 20px; 
            font-size: 14px; 
            font-weight: bold; 
            margin: 20px 0; 
          }
          .btn { 
            display: inline-block; 
            background: #ff6b6b; 
            color: white; 
            padding: 12px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            font-weight: bold; 
            margin: 20px 0; 
          }
          .reasons-list { 
            margin: 15px 0; 
            padding-left: 20px; 
          }
          .reasons-list li { 
            margin: 8px 0; 
            color: #666; 
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
            <div class="alert-icon">❌</div>
            <h1>Falha no Pagamento</h1>
            <p style="margin: 10px 0; opacity: 0.9;">Não foi possível processar a transação</p>
          </div>
          
          <div class="content">
            <p>Olá <strong>{{userName}}</strong>,</p>
            
            <div class="alert-box">
              <p style="margin: 0; font-size: 16px; font-weight: bold;">
                ⚠️ Seu pagamento não foi aprovado.
              </p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                Não se preocupe! Você pode tentar novamente com outro método de pagamento.
              </p>
            </div>
            
            <div class="amount-box">
              <div class="amount-label">Valor da Tentativa</div>
              <div class="amount-value">R$ {{amount}}</div>
            </div>
            
            <div style="text-align: center;">
              <span class="status-badge">RECUSADO</span>
            </div>
            
            <div class="info-box">
              <h3 style="margin: 0 0 15px 0; color: #333;">Detalhes da Tentativa</h3>
              
              <div class="info-row">
                <span class="info-label">Data e Hora</span>
                <span class="info-value">{{attemptedAt}}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Método de Pagamento</span>
                <span class="info-value">{{paymentMethod}}</span>
              </div>
              
              {{#if failureReason}}
              <div class="info-row">
                <span class="info-label">Motivo</span>
                <span class="info-value" style="color: #ff6b6b;">{{failureReason}}</span>
              </div>
              {{/if}}
              
              {{#if eventTitle}}
              <div class="info-row">
                <span class="info-label">Evento</span>
                <span class="info-value">{{eventTitle}}</span>
              </div>
              {{/if}}
            </div>
            
            <div style="background: #e3f2fd; border-left: 4px solid #2196F3; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #1565c0;">
                💡 Possíveis motivos da recusa:
              </p>
              <ul class="reasons-list">
                <li>Saldo insuficiente</li>
                <li>Dados do cartão incorretos</li>
                <li>Cartão vencido ou bloqueado</li>
                <li>Limite de crédito excedido</li>
                <li>Erro de comunicação com o banco</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="{{retryPaymentLink}}" class="btn">Tentar Novamente</a>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px;">
                <strong>💬 Precisa de ajuda?</strong><br>
                Entre em contato conosco pelo email <strong>{{supportEmail}}</strong> 
                ou telefone <strong>{{supportPhone}}</strong>.
              </p>
            </div>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 12px; color: #666;">
              <p style="margin: 0;">
                <strong>ID da Tentativa:</strong> {{paymentId}}
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Estamos aqui para ajudar!</strong></p>
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