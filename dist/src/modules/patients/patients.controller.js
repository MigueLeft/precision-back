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
exports.PatientsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patients_service_1 = require("./patients.service");
const create_patient_dto_1 = require("./dto/create-patient.dto");
const update_patient_dto_1 = require("./dto/update-patient.dto");
const query_patient_dto_1 = require("./dto/query-patient.dto");
let PatientsController = class PatientsController {
    patientsService;
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    create(createPatientDto) {
        return this.patientsService.create(createPatientDto);
    }
    findAll(query) {
        return this.patientsService.findAll(query);
    }
    getActivePatients() {
        return this.patientsService.getActivePatients();
    }
    getPatientStats() {
        return this.patientsService.getPatientStats();
    }
    findByIdentification(identification) {
        return this.patientsService.findByIdentification(identification);
    }
    findByEmail(email) {
        return this.patientsService.findByEmail(email);
    }
    findOne(id) {
        return this.patientsService.findOne(id);
    }
    update(id, updatePatientDto) {
        return this.patientsService.update(id, updatePatientDto);
    }
    remove(id) {
        return this.patientsService.remove(id);
    }
    convertToUser(id) {
        return this.patientsService.convertToUser(id);
    }
    removeUser(id) {
        return this.patientsService.removeUser(id);
    }
    bulkCreate(patients) {
        return this.patientsService.bulkCreate(patients);
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo paciente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Paciente creado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'La identificación o email ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuario no encontrado o ya asignado',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los pacientes con paginación y filtros' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de pacientes obtenida exitosamente',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_patient_dto_1.QueryPatientDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener solo pacientes activos (sin paginación)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de pacientes activos obtenida exitosamente',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getActivePatients", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener estadísticas de pacientes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Estadísticas de pacientes obtenidas exitosamente',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getPatientStats", null);
__decorate([
    (0, common_1.Get)('identification/:identification'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un paciente por número de identificación' }),
    (0, swagger_1.ApiParam)({
        name: 'identification',
        description: 'Número de identificación del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('identification')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findByIdentification", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un paciente por email' }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        description: 'Email del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un paciente por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un paciente' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente actualizado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'La identificación o email ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuario no encontrado o ya asignado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un paciente' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Paciente eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/convert-to-user'),
    (0, swagger_1.ApiOperation)({
        summary: 'Convertir paciente en usuario del sistema',
        description: 'Crea automáticamente un usuario del sistema usando los datos del paciente. La contraseña será su número de identificación.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente convertido a usuario exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Paciente ya tiene cuenta de usuario o email ya existe',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Rol PATIENT no encontrado en el sistema',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "convertToUser", null);
__decorate([
    (0, common_1.Delete)(':id/remove-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover usuario de un paciente' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del paciente',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario removido exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear múltiples pacientes' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pacientes creados exitosamente',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "bulkCreate", null);
exports.PatientsController = PatientsController = __decorate([
    (0, swagger_1.ApiTags)('Patients'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map