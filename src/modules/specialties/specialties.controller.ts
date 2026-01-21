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
} from '@nestjs/swagger';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { QuerySpecialtyDto } from './dto/query-specialty.dto';

@ApiTags('Specialties')
@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una nueva especialidad médica',
    description: 'Crea una nueva especialidad médica en el sistema',
  })
  @ApiResponse({
    status: 201,
    description: 'Especialidad creada exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una especialidad con este nombre',
  })
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de especialidades médicas',
    description:
      'Obtiene una lista paginada de especialidades médicas con filtros opcionales',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de especialidades obtenida exitosamente',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Elementos por página',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Término de búsqueda',
  })
  @ApiQuery({
    name: 'active',
    required: false,
    description: 'Filtrar por estado activo',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Campo para ordenar',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Orden de clasificación',
  })
  findAll(@Query() queryDto: QuerySpecialtyDto) {
    return this.specialtiesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una especialidad por ID',
    description:
      'Obtiene los detalles de una especialidad específica por su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de la especialidad' })
  @ApiResponse({
    status: 200,
    description: 'Especialidad encontrada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Especialidad no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.specialtiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una especialidad',
    description: 'Actualiza los datos de una especialidad existente',
  })
  @ApiParam({ name: 'id', description: 'ID de la especialidad' })
  @ApiResponse({
    status: 200,
    description: 'Especialidad actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Especialidad no encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una especialidad con este nombre',
  })
  update(
    @Param('id') id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ) {
    return this.specialtiesService.update(id, updateSpecialtyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar una especialidad',
    description:
      'Elimina una especialidad del sistema (solo si no tiene médicos asociados)',
  })
  @ApiParam({ name: 'id', description: 'ID de la especialidad' })
  @ApiResponse({
    status: 200,
    description: 'Especialidad eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Especialidad no encontrada',
  })
  @ApiResponse({
    status: 409,
    description:
      'No se puede eliminar una especialidad que tiene médicos asociados',
  })
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(id);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: 'Buscar especialidad por nombre',
    description: 'Busca una especialidad específica por su nombre',
  })
  @ApiParam({ name: 'name', description: 'Nombre de la especialidad' })
  @ApiResponse({
    status: 200,
    description: 'Especialidad encontrada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Especialidad no encontrada',
  })
  findByName(@Param('name') name: string) {
    return this.specialtiesService.findByName(name);
  }
}
