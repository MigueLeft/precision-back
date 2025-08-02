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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRescueDirectoryDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateRescueDirectoryDto {
    patientId;
    originalFollowUpId;
    rescueReason;
    entryDate;
    exitDate;
    status = client_1.RescueStatus.ACTIVE;
    rescueCategory = client_1.RescueCategory.STANDARD;
    priority = client_1.RescuePriority.LOW;
    lastContactDate;
    lastAttemptDate;
    totalPreviousAttempts = 0;
    rescueNotes;
    reactivatedAt;
    reactivationNotes;
}
exports.CreateRescueDirectoryDto = CreateRescueDirectoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "patientId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "originalFollowUpId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.RescueReason),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "rescueReason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "entryDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "exitDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.RescueStatus),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.RescueCategory),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "rescueCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.RescuePriority),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "lastContactDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "lastAttemptDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRescueDirectoryDto.prototype, "totalPreviousAttempts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "rescueNotes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "reactivatedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRescueDirectoryDto.prototype, "reactivationNotes", void 0);
//# sourceMappingURL=create-rescue-directory.dto.js.map