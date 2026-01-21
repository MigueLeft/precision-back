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
exports.CreateDiagnosticDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const id_validation_decorator_1 = require("../../../common/decorators/id-validation.decorator");
class CreateDiagnosticDto {
    diagnosticGroupId;
    name;
    description;
    minScore;
    maxScore;
    severity;
    recommendations;
    colorCode;
}
exports.CreateDiagnosticDto = CreateDiagnosticDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the diagnostic group this diagnostic belongs to (UUID)',
    }),
    (0, id_validation_decorator_1.IsUuidId)(),
    __metadata("design:type", String)
], CreateDiagnosticDto.prototype, "diagnosticGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the diagnostic', maxLength: 100 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDiagnosticDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description of the diagnostic' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiagnosticDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum score for this diagnostic',
        type: 'number',
        example: 0.0,
    }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreateDiagnosticDto.prototype, "minScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum score for this diagnostic',
        type: 'number',
        example: 10.0,
    }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreateDiagnosticDto.prototype, "maxScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Severity level of this diagnostic',
        example: 'medium',
        enum: ['low', 'medium', 'high', 'critical'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiagnosticDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Recommendations for this diagnostic result',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiagnosticDto.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Color code for this diagnostic (hex format)',
        example: '#FF5733',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsHexColor)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiagnosticDto.prototype, "colorCode", void 0);
//# sourceMappingURL=create-diagnostic.dto.js.map