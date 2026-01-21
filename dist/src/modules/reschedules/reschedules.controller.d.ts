import { ReschedulesService } from './reschedules.service';
import { CreateRescheduleDto } from './dto/create-reschedule.dto';
import { UpdateRescheduleDto } from './dto/update-reschedule.dto';
import { QueryRescheduleDto } from './dto/query-reschedule.dto';
export declare class ReschedulesController {
    private readonly reschedulesService;
    constructor(reschedulesService: ReschedulesService);
    create(createRescheduleDto: CreateRescheduleDto): Promise<{
        appointment: {
            medic: {
                id: string;
                name: string;
                specialty: {
                    id: string;
                    name: string;
                };
                lastName: string;
            };
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                identification: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
            notes: string | null;
            medicId: string;
            dateTime: Date;
            appointmentType: string;
            appointmentStatus: string;
            modality: string;
            reason: string | null;
            requiresFollowUp: boolean;
            followUpDate: Date | null;
            followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
            originatedFromFollowUpId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        notes: string | null;
        appointmentId: string;
        previousDateTime: Date;
        newDateTime: Date;
        rescheduleReason: string;
        requestedBy: string;
        rescheduleStatus: string;
    }>;
    findAll(query: QueryRescheduleDto): Promise<{
        data: ({
            appointment: {
                medic: {
                    id: string;
                    name: string;
                    specialty: {
                        id: string;
                        name: string;
                    };
                    lastName: string;
                };
                patient: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    identification: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
                patientId: string;
                notes: string | null;
                medicId: string;
                dateTime: Date;
                appointmentType: string;
                appointmentStatus: string;
                modality: string;
                reason: string | null;
                requiresFollowUp: boolean;
                followUpDate: Date | null;
                followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
                originatedFromFollowUpId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            notes: string | null;
            appointmentId: string;
            previousDateTime: Date;
            newDateTime: Date;
            rescheduleReason: string;
            requestedBy: string;
            rescheduleStatus: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    findOne(id: string): Promise<{
        appointment: {
            medic: {
                id: string;
                name: string;
                specialty: {
                    id: string;
                    name: string;
                };
                lastName: string;
            };
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                identification: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
            notes: string | null;
            medicId: string;
            dateTime: Date;
            appointmentType: string;
            appointmentStatus: string;
            modality: string;
            reason: string | null;
            requiresFollowUp: boolean;
            followUpDate: Date | null;
            followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
            originatedFromFollowUpId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        notes: string | null;
        appointmentId: string;
        previousDateTime: Date;
        newDateTime: Date;
        rescheduleReason: string;
        requestedBy: string;
        rescheduleStatus: string;
    }>;
    update(id: string, updateRescheduleDto: UpdateRescheduleDto): Promise<{
        appointment: {
            medic: {
                id: string;
                name: string;
                specialty: {
                    id: string;
                    name: string;
                };
                lastName: string;
            };
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                identification: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
            notes: string | null;
            medicId: string;
            dateTime: Date;
            appointmentType: string;
            appointmentStatus: string;
            modality: string;
            reason: string | null;
            requiresFollowUp: boolean;
            followUpDate: Date | null;
            followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
            originatedFromFollowUpId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        notes: string | null;
        appointmentId: string;
        previousDateTime: Date;
        newDateTime: Date;
        rescheduleReason: string;
        requestedBy: string;
        rescheduleStatus: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByAppointment(appointmentId: string): Promise<({
        appointment: {
            id: string;
            dateTime: Date;
            appointmentStatus: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        notes: string | null;
        appointmentId: string;
        previousDateTime: Date;
        newDateTime: Date;
        rescheduleReason: string;
        requestedBy: string;
        rescheduleStatus: string;
    })[]>;
}
