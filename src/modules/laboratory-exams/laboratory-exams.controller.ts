import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LaboratoryExamsService } from './laboratory-exams.service';
import { CreateExamCatalogDto } from './dto/create-exam-catalog.dto';
import { UpdateExamCatalogDto } from './dto/update-exam-catalog.dto';
import { QueryExamCatalogDto } from './dto/query-exam-catalog.dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { QueryExamResultDto } from './dto/query-exam-result.dto';
import { AddBatchExamResultsDto } from './dto/add-batch-exam-results.dto';

@ApiTags('Laboratory Exams')
@ApiBearerAuth()
@Controller('laboratory-exams')
export class LaboratoryExamsController {
  constructor(private readonly laboratoryExamsService: LaboratoryExamsService) {}

  // ========================================
  // EXAM CATALOG ENDPOINTS
  // ========================================

  @Post('catalog')
  @ApiOperation({ summary: 'Crear nuevo examen en el catálogo' })
  @ApiResponse({ status: 201, description: 'Examen creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El examen ya existe' })
  createExamCatalog(@Body() createDto: CreateExamCatalogDto) {
    return this.laboratoryExamsService.createExamCatalog(createDto);
  }

  @Get('catalog')
  @ApiOperation({ summary: 'Obtener todos los exámenes del catálogo' })
  @ApiResponse({ status: 200, description: 'Lista de exámenes' })
  findAllExamCatalog(@Query() query: QueryExamCatalogDto) {
    return this.laboratoryExamsService.findAllExamCatalog(query);
  }

  @Get('catalog/category/:category')
  @ApiOperation({ summary: 'Obtener exámenes por categoría' })
  @ApiResponse({ status: 200, description: 'Lista de exámenes de la categoría' })
  getExamsByCategory(@Param('category') category: string) {
    return this.laboratoryExamsService.getExamsByCategory(category);
  }

  @Get('catalog/:id')
  @ApiOperation({ summary: 'Obtener un examen del catálogo por ID' })
  @ApiResponse({ status: 200, description: 'Examen encontrado' })
  @ApiResponse({ status: 404, description: 'Examen no encontrado' })
  findOneExamCatalog(@Param('id') id: string) {
    return this.laboratoryExamsService.findOneExamCatalog(id);
  }

  @Patch('catalog/:id')
  @ApiOperation({ summary: 'Actualizar un examen del catálogo' })
  @ApiResponse({ status: 200, description: 'Examen actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Examen no encontrado' })
  updateExamCatalog(
    @Param('id') id: string,
    @Body() updateDto: UpdateExamCatalogDto,
  ) {
    return this.laboratoryExamsService.updateExamCatalog(id, updateDto);
  }

  @Delete('catalog/:id')
  @ApiOperation({ summary: 'Eliminar un examen del catálogo (soft delete)' })
  @ApiResponse({ status: 200, description: 'Examen eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Examen no encontrado' })
  removeExamCatalog(@Param('id') id: string) {
    return this.laboratoryExamsService.removeExamCatalog(id);
  }

  // ========================================
  // EXAM RESULTS ENDPOINTS
  // ========================================

  @Post('results')
  @ApiOperation({ summary: 'Registrar resultado de examen para un paciente' })
  @ApiResponse({ status: 201, description: 'Resultado registrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Paciente o examen no encontrado' })
  createExamResult(@Body() createDto: CreateExamResultDto) {
    return this.laboratoryExamsService.createExamResult(createDto);
  }

  @Get('results')
  @ApiOperation({ summary: 'Obtener todos los resultados de exámenes' })
  @ApiResponse({ status: 200, description: 'Lista de resultados' })
  findAllExamResults(@Query() query: QueryExamResultDto) {
    return this.laboratoryExamsService.findAllExamResults(query);
  }

  @Get('results/abnormal')
  @ApiOperation({
    summary: 'Obtener resultados anormales (opcionalmente por paciente)',
  })
  @ApiResponse({ status: 200, description: 'Lista de resultados anormales' })
  getAbnormalResults(@Query('patientId') patientId?: string) {
    return this.laboratoryExamsService.getAbnormalResults(patientId);
  }

  @Get('results/patient/:patientId/history')
  @ApiOperation({ summary: 'Obtener historial de exámenes de un paciente' })
  @ApiResponse({ status: 200, description: 'Historial de exámenes del paciente' })
  getPatientExamHistory(
    @Param('patientId') patientId: string,
    @Query('examId') examId?: string,
  ) {
    return this.laboratoryExamsService.getPatientExamHistory(patientId, examId);
  }

  @Get('results/:id')
  @ApiOperation({ summary: 'Obtener un resultado de examen por ID' })
  @ApiResponse({ status: 200, description: 'Resultado encontrado' })
  @ApiResponse({ status: 404, description: 'Resultado no encontrado' })
  findOneExamResult(@Param('id') id: string) {
    return this.laboratoryExamsService.findOneExamResult(id);
  }

  @Patch('results/:id')
  @ApiOperation({ summary: 'Actualizar un resultado de examen' })
  @ApiResponse({ status: 200, description: 'Resultado actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Resultado no encontrado' })
  updateExamResult(
    @Param('id') id: string,
    @Body() updateDto: UpdateExamResultDto,
  ) {
    return this.laboratoryExamsService.updateExamResult(id, updateDto);
  }

  @Delete('results/:id')
  @ApiOperation({ summary: 'Eliminar un resultado de examen (soft delete)' })
  @ApiResponse({ status: 200, description: 'Resultado eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Resultado no encontrado' })
  removeExamResult(@Param('id') id: string) {
    return this.laboratoryExamsService.removeExamResult(id);
  }

  @Post('results/batch')
  @ApiOperation({
    summary: 'Agregar múltiples resultados de exámenes a un paciente de una sola vez',
  })
  @ApiResponse({
    status: 201,
    description: 'Resultados de exámenes agregados exitosamente.',
    schema: {
      type: 'object',
      properties: {
        patientId: { type: 'string' },
        resultsAdded: { type: 'number' },
        results: { type: 'array' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({
    status: 404,
    description: 'Paciente o algún examen no encontrado.',
  })
  addBatchExamResults(@Body() dto: AddBatchExamResultsDto) {
    return this.laboratoryExamsService.addBatchExamResults(dto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Obtener todas las categorías de exámenes disponibles' })
  @ApiResponse({
    status: 200,
    description: 'Categorías obtenidas exitosamente',
    schema: {
      type: 'array',
      items: { type: 'string' },
      example: [
        'HEMATOLOGÍA',
        'QUÍMICA Y LÍPIDOS',
        'ENDOCRINO-METABÓLICO',
        'FUNCIÓN RENAL',
        'FUNCIÓN HEPÁTICA',
      ],
    },
  })
  getExamCategories() {
    return this.laboratoryExamsService.getExamCategories();
  }
}
