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
exports.ReschedulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reschedules_service_1 = require("./reschedules.service");
const create_reschedule_dto_1 = require("./dto/create-reschedule.dto");
const update_reschedule_dto_1 = require("./dto/update-reschedule.dto");
const query_reschedule_dto_1 = require("./dto/query-reschedule.dto");
let ReschedulesController = class ReschedulesController {
    reschedulesService;
    constructor(reschedulesService) {
        this.reschedulesService = reschedulesService;
    }
    create(createRescheduleDto) {
        return this.reschedulesService.create(createRescheduleDto);
    }
    findAll(query) {
        return this.reschedulesService.findAll(query);
    }
    findOne(id) {
        return this.reschedulesService.findOne(id);
    }
    update(id, updateRescheduleDto) {
        return this.reschedulesService.update(id, updateRescheduleDto);
    }
    remove(id) {
        return this.reschedulesService.remove(id);
    }
    findByAppointment(appointmentId) {
        return this.reschedulesService.findByAppointment(appointmentId);
    }
};
exports.ReschedulesController = ReschedulesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva reprogramación de cita' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Reprogramación creada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cita no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflicto con el nuevo horario',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reschedule_dto_1.CreateRescheduleDto]),
    __metadata("design:returntype", void 0)
], ReschedulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todas las reprogramaciones con paginación y filtros',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de reprogramaciones obtenida exitosamente',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_reschedule_dto_1.QueryRescheduleDto]),
    __metadata("design:returntype", void 0)
], ReschedulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una reprogramación por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la reprogramación',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reprogramación encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Reprogramación no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReschedulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una reprogramación' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la reprogramación',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reprogramación actualizada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Reprogramación no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reschedule_dto_1.UpdateRescheduleDto]),
    __metadata("design:returntype", void 0)
], ReschedulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una reprogramación (soft delete)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la reprogramación',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Reprogramación eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Reprogramación no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReschedulesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('appointment/:appointmentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todas las reprogramaciones de una cita específica',
    }),
    (0, swagger_1.ApiParam)({
        name: 'appointmentId',
        description: 'ID de la cita',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de reprogramaciones de la cita obtenida exitosamente',
    }),
    __param(0, (0, common_1.Param)('appointmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReschedulesController.prototype, "findByAppointment", null);
exports.ReschedulesController = ReschedulesController = __decorate([
    (0, swagger_1.ApiTags)('Reschedules'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('reschedules'),
    __metadata("design:paramtypes", [reschedules_service_1.ReschedulesService])
], ReschedulesController);
//# sourceMappingURL=reschedules.controller.js.map