import { PatientFollowService } from './patient-follow.service';
import { CreatePatientFollowDto } from './dto/create-patient-follow.dto';
import { UpdatePatientFollowDto } from './dto/update-patient-follow.dto';
import { QueryPatientFollowDto } from './dto/query-patient-follow.dto';
export declare class PatientFollowController {
    private readonly patientFollowService;
    constructor(patientFollowService: PatientFollowService);
    create(createPatientFollowDto: CreatePatientFollowDto): Promise<{
        patient: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        rescueEntries: {
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
        }[];
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
        originAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
        resultingAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
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
        completedAt: Date | null;
    }>;
    findAll(queryDto: QueryPatientFollowDto): Promise<{
        data: ({
            patient: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            rescueEntries: {
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
            }[];
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
            originAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
            resultingAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
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
            completedAt: Date | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getPendingFollowUps(): Promise<{
        data: ({
            patient: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            rescueEntries: {
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
            }[];
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
            originAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
            resultingAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
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
            completedAt: Date | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getByPatient(patientId: string, queryDto: QueryPatientFollowDto): Promise<{
        data: ({
            patient: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
            rescueEntries: {
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
            }[];
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
            originAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
            resultingAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
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
            completedAt: Date | null;
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
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        rescueEntries: {
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
        }[];
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
        originAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
        resultingAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
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
        completedAt: Date | null;
    }>;
    update(id: string, updatePatientFollowDto: UpdatePatientFollowDto): Promise<{
        patient: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        rescueEntries: {
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
        }[];
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
        originAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
        resultingAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
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
        completedAt: Date | null;
    }>;
    incrementAttemptCount(id: string): Promise<{
        patient: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            identification: string;
            phone: string | null;
            birthdate: Date;
            gender: string;
            active: boolean;
            userId: string | null;
        };
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
        completedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
