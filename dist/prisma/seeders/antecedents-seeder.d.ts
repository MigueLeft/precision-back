import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
export declare const antecedentTypesData: {
    name: string;
    description: string;
}[];
export declare const familiarAntecedentsData: string[];
export declare const personalAntecedentsData: string[];
export declare const psicobiologicoAntecedentsData: string[];
export declare const im1SpecificAntecedentsData: string[];
export declare function seedAntecedents(prisma: PrismaClient, logger: Logger): Promise<void>;
