import { Module } from '@nestjs/common';
import { CreateTemplateUseCase } from '../../application/use-cases/templates/create-template.use-case';
import { UpdateTemplateUseCase } from '../../application/use-cases/templates/update-template.use-case';
import { GetTemplateByIdUseCase } from '../../application/use-cases/templates/get-by-id-template.use-case';
import { ListTemplatesUseCase } from '../../application/use-cases/templates/list-template.use-case';
import { DeleteTemplateUseCase } from 'src/Hexagonal/application/use-cases/templates/delete-template.use-case';
import { PrismaTemplateRepository } from '../adapters/output/persistence/prisma/repositories/prisma-template.repository';

@Module({
  providers: [
    CreateTemplateUseCase,
    UpdateTemplateUseCase,
    GetTemplateByIdUseCase,
    ListTemplatesUseCase,
    DeleteTemplateUseCase,

    {
      provide: 'ITemplateRepository',
      useClass: PrismaTemplateRepository,
    },
  ],
  exports: [
    CreateTemplateUseCase,
    UpdateTemplateUseCase,
    GetTemplateByIdUseCase,
    ListTemplatesUseCase,
    DeleteTemplateUseCase,
  ],
})
export class TemplateModule {}