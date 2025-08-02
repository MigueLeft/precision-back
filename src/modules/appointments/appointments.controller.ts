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
  import { AppointmentsService } from './appointments.service';
  import { CreateAppointmentDto } from './dto/create-appointment.dto'; 
  import { UpdateAppointmentDto } from './dto/update-appointment.dto'; 
  import { QueryAppointmentDto } from './dto/query-appointment.dto';
  
  @ApiTags('appointments')
  @ApiBearerAuth()
  @Controller('appointments')
  export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear una nueva cita' })
    @ApiResponse({
      status: 201,
      description: 'Cita creada exitosamente',
    })
    @ApiResponse({
      status: 409,
      description: 'El paciente o médico no encontrado',
    })
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
      return this.appointmentsService.create(createAppointmentDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todas las citas con paginación y filtros' })
    @ApiResponse({
      status: 200,
      description: 'Lista de citas obtenida exitosamente',
    })
    findAll(@Query() query: QueryAppointmentDto) {
      return this.appointmentsService.findAll(query);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una cita por ID' })
    @ApiParam({
      name: 'id',
      description: 'ID de la cita',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Cita encontrada',
    })
    @ApiResponse({
      status: 404,
      description: 'Cita no encontrada',
    })
    findOne(@Param('id') id: string) {
      return this.appointmentsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una cita' })
    @ApiParam({
      name: 'id',
      description: 'ID de la cita',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Cita actualizada exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Cita no encontrada',
    })
    update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
      return this.appointmentsService.update(id, updateAppointmentDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar una cita' })
    @ApiParam({
      name: 'id',
      description: 'ID de la cita',
      type: 'string',
    })
    @ApiResponse({
      status: 204,
      description: 'Cita eliminada exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Cita no encontrada',
    })
    remove(@Param('id') id: string) {
      return this.appointmentsService.remove(id);
    }
  }