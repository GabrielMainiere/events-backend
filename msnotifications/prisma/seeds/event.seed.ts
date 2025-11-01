import { PrismaClient, NotificationChannel, NotificationType } from '@prisma/client';

export async function seedEventTemplates(prisma: PrismaClient) {
  console.log('Criando templates de Event...');

  await prisma.notificationTemplate.create({
  data: {
    template_name: 'event_registration_email',
    notification_type: NotificationType.EVENT,
    channel: NotificationChannel.EMAIL,
    subject_template: '✅ Inscrição confirmada: {{title}}',
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
          .event-title { 
            color: #4CAF50; 
            font-size: 24px; 
            margin: 20px 0 15px 0; 
            text-align: center; 
          }
          .info-box { 
            background: #f9f9f9; 
            border-left: 4px solid #4CAF50; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 4px; 
          }
          .info-row { 
            display: flex; 
            align-items: start; 
            margin: 12px 0; 
          }
          .info-icon { 
            font-size: 20px; 
            margin-right: 12px; 
            min-width: 25px; 
          }
          .info-text { 
            flex: 1; 
          }
          .info-label { 
            font-size: 12px; 
            color: #666; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
            margin-bottom: 3px; 
          }
          .info-value { 
            font-size: 16px; 
            font-weight: bold; 
            color: #333; 
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
          .payment-info { 
            background: #fff3cd; 
            border-left: 4px solid #ffc107; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 4px; 
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
          .registration-id { 
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
            <h1>Inscrição Confirmada!</h1>
            <p style="margin: 10px 0; opacity: 0.9;">Você está inscrito</p>
          </div>
          
          <div class="content">
            <p>Olá <strong>{{userName}}</strong>,</p>
            
            <p>Sua inscrição foi confirmada com sucesso! Estamos animados para te ver no evento.</p>
            
            <h2 class="event-title">{{title}}</h2>
            
            {{#if description}}
            <p style="text-align: center; color: #666;">{{description}}</p>
            {{/if}}
            
            <div style="text-align: center;">
              <span class="status-badge">{{registrationStatus}}</span>
            </div>
            
            <div class="info-box">
              <div class="info-row">
                <span class="info-icon">📅</span>
                <div class="info-text">
                  <div class="info-label">Data e Hora</div>
                  <div class="info-value">{{startAt}}</div>
                  {{#if endAt}}
                  <div style="font-size: 14px; color: #666; margin-top: 3px;">Término: {{endAt}}</div>
                  {{/if}}
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">📍</span>
                <div class="info-text">
                  <div class="info-label">Local</div>
                  <div class="info-value">
                    {{addressStreet}}{{#if addressNumber}}, {{addressNumber}}{{/if}}
                  </div>
                  <div style="font-size: 14px; color: #666; margin-top: 3px;">
                    {{addressCity}} - {{addressState}}, {{addressZipcode}}
                  </div>
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">🎫</span>
                <div class="info-text">
                  <div class="info-label">Tipo de Evento</div>
                  <div class="info-value">{{eventType}}</div>
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">{{#if isFree}}🎁{{else}}💰{{/if}}</span>
                <div class="info-text">
                  <div class="info-label">Investimento</div>
                  <div class="info-value">
                    {{#if isFree}}
                      <span style="color: #4CAF50;">Gratuito</span>
                    {{else}}
                      R$ {{price}}
                    {{/if}}
                  </div>
                </div>
              </div>
            </div>
            
            {{#if isWaitingPayment}}
            <div class="payment-info">
              <p style="margin: 0; font-weight: bold;">⚠️ Atenção: Aguardando Pagamento</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                Sua inscrição será confirmada após a aprovação do pagamento.
              </p>
            </div>
            {{/if}}
            
            <div class="registration-id">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">
                CÓDIGO DE INSCRIÇÃO
              </div>
              <div style="font-size: 18px; font-weight: bold; color: #4CAF50;">
                {{registrationId}}
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="{{eventLink}}" class="btn">Ver Detalhes do Evento</a>
            </div>
            
            <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 12px; color: #666;">
              <p style="margin: 0;"><strong>Informações importantes:</strong></p>
              <ul style="margin: 10px 0 0 20px; padding: 0;">
                <li>Guarde este email como comprovante de inscrição</li>
                <li>Apresente o código de inscrição na entrada do evento</li>
                <li>Em caso de dúvidas, entre em contato conosco</li>
              </ul>
              <p style="margin: 10px 0 0 0;">
                <strong>ID do Evento:</strong> {{eventId}}
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Obrigado pela sua inscrição!</strong></p>
            <p>Nos vemos em breve! 🎉</p>
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
    subject_template: '❌ Evento cancelado: {{title}}',
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
          .event-title { 
            color: #ff6b6b; 
            font-size: 24px; 
            margin: 20px 0 15px 0; 
            text-align: center; 
          }
          .alert-box { 
            background: #ffebee; 
            border-left: 4px solid #ff6b6b; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 4px; 
          }
          .info-box { 
            background: #f9f9f9; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 5px; 
          }
          .info-row { 
            display: flex; 
            align-items: start; 
            margin: 12px 0; 
          }
          .info-icon { 
            font-size: 18px; 
            margin-right: 10px; 
            min-width: 25px; 
          }
          .info-text { 
            flex: 1; 
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
          .refund-info { 
            background: #d4edda; 
            border-left: 4px solid #4CAF50; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 4px; 
          }
          .btn { 
            display: inline-block; 
            background: #667eea; 
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
          .registration-id { 
            background: #f9f9f9; 
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
            <div class="alert-icon">❌</div>
            <h1>Evento Cancelado</h1>
            <p style="margin: 10px 0; opacity: 0.9;">Lamentamos informar</p>
          </div>
          
          <div class="content">
            <p>Olá <strong>{{userName}}</strong>,</p>
            
            <div class="alert-box">
              <p style="margin: 0; font-size: 16px; font-weight: bold;">
                Infelizmente, o evento foi cancelado.
              </p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                Sentimos muito pelo inconveniente. Entraremos em contato em breve com mais informações.
              </p>
            </div>
            
            <h2 class="event-title">{{title}}</h2>
            
            {{#if description}}
            <p style="text-align: center; color: #666;">{{description}}</p>
            {{/if}}
            
            <div style="text-align: center;">
              <span class="status-badge">CANCELADO</span>
            </div>
            
            <div class="info-box">
              <h3 style="margin: 0 0 15px 0; color: #333;">Informações do Evento Cancelado:</h3>
              
              <div class="info-row">
                <span class="info-icon">📅</span>
                <div class="info-text">
                  <strong>Data Prevista:</strong> {{startAt}}
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">📍</span>
                <div class="info-text">
                  <strong>Local:</strong> {{addressCity}} - {{addressState}}
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">🎫</span>
                <div class="info-text">
                  <strong>Tipo:</strong> {{eventType}}
                </div>
              </div>
              
              {{#unless isFree}}
              <div class="info-row">
                <span class="info-icon">💰</span>
                <div class="info-text">
                  <strong>Valor Pago:</strong> R$ {{price}}
                </div>
              </div>
              {{/unless}}
            </div>
            
            {{#unless isFree}}
            <div class="refund-info">
              <p style="margin: 0; font-weight: bold;">💚 Reembolso Automático</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                O valor de <strong>R$ {{price}}</strong> será reembolsado automaticamente em até 
                <strong>{{refundDays}} dias úteis</strong> na forma de pagamento original.
              </p>
            </div>
            {{/unless}}
            
            <div class="registration-id">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">
                CÓDIGO DE INSCRIÇÃO
              </div>
              <div style="font-size: 18px; font-weight: bold; color: #666;">
                {{registrationId}}
              </div>
            </div>
            
            {{#if cancellationReason}}
            <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Motivo do Cancelamento:</strong><br>
                {{cancellationReason}}
              </p>
            </div>
            {{/if}}
            
            <div style="text-align: center;">
              <a href="{{eventsLink}}" class="btn">Ver Outros Eventos Disponíveis</a>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px;">
                <strong>📧 Dúvidas?</strong><br>
                Entre em contato conosco pelo email <strong>{{supportEmail}}</strong> 
                ou telefone <strong>{{supportPhone}}</strong>.
              </p>
            </div>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 12px; color: #666;">
              <p style="margin: 0;">
                <strong>ID do Evento:</strong> {{eventId}}<br>
                <strong>Data do Cancelamento:</strong> {{cancelledAt}}
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Sentimos muito pelo inconveniente.</strong></p>
            <p>Esperamos vê-lo em nossos próximos eventos! 🙏</p>
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
    subject_template: '⏰ {{title}} acontece em breve!',
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
            color: #667eea; 
            font-size: 22px; 
            margin: 0 0 15px 0; 
          }
          .event-info { 
            background: #f9f9f9; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
          }
          .info-row { 
            margin: 12px 0; 
            display: flex; 
            align-items: start; 
          }
          .info-icon { 
            font-size: 18px; 
            margin-right: 10px; 
            min-width: 25px; 
          }
          .info-text { 
            flex: 1; 
          }
          .countdown { 
            background: #ff6b6b; 
            color: white; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
            margin: 20px 0; 
          }
          .countdown-number { 
            font-size: 36px; 
            font-weight: bold; 
          }
          .btn { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 12px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            font-weight: bold; 
            margin: 20px 0; 
          }
          .footer { 
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
            <h1>🎉 Lembrete de Evento</h1>
          </div>
          
          <div class="content">
            <p>Olá <strong>{{userName}}</strong>,</p>
            
            <div class="countdown">
              <div class="countdown-number">{{daysUntil}}</div>
              <div>dias para o evento!</div>
            </div>
            
            <h2 class="event-title">{{title}}</h2>
            
            {{#if description}}
            <p>{{description}}</p>
            {{/if}}
            
            <div class="event-info">
              <div class="info-row">
                <span class="info-icon">📅</span>
                <div class="info-text">
                  <strong>Data e Hora</strong><br>
                  {{startAt}}
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">📍</span>
                <div class="info-text">
                  <strong>Local</strong><br>
                  {{addressStreet}}{{#if addressNumber}}, {{addressNumber}}{{/if}}<br>
                  {{addressCity}} - {{addressState}}, {{addressZipcode}}
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">{{#if isFree}}🎁{{else}}💰{{/if}}</span>
                <div class="info-text">
                  <strong>Investimento</strong><br>
                  {{#if isFree}}
                    <span style="color: #4CAF50; font-weight: bold;">Gratuito</span>
                  {{else}}
                    R$ {{price}}
                  {{/if}}
                </div>
              </div>
              
              <div class="info-row">
                <span class="info-icon">👥</span>
                <div class="info-text">
                  <strong>Capacidade</strong><br>
                  {{capacity}} pessoas
                </div>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="{{eventLink}}" class="btn">Ver Detalhes do Evento</a>
            </div>
            
            <p style="font-size: 12px; color: #666; margin-top: 20px;">
              ID do Evento: {{eventId}}
            </p>
          </div>
          
          <div class="footer">
            <p>Não quer receber lembretes?</p>
            <a href="{{unsubscribeLink}}" style="color: #667eea;">Gerenciar preferências</a>
          </div>
        </div>
      </body>
      </html>
    `,
  },
});

  console.log('Templates de Event criados.');
}