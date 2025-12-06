import { TemplateResponse } from "src/Hexagonal/application/dtos/templates/template.response";
import { UpdateTemplateCommand } from "src/Hexagonal/application/dtos/templates/update-template.command";

export interface IUpdateTemplate {
  execute(command: UpdateTemplateCommand): Promise<TemplateResponse>;
}