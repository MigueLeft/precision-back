import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
export declare const antecedentTypesData: {
    name: string;
    description: string;
}[];
export declare const familiarAntecedentsData: {
    value: string;
    name: string;
}[];
export declare const personalAntecedentsData: {
    value: string;
    name: string;
}[];
export declare const psicobiologicoAntecedentsData: string[];
export declare function seedAntecedents(prisma: PrismaClient, logger: Logger): Promise<void>;
