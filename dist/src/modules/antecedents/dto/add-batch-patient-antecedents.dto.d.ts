declare class AntecedentItemDto {
    antecedentId: string;
    hasCondition: boolean;
    diagnosedAt?: string;
    notes?: string;
}
export declare class AddBatchPatientAntecedentsDto {
    patientId: string;
    antecedents: AntecedentItemDto[];
}
export {};
