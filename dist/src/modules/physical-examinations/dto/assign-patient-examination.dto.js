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
exports.AssignPatientExaminationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AssignPatientExaminationDto {
    patientId;
    physicalExaminationId;
    examinationDate;
    notes;
}
exports.AssignPatientExaminationDto = AssignPatientExaminationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'uuid-del-paciente',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignPatientExaminationDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del examen físico',
        example: 'uuid-del-examen-fisico',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignPatientExaminationDto.prototype, "physicalExaminationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha cuando se realizó el examen',
        example: '2024-09-26T10:30:00.000Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignPatientExaminationDto.prototype, "examinationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas específicas para este examen del paciente',
        example: 'Examen de rutina, paciente en buen estado general',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignPatientExaminationDto.prototype, "notes", void 0);
//# sourceMappingURL=assign-patient-examination.dto.js.map