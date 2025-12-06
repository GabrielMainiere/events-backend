import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TemplateResponse } from '../../dtos/templates/template.response';
import { TemplateMapper } from '../../mappers/template.mapper';
import type { ITemplateRepository } from '../../../domain/repositories/template-repository.interface';
import { IGetTemplate } from '../../ports/input/templates/get-template.port';

@Injectable()
export class GetTemplateByIdUseCase implements IGetTemplate {
  
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepo: ITemplateRepository,
  ) {}

  async executeById(id: string): Promise<TemplateResponse> {
    const template = await this.templateRepo. findById(id);
    
    if (!template) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }

    return TemplateMapper.entityToResponse(template);
  }
}