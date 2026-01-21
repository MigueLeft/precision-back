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
import { AntecedentsService } from './antecedents.service';
import { CreateAntecedentDto } from './dto/create-antecedent.dto';
import { UpdateAntecedentDto } from './dto/update-antecedent.dto';
import { QueryAntecedentsDto } from './dto/query-antecedents.dto';
import { AssignPatientAntecedentDto } from './dto/assign-patient-antecedent.dto';
import { AddBatchPatientAntecedentsDto } from './dto/add-batch-patient-antecedents.dto';

@ApiTags('Antecedents')
@ApiBearerAuth()
@Controller('antecedents')
export class AntecedentsController {
  constructor(private readonly antecedentsService: AntecedentsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo antecedente' })
  @ApiResponse({
    status: 201,
    description: 'Antecedente creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de antecedente no encontrado',
  })
  create(@Body() createAntecedentDto: CreateAntecedentDto) {
    return this.antecedentsService.create(createAntecedentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de antecedentes con filtros y paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de antecedentes obtenida exitosamente',
  })
  findAll(@Query() query: QueryAntecedentsDto) {
    return this.antecedentsService.findAll(query);
  }

  @Get('types')
  @ApiOperation({ summary: 'Obtener todos los tipos de antecedentes' })
  @ApiResponse({
    status: 200,
    description: 'Tipos de antecedentes obtenidos exitosamente',
  })
  getAntecedentTypes() {
    return this.antecedentsService.getAntecedentTypes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un antecedente por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del antecedente',
    example: 'uuid-del-antecedente',
  })
  @ApiResponse({
    status: 200,
    description: 'Antecedente encontrado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Antecedente no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.antecedentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un antecedente' })
  @ApiParam({
    name: 'id',
    description: 'ID del antecedente',
    example: 'uuid-del-antecedente',
  })
  @ApiResponse({
    status: 200,
    description: 'Antecedente actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Antecedente no encontrado',
  })
  update(
    @Param('id') id: string,
    @Body() updateAntecedentDto: UpdateAntecedentDto,
  ) {
    return this.antecedentsService.update(id, updateAntecedentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un antecedente' })
  @ApiParam({
    name: 'id',
    description: 'ID del antecedente',
    example: 'uuid-del-antecedente',
  })
  @ApiResponse({
    status: 200,
    description: 'Antecedente eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Antecedente no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.antecedentsService.remove(id);
  }

  // Endpoints para gestión de antecedentes de pacientes
  @Post('assign-patient')
  @ApiOperation({ summary: 'Asignar un antecedente a un paciente' })
  @ApiResponse({
    status: 201,
    description: 'Antecedente asignado al paciente exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente o antecedente no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El antecedente ya está asignado a este paciente',
  })
  assignToPatient(@Body() assignDto: AssignPatientAntecedentDto) {
    return this.antecedentsService.assignToPatient(assignDto);
  }

  @Post('assign-patient/batch')
  @ApiOperation({
    summary: 'Agregar múltiples antecedentes a un paciente de una sola vez',
  })
  @ApiResponse({
    status: 201,
    description: 'Antecedentes agregados exitosamente al paciente.',
    schema: {
      type: 'object',
      properties: {
        patientId: { type: 'string' },
        antecedentsAdded: { type: 'number' },
        antecedents: { type: 'array' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({
    status: 404,
    description: 'Paciente o algún antecedente no encontrado.',
  })
  addBatchPatientAntecedents(@Body() dto: AddBatchPatientAntecedentsDto) {
    return this.antecedentsService.addBatchPatientAntecedents(dto);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Obtener todos los antecedentes de un paciente' })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @ApiResponse({
    status: 200,
    description: 'Antecedentes del paciente obtenidos exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  getPatientAntecedents(@Param('patientId') patientId: string) {
    return this.antecedentsService.getPatientAntecedents(patientId);
  }

  @Delete('patient/:patientId/:antecedentId')
  @ApiOperation({ summary: 'Remover un antecedente de un paciente' })
  @ApiParam({
    name: 'patientId',
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @ApiParam({
    name: 'antecedentId',
    description: 'ID del antecedente',
    example: 'uuid-del-antecedente',
  })
  @ApiResponse({
    status: 200,
    description: 'Antecedente removido del paciente exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación paciente-antecedente no encontrada',
  })
  removePatientAntecedent(
    @Param('patientId') patientId: string,
    @Param('antecedentId') antecedentId: string,
  ) {
    return this.antecedentsService.removePatientAntecedent(
      patientId,
      antecedentId,
    );
  }
}
