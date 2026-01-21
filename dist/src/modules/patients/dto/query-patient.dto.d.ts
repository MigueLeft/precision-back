export declare class QueryPatientDto {
    page?: number;
    limit?: number;
    search?: string;
    active?: boolean;
    birthdate?: string;
    birthdateFrom?: string;
    birthdateTo?: string;
    gender?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
