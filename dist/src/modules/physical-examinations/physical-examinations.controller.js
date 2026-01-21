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
exports.PhysicalExaminationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const physical_examinations_service_1 = require("./physical-examinations.service");
const create_physical_examination_dto_1 = require("./dto/create-physical-examination.dto");
const update_physical_examination_dto_1 = require("./dto/update-physical-examination.dto");
const query_physical_examinations_dto_1 = require("./dto/query-physical-examinations.dto");
const assign_patient_examination_dto_1 = require("./dto/assign-patient-examination.dto");
const upsert_patient_physical_exam_dto_1 = require("./dto/upsert-patient-physical-exam.dto");
let PhysicalExaminationsController = class PhysicalExaminationsController {
    physicalExaminationsService;
    constructor(physicalExaminationsService) {
        this.physicalExaminationsService = physicalExaminationsService;
    }
    create(createPhysicalExaminationDto) {
        return this.physicalExaminationsService.create(createPhysicalExaminationDto);
    }
    findAll(query) {
        return this.physicalExaminationsService.findAll(query);
    }
    findOne(id) {
        return this.physicalExaminationsService.findOne(id);
    }
    update(id, updatePhysicalExaminationDto) {
        return this.physicalExaminationsService.update(id, updatePhysicalExaminationDto);
    }
    remove(id) {
        return this.physicalExaminationsService.remove(id);
    }
    assignToPatient(assignDto) {
        return this.physicalExaminationsService.assignToPatient(assignDto);
    }
    getPatientExaminations(patientId) {
        return this.physicalExaminationsService.getPatientExaminations(patientId);
    }
    getPatientExaminationHistory(patientId) {
        return this.physicalExaminationsService.getPatientExaminationHistory(patientId);
    }
    createAndAssignToPatient(patientId, examinationDate, notes, createDto) {
        return this.physicalExaminationsService.createAndAssignToPatient(patientId, createDto, examinationDate, notes);
    }
    removePatientExamination(patientId, examinationId, examinationDate) {
        return this.physicalExaminationsService.removePatientExamination(patientId, examinationId, examinationDate);
    }
    upsertPatientPhysicalExam(patientId, dto) {
        return this.physicalExaminationsService.upsertPatientPhysicalExam(patientId, dto);
    }
    getLatestPatientExam(patientId) {
        return this.physicalExaminationsService.getLatestPatientExam(patientId);
    }
};
exports.PhysicalExaminationsController = PhysicalExaminationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo examen físico' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Examen físico creado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_physical_examination_dto_1.CreatePhysicalExaminationDto]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener lista de exámenes físicos con filtros y paginación',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de exámenes físicos obtenida exitosamente',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_physical_examinations_dto_1.QueryPhysicalExaminationsDto]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un examen físico por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del examen físico',
        example: 'uuid-del-examen-fisico',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Examen físico encontrado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Examen físico no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un examen físico' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del examen físico',
        example: 'uuid-del-examen-fisico',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Examen físico actualizado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Examen físico no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_physical_examination_dto_1.UpdatePhysicalExaminationDto]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un examen físico' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del examen físico',
        example: 'uuid-del-examen-fisico',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Examen físico eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Examen físico no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('assign-patient'),
    (0, swagger_1.ApiOperation)({ summary: 'Asignar un examen físico a un paciente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Examen físico asignado al paciente exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente o examen físico no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El examen ya está asignado a este paciente en esta fecha',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_patient_examination_dto_1.AssignPatientExaminationDto]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "assignToPatient", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los exámenes físicos de un paciente',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
        example: 'uuid-del-paciente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Exámenes físicos del paciente obtenidos exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "getPatientExaminations", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/history'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener historial completo de exámenes físicos de un paciente',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
        example: 'uuid-del-paciente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Historial de exámenes físicos del paciente obtenido exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "getPatientExaminationHistory", null);
__decorate([
    (0, common_1.Post)('patient/:patientId/create-and-assign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear un examen físico y asignarlo directamente a un paciente',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
        example: 'uuid-del-paciente',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'examinationDate',
        description: 'Fecha del examen (ISO string)',
        example: '2024-09-26T10:30:00.000Z',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'notes',
        description: 'Notas del examen',
        required: false,
        example: 'Examen de rutina',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Examen físico creado y asignado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)('examinationDate')),
    __param(2, (0, common_1.Query)('notes')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, create_physical_examination_dto_1.CreatePhysicalExaminationDto]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "createAndAssignToPatient", null);
__decorate([
    (0, common_1.Delete)('patient/:patientId/:examinationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover un examen físico de un paciente' }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
        example: 'uuid-del-paciente',
    }),
    (0, swagger_1.ApiParam)({
        name: 'examinationId',
        description: 'ID del examen físico',
        example: 'uuid-del-examen-fisico',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'examinationDate',
        description: 'Fecha del examen (ISO string)',
        example: '2024-09-26T10:30:00.000Z',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Examen físico removido del paciente exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Relación paciente-examen no encontrada',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('examinationId')),
    __param(2, (0, common_1.Query)('examinationDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "removePatientExamination", null);
__decorate([
    (0, common_1.Post)('patients/:patientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear/actualizar examen físico de un paciente',
        description: 'Crea un nuevo registro de examen físico. Solo los campos enviados serán establecidos, los demás permanecerán como null.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Examen físico creado exitosamente.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Paciente no encontrado.' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upsert_patient_physical_exam_dto_1.UpsertPatientPhysicalExamDto]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "upsertPatientPhysicalExam", null);
__decorate([
    (0, common_1.Get)('patients/:patientId/latest'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener el último examen físico de un paciente' }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Último examen físico obtenido' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No se encontraron exámenes' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhysicalExaminationsController.prototype, "getLatestPatientExam", null);
exports.PhysicalExaminationsController = PhysicalExaminationsController = __decorate([
    (0, swagger_1.ApiTags)('Physical Examinations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('physical-examinations'),
    __metadata("design:paramtypes", [physical_examinations_service_1.PhysicalExaminationsService])
], PhysicalExaminationsController);
//# sourceMappingURL=physical-examinations.controller.js.map