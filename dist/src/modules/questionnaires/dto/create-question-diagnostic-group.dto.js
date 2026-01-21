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
exports.CreateQuestionDiagnosticGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateQuestionDiagnosticGroupDto {
    questionId;
    diagnosticGroupId;
    weight;
    scoringRules;
}
exports.CreateQuestionDiagnosticGroupDto = CreateQuestionDiagnosticGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the question',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDiagnosticGroupDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the diagnostic group' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDiagnosticGroupDto.prototype, "diagnosticGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Weight of this question in the diagnostic group calculation',
        type: 'number',
        example: 1.0,
        default: 1.0,
    }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestionDiagnosticGroupDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Scoring rules specific to this question-diagnostic group relationship',
        example: { multiplier: 2, condition: 'if_positive' },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateQuestionDiagnosticGroupDto.prototype, "scoringRules", void 0);
//# sourceMappingURL=create-question-diagnostic-group.dto.js.map