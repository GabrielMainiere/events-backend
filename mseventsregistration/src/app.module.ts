import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { RegistrationsModule } from './modules/registrations/infraestructure/registrations.module'
import { authGuardProvider } from './auth/auth.provider'
import { EventsModule } from './modules/events/infraestructure/events.module'
import { DatabaseModule } from './modules/database/prisma.module'
import { UsersModule } from './modules/users/infraestructure/users.module'

@Module({
  imports: [
    EventsModule,
    UsersModule,
    DatabaseModule,
    RegistrationsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    })
  ],
  providers: [authGuardProvider]
})
export class AppModule {}
