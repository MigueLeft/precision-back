import { PrismaService } from '../../config/database/prisma.service';
import { CreatePatientFollowDto } from './dto/create-patient-follow.dto';
import { UpdatePatientFollowDto } from './dto/update-patient-follow.dto';
import { QueryPatientFollowDto } from './dto/query-patient-follow.dto';
export declare class PatientFollowService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createPatientFollowDto: CreatePatientFollowDto): Promise<{
        patient: {
            email: string;
            id: string;
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
    }>;
    findAll(queryDto: QueryPatientFollowDto): Promise<{
        data: ({
            patient: {
                email: string;
                id: string;
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
    }>;
    update(id: string, updatePatientFollowDto: UpdatePatientFollowDto): Promise<{
        patient: {
            email: string;
            id: string;
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    incrementAttemptCount(id: string): Promise<{
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
    }>;
    getByPatient(patientId: string, queryDto: QueryPatientFollowDto): Promise<{
        data: ({
            patient: {
                email: string;
                id: string;
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
                email: string;
                id: string;
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
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
}
