import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
export declare const symptomCategoriesData: {
    name: string;
    description: string;
}[];
export declare const symptomsData: {
    cardiovascular: {
        value: string;
        name: string;
    }[];
    respiratorio: {
        value: string;
        name: string;
    }[];
    neurológico: {
        value: string;
        name: string;
    }[];
    gastrointestinal: {
        value: string;
        name: string;
    }[];
    genitourinario: {
        value: string;
        name: string;
    }[];
    musculoesquelético: {
        value: string;
        name: string;
    }[];
    dermatológico: {
        value: string;
        name: string;
    }[];
    endocrino: {
        value: string;
        name: string;
    }[];
    psicológico: {
        value: string;
        name: string;
    }[];
    general: {
        value: string;
        name: string;
    }[];
};
export declare function seedSymptoms(prisma: PrismaClient, logger: Logger): Promise<void>;
