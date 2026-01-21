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
exports.QueryDiagnosticsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryDiagnosticsDto {
    page = 1;
    limit = 10;
    search;
    diagnosticGroupId;
    fromDate;
    toDate;
    sortBy = 'diagnosedAt';
    sortOrder = 'desc';
}
exports.QueryDiagnosticsDto = QueryDiagnosticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de página',
        example: 1,
        required: false,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], QueryDiagnosticsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de elementos por página',
        example: 10,
        required: false,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], QueryDiagnosticsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Buscar por nombre de diagnóstico o grupo',
        example: 'nutricion',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDiagnosticsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por grupo diagnóstico específico',
        example: 'uuid-del-grupo',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDiagnosticsDto.prototype, "diagnosticGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha desde (ISO string)',
        example: '2024-01-01T00:00:00.000Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryDiagnosticsDto.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha hasta (ISO string)',
        example: '2024-12-31T23:59:59.999Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryDiagnosticsDto.prototype, "toDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ordenar por campo',
        example: 'diagnosedAt',
        enum: ['diagnosedAt', 'percentage', 'obtainedScore'],
        required: false,
        default: 'diagnosedAt',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['diagnosedAt', 'percentage', 'obtainedScore']),
    __metadata("design:type", String)
], QueryDiagnosticsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Orden de clasificación',
        example: 'desc',
        enum: ['asc', 'desc'],
        required: false,
        default: 'desc',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    __metadata("design:type", String)
], QueryDiagnosticsDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-diagnostics.dto.js.map