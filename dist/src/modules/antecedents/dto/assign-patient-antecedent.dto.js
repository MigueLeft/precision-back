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
exports.AssignPatientAntecedentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AssignPatientAntecedentDto {
    patientId;
    antecedentId;
    hasCondition;
    notes;
    diagnosedAt;
}
exports.AssignPatientAntecedentDto = AssignPatientAntecedentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'uuid-del-paciente',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignPatientAntecedentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del antecedente',
        example: 'uuid-del-antecedente',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignPatientAntecedentDto.prototype, "antecedentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si el paciente tiene esta condición',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignPatientAntecedentDto.prototype, "hasCondition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas adicionales sobre el antecedente del paciente',
        example: 'Diagnosticado en 2020, controlado con medicación',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignPatientAntecedentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de diagnóstico',
        example: '2020-01-15T00:00:00.000Z',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignPatientAntecedentDto.prototype, "diagnosedAt", void 0);
//# sourceMappingURL=assign-patient-antecedent.dto.js.map