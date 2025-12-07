import { TemplateResponse } from "src/Hexagonal/application/dtos/templates/template.response";

export interface IListTemplates {
  execute(): Promise<TemplateResponse[]>;
}
