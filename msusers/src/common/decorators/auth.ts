import { SetMetadata } from '@nestjs/common'
import { RolesEnum } from 'src/core/enums'

export const REQUIRED_ROLE = 'requiredRole'
export const RequiredRole = (role: RolesEnum) => SetMetadata(REQUIRED_ROLE, role)

export const IS_PUBLIC = 'isPublic'
export const isPublic = () => SetMetadata(IS_PUBLIC, true)
