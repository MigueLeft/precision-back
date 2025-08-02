"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RescueDirectoryModule = void 0;
const common_1 = require("@nestjs/common");
const rescue_directory_service_1 = require("./rescue-directory.service");
const rescue_directory_controller_1 = require("./rescue-directory.controller");
const prisma_module_1 = require("../../config/database/prisma.module");
let RescueDirectoryModule = class RescueDirectoryModule {
};
exports.RescueDirectoryModule = RescueDirectoryModule;
exports.RescueDirectoryModule = RescueDirectoryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [rescue_directory_controller_1.RescueDirectoryController],
        providers: [rescue_directory_service_1.RescueDirectoryService],
        exports: [rescue_directory_service_1.RescueDirectoryService],
    })
], RescueDirectoryModule);
//# sourceMappingURL=rescue-directory.module.js.map