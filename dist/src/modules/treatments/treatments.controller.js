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
exports.TreatmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const treatments_service_1 = require("./treatments.service");
const create_treatment_dto_1 = require("./dto/create-treatment.dto");
const update_treatment_dto_1 = require("./dto/update-treatment.dto");
const query_treatment_dto_1 = require("./dto/query-treatment.dto");
const add_batch_treatments_dto_1 = require("./dto/add-batch-treatments.dto");
let TreatmentsController = class TreatmentsController {
    treatmentsService;
    constructor(treatmentsService) {
        this.treatmentsService = treatmentsService;
    }
    create(createTreatmentDto) {
        return this.treatmentsService.create(createTreatmentDto);
    }
    findAll(queryDto) {
        return this.treatmentsService.findAll(queryDto);
    }
    findByPatient(patientId, status) {
        return this.treatmentsService.findByPatient(patientId, status);
    }
    getCurrentTreatments(patientId) {
        return this.treatmentsService.getCurrentTreatments(patientId);
    }
    getPreviousTreatments(patientId) {
        return this.treatmentsService.getPreviousTreatments(patientId);
    }
    findOne(id) {
        return this.treatmentsService.findOne(id);
    }
    update(id, updateTreatmentDto) {
        return this.treatmentsService.update(id, updateTreatmentDto);
    }
    changeStatus(id, status) {
        return this.treatmentsService.changeStatus(id, status);
    }
    remove(id) {
        return this.treatmentsService.remove(id);
    }
    hardDelete(id) {
        return this.treatmentsService.hardDelete(id);
    }
    addBatchTreatments(dto) {
        return this.treatmentsService.addBatchTreatments(dto);
    }
};
exports.TreatmentsController = TreatmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new treatment',
        description: 'Create a new medication/treatment for a patient',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Treatment created successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Patient not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_treatment_dto_1.CreateTreatmentDto]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all treatments with pagination and filters',
        description: 'Retrieve treatments with optional filters by patient, status, etc.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treatments retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_treatment_dto_1.QueryTreatmentDto]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all treatments for a specific patient',
        description: 'Retrieve all active treatments for a patient',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'Patient ID (CUID)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: ['actual', 'previo'],
        description: 'Filter by treatment status',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treatments retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/current'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current treatments for a patient',
        description: 'Retrieve only active current treatments',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'Patient ID (CUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Current treatments retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "getCurrentTreatments", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/previous'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get previous treatments for a patient',
        description: 'Retrieve treatment history',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'Patient ID (CUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Previous treatments retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "getPreviousTreatments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a treatment by ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Treatment ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treatment found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treatment not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a treatment',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Treatment ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treatment updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treatment not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_treatment_dto_1.UpdateTreatmentDto]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Change treatment status',
        description: 'Change status between "actual" and "previo"',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Treatment ID (UUID)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enum: ['actual', 'previo'],
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treatment status changed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treatment not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Soft delete a treatment',
        description: 'Mark treatment as inactive (soft delete)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Treatment ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treatment deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treatment not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/hard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Permanently delete a treatment',
        description: 'Hard delete - removes treatment from database permanently',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Treatment ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treatment permanently deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treatment not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "hardDelete", null);
__decorate([
    (0, common_1.Post)('batch'),
    (0, swagger_1.ApiOperation)({
        summary: 'Agregar múltiples tratamientos/medicamentos a un paciente de una sola vez',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tratamientos agregados exitosamente.',
        schema: {
            type: 'object',
            properties: {
                patientId: { type: 'string' },
                treatmentsAdded: { type: 'number' },
                treatments: { type: 'array' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_batch_treatments_dto_1.AddBatchTreatmentsDto]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "addBatchTreatments", null);
exports.TreatmentsController = TreatmentsController = __decorate([
    (0, swagger_1.ApiTags)('Treatments'),
    (0, common_1.Controller)('treatments'),
    __metadata("design:paramtypes", [treatments_service_1.TreatmentsService])
], TreatmentsController);
//# sourceMappingURL=treatments.controller.js.map