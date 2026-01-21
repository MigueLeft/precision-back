import { QuestionnairesService } from './questionnaires.service';
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
export declare class QuestionnairesController {
    private readonly questionnairesService;
    constructor(questionnairesService: QuestionnairesService);
    createQuestionnaire(createQuestionnaireDto: CreateQuestionnaireDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        version: string;
    }>;
    findAllQuestionnaires(queryDto: QueryQuestionnaireDto): Promise<{
        data: ({
            questionnaireQuestions: ({
                question: {
                    dependsOn: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    active: boolean;
                    code: string;
                    questionText: string;
                    questionType: import("@prisma/client").$Enums.QuestionType;
                    inputType: string | null;
                    options: import("@prisma/client/runtime/library").JsonValue | null;
                    hasScore: boolean;
                    showWhen: import("@prisma/client/runtime/library").JsonValue | null;
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
                scoringConfig: import("@prisma/client/runtime/library").JsonValue | null;
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
                questionnaireId: string;
                diagnosticCode: string | null;
                scoringMethod: string | null;
            }[];
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
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
                dependsOn: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
                code: string;
                questionText: string;
                questionType: import("@prisma/client").$Enums.QuestionType;
                inputType: string | null;
                options: import("@prisma/client/runtime/library").JsonValue | null;
                hasScore: boolean;
                showWhen: import("@prisma/client/runtime/library").JsonValue | null;
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
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                severity: string | null;
                maxScore: import("@prisma/client/runtime/library").Decimal;
                diagnosticGroupId: string;
                minScore: import("@prisma/client/runtime/library").Decimal;
                recommendations: string | null;
                colorCode: string | null;
            }[];
        } & {
            scoringConfig: import("@prisma/client/runtime/library").JsonValue | null;
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            questionnaireId: string;
            diagnosticCode: string | null;
            scoringMethod: string | null;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        version: string;
    }>;
    updateQuestionnaire(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        version: string;
    }>;
    removeQuestionnaire(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        version: string;
    }>;
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<{
        dependsOn: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        questionText: string;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        hasScore: boolean;
        showWhen: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAllQuestions(page?: number, limit?: number, search?: string): Promise<{
        data: {
            dependsOn: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            code: string;
            questionText: string;
            questionType: import("@prisma/client").$Enums.QuestionType;
            inputType: string | null;
            options: import("@prisma/client/runtime/library").JsonValue | null;
            hasScore: boolean;
            showWhen: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findQuestionById(id: string): Promise<{
        dependsOn: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        questionText: string;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        hasScore: boolean;
        showWhen: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
        dependsOn: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        questionText: string;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        hasScore: boolean;
        showWhen: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    removeQuestion(id: string): Promise<{
        dependsOn: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        code: string;
        questionText: string;
        questionType: import("@prisma/client").$Enums.QuestionType;
        inputType: string | null;
        options: import("@prisma/client/runtime/library").JsonValue | null;
        hasScore: boolean;
        showWhen: import("@prisma/client/runtime/library").JsonValue | null;
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
        scoringConfig: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        questionnaireId: string;
        diagnosticCode: string | null;
        scoringMethod: string | null;
    }>;
    updateDiagnosticGroup(id: string, updateDiagnosticGroupDto: UpdateDiagnosticGroupDto): Promise<{
        scoringConfig: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        questionnaireId: string;
        diagnosticCode: string | null;
        scoringMethod: string | null;
    }>;
    createDiagnostic(createDiagnosticDto: CreateDiagnosticDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        severity: string | null;
        maxScore: import("@prisma/client/runtime/library").Decimal;
        diagnosticGroupId: string;
        minScore: import("@prisma/client/runtime/library").Decimal;
        recommendations: string | null;
        colorCode: string | null;
    }>;
    updateDiagnostic(id: string, updateDiagnosticDto: UpdateDiagnosticDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        severity: string | null;
        maxScore: import("@prisma/client/runtime/library").Decimal;
        diagnosticGroupId: string;
        minScore: import("@prisma/client/runtime/library").Decimal;
        recommendations: string | null;
        colorCode: string | null;
    }>;
    createPatientQuestionnaire(createPatientQuestionnaireDto: CreatePatientQuestionnaireDto): Promise<{
        id: string;
        questionnaireId: string;
        patientId: string;
        startedAt: Date;
        completedAt: Date | null;
        isCompleted: boolean;
        totalScore: import("@prisma/client/runtime/library").Decimal | null;
        sourceIp: string | null;
        device: string | null;
        notes: string | null;
        relationsProcessed: boolean;
        relationsProcessingStatus: string | null;
        relationsProcessingError: string | null;
        relationsProcessedAt: Date | null;
    }>;
    findPatientQuestionnaires(patientId: string): Promise<({
        questionnaire: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            code: string;
            version: string;
        };
        answers: {
            id: string;
            score: import("@prisma/client/runtime/library").Decimal | null;
            questionId: string;
            answeredAt: Date;
            patientQuestionnaireId: string;
            textValue: string | null;
            numericValue: import("@prisma/client/runtime/library").Decimal | null;
            booleanValue: boolean | null;
            dateValue: Date | null;
            jsonValue: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        questionnaireId: string;
        patientId: string;
        startedAt: Date;
        completedAt: Date | null;
        isCompleted: boolean;
        totalScore: import("@prisma/client/runtime/library").Decimal | null;
        sourceIp: string | null;
        device: string | null;
        notes: string | null;
        relationsProcessed: boolean;
        relationsProcessingStatus: string | null;
        relationsProcessingError: string | null;
        relationsProcessedAt: Date | null;
    })[]>;
    createAnswer(createAnswerDto: CreateAnswerDto): Promise<{
        id: string;
        score: import("@prisma/client/runtime/library").Decimal | null;
        questionId: string;
        answeredAt: Date;
        patientQuestionnaireId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        dateValue: Date | null;
        jsonValue: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAnswersByPatientQuestionnaire(id: string): Promise<({
        question: {
            dependsOn: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            code: string;
            questionText: string;
            questionType: import("@prisma/client").$Enums.QuestionType;
            inputType: string | null;
            options: import("@prisma/client/runtime/library").JsonValue | null;
            hasScore: boolean;
            showWhen: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        score: import("@prisma/client/runtime/library").Decimal | null;
        questionId: string;
        answeredAt: Date;
        patientQuestionnaireId: string;
        textValue: string | null;
        numericValue: import("@prisma/client/runtime/library").Decimal | null;
        booleanValue: boolean | null;
        dateValue: Date | null;
        jsonValue: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    processBatchAnswers(batchAnswerDto: BatchAnswerDto): Promise<ProcessedQuestionnaireResultDto>;
    getRelationsProcessingStatus(id: string): Promise<{
        relationsProcessed: boolean;
        relationsProcessingStatus: string | null;
        relationsProcessingError: string | null;
        relationsProcessedAt: Date | null;
    }>;
    getPatientQuestionnaireDetails(id: string): Promise<{
        patientQuestionnaireId: string;
        patient: {
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
        };
        questionnaire: {
            questionnaireQuestions: ({
                question: {
                    dependsOn: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    active: boolean;
                    code: string;
                    questionText: string;
                    questionType: import("@prisma/client").$Enums.QuestionType;
                    inputType: string | null;
                    options: import("@prisma/client/runtime/library").JsonValue | null;
                    hasScore: boolean;
                    showWhen: import("@prisma/client/runtime/library").JsonValue | null;
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
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    severity: string | null;
                    maxScore: import("@prisma/client/runtime/library").Decimal;
                    diagnosticGroupId: string;
                    minScore: import("@prisma/client/runtime/library").Decimal;
                    recommendations: string | null;
                    colorCode: string | null;
                }[];
            } & {
                scoringConfig: import("@prisma/client/runtime/library").JsonValue | null;
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
                questionnaireId: string;
                diagnosticCode: string | null;
                scoringMethod: string | null;
            })[];
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
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
    reprocessQuestionnaireRelations(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
