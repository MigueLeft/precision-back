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
    waistCircumference;
    hipCircumference;
    neckCircumference;
    bodyFatPercentage;
    bodyFatKg;
    muscleMassPercentage;
    muscleMassKg;
    waistHipRatio;
    gripStrengthRight;
    gripStrengthLeft;
    generalFindings;
    additionalObservations;
    performedBy;
}
exports.CreatePhysicalExaminationDto = CreatePhysicalExaminationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso en kilogramos', example: 75.5, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Talla en metros', example: 1.75, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMC calculado automáticamente', example: 24.6, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bmi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Presión arterial sistólica en mmHg', example: 120, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bloodPressureSystolic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Presión arterial diastólica en mmHg', example: 80, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bloodPressureDiastolic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frecuencia cardíaca en lpm', example: 72, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(250),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "heartRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frecuencia respiratoria en rpm', example: 16, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.Max)(60),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "respiratoryRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Temperatura corporal en °C', example: 36.5, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(45),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Saturación de oxígeno en %', example: 98, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "oxygenSaturation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Circunferencia abdominal en cm', example: 85, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "waistCircumference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Circunferencia de cadera en cm', example: 95, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "hipCircumference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Circunferencia del cuello en cm', example: 38, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "neckCircumference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Porcentaje de grasa corporal', example: 20.5, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bodyFatPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Grasa corporal en kg', example: 15.4, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "bodyFatKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Porcentaje de masa muscular', example: 40.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "muscleMassPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Masa muscular en kg', example: 30.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "muscleMassKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Índice cintura-cadera', example: 0.85, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 3 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "waistHipRatio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fuerza de mano derecha en kg', example: 35.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "gripStrengthRight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fuerza de mano izquierda en kg', example: 32.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], CreatePhysicalExaminationDto.prototype, "gripStrengthLeft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hallazgos generales', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicalExaminationDto.prototype, "generalFindings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observaciones adicionales', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicalExaminationDto.prototype, "additionalObservations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Profesional que realizó el examen', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhysicalExaminationDto.prototype, "performedBy", void 0);
//# sourceMappingURL=create-physical-examination.dto.js.map