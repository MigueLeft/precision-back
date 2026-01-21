declare class TreatmentItemDto {
    medicationName: string;
    presentation?: string;
    quantity?: string;
    dosage?: string;
    duration?: string;
    status?: string;
    prescribedBy?: string;
    prescribedAt?: string;
    notes?: string;
    active?: boolean;
}
export declare class AddBatchTreatmentsDto {
    patientId: string;
    medications: TreatmentItemDto[];
}
export {};
