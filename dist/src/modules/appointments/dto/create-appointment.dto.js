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
exports.CreateAppointmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const not_past_date_validator_1 = require("../../../common/dtos/validators/not-past-date.validator");
class CreateAppointmentDto {
    patientId;
    medicId;
    dateTime;
    appointmentType;
    appointmentStatus;
    modality = 'presencial';
    reason;
    notes;
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'patientId123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del médico',
        example: 'medicId123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "medicId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha y hora de la cita - No puede ser anterior al día actual',
        example: '2024-12-01T10:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, not_past_date_validator_1.IsNotPastDate)({
        message: 'La fecha de la cita no puede ser anterior al día actual'
    }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "dateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de cita',
        example: 'first_time',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "appointmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado de la cita',
        example: 'pending',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "appointmentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Modalidad de la cita',
        example: 'presencial',
        enum: ['presencial', 'online'],
        default: 'presencial',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['presencial', 'online'], {
        message: 'La modalidad debe ser presencial u online'
    }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Razón de la cita',
        example: 'Consulta general',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas adicionales',
        example: 'El paciente tiene antecedentes de alergias.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "notes", void 0);
//# sourceMappingURL=create-appointment.dto.js.map