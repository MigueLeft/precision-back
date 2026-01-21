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
var DiagnosticsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
let DiagnosticsService = DiagnosticsService_1 = class DiagnosticsService {
    prisma;
    logger = new common_1.Logger(DiagnosticsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPatientDiagnostics(patientId, queryDto) {
        this.logger.log(`Fetching diagnostics for patient: ${patientId}`);
        const { page = 1, limit = 10, search, diagnosticGroupId, fromDate, toDate, sortBy = 'diagnosedAt', sortOrder = 'desc', } = queryDto;
        const skip = (page - 1) * limit;
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
        }
        const where = {
            patientId: patientId,
        };
        if (search) {
            where.OR = [
                {
                    diagnostic: {
                        name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    diagnostic: {
                        diagnosticGroup: {
                            name: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    },
                },
                {
                    diagnostic: {
                        code: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                },
            ];
        }
        if (diagnosticGroupId) {
            where.diagnosticGroupId = diagnosticGroupId;
        }
        if (fromDate || toDate) {
            where.diagnosedAt = {};
            if (fromDate) {
                where.diagnosedAt.gte = new Date(fromDate);
            }
            if (toDate) {
                where.diagnosedAt.lte = new Date(toDate);
            }
        }
        const [diagnostics, total] = await Promise.all([
            this.prisma.patientDiagnostic.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    diagnostic: {
                        include: {
                            diagnosticGroup: true,
                        },
                    },
                    patientQuestionnaire: {
                        include: {
                            questionnaire: {
                                select: {
                                    id: true,
                                    name: true,
                                    code: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.patientDiagnostic.count({ where }),
        ]);
        const formattedDiagnostics = diagnostics.map((diagnostic) => {
            const riskLevel = this.calculateRiskLevel(Number(diagnostic.percentage), diagnostic.diagnostic.diagnosticGroup.name);
            return {
                id: diagnostic.id,
                patientId: diagnostic.patientId,
                obtainedScore: Number(diagnostic.obtainedScore),
                maxPossibleScore: Number(diagnostic.maxPossibleScore),
                percentage: Number(diagnostic.percentage),
                riskLevel,
                diagnosedAt: diagnostic.diagnosedAt,
                observations: diagnostic.observations,
                recommendations: diagnostic.recommendations,
                diagnostic: {
                    id: diagnostic.diagnostic.id,
                    name: diagnostic.diagnostic.name,
                    description: diagnostic.diagnostic.description,
                    minScore: Number(diagnostic.diagnostic.minScore),
                    maxScore: Number(diagnostic.diagnostic.maxScore),
                    severity: diagnostic.diagnostic.severity,
                    recommendations: diagnostic.diagnostic.recommendations,
                    diagnosticGroup: {
                        id: diagnostic.diagnostic.diagnosticGroup.id,
                        name: diagnostic.diagnostic.diagnosticGroup.name,
                        description: diagnostic.diagnostic.diagnosticGroup.description,
                        diagnosticCode: diagnostic.diagnostic.diagnosticGroup.diagnosticCode,
                    },
                },
                questionnaire: {
                    id: diagnostic.patientQuestionnaire.questionnaire.id,
                    name: diagnostic.patientQuestionnaire.questionnaire.name,
                    code: diagnostic.patientQuestionnaire.questionnaire.code,
                    completedAt: diagnostic.patientQuestionnaire.completedAt,
                },
            };
        });
        return {
            data: formattedDiagnostics,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPreviousPage: page > 1,
            },
        };
    }
    async findLatestPatientDiagnostics(patientId) {
        this.logger.log(`Fetching latest diagnostics for patient: ${patientId}`);
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
        }
        const latestDiagnostics = await this.prisma.patientDiagnostic.findMany({
            where: { patientId },
            include: {
                diagnostic: {
                    include: {
                        diagnosticGroup: true,
                    },
                },
                patientQuestionnaire: {
                    include: {
                        questionnaire: {
                            select: {
                                id: true,
                                name: true,
                                code: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                diagnosedAt: 'desc',
            },
        });
        const diagnosticsByGroup = new Map();
        latestDiagnostics.forEach((diagnostic) => {
            const groupId = diagnostic.diagnosticGroupId;
            if (!diagnosticsByGroup.has(groupId) ||
                diagnostic.diagnosedAt > diagnosticsByGroup.get(groupId).diagnosedAt) {
                diagnosticsByGroup.set(groupId, diagnostic);
            }
        });
        const formattedDiagnostics = Array.from(diagnosticsByGroup.values()).map((diagnostic) => {
            const riskLevel = this.calculateRiskLevel(Number(diagnostic.percentage), diagnostic.diagnostic.diagnosticGroup.name);
            return {
                id: diagnostic.id,
                patientId: diagnostic.patientId,
                obtainedScore: Number(diagnostic.obtainedScore),
                maxPossibleScore: Number(diagnostic.maxPossibleScore),
                percentage: Number(diagnostic.percentage),
                riskLevel,
                diagnosedAt: diagnostic.diagnosedAt,
                observations: diagnostic.observations,
                recommendations: diagnostic.recommendations,
                diagnostic: {
                    id: diagnostic.diagnostic.id,
                    name: diagnostic.diagnostic.name,
                    description: diagnostic.diagnostic.description,
                    minScore: Number(diagnostic.diagnostic.minScore),
                    maxScore: Number(diagnostic.diagnostic.maxScore),
                    severity: diagnostic.diagnostic.severity,
                    recommendations: diagnostic.diagnostic.recommendations,
                    diagnosticGroup: {
                        id: diagnostic.diagnostic.diagnosticGroup.id,
                        name: diagnostic.diagnostic.diagnosticGroup.name,
                        description: diagnostic.diagnostic.diagnosticGroup.description,
                        diagnosticCode: diagnostic.diagnostic.diagnosticGroup.diagnosticCode,
                    },
                },
                questionnaire: {
                    id: diagnostic.patientQuestionnaire.questionnaire.id,
                    name: diagnostic.patientQuestionnaire.questionnaire.name,
                    code: diagnostic.patientQuestionnaire.questionnaire.code,
                    completedAt: diagnostic.patientQuestionnaire.completedAt,
                },
            };
        });
        const riskOrder = { high: 3, medium: 2, low: 1 };
        formattedDiagnostics.sort((a, b) => {
            const riskDiff = riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
            if (riskDiff !== 0)
                return riskDiff;
            return (new Date(b.diagnosedAt).getTime() - new Date(a.diagnosedAt).getTime());
        });
        return {
            data: formattedDiagnostics,
            summary: {
                totalGroups: formattedDiagnostics.length,
                highRisk: formattedDiagnostics.filter((d) => d.riskLevel === 'high')
                    .length,
                mediumRisk: formattedDiagnostics.filter((d) => d.riskLevel === 'medium')
                    .length,
                lowRisk: formattedDiagnostics.filter((d) => d.riskLevel === 'low')
                    .length,
                lastUpdated: formattedDiagnostics.length > 0
                    ? formattedDiagnostics[0].diagnosedAt
                    : null,
            },
        };
    }
    calculateRiskLevel(percentage, groupName) {
        switch (groupName.toLowerCase()) {
            case 'nutrición':
            case 'medas':
                return percentage >= 70 ? 'low' : percentage >= 40 ? 'medium' : 'high';
            case 'actividad física':
            case 'nivel_act':
                return percentage >= 80 ? 'low' : percentage >= 50 ? 'medium' : 'high';
            case 'educación':
            case 'educ':
                return percentage >= 75 ? 'low' : percentage >= 50 ? 'medium' : 'high';
            case 'socioeconómico':
            case 'socio':
                return percentage >= 70 ? 'low' : percentage >= 40 ? 'medium' : 'high';
            default:
                return percentage <= 30 ? 'low' : percentage <= 60 ? 'medium' : 'high';
        }
    }
};
exports.DiagnosticsService = DiagnosticsService;
exports.DiagnosticsService = DiagnosticsService = DiagnosticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiagnosticsService);
//# sourceMappingURL=diagnostics.service.js.map