import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { RolesEnum } from 'src/common/enum/roles'
import { REQUIRED_ROLE } from './auth.decorators'


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req

    const requiredRole = this.reflector.getAllAndOverride<RolesEnum>(REQUIRED_ROLE, [
      context.getHandler(),
      context.getClass(),
    ])

    const roleNames: RolesEnum[] | undefined = request.headers['x-request-rolenames']?.split(',')

    if (requiredRole && (!roleNames || !roleNames.some(role => role === requiredRole))) {
      throw new ForbiddenException('Usuário não autorizado')
    }

    return true
  }
}
