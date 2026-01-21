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
exports.CreateAnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class CreateAnswerDto {
    patientQuestionnaireId;
    questionId;
    textValue;
    numericValue;
    booleanValue;
    dateValue;
    jsonValue;
    score;
}
exports.CreateAnswerDto = CreateAnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the patient questionnaire session (UUID)',
    }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "patientQuestionnaireId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the question being answered (UUID)',
    }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Text value for text-based answers' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "textValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Numeric value for numeric answers',
        type: 'number',
        example: 2.5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreateAnswerDto.prototype, "numericValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Boolean value for yes/no questions' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAnswerDto.prototype, "booleanValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date value for date questions' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "dateValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'JSON value for multiple choice selections',
        example: ['option1', 'option2'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAnswerDto.prototype, "jsonValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Calculated score for this answer',
        type: 'number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreateAnswerDto.prototype, "score", void 0);
//# sourceMappingURL=create-answer.dto.js.map