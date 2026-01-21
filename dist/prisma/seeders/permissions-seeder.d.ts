import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
export declare const permissionsData: {
    name: string;
    description: string;
}[];
export declare function seedPermissions(prisma: PrismaClient, logger: Logger): Promise<{
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
