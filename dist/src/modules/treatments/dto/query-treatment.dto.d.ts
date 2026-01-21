export declare class QueryTreatmentDto {
    page?: number;
    limit?: number;
    search?: string;
    patientId?: string;
    status?: string;
    active?: boolean;
    prescribedBy?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
