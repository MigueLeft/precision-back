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
exports.CreatePatientSymptomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class CreatePatientSymptomDto {
    patientId;
    symptomId;
    hasSymptom = true;
    severity;
    frequency;
    duration;
    notes;
    reportedAt;
}
exports.CreatePatientSymptomDto = CreatePatientSymptomDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'cmg4iykys0000u8wkx0o1qepf',
    }),
    (0, id_validation_decorator_1.IsCuidId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientSymptomDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del síntoma',
        example: 'uuid-del-sintoma',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientSymptomDto.prototype, "symptomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si el paciente tiene el síntoma',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePatientSymptomDto.prototype, "hasSymptom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Severidad del síntoma para este paciente',
        example: 'moderate',
        enum: ['mild', 'moderate', 'severe'],
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['mild', 'moderate', 'severe']),
    __metadata("design:type", String)
], CreatePatientSymptomDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frecuencia del síntoma',
        example: 'daily',
        enum: ['daily', 'weekly', 'monthly', 'occasionally'],
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['daily', 'weekly', 'monthly', 'occasionally']),
    __metadata("design:type", String)
], CreatePatientSymptomDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duración que ha tenido el síntoma',
        example: '2 semanas',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePatientSymptomDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas adicionales sobre el síntoma',
        example: 'Dolor intenso por las mañanas',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePatientSymptomDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha cuando se reportó el síntoma',
        example: '2024-01-15T10:30:00Z',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePatientSymptomDto.prototype, "reportedAt", void 0);
//# sourceMappingURL=create-patient-symptom.dto.js.map