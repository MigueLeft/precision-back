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
exports.RescueDirectoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rescue_directory_service_1 = require("./rescue-directory.service");
const create_rescue_directory_dto_1 = require("./dto/create-rescue-directory.dto");
const update_rescue_directory_dto_1 = require("./dto/update-rescue-directory.dto");
const query_rescue_directory_dto_1 = require("./dto/query-rescue-directory.dto");
const transform_interceptor_1 = require("../../common/interceptors/transform.interceptor");
let RescueDirectoryController = class RescueDirectoryController {
    rescueDirectoryService;
    constructor(rescueDirectoryService) {
        this.rescueDirectoryService = rescueDirectoryService;
    }
    create(createRescueDirectoryDto) {
        return this.rescueDirectoryService.create(createRescueDirectoryDto);
    }
    findAll(queryDto) {
        return this.rescueDirectoryService.findAll(queryDto);
    }
    getActiveEntries(queryDto) {
        return this.rescueDirectoryService.getActiveEntries(queryDto);
    }
    getHighPriorityEntries(queryDto) {
        return this.rescueDirectoryService.getHighPriorityEntries(queryDto);
    }
    getCriticalEntries(queryDto) {
        return this.rescueDirectoryService.getCriticalEntries(queryDto);
    }
    getByPatient(patientId, queryDto) {
        return this.rescueDirectoryService.getByPatient(patientId, queryDto);
    }
    findOne(id) {
        return this.rescueDirectoryService.findOne(id);
    }
    update(id, updateRescueDirectoryDto) {
        return this.rescueDirectoryService.update(id, updateRescueDirectoryDto);
    }
    reactivateEntry(id, body) {
        return this.rescueDirectoryService.reactivateEntry(id, body.reactivationNotes);
    }
    archiveEntry(id) {
        return this.rescueDirectoryService.archiveEntry(id);
    }
    remove(id) {
        return this.rescueDirectoryService.remove(id);
    }
};
exports.RescueDirectoryController = RescueDirectoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nueva entrada en directorio de rescate' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Entrada creada exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rescue_directory_dto_1.CreateRescueDirectoryDto]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las entradas del directorio de rescate' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de entradas obtenida' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_rescue_directory_dto_1.QueryRescueDirectoryDto]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener entradas activas del directorio' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de entradas activas' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_rescue_directory_dto_1.QueryRescueDirectoryDto]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "getActiveEntries", null);
__decorate([
    (0, common_1.Get)('high-priority'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener entradas de alta prioridad' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de entradas de alta prioridad' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_rescue_directory_dto_1.QueryRescueDirectoryDto]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "getHighPriorityEntries", null);
__decorate([
    (0, common_1.Get)('critical'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener entradas críticas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de entradas críticas' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_rescue_directory_dto_1.QueryRescueDirectoryDto]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "getCriticalEntries", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener entradas por paciente' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'ID del paciente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Entradas del paciente obtenidas' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_rescue_directory_dto_1.QueryRescueDirectoryDto]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "getByPatient", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener entrada por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la entrada' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Entrada obtenida' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar entrada del directorio' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la entrada' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Entrada actualizada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rescue_directory_dto_1.UpdateRescueDirectoryDto]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/reactivate'),
    (0, swagger_1.ApiOperation)({ summary: 'Reactivar entrada del directorio' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la entrada' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Entrada reactivada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "reactivateEntry", null);
__decorate([
    (0, common_1.Patch)(':id/archive'),
    (0, swagger_1.ApiOperation)({ summary: 'Archivar entrada del directorio' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la entrada' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Entrada archivada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "archiveEntry", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar entrada del directorio' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la entrada' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Entrada eliminada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RescueDirectoryController.prototype, "remove", null);
exports.RescueDirectoryController = RescueDirectoryController = __decorate([
    (0, swagger_1.ApiTags)('RescueDirectory'),
    (0, common_1.Controller)('rescue-directory'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [rescue_directory_service_1.RescueDirectoryService])
], RescueDirectoryController);
//# sourceMappingURL=rescue-directory.controller.js.map