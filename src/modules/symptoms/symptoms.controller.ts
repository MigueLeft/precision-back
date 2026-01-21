import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SymptomsService } from './symptoms.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { QuerySymptomsDto } from './dto/query-symptoms.dto';
import { CreatePatientSymptomDto } from './dto/create-patient-symptom.dto';
import { AddBatchPatientSymptomsDto } from './dto/add-batch-patient-symptoms.dto';

@ApiTags('symptoms')
@ApiBearerAuth()
@Controller('symptoms')
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  // === Symptoms CRUD ===

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo síntoma' })
  @ApiResponse({ status: 201, description: 'Síntoma creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({
    status: 404,
    description: 'Categoría de síntoma no encontrada.',
  })
  create(@Body() createSymptomDto: CreateSymptomDto) {
    return this.symptomsService.createSymptom(createSymptomDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de síntomas con filtros y paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de síntomas obtenida exitosamente.',
  })
  findAll(@Query() queryDto: QuerySymptomsDto) {
    return this.symptomsService.findAllSymptoms(queryDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Obtener todas las categorías de síntomas' })
  @ApiResponse({
    status: 200,
    description: 'Categorías de síntomas obtenidas exitosamente.',
  })
  findAllCategories() {
    return this.symptomsService.findAllSymptomCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un síntoma por ID' })
  @ApiParam({ name: 'id', description: 'ID del síntoma', type: 'string' })
  @ApiResponse({ status: 200, description: 'Síntoma encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Síntoma no encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.symptomsService.findSymptomById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un síntoma' })
  @ApiParam({ name: 'id', description: 'ID del síntoma', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Síntoma actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Síntoma no encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSymptomDto: UpdateSymptomDto,
  ) {
    return this.symptomsService.updateSymptom(id, updateSymptomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un síntoma' })
  @ApiParam({ name: 'id', description: 'ID del síntoma', type: 'string' })
  @ApiResponse({ status: 200, description: 'Síntoma eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Síntoma no encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.symptomsService.removeSymptom(id);
  }

  // === Patient Symptoms ===

  @Post('patient-symptoms')
  @ApiOperation({ summary: 'Asociar un síntoma a un paciente' })
  @ApiResponse({
    status: 201,
    description: 'Síntoma asociado al paciente exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({
    status: 404,
    description: 'Paciente o síntoma no encontrado.',
  })
  createPatientSymptom(
    @Body() createPatientSymptomDto: CreatePatientSymptomDto,
  ) {
    return this.symptomsService.createPatientSymptom(createPatientSymptomDto);
  }

  @Post('patient-symptoms/batch')
  @ApiOperation({
    summary: 'Agregar múltiples síntomas a un paciente de una sola vez',
  })
  @ApiResponse({
    status: 201,
    description: 'Síntomas agregados exitosamente al paciente.',
    schema: {
      type: 'object',
      properties: {
        patientId: { type: 'string' },
        symptomsAdded: { type: 'number' },
        symptoms: { type: 'array' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({
    status: 404,
    description: 'Paciente o algún síntoma no encontrado.',
  })
  addBatchPatientSymptoms(@Body() dto: AddBatchPatientSymptomsDto) {
    return this.symptomsService.addBatchPatientSymptoms(dto);
  }

  @Get('patients/:patientId')
  @ApiOperation({ summary: 'Obtener todos los síntomas de un paciente' })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Síntomas del paciente obtenidos exitosamente.',
  })
  findPatientSymptoms(@Param('patientId') patientId: string) {
    return this.symptomsService.findPatientSymptoms(patientId);
  }

  @Delete('patients/:patientId/symptoms/:symptomId')
  @ApiOperation({
    summary: 'Eliminar la asociación de un síntoma con un paciente',
  })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    type: 'string',
  })
  @ApiParam({
    name: 'symptomId',
    description: 'ID del síntoma',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Asociación eliminada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Asociación no encontrada.' })
  removePatientSymptom(
    @Param('patientId') patientId: string,
    @Param('symptomId', ParseUUIDPipe) symptomId: string,
  ) {
    return this.symptomsService.removePatientSymptom(patientId, symptomId);
  }
}
