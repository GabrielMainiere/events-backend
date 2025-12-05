export interface Template {
  id: string;
  templateName: string;
  notificationType: string;
  channel: string;
  subjectTemplate: string;
  bodyTemplate: string;
  createdAt: Date;
  updatedAt: Date;
}