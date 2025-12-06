import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { NotificationModule } from './notification.module';
import { TemplateModule } from './template.module';
import { UserPreferenceModule } from './user-preference.module';
import { RabbitMQModule } from './rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    NotificationModule,
    TemplateModule,
    UserPreferenceModule,
    RabbitMQModule,
    GraphQLModule. forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}