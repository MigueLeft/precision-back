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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const permissions_service_1 = require("./permissions.service");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const update_permission_dto_1 = require("./dto/update-permission.dto");
const query_permission_dto_1 = require("./dto/query-permission.dto");
let PermissionsController = class PermissionsController {
    permissionsService;
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    create(createPermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }
    findAll(query) {
        return this.permissionsService.findAll(query);
    }
    findOne(id) {
        return this.permissionsService.findOne(id);
    }
    findByName(name) {
        return this.permissionsService.findByName(name);
    }
    update(id, updatePermissionDto) {
        return this.permissionsService.update(id, updatePermissionDto);
    }
    remove(id) {
        return this.permissionsService.remove(id);
    }
    bulkCreate(permissions) {
        return this.permissionsService.bulkCreate(permissions);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo permiso' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Permiso creado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El nombre del permiso ya existe',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los permisos con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de permisos obtenida exitosamente',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_permission_dto_1.QueryPermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un permiso por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del permiso',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permiso encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Permiso no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un permiso por nombre' }),
    (0, swagger_1.ApiParam)({
        name: 'name',
        description: 'Nombre del permiso',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permiso encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Permiso no encontrado',
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un permiso' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del permiso',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permiso actualizado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Permiso no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El nombre del permiso ya existe',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un permiso' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del permiso',
        type: 'number',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Permiso eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Permiso no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear múltiples permisos' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Permisos creados exitosamente',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "bulkCreate", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, swagger_1.ApiTags)('permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map