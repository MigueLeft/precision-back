"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var QuestionnairesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnairesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let QuestionnairesService = QuestionnairesService_1 = class QuestionnairesService {
    prisma;
    logger = new common_1.Logger(QuestionnairesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuestionnaire(createQuestionnaireDto) {
        this.logger.log('Creating new questionnaire');
        return this.prisma.questionnaire.create({
            data: createQuestionnaireDto,
        });
    }
    async findAllQuestionnaires(queryDto) {
        const { page = 1, limit = 10, search, active, version } = queryDto;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (active !== undefined) {
            where.active = active;
        }
        if (version) {
            where.version = version;
        }
        const [questionnaires, total] = await Promise.all([
            this.prisma.questionnaire.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    questionnaireQuestions: {
                        include: {
                            question: true,
                        },
                        orderBy: { order: 'asc' },
                    },
                    diagnosticGroups: true,
                },
            }),
            this.prisma.questionnaire.count({ where }),
        ]);
        return {
            data: questionnaires,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findQuestionnaireById(id) {
        const questionnaire = await this.prisma.questionnaire.findUnique({
            where: { id },
            include: {
                questionnaireQuestions: {
                    include: {
                        question: true,
                    },
                    orderBy: {
                        question: {
                            code: 'asc',
                        },
                    },
                },
                diagnosticGroups: {
                    include: {
                        diagnostics: true,
                    },
                },
            },
        });
        if (!questionnaire) {
            throw new common_1.NotFoundException(`Questionnaire with ID ${id} not found`);
        }
        return questionnaire;
    }
    async updateQuestionnaire(id, updateQuestionnaireDto) {
        this.logger.log(`Updating questionnaire ${id}`);
        await this.findQuestionnaireById(id);
        return this.prisma.questionnaire.update({
            where: { id },
            data: updateQuestionnaireDto,
        });
    }
    async removeQuestionnaire(id) {
        this.logger.log(`Removing questionnaire ${id}`);
        await this.findQuestionnaireById(id);
        return this.prisma.questionnaire.delete({
            where: { id },
        });
    }
    async createQuestion(createQuestionDto) {
        this.logger.log('Creating new question');
        return this.prisma.question.create({
            data: createQuestionDto,
        });
    }
    async findAllQuestions(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { questionText: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [questions, total] = await Promise.all([
            this.prisma.question.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.question.count({ where }),
        ]);
        return {
            data: questions,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findQuestionById(id) {
        const question = await this.prisma.question.findUnique({
            where: { id },
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        return question;
    }
    async updateQuestion(id, updateQuestionDto) {
        this.logger.log(`Updating question ${id}`);
        await this.findQuestionById(id);
        return this.prisma.question.update({
            where: { id },
            data: updateQuestionDto,
        });
    }
    async removeQuestion(id) {
        this.logger.log(`Removing question ${id}`);
        await this.findQuestionById(id);
        return this.prisma.question.delete({
            where: { id },
        });
    }
    async addQuestionToQuestionnaire(createQuestionnaireQuestionDto) {
        this.logger.log('Adding question to questionnaire');
        return this.prisma.questionnaireQuestion.create({
            data: createQuestionnaireQuestionDto,
        });
    }
    async removeQuestionFromQuestionnaire(id) {
        this.logger.log(`Removing question from questionnaire ${id}`);
        return this.prisma.questionnaireQuestion.delete({
            where: { id },
        });
    }
    async createDiagnosticGroup(createDiagnosticGroupDto) {
        this.logger.log('Creating new diagnostic group');
        return this.prisma.diagnosticGroup.create({
            data: createDiagnosticGroupDto,
        });
    }
    async updateDiagnosticGroup(id, updateDiagnosticGroupDto) {
        this.logger.log(`Updating diagnostic group ${id}`);
        return this.prisma.diagnosticGroup.update({
            where: { id },
            data: updateDiagnosticGroupDto,
        });
    }
    async createDiagnostic(createDiagnosticDto) {
        this.logger.log('Creating new diagnostic');
        return this.prisma.diagnostic.create({
            data: createDiagnosticDto,
        });
    }
    async updateDiagnostic(id, updateDiagnosticDto) {
        this.logger.log(`Updating diagnostic ${id}`);
        return this.prisma.diagnostic.update({
            where: { id },
            data: updateDiagnosticDto,
        });
    }
    async createPatientQuestionnaire(createPatientQuestionnaireDto) {
        this.logger.log('Creating new patient questionnaire session');
        return this.prisma.patientQuestionnaire.create({
            data: createPatientQuestionnaireDto,
        });
    }
    async findPatientQuestionnaires(patientId) {
        return this.prisma.patientQuestionnaire.findMany({
            where: { patientId },
            include: {
                questionnaire: true,
                answers: true,
            },
            orderBy: { startedAt: 'desc' },
        });
    }
    async createAnswer(createAnswerDto) {
        this.logger.log('Creating new answer');
        return this.prisma.answer.create({
            data: createAnswerDto,
        });
    }
    async findAnswersByPatientQuestionnaire(patientQuestionnaireId) {
        return this.prisma.answer.findMany({
            where: { patientQuestionnaireId },
            include: {
                question: true,
            },
            orderBy: { answeredAt: 'asc' },
        });
    }
    async processBatchAnswers(batchAnswerDto) {
        const { patientId, questionnaireId, answers } = batchAnswerDto;
        this.logger.log(`Processing batch answers for patient ${patientId || 'new patient'} and questionnaire ${questionnaireId}`);
        const quickResult = await this.prisma.$transaction(async (tx) => {
            const questionnaireInfo = await tx.questionnaire.findUnique({
                where: { id: questionnaireId },
                select: { code: true, name: true },
            });
            let actualPatientId = patientId;
            if (questionnaireInfo?.code === 'im1') {
                actualPatientId = await this.handleIM1PatientCreationInTransaction(answers, patientId, tx);
            }
            else if (!patientId) {
                throw new Error('Patient ID is required for non-IM1 questionnaires');
            }
            if (!actualPatientId) {
                throw new Error('Patient ID could not be determined');
            }
            const patientQuestionnaire = await tx.patientQuestionnaire.create({
                data: {
                    patientId: actualPatientId,
                    questionnaireId,
                    startedAt: new Date(),
                    relationsProcessingStatus: 'pending',
                    relationsProcessed: false,
                },
            });
            const createdAnswers = await Promise.all(answers.map(async (answer) => {
                const question = await tx.question.findUnique({
                    where: { id: answer.questionId },
                    select: { code: true },
                });
                let calculatedScore = answer.score || 0;
                if (question?.code === 'im1_d2_2' &&
                    answer.answerValue !== undefined) {
                    const minutes = Number(answer.answerValue);
                    if (minutes === 0)
                        calculatedScore = 0;
                    else if (minutes >= 1 && minutes <= 29)
                        calculatedScore = 20;
                    else if (minutes >= 30 && minutes <= 59)
                        calculatedScore = 40;
                    else if (minutes >= 60 && minutes <= 89)
                        calculatedScore = 60;
                    else if (minutes >= 90 && minutes <= 119)
                        calculatedScore = 80;
                    else if (minutes >= 120 && minutes <= 149)
                        calculatedScore = 90;
                    else if (minutes >= 150)
                        calculatedScore = 100;
                }
                return tx.answer.create({
                    data: {
                        patientQuestionnaireId: patientQuestionnaire.id,
                        questionId: answer.questionId,
                        textValue: answer.answerText,
                        numericValue: answer.answerValue
                            ? new client_1.Prisma.Decimal(answer.answerValue)
                            : undefined,
                        booleanValue: answer.answerBoolean,
                        score: new client_1.Prisma.Decimal(calculatedScore),
                        answeredAt: new Date(),
                    },
                    include: {
                        question: {
                            select: {
                                id: true,
                                code: true,
                                questionText: true,
                                questionType: true,
                            },
                        },
                    },
                });
            }));
            return {
                patientQuestionnaireId: patientQuestionnaire.id,
                actualPatientId,
                questionnaireCode: questionnaireInfo?.code,
                createdAnswers,
            };
        }, {
            timeout: 30000,
        });
        const totalScore = quickResult.createdAnswers.reduce((sum, answer) => sum + Number(answer.score || 0), 0);
        await this.prisma.patientQuestionnaire.update({
            where: { id: quickResult.patientQuestionnaireId },
            data: {
                completedAt: new Date(),
                isCompleted: true,
                totalScore: new client_1.Prisma.Decimal(totalScore),
            },
        });
        this.processRelationsInBackground(quickResult.patientQuestionnaireId, quickResult.actualPatientId, quickResult.questionnaireCode, questionnaireId, quickResult.createdAnswers).catch((error) => {
            this.logger.error(`Background processing failed for patient questionnaire ${quickResult.patientQuestionnaireId}: ${error.message}`, error.stack);
        });
        return {
            patientQuestionnaireId: quickResult.patientQuestionnaireId,
            patient: null,
            questionnaire: null,
            answers: [],
            diagnostics: [],
            summary: {
                totalScore,
                maxPossibleScore: 0,
                scorePercentage: 0,
                completedAt: new Date(),
                overallRisk: 'medium',
                relationsProcessingStatus: 'processing',
            },
            answersBySection: [],
        };
    }
    async processRelationsInBackground(patientQuestionnaireId, patientId, questionnaireCode, questionnaireId, createdAnswers) {
        try {
            this.logger.log(`Starting background processing for patient questionnaire ${patientQuestionnaireId}`);
            await this.prisma.patientQuestionnaire.update({
                where: { id: patientQuestionnaireId },
                data: { relationsProcessingStatus: 'processing' },
            });
            await this.prisma.$transaction(async (tx) => {
                if (questionnaireCode === 'im1') {
                    await this.processIM1AntecedentsSymptomsAndPhysicalExaminationInTransaction(patientId, createdAnswers, tx);
                }
                await this.calculateAndSaveDiagnosticsInTransaction(patientId, patientQuestionnaireId, questionnaireId, createdAnswers, tx);
            }, {
                timeout: 30000,
            });
            if (questionnaireCode === 'im1') {
                await this.processIM1MedicationsAndLabResults(patientId, createdAnswers);
            }
            await this.prisma.patientQuestionnaire.update({
                where: { id: patientQuestionnaireId },
                data: {
                    relationsProcessed: true,
                    relationsProcessingStatus: 'completed',
                    relationsProcessedAt: new Date(),
                },
            });
            this.logger.log(`Background processing completed for patient questionnaire ${patientQuestionnaireId}`);
        }
        catch (error) {
            this.logger.error(`Error processing relations in background for patient questionnaire ${patientQuestionnaireId}: ${error.message}`, error.stack);
            await this.prisma.patientQuestionnaire.update({
                where: { id: patientQuestionnaireId },
                data: {
                    relationsProcessed: false,
                    relationsProcessingStatus: 'failed',
                    relationsProcessingError: error.message,
                },
            });
            throw error;
        }
    }
    async getRelationsProcessingStatus(patientQuestionnaireId) {
        const patientQuestionnaire = await this.prisma.patientQuestionnaire.findUnique({
            where: { id: patientQuestionnaireId },
            select: {
                relationsProcessed: true,
                relationsProcessingStatus: true,
                relationsProcessingError: true,
                relationsProcessedAt: true,
            },
        });
        if (!patientQuestionnaire) {
            throw new common_1.NotFoundException(`Patient questionnaire with ID ${patientQuestionnaireId} not found`);
        }
        return patientQuestionnaire;
    }
    async getPatientQuestionnaireDetails(patientQuestionnaireId) {
        this.logger.log(`Fetching complete details for patient questionnaire ${patientQuestionnaireId}`);
        const patientQuestionnaire = await this.prisma.patientQuestionnaire.findUnique({
            where: { id: patientQuestionnaireId },
            include: {
                patient: true,
                questionnaire: {
                    include: {
                        questionnaireQuestions: {
                            include: { question: true },
                            orderBy: { order: 'asc' },
                        },
                        diagnosticGroups: {
                            include: {
                                diagnostics: true,
                            },
                        },
                    },
                },
                answers: {
                    include: {
                        question: true,
                    },
                    orderBy: { answeredAt: 'asc' },
                },
                patientDiagnostics: {
                    include: {
                        diagnostic: {
                            include: {
                                diagnosticGroup: true,
                            },
                        },
                    },
                },
            },
        });
        if (!patientQuestionnaire) {
            throw new common_1.NotFoundException(`Patient questionnaire with ID ${patientQuestionnaireId} not found`);
        }
        const formattedAnswers = patientQuestionnaire.answers.map((answer) => {
            let readableAnswer = '';
            if (answer.booleanValue !== null) {
                readableAnswer = answer.booleanValue ? 'Sí' : 'No';
            }
            else if (answer.numericValue !== null) {
                const numValue = Number(answer.numericValue);
                if (answer.question.code.startsWith('im1_d4_1')) {
                    const anxietyMap = {
                        0: 'Para nada',
                        1: 'Algunos días',
                        2: 'Más de la mitad de los días',
                        3: 'Casi todos los días',
                    };
                    readableAnswer = anxietyMap[numValue] || numValue.toString();
                }
                else {
                    readableAnswer = numValue.toString();
                }
            }
            else if (answer.textValue) {
                readableAnswer = answer.textValue;
            }
            return {
                id: answer.id,
                questionText: answer.question.questionText,
                questionCode: answer.question.code,
                questionType: answer.question.questionType.toString(),
                textValue: answer.textValue || undefined,
                numericValue: answer.numericValue
                    ? Number(answer.numericValue)
                    : undefined,
                booleanValue: answer.booleanValue || undefined,
                score: Number(answer.score),
                answeredAt: answer.answeredAt,
                readableAnswer,
            };
        });
        const formattedDiagnostics = patientQuestionnaire.patientDiagnostics.map((pd) => ({
            group: pd.diagnostic.diagnosticGroup.name,
            name: pd.diagnostic.name,
            description: pd.diagnostic.description,
            severity: pd.diagnostic.severity,
            obtainedScore: Number(pd.obtainedScore),
            maxPossibleScore: Number(pd.maxPossibleScore),
            percentage: Number(pd.percentage),
            observations: pd.observations,
            diagnosedAt: pd.diagnosedAt,
        }));
        const totalScore = Number(patientQuestionnaire.totalScore || 0);
        const maxPossibleScore = patientQuestionnaire.questionnaire
            .questionnaireQuestions.length
            ? patientQuestionnaire.questionnaire.questionnaireQuestions.length * 3
            : 0;
        const scorePercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
        const overallRisk = scorePercentage >= 70
            ? 'low'
            : scorePercentage >= 40
                ? 'medium'
                : 'high';
        const answersBySection = this.groupAnswersBySection(formattedAnswers);
        return {
            patientQuestionnaireId: patientQuestionnaire.id,
            patient: patientQuestionnaire.patient,
            questionnaire: patientQuestionnaire.questionnaire,
            answers: formattedAnswers,
            diagnostics: formattedDiagnostics,
            summary: {
                totalScore,
                maxPossibleScore,
                scorePercentage,
                completedAt: patientQuestionnaire.completedAt,
                overallRisk,
                relationsProcessingStatus: patientQuestionnaire.relationsProcessingStatus,
                relationsProcessed: patientQuestionnaire.relationsProcessed,
                relationsProcessedAt: patientQuestionnaire.relationsProcessedAt,
            },
            answersBySection,
        };
    }
    groupAnswersBySection(formattedAnswers) {
        return [
            {
                sectionName: 'A. DATOS PERSONALES Y DEMOGRÁFICOS',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_a'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_a'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_a')).length,
            },
            {
                sectionName: 'B. HISTORIA MÉDICA',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_b'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_b'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_b')).length,
            },
            {
                sectionName: 'C. MEDICIONES FÍSICAS, LABORATORIO Y MEDICAMENTOS',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_c'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_c'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_c')).length,
            },
            {
                sectionName: 'D. ESTILO DE VIDA',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_d')).length,
            },
            {
                sectionName: 'D.1. Nutrición - D.1.1. Calidad de la alimentación (MEDAS)',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d1_1'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d1_1'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_d1_1')).length,
            },
            {
                sectionName: 'D.4. Estrés y salud mental - D.4.1. Síntomas de ansiedad (GAD-7)',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d4_1'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d4_1'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_d4_1')).length * 3,
            },
            {
                sectionName: 'D.4. Estrés y salud mental - D.4.2. Síntomas de depresión (PHQ-9)',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d4_2'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_d4_2'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_d4_2')).length * 3,
            },
            {
                sectionName: 'E. METAS Y MOTIVACIONES PERSONALES',
                questions: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_e'))
                    .map((a) => ({
                    questionText: a.questionText,
                    answer: a.readableAnswer,
                    score: a.score,
                })),
                sectionScore: formattedAnswers
                    .filter((a) => a.questionCode.startsWith('im1_e'))
                    .reduce((sum, a) => sum + a.score, 0),
                maxSectionScore: formattedAnswers.filter((a) => a.questionCode.startsWith('im1_e')).length,
            },
        ];
    }
    async reprocessQuestionnaireRelations(patientQuestionnaireId) {
        this.logger.log(`Reprocessing relations for patient questionnaire ${patientQuestionnaireId}`);
        const patientQuestionnaire = await this.prisma.patientQuestionnaire.findUnique({
            where: { id: patientQuestionnaireId },
            include: {
                answers: {
                    include: {
                        question: {
                            select: {
                                id: true,
                                code: true,
                                questionText: true,
                                questionType: true,
                            },
                        },
                    },
                },
                questionnaire: {
                    select: { code: true },
                },
            },
        });
        if (!patientQuestionnaire) {
            throw new common_1.NotFoundException(`Patient questionnaire with ID ${patientQuestionnaireId} not found`);
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.patientDiagnostic.deleteMany({
                where: { patientQuestionnaireId },
            });
            await tx.patientAntecedent.deleteMany({
                where: {
                    patientId: patientQuestionnaire.patientId,
                    notes: { contains: 'cuestionario IM1' },
                },
            });
            await tx.patientSymptom.deleteMany({
                where: {
                    patientId: patientQuestionnaire.patientId,
                    notes: 'Reported in IM1 questionnaire',
                },
            });
            const physicalExaminations = await tx.patientPhysicalExamination.findMany({
                where: {
                    patientId: patientQuestionnaire.patientId,
                    notes: 'Basic physical examination data from IM1 questionnaire',
                },
                include: { physicalExamination: true },
            });
            for (const pe of physicalExaminations) {
                await tx.patientPhysicalExamination.delete({
                    where: { id: pe.id },
                });
                await tx.physicalExamination.delete({
                    where: { id: pe.physicalExaminationId },
                });
            }
        });
        this.processRelationsInBackground(patientQuestionnaireId, patientQuestionnaire.patientId, patientQuestionnaire.questionnaire.code, patientQuestionnaire.questionnaireId, patientQuestionnaire.answers).catch((error) => {
            this.logger.error(`Reprocessing failed for patient questionnaire ${patientQuestionnaireId}: ${error.message}`, error.stack);
        });
        return {
            success: true,
            message: 'Reprocessing started successfully. Relations will be recreated in background.',
        };
    }
    async calculateAndSaveDiagnostics(patientId, patientQuestionnaireId, questionnaireId, answers) {
        return await this.prisma.$transaction(async (tx) => {
            return await this.calculateAndSaveDiagnosticsInTransaction(patientId, patientQuestionnaireId, questionnaireId, answers, tx);
        });
    }
    async calculateAndSaveDiagnosticsInTransaction(patientId, patientQuestionnaireId, questionnaireId, answers, tx) {
        const diagnosticGroups = await tx.diagnosticGroup.findMany({
            where: { questionnaireId },
            include: {
                diagnostics: true,
            },
        });
        const diagnosticsResult = [];
        for (const group of diagnosticGroups) {
            const relevantAnswers = answers.filter((answer) => {
                const questionCode = answer.question.code;
                switch (group.name) {
                    case 'A.5. Educación':
                        return questionCode === 'im1_a5_1';
                    case 'A.6. Estatus Socioeconómico':
                        return questionCode === 'im1_a6_1';
                    case 'Nutrición':
                        return questionCode?.startsWith('im1_d1_');
                    case 'D.2. Actividad física - Nivel':
                        return questionCode === 'im1_d2_1';
                    case 'D.2. Actividad física - Minutos':
                        return questionCode === 'im1_d2_2';
                    case 'D.3.1. Calidad de sueño':
                        return questionCode === 'im1_d3_1';
                    case 'D.3.1. Horas de sueño':
                        return questionCode === 'im1_d3_2';
                    case 'D.3.2. Apnea obstructiva del sueño (NoSAS)':
                        return questionCode === 'im1_d3_3';
                    case 'D.4.1. Síntomas de ansiedad (GAD-7)':
                        return questionCode?.startsWith('im1_d4_1');
                    case 'D.4.2. Síntomas de depresión (PHQ-9)':
                        return questionCode?.startsWith('im1_d4_2');
                    case 'D.5.1. Alcohol (AUDIT-C)':
                        return questionCode?.startsWith('im1_d5_1');
                    case 'D.5.2. Tabaquismo (ASSIST)':
                        return questionCode?.startsWith('im1_d5_2');
                    case 'D.5.3. Drogas (ASSIST)':
                        return questionCode?.startsWith('im1_d5_3');
                    default:
                        return false;
                }
            });
            let groupScore = 0;
            if (group.name === 'D.2. Actividad física - Minutos') {
                const minutesAnswer = relevantAnswers[0];
                if (minutesAnswer && minutesAnswer.numericValue !== null) {
                    const minutes = Number(minutesAnswer.numericValue);
                    if (minutes === 0)
                        groupScore = 0;
                    else if (minutes >= 1 && minutes <= 29)
                        groupScore = 20;
                    else if (minutes >= 30 && minutes <= 59)
                        groupScore = 40;
                    else if (minutes >= 60 && minutes <= 89)
                        groupScore = 60;
                    else if (minutes >= 90 && minutes <= 119)
                        groupScore = 80;
                    else if (minutes >= 120 && minutes <= 149)
                        groupScore = 90;
                    else if (minutes >= 150)
                        groupScore = 100;
                }
            }
            else {
                groupScore = relevantAnswers.reduce((sum, answer) => {
                    const score = Number(answer.score || 0);
                    return isNaN(score) ? sum : sum + score;
                }, 0);
            }
            let maxPossibleScore = 0;
            if (relevantAnswers.length > 0) {
                switch (group.scoringMethod) {
                    case 'SUM':
                        const scoringConfig = group.scoringConfig;
                        maxPossibleScore =
                            scoringConfig?.maxScore || relevantAnswers.length * 3;
                        break;
                    case 'DIRECT':
                        if (group.name === 'D.2. Actividad física - Nivel') {
                            maxPossibleScore = 3;
                        }
                        else if (group.name === 'D.3.1. Horas de sueño') {
                            maxPossibleScore = 100;
                        }
                        else {
                            maxPossibleScore = 10;
                        }
                        break;
                    case 'RANGE':
                        if (group.name === 'D.2. Actividad física - Minutos') {
                            maxPossibleScore = 100;
                        }
                        else {
                            maxPossibleScore = 10;
                        }
                        break;
                    case 'FORMULA':
                        maxPossibleScore = 17;
                        break;
                    case 'CATEGORICAL':
                        maxPossibleScore = 5;
                        break;
                    default:
                        maxPossibleScore = relevantAnswers.length * 3;
                }
            }
            else {
                continue;
            }
            for (const diagnostic of group.diagnostics) {
                const minScore = Number(diagnostic.minScore);
                const maxScore = Number(diagnostic.maxScore);
                if (isNaN(groupScore) ||
                    isNaN(maxPossibleScore) ||
                    maxPossibleScore === 0) {
                    this.logger.warn(`Invalid scores for group ${group.name}: groupScore=${groupScore}, maxPossibleScore=${maxPossibleScore}`);
                    continue;
                }
                if (groupScore >= minScore && groupScore <= maxScore) {
                    let percentage = (groupScore / maxPossibleScore) * 100;
                    if (isNaN(percentage)) {
                        this.logger.warn(`Invalid percentage calculation for group ${group.name}: ${groupScore}/${maxPossibleScore}`);
                        continue;
                    }
                    if (percentage > 999.99) {
                        this.logger.warn(`Percentage too large for group ${group.name}: ${percentage}, capping at 999.99`);
                        percentage = 999.99;
                    }
                    await tx.patientDiagnostic.create({
                        data: {
                            patientId,
                            patientQuestionnaireId,
                            diagnosticId: diagnostic.id,
                            diagnosticGroupId: group.id,
                            obtainedScore: new client_1.Prisma.Decimal(groupScore.toFixed(2)),
                            maxPossibleScore: new client_1.Prisma.Decimal(maxPossibleScore.toFixed(2)),
                            percentage: new client_1.Prisma.Decimal(percentage.toFixed(2)),
                            diagnosedAt: new Date(),
                            observations: `Score: ${groupScore}/${maxPossibleScore} - ${diagnostic.name}`,
                        },
                    });
                    diagnosticsResult.push({
                        group: group.name,
                        name: diagnostic.name,
                        description: diagnostic.description,
                        score: groupScore,
                        threshold: minScore,
                        risk: diagnostic.severity ||
                            this.determineRiskLevel(groupScore, group.name),
                    });
                }
            }
        }
        return diagnosticsResult;
    }
    async handleIM1PatientCreation(answers, providedPatientId) {
        this.logger.log('Processing IM1 questionnaire - creating patient from answers');
        return await this.prisma.$transaction(async (tx) => {
            return await this.handleIM1PatientCreationInTransaction(answers, providedPatientId, tx);
        });
    }
    async handleIM1PatientCreationInTransaction(answers, providedPatientId, tx) {
        const patientData = await this.extractPatientDataFromIM1Answers(answers);
        if (providedPatientId) {
            this.logger.log(`Updating existing patient ${providedPatientId} with IM1 data`);
            const existingPatient = await tx.patient.findUnique({
                where: { id: providedPatientId },
            });
            if (!existingPatient) {
                throw new Error(`Patient with ID ${providedPatientId} not found. Please create the patient first before filling the IM1 questionnaire.`);
            }
            await tx.patient.update({
                where: { id: providedPatientId },
                data: patientData,
            });
            this.logger.log(`✅ Patient ${providedPatientId} updated successfully`);
            return providedPatientId;
        }
        this.logger.warn('No patientId provided for IM1 questionnaire, creating new patient (deprecated flow)');
        const newPatient = await tx.patient.create({
            data: {
                ...patientData,
                identification: patientData.identification || `IM1_${Date.now()}`,
            },
        });
        this.logger.log(`✅ New patient created: ${newPatient.id}`);
        return newPatient.id;
    }
    async processIM1AntecedentsSymptomsAndPhysicalExamination(patientId, answers) {
        this.logger.log('Processing IM1 antecedents, symptoms and physical examination');
        return await this.prisma.$transaction(async (tx) => {
            return await this.processIM1AntecedentsSymptomsAndPhysicalExaminationInTransaction(patientId, answers, tx);
        });
    }
    async processIM1AntecedentsSymptomsAndPhysicalExaminationInTransaction(patientId, answers, tx) {
        await this.processIM1Antecedents(patientId, answers, tx);
        await this.processIM1Symptoms(patientId, answers, tx);
        await this.processIM1PhysicalExamination(patientId, answers, tx);
    }
    async handleIM1SpecialProcessing(answers, providedPatientId) {
        this.logger.log('Processing IM1 questionnaire - creating patient and distributing data');
        return await this.prisma.$transaction(async (tx) => {
            const patientData = await this.extractPatientDataFromIM1Answers(answers);
            let actualPatientId = providedPatientId;
            if (providedPatientId) {
                try {
                    const existingPatient = await tx.patient.findUnique({
                        where: { id: providedPatientId },
                    });
                    if (existingPatient) {
                        await tx.patient.update({
                            where: { id: providedPatientId },
                            data: patientData,
                        });
                        actualPatientId = providedPatientId;
                    }
                    else {
                        this.logger.warn(`Patient ${providedPatientId} not found, creating new one`);
                        actualPatientId = undefined;
                    }
                }
                catch (error) {
                    this.logger.warn(`Failed to update existing patient ${providedPatientId}, creating new one`);
                    actualPatientId = undefined;
                }
            }
            if (!actualPatientId) {
                const newPatient = await tx.patient.create({
                    data: {
                        ...patientData,
                        identification: patientData.identification || `IM1_${Date.now()}`,
                    },
                });
                actualPatientId = newPatient.id;
            }
            await this.processIM1Antecedents(actualPatientId, answers, tx);
            await this.processIM1Symptoms(actualPatientId, answers, tx);
            await this.processIM1PhysicalExamination(actualPatientId, answers, tx);
            return actualPatientId;
        });
    }
    async extractPatientDataFromIM1Answers(answers) {
        const data = {};
        const questionsWithCodes = await Promise.all(answers.map(async (answer) => {
            const question = await this.prisma.question.findUnique({
                where: { id: answer.questionId },
                select: { code: true },
            });
            return {
                ...answer,
                questionCode: question?.code,
            };
        }));
        for (const answer of questionsWithCodes) {
            const questionCode = answer.questionCode;
            switch (questionCode) {
                case 'im1_a1_1':
                    data.firstName = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_2':
                    data.lastName = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_3':
                    if (answer.answerText || answer.textValue) {
                        data.birthdate = new Date(answer.answerText || answer.textValue);
                    }
                    break;
                case 'im1_a1_4':
                    data.gender = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_5':
                    data.email = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_6':
                    data.phone = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_7':
                    data.nationality = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_8':
                    data.countryOfOrigin = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_9':
                    data.countryOfResidence = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_10':
                    data.address = answer.answerText || answer.textValue;
                    break;
                case 'im1_a1_11':
                    data.city = answer.answerText || answer.textValue;
                    break;
                case 'im1_a2_1':
                    data.maritalStatus = answer.answerText || answer.textValue;
                    break;
                case 'im1_a3_1':
                    data.ethnicity = answer.answerText || answer.textValue;
                    break;
                case 'im1_a3_2':
                    data.race = answer.answerText || answer.textValue;
                    break;
                case 'im1_a4_1':
                    data.preferredLanguage = answer.answerText || answer.textValue;
                    break;
                case 'im1_a5_1':
                    data.educationLevel = answer.answerText || answer.textValue;
                    break;
                case 'im1_a6_1':
                    data.socioeconomicStatus = answer.answerValue || answer.numericValue;
                    break;
            }
        }
        return data;
    }
    async processIM1Antecedents(patientId, answers, tx) {
        this.logger.log('Processing IM1 antecedents for patient');
        const familyAntecedentsAnswer = answers.find((a) => {
            const questionCode = a.questionCode || a.question?.code;
            return questionCode === 'im1_b1_1';
        });
        const personalAntecedentsAnswer = answers.find((a) => {
            const questionCode = a.questionCode || a.question?.code;
            return questionCode === 'im1_b2_1';
        });
        this.logger.log(`Found family antecedents: ${!!familyAntecedentsAnswer}, personal antecedents: ${!!personalAntecedentsAnswer}`);
        if (familyAntecedentsAnswer?.textValue ||
            familyAntecedentsAnswer?.answerText) {
            const antecedentText = familyAntecedentsAnswer.textValue || familyAntecedentsAnswer.answerText;
            this.logger.log(`Processing family antecedents: ${antecedentText}`);
            await this.createAntecedentsFromSelection(patientId, antecedentText, 'familiar', tx);
        }
        if (personalAntecedentsAnswer?.textValue ||
            personalAntecedentsAnswer?.answerText) {
            const antecedentText = personalAntecedentsAnswer.textValue ||
                personalAntecedentsAnswer.answerText;
            this.logger.log(`Processing personal antecedents: ${antecedentText}`);
            await this.createAntecedentsFromSelection(patientId, antecedentText, 'personal', tx);
        }
    }
    async processIM1Symptoms(patientId, answers, tx) {
        this.logger.log('Processing IM1 symptoms for patient');
        const symptomsAnswer = answers.find((a) => {
            const questionCode = a.questionCode || a.question?.code;
            return questionCode === 'im1_b3_1';
        });
        this.logger.log(`Found symptoms answer: ${!!symptomsAnswer}`);
        if (symptomsAnswer?.textValue || symptomsAnswer?.answerText) {
            const symptomsText = symptomsAnswer.textValue || symptomsAnswer.answerText;
            this.logger.log(`Processing symptoms: ${symptomsText}`);
            await this.createSymptomsFromSelection(patientId, symptomsText, tx);
        }
    }
    async createSymptomsFromSelection(patientId, selectedSymptoms, tx) {
        try {
            this.logger.log(`Creating symptoms from selection: ${selectedSymptoms}`);
            const selections = selectedSymptoms.split(',').map((s) => s.trim());
            const prismaClient = tx || this.prisma;
            for (const selection of selections) {
                if (selection && selection !== 'ninguna' && selection.trim() !== '') {
                    this.logger.log(`Processing symptom: "${selection}"`);
                    let symptom = await prismaClient.symptom.findFirst({
                        where: {
                            value: selection,
                        },
                    });
                    if (!symptom) {
                        symptom = await prismaClient.symptom.findFirst({
                            where: {
                                name: {
                                    contains: selection,
                                    mode: 'insensitive',
                                },
                            },
                        });
                        if (symptom) {
                            this.logger.log(`Found symptom by name: ${symptom.name} (${symptom.value})`);
                        }
                    }
                    if (!symptom) {
                        this.logger.error(`Symptom not found for value: "${selection}"`);
                        const similarSymptoms = await prismaClient.symptom.findMany({
                            where: {
                                OR: [
                                    { value: { contains: selection.substring(0, 5) } },
                                    { name: { contains: selection.substring(0, 5) } },
                                ],
                            },
                            take: 5,
                        });
                        this.logger.error(`Similar symptoms found:`, similarSymptoms.map((s) => `${s.name} (${s.value})`));
                        throw new Error(`Symptom with value "${selection}" should exist but was not found. Available similar: ${similarSymptoms.map((s) => s.value).join(', ')}`);
                    }
                    this.logger.log(`Using symptom: ${symptom.name} (${symptom.value})`);
                    const existingPatientSymptom = await prismaClient.patientSymptom.findFirst({
                        where: {
                            patientId,
                            symptomId: symptom.id,
                        },
                    });
                    if (existingPatientSymptom) {
                        this.logger.log(`Patient already has symptom: ${symptom.name}`);
                    }
                    else {
                        await prismaClient.patientSymptom.create({
                            data: {
                                patientId,
                                symptomId: symptom.id,
                                severity: 'mild',
                                reportedAt: new Date(),
                                notes: 'Reported in IM1 questionnaire',
                            },
                        });
                        this.logger.log(`Created patient symptom association: ${symptom.name}`);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error(`Error creating symptoms from selection: ${error.message}`, error.stack);
            throw error;
        }
    }
    async createAntecedentsFromSelection(patientId, selectedAntecedents, type, tx) {
        try {
            this.logger.log(`Creating antecedents from selection: ${selectedAntecedents} for type: ${type}`);
            const selections = selectedAntecedents.split(',').map((s) => s.trim());
            const prismaClient = tx || this.prisma;
            const antecedentType = await prismaClient.antecedentType.upsert({
                where: { name: type },
                update: {},
                create: {
                    name: type,
                    description: `Antecedentes ${type === 'familiar' ? 'familiares' : 'personales'}`,
                    active: true,
                },
            });
            for (const selection of selections) {
                if (selection && selection !== 'ninguna' && selection.trim() !== '') {
                    this.logger.log(`Processing antecedent: "${selection}" for type: ${type}`);
                    this.logger.log(`Searching for antecedent with value: "${selection}" and typeId: ${antecedentType.id}`);
                    let antecedent = await prismaClient.antecedent.findFirst({
                        where: {
                            value: selection,
                            antecedentTypeId: antecedentType.id,
                        },
                    });
                    if (!antecedent) {
                        this.logger.log(`Not found by value+type, searching globally by value: "${selection}"`);
                        antecedent = await prismaClient.antecedent.findFirst({
                            where: {
                                value: selection,
                            },
                        });
                        if (antecedent) {
                            this.logger.log(`Found antecedent globally: ${antecedent.name} (${antecedent.value}) with type: ${antecedent.antecedentTypeId}`);
                        }
                    }
                    if (!antecedent) {
                        const formattedName = this.formatAntecedentName(selection);
                        this.logger.log(`Not found by value, searching by name: "${formattedName}"`);
                        antecedent = await prismaClient.antecedent.findFirst({
                            where: {
                                name: formattedName,
                                antecedentTypeId: antecedentType.id,
                            },
                        });
                        if (antecedent) {
                            this.logger.log(`Found antecedent by name: ${antecedent.name} (${antecedent.value})`);
                        }
                    }
                    if (!antecedent) {
                        this.logger.error(`Antecedent not found for value: "${selection}"`);
                        const similarAntecedents = await prismaClient.antecedent.findMany({
                            where: {
                                OR: [
                                    { value: { contains: selection.substring(0, 5) } },
                                    { name: { contains: selection.substring(0, 5) } },
                                ],
                            },
                            take: 5,
                        });
                        this.logger.error(`Similar antecedents found:`, similarAntecedents.map((a) => `${a.name} (${a.value})`));
                        throw new Error(`Antecedent with value "${selection}" should exist but was not found. Available similar: ${similarAntecedents.map((a) => a.value).join(', ')}`);
                    }
                    this.logger.log(`Using antecedent: ${antecedent.name} (${antecedent.value})`);
                    const existingPatientAntecedent = await prismaClient.patientAntecedent.findFirst({
                        where: {
                            patientId,
                            antecedentId: antecedent.id,
                        },
                    });
                    if (!existingPatientAntecedent) {
                        await prismaClient.patientAntecedent.create({
                            data: {
                                patientId,
                                antecedentId: antecedent.id,
                                hasCondition: true,
                                notes: `Reportado en cuestionario IM1 como: ${selection}`,
                            },
                        });
                        this.logger.log(`Linked antecedent ${antecedent.name} to patient ${patientId}`);
                    }
                    else {
                        this.logger.log(`Patient ${patientId} already has antecedent ${antecedent.name}`);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error('Error processing antecedents:', error);
            throw error;
        }
    }
    async processIM1PhysicalExamination(patientId, answers, tx) {
        this.logger.log('Processing IM1 physical examination for patient');
        const physicalData = {};
        for (const answer of answers) {
            const questionCode = answer.questionCode || answer.question?.code;
            const value = answer.answerValue || answer.numericValue;
            switch (questionCode) {
                case 'im1_c1_2':
                    if (value) {
                        physicalData.weight = Number(value);
                        this.logger.log(`Found weight: ${physicalData.weight} kg`);
                    }
                    break;
                case 'im1_c1_3':
                    if (value) {
                        physicalData.height = Number(value);
                        this.logger.log(`Found height: ${physicalData.height} cm`);
                    }
                    break;
                case 'im1_c1_5':
                    if (value) {
                        physicalData.waistCircumference = Number(value);
                        this.logger.log(`Found waist circumference: ${physicalData.waistCircumference} cm`);
                    }
                    break;
                case 'im1_c1_7':
                    if (value) {
                        physicalData.bodyFatPercentage = Number(value);
                        this.logger.log(`Found body fat percentage: ${physicalData.bodyFatPercentage}%`);
                    }
                    break;
                case 'im1_c1_9':
                    if (value) {
                        physicalData.neckCircumference = Number(value);
                        this.logger.log(`Found neck circumference: ${physicalData.neckCircumference} cm`);
                    }
                    break;
                case 'im1_c2_2':
                    if (value) {
                        physicalData.bloodPressureSystolic = Number(value);
                        this.logger.log(`Found systolic blood pressure: ${physicalData.bloodPressureSystolic} mmHg`);
                    }
                    break;
                case 'im1_c2_3':
                    if (value) {
                        physicalData.bloodPressureDiastolic = Number(value);
                        this.logger.log(`Found diastolic blood pressure: ${physicalData.bloodPressureDiastolic} mmHg`);
                    }
                    break;
            }
        }
        if (physicalData.weight && physicalData.height) {
            const heightInMeters = physicalData.height > 10
                ? physicalData.height / 100
                : physicalData.height;
            physicalData.bmi = Number((physicalData.weight / (heightInMeters * heightInMeters)).toFixed(2));
            this.logger.log(`Calculated BMI: ${physicalData.bmi}`);
        }
        const hasPhysicalData = Object.values(physicalData).some((value) => value !== undefined && value !== null && value !== 0);
        if (hasPhysicalData) {
            try {
                const prismaClient = tx || this.prisma;
                this.logger.log(`Creating physical examination with data:`, physicalData);
                const physicalExamination = await prismaClient.physicalExamination.create({
                    data: {
                        ...physicalData,
                        performedBy: 'IM1 Questionnaire',
                        generalFindings: 'Basic physical measurements from IM1 questionnaire',
                    },
                });
                await prismaClient.patientPhysicalExamination.create({
                    data: {
                        patientId,
                        physicalExaminationId: physicalExamination.id,
                        examinationDate: new Date(),
                        notes: 'Basic physical examination data from IM1 questionnaire',
                    },
                });
                this.logger.log(`Physical examination created and linked to patient ${patientId}`);
            }
            catch (error) {
                this.logger.error('Error creating physical examination:', error);
                throw error;
            }
        }
        else {
            this.logger.log('No physical examination data found in IM1 answers');
        }
    }
    formatAntecedentName(value) {
        const antecedentNames = {
            diabetes: 'Diabetes',
            hipertension: 'Hipertensión',
            sobrepeso: 'Sobrepeso',
            obesidad: 'Obesidad',
            sobrepeso_obesidad: 'Sobrepeso/Obesidad',
            colesterol_alto: 'Colesterol Alto',
            trigliceridos_altos: 'Triglicéridos Altos',
            enfermedad_cardiaca: 'Enfermedad Cardíaca',
            enfermedad_cardiovascular: 'Enfermedad Cardiovascular',
            accidente_cerebrovascular: 'Accidente Cerebrovascular',
            cancer: 'Cáncer',
            asma: 'Asma',
            enfermedad_pulmonar: 'Enfermedad Pulmonar',
            artritis: 'Artritis',
            osteoporosis: 'Osteoporosis',
            depresion: 'Depresión',
            ansiedad: 'Ansiedad',
            enfermedad_mental: 'Enfermedad Mental',
            enfermedad_renal: 'Enfermedad Renal',
            enfermedad_hepatica: 'Enfermedad Hepática',
            enfermedad_tiroidea: 'Enfermedad Tiroidea',
            ninguna: 'Ninguna',
        };
        return (antecedentNames[value] ||
            value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' '));
    }
    async processIM1MedicationsAndLabResults(patientId, answers) {
        this.logger.log(`Processing medications and lab results for patient ${patientId}`);
        try {
            await this.processIM1Medications(patientId, answers);
            await this.processIM1LabResults(patientId, answers);
        }
        catch (error) {
            this.logger.error(`Error processing medications and lab results: ${error.message}`, error.stack);
        }
    }
    async processIM1Medications(patientId, answers) {
        const medicationsAnswer = answers.find((a) => {
            const questionCode = a.questionCode || a.question?.code;
            return questionCode === 'im1_b6_1';
        });
        if (!medicationsAnswer) {
            this.logger.log('No medications question found, skipping...');
            return;
        }
        const medicationsText = medicationsAnswer.textValue || medicationsAnswer.answerText;
        if (!medicationsText) {
            this.logger.log('No medications data found, skipping...');
            return;
        }
        try {
            const medications = JSON.parse(medicationsText);
            if (!Array.isArray(medications)) {
                this.logger.warn('Medications data is not an array, skipping...');
                return;
            }
            let createdCount = 0;
            for (const med of medications) {
                if (!med.medicationName || !med.medicationName.trim()) {
                    continue;
                }
                await this.prisma.treatment.create({
                    data: {
                        patientId,
                        medicationName: med.medicationName.trim(),
                        presentation: med.presentation?.trim() || null,
                        quantity: med.quantity?.trim() || null,
                        dosage: med.dosage?.trim() || null,
                        duration: med.duration?.trim() || null,
                        status: 'actual',
                        notes: 'Registrado desde cuestionario IM1',
                        prescribedAt: new Date(),
                    },
                });
                createdCount++;
            }
            this.logger.log(`✅ Created ${createdCount} medication records for patient ${patientId}`);
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                this.logger.warn(`Medications data is not valid JSON, treating as free text: ${medicationsText}`);
            }
            else {
                this.logger.error(`Error processing medications: ${error.message}`, error.stack);
            }
        }
    }
    async processIM1LabResults(patientId, answers) {
        const labMapping = [
            {
                questionCode: 'im1_c3_2',
                examCategory: 'ENDOCRINO-METABÓLICO',
                examName: 'Glucosa',
            },
            {
                questionCode: 'im1_c3_4',
                examCategory: 'ENDOCRINO-METABÓLICO',
                examName: 'Hemoglobina glicosilada',
            },
            {
                questionCode: 'im1_c4_2',
                examCategory: 'QUÍMICA Y LÍPIDOS',
                examName: 'Colesterol total',
            },
            {
                questionCode: 'im1_c4_3',
                examCategory: 'QUÍMICA Y LÍPIDOS',
                examName: 'Triglicéridos',
            },
            {
                questionCode: 'im1_c4_4',
                examCategory: 'QUÍMICA Y LÍPIDOS',
                examName: 'Colesterol LDL',
            },
            {
                questionCode: 'im1_c4_5',
                examCategory: 'QUÍMICA Y LÍPIDOS',
                examName: 'Colesterol HDL',
            },
        ];
        let createdCount = 0;
        for (const mapping of labMapping) {
            const answer = answers.find((a) => {
                const questionCode = a.questionCode || a.question?.code;
                return questionCode === mapping.questionCode;
            });
            const numericValue = answer?.numericValue || answer?.answerValue;
            if (!numericValue) {
                continue;
            }
            try {
                const exam = await this.prisma.examCatalog.findFirst({
                    where: {
                        category: mapping.examCategory,
                        examName: mapping.examName,
                        active: true,
                    },
                });
                if (!exam) {
                    this.logger.warn(`Exam not found in catalog: ${mapping.examCategory} - ${mapping.examName}`);
                    continue;
                }
                let isAbnormal = false;
                if (exam.dataType === 'numerico' &&
                    exam.referenceMin !== null &&
                    exam.referenceMax !== null) {
                    const value = Number(numericValue);
                    const min = Number(exam.referenceMin);
                    const max = Number(exam.referenceMax);
                    isAbnormal = value < min || value > max;
                }
                await this.prisma.examResult.create({
                    data: {
                        patientId,
                        examId: exam.id,
                        numericValue: new client_1.Prisma.Decimal(numericValue),
                        resultDate: new Date(),
                        observations: 'Resultado ingresado desde cuestionario IM1',
                        isAbnormal,
                    },
                });
                createdCount++;
                this.logger.log(`✅ Created lab result: ${mapping.examName} = ${numericValue} ${exam.measurementUnit || ''} ${isAbnormal ? '(ANORMAL)' : ''}`);
            }
            catch (error) {
                this.logger.error(`Error creating lab result for ${mapping.examName}: ${error.message}`, error.stack);
            }
        }
        this.logger.log(`✅ Created ${createdCount} lab results for patient ${patientId}`);
    }
    determineRiskLevel(score, groupName) {
        switch (groupName) {
            case 'MEDAS':
                return score >= 9 ? 'low' : score >= 7 ? 'medium' : 'high';
            case 'Calidad de Sueño':
                return score >= 7 ? 'low' : score >= 4 ? 'medium' : 'high';
            case 'Ansiedad':
            case 'Depresión':
                return score < 3 ? 'low' : 'high';
            case 'Alcohol':
                return score < 3 ? 'low' : score < 4 ? 'medium' : 'high';
            default:
                return score >= 70 ? 'low' : score >= 40 ? 'medium' : 'high';
        }
    }
};
exports.QuestionnairesService = QuestionnairesService;
exports.QuestionnairesService = QuestionnairesService = QuestionnairesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionnairesService);
//# sourceMappingURL=questionnaires.service.js.map