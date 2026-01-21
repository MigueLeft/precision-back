declare class SymptomItemDto {
    symptomId: string;
    severity?: string;
    frequency?: string;
    duration?: string;
    reportedAt?: string;
    notes?: string;
}
export declare class AddBatchPatientSymptomsDto {
    patientId: string;
    symptoms: SymptomItemDto[];
}
export {};
