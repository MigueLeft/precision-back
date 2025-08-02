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
exports.ConsultationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const consultations_service_1 = require("./consultations.service");
const create_consultation_dto_1 = require("./dto/create-consultation.dto");
const update_consultation_dto_1 = require("./dto/update-consultation.dto");
const query_consultation_dto_1 = require("./dto/query-consultation.dto");
let ConsultationsController = class ConsultationsController {
    consultationService;
    constructor(consultationService) {
        this.consultationService = consultationService;
    }
    create(createConsultationDto) {
        return this.consultationService.create(createConsultationDto);
    }
    findAll(queryDto) {
        return this.consultationService.findAll(queryDto);
    }
    findOne(id) {
        return this.consultationService.findOne(id);
    }
    findByAppointmentId(appointmentId) {
        return this.consultationService.findByAppointmentId(appointmentId);
    }
    update(id, updateConsultationDto) {
        return this.consultationService.update(id, updateConsultationDto);
    }
    remove(id) {
        return this.consultationService.remove(id);
    }
};
exports.ConsultationsController = ConsultationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear nueva consulta',
        description: 'Crea una nueva consulta médica asociada a una cita existente'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Consulta creada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos o ya existe una consulta para esta cita',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'La cita o usuario especificado no existe',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consultation_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener lista de consultas',
        description: 'Obtiene una lista paginada de consultas con filtros opcionales'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de consultas obtenida exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Parámetros de consulta inválidos',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_consultation_dto_1.QueryConsultationDto]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener consulta por ID',
        description: 'Obtiene los detalles de una consulta específica por su ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID único de la consulta',
        example: 'clm123abc456def'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Consulta encontrada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Consulta no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('appointment/:appointmentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener consulta por ID de cita',
        description: 'Obtiene la consulta asociada a una cita específica'
    }),
    (0, swagger_1.ApiParam)({
        name: 'appointmentId',
        description: 'ID único de la cita',
        example: 'clm789xyz123abc'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Consulta encontrada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No se encontró consulta para esta cita',
    }),
    __param(0, (0, common_1.Param)('appointmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findByAppointmentId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar consulta',
        description: 'Actualiza los datos de una consulta existente'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID único de la consulta',
        example: 'clm123abc456def'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Consulta actualizada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Consulta no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_consultation_dto_1.UpdateConsultationDto]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar consulta',
        description: 'Elimina una consulta (soft delete - marca como inactiva)'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID único de la consulta',
        example: 'clm123abc456def'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Consulta eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Consulta no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "remove", null);
exports.ConsultationsController = ConsultationsController = __decorate([
    (0, swagger_1.ApiTags)('Consultas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('consultations'),
    __metadata("design:paramtypes", [consultations_service_1.ConsultationsService])
], ConsultationsController);
//# sourceMappingURL=consultations.controller.js.map