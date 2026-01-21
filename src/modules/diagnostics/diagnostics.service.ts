import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { QueryDiagnosticsDto } from './dto/query-diagnostics.dto';

@Injectable()
export class DiagnosticsService {
  private readonly logger = new Logger(DiagnosticsService.name);

  constructor(private prisma: PrismaService) {}

  async findPatientDiagnostics(
    patientId: string,
    queryDto: QueryDiagnosticsDto,
  ) {
    this.logger.log(`Fetching diagnostics for patient: ${patientId}`);

    const {
      page = 1,
      limit = 10,
      search,
      diagnosticGroupId,
      fromDate,
      toDate,
      sortBy = 'diagnosedAt',
      sortOrder = 'desc',
    } = queryDto;

    const skip = (page - 1) * limit;

    // Verificar que el paciente existe
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    // Construir filtros
    const where: any = {
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

    // Ejecutar consultas en paralelo
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

    // Formatear respuesta
    const formattedDiagnostics = diagnostics.map((diagnostic) => {
      const riskLevel = this.calculateRiskLevel(
        Number(diagnostic.percentage),
        diagnostic.diagnostic.diagnosticGroup.name,
      );

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
            diagnosticCode:
              diagnostic.diagnostic.diagnosticGroup.diagnosticCode,
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

  async findLatestPatientDiagnostics(patientId: string) {
    this.logger.log(`Fetching latest diagnostics for patient: ${patientId}`);

    // Verificar que el paciente existe
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    // Obtener los diagnósticos más recientes por grupo
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

    // Agrupar por grupo diagnóstico y tomar el más reciente de cada uno
    const diagnosticsByGroup = new Map();

    latestDiagnostics.forEach((diagnostic) => {
      const groupId = diagnostic.diagnosticGroupId;
      if (
        !diagnosticsByGroup.has(groupId) ||
        diagnostic.diagnosedAt > diagnosticsByGroup.get(groupId).diagnosedAt
      ) {
        diagnosticsByGroup.set(groupId, diagnostic);
      }
    });

    // Formatear respuesta
    const formattedDiagnostics = Array.from(diagnosticsByGroup.values()).map(
      (diagnostic) => {
        const riskLevel = this.calculateRiskLevel(
          Number(diagnostic.percentage),
          diagnostic.diagnostic.diagnosticGroup.name,
        );

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
              diagnosticCode:
                diagnostic.diagnostic.diagnosticGroup.diagnosticCode,
            },
          },
          questionnaire: {
            id: diagnostic.patientQuestionnaire.questionnaire.id,
            name: diagnostic.patientQuestionnaire.questionnaire.name,
            code: diagnostic.patientQuestionnaire.questionnaire.code,
            completedAt: diagnostic.patientQuestionnaire.completedAt,
          },
        };
      },
    );

    // Ordenar por nivel de riesgo (high -> medium -> low) y luego por fecha
    const riskOrder = { high: 3, medium: 2, low: 1 };
    formattedDiagnostics.sort((a, b) => {
      const riskDiff = riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      if (riskDiff !== 0) return riskDiff;
      return (
        new Date(b.diagnosedAt).getTime() - new Date(a.diagnosedAt).getTime()
      );
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
        lastUpdated:
          formattedDiagnostics.length > 0
            ? formattedDiagnostics[0].diagnosedAt
            : null,
      },
    };
  }

  private calculateRiskLevel(
    percentage: number,
    groupName: string,
  ): 'low' | 'medium' | 'high' {
    // Lógica de cálculo de riesgo basada en el grupo diagnóstico
    switch (groupName.toLowerCase()) {
      case 'nutrición':
      case 'medas':
        // Adherencia a dieta mediterránea: más alto es mejor
        return percentage >= 70 ? 'low' : percentage >= 40 ? 'medium' : 'high';

      case 'actividad física':
      case 'nivel_act':
        // Nivel de actividad física: más alto es mejor
        return percentage >= 80 ? 'low' : percentage >= 50 ? 'medium' : 'high';

      case 'educación':
      case 'educ':
        // Nivel educativo: más alto es mejor
        return percentage >= 75 ? 'low' : percentage >= 50 ? 'medium' : 'high';

      case 'socioeconómico':
      case 'socio':
        // Estatus socioeconómico: más alto es mejor
        return percentage >= 70 ? 'low' : percentage >= 40 ? 'medium' : 'high';

      default:
        // Lógica general: más bajo es mejor riesgo
        return percentage <= 30 ? 'low' : percentage <= 60 ? 'medium' : 'high';
    }
  }
}
