export declare class QueryAppointmentDto {
    page?: number;
    limit?: number;
    search?: string;
    specificDate?: string;
    startDate?: string;
    endDate?: string;
    specificTime?: string;
    appointmentStatus?: string;
    patientId?: string;
    medicId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
