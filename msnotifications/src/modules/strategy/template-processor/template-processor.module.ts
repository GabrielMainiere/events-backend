import { Module } from '@nestjs/common';
import { HandlebarsTemplateProcessor } from './template-processor.service';

@Module({
  providers: [HandlebarsTemplateProcessor],
  exports: [HandlebarsTemplateProcessor],
})
export class TemplateProcessorModule {}