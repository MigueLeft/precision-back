"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientFollowModule = void 0;
const common_1 = require("@nestjs/common");
const patient_follow_service_1 = require("./patient-follow.service");
const patient_follow_controller_1 = require("./patient-follow.controller");
const prisma_module_1 = require("../../config/database/prisma.module");
let PatientFollowModule = class PatientFollowModule {
};
exports.PatientFollowModule = PatientFollowModule;
exports.PatientFollowModule = PatientFollowModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [patient_follow_controller_1.PatientFollowController],
        providers: [patient_follow_service_1.PatientFollowService],
        exports: [patient_follow_service_1.PatientFollowService],
    })
], PatientFollowModule);
//# sourceMappingURL=patient-follow.module.js.map