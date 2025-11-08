import { RolesEnum } from 'src/core/enums'

export type JwtTokenObject = {
  iss: 'events-api'
  id: string
  roleNames: RolesEnum[]
  iat: number
  exp: number
}
