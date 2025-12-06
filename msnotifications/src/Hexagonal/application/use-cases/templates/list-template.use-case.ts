import { Inject, Injectable } from '@nestjs/common';
import { IListTemplates } from '../../ports/input/templates/list-templates.port';
import { TemplateResponse } from '../../dtos/templates/template.response';
import { TemplateMapper } from '../../mappers/template.mapper';
import type { ITemplateRepository } from '../../../domain/repositories/template-repository.interface';

@Injectable()
export class ListTemplatesUseCase implements IListTemplates {
  
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepo: ITemplateRepository,
  ) {}

  async execute(): Promise<TemplateResponse[]> {
    const templates = await this.templateRepo.findAll();
    return TemplateMapper.entityListToResponseList(templates);
  }
}