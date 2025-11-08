import { Module } from '@nestjs/common';
import { HandlebarsTemplateProcessor } from './template-processor.service';

@Module({
  providers: [
    {
      provide: 'ITemplateProcessor',
      useClass: HandlebarsTemplateProcessor,
    },
  ],
  exports: [
    'ITemplateProcessor',
  ],
})
export class TemplateProcessorModule {}