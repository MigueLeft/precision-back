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
exports.CreatePhysicalExaminationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreatePhysicalExaminationDto {
    weight;
    height;
    bmi;
    bloodPressureSystolic;
    bloodPressureDiastolic;
    heartRate;
    respiratoryRate;
    temperature;
    oxygenSaturation;
    generalFindings;
    additionalObservations;
    performedBy;
}
exports.CreatePhysicalExaminationDto = CreatePhysicalExaminationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Peso en kilogramos',
        example: 75.5,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Talla en metros',
        example: 1.75,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IMC (Índice de Masa Corporal) - calculado automáticamente',
        example: 24.6,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bmi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Presión arterial sistólica en mmHg',
        example: 120,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bloodPressureSystolic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Presión arterial diastólica en mmHg',
        example: 80,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bloodPressureDiastolic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frecuencia cardíaca en latidos por minuto',
        example: 72,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(250),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "heartRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frecuencia respiratoria en respiraciones por minuto',
        example: 16,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.Max)(60),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "respiratoryRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Temperatura corporal en grados Celsius',
        example: 36.5,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(45),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Saturación de oxígeno en porcentaje',
        example: 98,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "oxygenSaturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hallazgos generales del examen físico',
        example: 'Paciente consciente, orientado, colaborador. Buen estado general',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicalExaminationDto.prototype, "generalFindings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observaciones adicionales',
        example: 'Paciente refiere cefalea ocasional',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicalExaminationDto.prototype, "additionalObservations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Profesional que realizó el examen',
        example: 'Dr. Juan Pérez',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicalExaminationDto.prototype, "performedBy", void 0);
//# sourceMappingURL=create-physical-examination.dto.js.map