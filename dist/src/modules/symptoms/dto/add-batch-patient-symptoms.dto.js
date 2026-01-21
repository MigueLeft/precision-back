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
exports.AddBatchPatientSymptomsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class SymptomItemDto {
    symptomId;
    severity;
    frequency;
    duration;
    reportedAt;
    notes;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del síntoma',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], SymptomItemDto.prototype, "symptomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Severidad del síntoma',
        enum: ['mild', 'moderate', 'severe', 'critical'],
        example: 'moderate',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['mild', 'moderate', 'severe', 'critical']),
    __metadata("design:type", String)
], SymptomItemDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frecuencia del síntoma',
        example: 'Daily',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SymptomItemDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duración del síntoma',
        example: '2 weeks',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SymptomItemDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha en que se reportó el síntoma',
        example: '2024-01-15T10:30:00Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SymptomItemDto.prototype, "reportedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas adicionales sobre el síntoma',
        example: 'El paciente reporta que empeora por las noches',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SymptomItemDto.prototype, "notes", void 0);
class AddBatchPatientSymptomsDto {
    patientId;
    symptoms;
}
exports.AddBatchPatientSymptomsDto = AddBatchPatientSymptomsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'clxxx123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchPatientSymptomsDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de síntomas a agregar al paciente',
        type: [SymptomItemDto],
        minItems: 1,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SymptomItemDto),
    __metadata("design:type", Array)
], AddBatchPatientSymptomsDto.prototype, "symptoms", void 0);
//# sourceMappingURL=add-batch-patient-symptoms.dto.js.map