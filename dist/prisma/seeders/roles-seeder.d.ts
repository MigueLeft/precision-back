import { PrismaClient, Permission } from '@prisma/client';
import { Logger } from '@nestjs/common';
interface RoleConfig {
    name: string;
    description: string;
    isSystem: boolean;
    permissionFilter: (permissions: Permission[]) => Permission[];
}
export declare const rolesConfig: RoleConfig[];
export declare function seedRoles(prisma: PrismaClient, logger: Logger, allPermissions: Permission[]): Promise<any>;
export {};
