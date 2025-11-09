import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationTemplateEntity } from 'src/common/entities/notification-template.entity';
import { CreateTemplateInput } from 'src/common/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/common/dto/updateNotificationTemplate.input';
import { Inject } from '@nestjs/common';
import type { INotificationTemplateService } from './interfaces/iNotificationTemplateService';
import { RolesEnum } from 'src/common/enum/roles'
import { RequiredRole } from '../auth/auth.decorators';


@Resolver(() => NotificationTemplateEntity)
export class NotificationTemplateResolver {
  constructor(
    @Inject('INotificationTemplateService')
    private readonly templateService: INotificationTemplateService,
  ) {}

  @Query(() => [NotificationTemplateEntity], { name: 'notificationTemplates' })
  @RequiredRole(RolesEnum.Admin)
  async findAll() {
    return this.templateService.findAll();
  }

  @Query(() => NotificationTemplateEntity, { name: 'notificationTemplate' })
  @RequiredRole(RolesEnum.Admin)
  async findOne(@Args('id') id: string) {
    return this.templateService.findOne(id);
  }

  @Query(() => NotificationTemplateEntity, { name: 'notificationTemplateByName', nullable: true })
  @RequiredRole(RolesEnum.Admin)
  async findByName(@Args('template_name') template_name: string) {
    return this.templateService.findByName(template_name);
  }

  @Mutation(() => NotificationTemplateEntity)
  @RequiredRole(RolesEnum.Admin)
  async createNotificationTemplate(
    @Args('input') input: CreateTemplateInput,
  ) {
    return this.templateService.create(input);
  }

  @Mutation(() => NotificationTemplateEntity)
  @RequiredRole(RolesEnum.Admin)
  async updateNotificationTemplate(
    @Args('id') id: string,
    @Args('input') input: UpdateTemplateInput,
  ) {
    return this.templateService.update(id, input);
  }

  @Mutation(() => NotificationTemplateEntity)
  @RequiredRole(RolesEnum.Admin)
  async deleteNotificationTemplate(@Args('id') id: string) {
    return this.templateService.delete(id);
  }
}