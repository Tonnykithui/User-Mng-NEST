import { SetMetadata } from "@nestjs/common";
import { Roles } from "../dto/create-user.dto";

export const ROLES_USER = 'roles'
export const RolesRequired = (...roles:Roles[]) => SetMetadata(ROLES_USER, roles);