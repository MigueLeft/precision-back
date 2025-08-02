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
exports.CreateConsultationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateConsultationDto {
    appointmentId;
    realizationDateTime;
    anamnesis;
    indicatedTreatment;
    performedProcedures;
    issuedPrescriptions;
    patientInstructions;
    suggestedNextControl;
    additionalMedicalNotes;
    registeredByUserId;
}
exports.CreateConsultationDto = CreateConsultationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la cita asociada a la consulta',
        example: 'clm123abc456def'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha y hora de realización de la consulta',
        example: '2024-01-15T10:30:00Z'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "realizationDateTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Anamnesis o motivo de consulta clínico',
        example: 'Dolor abdominal agudo en epigastrio desde hace 3 días'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "anamnesis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tratamiento indicado al paciente',
        example: 'Omeprazol 20mg cada 12 horas por 7 días'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "indicatedTreatment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Procedimientos realizados durante la consulta',
        example: 'Examen físico completo, palpación abdominal'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "performedProcedures", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Recetas emitidas durante la consulta',
        example: 'Receta N° 001234 - Omeprazol 20mg'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "issuedPrescriptions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Indicaciones específicas para el paciente',
        example: 'Dieta blanda, evitar alimentos irritantes'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "patientInstructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha sugerida para el próximo control',
        example: '2024-01-30T10:00:00Z'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "suggestedNextControl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas médicas adicionales',
        example: 'Paciente presenta mejoría respecto a consulta anterior'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "additionalMedicalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del usuario que registra la consulta',
        example: 'clm789xyz123abc'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "registeredByUserId", void 0);
//# sourceMappingURL=create-consultation.dto.js.map