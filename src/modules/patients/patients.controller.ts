// src/modules/patients/patients.controller.ts
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
  import { PatientsService } from './patients.service';
  import { CreatePatientDto } from './dto/create-patient.dto';
  import { UpdatePatientDto } from './dto/update-patient.dto';
  import { QueryPatientDto } from './dto/query-patient.dto';
    
  @ApiTags('Patients')
  @ApiBearerAuth()
  @Controller('patients')
  export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo paciente' })
    @ApiResponse({
      status: 201,
      description: 'Paciente creado exitosamente',
    })
    @ApiResponse({
      status: 409,
      description: 'La identificación o email ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Usuario no encontrado o ya asignado',
    })
    create(@Body() createPatientDto: CreatePatientDto) {
      return this.patientsService.create(createPatientDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todos los pacientes con paginación y filtros' })
    @ApiResponse({
      status: 200,
      description: 'Lista de pacientes obtenida exitosamente',
    })
    findAll(@Query() query: QueryPatientDto) {
      return this.patientsService.findAll(query);
    }
  
    @Get('active')
    @ApiOperation({ summary: 'Obtener solo pacientes activos (sin paginación)' })
    @ApiResponse({
      status: 200,
      description: 'Lista de pacientes activos obtenida exitosamente',
    })
    getActivePatients() {
      return this.patientsService.getActivePatients();
    }
  
    @Get('stats')
    @ApiOperation({ summary: 'Obtener estadísticas de pacientes' })
    @ApiResponse({
      status: 200,
      description: 'Estadísticas de pacientes obtenidas exitosamente',
    })
    getPatientStats() {
      return this.patientsService.getPatientStats();
    }
  
    @Get('identification/:identification')
    @ApiOperation({ summary: 'Obtener un paciente por número de identificación' })
    @ApiParam({
      name: 'identification',
      description: 'Número de identificación del paciente',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Paciente encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Paciente no encontrado',
    })
    findByIdentification(@Param('identification') identification: string) {
      return this.patientsService.findByIdentification(identification);
    }
  
    @Get('email/:email')
    @ApiOperation({ summary: 'Obtener un paciente por email' })
    @ApiParam({
      name: 'email',
      description: 'Email del paciente',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Paciente encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Paciente no encontrado',
    })
    findByEmail(@Param('email') email: string) {
      return this.patientsService.findByEmail(email);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un paciente por ID' })
    @ApiParam({
      name: 'id',
      description: 'ID del paciente',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Paciente encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Paciente no encontrado',
    })
    findOne(@Param('id') id: string) {
      return this.patientsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un paciente' })
    @ApiParam({
      name: 'id',
      description: 'ID del paciente',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Paciente actualizado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Paciente no encontrado',
    })
    @ApiResponse({
      status: 409,
      description: 'La identificación o email ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Usuario no encontrado o ya asignado',
    })
    update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
      return this.patientsService.update(id, updatePatientDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un paciente' })
    @ApiParam({
      name: 'id',
      description: 'ID del paciente',
      type: 'string',
    })
    @ApiResponse({
      status: 204,
      description: 'Paciente eliminado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Paciente no encontrado',
    })
    remove(@Param('id') id: string) {
      return this.patientsService.remove(id);
    }
  
    @Post(':id/convert-to-user')
    @ApiOperation({ 
      summary: 'Convertir paciente en usuario del sistema',
      description: 'Crea automáticamente un usuario del sistema usando los datos del paciente. La contraseña será su número de identificación.'
    })
    @ApiParam({
      name: 'id',
      description: 'ID del paciente',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Paciente convertido a usuario exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Paciente no encontrado',
    })
    @ApiResponse({
      status: 409,
      description: 'Paciente ya tiene cuenta de usuario o email ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Rol PATIENT no encontrado en el sistema',
    })
    convertToUser(@Param('id') id: string) {
      return this.patientsService.convertToUser(id);
    }
  
    @Delete(':id/remove-user')
    @ApiOperation({ summary: 'Remover usuario de un paciente' })
    @ApiParam({
      name: 'id',
      description: 'ID del paciente',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Usuario removido exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Paciente no encontrado',
    })
    removeUser(@Param('id') id: string) {
      return this.patientsService.removeUser(id);
    }
  
    @Post('bulk')
    @ApiOperation({ summary: 'Crear múltiples pacientes' })
    @ApiResponse({
      status: 201,
      description: 'Pacientes creados exitosamente',
    })
    bulkCreate(@Body() patients: CreatePatientDto[]) {
      return this.patientsService.bulkCreate(patients);
    }
  }