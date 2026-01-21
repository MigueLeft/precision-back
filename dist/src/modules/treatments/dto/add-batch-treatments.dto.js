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
exports.AddBatchTreatmentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TreatmentItemDto {
    medicationName;
    presentation;
    quantity;
    dosage;
    duration;
    status;
    prescribedBy;
    prescribedAt;
    notes;
    active;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del medicamento',
        example: 'Metformina',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "medicationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Presentación del medicamento',
        example: 'Tabletas 850mg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "presentation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad prescrita',
        example: '30 tabletas',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dosificación',
        example: '1 tableta cada 12 horas',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "dosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duración del tratamiento',
        example: '30 días',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado del tratamiento',
        enum: ['actual', 'previo'],
        example: 'actual',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['actual', 'previo']),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del médico que prescribió',
        example: 'dr-uuid',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "prescribedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de prescripción',
        example: '2024-01-15T10:00:00Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "prescribedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas adicionales',
        example: 'Tomar con alimentos',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TreatmentItemDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si el tratamiento está activo',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TreatmentItemDto.prototype, "active", void 0);
class AddBatchTreatmentsDto {
    patientId;
    medications;
}
exports.AddBatchTreatmentsDto = AddBatchTreatmentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'clxxx123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchTreatmentsDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de medicamentos/tratamientos a agregar',
        type: [TreatmentItemDto],
        minItems: 1,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TreatmentItemDto),
    __metadata("design:type", Array)
], AddBatchTreatmentsDto.prototype, "medications", void 0);
//# sourceMappingURL=add-batch-treatments.dto.js.map