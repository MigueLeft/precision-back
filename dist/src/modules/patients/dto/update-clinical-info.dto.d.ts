export declare class UpdateClinicalInfoDto {
    currentIllness?: string;
    diagnosticPlan?: string;
    treatmentPlan?: string;
    problems?: {
        actuales: string[];
        previos: string[];
    };
    evolucion?: string;
    lastClinicalUpdateBy?: string;
}
