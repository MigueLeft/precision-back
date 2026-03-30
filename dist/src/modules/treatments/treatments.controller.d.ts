import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { QueryTreatmentDto } from './dto/query-treatment.dto';
import { AddBatchTreatmentsDto } from './dto/add-batch-treatments.dto';
export declare class TreatmentsController {
    private readonly treatmentsService;
    constructor(treatmentsService: TreatmentsService);
    create(createTreatmentDto: CreateTreatmentDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
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
                identification: string | null;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            status: string;
            medicationName: string;
            presentation: string | null;
            quantity: string | null;
            dosage: string | null;
            frequency: string | null;
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
    findByPatient(patientId: string, status?: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }[]>;
    getCurrentTreatments(patientId: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }[]>;
    getPreviousTreatments(patientId: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
            phone: string | null;
            email: string;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    update(id: string, updateTreatmentDto: UpdateTreatmentDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    changeStatus(id: string, status: 'actual' | 'previo'): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    hardDelete(id: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        status: string;
        medicationName: string;
        presentation: string | null;
        quantity: string | null;
        dosage: string | null;
        frequency: string | null;
        duration: string | null;
        prescribedBy: string | null;
        prescribedAt: Date;
    }>;
    addBatchTreatments(dto: AddBatchTreatmentsDto): Promise<{
        patientId: string;
        treatmentsAdded: number;
        treatments: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            status: string;
            medicationName: string;
            presentation: string | null;
            quantity: string | null;
            dosage: string | null;
            frequency: string | null;
            duration: string | null;
            prescribedBy: string | null;
            prescribedAt: Date;
        }[];
    }>;
}
