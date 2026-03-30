export declare class UpdateClinicalInfoDto {
    currentIllness?: string;
    diagnosticPlan?: string;
    treatmentPlan?: string;
    problems?: {
        actuales: string[];
        previos: string[];
    };
    evolucion?: Record<string, any>;
    lastClinicalUpdateBy?: string;
}
