import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { QueryPatientDto } from './dto/query-patient.dto';
import { UpdateClinicalInfoDto } from './dto/update-clinical-info.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
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
    convertToUser(id: string): Promise<{
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
    removeUser(id: string): Promise<{
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
    bulkCreate(patients: CreatePatientDto[]): Promise<any[]>;
    getPatientQuestionnaires(id: string): Promise<{
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
        totalScore: import("@prisma/client/runtime/library").Decimal | null;
        notes: string | null;
        totalQuestions: number;
        questionsWithAnswers: {
            questionId: string;
            questionCode: string;
            questionText: string;
            questionType: import("@prisma/client").$Enums.QuestionType;
            inputType: string | null;
            options: import("@prisma/client/runtime/library").JsonValue;
            hasScore: boolean;
            answer: {
                textValue: string | null;
                numericValue: import("@prisma/client/runtime/library").Decimal | null;
                booleanValue: boolean | null;
                dateValue: Date | null;
                jsonValue: import("@prisma/client/runtime/library").JsonValue;
                score: import("@prisma/client/runtime/library").Decimal | null;
                answeredAt: Date;
            };
        }[];
    }>;
    updateClinicalInfo(id: string, updateClinicalInfoDto: UpdateClinicalInfoDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        identification: string;
        currentIllness: string | null;
        diagnosticPlan: string | null;
        lastClinicalUpdateBy: string | null;
        lastClinicalUpdateAt: Date | null;
    }>;
    getClinicalInfo(id: string): Promise<{
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
