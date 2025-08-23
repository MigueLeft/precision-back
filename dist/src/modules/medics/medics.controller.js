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
exports.MedicsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medics_service_1 = require("./medics.service");
const create_medic_dto_1 = require("./dto/create-medic.dto");
const update_medic_dto_1 = require("./dto/update-medic.dto");
const query_medic_dto_1 = require("./dto/query-medic.dto");
let MedicsController = class MedicsController {
    medicsService;
    constructor(medicsService) {
        this.medicsService = medicsService;
    }
    create(createMedicDto) {
        return this.medicsService.create(createMedicDto);
    }
    getMedicStats() {
        return this.medicsService.getMedicStats();
    }
    findAll(query) {
        console.log('QUERYYYYYYYYYYYYYYYY', query);
        return this.medicsService.findAll(query);
    }
    findByIdentification(identification) {
        return this.medicsService.findByIdentification(identification);
    }
    findByEmail(email) {
        return this.medicsService.findByEmail(email);
    }
    findOne(id) {
        return this.medicsService.findOne(id);
    }
    update(id, updateMedicDto) {
        return this.medicsService.update(id, updateMedicDto);
    }
    remove(id) {
        return this.medicsService.remove(id);
    }
    convertToUser(id) {
        return this.medicsService.convertToUser(id);
    }
    removeUser(id) {
        return this.medicsService.removeUser(id);
    }
    bulkCreate(medics) {
        return this.medicsService.bulkCreate(medics);
    }
};
exports.MedicsController = MedicsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo médico' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Médico creado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'La identificación, email o número de registro ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuario no encontrado o ya asignado',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medic_dto_1.CreateMedicDto]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener estadísticas de médicos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Estadísticas de médicos obtenidas exitosamente',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "getMedicStats", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los médicos con paginación y filtros' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de médicos obtenida exitosamente',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_medic_dto_1.QueryMedicDto]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('identification/:identification'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un médico por número de identificación' }),
    (0, swagger_1.ApiParam)({
        name: 'identification',
        description: 'Número de identificación del médico',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Médico encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Médico no encontrado',
    }),
    __param(0, (0, common_1.Param)('identification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "findByIdentification", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un médico por email' }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        description: 'Email del médico',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Médico encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Médico no encontrado',
    }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un médico por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del médico',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Médico encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Médico no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un médico' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del médico',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Médico actualizado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Médico no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'La identificación, email o número de registro ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuario no encontrado o ya asignado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medic_dto_1.UpdateMedicDto]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un médico' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del médico',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Médico eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Médico no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/convert-to-user'),
    (0, swagger_1.ApiOperation)({
        summary: 'Convertir médico en usuario del sistema',
        description: 'Crea automáticamente un usuario del sistema usando los datos del médico. La contraseña será su número de identificación.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del médico',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Médico convertido a usuario exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Médico no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Médico ya tiene cuenta de usuario o email ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Rol MEDIC no encontrado en el sistema',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "convertToUser", null);
__decorate([
    (0, common_1.Delete)(':id/remove-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover usuario de un médico' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del médico',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario removido exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Médico no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear múltiples médicos' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Médicos creados exitosamente',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MedicsController.prototype, "bulkCreate", null);
exports.MedicsController = MedicsController = __decorate([
    (0, swagger_1.ApiTags)('Medics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('medics'),
    __metadata("design:paramtypes", [medics_service_1.MedicsService])
], MedicsController);
//# sourceMappingURL=medics.controller.js.map