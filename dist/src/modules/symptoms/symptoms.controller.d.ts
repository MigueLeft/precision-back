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
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
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
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
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
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    })[]>;
    findOne(id: string): Promise<{
        patientSymptoms: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            severity: string | null;
            frequency: string | null;
            duration: string | null;
            symptomId: string;
            hasSymptom: boolean;
            reportedAt: Date | null;
            resolvedAt: Date | null;
        })[];
        symptomCategory: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        value: string;
        symptomCategoryId: string;
        severity: string | null;
    }>;
    update(id: string, updateSymptomDto: UpdateSymptomDto): Promise<{
        symptomCategory: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        value: string;
        symptomCategoryId: string;
        severity: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createPatientSymptom(createPatientSymptomDto: CreatePatientSymptomDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
        };
        symptom: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            value: string;
            symptomCategoryId: string;
            severity: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        severity: string | null;
        frequency: string | null;
        duration: string | null;
        symptomId: string;
        hasSymptom: boolean;
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
                    active: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string | null;
                };
            } & {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                value: string;
                symptomCategoryId: string;
                severity: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            severity: string | null;
            frequency: string | null;
            duration: string | null;
            symptomId: string;
            hasSymptom: boolean;
            reportedAt: Date | null;
            resolvedAt: Date | null;
        })[];
    }>;
    findPatientSymptoms(patientId: string): Promise<({
        symptom: {
            symptomCategory: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            value: string;
            symptomCategoryId: string;
            severity: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        severity: string | null;
        frequency: string | null;
        duration: string | null;
        symptomId: string;
        hasSymptom: boolean;
        reportedAt: Date | null;
        resolvedAt: Date | null;
    })[]>;
    removePatientSymptom(patientId: string, symptomId: string): Promise<{
        message: string;
    }>;
}
