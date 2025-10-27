import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTemplateInput } from './createNotificationTemplate.input';

@InputType()
export class UpdateTemplateInput extends PartialType(CreateTemplateInput) {

}