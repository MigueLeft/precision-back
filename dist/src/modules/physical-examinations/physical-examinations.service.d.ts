import { PrismaService } from '../../config/database/prisma.service';
import { CreatePhysicalExaminationDto } from './dto/create-physical-examination.dto';
import { UpdatePhysicalExaminationDto } from './dto/update-physical-examination.dto';
import { QueryPhysicalExaminationsDto } from './dto/query-physical-examinations.dto';
import { AssignPatientExaminationDto } from './dto/assign-patient-examination.dto';
import { UpsertPatientPhysicalExamDto } from './dto/upsert-patient-physical-exam.dto';
import { Prisma } from '@prisma/client';
export declare class PhysicalExaminationsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createPhysicalExaminationDto: CreatePhysicalExaminationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        weight: Prisma.Decimal | null;
        height: Prisma.Decimal | null;
        bmi: Prisma.Decimal | null;
        waistCircumference: Prisma.Decimal | null;
        neckCircumference: Prisma.Decimal | null;
        bodyFatPercentage: Prisma.Decimal | null;
        bloodPressureSystolic: number | null;
        bloodPressureDiastolic: number | null;
        heartRate: number | null;
        respiratoryRate: number | null;
        temperature: Prisma.Decimal | null;
        oxygenSaturation: number | null;
        generalFindings: string | null;
        additionalObservations: string | null;
        performedBy: string | null;
    }>;
    findAll(queryDto: QueryPhysicalExaminationsDto): Promise<{
        data: ({
            _count: {
                patientPhysicalExaminations: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: Prisma.Decimal | null;
            height: Prisma.Decimal | null;
            bmi: Prisma.Decimal | null;
            waistCircumference: Prisma.Decimal | null;
            neckCircumference: Prisma.Decimal | null;
            bodyFatPercentage: Prisma.Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: Prisma.Decimal | null;
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
        weight: Prisma.Decimal | null;
        height: Prisma.Decimal | null;
        bmi: Prisma.Decimal | null;
        waistCircumference: Prisma.Decimal | null;
        neckCircumference: Prisma.Decimal | null;
        bodyFatPercentage: Prisma.Decimal | null;
        bloodPressureSystolic: number | null;
        bloodPressureDiastolic: number | null;
        heartRate: number | null;
        respiratoryRate: number | null;
        temperature: Prisma.Decimal | null;
        oxygenSaturation: number | null;
        generalFindings: string | null;
        additionalObservations: string | null;
        performedBy: string | null;
    }>;
    update(id: string, updatePhysicalExaminationDto: UpdatePhysicalExaminationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        weight: Prisma.Decimal | null;
        height: Prisma.Decimal | null;
        bmi: Prisma.Decimal | null;
        waistCircumference: Prisma.Decimal | null;
        neckCircumference: Prisma.Decimal | null;
        bodyFatPercentage: Prisma.Decimal | null;
        bloodPressureSystolic: number | null;
        bloodPressureDiastolic: number | null;
        heartRate: number | null;
        respiratoryRate: number | null;
        temperature: Prisma.Decimal | null;
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
            weight: Prisma.Decimal | null;
            height: Prisma.Decimal | null;
            bmi: Prisma.Decimal | null;
            waistCircumference: Prisma.Decimal | null;
            neckCircumference: Prisma.Decimal | null;
            bodyFatPercentage: Prisma.Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: Prisma.Decimal | null;
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
            weight: Prisma.Decimal | null;
            height: Prisma.Decimal | null;
            bmi: Prisma.Decimal | null;
            waistCircumference: Prisma.Decimal | null;
            neckCircumference: Prisma.Decimal | null;
            bodyFatPercentage: Prisma.Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: Prisma.Decimal | null;
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
    removePatientExamination(patientId: string, examinationId: string, examinationDate: string): Promise<{
        message: string;
    }>;
    createAndAssignToPatient(patientId: string, createDto: CreatePhysicalExaminationDto, examinationDate: string, notes?: string): Promise<{
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
            weight: Prisma.Decimal | null;
            height: Prisma.Decimal | null;
            bmi: Prisma.Decimal | null;
            waistCircumference: Prisma.Decimal | null;
            neckCircumference: Prisma.Decimal | null;
            bodyFatPercentage: Prisma.Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: Prisma.Decimal | null;
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
                weight: Prisma.Decimal | null;
                height: Prisma.Decimal | null;
                bmi: Prisma.Decimal | null;
                waistCircumference: Prisma.Decimal | null;
                neckCircumference: Prisma.Decimal | null;
                bodyFatPercentage: Prisma.Decimal | null;
                bloodPressureSystolic: number | null;
                bloodPressureDiastolic: number | null;
                heartRate: number | null;
                respiratoryRate: number | null;
                temperature: Prisma.Decimal | null;
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
    upsertPatientPhysicalExam(patientId: string, dto: UpsertPatientPhysicalExamDto): Promise<{
        physicalExamination: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: Prisma.Decimal | null;
            height: Prisma.Decimal | null;
            bmi: Prisma.Decimal | null;
            waistCircumference: Prisma.Decimal | null;
            neckCircumference: Prisma.Decimal | null;
            bodyFatPercentage: Prisma.Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: Prisma.Decimal | null;
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
            weight: Prisma.Decimal | null;
            height: Prisma.Decimal | null;
            bmi: Prisma.Decimal | null;
            waistCircumference: Prisma.Decimal | null;
            neckCircumference: Prisma.Decimal | null;
            bodyFatPercentage: Prisma.Decimal | null;
            bloodPressureSystolic: number | null;
            bloodPressureDiastolic: number | null;
            heartRate: number | null;
            respiratoryRate: number | null;
            temperature: Prisma.Decimal | null;
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
