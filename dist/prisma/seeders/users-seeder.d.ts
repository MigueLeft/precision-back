import { PrismaClient, Role } from '@prisma/client';
import { Logger } from '@nestjs/common';
interface UserConfig {
    name: string;
    email: string;
    password: string;
    roleName: string;
}
export declare const usersData: UserConfig[];
export declare function seedUsers(prisma: PrismaClient, logger: Logger, roles: Record<string, Role>): Promise<any[]>;
export {};
