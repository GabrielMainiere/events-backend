import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationProcessorService } from './notification-processor.service';
import { PayloadHelper } from '../../common/helper/payload.helper';
import type { AccountNotificationRequest } from '../../common/interfaces/iAccountNotificationRequest';
import type { EventNotificationRequest } from '../../common/interfaces/iEventNotificationRequest';
import type { PaymentNotificationRequest } from '../../common/interfaces/iPaymentNotificationRequest';
import type { NotificationResponse } from '../../common/interfaces/iNotificationResponse';
import type{ IRequestLogger } from '../logger/interfaces/iLogger';


@Controller()
export class NotificationImplementation {

  constructor(
    private readonly processor: NotificationProcessorService,
    @Inject('IRequestLogger')
    private readonly requestLogger: IRequestLogger,
    private readonly payloadHelper: PayloadHelper,
  ) {}

  @GrpcMethod('NotificationService', 'SendAccountNotification')
  async sendAccountNotification(data: AccountNotificationRequest): Promise<NotificationResponse> {
    this.requestLogger.logRequestReceived('SendAccountNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: data.payloadJson,
      templateName: data.templateName,
    });
  }


  @GrpcMethod('NotificationService', 'SendEventNotification')
  async sendEventNotification(data: EventNotificationRequest): Promise<NotificationResponse> {
    this.requestLogger.logRequestReceived('SendEventNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithEventId(data.payloadJson, data.eventId),
      templateName: data.templateName,
    });
  }


  @GrpcMethod('NotificationService', 'SendPaymentNotification')
  async sendPaymentNotification(data: PaymentNotificationRequest): Promise<NotificationResponse> {
    this.requestLogger.logRequestReceived('SendPaymentNotification', {
      userId: data.userId,
      recipientAddress: data.recipientAddress,
    });

    return this.processor.process({
      userId: data.userId,
      recipientAddress: data.recipientAddress,
      payloadJson: this.payloadHelper.enrichWithPaymentId(data.payloadJson, data.paymentId),
      templateName: data.templateName,
    });
  }
}