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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PatientFollowService } from './patient-follow.service';
import { CreatePatientFollowDto } from './dto/create-patient-follow.dto';
import { UpdatePatientFollowDto } from './dto/update-patient-follow.dto';
import { QueryPatientFollowDto } from './dto/query-patient-follow.dto';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';

@ApiTags('PatientFollow')
@Controller('patient-follow')
@UseInterceptors(TransformInterceptor)
export class PatientFollowController {
  constructor(private readonly patientFollowService: PatientFollowService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo seguimiento de paciente' })
  @ApiResponse({ status: 201, description: 'Seguimiento creado exitosamente' })
  create(@Body() createPatientFollowDto: CreatePatientFollowDto) {
    return this.patientFollowService.create(createPatientFollowDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los seguimientos con filtros' })
  @ApiResponse({ status: 200, description: 'Lista de seguimientos obtenida' })
  findAll(@Query() queryDto: QueryPatientFollowDto) {
    return this.patientFollowService.findAll(queryDto);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Obtener seguimientos pendientes' })
  @ApiResponse({ status: 200, description: 'Lista de seguimientos pendientes' })
  getPendingFollowUps() {
    return this.patientFollowService.getPendingFollowUps();
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Obtener seguimientos por paciente' })
  @ApiParam({ name: 'patientId', description: 'ID del paciente' })
  @ApiResponse({
    status: 200,
    description: 'Seguimientos del paciente obtenidos',
  })
  getByPatient(
    @Param('patientId') patientId: string,
    @Query() queryDto: QueryPatientFollowDto,
  ) {
    return this.patientFollowService.getByPatient(patientId, queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener seguimiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento' })
  @ApiResponse({ status: 200, description: 'Seguimiento obtenido' })
  findOne(@Param('id') id: string) {
    return this.patientFollowService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar seguimiento' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento' })
  @ApiResponse({ status: 200, description: 'Seguimiento actualizado' })
  update(
    @Param('id') id: string,
    @Body() updatePatientFollowDto: UpdatePatientFollowDto,
  ) {
    return this.patientFollowService.update(id, updatePatientFollowDto);
  }

  @Patch(':id/increment-attempt')
  @ApiOperation({ summary: 'Incrementar contador de intentos' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento' })
  @ApiResponse({ status: 200, description: 'Contador incrementado' })
  incrementAttemptCount(@Param('id') id: string) {
    return this.patientFollowService.incrementAttemptCount(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar seguimiento' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento' })
  @ApiResponse({ status: 204, description: 'Seguimiento eliminado' })
  remove(@Param('id') id: string) {
    return this.patientFollowService.remove(id);
  }
}
