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
exports.ContactAttemptController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_attempt_service_1 = require("./contact-attempt.service");
const create_contact_attempt_dto_1 = require("./dto/create-contact-attempt.dto");
const update_contact_attempt_dto_1 = require("./dto/update-contact-attempt.dto");
const query_contact_attempt_dto_1 = require("./dto/query-contact-attempt.dto");
const transform_interceptor_1 = require("../../common/interceptors/transform.interceptor");
let ContactAttemptController = class ContactAttemptController {
    contactAttemptService;
    constructor(contactAttemptService) {
        this.contactAttemptService = contactAttemptService;
    }
    create(createContactAttemptDto) {
        return this.contactAttemptService.create(createContactAttemptDto);
    }
    findAll(queryDto) {
        return this.contactAttemptService.findAll(queryDto);
    }
    getSuccessfulAttempts(queryDto) {
        return this.contactAttemptService.getSuccessfulAttempts(queryDto);
    }
    getFailedAttempts(queryDto) {
        return this.contactAttemptService.getFailedAttempts(queryDto);
    }
    getAttemptsWithAppointments(queryDto) {
        return this.contactAttemptService.getAttemptsWithAppointments(queryDto);
    }
    getByFollowUp(followUpId, queryDto) {
        return this.contactAttemptService.getByFollowUp(followUpId, queryDto);
    }
    findOne(id) {
        return this.contactAttemptService.findOne(id);
    }
    update(id, updateContactAttemptDto) {
        return this.contactAttemptService.update(id, updateContactAttemptDto);
    }
    remove(id) {
        return this.contactAttemptService.remove(id);
    }
};
exports.ContactAttemptController = ContactAttemptController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nuevo intento de contacto' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Intento de contacto creado exitosamente',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_attempt_dto_1.CreateContactAttemptDto]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los intentos de contacto con filtros',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de intentos de contacto obtenida',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_contact_attempt_dto_1.QueryContactAttemptDto]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('successful'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener intentos de contacto exitosos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de intentos exitosos' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_contact_attempt_dto_1.QueryContactAttemptDto]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "getSuccessfulAttempts", null);
__decorate([
    (0, common_1.Get)('failed'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener intentos de contacto fallidos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de intentos fallidos' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_contact_attempt_dto_1.QueryContactAttemptDto]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "getFailedAttempts", null);
__decorate([
    (0, common_1.Get)('with-appointments'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener intentos que generaron citas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de intentos con citas' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_contact_attempt_dto_1.QueryContactAttemptDto]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "getAttemptsWithAppointments", null);
__decorate([
    (0, common_1.Get)('follow-up/:followUpId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener intentos por seguimiento' }),
    (0, swagger_1.ApiParam)({ name: 'followUpId', description: 'ID del seguimiento' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Intentos del seguimiento obtenidos',
    }),
    __param(0, (0, common_1.Param)('followUpId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_contact_attempt_dto_1.QueryContactAttemptDto]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "getByFollowUp", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener intento de contacto por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del intento de contacto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Intento de contacto obtenido' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar intento de contacto' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del intento de contacto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Intento de contacto actualizado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_attempt_dto_1.UpdateContactAttemptDto]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar intento de contacto' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del intento de contacto' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Intento de contacto eliminado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactAttemptController.prototype, "remove", null);
exports.ContactAttemptController = ContactAttemptController = __decorate([
    (0, swagger_1.ApiTags)('ContactAttempt'),
    (0, common_1.Controller)('contact-attempt'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [contact_attempt_service_1.ContactAttemptService])
], ContactAttemptController);
//# sourceMappingURL=contact-attempt.controller.js.map