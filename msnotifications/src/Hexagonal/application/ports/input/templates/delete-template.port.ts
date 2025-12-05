export interface IDeleteTemplate {
  execute(templateId: string): Promise<void>;
}