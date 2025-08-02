import { FollowUpType, FollowUpStatus, FollowUpPriority } from '@prisma/client';
export declare class CreatePatientFollowDto {
    patientId: string;
    originAppointmentId?: string;
    resultingAppointmentId?: string;
    followUpType?: FollowUpType;
    status?: FollowUpStatus;
    priority?: FollowUpPriority;
    scheduledContactDate: string;
    actualContactDate?: string;
    nextContactDate?: string;
    attemptCount?: number;
    maxAttempts?: number;
    notes?: string;
    assignedTo?: string;
    completedAt?: string;
    active?: boolean;
}
