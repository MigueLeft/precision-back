// src/modules/roles/roles.controller.ts
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
    ApiBearerAuth,
  } from '@nestjs/swagger';
  import { RolesService } from './roles.service';
  import { CreateRoleDto } from './dto/create-role.dto'; 
  import { UpdateRoleDto } from './dto/update-role.dto'; 
  import { QueryRoleDto } from './dto/query-role.dto'; 
  import { AssignPermissionsDto } from './dto/assign-permissions.dto';
  
  @ApiTags('roles')
  @ApiBearerAuth()
  @Controller('roles')
  export class RolesController {
    constructor(private readonly rolesService: RolesService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiResponse({
      status: 201,
      description: 'Rol creado exitosamente',
    })
    @ApiResponse({
      status: 409,
      description: 'El nombre del rol ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Permisos no encontrados',
    })
    create(@Body() createRoleDto: CreateRoleDto) {
      return this.rolesService.create(createRoleDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todos los roles con paginación' })
    @ApiResponse({
      status: 200,
      description: 'Lista de roles obtenida exitosamente',
    })
    findAll(@Query() query: QueryRoleDto) {
      return this.rolesService.findAll(query);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un rol por ID' })
    @ApiParam({
      name: 'id',
      description: 'ID del rol',
      type: 'number',
    })
    @ApiResponse({
      status: 200,
      description: 'Rol encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Rol no encontrado',
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.rolesService.findOne(id);
    }
  
    @Get('name/:name')
    @ApiOperation({ summary: 'Obtener un rol por nombre' })
    @ApiParam({
      name: 'name',
      description: 'Nombre del rol',
      type: 'string',
    })
    @ApiResponse({
      status: 200,
      description: 'Rol encontrado',
    })
    @ApiResponse({
      status: 404,
      description: 'Rol no encontrado',
    })
    findByName(@Param('name') name: string) {
      return this.rolesService.findByName(name);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un rol' })
    @ApiParam({
      name: 'id',
      description: 'ID del rol',
      type: 'number',
    })
    @ApiResponse({
      status: 200,
      description: 'Rol actualizado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Rol no encontrado',
    })
    @ApiResponse({
      status: 409,
      description: 'El nombre del rol ya existe',
    })
    @ApiResponse({
      status: 400,
      description: 'Permisos no encontrados',
    })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateRoleDto: UpdateRoleDto,
    ) {
      return this.rolesService.update(id, updateRoleDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un rol' })
    @ApiParam({
      name: 'id',
      description: 'ID del rol',
      type: 'number',
    })
    @ApiResponse({
      status: 204,
      description: 'Rol eliminado exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Rol no encontrado',
    })
    @ApiResponse({
      status: 409,
      description: 'No se puede eliminar un rol con usuarios asignados',
    })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.rolesService.remove(id);
    }
  
    @Post(':id/permissions')
    @ApiOperation({ summary: 'Asignar permisos a un rol' })
    @ApiParam({
      name: 'id',
      description: 'ID del rol',
      type: 'number',
    })
    @ApiResponse({
      status: 200,
      description: 'Permisos asignados exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Rol no encontrado',
    })
    @ApiResponse({
      status: 400,
      description: 'Permisos no encontrados',
    })
    assignPermissions(
      @Param('id', ParseIntPipe) id: number,
      @Body() assignPermissionsDto: AssignPermissionsDto,
    ) {
      return this.rolesService.assignPermissions(id, assignPermissionsDto);
    }
  
    @Delete(':id/permissions')
    @ApiOperation({ summary: 'Remover permisos de un rol' })
    @ApiParam({
      name: 'id',
      description: 'ID del rol',
      type: 'number',
    })
    @ApiResponse({
      status: 200,
      description: 'Permisos removidos exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Rol no encontrado',
    })
    removePermissions(
      @Param('id', ParseIntPipe) id: number,
      @Body() assignPermissionsDto: AssignPermissionsDto,
    ) {
      return this.rolesService.removePermissions(id, assignPermissionsDto.permissionIds);
    }
  
    @Get(':id/permissions')
    @ApiOperation({ summary: 'Obtener permisos de un rol' })
    @ApiParam({
      name: 'id',
      description: 'ID del rol',
      type: 'number',
    })
    @ApiResponse({
      status: 200,
      description: 'Permisos del rol obtenidos exitosamente',
    })
    @ApiResponse({
      status: 404,
      description: 'Rol no encontrado',
    })
    getRolePermissions(@Param('id', ParseIntPipe) id: number) {
      return this.rolesService.getRolePermissions(id);
    }
  
    @Post('bulk')
    @ApiOperation({ summary: 'Crear múltiples roles' })
    @ApiResponse({
      status: 201,
      description: 'Roles creados exitosamente',
    })
    bulkCreate(@Body() roles: CreateRoleDto[]) {
      return this.rolesService.bulkCreate(roles);
    }
  }