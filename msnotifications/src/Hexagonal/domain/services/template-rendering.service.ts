import { ITemplateRenderer } from "./interface/template-renderer.interface";

export class TemplateRenderingService {
  constructor(private readonly renderer: ITemplateRenderer) {}  

  render(
    subjectTemplate: string,
    bodyTemplate: string,
    payload: Record<string, any>
  ): { subject: string; body: string } {
    const subject = this.renderer.render(subjectTemplate, payload);
    const body = this.renderer.render(bodyTemplate, payload);

    return { subject, body };
  }

  validateTemplate(templateString: string): boolean {
    return this.renderer.validate(templateString);
  }

  extractVariables(templateString: string): string[] {
    return this.renderer.extractVariables(templateString);
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