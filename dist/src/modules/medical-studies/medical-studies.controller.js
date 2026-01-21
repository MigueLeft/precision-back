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
exports.MedicalStudiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medical_studies_service_1 = require("./medical-studies.service");
const create_medical_study_dto_1 = require("./dto/create-medical-study.dto");
const update_medical_study_dto_1 = require("./dto/update-medical-study.dto");
const query_medical_study_dto_1 = require("./dto/query-medical-study.dto");
let MedicalStudiesController = class MedicalStudiesController {
    medicalStudiesService;
    constructor(medicalStudiesService) {
        this.medicalStudiesService = medicalStudiesService;
    }
    create(createMedicalStudyDto) {
        return this.medicalStudiesService.create(createMedicalStudyDto);
    }
    findAll(queryDto) {
        return this.medicalStudiesService.findAll(queryDto);
    }
    findByPatient(patientId, studyType) {
        return this.medicalStudiesService.findByPatient(patientId, studyType);
    }
    getPendingStudies(patientId) {
        return this.medicalStudiesService.getPendingStudies(patientId);
    }
    getCompletedStudies(patientId) {
        return this.medicalStudiesService.getCompletedStudies(patientId);
    }
    getStudiesByType(patientId, studyType) {
        return this.medicalStudiesService.getStudiesByType(patientId, studyType);
    }
    findOne(id) {
        return this.medicalStudiesService.findOne(id);
    }
    update(id, updateMedicalStudyDto) {
        return this.medicalStudiesService.update(id, updateMedicalStudyDto);
    }
    changeStatus(id, status) {
        return this.medicalStudiesService.changeStatus(id, status);
    }
    remove(id) {
        return this.medicalStudiesService.remove(id);
    }
    hardDelete(id) {
        return this.medicalStudiesService.hardDelete(id);
    }
};
exports.MedicalStudiesController = MedicalStudiesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new medical study',
        description: 'Create a new medical study/test (lab, radiology, etc.) for a patient',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Medical study created successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Patient not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medical_study_dto_1.CreateMedicalStudyDto]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all medical studies with pagination and filters',
        description: 'Retrieve medical studies with optional filters by patient, type, status, etc.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medical studies retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_medical_study_dto_1.QueryMedicalStudyDto]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all medical studies for a specific patient',
        description: 'Retrieve all active medical studies for a patient',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'Patient ID (CUID)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'studyType',
        required: false,
        description: 'Filter by study type',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medical studies retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)('studyType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/pending'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get pending medical studies for a patient',
        description: 'Retrieve studies that are pending completion',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'Patient ID (CUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pending studies retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "getPendingStudies", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/completed'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get completed medical studies for a patient',
        description: 'Retrieve studies that have been completed or reviewed',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'Patient ID (CUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Completed studies retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "getCompletedStudies", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/type/:studyType'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get medical studies by type for a patient',
        description: 'Retrieve all studies of a specific type for a patient',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'Patient ID (CUID)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'studyType',
        description: 'Type of study',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Studies retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('studyType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "getStudiesByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a medical study by ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Medical Study ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medical study found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Medical study not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a medical study',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Medical Study ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medical study updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Medical study not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medical_study_dto_1.UpdateMedicalStudyDto]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Change medical study status',
        description: 'Change status between "pending", "completed", and "reviewed"',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Medical Study ID (UUID)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enum: ['pending', 'completed', 'reviewed'],
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medical study status changed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Medical study not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Soft delete a medical study',
        description: 'Mark medical study as inactive (soft delete)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Medical Study ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medical study deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Medical study not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/hard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Permanently delete a medical study',
        description: 'Hard delete - removes medical study from database permanently',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Medical Study ID (UUID)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medical study permanently deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Medical study not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalStudiesController.prototype, "hardDelete", null);
exports.MedicalStudiesController = MedicalStudiesController = __decorate([
    (0, swagger_1.ApiTags)('Medical Studies'),
    (0, common_1.Controller)('medical-studies'),
    __metadata("design:paramtypes", [medical_studies_service_1.MedicalStudiesService])
], MedicalStudiesController);
//# sourceMappingURL=medical-studies.controller.js.map