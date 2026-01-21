import { PhysicalExaminationsService } from './physical-examinations.service';
import { CreatePhysicalExaminationDto } from './dto/create-physical-examination.dto';
import { UpdatePhysicalExaminationDto } from './dto/update-physical-examination.dto';
import { QueryPhysicalExaminationsDto } from './dto/query-physical-examinations.dto';
import { AssignPatientExaminationDto } from './dto/assign-patient-examination.dto';
import { UpsertPatientPhysicalExamDto } from './dto/upsert-patient-physical-exam.dto';
export declare class PhysicalExaminationsController {
    private readonly physicalExaminationsService;
    constructor(physicalExaminationsService: PhysicalExaminationsService);
    create(createPhysicalExaminationDto: CreatePhysicalExaminationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal | null;
        height: import("@prisma/client/runtime/library").Decimal | null;
        bmi: import("@prisma/client/runtime/library").Decimal | null;
        waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
        neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
        bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
        bloodPressureSystolic: number | null;
        bloodPressureDiastolic: number | null;
        heartRate: number | null;
        respiratoryRate: number | null;
        temperature: import("@prisma/client/runtime/library").Decimal | null;
        oxygenSaturation: number | null;
        generalFindings: string | null;
        additionalObservations: string | null;
        performedBy: string | null;
    }>;
    findAll(query: QueryPhysicalExaminationsDto): Promise<{
        data: ({
            _count: {
                patientPhysicalExaminations: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            height: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
            neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
            bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            oxygenSaturation: number | null;
            generalFindings: string | null;
            additionalObservations: string | null;
            performedBy: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    findOne(id: string): Promise<{
        patientPhysicalExaminations: ({
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
            patientId: string;
            notes: string | null;
            physicalExaminationId: string;
            examinationDate: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal | null;
        height: import("@prisma/client/runtime/library").Decimal | null;
        bmi: import("@prisma/client/runtime/library").Decimal | null;
        waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
        neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
        bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
        bloodPressureSystolic: number | null;
        bloodPressureDiastolic: number | null;
        heartRate: number | null;
        respiratoryRate: number | null;
        temperature: import("@prisma/client/runtime/library").Decimal | null;
        oxygenSaturation: number | null;
        generalFindings: string | null;
        additionalObservations: string | null;
        performedBy: string | null;
    }>;
    update(id: string, updatePhysicalExaminationDto: UpdatePhysicalExaminationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal | null;
        height: import("@prisma/client/runtime/library").Decimal | null;
        bmi: import("@prisma/client/runtime/library").Decimal | null;
        waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
        neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
        bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
        bloodPressureSystolic: number | null;
        bloodPressureDiastolic: number | null;
        heartRate: number | null;
        respiratoryRate: number | null;
        temperature: import("@prisma/client/runtime/library").Decimal | null;
        oxygenSaturation: number | null;
        generalFindings: string | null;
        additionalObservations: string | null;
        performedBy: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    assignToPatient(assignDto: AssignPatientExaminationDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string;
        };
        physicalExamination: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            height: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
            neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
            bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            oxygenSaturation: number | null;
            generalFindings: string | null;
            additionalObservations: string | null;
            performedBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        physicalExaminationId: string;
        examinationDate: Date;
    }>;
    getPatientExaminations(patientId: string): Promise<({
        physicalExamination: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            height: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
            neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
            bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            oxygenSaturation: number | null;
            generalFindings: string | null;
            additionalObservations: string | null;
            performedBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        physicalExaminationId: string;
        examinationDate: Date;
    })[]>;
    getPatientExaminationHistory(patientId: string): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string;
        };
        totalExaminations: number;
        history: {};
        chronologicalHistory: ({
            physicalExamination: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                weight: import("@prisma/client/runtime/library").Decimal | null;
                height: import("@prisma/client/runtime/library").Decimal | null;
                bmi: import("@prisma/client/runtime/library").Decimal | null;
                waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
                neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
                bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
                bloodPressureSystolic: number | null;
                bloodPressureDiastolic: number | null;
                heartRate: number | null;
                respiratoryRate: number | null;
                temperature: import("@prisma/client/runtime/library").Decimal | null;
                oxygenSaturation: number | null;
                generalFindings: string | null;
                additionalObservations: string | null;
                performedBy: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            physicalExaminationId: string;
            examinationDate: Date;
        })[];
    }>;
    createAndAssignToPatient(patientId: string, examinationDate: string, notes: string, createDto: CreatePhysicalExaminationDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string;
        };
        physicalExamination: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            height: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
            neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
            bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            oxygenSaturation: number | null;
            generalFindings: string | null;
            additionalObservations: string | null;
            performedBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        physicalExaminationId: string;
        examinationDate: Date;
    }>;
    removePatientExamination(patientId: string, examinationId: string, examinationDate: string): Promise<{
        message: string;
    }>;
    upsertPatientPhysicalExam(patientId: string, dto: UpsertPatientPhysicalExamDto): Promise<{
        physicalExamination: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            height: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
            neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
            bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            oxygenSaturation: number | null;
            generalFindings: string | null;
            additionalObservations: string | null;
            performedBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        physicalExaminationId: string;
        examinationDate: Date;
    }>;
    getLatestPatientExam(patientId: string): Promise<{
        physicalExamination: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            height: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            waistCircumference: import("@prisma/client/runtime/library").Decimal | null;
            neckCircumference: import("@prisma/client/runtime/library").Decimal | null;
            bodyFatPercentage: import("@prisma/client/runtime/library").Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            oxygenSaturation: number | null;
            generalFindings: string | null;
            additionalObservations: string | null;
            performedBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        physicalExaminationId: string;
        examinationDate: Date;
    }>;
}
