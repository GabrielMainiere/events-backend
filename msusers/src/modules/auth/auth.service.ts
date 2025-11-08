import { Injectable, UnauthorizedException } from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { JwtTokenObject } from 'src/common/types/jwt-token-object'
import { RolesEnum } from 'src/core/enums'
import { environment } from 'src/core/environment'

@Injectable()
export class AuthService {
  validateToken(authorization?: string): RolesEnum[] {
    if (!authorization || !authorization.startsWith('Bearer '))
      throw new UnauthorizedException('Token ausente ou malformado')

    const token = authorization.replace('Bearer ', '')
    const decodedToken = verify(token, environment.jwtPass) as JwtTokenObject

    return decodedToken?.roleNames || []
  }
}
