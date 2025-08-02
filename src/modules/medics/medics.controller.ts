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
  import { MedicsService } from './medics.service';
  import { CreateMedicDto } from './dto/create-medic.dto';
  import { UpdateMedicDto } from './dto/update-medic.dto';
  import { QueryMedicDto } from './dto/query-medic.dto';
    
  @ApiTags('medics')
  @ApiBearerAuth()
  @Controller('medics')
  export class MedicsController {
    constructor(private readonly medicsService: MedicsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo médico' })
    @ApiResponse({
      status: 201,
      description: 'Médico creado exitosamente',
    })
    @ApiResponse({
      status: 409,
      description: 'La identificación, email o número de registro ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Usuario no encontrado o ya asignado',
    })
    create(@Body() createMedicDto: CreateMedicDto) {
      return this.medicsService.create(createMedicDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todos los médicos con paginación y filtros' })
    @ApiResponse({
      status: 200,
      description: 'Lista de médicos obtenida exitosamente',
    })
    findAll(@Query() query: QueryMedicDto) {
      return this.medicsService.findAll(query);
    }
  
    @Get('active')
    @ApiOperation({ summary: 'Obtener solo médicos activos (sin paginación)' })
    @ApiResponse({
      status: 200,
      description: 'Lista de médicos activos obtenida exitosamente',
    })
    getActiveMedics() {
      return this.medicsService.getActiveMedics();
    }
  
    @Get('stats')
    @ApiOperation({ summary: 'Obtener estadísticas de médicos' })
    @ApiResponse({
      status: 200,
      description: 'Estadísticas de médicos obtenidas exitosamente',
    })
    getMedicStats() {
      return this.medicsService.getMedicStats();
    }
  
    @Get('identification/:identification')
    @ApiOperation({ summary: 'Obtener un médico por número de identificación' })
    @ApiParam({
      name: 'identification',
      description: 'Número de identificación del médico',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Médico encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Médico no encontrado',
    })
    findByIdentification(@Param('identification') identification: string) {
      return this.medicsService.findByIdentification(identification);
    }
  
    @Get('email/:email')
    @ApiOperation({ summary: 'Obtener un médico por email' })
    @ApiParam({
      name: 'email',
      description: 'Email del médico',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Médico encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Médico no encontrado',
    })
    findByEmail(@Param('email') email: string) {
      return this.medicsService.findByEmail(email);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un médico por ID' })
    @ApiParam({
      name: 'id',
      description: 'ID del médico',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Médico encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Médico no encontrado',
    })
    findOne(@Param('id') id: string) {
      return this.medicsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un médico' })
    @ApiParam({
      name: 'id',
      description: 'ID del médico',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Médico actualizado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Médico no encontrado',
    })
    @ApiResponse({
      status: 409,
      description: 'La identificación, email o número de registro ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Usuario no encontrado o ya asignado',
    })
    update(@Param('id') id: string, @Body() updateMedicDto: UpdateMedicDto) {
      return this.medicsService.update(id, updateMedicDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un médico' })
    @ApiParam({
      name: 'id',
      description: 'ID del médico',
      type: 'string',
    })
    @ApiResponse({
      status: 204,
      description: 'Médico eliminado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Médico no encontrado',
    })
    remove(@Param('id') id: string) {
      return this.medicsService.remove(id);
    }
  
    @Post(':id/convert-to-user')
    @ApiOperation({ 
      summary: 'Convertir médico en usuario del sistema',
      description: 'Crea automáticamente un usuario del sistema usando los datos del médico. La contraseña será su número de identificación.'
    })
    @ApiParam({
      name: 'id',
      description: 'ID del médico',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Médico convertido a usuario exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Médico no encontrado',
    })
    @ApiResponse({
      status: 409,
      description: 'Médico ya tiene cuenta de usuario o email ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Rol MEDIC no encontrado en el sistema',
    })
    convertToUser(@Param('id') id: string) {
      return this.medicsService.convertToUser(id);
    }
  
    @Delete(':id/remove-user')
    @ApiOperation({ summary: 'Remover usuario de un médico' })
    @ApiParam({
      name: 'id',
      description: 'ID del médico',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Usuario removido exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Médico no encontrado',
    })
    removeUser(@Param('id') id: string) {
      return this.medicsService.removeUser(id);
    }
  
    @Post('bulk')
    @ApiOperation({ summary: 'Crear múltiples médicos' })
    @ApiResponse({
      status: 201,
      description: 'Médicos creados exitosamente',
    })
    bulkCreate(@Body() medics: CreateMedicDto[]) {
      return this.medicsService.bulkCreate(medics);
    }
  }