import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventsModule } from './events/events.module';
import { join } from 'path';
import { authGuardProvider } from './auth/auth.provider';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EventsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    AuthModule
  ],
  providers: [authGuardProvider]
})
export class AppModule {}
