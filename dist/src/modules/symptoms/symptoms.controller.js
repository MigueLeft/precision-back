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
exports.SymptomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const symptoms_service_1 = require("./symptoms.service");
const create_symptom_dto_1 = require("./dto/create-symptom.dto");
const update_symptom_dto_1 = require("./dto/update-symptom.dto");
const query_symptoms_dto_1 = require("./dto/query-symptoms.dto");
const create_patient_symptom_dto_1 = require("./dto/create-patient-symptom.dto");
const add_batch_patient_symptoms_dto_1 = require("./dto/add-batch-patient-symptoms.dto");
let SymptomsController = class SymptomsController {
    symptomsService;
    constructor(symptomsService) {
        this.symptomsService = symptomsService;
    }
    create(createSymptomDto) {
        return this.symptomsService.createSymptom(createSymptomDto);
    }
    findAll(queryDto) {
        return this.symptomsService.findAllSymptoms(queryDto);
    }
    findAllCategories() {
        return this.symptomsService.findAllSymptomCategories();
    }
    findOne(id) {
        return this.symptomsService.findSymptomById(id);
    }
    update(id, updateSymptomDto) {
        return this.symptomsService.updateSymptom(id, updateSymptomDto);
    }
    remove(id) {
        return this.symptomsService.removeSymptom(id);
    }
    createPatientSymptom(createPatientSymptomDto) {
        return this.symptomsService.createPatientSymptom(createPatientSymptomDto);
    }
    addBatchPatientSymptoms(dto) {
        return this.symptomsService.addBatchPatientSymptoms(dto);
    }
    findPatientSymptoms(patientId) {
        return this.symptomsService.findPatientSymptoms(patientId);
    }
    removePatientSymptom(patientId, symptomId) {
        return this.symptomsService.removePatientSymptom(patientId, symptomId);
    }
};
exports.SymptomsController = SymptomsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo síntoma' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Síntoma creado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Categoría de síntoma no encontrada.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_symptom_dto_1.CreateSymptomDto]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener lista de síntomas con filtros y paginación',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de síntomas obtenida exitosamente.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_symptoms_dto_1.QuerySymptomsDto]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las categorías de síntomas' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Categorías de síntomas obtenidas exitosamente.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un síntoma por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del síntoma', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Síntoma encontrado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Síntoma no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un síntoma' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del síntoma', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Síntoma actualizado exitosamente.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Síntoma no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_symptom_dto_1.UpdateSymptomDto]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un síntoma' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del síntoma', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Síntoma eliminado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Síntoma no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('patient-symptoms'),
    (0, swagger_1.ApiOperation)({ summary: 'Asociar un síntoma a un paciente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Síntoma asociado al paciente exitosamente.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente o síntoma no encontrado.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_symptom_dto_1.CreatePatientSymptomDto]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "createPatientSymptom", null);
__decorate([
    (0, common_1.Post)('patient-symptoms/batch'),
    (0, swagger_1.ApiOperation)({
        summary: 'Agregar múltiples síntomas a un paciente de una sola vez',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Síntomas agregados exitosamente al paciente.',
        schema: {
            type: 'object',
            properties: {
                patientId: { type: 'string' },
                symptomsAdded: { type: 'number' },
                symptoms: { type: 'array' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente o algún síntoma no encontrado.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_batch_patient_symptoms_dto_1.AddBatchPatientSymptomsDto]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "addBatchPatientSymptoms", null);
__decorate([
    (0, common_1.Get)('patients/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los síntomas de un paciente' }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Síntomas del paciente obtenidos exitosamente.',
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "findPatientSymptoms", null);
__decorate([
    (0, common_1.Delete)('patients/:patientId/symptoms/:symptomId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar la asociación de un síntoma con un paciente',
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiParam)({
        name: 'symptomId',
        description: 'ID del síntoma',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Asociación eliminada exitosamente.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Asociación no encontrada.' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('symptomId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SymptomsController.prototype, "removePatientSymptom", null);
exports.SymptomsController = SymptomsController = __decorate([
    (0, swagger_1.ApiTags)('symptoms'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('symptoms'),
    __metadata("design:paramtypes", [symptoms_service_1.SymptomsService])
], SymptomsController);
//# sourceMappingURL=symptoms.controller.js.map