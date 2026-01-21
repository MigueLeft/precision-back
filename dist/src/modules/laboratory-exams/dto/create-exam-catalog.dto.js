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
exports.CreateExamCatalogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExamCatalogDto {
    category;
    examName;
    measurementUnit;
    referenceMin;
    referenceMax;
    dataType;
    description;
    normalRange;
}
exports.CreateExamCatalogDto = CreateExamCatalogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Categoría del examen', example: 'HEMATOLOGÍA' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamCatalogDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del examen', example: 'Hemoglobina' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamCatalogDto.prototype, "examName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Unidad de medida',
        example: 'g/dL',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamCatalogDto.prototype, "measurementUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Valor mínimo de referencia',
        example: 12.0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExamCatalogDto.prototype, "referenceMin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Valor máximo de referencia',
        example: 16.0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExamCatalogDto.prototype, "referenceMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de dato',
        enum: ['numerico', 'texto', 'boolean'],
        example: 'numerico',
    }),
    (0, class_validator_1.IsEnum)(['numerico', 'texto', 'boolean']),
    __metadata("design:type", String)
], CreateExamCatalogDto.prototype, "dataType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Descripción del examen',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamCatalogDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rango normal en texto',
        example: '12-16 g/dL',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamCatalogDto.prototype, "normalRange", void 0);
//# sourceMappingURL=create-exam-catalog.dto.js.map