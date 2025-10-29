import { NotificationTemplate } from '@prisma/client';

export interface ITemplateProcessor {
  process(
    template: NotificationTemplate,
    payload: Record<string, any>,
  ): {
    subject: string;
    body: string;
  };
}