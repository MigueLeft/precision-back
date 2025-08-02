import { FollowUpType, FollowUpStatus, FollowUpPriority } from '@prisma/client';
export declare class QueryPatientFollowDto {
    page?: number;
    limit?: number;
    search?: string;
    patientId?: string;
    originAppointmentId?: string;
    resultingAppointmentId?: string;
    followUpType?: FollowUpType;
    status?: FollowUpStatus;
    priority?: FollowUpPriority;
    assignedTo?: string;
    scheduledContactDateFrom?: string;
    scheduledContactDateTo?: string;
    active?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
