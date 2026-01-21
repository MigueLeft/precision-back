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
exports.UpsertPatientPhysicalExamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpsertPatientPhysicalExamDto {
    weight;
    height;
    bmi;
    bloodPressureSystolic;
    bloodPressureDiastolic;
    heartRate;
    respiratoryRate;
    temperature;
    oxygenSaturation;
    waistCircumference;
    hipCircumference;
    neckCircumference;
    bodyFatPercentage;
    muscleMassPercentage;
    generalFindings;
    performedBy;
    notes;
    examinationDate;
}
exports.UpsertPatientPhysicalExamDto = UpsertPatientPhysicalExamDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Peso en kg',
        example: 75.5,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Altura en cm',
        example: 175,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Índice de masa corporal',
        example: 24.6,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "bmi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Presión arterial sistólica (mmHg)',
        example: 120,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "bloodPressureSystolic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Presión arterial diastólica (mmHg)',
        example: 80,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "bloodPressureDiastolic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frecuencia cardíaca (latidos por minuto)',
        example: 72,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "heartRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frecuencia respiratoria (respiraciones por minuto)',
        example: 16,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "respiratoryRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Temperatura corporal (°C)',
        example: 36.5,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Saturación de oxígeno (%)',
        example: 98,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "oxygenSaturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Circunferencia de cintura (cm)',
        example: 85,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "waistCircumference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Circunferencia de cadera (cm)',
        example: 100,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "hipCircumference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Circunferencia de cuello (cm)',
        example: 38,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "neckCircumference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Porcentaje de grasa corporal',
        example: 20.5,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "bodyFatPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Porcentaje de masa muscular',
        example: 35.2,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpsertPatientPhysicalExamDto.prototype, "muscleMassPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hallazgos generales',
        example: 'Paciente en buen estado general',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertPatientPhysicalExamDto.prototype, "generalFindings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quién realizó el examen',
        example: 'Dr. Juan Pérez',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertPatientPhysicalExamDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas adicionales',
        example: 'Control rutinario',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertPatientPhysicalExamDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha del examen',
        example: '2024-01-15T10:30:00Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpsertPatientPhysicalExamDto.prototype, "examinationDate", void 0);
//# sourceMappingURL=upsert-patient-physical-exam.dto.js.map