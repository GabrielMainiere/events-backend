import { Injectable, OnModuleInit } from '@nestjs/common';
import {Client, type ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { grpcClientUserOptions } from '../grpcClientUserOptions';
import { IUsersService } from '../interfaces/IUserService';
import { IUsersClient } from '../interfaces/IUsersClient';
import { IFindOneUserRequest } from '../interfaces/IFindOneUserRequest';
import { IUser } from '../interfaces/IUser';
import { IAuthenticateRequest } from '../interfaces/IAuthenticateRequest';
import { IAuthenticatedUser } from '../interfaces/IAuthenticatedUser';


@Injectable()
export class UsersClient implements IUsersClient, OnModuleInit {

  @Client(grpcClientUserOptions)
  private client: ClientGrpc;

  private usersService: IUsersService;

  onModuleInit() {
    this.usersService = this.client.getService<IUsersService>('UserService');
  }

  async findOne(userId: string): Promise<IUser> {
    const req: IFindOneUserRequest = { id: userId };
    const user = await firstValueFrom(this.usersService.FindOne(req));
    
    return user;
  }

  async authenticate(payload: IAuthenticateRequest): Promise<IAuthenticatedUser> {
    const auth = await firstValueFrom(this.usersService.Authenticate(payload));
    return auth;
  }
}
