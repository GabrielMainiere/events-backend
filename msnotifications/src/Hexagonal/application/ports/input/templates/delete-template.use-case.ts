import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteTemplate } from './delete-template.port';
import type{ ITemplateRepository } from 'src/Hexagonal/domain/repositories/template-repository.interface';

@Injectable()
export class DeleteTemplateUseCase implements IDeleteTemplate {
  
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepo: ITemplateRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const template = await this.templateRepo.findById(id);
    
    if (!template) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }

    await this.templateRepo. delete(id);
  }
}