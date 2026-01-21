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
exports.CreatePatientQuestionnaireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class CreatePatientQuestionnaireDto {
    patientId;
    questionnaireId;
    sourceIp;
    device;
}
exports.CreatePatientQuestionnaireDto = CreatePatientQuestionnaireDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the patient (CUID)' }),
    (0, id_validation_decorator_1.IsCuidId)(),
    __metadata("design:type", String)
], CreatePatientQuestionnaireDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the questionnaire (UUID)' }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], CreatePatientQuestionnaireDto.prototype, "questionnaireId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'IP address of the source',
        example: '192.168.1.1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], CreatePatientQuestionnaireDto.prototype, "sourceIp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Device information', maxLength: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientQuestionnaireDto.prototype, "device", void 0);
//# sourceMappingURL=create-patient-questionnaire.dto.js.map