export declare class QueryMedicalStudyDto {
    page?: number;
    limit?: number;
    search?: string;
    patientId?: string;
    studyType?: string;
    status?: string;
    active?: boolean;
    orderedBy?: string;
    interpretedBy?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
