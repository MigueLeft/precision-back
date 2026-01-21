import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DiagnosticsService } from './diagnostics.service';
import { QueryDiagnosticsDto } from './dto/query-diagnostics.dto';

@ApiTags('Patient Diagnostics')
@ApiBearerAuth()
@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) {}

  @Get('patients/:patientId')
  @ApiOperation({
    summary:
      'Obtener todos los diagnósticos de un paciente con filtros y paginación',
  })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente (CUID)',
    example: 'cmg4iykys0000u8wkx0o1qepf',
  })
  @ApiResponse({
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
  })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  findPatientDiagnostics(
    @Param('patientId') patientId: string,
    @Query() queryDto: QueryDiagnosticsDto,
  ) {
    return this.diagnosticsService.findPatientDiagnostics(patientId, queryDto);
  }

  @Get('patients/:patientId/latest')
  @ApiOperation({
    summary:
      'Obtener los diagnósticos más recientes de un paciente (uno por grupo diagnóstico)',
  })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente (CUID)',
    example: 'cmg4iykys0000u8wkx0o1qepf',
  })
  @ApiResponse({
    status: 200,
    description:
      'Diagnósticos más recientes del paciente obtenidos exitosamente.',
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
  })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  findLatestPatientDiagnostics(@Param('patientId') patientId: string) {
    return this.diagnosticsService.findLatestPatientDiagnostics(patientId);
  }
}
