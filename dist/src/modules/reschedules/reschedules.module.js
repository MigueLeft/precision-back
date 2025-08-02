"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReschedulesModule = void 0;
const common_1 = require("@nestjs/common");
const reschedules_service_1 = require("./reschedules.service");
const reschedules_controller_1 = require("./reschedules.controller");
const prisma_module_1 = require("../../config/database/prisma.module");
let ReschedulesModule = class ReschedulesModule {
};
exports.ReschedulesModule = ReschedulesModule;
exports.ReschedulesModule = ReschedulesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [reschedules_controller_1.ReschedulesController],
        providers: [reschedules_service_1.ReschedulesService],
        exports: [reschedules_service_1.ReschedulesService],
    })
], ReschedulesModule);
//# sourceMappingURL=reschedules.module.js.map