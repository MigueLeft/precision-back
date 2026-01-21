import { SymptomsService } from './symptoms.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { QuerySymptomsDto } from './dto/query-symptoms.dto';
import { CreatePatientSymptomDto } from './dto/create-patient-symptom.dto';
import { AddBatchPatientSymptomsDto } from './dto/add-batch-patient-symptoms.dto';
export declare class SymptomsController {
    private readonly symptomsService;
    constructor(symptomsService: SymptomsService);
    create(createSymptomDto: CreateSymptomDto): Promise<{
        symptomCategory: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        value: string;
        symptomCategoryId: string;
        severity: string | null;
    }>;
    findAll(queryDto: QuerySymptomsDto): Promise<{
        data: ({
            _count: {
                patientSymptoms: number;
            };
            symptomCategory: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            value: string;
            symptomCategoryId: string;
            severity: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findAllCategories(): Promise<({
        _count: {
            symptoms: number;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    })[]>;
    findOne(id: string): Promise<{
        symptomCategory: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
        };
        patientSymptoms: ({
            patient: {
                email: string;
                id: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            severity: string | null;
            patientId: string;
            notes: string | null;
            duration: string | null;
            symptomId: string;
            hasSymptom: boolean;
            frequency: string | null;
            reportedAt: Date | null;
            resolvedAt: Date | null;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        value: string;
        symptomCategoryId: string;
        severity: string | null;
    }>;
    update(id: string, updateSymptomDto: UpdateSymptomDto): Promise<{
        symptomCategory: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        value: string;
        symptomCategoryId: string;
        severity: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createPatientSymptom(createPatientSymptomDto: CreatePatientSymptomDto): Promise<{
        symptom: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            value: string;
            symptomCategoryId: string;
            severity: string | null;
        };
        patient: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        severity: string | null;
        patientId: string;
        notes: string | null;
        duration: string | null;
        symptomId: string;
        hasSymptom: boolean;
        frequency: string | null;
        reportedAt: Date | null;
        resolvedAt: Date | null;
    }>;
    addBatchPatientSymptoms(dto: AddBatchPatientSymptomsDto): Promise<{
        patientId: string;
        symptomsAdded: number;
        symptoms: ({
            symptom: {
                symptomCategory: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    active: boolean;
                };
            } & {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
                value: string;
                symptomCategoryId: string;
                severity: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            severity: string | null;
            patientId: string;
            notes: string | null;
            duration: string | null;
            symptomId: string;
            hasSymptom: boolean;
            frequency: string | null;
            reportedAt: Date | null;
            resolvedAt: Date | null;
        })[];
    }>;
    findPatientSymptoms(patientId: string): Promise<({
        symptom: {
            symptomCategory: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            value: string;
            symptomCategoryId: string;
            severity: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        severity: string | null;
        patientId: string;
        notes: string | null;
        duration: string | null;
        symptomId: string;
        hasSymptom: boolean;
        frequency: string | null;
        reportedAt: Date | null;
        resolvedAt: Date | null;
    })[]>;
    removePatientSymptom(patientId: string, symptomId: string): Promise<{
        message: string;
    }>;
}
