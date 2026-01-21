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
exports.CreateTreatmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class CreateTreatmentDto {
    patientId;
    medicationName;
    presentation;
    quantity;
    dosage;
    duration;
    status;
    prescribedBy;
    notes;
    active;
}
exports.CreateTreatmentDto = CreateTreatmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Patient ID (CUID)',
        example: 'clxxx123456789',
    }),
    (0, id_validation_decorator_1.IsCuidId)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Medication name',
        example: 'Metformina',
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "medicationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Presentation of the medication',
        example: 'Tabletas 850mg',
        required: false,
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "presentation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity prescribed',
        example: '30 tabletas',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dosage instructions',
        example: '1 tableta cada 12 horas con alimentos',
        required: false,
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "dosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duration of treatment',
        example: '30 días',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the treatment',
        example: 'actual',
        enum: ['actual', 'previo'],
        default: 'actual',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the prescribing physician',
        example: 'clxxx987654321',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "prescribedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes about the treatment',
        example: 'Tomar con abundante agua. Evitar alcohol.',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the treatment is active',
        default: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTreatmentDto.prototype, "active", void 0);
//# sourceMappingURL=create-treatment.dto.js.map