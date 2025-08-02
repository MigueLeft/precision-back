import { RescueReason, RescueStatus, RescueCategory, RescuePriority } from '@prisma/client';
export declare class CreateRescueDirectoryDto {
    patientId: string;
    originalFollowUpId: string;
    rescueReason: RescueReason;
    entryDate?: string;
    exitDate?: string;
    status?: RescueStatus;
    rescueCategory?: RescueCategory;
    priority?: RescuePriority;
    lastContactDate?: string;
    lastAttemptDate?: string;
    totalPreviousAttempts?: number;
    rescueNotes?: string;
    reactivatedAt?: string;
    reactivationNotes?: string;
}
