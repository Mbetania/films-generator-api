import { SetMetadata } from '@nestjs/common';
import { EUserRole } from 'src/application';

export const Roles = (...roles: EUserRole[]) => SetMetadata(ROLES_TYPE, roles);
export const ROLES_TYPE = 'roles';
