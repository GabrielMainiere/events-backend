import { Controller } from '@nestjs/common'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'FindOne')
  async findOne(data: { id: string }) {
    return await this.userService.findOne(data.id)
  }

  @GrpcMethod('UserService', 'Authenticate')
  async authenticate(data: { email: string; password: string }) {
    return await this.userService.authenticate(data.email, data.password).catch((error: any) => {
      throw new RpcException({ message: error.message })
    })
  }
}
