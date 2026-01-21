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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const appointments_service_1 = require("./appointments.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
const query_appointment_dto_1 = require("./dto/query-appointment.dto");
let AppointmentsController = class AppointmentsController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    create(createAppointmentDto) {
        return this.appointmentsService.create(createAppointmentDto);
    }
    findAll(query) {
        return this.appointmentsService.findAll(query);
    }
    findAppointmentDates() {
        return this.appointmentsService.findAppointmentDates();
    }
    getAppointmentStats() {
        return this.appointmentsService.getAppointmentStats();
    }
    findOne(id) {
        return this.appointmentsService.findOne(id);
    }
    update(id, updateAppointmentDto) {
        return this.appointmentsService.update(id, updateAppointmentDto);
    }
    remove(id) {
        return this.appointmentsService.remove(id);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva cita' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Cita creada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El paciente o médico no encontrado',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las citas con paginación y filtros' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de citas obtenida exitosamente',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_appointment_dto_1.QueryAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dates'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todas las fechas únicas donde existen citas',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de fechas únicas con citas',
        schema: {
            type: 'array',
            items: {
                type: 'string',
                format: 'date',
                example: '2025-10-18',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findAppointmentDates", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener estadísticas de citas' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Estadísticas de citas obtenidas exitosamente',
        schema: {
            type: 'object',
            properties: {
                total: {
                    type: 'number',
                    description: 'Total de citas',
                    example: 150,
                },
                today: {
                    type: 'number',
                    description: 'Citas del día de hoy',
                    example: 5,
                },
                upcoming: {
                    type: 'number',
                    description: 'Citas en los próximos 7 días',
                    example: 20,
                },
                pending: {
                    type: 'number',
                    description: 'Citas pendientes',
                    example: 30,
                },
                completed: {
                    type: 'number',
                    description: 'Citas completadas',
                    example: 80,
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getAppointmentStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una cita por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la cita',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cita encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cita no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una cita' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la cita',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cita actualizada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cita no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_dto_1.UpdateAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una cita' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la cita',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Cita eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cita no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "remove", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, swagger_1.ApiTags)('Appointments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map