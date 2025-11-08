export interface ResolvedTemplate {
  subject: string;
  body: string;
}

export interface INotificationTemplateResolver {
  resolve(
    templateName: string,
    payload: Record<string, any>,
  ): Promise<ResolvedTemplate>;
}