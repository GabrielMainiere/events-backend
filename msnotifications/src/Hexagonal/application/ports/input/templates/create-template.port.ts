import { CreateTemplateCommand } from "src/Hexagonal/application/dtos/templates/create-template.command";

export interface ICreateTemplate {
  execute(command: CreateTemplateCommand): Promise<string>;
}