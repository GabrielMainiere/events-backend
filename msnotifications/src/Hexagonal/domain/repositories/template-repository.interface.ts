import { Template } from "../models/template.model";

export interface ITemplateRepository {
  save(template: Template): Promise<void>;
  findById(id: string): Promise<Template | null>;
  findByName(templateName: string): Promise<Template | null>;
  findAll(): Promise<Template[]>;
  delete(id: string): Promise<void>;
  findByType(notificationType: string): Promise<Template[]>;
}