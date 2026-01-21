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
exports.CreateMedicalStudyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class CreateMedicalStudyDto {
    patientId;
    studyDate;
    studyType;
    studyLocation;
    resultFilePath;
    resultFileUrl;
    imageFilePath;
    imageFileUrl;
    studyName;
    description;
    findings;
    orderedBy;
    interpretedBy;
    status;
    active;
}
exports.CreateMedicalStudyDto = CreateMedicalStudyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Patient ID (CUID)',
        example: 'clxxx123456789',
    }),
    (0, id_validation_decorator_1.IsCuidId)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the study was performed',
        example: '2025-11-07T10:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "studyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of study',
        example: 'Hematología',
        enum: [
            'Hematología',
            'Radiografía',
            'Tomografía',
            'Resonancia Magnética',
            'Ultrasonido',
            'Electrocardiograma',
            'Laboratorio Clínico',
            'Bioquímica',
            'Microbiología',
            'Patología',
            'Endoscopía',
            'Otro',
        ],
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "studyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location where the study was performed',
        example: 'Hospital Central - Laboratorio Clínico',
        required: false,
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "studyLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'File path of the result PDF in storage (S3, etc.)',
        example: 'medical-studies/patient-xxx/hematology-2025-11-07.pdf',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "resultFilePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Public or signed URL of the result file',
        example: 'https://s3.amazonaws.com/bucket/medical-studies/...',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "resultFileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'File path of the image in storage (if applicable)',
        example: 'medical-studies/patient-xxx/rx-torax-2025-11-07.jpg',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "imageFilePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Public or signed URL of the image',
        example: 'https://s3.amazonaws.com/bucket/medical-studies/...',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "imageFileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Specific name of the study',
        example: 'Biometría Hemática Completa',
        required: false,
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "studyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description or notes about the study',
        example: 'Estudio solicitado para evaluar anemia',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Main findings of the study',
        example: 'Hemoglobina: 12.5 g/dL (normal)\nHematocrito: 38% (normal)\nLeucocitos: 7,500/μL (normal)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "findings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the physician who ordered the study',
        example: 'clxxx987654321',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "orderedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the physician who interpreted the study',
        example: 'clxxx987654321',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "interpretedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the study',
        example: 'completed',
        enum: ['pending', 'completed', 'reviewed'],
        default: 'pending',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMedicalStudyDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the study is active',
        default: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateMedicalStudyDto.prototype, "active", void 0);
//# sourceMappingURL=create-medical-study.dto.js.map