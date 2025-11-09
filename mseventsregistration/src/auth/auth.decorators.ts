import { SetMetadata } from "@nestjs/common"
import { RolesEnum } from "src/enum/roles"

export const REQUIRED_ROLE = 'requiredRole'
export const RequiredRole = (role: RolesEnum) => SetMetadata(REQUIRED_ROLE, role)