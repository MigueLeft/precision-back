import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { QueryAppointmentDto } from './dto/query-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
            email: string;
        };
        medic: {
            id: string;
            lastName: string;
            name: string;
            specialty: {
                id: string;
                name: string;
            };
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        medicId: string;
        dateTime: Date;
        appointmentType: string;
        appointmentStatus: string;
        modality: string;
        reason: string | null;
        notes: string | null;
        confirmed: boolean;
        requiresFollowUp: boolean;
        followUpDate: Date | null;
        followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
        originatedFromFollowUpId: string | null;
    }>;
    findAll(query: QueryAppointmentDto): Promise<{
        data: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                identification: string | null;
                email: string;
            };
            medic: {
                id: string;
                lastName: string;
                name: string;
                specialty: {
                    id: string;
                    name: string;
                    description: string | null;
                };
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            medicId: string;
            dateTime: Date;
            appointmentType: string;
            appointmentStatus: string;
            modality: string;
            reason: string | null;
            notes: string | null;
            confirmed: boolean;
            requiresFollowUp: boolean;
            followUpDate: Date | null;
            followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
            originatedFromFollowUpId: string | null;
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
    findPendingAppointmentDates(): Promise<string[]>;
    findAppointmentDates(): Promise<string[]>;
    getAppointmentStats(): Promise<{
        total: number;
        today: number;
        upcoming: number;
        pending: number;
        completed: number;
    }>;
    findOne(id: string): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
            phone: string | null;
            email: string;
        };
        medic: {
            id: string;
            lastName: string;
            email: string;
            name: string;
            specialty: {
                id: string;
                name: string;
                description: string | null;
            };
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        medicId: string;
        dateTime: Date;
        appointmentType: string;
        appointmentStatus: string;
        modality: string;
        reason: string | null;
        notes: string | null;
        confirmed: boolean;
        requiresFollowUp: boolean;
        followUpDate: Date | null;
        followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
        originatedFromFollowUpId: string | null;
    }>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
            email: string;
        };
        medic: {
            id: string;
            lastName: string;
            name: string;
            specialty: {
                id: string;
                name: string;
            };
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        medicId: string;
        dateTime: Date;
        appointmentType: string;
        appointmentStatus: string;
        modality: string;
        reason: string | null;
        notes: string | null;
        confirmed: boolean;
        requiresFollowUp: boolean;
        followUpDate: Date | null;
        followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
        originatedFromFollowUpId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
