import { LaboratoryExamsService } from './laboratory-exams.service';
import { CreateExamCatalogDto } from './dto/create-exam-catalog.dto';
import { UpdateExamCatalogDto } from './dto/update-exam-catalog.dto';
import { QueryExamCatalogDto } from './dto/query-exam-catalog.dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { QueryExamResultDto } from './dto/query-exam-result.dto';
import { AddBatchExamResultsDto } from './dto/add-batch-exam-results.dto';
export declare class LaboratoryExamsController {
    private readonly laboratoryExamsService;
    constructor(laboratoryExamsService: LaboratoryExamsService);
    createExamCatalog(createDto: CreateExamCatalogDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        normalRange: string | null;
        category: string;
        examName: string;
        measurementUnit: string | null;
        referenceMin: import("@prisma/client/runtime/library").Decimal | null;
        referenceMax: import("@prisma/client/runtime/library").Decimal | null;
        dataType: string;
    }>;
    findAllExamCatalog(query: QueryExamCatalogDto): Promise<{
        data: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            normalRange: string | null;
            category: string;
            examName: string;
            measurementUnit: string | null;
            referenceMin: import("@prisma/client/runtime/library").Decimal | null;
            referenceMax: import("@prisma/client/runtime/library").Decimal | null;
            dataType: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getExamsByCategory(category: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        normalRange: string | null;
        category: string;
        examName: string;
        measurementUnit: string | null;
        referenceMin: import("@prisma/client/runtime/library").Decimal | null;
        referenceMax: import("@prisma/client/runtime/library").Decimal | null;
        dataType: string;
    }[]>;
    findOneExamCatalog(id: string): Promise<{
        _count: {
            examResults: number;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        normalRange: string | null;
        category: string;
        examName: string;
        measurementUnit: string | null;
        referenceMin: import("@prisma/client/runtime/library").Decimal | null;
        referenceMax: import("@prisma/client/runtime/library").Decimal | null;
        dataType: string;
    }>;
    updateExamCatalog(id: string, updateDto: UpdateExamCatalogDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        normalRange: string | null;
        category: string;
        examName: string;
        measurementUnit: string | null;
        referenceMin: import("@prisma/client/runtime/library").Decimal | null;
        referenceMax: import("@prisma/client/runtime/library").Decimal | null;
        dataType: string;
    }>;
    removeExamCatalog(id: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        normalRange: string | null;
        category: string;
        examName: string;
        measurementUnit: string | null;
        referenceMin: import("@prisma/client/runtime/library").Decimal | null;
        referenceMax: import("@prisma/client/runtime/library").Decimal | null;
        dataType: string;
    }>;
    createExamResult(createDto: CreateExamResultDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
        };
        medicalStudy: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            description: string | null;
            status: string;
            orderedBy: string | null;
            interpretedBy: string | null;
            studyDate: Date;
            studyType: string;
            studyLocation: string | null;
            resultFilePath: string | null;
            resultFileUrl: string | null;
            imageFilePath: string | null;
            imageFileUrl: string | null;
            studyName: string | null;
            findings: string | null;
        } | null;
        exam: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            normalRange: string | null;
            category: string;
            examName: string;
            measurementUnit: string | null;
            referenceMin: import("@prisma/client/runtime/library").Decimal | null;
            referenceMax: import("@prisma/client/runtime/library").Decimal | null;
            dataType: string;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        observations: string | null;
        examId: string;
        medicalStudyId: string | null;
        resultDate: Date;
        isAbnormal: boolean;
        orderedBy: string | null;
        interpretedBy: string | null;
    }>;
    findAllExamResults(query: QueryExamResultDto): Promise<{
        data: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                identification: string | null;
            };
            medicalStudy: {
                id: string;
                studyDate: Date;
                studyType: string;
                studyName: string | null;
            } | null;
            exam: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                normalRange: string | null;
                category: string;
                examName: string;
                measurementUnit: string | null;
                referenceMin: import("@prisma/client/runtime/library").Decimal | null;
                referenceMax: import("@prisma/client/runtime/library").Decimal | null;
                dataType: string;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            textValue: string | null;
            numericValue: import("@prisma/client/runtime/library").Decimal | null;
            booleanValue: boolean | null;
            observations: string | null;
            examId: string;
            medicalStudyId: string | null;
            resultDate: Date;
            isAbnormal: boolean;
            orderedBy: string | null;
            interpretedBy: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getAbnormalResults(patientId?: string): Promise<({
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
        };
        exam: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            normalRange: string | null;
            category: string;
            examName: string;
            measurementUnit: string | null;
            referenceMin: import("@prisma/client/runtime/library").Decimal | null;
            referenceMax: import("@prisma/client/runtime/library").Decimal | null;
            dataType: string;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        observations: string | null;
        examId: string;
        medicalStudyId: string | null;
        resultDate: Date;
        isAbnormal: boolean;
        orderedBy: string | null;
        interpretedBy: string | null;
    })[]>;
    getPatientExamHistory(patientId: string, examId?: string): Promise<({
        exam: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            normalRange: string | null;
            category: string;
            examName: string;
            measurementUnit: string | null;
            referenceMin: import("@prisma/client/runtime/library").Decimal | null;
            referenceMax: import("@prisma/client/runtime/library").Decimal | null;
            dataType: string;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        observations: string | null;
        examId: string;
        medicalStudyId: string | null;
        resultDate: Date;
        isAbnormal: boolean;
        orderedBy: string | null;
        interpretedBy: string | null;
    })[]>;
    findOneExamResult(id: string): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
            birthdate: Date;
            gender: string;
        };
        medicalStudy: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            description: string | null;
            status: string;
            orderedBy: string | null;
            interpretedBy: string | null;
            studyDate: Date;
            studyType: string;
            studyLocation: string | null;
            resultFilePath: string | null;
            resultFileUrl: string | null;
            imageFilePath: string | null;
            imageFileUrl: string | null;
            studyName: string | null;
            findings: string | null;
        } | null;
        exam: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            normalRange: string | null;
            category: string;
            examName: string;
            measurementUnit: string | null;
            referenceMin: import("@prisma/client/runtime/library").Decimal | null;
            referenceMax: import("@prisma/client/runtime/library").Decimal | null;
            dataType: string;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        observations: string | null;
        examId: string;
        medicalStudyId: string | null;
        resultDate: Date;
        isAbnormal: boolean;
        orderedBy: string | null;
        interpretedBy: string | null;
    }>;
    updateExamResult(id: string, updateDto: UpdateExamResultDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
        };
        medicalStudy: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            description: string | null;
            status: string;
            orderedBy: string | null;
            interpretedBy: string | null;
            studyDate: Date;
            studyType: string;
            studyLocation: string | null;
            resultFilePath: string | null;
            resultFileUrl: string | null;
            imageFilePath: string | null;
            imageFileUrl: string | null;
            studyName: string | null;
            findings: string | null;
        } | null;
        exam: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            normalRange: string | null;
            category: string;
            examName: string;
            measurementUnit: string | null;
            referenceMin: import("@prisma/client/runtime/library").Decimal | null;
            referenceMax: import("@prisma/client/runtime/library").Decimal | null;
            dataType: string;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        observations: string | null;
        examId: string;
        medicalStudyId: string | null;
        resultDate: Date;
        isAbnormal: boolean;
        orderedBy: string | null;
        interpretedBy: string | null;
    }>;
    removeExamResult(id: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        observations: string | null;
        examId: string;
        medicalStudyId: string | null;
        resultDate: Date;
        isAbnormal: boolean;
        orderedBy: string | null;
        interpretedBy: string | null;
    }>;
    addBatchExamResults(dto: AddBatchExamResultsDto): Promise<{
        patientId: string;
        resultsAdded: number;
        results: ({
            exam: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                normalRange: string | null;
                category: string;
                examName: string;
                measurementUnit: string | null;
                referenceMin: import("@prisma/client/runtime/library").Decimal | null;
                referenceMax: import("@prisma/client/runtime/library").Decimal | null;
                dataType: string;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            textValue: string | null;
            numericValue: import("@prisma/client/runtime/library").Decimal | null;
            booleanValue: boolean | null;
            observations: string | null;
            examId: string;
            medicalStudyId: string | null;
            resultDate: Date;
            isAbnormal: boolean;
            orderedBy: string | null;
            interpretedBy: string | null;
        })[];
    }>;
    getExamCategories(): Promise<string[]>;
}
