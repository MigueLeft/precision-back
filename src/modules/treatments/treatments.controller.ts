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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { QueryTreatmentDto } from './dto/query-treatment.dto';
import { AddBatchTreatmentsDto } from './dto/add-batch-treatments.dto';

@ApiTags('Treatments')
@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new treatment',
    description: 'Create a new medication/treatment for a patient',
  })
  @ApiResponse({
    status: 201,
    description: 'Treatment created successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(createTreatmentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all treatments with pagination and filters',
    description:
      'Retrieve treatments with optional filters by patient, status, etc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Treatments retrieved successfully',
  })
  findAll(@Query() queryDto: QueryTreatmentDto) {
    return this.treatmentsService.findAll(queryDto);
  }

  @Get('patient/:patientId')
  @ApiOperation({
    summary: 'Get all treatments for a specific patient',
    description: 'Retrieve all active treatments for a patient',
  })
  @ApiParam({
    name: 'patientId',
    description: 'Patient ID (CUID)',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['actual', 'previo'],
    description: 'Filter by treatment status',
  })
  @ApiResponse({
    status: 200,
    description: 'Treatments retrieved successfully',
  })
  findByPatient(
    @Param('patientId') patientId: string,
    @Query('status') status?: string,
  ) {
    return this.treatmentsService.findByPatient(patientId, status);
  }

  @Get('patient/:patientId/current')
  @ApiOperation({
    summary: 'Get current treatments for a patient',
    description: 'Retrieve only active current treatments',
  })
  @ApiParam({
    name: 'patientId',
    description: 'Patient ID (CUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Current treatments retrieved successfully',
  })
  getCurrentTreatments(@Param('patientId') patientId: string) {
    return this.treatmentsService.getCurrentTreatments(patientId);
  }

  @Get('patient/:patientId/previous')
  @ApiOperation({
    summary: 'Get previous treatments for a patient',
    description: 'Retrieve treatment history',
  })
  @ApiParam({
    name: 'patientId',
    description: 'Patient ID (CUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Previous treatments retrieved successfully',
  })
  getPreviousTreatments(@Param('patientId') patientId: string) {
    return this.treatmentsService.getPreviousTreatments(patientId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a treatment by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Treatment ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Treatment found',
  })
  @ApiResponse({
    status: 404,
    description: 'Treatment not found',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.treatmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a treatment',
  })
  @ApiParam({
    name: 'id',
    description: 'Treatment ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Treatment updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Treatment not found',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentsService.update(id, updateTreatmentDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Change treatment status',
    description: 'Change status between "actual" and "previo"',
  })
  @ApiParam({
    name: 'id',
    description: 'Treatment ID (UUID)',
  })
  @ApiQuery({
    name: 'status',
    enum: ['actual', 'previo'],
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Treatment status changed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Treatment not found',
  })
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('status') status: 'actual' | 'previo',
  ) {
    return this.treatmentsService.changeStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Soft delete a treatment',
    description: 'Mark treatment as inactive (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'Treatment ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Treatment deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Treatment not found',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.treatmentsService.remove(id);
  }

  @Delete(':id/hard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Permanently delete a treatment',
    description: 'Hard delete - removes treatment from database permanently',
  })
  @ApiParam({
    name: 'id',
    description: 'Treatment ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Treatment permanently deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Treatment not found',
  })
  hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.treatmentsService.hardDelete(id);
  }

  @Post('batch')
  @ApiOperation({
    summary: 'Agregar múltiples tratamientos/medicamentos a un paciente de una sola vez',
  })
  @ApiResponse({
    status: 201,
    description: 'Tratamientos agregados exitosamente.',
    schema: {
      type: 'object',
      properties: {
        patientId: { type: 'string' },
        treatmentsAdded: { type: 'number' },
        treatments: { type: 'array' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado.',
  })
  addBatchTreatments(@Body() dto: AddBatchTreatmentsDto) {
    return this.treatmentsService.addBatchTreatments(dto);
  }
}
