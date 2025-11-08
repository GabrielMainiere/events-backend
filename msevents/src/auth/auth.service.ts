import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

import { environment } from 'src/core/environment';
import { RolesEnum } from 'src/enum/roles';

type JwtTokenObject = {
  iss: 'events-api';
  id: string;
  roleNames: RolesEnum[];
  iat: number;
  exp: number;
};

@Injectable()
export class AuthService {
  validateToken(authorization?: string): RolesEnum[] {
    if (!authorization || !authorization.startsWith('Bearer '))
      throw new UnauthorizedException('Token ausente ou malformado');

    const token = authorization.replace('Bearer ', '');
    const decodedToken = verify(token, environment.jwtPass) as JwtTokenObject;

    return decodedToken?.roleNames || [];
  }
}
