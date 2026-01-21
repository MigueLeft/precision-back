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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReschedulesService } from './reschedules.service';
import { CreateRescheduleDto } from './dto/create-reschedule.dto';
import { UpdateRescheduleDto } from './dto/update-reschedule.dto';
import { QueryRescheduleDto } from './dto/query-reschedule.dto';

@ApiTags('Reschedules')
@ApiBearerAuth()
@Controller('reschedules')
export class ReschedulesController {
  constructor(private readonly reschedulesService: ReschedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reprogramación de cita' })
  @ApiResponse({
    status: 201,
    description: 'Reprogramación creada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Cita no encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflicto con el nuevo horario',
  })
  create(@Body() createRescheduleDto: CreateRescheduleDto) {
    return this.reschedulesService.create(createRescheduleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las reprogramaciones con paginación y filtros',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reprogramaciones obtenida exitosamente',
  })
  findAll(@Query() query: QueryRescheduleDto) {
    return this.reschedulesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reprogramación por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la reprogramación',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Reprogramación encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Reprogramación no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.reschedulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reprogramación' })
  @ApiParam({
    name: 'id',
    description: 'ID de la reprogramación',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Reprogramación actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Reprogramación no encontrada',
  })
  update(
    @Param('id') id: string,
    @Body() updateRescheduleDto: UpdateRescheduleDto,
  ) {
    return this.reschedulesService.update(id, updateRescheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una reprogramación (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'ID de la reprogramación',
    type: 'string',
  })
  @ApiResponse({
    status: 204,
    description: 'Reprogramación eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Reprogramación no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.reschedulesService.remove(id);
  }

  @Get('appointment/:appointmentId')
  @ApiOperation({
    summary: 'Obtener todas las reprogramaciones de una cita específica',
  })
  @ApiParam({
    name: 'appointmentId',
    description: 'ID de la cita',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reprogramaciones de la cita obtenida exitosamente',
  })
  findByAppointment(@Param('appointmentId') appointmentId: string) {
    return this.reschedulesService.findByAppointment(appointmentId);
  }
}
