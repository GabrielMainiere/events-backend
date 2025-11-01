import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationProcessorService } from './notification-processor.service';
import { RequestLogDecorator } from '../decorator/request-log.decorator';
import { PayloadHelper } from './payload.helper';
import type{ AccountNotificationRequest } from './interfaces/iAccountNotificationRequest';
import type{ EventNotificationRequest } from './interfaces/iEventNotificationRequest';
import type{ PaymentNotificationRequest } from './interfaces/iPaymentNotificationRequest';
import type{ NotificationResponse } from './interfaces/iNotificationResponse';



@Controller()
export class NotificationImplementation {
  constructor(
    private readonly processor: NotificationProcessorService,
    private readonly requestLog: RequestLogDecorator,
    private readonly payloadHelper: PayloadHelper,
  ) {}

  @GrpcMethod('NotificationService', 'SendWelcomeNotification')
  async sendWelcomeNotification(data: AccountNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendWelcomeNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      ...data,
      templateName: 'account_welcome_email',
    });
  }

  @GrpcMethod('NotificationService', 'SendVerificationNotification')
  async sendVerificationNotification(data: AccountNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendVerificationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      ...data,
      templateName: 'account_verification_email',
    });
  }

  @GrpcMethod('NotificationService', 'SendPasswordResetNotification')
  async sendPasswordResetNotification(data: AccountNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendPasswordResetNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      ...data,
      templateName: 'account_password_reset_email',
    });
  }


  @GrpcMethod('NotificationService', 'SendEventRegistrationNotification')
  async sendEventRegistrationNotification(data: EventNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendEventRegistrationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithEventId(data.payloadJson, data.eventId),
      templateName: 'event_registration_email',
    });
  }


  @GrpcMethod('NotificationService', 'SendEventCancellationNotification')
  async sendEventCancellationNotification(data: EventNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendEventCancellationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithEventId(data.payloadJson, data.eventId),
      templateName: 'event_cancellation_email',
    });
  }


  @GrpcMethod('NotificationService', 'SendPaymentConfirmationNotification')
  async sendPaymentConfirmationNotification(data: PaymentNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendPaymentConfirmationNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithPaymentId(data.payloadJson, data.paymentId),
      templateName: 'payment_confirmation_email',
    });
  }

  @GrpcMethod('NotificationService', 'SendPaymentFailedNotification')
  async sendPaymentFailedNotification(data: PaymentNotificationRequest): Promise<NotificationResponse> {
    this.requestLog.logRequestReceived('SendPaymentFailedNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithPaymentId(data.payloadJson, data.paymentId),
      templateName: 'payment_failed_email',
    });
  }
}