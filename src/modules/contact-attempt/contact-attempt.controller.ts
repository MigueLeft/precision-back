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
import { ContactAttemptService } from './contact-attempt.service';
import { CreateContactAttemptDto } from './dto/create-contact-attempt.dto';
import { UpdateContactAttemptDto } from './dto/update-contact-attempt.dto';
import { QueryContactAttemptDto } from './dto/query-contact-attempt.dto';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';

@ApiTags('ContactAttempt')
@Controller('contact-attempt')
@UseInterceptors(TransformInterceptor)
export class ContactAttemptController {
  constructor(private readonly contactAttemptService: ContactAttemptService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo intento de contacto' })
  @ApiResponse({ status: 201, description: 'Intento de contacto creado exitosamente' })
  create(@Body() createContactAttemptDto: CreateContactAttemptDto) {
    return this.contactAttemptService.create(createContactAttemptDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los intentos de contacto con filtros' })
  @ApiResponse({ status: 200, description: 'Lista de intentos de contacto obtenida' })
  findAll(@Query() queryDto: QueryContactAttemptDto) {
    return this.contactAttemptService.findAll(queryDto);
  }

  @Get('successful')
  @ApiOperation({ summary: 'Obtener intentos de contacto exitosos' })
  @ApiResponse({ status: 200, description: 'Lista de intentos exitosos' })
  getSuccessfulAttempts(@Query() queryDto: QueryContactAttemptDto) {
    return this.contactAttemptService.getSuccessfulAttempts(queryDto);
  }

  @Get('failed')
  @ApiOperation({ summary: 'Obtener intentos de contacto fallidos' })
  @ApiResponse({ status: 200, description: 'Lista de intentos fallidos' })
  getFailedAttempts(@Query() queryDto: QueryContactAttemptDto) {
    return this.contactAttemptService.getFailedAttempts(queryDto);
  }

  @Get('with-appointments')
  @ApiOperation({ summary: 'Obtener intentos que generaron citas' })
  @ApiResponse({ status: 200, description: 'Lista de intentos con citas' })
  getAttemptsWithAppointments(@Query() queryDto: QueryContactAttemptDto) {
    return this.contactAttemptService.getAttemptsWithAppointments(queryDto);
  }

  @Get('follow-up/:followUpId')
  @ApiOperation({ summary: 'Obtener intentos por seguimiento' })
  @ApiParam({ name: 'followUpId', description: 'ID del seguimiento' })
  @ApiResponse({ status: 200, description: 'Intentos del seguimiento obtenidos' })
  getByFollowUp(
    @Param('followUpId') followUpId: string,
    @Query() queryDto: QueryContactAttemptDto,
  ) {
    return this.contactAttemptService.getByFollowUp(followUpId, queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener intento de contacto por ID' })
  @ApiParam({ name: 'id', description: 'ID del intento de contacto' })
  @ApiResponse({ status: 200, description: 'Intento de contacto obtenido' })
  findOne(@Param('id') id: string) {
    return this.contactAttemptService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar intento de contacto' })
  @ApiParam({ name: 'id', description: 'ID del intento de contacto' })
  @ApiResponse({ status: 200, description: 'Intento de contacto actualizado' })
  update(
    @Param('id') id: string,
    @Body() updateContactAttemptDto: UpdateContactAttemptDto,
  ) {
    return this.contactAttemptService.update(id, updateContactAttemptDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar intento de contacto' })
  @ApiParam({ name: 'id', description: 'ID del intento de contacto' })
  @ApiResponse({ status: 204, description: 'Intento de contacto eliminado' })
  remove(@Param('id') id: string) {
    return this.contactAttemptService.remove(id);
  }
}