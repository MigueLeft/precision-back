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
exports.CreateRescheduleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const not_past_date_validator_1 = require("../../../common/dtos/validators/not-past-date.validator");
class CreateRescheduleDto {
    appointmentId;
    previousDateTime;
    newDateTime;
    rescheduleReason;
    requestedBy;
    rescheduleStatus;
    notes;
}
exports.CreateRescheduleDto = CreateRescheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la cita a reprogramar',
        example: 'appointmentId123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRescheduleDto.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha y hora original de la cita',
        example: '2023-10-01T10:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRescheduleDto.prototype, "previousDateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nueva fecha y hora programada - No puede ser anterior al día actual',
        example: '2023-10-02T14:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, not_past_date_validator_1.IsNotPastDate)({
        message: 'La nueva fecha de reprogramación no puede ser anterior al día actual',
    }),
    __metadata("design:type", String)
], CreateRescheduleDto.prototype, "newDateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Razón de la reprogramación',
        enum: ['patient_request', 'medic_unavailable', 'emergency', 'system_error', 'other'],
        example: 'patient_request',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['patient_request', 'medic_unavailable', 'emergency', 'system_error', 'other']),
    __metadata("design:type", String)
], CreateRescheduleDto.prototype, "rescheduleReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quién solicitó la reprogramación',
        enum: ['PATIENT', 'MEDIC', 'SYSTEM'],
        example: 'PATIENT',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['PATIENT', 'MEDIC', 'SYSTEM']),
    __metadata("design:type", String)
], CreateRescheduleDto.prototype, "requestedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Estado de la reprogramación. Por defecto es "pending"',
        enum: ['pending', 'completed'],
        example: 'pending',
        default: 'pending',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['pending', 'completed']),
    __metadata("design:type", String)
], CreateRescheduleDto.prototype, "rescheduleStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas adicionales sobre la reprogramación',
        example: 'El paciente tuvo una emergencia familiar',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRescheduleDto.prototype, "notes", void 0);
//# sourceMappingURL=create-reschedule.dto.js.map