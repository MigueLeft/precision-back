import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { QueryConsultationDto } from './dto/query-consultation.dto';

@ApiTags('Consultas')
@ApiBearerAuth()
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationService: ConsultationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nueva consulta',
    description: 'Crea una nueva consulta médica asociada a una cita existente',
  })
  @ApiResponse({
    status: 201,
    description: 'Consulta creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o ya existe una consulta para esta cita',
  })
  @ApiResponse({
    status: 404,
    description: 'La cita o usuario especificado no existe',
  })
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationService.create(createConsultationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de consultas',
    description:
      'Obtiene una lista paginada de consultas con filtros opcionales',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de consultas obtenida exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros de consulta inválidos',
  })
  findAll(@Query() queryDto: QueryConsultationDto) {
    return this.consultationService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener consulta por ID',
    description: 'Obtiene los detalles de una consulta específica por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la consulta',
    example: 'clm123abc456def',
  })
  @ApiResponse({
    status: 200,
    description: 'Consulta encontrada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  @Get('appointment/:appointmentId')
  @ApiOperation({
    summary: 'Obtener consulta por ID de cita',
    description: 'Obtiene la consulta asociada a una cita específica',
  })
  @ApiParam({
    name: 'appointmentId',
    description: 'ID único de la cita',
    example: 'clm789xyz123abc',
  })
  @ApiResponse({
    status: 200,
    description: 'Consulta encontrada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró consulta para esta cita',
  })
  findByAppointmentId(@Param('appointmentId') appointmentId: string) {
    return this.consultationService.findByAppointmentId(appointmentId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar consulta',
    description: 'Actualiza los datos de una consulta existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la consulta',
    example: 'clm123abc456def',
  })
  @ApiResponse({
    status: 200,
    description: 'Consulta actualizada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta no encontrada',
  })
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(id, updateConsultationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar consulta',
    description: 'Elimina una consulta (soft delete - marca como inactiva)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la consulta',
    example: 'clm123abc456def',
  })
  @ApiResponse({
    status: 200,
    description: 'Consulta eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }
}
