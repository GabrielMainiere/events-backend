import { Module } from '@nestjs/common';

import { TemplateModule } from './template.module';
import { UserPreferenceModule } from './user-preference.module';
import { NotificationModule } from './notification.module';
import { TemplateResolver } from '../adapters/input/graphql/template.resolver';
import { UserPreferenceResolver } from '../adapters/input/graphql/user-preference.resolver';

@Module({
  imports: [
    TemplateModule,       
    UserPreferenceModule,    
    NotificationModule,      
  ],
  providers: [
    TemplateResolver,
    UserPreferenceResolver,
  ],
})
export class GraphQLResolversModule {}