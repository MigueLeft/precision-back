"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_service_1 = require("./roles.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const query_role_dto_1 = require("./dto/query-role.dto");
const assign_permissions_dto_1 = require("./dto/assign-permissions.dto");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    create(createRoleDto) {
        return this.rolesService.create(createRoleDto);
    }
    findAll(query) {
        return this.rolesService.findAll(query);
    }
    findOne(id) {
        return this.rolesService.findOne(id);
    }
    findByName(name) {
        return this.rolesService.findByName(name);
    }
    update(id, updateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }
    remove(id) {
        return this.rolesService.remove(id);
    }
    assignPermissions(id, assignPermissionsDto) {
        return this.rolesService.assignPermissions(id, assignPermissionsDto);
    }
    removePermissions(id, assignPermissionsDto) {
        return this.rolesService.removePermissions(id, assignPermissionsDto.permissionIds);
    }
    getRolePermissions(id) {
        return this.rolesService.getRolePermissions(id);
    }
    bulkCreate(roles) {
        return this.rolesService.bulkCreate(roles);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo rol' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Rol creado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El nombre del rol ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Permisos no encontrados',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los roles con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de roles obtenida exitosamente',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_role_dto_1.QueryRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un rol por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del rol',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Rol encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rol no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un rol por nombre' }),
    (0, swagger_1.ApiParam)({
        name: 'name',
        description: 'Nombre del rol',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Rol encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rol no encontrado',
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un rol' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del rol',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Rol actualizado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rol no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El nombre del rol ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Permisos no encontrados',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un rol' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del rol',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Rol eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rol no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'No se puede eliminar un rol con usuarios asignados',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Asignar permisos a un rol' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del rol',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permisos asignados exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rol no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Permisos no encontrados',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, assign_permissions_dto_1.AssignPermissionsDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "assignPermissions", null);
__decorate([
    (0, common_1.Delete)(':id/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover permisos de un rol' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del rol',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permisos removidos exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rol no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, assign_permissions_dto_1.AssignPermissionsDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "removePermissions", null);
__decorate([
    (0, common_1.Get)(':id/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener permisos de un rol' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del rol',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permisos del rol obtenidos exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rol no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "getRolePermissions", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear múltiples roles' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Roles creados exitosamente',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "bulkCreate", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map