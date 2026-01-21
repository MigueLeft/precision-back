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
exports.LaboratoryExamsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const laboratory_exams_service_1 = require("./laboratory-exams.service");
const create_exam_catalog_dto_1 = require("./dto/create-exam-catalog.dto");
const update_exam_catalog_dto_1 = require("./dto/update-exam-catalog.dto");
const query_exam_catalog_dto_1 = require("./dto/query-exam-catalog.dto");
const create_exam_result_dto_1 = require("./dto/create-exam-result.dto");
const update_exam_result_dto_1 = require("./dto/update-exam-result.dto");
const query_exam_result_dto_1 = require("./dto/query-exam-result.dto");
const add_batch_exam_results_dto_1 = require("./dto/add-batch-exam-results.dto");
let LaboratoryExamsController = class LaboratoryExamsController {
    laboratoryExamsService;
    constructor(laboratoryExamsService) {
        this.laboratoryExamsService = laboratoryExamsService;
    }
    createExamCatalog(createDto) {
        return this.laboratoryExamsService.createExamCatalog(createDto);
    }
    findAllExamCatalog(query) {
        return this.laboratoryExamsService.findAllExamCatalog(query);
    }
    getExamsByCategory(category) {
        return this.laboratoryExamsService.getExamsByCategory(category);
    }
    findOneExamCatalog(id) {
        return this.laboratoryExamsService.findOneExamCatalog(id);
    }
    updateExamCatalog(id, updateDto) {
        return this.laboratoryExamsService.updateExamCatalog(id, updateDto);
    }
    removeExamCatalog(id) {
        return this.laboratoryExamsService.removeExamCatalog(id);
    }
    createExamResult(createDto) {
        return this.laboratoryExamsService.createExamResult(createDto);
    }
    findAllExamResults(query) {
        return this.laboratoryExamsService.findAllExamResults(query);
    }
    getAbnormalResults(patientId) {
        return this.laboratoryExamsService.getAbnormalResults(patientId);
    }
    getPatientExamHistory(patientId, examId) {
        return this.laboratoryExamsService.getPatientExamHistory(patientId, examId);
    }
    findOneExamResult(id) {
        return this.laboratoryExamsService.findOneExamResult(id);
    }
    updateExamResult(id, updateDto) {
        return this.laboratoryExamsService.updateExamResult(id, updateDto);
    }
    removeExamResult(id) {
        return this.laboratoryExamsService.removeExamResult(id);
    }
    addBatchExamResults(dto) {
        return this.laboratoryExamsService.addBatchExamResults(dto);
    }
    getExamCategories() {
        return this.laboratoryExamsService.getExamCategories();
    }
};
exports.LaboratoryExamsController = LaboratoryExamsController;
__decorate([
    (0, common_1.Post)('catalog'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nuevo examen en el catálogo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Examen creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'El examen ya existe' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_catalog_dto_1.CreateExamCatalogDto]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "createExamCatalog", null);
__decorate([
    (0, common_1.Get)('catalog'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los exámenes del catálogo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de exámenes' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_exam_catalog_dto_1.QueryExamCatalogDto]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "findAllExamCatalog", null);
__decorate([
    (0, common_1.Get)('catalog/category/:category'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener exámenes por categoría' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de exámenes de la categoría' }),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "getExamsByCategory", null);
__decorate([
    (0, common_1.Get)('catalog/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un examen del catálogo por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Examen encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Examen no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "findOneExamCatalog", null);
__decorate([
    (0, common_1.Patch)('catalog/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un examen del catálogo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Examen actualizado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Examen no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exam_catalog_dto_1.UpdateExamCatalogDto]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "updateExamCatalog", null);
__decorate([
    (0, common_1.Delete)('catalog/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un examen del catálogo (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Examen eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Examen no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "removeExamCatalog", null);
__decorate([
    (0, common_1.Post)('results'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar resultado de examen para un paciente' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Resultado registrado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Paciente o examen no encontrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_result_dto_1.CreateExamResultDto]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "createExamResult", null);
__decorate([
    (0, common_1.Get)('results'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los resultados de exámenes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de resultados' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_exam_result_dto_1.QueryExamResultDto]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "findAllExamResults", null);
__decorate([
    (0, common_1.Get)('results/abnormal'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener resultados anormales (opcionalmente por paciente)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de resultados anormales' }),
    __param(0, (0, common_1.Query)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "getAbnormalResults", null);
__decorate([
    (0, common_1.Get)('results/patient/:patientId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener historial de exámenes de un paciente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial de exámenes del paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)('examId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "getPatientExamHistory", null);
__decorate([
    (0, common_1.Get)('results/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un resultado de examen por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultado encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resultado no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "findOneExamResult", null);
__decorate([
    (0, common_1.Patch)('results/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un resultado de examen' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultado actualizado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resultado no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exam_result_dto_1.UpdateExamResultDto]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "updateExamResult", null);
__decorate([
    (0, common_1.Delete)('results/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un resultado de examen (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultado eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Resultado no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "removeExamResult", null);
__decorate([
    (0, common_1.Post)('results/batch'),
    (0, swagger_1.ApiOperation)({
        summary: 'Agregar múltiples resultados de exámenes a un paciente de una sola vez',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Resultados de exámenes agregados exitosamente.',
        schema: {
            type: 'object',
            properties: {
                patientId: { type: 'string' },
                resultsAdded: { type: 'number' },
                results: { type: 'array' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente o algún examen no encontrado.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_batch_exam_results_dto_1.AddBatchExamResultsDto]),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "addBatchExamResults", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las categorías de exámenes disponibles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Categorías obtenidas exitosamente',
        schema: {
            type: 'array',
            items: { type: 'string' },
            example: [
                'HEMATOLOGÍA',
                'QUÍMICA Y LÍPIDOS',
                'ENDOCRINO-METABÓLICO',
                'FUNCIÓN RENAL',
                'FUNCIÓN HEPÁTICA',
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LaboratoryExamsController.prototype, "getExamCategories", null);
exports.LaboratoryExamsController = LaboratoryExamsController = __decorate([
    (0, swagger_1.ApiTags)('Laboratory Exams'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('laboratory-exams'),
    __metadata("design:paramtypes", [laboratory_exams_service_1.LaboratoryExamsService])
], LaboratoryExamsController);
//# sourceMappingURL=laboratory-exams.controller.js.map