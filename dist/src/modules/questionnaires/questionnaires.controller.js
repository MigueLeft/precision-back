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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnairesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const questionnaires_service_1 = require("./questionnaires.service");
const create_questionnaire_dto_1 = require("./dto/create-questionnaire.dto");
const update_questionnaire_dto_1 = require("./dto/update-questionnaire.dto");
const query_questionnaire_dto_1 = require("./dto/query-questionnaire.dto");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const create_questionnaire_question_dto_1 = require("./dto/create-questionnaire-question.dto");
const create_diagnostic_group_dto_1 = require("./dto/create-diagnostic-group.dto");
const update_diagnostic_group_dto_1 = require("./dto/update-diagnostic-group.dto");
const create_diagnostic_dto_1 = require("./dto/create-diagnostic.dto");
const update_diagnostic_dto_1 = require("./dto/update-diagnostic.dto");
const create_patient_questionnaire_dto_1 = require("./dto/create-patient-questionnaire.dto");
const create_answer_dto_1 = require("./dto/create-answer.dto");
const batch_answer_dto_1 = require("./dto/batch-answer.dto");
let QuestionnairesController = class QuestionnairesController {
    questionnairesService;
    constructor(questionnairesService) {
        this.questionnairesService = questionnairesService;
    }
    createQuestionnaire(createQuestionnaireDto) {
        return this.questionnairesService.createQuestionnaire(createQuestionnaireDto);
    }
    findAllQuestionnaires(queryDto) {
        return this.questionnairesService.findAllQuestionnaires(queryDto);
    }
    findQuestionnaireById(id) {
        return this.questionnairesService.findQuestionnaireById(id);
    }
    updateQuestionnaire(id, updateQuestionnaireDto) {
        return this.questionnairesService.updateQuestionnaire(id, updateQuestionnaireDto);
    }
    removeQuestionnaire(id) {
        return this.questionnairesService.removeQuestionnaire(id);
    }
    createQuestion(createQuestionDto) {
        return this.questionnairesService.createQuestion(createQuestionDto);
    }
    findAllQuestions(page, limit, search) {
        return this.questionnairesService.findAllQuestions(page, limit, search);
    }
    findQuestionById(id) {
        return this.questionnairesService.findQuestionById(id);
    }
    updateQuestion(id, updateQuestionDto) {
        return this.questionnairesService.updateQuestion(id, updateQuestionDto);
    }
    removeQuestion(id) {
        return this.questionnairesService.removeQuestion(id);
    }
    addQuestionToQuestionnaire(createQuestionnaireQuestionDto) {
        return this.questionnairesService.addQuestionToQuestionnaire(createQuestionnaireQuestionDto);
    }
    removeQuestionFromQuestionnaire(id) {
        return this.questionnairesService.removeQuestionFromQuestionnaire(id);
    }
    createDiagnosticGroup(createDiagnosticGroupDto) {
        return this.questionnairesService.createDiagnosticGroup(createDiagnosticGroupDto);
    }
    updateDiagnosticGroup(id, updateDiagnosticGroupDto) {
        return this.questionnairesService.updateDiagnosticGroup(id, updateDiagnosticGroupDto);
    }
    createDiagnostic(createDiagnosticDto) {
        return this.questionnairesService.createDiagnostic(createDiagnosticDto);
    }
    updateDiagnostic(id, updateDiagnosticDto) {
        return this.questionnairesService.updateDiagnostic(id, updateDiagnosticDto);
    }
    createPatientQuestionnaire(createPatientQuestionnaireDto) {
        return this.questionnairesService.createPatientQuestionnaire(createPatientQuestionnaireDto);
    }
    findPatientQuestionnaires(patientId) {
        return this.questionnairesService.findPatientQuestionnaires(patientId);
    }
    createAnswer(createAnswerDto) {
        return this.questionnairesService.createAnswer(createAnswerDto);
    }
    findAnswersByPatientQuestionnaire(id) {
        return this.questionnairesService.findAnswersByPatientQuestionnaire(id);
    }
    processBatchAnswers(batchAnswerDto) {
        return this.questionnairesService.processBatchAnswers(batchAnswerDto);
    }
    getRelationsProcessingStatus(id) {
        return this.questionnairesService.getRelationsProcessingStatus(id);
    }
    getPatientQuestionnaireDetails(id) {
        return this.questionnairesService.getPatientQuestionnaireDetails(id);
    }
    reprocessQuestionnaireRelations(id) {
        return this.questionnairesService.reprocessQuestionnaireRelations(id);
    }
};
exports.QuestionnairesController = QuestionnairesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new questionnaire' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Questionnaire created successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_questionnaire_dto_1.CreateQuestionnaireDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "createQuestionnaire", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all questionnaires with pagination and filtering',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Questionnaires retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_questionnaire_dto_1.QueryQuestionnaireDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "findAllQuestionnaires", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a questionnaire by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Questionnaire ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Questionnaire found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Questionnaire not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "findQuestionnaireById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a questionnaire' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Questionnaire ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Questionnaire updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Questionnaire not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_questionnaire_dto_1.UpdateQuestionnaireDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "updateQuestionnaire", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a questionnaire' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Questionnaire ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Questionnaire deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Questionnaire not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "removeQuestionnaire", null);
__decorate([
    (0, common_1.Post)('questions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Question created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)('questions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Questions retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "findAllQuestions", null);
__decorate([
    (0, common_1.Get)('questions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a question by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "findQuestionById", null);
__decorate([
    (0, common_1.Patch)('questions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)('questions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "removeQuestion", null);
__decorate([
    (0, common_1.Post)(':id/questions'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a question to a questionnaire' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Questionnaire ID' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Question added to questionnaire successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_questionnaire_question_dto_1.CreateQuestionnaireQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "addQuestionToQuestionnaire", null);
__decorate([
    (0, common_1.Delete)('questionnaire-questions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a question from a questionnaire' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'QuestionnaireQuestion relation ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Question removed from questionnaire successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "removeQuestionFromQuestionnaire", null);
__decorate([
    (0, common_1.Post)('diagnostic-groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a diagnostic group' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Diagnostic group created successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_diagnostic_group_dto_1.CreateDiagnosticGroupDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "createDiagnosticGroup", null);
__decorate([
    (0, common_1.Patch)('diagnostic-groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a diagnostic group' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Diagnostic group ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Diagnostic group updated successfully',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_diagnostic_group_dto_1.UpdateDiagnosticGroupDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "updateDiagnosticGroup", null);
__decorate([
    (0, common_1.Post)('diagnostics'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a diagnostic' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Diagnostic created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_diagnostic_dto_1.CreateDiagnosticDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "createDiagnostic", null);
__decorate([
    (0, common_1.Patch)('diagnostics/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a diagnostic' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Diagnostic ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Diagnostic updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_diagnostic_dto_1.UpdateDiagnosticDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "updateDiagnostic", null);
__decorate([
    (0, common_1.Post)('patient-questionnaires'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a new patient questionnaire session' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Patient questionnaire session created successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_questionnaire_dto_1.CreatePatientQuestionnaireDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "createPatientQuestionnaire", null);
__decorate([
    (0, common_1.Get)('patients/:patientId/questionnaires'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all questionnaires completed by a patient' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'Patient ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Patient questionnaires retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "findPatientQuestionnaires", null);
__decorate([
    (0, common_1.Post)('answers'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit an answer to a question' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Answer submitted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_answer_dto_1.CreateAnswerDto]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "createAnswer", null);
__decorate([
    (0, common_1.Get)('patient-questionnaires/:id/answers'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all answers for a patient questionnaire session',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Patient questionnaire ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Answers retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "findAnswersByPatientQuestionnaire", null);
__decorate([
    (0, common_1.Post)('batch-answers'),
    (0, swagger_1.ApiOperation)({
        summary: 'Process multiple answers at once for a questionnaire',
        description: 'Saves answers quickly and returns response. Relations (antecedents, symptoms, diagnostics) are processed in background.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Answers processed successfully. Relations will be processed in background.',
        type: batch_answer_dto_1.ProcessedQuestionnaireResultDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [batch_answer_dto_1.BatchAnswerDto]),
    __metadata("design:returntype", Promise)
], QuestionnairesController.prototype, "processBatchAnswers", null);
__decorate([
    (0, common_1.Get)('patient-questionnaires/:id/relations-status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Check the status of relations processing',
        description: 'Returns the current status of background relations processing (pending, processing, completed, failed)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Patient Questionnaire ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Status retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                relationsProcessed: { type: 'boolean', example: true },
                relationsProcessingStatus: {
                    type: 'string',
                    enum: ['pending', 'processing', 'completed', 'failed'],
                    example: 'completed',
                },
                relationsProcessingError: {
                    type: 'string',
                    nullable: true,
                    example: null,
                },
                relationsProcessedAt: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Patient questionnaire not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "getRelationsProcessingStatus", null);
__decorate([
    (0, common_1.Get)('patient-questionnaires/:id/details'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get complete details of a patient questionnaire',
        description: 'Returns all details including answers, diagnostics, and processing status. Call this after background processing is completed.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Patient Questionnaire ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Details retrieved successfully',
        type: batch_answer_dto_1.ProcessedQuestionnaireResultDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Patient questionnaire not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionnairesController.prototype, "getPatientQuestionnaireDetails", null);
__decorate([
    (0, common_1.Post)('patient-questionnaires/:id/reprocess-relations'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reprocess relations for a patient questionnaire',
        description: 'Reprocesses antecedents, symptoms, physical examination, and diagnostics for a questionnaire that failed or needs to be updated. Useful when background processing fails.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Patient Questionnaire ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reprocessing started successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                message: {
                    type: 'string',
                    example: 'Reprocessing started successfully. Relations will be recreated in background.',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Patient questionnaire not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionnairesController.prototype, "reprocessQuestionnaireRelations", null);
exports.QuestionnairesController = QuestionnairesController = __decorate([
    (0, swagger_1.ApiTags)('Questionnaires'),
    (0, common_1.Controller)('questionnaires'),
    __metadata("design:paramtypes", [questionnaires_service_1.QuestionnairesService])
], QuestionnairesController);
//# sourceMappingURL=questionnaires.controller.js.map