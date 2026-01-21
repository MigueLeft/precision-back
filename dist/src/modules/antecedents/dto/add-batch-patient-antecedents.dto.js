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
exports.AddBatchPatientAntecedentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class AntecedentItemDto {
    antecedentId;
    hasCondition;
    diagnosedAt;
    notes;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del antecedente',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], AntecedentItemDto.prototype, "antecedentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si el paciente tiene esta condición',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AntecedentItemDto.prototype, "hasCondition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de diagnóstico (si aplica)',
        example: '2020-01-15T00:00:00Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AntecedentItemDto.prototype, "diagnosedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas adicionales (puede incluir relación familiar si aplica)',
        example: 'Diagnosticado hace 5 años. Padre con hipertensión',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AntecedentItemDto.prototype, "notes", void 0);
class AddBatchPatientAntecedentsDto {
    patientId;
    antecedents;
}
exports.AddBatchPatientAntecedentsDto = AddBatchPatientAntecedentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente',
        example: 'clxxx123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddBatchPatientAntecedentsDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de antecedentes a agregar al paciente',
        type: [AntecedentItemDto],
        minItems: 1,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AntecedentItemDto),
    __metadata("design:type", Array)
], AddBatchPatientAntecedentsDto.prototype, "antecedents", void 0);
//# sourceMappingURL=add-batch-patient-antecedents.dto.js.map