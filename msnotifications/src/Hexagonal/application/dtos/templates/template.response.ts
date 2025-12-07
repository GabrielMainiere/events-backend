export class TemplateResponse {
  id: string;
  templateName: string;
  notificationType: string;
  channel: string;
  subjectTemplate: string;
  bodyTemplate: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<TemplateResponse>) {
    Object.assign(this, data);
  }
}