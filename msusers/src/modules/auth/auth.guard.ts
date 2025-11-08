import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

import { RolesEnum } from 'src/core/enums'
import { AuthService } from './auth.service'
import { REQUIRED_ROLE, IS_PUBLIC } from 'src/common/decorators/auth'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req

    const requiredRole = this.reflector.getAllAndOverride<RolesEnum>(REQUIRED_ROLE, [
      context.getHandler(),
      context.getClass(),
    ])
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const authorization: string | undefined = request.headers['authorization']
    const roleNames: RolesEnum[] | undefined = this.authService.validateToken(authorization)

    if (requiredRole && (!roleNames || !roleNames.some(role => role === requiredRole))) {
      throw new ForbiddenException('Usuário não autorizado')
    }

    return true
  }
}
