import { CreateTemplateCommand } from "src/Hexagonal/application/dtos/templates/create-template.command";
import { TemplateResponse } from "src/Hexagonal/application/dtos/templates/template.response";

export interface ICreateTemplate {
  execute(command: CreateTemplateCommand): Promise<TemplateResponse>;
}