import * as handlebars from 'handlebars';

export class TemplateRenderingService {
  
  render(
    subjectTemplate: string,
    bodyTemplate: string,
    payload: Record<string, any>
  ): { subject: string; body: string } {
    const subject = this.compileTemplate(subjectTemplate, payload);
    const body = this.compileTemplate(bodyTemplate, payload);

    return { subject, body };
  }

  private compileTemplate(
    templateString: string,
    payload: Record<string, any>
  ): string {
    try {
      const compiledTemplate = handlebars.compile(templateString);
      return compiledTemplate(payload);
    } catch (error) {
      throw new Error(
        `Failed to compile template: ${error.message}. Template: "${templateString}"`
      );
    }
  }

  validateTemplate(templateString: string): boolean {
    try {
      handlebars.compile(templateString);
      return true;
    } catch (error) {
      return false;
    }
  }

  extractVariables(templateString: string): string[] {
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const variables: string[] = [];
    let match;

    while ((match = variableRegex.exec(templateString)) !== null) {
      const variableName = match[1]. trim();
      if (! variables.includes(variableName)) {
        variables.push(variableName);
      }
    }

    return variables;
  }

  validatePayloadForTemplate(
    templateString: string,
    payload: Record<string, any>
  ): { valid: boolean; missingVariables: string[] } {
    const requiredVariables = this.extractVariables(templateString);
    const missingVariables = requiredVariables.filter(
      variable => !(variable in payload)
    );

    return {
      valid: missingVariables.length === 0,
      missingVariables,
    };
  }
}