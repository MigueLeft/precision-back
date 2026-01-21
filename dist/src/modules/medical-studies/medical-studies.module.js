"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalStudiesModule = void 0;
const common_1 = require("@nestjs/common");
const medical_studies_service_1 = require("./medical-studies.service");
const medical_studies_controller_1 = require("./medical-studies.controller");
const prisma_module_1 = require("../../config/database/prisma.module");
let MedicalStudiesModule = class MedicalStudiesModule {
};
exports.MedicalStudiesModule = MedicalStudiesModule;
exports.MedicalStudiesModule = MedicalStudiesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [medical_studies_controller_1.MedicalStudiesController],
        providers: [medical_studies_service_1.MedicalStudiesService],
        exports: [medical_studies_service_1.MedicalStudiesService],
    })
], MedicalStudiesModule);
//# sourceMappingURL=medical-studies.module.js.map