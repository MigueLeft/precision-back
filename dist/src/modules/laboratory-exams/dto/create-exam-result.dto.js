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
exports.CreateExamResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExamResultDto {
    patientId;
    examId;
    medicalStudyId;
    numericValue;
    textValue;
    booleanValue;
    resultDate;
    observations;
    orderedBy;
    interpretedBy;
}
exports.CreateExamResultDto = CreateExamResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del paciente' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del examen del catálogo' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID del estudio médico asociado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "medicalStudyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Valor numérico (para exámenes numéricos)',
        example: 14.5,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.numericValue !== undefined),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExamResultDto.prototype, "numericValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Valor de texto (para exámenes de texto)',
        example: 'Normales',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.textValue !== undefined),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "textValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Valor booleano (para exámenes booleanos)',
        example: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.booleanValue !== undefined),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateExamResultDto.prototype, "booleanValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha del resultado' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "resultDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observaciones sobre el resultado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "observations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID del médico que ordenó el examen' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "orderedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID del médico que interpretó' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "interpretedBy", void 0);
//# sourceMappingURL=create-exam-result.dto.js.map