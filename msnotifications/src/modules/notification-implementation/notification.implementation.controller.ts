import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationProcessorService } from './notification-processor.service';
import { RequestLogger} from '../logger/request-logger';
import { PayloadHelper } from '../../common/helper/payload.helper';
import type{ AccountNotificationRequest } from '../../common/interfaces/iAccountNotificationRequest';
import type{ EventNotificationRequest } from '../../common/interfaces/iEventNotificationRequest';
import type{ PaymentNotificationRequest } from '../../common/interfaces/iPaymentNotificationRequest';
import type{ NotificationResponse } from '../../common/interfaces/iNotificationResponse';


@Controller()
export class NotificationImplementation {

  private readonly defaultTemplates = {
    welcome: 'account_welcome_email',
    verification: 'account_verification_email',
    passwordReset: 'account_password_reset_email',
    eventRegistration: 'event_registration_email',
    eventCancellation: 'event_cancellation_email',
    eventReminder: 'event_reminder_email',
    paymentConfirmation: 'payment_confirmation_email',
    paymentFailed: 'payment_failed_email',
  };

  constructor(
    private readonly processor: NotificationProcessorService,
    private readonly requestLog: RequestLogger,
    private readonly payloadHelper: PayloadHelper,
  ) {}

  @GrpcMethod('NotificationService', 'SendWelcomeNotification')
  async sendWelcomeNotification(data: AccountNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendWelcomeNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    const templateName = data.templateName || this.defaultTemplates.welcome;

    return this.processor.process({
      ...data,
      templateName,
    });
  }

  @GrpcMethod('NotificationService', 'SendVerificationNotification')
  async sendVerificationNotification(data: AccountNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendVerificationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    const templateName = data.templateName || this.defaultTemplates.verification;

    return this.processor.process({
      ...data,
      templateName,
    });
  }

  @GrpcMethod('NotificationService', 'SendPasswordResetNotification')
  async sendPasswordResetNotification(data: AccountNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendPasswordResetNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    const templateName = data.templateName || this.defaultTemplates.passwordReset;

    return this.processor.process({
      ...data,
      templateName,
    });
  }


  @GrpcMethod('NotificationService', 'SendEventRegistrationNotification')
  async sendEventRegistrationNotification(data: EventNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendEventRegistrationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    const templateName = data.templateName || this.defaultTemplates.eventRegistration;

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithEventId(data.payloadJson, data.eventId),
      templateName,
    });
  }


  @GrpcMethod('NotificationService', 'SendEventCancellationNotification')
  async sendEventCancellationNotification(data: EventNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendEventCancellationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    const templateName = data.templateName || this.defaultTemplates.eventCancellation;

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithEventId(data.payloadJson, data.eventId),
      templateName,
    });
  }

  @GrpcMethod('NotificationService', 'SendEventReminderNotification')
  async sendEventReminderNotification(data: EventNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendEventReminderNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    const templateName = data.templateName || this.defaultTemplates.eventReminder;

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithEventId(data.payloadJson, data.eventId),
      templateName,
    });
  }

  @GrpcMethod('NotificationService', 'SendPaymentConfirmationNotification')
  async sendPaymentConfirmationNotification(data: PaymentNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendPaymentConfirmationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    const templateName = data.templateName || this.defaultTemplates.paymentConfirmation;

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithPaymentId(data.payloadJson, data.paymentId),
      templateName,
    });
  }

  @GrpcMethod('NotificationService', 'SendPaymentFailedNotification')
  async sendPaymentFailedNotification(data: PaymentNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendPaymentFailedNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });
    
    const templateName = data.templateName || this.defaultTemplates.paymentFailed;
    
    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithPaymentId(data.payloadJson, data.paymentId),
      templateName,
    });
  }
}