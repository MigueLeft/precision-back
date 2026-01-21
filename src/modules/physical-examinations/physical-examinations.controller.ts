import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PhysicalExaminationsService } from './physical-examinations.service';
import { CreatePhysicalExaminationDto } from './dto/create-physical-examination.dto';
import { UpdatePhysicalExaminationDto } from './dto/update-physical-examination.dto';
import { QueryPhysicalExaminationsDto } from './dto/query-physical-examinations.dto';
import { AssignPatientExaminationDto } from './dto/assign-patient-examination.dto';
import { UpsertPatientPhysicalExamDto } from './dto/upsert-patient-physical-exam.dto';

@ApiTags('Physical Examinations')
@ApiBearerAuth()
@Controller('physical-examinations')
export class PhysicalExaminationsController {
  constructor(
    private readonly physicalExaminationsService: PhysicalExaminationsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo examen físico' })
  @ApiResponse({
    status: 201,
    description: 'Examen físico creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createPhysicalExaminationDto: CreatePhysicalExaminationDto) {
    return this.physicalExaminationsService.create(
      createPhysicalExaminationDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de exámenes físicos con filtros y paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de exámenes físicos obtenida exitosamente',
  })
  findAll(@Query() query: QueryPhysicalExaminationsDto) {
    return this.physicalExaminationsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un examen físico por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del examen físico',
    example: 'uuid-del-examen-fisico',
  })
  @ApiResponse({
    status: 200,
    description: 'Examen físico encontrado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Examen físico no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.physicalExaminationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un examen físico' })
  @ApiParam({
    name: 'id',
    description: 'ID del examen físico',
    example: 'uuid-del-examen-fisico',
  })
  @ApiResponse({
    status: 200,
    description: 'Examen físico actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Examen físico no encontrado',
  })
  update(
    @Param('id') id: string,
    @Body() updatePhysicalExaminationDto: UpdatePhysicalExaminationDto,
  ) {
    return this.physicalExaminationsService.update(
      id,
      updatePhysicalExaminationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un examen físico' })
  @ApiParam({
    name: 'id',
    description: 'ID del examen físico',
    example: 'uuid-del-examen-fisico',
  })
  @ApiResponse({
    status: 200,
    description: 'Examen físico eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Examen físico no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.physicalExaminationsService.remove(id);
  }

  // Endpoints para gestión de exámenes físicos de pacientes
  @Post('assign-patient')
  @ApiOperation({ summary: 'Asignar un examen físico a un paciente' })
  @ApiResponse({
    status: 201,
    description: 'Examen físico asignado al paciente exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente o examen físico no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El examen ya está asignado a este paciente en esta fecha',
  })
  assignToPatient(@Body() assignDto: AssignPatientExaminationDto) {
    return this.physicalExaminationsService.assignToPatient(assignDto);
  }

  @Get('patient/:patientId')
  @ApiOperation({
    summary: 'Obtener todos los exámenes físicos de un paciente',
  })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @ApiResponse({
    status: 200,
    description: 'Exámenes físicos del paciente obtenidos exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  getPatientExaminations(@Param('patientId') patientId: string) {
    return this.physicalExaminationsService.getPatientExaminations(patientId);
  }

  @Get('patient/:patientId/history')
  @ApiOperation({
    summary: 'Obtener historial completo de exámenes físicos de un paciente',
  })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @ApiResponse({
    status: 200,
    description:
      'Historial de exámenes físicos del paciente obtenido exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  getPatientExaminationHistory(@Param('patientId') patientId: string) {
    return this.physicalExaminationsService.getPatientExaminationHistory(
      patientId,
    );
  }

  @Post('patient/:patientId/create-and-assign')
  @ApiOperation({
    summary: 'Crear un examen físico y asignarlo directamente a un paciente',
  })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @ApiQuery({
    name: 'examinationDate',
    description: 'Fecha del examen (ISO string)',
    example: '2024-09-26T10:30:00.000Z',
  })
  @ApiQuery({
    name: 'notes',
    description: 'Notas del examen',
    required: false,
    example: 'Examen de rutina',
  })
  @ApiResponse({
    status: 201,
    description: 'Examen físico creado y asignado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  createAndAssignToPatient(
    @Param('patientId') patientId: string,
    @Query('examinationDate') examinationDate: string,
    @Query('notes') notes: string,
    @Body() createDto: CreatePhysicalExaminationDto,
  ) {
    return this.physicalExaminationsService.createAndAssignToPatient(
      patientId,
      createDto,
      examinationDate,
      notes,
    );
  }

  @Delete('patient/:patientId/:examinationId')
  @ApiOperation({ summary: 'Remover un examen físico de un paciente' })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @ApiParam({
    name: 'examinationId',
    description: 'ID del examen físico',
    example: 'uuid-del-examen-fisico',
  })
  @ApiQuery({
    name: 'examinationDate',
    description: 'Fecha del examen (ISO string)',
    example: '2024-09-26T10:30:00.000Z',
  })
  @ApiResponse({
    status: 200,
    description: 'Examen físico removido del paciente exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación paciente-examen no encontrada',
  })
  removePatientExamination(
    @Param('patientId') patientId: string,
    @Param('examinationId') examinationId: string,
    @Query('examinationDate') examinationDate: string,
  ) {
    return this.physicalExaminationsService.removePatientExamination(
      patientId,
      examinationId,
      examinationDate,
    );
  }

  @Post('patients/:patientId')
  @ApiOperation({
    summary: 'Crear/actualizar examen físico de un paciente',
    description:
      'Crea un nuevo registro de examen físico. Solo los campos enviados serán establecidos, los demás permanecerán como null.',
  })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
  })
  @ApiResponse({
    status: 201,
    description: 'Examen físico creado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  upsertPatientPhysicalExam(
    @Param('patientId') patientId: string,
    @Body() dto: UpsertPatientPhysicalExamDto,
  ) {
    return this.physicalExaminationsService.upsertPatientPhysicalExam(
      patientId,
      dto,
    );
  }

  @Get('patients/:patientId/latest')
  @ApiOperation({ summary: 'Obtener el último examen físico de un paciente' })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
  })
  @ApiResponse({ status: 200, description: 'Último examen físico obtenido' })
  @ApiResponse({ status: 404, description: 'No se encontraron exámenes' })
  getLatestPatientExam(@Param('patientId') patientId: string) {
    return this.physicalExaminationsService.getLatestPatientExam(patientId);
  }
}
