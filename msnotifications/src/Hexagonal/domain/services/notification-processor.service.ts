import { Notification } from '../aggregates/notification.aggregate';
import { Template } from '../entities/template.entity';
import { TemplateRenderingService } from './template-rendering.service';

export class NotificationProcessorService {
  
  constructor(
    private readonly templateRenderingService: TemplateRenderingService,
  ) {}

  renderContent(
    notification: Notification,
    template: Template,
  ): { subject: string; body: string } {
    return this.templateRenderingService. render(
      template.subjectTemplate,
      template.bodyTemplate,
      notification.payload,
    );
  }

  startProcessing(notification: Notification): void {
    notification.startProcessing();
  }

  markAsSent(notification: Notification): void {
    notification.markAsSent();
  }

  markAsFailed(notification: Notification, error: Error): void {
    notification.markAsFailed(error);
  }
}