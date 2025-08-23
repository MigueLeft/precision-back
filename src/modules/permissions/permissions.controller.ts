// src/modules/permissions/permissions.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
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
  import { PermissionsService } from './permissions.service';
  import { CreatePermissionDto } from './dto/create-permission.dto'; 
  import { UpdatePermissionDto } from './dto/update-permission.dto';
  import { QueryPermissionDto } from './dto/query-permission.dto';
  
  @ApiTags('Permissions')
  @ApiBearerAuth()
  @Controller('permissions')
  export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo permiso' })
    @ApiResponse({
      status: 201,
      description: 'Permiso creado exitosamente',
    })
    @ApiResponse({
      status: 409,
      description: 'El nombre del permiso ya existe',
    })
    create(@Body() createPermissionDto: CreatePermissionDto) {
      return this.permissionsService.create(createPermissionDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todos los permisos con paginación' })
    @ApiResponse({
      status: 200,
      description: 'Lista de permisos obtenida exitosamente',
    })
    findAll(@Query() query: QueryPermissionDto) {
      return this.permissionsService.findAll(query);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un permiso por ID' })
    @ApiParam({
      name: 'id',
      description: 'ID del permiso',
      type: 'number',
    })
    @ApiResponse({
      status: 200,
      description: 'Permiso encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Permiso no encontrado',
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.permissionsService.findOne(id);
    }
  
    @Get('name/:name')
    @ApiOperation({ summary: 'Obtener un permiso por nombre' })
    @ApiParam({
      name: 'name',
      description: 'Nombre del permiso',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Permiso encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Permiso no encontrado',
    })
    findByName(@Param('name') name: string) {
      return this.permissionsService.findByName(name);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un permiso' })
    @ApiParam({
      name: 'id',
      description: 'ID del permiso',
      type: 'number',
    })
    @ApiResponse({
      status: 200,
      description: 'Permiso actualizado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Permiso no encontrado',
    })
    @ApiResponse({
      status: 409,
      description: 'El nombre del permiso ya existe',
    })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePermissionDto: UpdatePermissionDto,
    ) {
      return this.permissionsService.update(id, updatePermissionDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un permiso' })
    @ApiParam({
      name: 'id',
      description: 'ID del permiso',
      type: 'number',
    })
    @ApiResponse({
      status: 204,
      description: 'Permiso eliminado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Permiso no encontrado',
    })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.permissionsService.remove(id);
    }
  
    @Post('bulk')
    @ApiOperation({ summary: 'Crear múltiples permisos' })
    @ApiResponse({
      status: 201,
      description: 'Permisos creados exitosamente',
    })
    bulkCreate(@Body() permissions: CreatePermissionDto[]) {
      return this.permissionsService.bulkCreate(permissions);
    }
  }