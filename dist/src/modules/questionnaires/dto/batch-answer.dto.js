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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessedQuestionnaireResultDto = exports.BatchAnswerDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class AnswerItemDto {
    questionId;
    answerText;
    answerValue;
    answerBoolean;
    score;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Question ID (UUID)' }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], AnswerItemDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answer text', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnswerItemDto.prototype, "answerText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Answer value', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AnswerItemDto.prototype, "answerValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Boolean answer', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AnswerItemDto.prototype, "answerBoolean", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score for this answer', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AnswerItemDto.prototype, "score", void 0);
class BatchAnswerDto {
    patientId;
    questionnaireId;
    answers;
}
exports.BatchAnswerDto = BatchAnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Patient ID (CUID) - Required. Patient must be created before filling the questionnaire.',
        required: false,
        example: 'clxxx123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, id_validation_decorator_1.IsCuidId)(),
    __metadata("design:type", String)
], BatchAnswerDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Questionnaire ID (UUID)' }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], BatchAnswerDto.prototype, "questionnaireId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of answers', type: [AnswerItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AnswerItemDto),
    __metadata("design:type", Array)
], BatchAnswerDto.prototype, "answers", void 0);
class ProcessedQuestionnaireResultDto {
    patientQuestionnaireId;
    patient;
    questionnaire;
    answers;
    diagnostics;
    summary;
    answersBySection;
}
exports.ProcessedQuestionnaireResultDto = ProcessedQuestionnaireResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient questionnaire session ID' }),
    __metadata("design:type", String)
], ProcessedQuestionnaireResultDto.prototype, "patientQuestionnaireId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient information' }),
    __metadata("design:type", Object)
], ProcessedQuestionnaireResultDto.prototype, "patient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Questionnaire information' }),
    __metadata("design:type", Object)
], ProcessedQuestionnaireResultDto.prototype, "questionnaire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'All answers submitted with question details' }),
    __metadata("design:type", Array)
], ProcessedQuestionnaireResultDto.prototype, "answers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Calculated diagnostics based on scoring' }),
    __metadata("design:type", Array)
], ProcessedQuestionnaireResultDto.prototype, "diagnostics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Summary of the assessment' }),
    __metadata("design:type", Object)
], ProcessedQuestionnaireResultDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detailed breakdown by section' }),
    __metadata("design:type", Array)
], ProcessedQuestionnaireResultDto.prototype, "answersBySection", void 0);
//# sourceMappingURL=batch-answer.dto.js.map