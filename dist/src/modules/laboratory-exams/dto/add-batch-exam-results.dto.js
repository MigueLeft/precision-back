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
exports.AddBatchExamResultsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class ExamResultItemDto {
    examId;
    numericValue;
    textValue;
    resultDate;
    isAbnormal;
    observations;
    orderedBy;
    medicalStudyId;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del examen del catálogo',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], ExamResultItemDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor numérico del resultado',
        example: 14.5,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExamResultItemDto.prototype, "numericValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor de texto del resultado',
        example: 'Negativo',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExamResultItemDto.prototype, "textValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha del resultado',
        example: '2024-01-15T10:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ExamResultItemDto.prototype, "resultDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si el resultado es anormal',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ExamResultItemDto.prototype, "isAbnormal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observaciones sobre el resultado',
        example: 'Valores normales',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExamResultItemDto.prototype, "observations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del médico que ordenó el examen',
        example: 'dr-uuid',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExamResultItemDto.prototype, "orderedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del estudio médico al que pertenece',
        example: 'study-uuid',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], ExamResultItemDto.prototype, "medicalStudyId", void 0);
class AddBatchExamResultsDto {
    patientId;
    results;
}
exports.AddBatchExamResultsDto = AddBatchExamResultsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'clxxx123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchExamResultsDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de resultados de exámenes a agregar',
        type: [ExamResultItemDto],
        minItems: 1,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ExamResultItemDto),
    __metadata("design:type", Array)
], AddBatchExamResultsDto.prototype, "results", void 0);
//# sourceMappingURL=add-batch-exam-results.dto.js.map