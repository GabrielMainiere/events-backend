import { SetMetadata } from "@nestjs/common"
import { RolesEnum } from "./roles.enum"

export const REQUIRED_ROLE = 'requiredRole'
export const RequiredRole = (role: RolesEnum) => SetMetadata(REQUIRED_ROLE, role)