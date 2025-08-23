import { PrismaService } from '../../config/database/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { QueryAppointmentDto } from './dto/query-appointment.dto';
export declare class AppointmentsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        medicId: string;
        dateTime: Date;
        appointmentType: string;
        appointmentStatus: string;
        modality: string;
        reason: string | null;
        notes: string | null;
        requiresFollowUp: boolean;
        followUpDate: Date | null;
        followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
        originatedFromFollowUpId: string | null;
    }>;
    findAll(query: QueryAppointmentDto): Promise<{
        data: ({
            medic: {
                id: string;
                name: string;
                specialty: {
                    id: string;
                    name: string;
                    description: string | null;
                };
                lastName: string;
            };
            patient: {
                id: string;
                email: string;
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
            medicId: string;
            dateTime: Date;
            appointmentType: string;
            appointmentStatus: string;
            modality: string;
            reason: string | null;
            notes: string | null;
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
    findOne(id: string): Promise<{
        medic: {
            id: string;
            name: string;
            email: string;
            specialty: {
                id: string;
                name: string;
                description: string | null;
            };
            lastName: string;
        };
        patient: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            identification: string;
            phone: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        medicId: string;
        dateTime: Date;
        appointmentType: string;
        appointmentStatus: string;
        modality: string;
        reason: string | null;
        notes: string | null;
        requiresFollowUp: boolean;
        followUpDate: Date | null;
        followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
        originatedFromFollowUpId: string | null;
    }>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        medicId: string;
        dateTime: Date;
        appointmentType: string;
        appointmentStatus: string;
        modality: string;
        reason: string | null;
        notes: string | null;
        requiresFollowUp: boolean;
        followUpDate: Date | null;
        followUpPriority: import("@prisma/client").$Enums.FollowUpPriority;
        originatedFromFollowUpId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
