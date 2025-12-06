export interface ITemplateRenderer {
  render(template: string, data: Record<string, any>): string;
  validate(template: string): boolean;
  extractVariables(template: string): string[];  
}