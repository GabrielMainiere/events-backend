import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TemplateType } from './types/template.type';
import { CreateTemplateInput } from './input/create-template.input';
import { UpdateTemplateInput } from './input/update-template.input';
import { CreateTemplateUseCase } from 'src/Hexagonal/application/use-cases/templates/create-template.use-case';
import { UpdateTemplateUseCase } from 'src/Hexagonal/application/use-cases/templates/update-template.use-case';
import { GetTemplateByIdUseCase } from 'src/Hexagonal/application/use-cases/templates/get-by-id-template.use-case';
import { ListTemplatesUseCase } from 'src/Hexagonal/application/use-cases/templates/list-template.use-case';
import { DeleteTemplateUseCase } from 'src/Hexagonal/application/use-cases/templates/delete-template.use-case';
import { CreateTemplateCommand } from 'src/Hexagonal/application/dtos/templates/create-template.command';
import { UpdateTemplateCommand } from 'src/Hexagonal/application/dtos/templates/update-template.command';
import { RolesEnum } from 'src/common/roles.enum';
import { RequiredRole } from 'src/common/auth.decorators';

@Resolver(() => TemplateType)
export class TemplateResolver {
  constructor(
    private readonly createTemplateUseCase: CreateTemplateUseCase,
    private readonly updateTemplateUseCase: UpdateTemplateUseCase,
    private readonly getTemplateByIdUseCase: GetTemplateByIdUseCase,
    private readonly listTemplatesUseCase: ListTemplatesUseCase,
    private readonly deleteTemplateUseCase: DeleteTemplateUseCase,
  ) {}


  @Query(() => TemplateType, { nullable: true, description: 'Get template by ID' })
  @RequiredRole(RolesEnum.Admin)
  async template(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TemplateType | null> {
    const response = await this.getTemplateByIdUseCase.executeById(id);
    return response ?  this.mapToGraphQLType(response) : null;
  }


  @Query(() => [TemplateType], { description: 'List all templates' })
  @RequiredRole(RolesEnum.Admin)
  async templates(): Promise<TemplateType[]> {
    const responses = await this.listTemplatesUseCase.execute();
    return responses.map(r => this.mapToGraphQLType(r));
  }

  @Mutation(() => TemplateType, { description: 'Create new template' })
  @RequiredRole(RolesEnum.Admin)
  async createTemplate(
    @Args('input') input: CreateTemplateInput,
  ): Promise<TemplateType> {
    const command = new CreateTemplateCommand(
      input.templateName,
      input.notificationType,
      input.channel,
      input.subjectTemplate,
      input.bodyTemplate,
    );

    const response = await this.createTemplateUseCase.execute(command);
    return this.mapToGraphQLType(response);
  }

  @Mutation(() => TemplateType, { description: 'Update existing template' })
  @RequiredRole(RolesEnum.Admin)
  async updateTemplate(
    @Args('input') input: UpdateTemplateInput,
  ): Promise<TemplateType> {
    const command = new UpdateTemplateCommand(
      input.templateId,
      input.templateName,
      input.notificationType,
      input.channel,
      input.subjectTemplate,
      input.bodyTemplate,
    );

    const response = await this.updateTemplateUseCase.execute(command);
    return this.mapToGraphQLType(response);
  }


  @Mutation(() => Boolean, { description: 'Delete template by ID' })
  @RequiredRole(RolesEnum.Admin)
  async deleteTemplate(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.deleteTemplateUseCase.execute(id);
    return true;
  }

  private mapToGraphQLType(response: any): TemplateType {
    return {
      id: response. id,
      templateName: response.templateName,
      notificationType: response.notificationType,
      channel: response.channel,
      subjectTemplate: response. subjectTemplate,
      bodyTemplate: response.bodyTemplate,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }
}