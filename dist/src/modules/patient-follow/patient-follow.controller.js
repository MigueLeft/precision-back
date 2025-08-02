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
exports.PatientFollowController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patient_follow_service_1 = require("./patient-follow.service");
const create_patient_follow_dto_1 = require("./dto/create-patient-follow.dto");
const update_patient_follow_dto_1 = require("./dto/update-patient-follow.dto");
const query_patient_follow_dto_1 = require("./dto/query-patient-follow.dto");
const transform_interceptor_1 = require("../../common/interceptors/transform.interceptor");
let PatientFollowController = class PatientFollowController {
    patientFollowService;
    constructor(patientFollowService) {
        this.patientFollowService = patientFollowService;
    }
    create(createPatientFollowDto) {
        return this.patientFollowService.create(createPatientFollowDto);
    }
    findAll(queryDto) {
        return this.patientFollowService.findAll(queryDto);
    }
    getPendingFollowUps() {
        return this.patientFollowService.getPendingFollowUps();
    }
    getByPatient(patientId, queryDto) {
        return this.patientFollowService.getByPatient(patientId, queryDto);
    }
    findOne(id) {
        return this.patientFollowService.findOne(id);
    }
    update(id, updatePatientFollowDto) {
        return this.patientFollowService.update(id, updatePatientFollowDto);
    }
    incrementAttemptCount(id) {
        return this.patientFollowService.incrementAttemptCount(id);
    }
    remove(id) {
        return this.patientFollowService.remove(id);
    }
};
exports.PatientFollowController = PatientFollowController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nuevo seguimiento de paciente' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Seguimiento creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_follow_dto_1.CreatePatientFollowDto]),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los seguimientos con filtros' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de seguimientos obtenida' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_patient_follow_dto_1.QueryPatientFollowDto]),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener seguimientos pendientes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de seguimientos pendientes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "getPendingFollowUps", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener seguimientos por paciente' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'ID del paciente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Seguimientos del paciente obtenidos' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_patient_follow_dto_1.QueryPatientFollowDto]),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "getByPatient", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener seguimiento por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del seguimiento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Seguimiento obtenido' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar seguimiento' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del seguimiento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Seguimiento actualizado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_patient_follow_dto_1.UpdatePatientFollowDto]),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/increment-attempt'),
    (0, swagger_1.ApiOperation)({ summary: 'Incrementar contador de intentos' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del seguimiento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contador incrementado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "incrementAttemptCount", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar seguimiento' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del seguimiento' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Seguimiento eliminado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientFollowController.prototype, "remove", null);
exports.PatientFollowController = PatientFollowController = __decorate([
    (0, swagger_1.ApiTags)('PatientFollow'),
    (0, common_1.Controller)('patient-follow'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [patient_follow_service_1.PatientFollowService])
], PatientFollowController);
//# sourceMappingURL=patient-follow.controller.js.map