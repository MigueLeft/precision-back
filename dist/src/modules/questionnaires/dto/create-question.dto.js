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
exports.CreateQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateQuestionDto {
    code;
    questionText;
    questionType;
    options;
    inputType;
    hasScore;
    active;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique code identifier for the question (e.g., im1_a_1_1)',
        maxLength: 50,
        example: 'im1_a_1_1',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Text of the question' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the question',
        enum: client_1.QuestionType,
        example: client_1.QuestionType.MULTIPLE_CHOICE,
    }),
    (0, class_validator_1.IsEnum)(client_1.QuestionType),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Options for the question (for multiple/single choice questions)',
        example: {
            options: ['Option 1', 'Option 2', 'Option 3'],
            scores: [1, 2, 3],
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateQuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Input type for UI rendering (radio, checkbox, text, range, etc.)',
        maxLength: 50,
        example: 'radio',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "inputType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the question has a score',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateQuestionDto.prototype, "hasScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the question is active',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateQuestionDto.prototype, "active", void 0);
//# sourceMappingURL=create-question.dto.js.map