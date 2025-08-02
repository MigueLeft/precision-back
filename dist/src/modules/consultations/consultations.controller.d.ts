import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { QueryConsultationDto } from './dto/query-consultation.dto';
export declare class ConsultationsController {
    private readonly consultationService;
    constructor(consultationService: ConsultationsService);
    create(createConsultationDto: CreateConsultationDto): Promise<{
        appointment: {
            medic: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                lastName: string;
                identification: string;
                phone: string | null;
                active: boolean;
                userId: string | null;
                specialtyId: string;
                professionalTitle: string;
            };
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
            reason: string | null;
            notes: string | null;
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
        appointmentId: string;
        realizationDateTime: Date;
        anamnesis: string | null;
        indicatedTreatment: string | null;
        performedProcedures: string | null;
        issuedPrescriptions: string | null;
        patientInstructions: string | null;
        suggestedNextControl: Date | null;
        additionalMedicalNotes: string | null;
        registeredByUserId: string;
        clinicalRegistrationDate: Date;
    }>;
    findAll(queryDto: QueryConsultationDto): Promise<{
        data: ({
            appointment: {
                medic: {
                    id: string;
                    name: string;
                    specialty: {
                        id: string;
                        name: string;
                        description: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        active: boolean;
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
                medicId: string;
                dateTime: Date;
                appointmentType: string;
                appointmentStatus: string;
                reason: string | null;
                notes: string | null;
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
            appointmentId: string;
            realizationDateTime: Date;
            anamnesis: string | null;
            indicatedTreatment: string | null;
            performedProcedures: string | null;
            issuedPrescriptions: string | null;
            patientInstructions: string | null;
            suggestedNextControl: Date | null;
            additionalMedicalNotes: string | null;
            registeredByUserId: string;
            clinicalRegistrationDate: Date;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        appointment: {
            medic: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                lastName: string;
                identification: string;
                phone: string | null;
                active: boolean;
                userId: string | null;
                specialtyId: string;
                professionalTitle: string;
            };
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
            reason: string | null;
            notes: string | null;
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
        appointmentId: string;
        realizationDateTime: Date;
        anamnesis: string | null;
        indicatedTreatment: string | null;
        performedProcedures: string | null;
        issuedPrescriptions: string | null;
        patientInstructions: string | null;
        suggestedNextControl: Date | null;
        additionalMedicalNotes: string | null;
        registeredByUserId: string;
        clinicalRegistrationDate: Date;
    }>;
    findByAppointmentId(appointmentId: string): Promise<({
        appointment: {
            medic: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                lastName: string;
                identification: string;
                phone: string | null;
                active: boolean;
                userId: string | null;
                specialtyId: string;
                professionalTitle: string;
            };
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
            reason: string | null;
            notes: string | null;
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
        appointmentId: string;
        realizationDateTime: Date;
        anamnesis: string | null;
        indicatedTreatment: string | null;
        performedProcedures: string | null;
        issuedPrescriptions: string | null;
        patientInstructions: string | null;
        suggestedNextControl: Date | null;
        additionalMedicalNotes: string | null;
        registeredByUserId: string;
        clinicalRegistrationDate: Date;
    }) | null>;
    update(id: string, updateConsultationDto: UpdateConsultationDto): Promise<{
        appointment: {
            medic: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                lastName: string;
                identification: string;
                phone: string | null;
                active: boolean;
                userId: string | null;
                specialtyId: string;
                professionalTitle: string;
            };
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
            reason: string | null;
            notes: string | null;
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
        appointmentId: string;
        realizationDateTime: Date;
        anamnesis: string | null;
        indicatedTreatment: string | null;
        performedProcedures: string | null;
        issuedPrescriptions: string | null;
        patientInstructions: string | null;
        suggestedNextControl: Date | null;
        additionalMedicalNotes: string | null;
        registeredByUserId: string;
        clinicalRegistrationDate: Date;
    }>;
    remove(id: string): Promise<{
        appointment: {
            medic: {
                id: string;
                name: string;
                specialty: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    active: boolean;
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
            medicId: string;
            dateTime: Date;
            appointmentType: string;
            appointmentStatus: string;
            reason: string | null;
            notes: string | null;
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
        appointmentId: string;
        realizationDateTime: Date;
        anamnesis: string | null;
        indicatedTreatment: string | null;
        performedProcedures: string | null;
        issuedPrescriptions: string | null;
        patientInstructions: string | null;
        suggestedNextControl: Date | null;
        additionalMedicalNotes: string | null;
        registeredByUserId: string;
        clinicalRegistrationDate: Date;
    }>;
}
