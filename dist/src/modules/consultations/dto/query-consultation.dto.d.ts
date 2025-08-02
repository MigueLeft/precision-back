export declare class QueryConsultationDto {
    page?: number;
    limit?: number;
    appointmentId?: string;
    registeredByUserId?: string;
    startDate?: string;
    endDate?: string;
    active?: boolean;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
