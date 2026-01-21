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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const diagnostics_service_1 = require("./diagnostics.service");
const query_diagnostics_dto_1 = require("./dto/query-diagnostics.dto");
let DiagnosticsController = class DiagnosticsController {
    diagnosticsService;
    constructor(diagnosticsService) {
        this.diagnosticsService = diagnosticsService;
    }
    findPatientDiagnostics(patientId, queryDto) {
        return this.diagnosticsService.findPatientDiagnostics(patientId, queryDto);
    }
    findLatestPatientDiagnostics(patientId) {
        return this.diagnosticsService.findLatestPatientDiagnostics(patientId);
    }
};
exports.DiagnosticsController = DiagnosticsController;
__decorate([
    (0, common_1.Get)('patients/:patientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los diagnósticos de un paciente con filtros y paginación',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente (CUID)',
        example: 'cmg4iykys0000u8wkx0o1qepf',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Diagnósticos del paciente obtenidos exitosamente.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'uuid-diagnostico-paciente' },
                            patientId: {
                                type: 'string',
                                example: 'cmg4iykys0000u8wkx0o1qepf',
                            },
                            obtainedScore: { type: 'number', example: 8 },
                            maxPossibleScore: { type: 'number', example: 14 },
                            percentage: { type: 'number', example: 57.14 },
                            riskLevel: {
                                type: 'string',
                                enum: ['low', 'medium', 'high'],
                                example: 'medium',
                            },
                            diagnosedAt: { type: 'string', format: 'date-time' },
                            observations: { type: 'string', nullable: true },
                            recommendations: { type: 'object', nullable: true },
                            diagnostic: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: {
                                        type: 'string',
                                        example: 'Adherencia Dieta Mediterránea',
                                    },
                                    description: { type: 'string' },
                                    minScore: { type: 'number', example: 0 },
                                    maxScore: { type: 'number', example: 14 },
                                    severity: { type: 'string', example: 'medium' },
                                    recommendations: { type: 'string', nullable: true },
                                    diagnosticGroup: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            name: { type: 'string', example: 'Nutrición' },
                                            description: { type: 'string' },
                                            diagnosticCode: { type: 'string', example: 'MEDAS' },
                                        },
                                    },
                                },
                            },
                            questionnaire: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string', example: 'Historia Clínica IM1' },
                                    code: { type: 'string', example: 'im1' },
                                    completedAt: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                    },
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', example: 25 },
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        totalPages: { type: 'number', example: 3 },
                        hasNextPage: { type: 'boolean', example: true },
                        hasPreviousPage: { type: 'boolean', example: false },
                    },
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Paciente no encontrado.' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_diagnostics_dto_1.QueryDiagnosticsDto]),
    __metadata("design:returntype", void 0)
], DiagnosticsController.prototype, "findPatientDiagnostics", null);
__decorate([
    (0, common_1.Get)('patients/:patientId/latest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener los diagnósticos más recientes de un paciente (uno por grupo diagnóstico)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente (CUID)',
        example: 'cmg4iykys0000u8wkx0o1qepf',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Diagnósticos más recientes del paciente obtenidos exitosamente.',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'uuid-diagnostico-paciente' },
                            patientId: {
                                type: 'string',
                                example: 'cmg4iykys0000u8wkx0o1qepf',
                            },
                            obtainedScore: { type: 'number', example: 8 },
                            maxPossibleScore: { type: 'number', example: 14 },
                            percentage: { type: 'number', example: 57.14 },
                            riskLevel: {
                                type: 'string',
                                enum: ['low', 'medium', 'high'],
                                example: 'medium',
                            },
                            diagnosedAt: { type: 'string', format: 'date-time' },
                            observations: { type: 'string', nullable: true },
                            recommendations: { type: 'object', nullable: true },
                            diagnostic: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: {
                                        type: 'string',
                                        example: 'Adherencia Dieta Mediterránea',
                                    },
                                    description: { type: 'string' },
                                    minScore: { type: 'number', example: 0 },
                                    maxScore: { type: 'number', example: 14 },
                                    severity: { type: 'string', example: 'medium' },
                                    recommendations: { type: 'string', nullable: true },
                                    diagnosticGroup: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            name: { type: 'string', example: 'Nutrición' },
                                            description: { type: 'string' },
                                            diagnosticCode: { type: 'string', example: 'MEDAS' },
                                        },
                                    },
                                },
                            },
                            questionnaire: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string', example: 'Historia Clínica IM1' },
                                    code: { type: 'string', example: 'im1' },
                                    completedAt: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                    },
                },
                summary: {
                    type: 'object',
                    properties: {
                        totalGroups: { type: 'number', example: 4 },
                        highRisk: { type: 'number', example: 1 },
                        mediumRisk: { type: 'number', example: 2 },
                        lowRisk: { type: 'number', example: 1 },
                        lastUpdated: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                        },
                    },
                },
                timestamp: { type: 'string', format: 'date-time' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Paciente no encontrado.' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiagnosticsController.prototype, "findLatestPatientDiagnostics", null);
exports.DiagnosticsController = DiagnosticsController = __decorate([
    (0, swagger_1.ApiTags)('Patient Diagnostics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('diagnostics'),
    __metadata("design:paramtypes", [diagnostics_service_1.DiagnosticsService])
], DiagnosticsController);
//# sourceMappingURL=diagnostics.controller.js.map