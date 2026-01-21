import { PrismaService } from '../../config/database/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { QueryPatientDto } from './dto/query-patient.dto';
import { Prisma } from '@prisma/client';
export declare class PatientsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createPatientDto: CreatePatientDto): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
        } | null;
    } & {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        userId: string | null;
        identificationType: string | null;
        nationality: string | null;
        countryOfOrigin: string | null;
        countryOfResidence: string | null;
        address: string | null;
        city: string | null;
        maritalStatus: string | null;
        ethnicity: string | null;
        race: string | null;
        preferredLanguage: string | null;
        educationLevel: string | null;
        socioeconomicStatus: number | null;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    findAll(query: QueryPatientDto): Promise<{
        data: ({
            user: {
                email: string;
                id: string;
                name: string | null;
                role: {
                    id: number;
                    name: string;
                };
            } | null;
        } & {
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            firstName: string;
            lastName: string;
            identification: string;
            phone: string | null;
            birthdate: Date;
            gender: string;
            userId: string | null;
            identificationType: string | null;
            nationality: string | null;
            countryOfOrigin: string | null;
            countryOfResidence: string | null;
            address: string | null;
            city: string | null;
            maritalStatus: string | null;
            ethnicity: string | null;
            race: string | null;
            preferredLanguage: string | null;
            educationLevel: string | null;
            socioeconomicStatus: number | null;
            currentIllness: string | null;
            diagnosticPlan: string | null;
            lastClinicalUpdateBy: string | null;
            lastClinicalUpdateAt: Date | null;
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
        user: {
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
                description: string | null;
            };
        } | null;
    } & {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        userId: string | null;
        identificationType: string | null;
        nationality: string | null;
        countryOfOrigin: string | null;
        countryOfResidence: string | null;
        address: string | null;
        city: string | null;
        maritalStatus: string | null;
        ethnicity: string | null;
        race: string | null;
        preferredLanguage: string | null;
        educationLevel: string | null;
        socioeconomicStatus: number | null;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    findByIdentification(identification: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
        } | null;
    } & {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        userId: string | null;
        identificationType: string | null;
        nationality: string | null;
        countryOfOrigin: string | null;
        countryOfResidence: string | null;
        address: string | null;
        city: string | null;
        maritalStatus: string | null;
        ethnicity: string | null;
        race: string | null;
        preferredLanguage: string | null;
        educationLevel: string | null;
        socioeconomicStatus: number | null;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    findByEmail(email: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
        } | null;
    } & {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        userId: string | null;
        identificationType: string | null;
        nationality: string | null;
        countryOfOrigin: string | null;
        countryOfResidence: string | null;
        address: string | null;
        city: string | null;
        maritalStatus: string | null;
        ethnicity: string | null;
        race: string | null;
        preferredLanguage: string | null;
        educationLevel: string | null;
        socioeconomicStatus: number | null;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    update(id: string, updatePatientDto: UpdatePatientDto): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
        } | null;
    } & {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        userId: string | null;
        identificationType: string | null;
        nationality: string | null;
        countryOfOrigin: string | null;
        countryOfResidence: string | null;
        address: string | null;
        city: string | null;
        maritalStatus: string | null;
        ethnicity: string | null;
        race: string | null;
        preferredLanguage: string | null;
        educationLevel: string | null;
        socioeconomicStatus: number | null;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    convertToUser(patientId: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
        } | null;
    } & {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        userId: string | null;
        identificationType: string | null;
        nationality: string | null;
        countryOfOrigin: string | null;
        countryOfResidence: string | null;
        address: string | null;
        city: string | null;
        maritalStatus: string | null;
        ethnicity: string | null;
        race: string | null;
        preferredLanguage: string | null;
        educationLevel: string | null;
        socioeconomicStatus: number | null;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    removeUser(patientId: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
        } | null;
    } & {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        userId: string | null;
        identificationType: string | null;
        nationality: string | null;
        countryOfOrigin: string | null;
        countryOfResidence: string | null;
        address: string | null;
        city: string | null;
        maritalStatus: string | null;
        ethnicity: string | null;
        race: string | null;
        preferredLanguage: string | null;
        educationLevel: string | null;
        socioeconomicStatus: number | null;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    getActivePatients(): Promise<{
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
    }[]>;
    bulkCreate(patients: CreatePatientDto[]): Promise<any[]>;
    getPatientStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        withUser: number;
        withoutUser: number;
        percentage: {
            active: number;
            withUser: number;
        };
    }>;
    getPatientQuestionnaires(patientId: string): Promise<{
        id: string;
        questionnaireName: string;
        answeredAt: Date;
        numberOfQuestions: number;
    }[]>;
    getPatientQuestionnaireDetails(patientId: string, patientQuestionnaireId: string): Promise<{
        patientQuestionnaireId: string;
        questionnaire: {
            id: string;
            name: string;
            description: string | null;
            code: string;
            version: string;
        };
        startedAt: Date;
        completedAt: Date | null;
        isCompleted: boolean;
        totalScore: Prisma.Decimal | null;
        notes: string | null;
        totalQuestions: number;
        questionsWithAnswers: {
            questionId: string;
            questionCode: string;
            questionText: string;
            questionType: import("@prisma/client").$Enums.QuestionType;
            inputType: string | null;
            options: Prisma.JsonValue;
            hasScore: boolean;
            answer: {
                textValue: string | null;
                numericValue: Prisma.Decimal | null;
                booleanValue: boolean | null;
                dateValue: Date | null;
                jsonValue: Prisma.JsonValue;
                score: Prisma.Decimal | null;
                answeredAt: Date;
            };
        }[];
    }>;
    updateClinicalInfo(patientId: string, currentIllness?: string, diagnosticPlan?: string, updatedBy?: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        identification: string;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    getClinicalInfo(patientId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        identification: string;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
}
