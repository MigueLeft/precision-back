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
exports.SpecialtiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const specialties_service_1 = require("./specialties.service");
const create_specialty_dto_1 = require("./dto/create-specialty.dto");
const update_specialty_dto_1 = require("./dto/update-specialty.dto");
const query_specialty_dto_1 = require("./dto/query-specialty.dto");
let SpecialtiesController = class SpecialtiesController {
    specialtiesService;
    constructor(specialtiesService) {
        this.specialtiesService = specialtiesService;
    }
    create(createSpecialtyDto) {
        return this.specialtiesService.create(createSpecialtyDto);
    }
    findAll(queryDto) {
        return this.specialtiesService.findAll(queryDto);
    }
    findOne(id) {
        return this.specialtiesService.findOne(id);
    }
    update(id, updateSpecialtyDto) {
        return this.specialtiesService.update(id, updateSpecialtyDto);
    }
    remove(id) {
        return this.specialtiesService.remove(id);
    }
    findByName(name) {
        return this.specialtiesService.findByName(name);
    }
};
exports.SpecialtiesController = SpecialtiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear una nueva especialidad médica',
        description: 'Crea una nueva especialidad médica en el sistema',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Especialidad creada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Ya existe una especialidad con este nombre',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_specialty_dto_1.CreateSpecialtyDto]),
    __metadata("design:returntype", void 0)
], SpecialtiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener lista de especialidades médicas',
        description: 'Obtiene una lista paginada de especialidades médicas con filtros opcionales',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de especialidades obtenida exitosamente',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Número de página' }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Elementos por página',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Término de búsqueda',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'active',
        required: false,
        description: 'Filtrar por estado activo',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        description: 'Campo para ordenar',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        description: 'Orden de clasificación',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_specialty_dto_1.QuerySpecialtyDto]),
    __metadata("design:returntype", void 0)
], SpecialtiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener una especialidad por ID',
        description: 'Obtiene los detalles de una especialidad específica por su ID',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la especialidad' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Especialidad encontrada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Especialidad no encontrada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpecialtiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar una especialidad',
        description: 'Actualiza los datos de una especialidad existente',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la especialidad' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Especialidad actualizada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Especialidad no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Ya existe una especialidad con este nombre',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_specialty_dto_1.UpdateSpecialtyDto]),
    __metadata("design:returntype", void 0)
], SpecialtiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar una especialidad',
        description: 'Elimina una especialidad del sistema (solo si no tiene médicos asociados)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la especialidad' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Especialidad eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Especialidad no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'No se puede eliminar una especialidad que tiene médicos asociados',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpecialtiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar especialidad por nombre',
        description: 'Busca una especialidad específica por su nombre',
    }),
    (0, swagger_1.ApiParam)({ name: 'name', description: 'Nombre de la especialidad' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Especialidad encontrada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Especialidad no encontrada',
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpecialtiesController.prototype, "findByName", null);
exports.SpecialtiesController = SpecialtiesController = __decorate([
    (0, swagger_1.ApiTags)('Specialties'),
    (0, common_1.Controller)('specialties'),
    __metadata("design:paramtypes", [specialties_service_1.SpecialtiesService])
], SpecialtiesController);
//# sourceMappingURL=specialties.controller.js.map