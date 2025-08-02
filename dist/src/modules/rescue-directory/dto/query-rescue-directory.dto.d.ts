import { RescueReason, RescueStatus, RescueCategory, RescuePriority } from '@prisma/client';
export declare class QueryRescueDirectoryDto {
    page?: number;
    limit?: number;
    search?: string;
    patientId?: string;
    originalFollowUpId?: string;
    rescueReason?: RescueReason;
    status?: RescueStatus;
    rescueCategory?: RescueCategory;
    priority?: RescuePriority;
    entryDateFrom?: string;
    entryDateTo?: string;
    lastContactDateFrom?: string;
    lastContactDateTo?: string;
    minPreviousAttempts?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
