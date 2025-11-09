import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RegistrationsModule } from './registrations/registrations.module';
import { authGuardProvider } from './auth/auth.provider'


@Module({
  imports: [
    RegistrationsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [authGuardProvider],
})
export class AppModule {}
