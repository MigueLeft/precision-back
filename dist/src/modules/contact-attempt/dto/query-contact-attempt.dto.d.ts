import { ContactMethod, ContactResult } from '@prisma/client';
export declare class QueryContactAttemptDto {
    page?: number;
    limit?: number;
    search?: string;
    followUpId?: string;
    attemptNumber?: number;
    contactMethod?: ContactMethod;
    contactResult?: ContactResult;
    contactDateTimeFrom?: string;
    contactDateTimeTo?: string;
    appointmentScheduled?: boolean;
    rescheduleRequested?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
