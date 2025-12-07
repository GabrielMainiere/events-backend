import { Injectable, Logger } from '@nestjs/common';
import * as handlebars from 'handlebars';
import { ITemplateRenderer } from 'src/Hexagonal/domain/services/interface/template-renderer.interface';

@Injectable()
export class HandlebarsTemplateRenderer implements ITemplateRenderer {
  private readonly logger = new Logger(HandlebarsTemplateRenderer.name);
  
  render(template: string, data: Record<string, any>): string {
    try {
      const compiledTemplate = handlebars.compile(template);
      return compiledTemplate(data);
    } catch (error) {
      this.logger.error(`Falha ao renderizar o template | ${error.message}`);
      throw new Error(`Falha ao renderizar o template: ${error.message}`);
    }
  }

  validate(template: string): boolean {
    try {
      handlebars.compile(template);
      return true;
    } catch (error) {
      this.logger.warn(`Falha ao validar o template | ${error.message}`);
      return false;
    }
  }

  extractVariables(template: string): string[] {
    const variableRegex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;

    while ((match = variableRegex.exec(template)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    return variables;
  }
}
