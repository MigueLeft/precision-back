"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalExaminationsModule = void 0;
const common_1 = require("@nestjs/common");
const physical_examinations_service_1 = require("./physical-examinations.service");
const physical_examinations_controller_1 = require("./physical-examinations.controller");
const prisma_service_1 = require("../../config/database/prisma.service");
let PhysicalExaminationsModule = class PhysicalExaminationsModule {
};
exports.PhysicalExaminationsModule = PhysicalExaminationsModule;
exports.PhysicalExaminationsModule = PhysicalExaminationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [physical_examinations_controller_1.PhysicalExaminationsController],
        providers: [physical_examinations_service_1.PhysicalExaminationsService, prisma_service_1.PrismaService],
        exports: [physical_examinations_service_1.PhysicalExaminationsService],
    })
], PhysicalExaminationsModule);
//# sourceMappingURL=physical-examinations.module.js.map