import { PrismaService } from '../../config/database/prisma.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QueryQuestionnaireDto } from './dto/query-questionnaire.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionnaireQuestionDto } from './dto/create-questionnaire-question.dto';
import { CreateDiagnosticGroupDto } from './dto/create-diagnostic-group.dto';
import { UpdateDiagnosticGroupDto } from './dto/update-diagnostic-group.dto';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { CreatePatientQuestionnaireDto } from './dto/create-patient-questionnaire.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { BatchAnswerDto, ProcessedQuestionnaireResultDto } from './dto/batch-answer.dto';
import { Prisma } from '@prisma/client';
export declare class QuestionnairesService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createQuestionnaire(createQuestionnaireDto: CreateQuestionnaireDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        code: string;
        version: string;
    }>;
    findAllQuestionnaires(queryDto: QueryQuestionnaireDto): Promise<{
        data: ({
            questionnaireQuestions: ({
                question: {
                    id: string;
                    active: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    dependsOn: string | null;
                    options: Prisma.JsonValue | null;
                    code: string;
                    questionText: string;
                    descriptionText: string | null;
                    questionType: import("@prisma/client").$Enums.QuestionType;
                    inputType: string | null;
                    hasScore: boolean;
                    showWhen: Prisma.JsonValue | null;
                };
            } & {
                id: string;
                questionnaireId: string;
                questionId: string;
                order: number;
                required: boolean;
                section: string | null;
            })[];
            diagnosticGroups: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                questionnaireId: string;
                scoringConfig: Prisma.JsonValue | null;
                description: string | null;
                diagnosticCode: string | null;
                scoringMethod: string | null;
            }[];
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            code: string;
            version: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findQuestionnaireById(id: string): Promise<{
        questionnaireQuestions: ({
            question: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                dependsOn: string | null;
                options: Prisma.JsonValue | null;
                code: string;
                questionText: string;
                descriptionText: string | null;
                questionType: import("@prisma/client").$Enums.QuestionType;
                inputType: string | null;
                hasScore: boolean;
                showWhen: Prisma.JsonValue | null;
            };
        } & {
            id: string;
            questionnaireId: string;
            questionId: string;
            order: number;
            required: boolean;
            section: string | null;
        })[];
        diagnosticGroups: ({
            diagnostics: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                severity: string | null;
                maxScore: Prisma.Decimal;
                diagnosticGroupId: string;
                minScore: Prisma.Decimal;
                recommendations: string | null;
                colorCode: string | null;
            }[];
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            questionnaireId: string;
            scoringConfig: Prisma.JsonValue | null;
            description: string | null;
            diagnosticCode: string | null;
            scoringMethod: string | null;
        })[];
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        code: string;
        version: string;
    }>;
    updateQuestionnaire(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        code: string;
        version: string;
    }>;
    removeQuestionnaire(id: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        code: string;
        version: string;
    }>;
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        dependsOn: string | null;
        options: Prisma.JsonValue | null;
        code: string;
        questionText: string;
        descriptionText: string | null;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        hasScore: boolean;
        showWhen: Prisma.JsonValue | null;
    }>;
    findAllQuestions(page?: number, limit?: number, search?: string): Promise<{
        data: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            dependsOn: string | null;
            options: Prisma.JsonValue | null;
            code: string;
            questionText: string;
            descriptionText: string | null;
            questionType: import("@prisma/client").$Enums.QuestionType;
            inputType: string | null;
            hasScore: boolean;
            showWhen: Prisma.JsonValue | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findQuestionById(id: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        dependsOn: string | null;
        options: Prisma.JsonValue | null;
        code: string;
        questionText: string;
        descriptionText: string | null;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        hasScore: boolean;
        showWhen: Prisma.JsonValue | null;
    }>;
    updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        dependsOn: string | null;
        options: Prisma.JsonValue | null;
        code: string;
        questionText: string;
        descriptionText: string | null;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        hasScore: boolean;
        showWhen: Prisma.JsonValue | null;
    }>;
    removeQuestion(id: string): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        dependsOn: string | null;
        options: Prisma.JsonValue | null;
        code: string;
        questionText: string;
        descriptionText: string | null;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        hasScore: boolean;
        showWhen: Prisma.JsonValue | null;
    }>;
    addQuestionToQuestionnaire(createQuestionnaireQuestionDto: CreateQuestionnaireQuestionDto): Promise<{
        id: string;
        questionnaireId: string;
        questionId: string;
        order: number;
        required: boolean;
        section: string | null;
    }>;
    removeQuestionFromQuestionnaire(id: string): Promise<{
        id: string;
        questionnaireId: string;
        questionId: string;
        order: number;
        required: boolean;
        section: string | null;
    }>;
    createDiagnosticGroup(createDiagnosticGroupDto: CreateDiagnosticGroupDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        questionnaireId: string;
        scoringConfig: Prisma.JsonValue | null;
        description: string | null;
        diagnosticCode: string | null;
        scoringMethod: string | null;
    }>;
    updateDiagnosticGroup(id: string, updateDiagnosticGroupDto: UpdateDiagnosticGroupDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        questionnaireId: string;
        scoringConfig: Prisma.JsonValue | null;
        description: string | null;
        diagnosticCode: string | null;
        scoringMethod: string | null;
    }>;
    createDiagnostic(createDiagnosticDto: CreateDiagnosticDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        severity: string | null;
        maxScore: Prisma.Decimal;
        diagnosticGroupId: string;
        minScore: Prisma.Decimal;
        recommendations: string | null;
        colorCode: string | null;
    }>;
    updateDiagnostic(id: string, updateDiagnosticDto: UpdateDiagnosticDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        severity: string | null;
        maxScore: Prisma.Decimal;
        diagnosticGroupId: string;
        minScore: Prisma.Decimal;
        recommendations: string | null;
        colorCode: string | null;
    }>;
    createPatientQuestionnaire(createPatientQuestionnaireDto: CreatePatientQuestionnaireDto): Promise<{
        id: string;
        patientId: string;
        notes: string | null;
        questionnaireId: string;
        startedAt: Date;
        completedAt: Date | null;
        isCompleted: boolean;
        totalScore: Prisma.Decimal | null;
        sourceIp: string | null;
        device: string | null;
        relationsProcessed: boolean;
        relationsProcessingStatus: string | null;
        relationsProcessingError: string | null;
        relationsProcessedAt: Date | null;
    }>;
    findPatientQuestionnaires(patientId: string): Promise<({
        questionnaire: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            code: string;
            version: string;
        };
        answers: {
            id: string;
            score: Prisma.Decimal | null;
            questionId: string;
            answeredAt: Date;
            patientQuestionnaireId: string;
            textValue: string | null;
            numericValue: Prisma.Decimal | null;
            booleanValue: boolean | null;
            dateValue: Date | null;
            jsonValue: Prisma.JsonValue | null;
        }[];
    } & {
        id: string;
        patientId: string;
        notes: string | null;
        questionnaireId: string;
        startedAt: Date;
        completedAt: Date | null;
        isCompleted: boolean;
        totalScore: Prisma.Decimal | null;
        sourceIp: string | null;
        device: string | null;
        relationsProcessed: boolean;
        relationsProcessingStatus: string | null;
        relationsProcessingError: string | null;
        relationsProcessedAt: Date | null;
    })[]>;
    createAnswer(createAnswerDto: CreateAnswerDto): Promise<{
        id: string;
        score: Prisma.Decimal | null;
        questionId: string;
        answeredAt: Date;
        patientQuestionnaireId: string;
        textValue: string | null;
        numericValue: Prisma.Decimal | null;
        booleanValue: boolean | null;
        dateValue: Date | null;
        jsonValue: Prisma.JsonValue | null;
    }>;
    findAnswersByPatientQuestionnaire(patientQuestionnaireId: string): Promise<({
        question: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            dependsOn: string | null;
            options: Prisma.JsonValue | null;
            code: string;
            questionText: string;
            descriptionText: string | null;
            questionType: import("@prisma/client").$Enums.QuestionType;
            inputType: string | null;
            hasScore: boolean;
            showWhen: Prisma.JsonValue | null;
        };
    } & {
        id: string;
        score: Prisma.Decimal | null;
        questionId: string;
        answeredAt: Date;
        patientQuestionnaireId: string;
        textValue: string | null;
        numericValue: Prisma.Decimal | null;
        booleanValue: boolean | null;
        dateValue: Date | null;
        jsonValue: Prisma.JsonValue | null;
    })[]>;
    processBatchAnswers(batchAnswerDto: BatchAnswerDto): Promise<ProcessedQuestionnaireResultDto>;
    private processRelationsInBackground;
    getRelationsProcessingStatus(patientQuestionnaireId: string): Promise<{
        relationsProcessed: boolean;
        relationsProcessingStatus: string | null;
        relationsProcessingError: string | null;
        relationsProcessedAt: Date | null;
    }>;
    getPatientQuestionnaireDetails(patientQuestionnaireId: string): Promise<{
        patientQuestionnaireId: string;
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            secondLastName: string | null;
            identificationType: string | null;
            identification: string | null;
            phone: string | null;
            email: string;
            birthdate: Date;
            gender: string;
            nationality: string | null;
            countryOfOrigin: string | null;
            countryOfResidence: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
            maritalStatus: string | null;
            race: string | null;
            preferredLanguage: string | null;
            educationLevel: string | null;
            socioeconomicStatus: number | null;
            emergencyContact: string | null;
            emergencyPhone: string | null;
            medicalHistory: string | null;
            allergies: string | null;
            currentMedications: string | null;
            bloodType: string | null;
            currentIllness: string | null;
            diagnosticPlan: string | null;
            treatmentPlan: string | null;
            problems: Prisma.JsonValue | null;
            evolucion: Prisma.JsonValue | null;
            lastClinicalUpdateBy: string | null;
            lastClinicalUpdateAt: Date | null;
            active: boolean;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        questionnaire: {
            questionnaireQuestions: ({
                question: {
                    id: string;
                    active: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    dependsOn: string | null;
                    options: Prisma.JsonValue | null;
                    code: string;
                    questionText: string;
                    descriptionText: string | null;
                    questionType: import("@prisma/client").$Enums.QuestionType;
                    inputType: string | null;
                    hasScore: boolean;
                    showWhen: Prisma.JsonValue | null;
                };
            } & {
                id: string;
                questionnaireId: string;
                questionId: string;
                order: number;
                required: boolean;
                section: string | null;
            })[];
            diagnosticGroups: ({
                diagnostics: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string | null;
                    severity: string | null;
                    maxScore: Prisma.Decimal;
                    diagnosticGroupId: string;
                    minScore: Prisma.Decimal;
                    recommendations: string | null;
                    colorCode: string | null;
                }[];
            } & {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                questionnaireId: string;
                scoringConfig: Prisma.JsonValue | null;
                description: string | null;
                diagnosticCode: string | null;
                scoringMethod: string | null;
            })[];
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            code: string;
            version: string;
        };
        answers: {
            id: string;
            questionText: string;
            questionCode: string;
            questionType: string;
            textValue: string | undefined;
            numericValue: number | undefined;
            booleanValue: true | undefined;
            score: number;
            answeredAt: Date;
            readableAnswer: string;
        }[];
        diagnostics: {
            group: string;
            name: string;
            description: string | null;
            severity: string | null;
            obtainedScore: number;
            maxPossibleScore: number;
            percentage: number;
            observations: string | null;
            diagnosedAt: Date;
        }[];
        summary: {
            totalScore: number;
            maxPossibleScore: number;
            scorePercentage: number;
            completedAt: Date | null;
            overallRisk: string;
            relationsProcessingStatus: string | null;
            relationsProcessed: boolean;
            relationsProcessedAt: Date | null;
        };
        answersBySection: {
            sectionName: string;
            questions: {
                questionText: any;
                answer: any;
                score: any;
            }[];
            sectionScore: any;
            maxSectionScore: number;
        }[];
    }>;
    private groupAnswersBySection;
    reprocessQuestionnaireRelations(patientQuestionnaireId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private calculateAndSaveDiagnostics;
    private calculateAndSaveDiagnosticsInTransaction;
    private handleIM1PatientCreation;
    private handleIM1PatientCreationInTransaction;
    private processIM1AntecedentsSymptomsAndPhysicalExamination;
    private processIM1AntecedentsSymptomsAndPhysicalExaminationInTransaction;
    private handleIM1SpecialProcessing;
    private extractPatientDataFromIM1Answers;
    private processIM1Antecedents;
    private processIM1Symptoms;
    private createSymptomsFromSelection;
    private createAntecedentsFromSelection;
    private processIM1PhysicalExamination;
    private formatAntecedentName;
    private processIM1MedicationsAndLabResults;
    private processIM1Medications;
    private processIM1LabResults;
    private determineRiskLevel;
}
