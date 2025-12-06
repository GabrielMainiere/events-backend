import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { ICreateTemplate } from '../../ports/input/templates/create-template.port';
import { CreateTemplateCommand } from '../../dtos/templates/create-template.command';
import { TemplateResponse } from '../../dtos/templates/template.response';
import { TemplateMapper } from '../../mappers/template.mapper';
import { TemplateFactory } from '../../../domain/factories/template.factory';
import type { ITemplateRepository } from '../../../domain/repositories/template-repository.interface';

@Injectable()
export class CreateTemplateUseCase implements ICreateTemplate {
  
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepo: ITemplateRepository,
  ) {}

  async execute(command: CreateTemplateCommand): Promise<TemplateResponse> {
    const existing = await this.templateRepo.findByName(command.templateName);
    if (existing) {
      throw new ConflictException(
        `Template with name "${command.templateName}" already exists`,
      );
    }

    const props = TemplateMapper.createCommandToDomainProps(command);
    const template = TemplateFactory.create(props);

    await this.templateRepo.save(template);
    return TemplateMapper.entityToResponse(template);
  }
}