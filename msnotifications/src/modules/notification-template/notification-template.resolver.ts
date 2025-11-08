import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateEntity } from 'src/common/entities/notification-template.entity';
import { CreateTemplateInput } from 'src/common/dto/createNotificationTemplate.input';
import { UpdateTemplateInput } from 'src/common/dto/updateNotificationTemplate.input';
import { Inject } from '@nestjs/common';
import type { INotificationTemplateService } from './interfaces/iNotificationTemplateService';


@Resolver(() => NotificationTemplateEntity)
export class NotificationTemplateResolver {
  constructor(
    @Inject('INotificationTemplateService')
    private readonly templateService: INotificationTemplateService,
  ) {}

  @Query(() => [NotificationTemplateEntity], { name: 'notificationTemplates' })
  async findAll() {
    return this.templateService.findAll();
  }

  @Query(() => NotificationTemplateEntity, { name: 'notificationTemplate' })
  async findOne(@Args('id') id: string) {
    return this.templateService.findOne(id);
  }

  @Query(() => NotificationTemplateEntity, { name: 'notificationTemplateByName', nullable: true })
  async findByName(@Args('template_name') template_name: string) {
    return this.templateService.findByName(template_name);
  }

  @Mutation(() => NotificationTemplateEntity)
  async createNotificationTemplate(
    @Args('input') input: CreateTemplateInput,
  ) {
    return this.templateService.create(input);
  }

  @Mutation(() => NotificationTemplateEntity)
  async updateNotificationTemplate(
    @Args('id') id: string,
    @Args('input') input: UpdateTemplateInput,
  ) {
    return this.templateService.update(id, input);
  }

  @Mutation(() => NotificationTemplateEntity)
  async deleteNotificationTemplate(@Args('id') id: string) {
    return this.templateService.delete(id);
  }
}