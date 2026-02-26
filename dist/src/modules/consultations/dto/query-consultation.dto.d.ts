export declare class QueryConsultationDto {
    page?: number;
    limit?: number;
    appointmentId?: string;
    patientId?: string;
    registeredByUserId?: string;
    startDate?: string;
    endDate?: string;
    active?: boolean;
    withHojaBlanca?: boolean;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
