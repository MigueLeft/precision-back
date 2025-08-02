import { PrismaService } from '../../config/database/prisma.service';
import { CreateContactAttemptDto } from './dto/create-contact-attempt.dto';
import { UpdateContactAttemptDto } from './dto/update-contact-attempt.dto';
import { QueryContactAttemptDto } from './dto/query-contact-attempt.dto';
export declare class ContactAttemptService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createContactAttemptDto: CreateContactAttemptDto): Promise<{
        reschedule: {
            id: string;
            previousDateTime: Date;
            newDateTime: Date;
            rescheduleStatus: string;
        } | null;
        followUp: {
            patient: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
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
        };
        newAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
    } & {
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
    }>;
    findAll(queryDto: QueryContactAttemptDto): Promise<{
        data: ({
            reschedule: {
                id: string;
                previousDateTime: Date;
                newDateTime: Date;
                rescheduleStatus: string;
            } | null;
            followUp: {
                patient: {
                    id: string;
                    email: string;
                    firstName: string;
                    lastName: string;
                    phone: string | null;
                };
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
            };
            newAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
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
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    findOne(id: string): Promise<{
        reschedule: {
            id: string;
            previousDateTime: Date;
            newDateTime: Date;
            rescheduleStatus: string;
        } | null;
        followUp: {
            patient: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
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
        };
        newAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
    } & {
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
    }>;
    update(id: string, updateContactAttemptDto: UpdateContactAttemptDto): Promise<{
        reschedule: {
            id: string;
            previousDateTime: Date;
            newDateTime: Date;
            rescheduleStatus: string;
        } | null;
        followUp: {
            patient: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                phone: string | null;
            };
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
        };
        newAppointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        } | null;
    } & {
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getByFollowUp(followUpId: string, queryDto: QueryContactAttemptDto): Promise<{
        data: ({
            reschedule: {
                id: string;
                previousDateTime: Date;
                newDateTime: Date;
                rescheduleStatus: string;
            } | null;
            followUp: {
                patient: {
                    id: string;
                    email: string;
                    firstName: string;
                    lastName: string;
                    phone: string | null;
                };
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
            };
            newAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
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
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getSuccessfulAttempts(queryDto: QueryContactAttemptDto): Promise<{
        data: ({
            reschedule: {
                id: string;
                previousDateTime: Date;
                newDateTime: Date;
                rescheduleStatus: string;
            } | null;
            followUp: {
                patient: {
                    id: string;
                    email: string;
                    firstName: string;
                    lastName: string;
                    phone: string | null;
                };
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
            };
            newAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
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
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getFailedAttempts(queryDto: QueryContactAttemptDto): Promise<{
        data: ({
            reschedule: {
                id: string;
                previousDateTime: Date;
                newDateTime: Date;
                rescheduleStatus: string;
            } | null;
            followUp: {
                patient: {
                    id: string;
                    email: string;
                    firstName: string;
                    lastName: string;
                    phone: string | null;
                };
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
            };
            newAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
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
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getAttemptsWithAppointments(queryDto: QueryContactAttemptDto): Promise<{
        data: ({
            reschedule: {
                id: string;
                previousDateTime: Date;
                newDateTime: Date;
                rescheduleStatus: string;
            } | null;
            followUp: {
                patient: {
                    id: string;
                    email: string;
                    firstName: string;
                    lastName: string;
                    phone: string | null;
                };
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
            };
            newAppointment: {
                id: string;
                dateTime: Date;
                appointmentStatus: string;
            } | null;
        } & {
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
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
}
