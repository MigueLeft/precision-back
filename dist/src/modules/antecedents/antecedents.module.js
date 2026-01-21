"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntecedentsModule = void 0;
const common_1 = require("@nestjs/common");
const antecedents_service_1 = require("./antecedents.service");
const antecedents_controller_1 = require("./antecedents.controller");
const prisma_service_1 = require("../../config/database/prisma.service");
let AntecedentsModule = class AntecedentsModule {
};
exports.AntecedentsModule = AntecedentsModule;
exports.AntecedentsModule = AntecedentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [antecedents_controller_1.AntecedentsController],
        providers: [antecedents_service_1.AntecedentsService, prisma_service_1.PrismaService],
        exports: [antecedents_service_1.AntecedentsService],
    })
], AntecedentsModule);
//# sourceMappingURL=antecedents.module.js.map