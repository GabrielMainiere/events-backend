import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { RoleModule } from './modules/role/role.module'
import { DatabaseModule } from './modules/database/database.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { authGuardProvider } from './modules/auth/auth.provider'

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
      },
    }),
    RoleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, authGuardProvider],
})
export class AppModule {}
