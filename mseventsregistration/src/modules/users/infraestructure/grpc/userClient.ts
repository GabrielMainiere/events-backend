import { Injectable, OnModuleInit } from '@nestjs/common'
import { Client, type ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { grpcClientUserOptions } from './grpcClientUserOptions'
import { IUsersGrpcService } from './types/IUserGrpcService'
import { UserDomain } from '../../domain/user.entity'
import { IUsersClient } from '../../domain/IUsersClient'
import { FindOneUserRequest } from '../../application/dto/find-one-user.request'
import { FindOneUserResponse } from '../../application/dto/find-one-user.response'

@Injectable()
export class UsersClient implements IUsersClient, OnModuleInit {
  @Client(grpcClientUserOptions)
  private client: ClientGrpc

  private usersService: IUsersGrpcService

  onModuleInit() {
    this.usersService = this.client.getService<IUsersGrpcService>('UserService')
  }

  async findOne(userId: string): Promise<UserDomain> {
    const req: FindOneUserRequest = { id: userId }
    const user = await firstValueFrom(this.usersService.FindOne(req))

    return FindOneUserResponse.toDomain(user)
  }
}
