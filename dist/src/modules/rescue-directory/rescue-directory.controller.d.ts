import { RescueDirectoryService } from './rescue-directory.service';
import { CreateRescueDirectoryDto } from './dto/create-rescue-directory.dto';
import { UpdateRescueDirectoryDto } from './dto/update-rescue-directory.dto';
import { QueryRescueDirectoryDto } from './dto/query-rescue-directory.dto';
export declare class RescueDirectoryController {
    private readonly rescueDirectoryService;
    constructor(rescueDirectoryService: RescueDirectoryService);
    create(createRescueDirectoryDto: CreateRescueDirectoryDto): Promise<{
        patient: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        originalFollowUp: {
            id: string;
            status: import("@prisma/client").$Enums.FollowUpStatus;
            followUpType: import("@prisma/client").$Enums.FollowUpType;
            scheduledContactDate: Date;
            attemptCount: number;
            maxAttempts: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        status: import("@prisma/client").$Enums.RescueStatus;
        priority: import("@prisma/client").$Enums.RescuePriority;
        originalFollowUpId: string;
        rescueReason: import("@prisma/client").$Enums.RescueReason;
        entryDate: Date;
        exitDate: Date | null;
        rescueCategory: import("@prisma/client").$Enums.RescueCategory;
        lastContactDate: Date | null;
        lastAttemptDate: Date | null;
        totalPreviousAttempts: number;
        rescueNotes: string | null;
        reactivatedAt: Date | null;
        reactivationNotes: string | null;
    }>;
    findAll(queryDto: QueryRescueDirectoryDto): Promise<{
        data: ({
            patient: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            originalFollowUp: {
                id: string;
                status: import("@prisma/client").$Enums.FollowUpStatus;
                followUpType: import("@prisma/client").$Enums.FollowUpType;
                scheduledContactDate: Date;
                attemptCount: number;
                maxAttempts: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            status: import("@prisma/client").$Enums.RescueStatus;
            priority: import("@prisma/client").$Enums.RescuePriority;
            originalFollowUpId: string;
            rescueReason: import("@prisma/client").$Enums.RescueReason;
            entryDate: Date;
            exitDate: Date | null;
            rescueCategory: import("@prisma/client").$Enums.RescueCategory;
            lastContactDate: Date | null;
            lastAttemptDate: Date | null;
            totalPreviousAttempts: number;
            rescueNotes: string | null;
            reactivatedAt: Date | null;
            reactivationNotes: string | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getActiveEntries(queryDto: QueryRescueDirectoryDto): Promise<{
        data: ({
            patient: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            originalFollowUp: {
                id: string;
                status: import("@prisma/client").$Enums.FollowUpStatus;
                followUpType: import("@prisma/client").$Enums.FollowUpType;
                scheduledContactDate: Date;
                attemptCount: number;
                maxAttempts: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            status: import("@prisma/client").$Enums.RescueStatus;
            priority: import("@prisma/client").$Enums.RescuePriority;
            originalFollowUpId: string;
            rescueReason: import("@prisma/client").$Enums.RescueReason;
            entryDate: Date;
            exitDate: Date | null;
            rescueCategory: import("@prisma/client").$Enums.RescueCategory;
            lastContactDate: Date | null;
            lastAttemptDate: Date | null;
            totalPreviousAttempts: number;
            rescueNotes: string | null;
            reactivatedAt: Date | null;
            reactivationNotes: string | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getHighPriorityEntries(queryDto: QueryRescueDirectoryDto): Promise<{
        data: ({
            patient: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            originalFollowUp: {
                id: string;
                status: import("@prisma/client").$Enums.FollowUpStatus;
                followUpType: import("@prisma/client").$Enums.FollowUpType;
                scheduledContactDate: Date;
                attemptCount: number;
                maxAttempts: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            status: import("@prisma/client").$Enums.RescueStatus;
            priority: import("@prisma/client").$Enums.RescuePriority;
            originalFollowUpId: string;
            rescueReason: import("@prisma/client").$Enums.RescueReason;
            entryDate: Date;
            exitDate: Date | null;
            rescueCategory: import("@prisma/client").$Enums.RescueCategory;
            lastContactDate: Date | null;
            lastAttemptDate: Date | null;
            totalPreviousAttempts: number;
            rescueNotes: string | null;
            reactivatedAt: Date | null;
            reactivationNotes: string | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getCriticalEntries(queryDto: QueryRescueDirectoryDto): Promise<{
        data: ({
            patient: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            originalFollowUp: {
                id: string;
                status: import("@prisma/client").$Enums.FollowUpStatus;
                followUpType: import("@prisma/client").$Enums.FollowUpType;
                scheduledContactDate: Date;
                attemptCount: number;
                maxAttempts: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            status: import("@prisma/client").$Enums.RescueStatus;
            priority: import("@prisma/client").$Enums.RescuePriority;
            originalFollowUpId: string;
            rescueReason: import("@prisma/client").$Enums.RescueReason;
            entryDate: Date;
            exitDate: Date | null;
            rescueCategory: import("@prisma/client").$Enums.RescueCategory;
            lastContactDate: Date | null;
            lastAttemptDate: Date | null;
            totalPreviousAttempts: number;
            rescueNotes: string | null;
            reactivatedAt: Date | null;
            reactivationNotes: string | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getByPatient(patientId: string, queryDto: QueryRescueDirectoryDto): Promise<{
        data: ({
            patient: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            originalFollowUp: {
                id: string;
                status: import("@prisma/client").$Enums.FollowUpStatus;
                followUpType: import("@prisma/client").$Enums.FollowUpType;
                scheduledContactDate: Date;
                attemptCount: number;
                maxAttempts: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            status: import("@prisma/client").$Enums.RescueStatus;
            priority: import("@prisma/client").$Enums.RescuePriority;
            originalFollowUpId: string;
            rescueReason: import("@prisma/client").$Enums.RescueReason;
            entryDate: Date;
            exitDate: Date | null;
            rescueCategory: import("@prisma/client").$Enums.RescueCategory;
            lastContactDate: Date | null;
            lastAttemptDate: Date | null;
            totalPreviousAttempts: number;
            rescueNotes: string | null;
            reactivatedAt: Date | null;
            reactivationNotes: string | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    findOne(id: string): Promise<{
        patient: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        originalFollowUp: {
            contactAttempts: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                attemptNumber: number;
                followUpId: string;
                contactMethod: import("@prisma/client").$Enums.ContactMethod;
                contactDateTime: Date;
                contactResult: import("@prisma/client").$Enums.ContactResult;
                contactDuration: number | null;
                contactNotes: string | null;
                patientResponse: string | null;
                appointmentScheduled: boolean;
                newAppointmentId: string | null;
                rescheduleRequested: boolean;
                rescheduleId: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
            completedAt: Date | null;
            notes: string | null;
            status: import("@prisma/client").$Enums.FollowUpStatus;
            priority: import("@prisma/client").$Enums.FollowUpPriority;
            originAppointmentId: string | null;
            resultingAppointmentId: string | null;
            followUpType: import("@prisma/client").$Enums.FollowUpType;
            scheduledContactDate: Date;
            actualContactDate: Date | null;
            nextContactDate: Date | null;
            attemptCount: number;
            maxAttempts: number;
            assignedTo: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        status: import("@prisma/client").$Enums.RescueStatus;
        priority: import("@prisma/client").$Enums.RescuePriority;
        originalFollowUpId: string;
        rescueReason: import("@prisma/client").$Enums.RescueReason;
        entryDate: Date;
        exitDate: Date | null;
        rescueCategory: import("@prisma/client").$Enums.RescueCategory;
        lastContactDate: Date | null;
        lastAttemptDate: Date | null;
        totalPreviousAttempts: number;
        rescueNotes: string | null;
        reactivatedAt: Date | null;
        reactivationNotes: string | null;
    }>;
    update(id: string, updateRescueDirectoryDto: UpdateRescueDirectoryDto): Promise<{
        patient: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        originalFollowUp: {
            id: string;
            status: import("@prisma/client").$Enums.FollowUpStatus;
            followUpType: import("@prisma/client").$Enums.FollowUpType;
            scheduledContactDate: Date;
            attemptCount: number;
            maxAttempts: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        status: import("@prisma/client").$Enums.RescueStatus;
        priority: import("@prisma/client").$Enums.RescuePriority;
        originalFollowUpId: string;
        rescueReason: import("@prisma/client").$Enums.RescueReason;
        entryDate: Date;
        exitDate: Date | null;
        rescueCategory: import("@prisma/client").$Enums.RescueCategory;
        lastContactDate: Date | null;
        lastAttemptDate: Date | null;
        totalPreviousAttempts: number;
        rescueNotes: string | null;
        reactivatedAt: Date | null;
        reactivationNotes: string | null;
    }>;
    reactivateEntry(id: string, body: {
        reactivationNotes?: string;
    }): Promise<{
        patient: {
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            firstName: string;
            lastName: string;
            identification: string;
            phone: string | null;
            birthdate: Date;
            gender: string;
            userId: string | null;
            identificationType: string | null;
            nationality: string | null;
            countryOfOrigin: string | null;
            countryOfResidence: string | null;
            address: string | null;
            city: string | null;
            maritalStatus: string | null;
            ethnicity: string | null;
            race: string | null;
            preferredLanguage: string | null;
            educationLevel: string | null;
            socioeconomicStatus: number | null;
            currentIllness: string | null;
            diagnosticPlan: string | null;
            lastClinicalUpdateBy: string | null;
            lastClinicalUpdateAt: Date | null;
        };
        originalFollowUp: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
            completedAt: Date | null;
            notes: string | null;
            status: import("@prisma/client").$Enums.FollowUpStatus;
            priority: import("@prisma/client").$Enums.FollowUpPriority;
            originAppointmentId: string | null;
            resultingAppointmentId: string | null;
            followUpType: import("@prisma/client").$Enums.FollowUpType;
            scheduledContactDate: Date;
            actualContactDate: Date | null;
            nextContactDate: Date | null;
            attemptCount: number;
            maxAttempts: number;
            assignedTo: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        status: import("@prisma/client").$Enums.RescueStatus;
        priority: import("@prisma/client").$Enums.RescuePriority;
        originalFollowUpId: string;
        rescueReason: import("@prisma/client").$Enums.RescueReason;
        entryDate: Date;
        exitDate: Date | null;
        rescueCategory: import("@prisma/client").$Enums.RescueCategory;
        lastContactDate: Date | null;
        lastAttemptDate: Date | null;
        totalPreviousAttempts: number;
        rescueNotes: string | null;
        reactivatedAt: Date | null;
        reactivationNotes: string | null;
    }>;
    archiveEntry(id: string): Promise<{
        patient: {
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            firstName: string;
            lastName: string;
            identification: string;
            phone: string | null;
            birthdate: Date;
            gender: string;
            userId: string | null;
            identificationType: string | null;
            nationality: string | null;
            countryOfOrigin: string | null;
            countryOfResidence: string | null;
            address: string | null;
            city: string | null;
            maritalStatus: string | null;
            ethnicity: string | null;
            race: string | null;
            preferredLanguage: string | null;
            educationLevel: string | null;
            socioeconomicStatus: number | null;
            currentIllness: string | null;
            diagnosticPlan: string | null;
            lastClinicalUpdateBy: string | null;
            lastClinicalUpdateAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        status: import("@prisma/client").$Enums.RescueStatus;
        priority: import("@prisma/client").$Enums.RescuePriority;
        originalFollowUpId: string;
        rescueReason: import("@prisma/client").$Enums.RescueReason;
        entryDate: Date;
        exitDate: Date | null;
        rescueCategory: import("@prisma/client").$Enums.RescueCategory;
        lastContactDate: Date | null;
        lastAttemptDate: Date | null;
        totalPreviousAttempts: number;
        rescueNotes: string | null;
        reactivatedAt: Date | null;
        reactivationNotes: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
