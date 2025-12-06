import { TemplateResponse } from "src/Hexagonal/application/dtos/templates/template.response";

export interface IGetTemplate {
  executeById(templateId: string): Promise<TemplateResponse>;
}
