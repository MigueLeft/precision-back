import { PrismaService } from '../../config/database/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { QueryTreatmentDto } from './dto/query-treatment.dto';
import { AddBatchTreatmentsDto } from './dto/add-batch-treatments.dto';
export declare class TreatmentsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createTreatmentDto: CreateTreatmentDto): Promise<{
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
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    findAll(queryDto: QueryTreatmentDto): Promise<{
        data: ({
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
            status: string;
            medicationName: string;
            presentation: string | null;
            quantity: string | null;
            dosage: string | null;
            duration: string | null;
            prescribedBy: string | null;
            prescribedAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        patient: {
            email: string;
            id: string;
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
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    findByPatient(patientId: string, status?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }[]>;
    update(id: string, updateTreatmentDto: UpdateTreatmentDto): Promise<{
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
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    changeStatus(id: string, newStatus: 'actual' | 'previo'): Promise<{
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
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    hardDelete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    getCurrentTreatments(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }[]>;
    getPreviousTreatments(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }[]>;
    addBatchTreatments(dto: AddBatchTreatmentsDto): Promise<{
        patientId: string;
        treatmentsAdded: number;
        treatments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            patientId: string;
            notes: string | null;
            status: string;
            medicationName: string;
            presentation: string | null;
            quantity: string | null;
            dosage: string | null;
            duration: string | null;
            prescribedBy: string | null;
            prescribedAt: Date;
        }[];
    }>;
}
