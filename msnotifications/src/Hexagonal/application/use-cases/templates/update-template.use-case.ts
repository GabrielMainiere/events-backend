import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { IUpdateTemplate } from '../../ports/input/templates/update-template.port';
import { UpdateTemplateCommand } from '../../dtos/templates/update-template.command';
import { TemplateResponse } from '../../dtos/templates/template.response';
import { TemplateMapper } from '../../mappers/template.mapper';
import type { ITemplateRepository } from '../../../domain/repositories/template-repository.interface';

@Injectable()
export class UpdateTemplateUseCase implements IUpdateTemplate {
  
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepo: ITemplateRepository,
  ) {}

  async execute(command: UpdateTemplateCommand): Promise<TemplateResponse> {
    const template = await this.templateRepo.findById(command.templateId);
    if (!template) {
      throw new NotFoundException(`Template with ID "${command.templateId}" not found`);
    }
    if (command.templateName && command.templateName !== template.templateName) {
      const existing = await this.templateRepo.findByName(command.templateName);
      if (existing && existing.id !== template.id) {
        throw new ConflictException(
          `Template with name "${command.templateName}" already exists`,
        );
      }
    }

    TemplateMapper.applyUpdateCommand(template, command);
    await this.templateRepo.save(template);
    return TemplateMapper.entityToResponse(template);
  }
}