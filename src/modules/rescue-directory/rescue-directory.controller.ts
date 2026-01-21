import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RescueDirectoryService } from './rescue-directory.service';
import { CreateRescueDirectoryDto } from './dto/create-rescue-directory.dto';
import { UpdateRescueDirectoryDto } from './dto/update-rescue-directory.dto';
import { QueryRescueDirectoryDto } from './dto/query-rescue-directory.dto';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';

@ApiTags('RescueDirectory')
@Controller('rescue-directory')
@UseInterceptors(TransformInterceptor)
export class RescueDirectoryController {
  constructor(
    private readonly rescueDirectoryService: RescueDirectoryService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nueva entrada en directorio de rescate' })
  @ApiResponse({ status: 201, description: 'Entrada creada exitosamente' })
  create(@Body() createRescueDirectoryDto: CreateRescueDirectoryDto) {
    return this.rescueDirectoryService.create(createRescueDirectoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las entradas del directorio de rescate',
  })
  @ApiResponse({ status: 200, description: 'Lista de entradas obtenida' })
  findAll(@Query() queryDto: QueryRescueDirectoryDto) {
    return this.rescueDirectoryService.findAll(queryDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener entradas activas del directorio' })
  @ApiResponse({ status: 200, description: 'Lista de entradas activas' })
  getActiveEntries(@Query() queryDto: QueryRescueDirectoryDto) {
    return this.rescueDirectoryService.getActiveEntries(queryDto);
  }

  @Get('high-priority')
  @ApiOperation({ summary: 'Obtener entradas de alta prioridad' })
  @ApiResponse({
    status: 200,
    description: 'Lista de entradas de alta prioridad',
  })
  getHighPriorityEntries(@Query() queryDto: QueryRescueDirectoryDto) {
    return this.rescueDirectoryService.getHighPriorityEntries(queryDto);
  }

  @Get('critical')
  @ApiOperation({ summary: 'Obtener entradas críticas' })
  @ApiResponse({ status: 200, description: 'Lista de entradas críticas' })
  getCriticalEntries(@Query() queryDto: QueryRescueDirectoryDto) {
    return this.rescueDirectoryService.getCriticalEntries(queryDto);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Obtener entradas por paciente' })
  @ApiParam({ name: 'patientId', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Entradas del paciente obtenidas' })
  getByPatient(
    @Param('patientId') patientId: string,
    @Query() queryDto: QueryRescueDirectoryDto,
  ) {
    return this.rescueDirectoryService.getByPatient(patientId, queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener entrada por ID' })
  @ApiParam({ name: 'id', description: 'ID de la entrada' })
  @ApiResponse({ status: 200, description: 'Entrada obtenida' })
  findOne(@Param('id') id: string) {
    return this.rescueDirectoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar entrada del directorio' })
  @ApiParam({ name: 'id', description: 'ID de la entrada' })
  @ApiResponse({ status: 200, description: 'Entrada actualizada' })
  update(
    @Param('id') id: string,
    @Body() updateRescueDirectoryDto: UpdateRescueDirectoryDto,
  ) {
    return this.rescueDirectoryService.update(id, updateRescueDirectoryDto);
  }

  @Patch(':id/reactivate')
  @ApiOperation({ summary: 'Reactivar entrada del directorio' })
  @ApiParam({ name: 'id', description: 'ID de la entrada' })
  @ApiResponse({ status: 200, description: 'Entrada reactivada' })
  reactivateEntry(
    @Param('id') id: string,
    @Body() body: { reactivationNotes?: string },
  ) {
    return this.rescueDirectoryService.reactivateEntry(
      id,
      body.reactivationNotes,
    );
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archivar entrada del directorio' })
  @ApiParam({ name: 'id', description: 'ID de la entrada' })
  @ApiResponse({ status: 200, description: 'Entrada archivada' })
  archiveEntry(@Param('id') id: string) {
    return this.rescueDirectoryService.archiveEntry(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar entrada del directorio' })
  @ApiParam({ name: 'id', description: 'ID de la entrada' })
  @ApiResponse({ status: 204, description: 'Entrada eliminada' })
  remove(@Param('id') id: string) {
    return this.rescueDirectoryService.remove(id);
  }
}
