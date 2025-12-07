import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';

export class Template {
  public readonly id: string;
  public readonly notificationType: NotificationType;
  public readonly channel: NotificationChannel;
  public readonly createdAt: Date;
  private _templateName: string;
  private _subjectTemplate: string;
  private _bodyTemplate: string;
  private _updatedAt: Date;

  constructor(
    id: string,
    templateName: string,
    notificationType: NotificationType,
    channel: NotificationChannel,
    subjectTemplate: string,
    bodyTemplate: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.  validateTemplateName(templateName);
    this.validateTemplateContent(subjectTemplate, bodyTemplate);

    this.id = id;
    this.notificationType = notificationType;
    this.channel = channel;
    this.createdAt = createdAt;
    this._templateName = templateName;
    this._subjectTemplate = subjectTemplate;
    this._bodyTemplate = bodyTemplate;
    this._updatedAt = updatedAt;
  }

  updateName(newName: string): void {
    this.  validateTemplateName(newName);
    this._templateName = newName;
    this._updatedAt = new Date();
  }

  updateContent(subject: string, body: string): void {
    this.validateTemplateContent(subject, body);
    this._subjectTemplate = subject;
    this._bodyTemplate = body;
    this._updatedAt = new Date();
  }

  private validateTemplateName(name: string): void {
    if (!  name || name.trim(). length === 0) {
      throw new Error('Template name cannot be empty');
    }

    if (name.length < 3 || name.length > 50) {
      throw new Error('Template name must be between 3 and 50 characters');
    }
  }

  private validateTemplateContent(subject: string, body: string): void {
    if (! subject || subject.  trim(). length === 0) {
      throw new Error('Subject template cannot be empty');
    }

    if (! body || body.trim().length === 0) {
      throw new Error('Body template cannot be empty');
    }

    if (subject.length > 200) {
      throw new Error('Subject template cannot exceed 200 characters');
    }

    if (body.length > 5000) {
      throw new Error('Body template cannot exceed 5000 characters');
    }
  }

  get templateName(): string {
    return this._templateName;
  }

  get subjectTemplate(): string {
    return this._subjectTemplate;
  }

  get bodyTemplate(): string {
    return this._bodyTemplate;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  equals(other: Template): boolean {
    return this.id === other.id;
  }
}