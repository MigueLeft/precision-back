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
var RescueDirectoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RescueDirectoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let RescueDirectoryService = RescueDirectoryService_1 = class RescueDirectoryService {
    prisma;
    logger = new common_1.Logger(RescueDirectoryService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRescueDirectoryDto) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: createRescueDirectoryDto.patientId },
            });
            if (!patient) {
                throw new common_1.BadRequestException(`Patient with ID ${createRescueDirectoryDto.patientId} not found`);
            }
            const originalFollowUp = await this.prisma.patientFollowUp.findUnique({
                where: { id: createRescueDirectoryDto.originalFollowUpId },
            });
            if (!originalFollowUp) {
                throw new common_1.BadRequestException(`Follow-up with ID ${createRescueDirectoryDto.originalFollowUpId} not found`);
            }
            const existingEntry = await this.prisma.rescueDirectory.findFirst({
                where: {
                    patientId: createRescueDirectoryDto.patientId,
                    originalFollowUpId: createRescueDirectoryDto.originalFollowUpId,
                    status: 'ACTIVE',
                },
            });
            if (existingEntry) {
                throw new common_1.ConflictException('An active rescue entry already exists for this patient and follow-up');
            }
            const rescueDirectory = await this.prisma.rescueDirectory.create({
                data: {
                    ...createRescueDirectoryDto,
                    entryDate: createRescueDirectoryDto.entryDate
                        ? new Date(createRescueDirectoryDto.entryDate)
                        : new Date(),
                    exitDate: createRescueDirectoryDto.exitDate
                        ? new Date(createRescueDirectoryDto.exitDate)
                        : undefined,
                    lastContactDate: createRescueDirectoryDto.lastContactDate
                        ? new Date(createRescueDirectoryDto.lastContactDate)
                        : undefined,
                    lastAttemptDate: createRescueDirectoryDto.lastAttemptDate
                        ? new Date(createRescueDirectoryDto.lastAttemptDate)
                        : undefined,
                    reactivatedAt: createRescueDirectoryDto.reactivatedAt
                        ? new Date(createRescueDirectoryDto.reactivatedAt)
                        : undefined,
                },
                include: {
                    patient: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                    originalFollowUp: {
                        select: {
                            id: true,
                            followUpType: true,
                            status: true,
                            scheduledContactDate: true,
                            attemptCount: true,
                            maxAttempts: true,
                        },
                    },
                },
            });
            this.logger.log(`Patient ${patient.firstName} ${patient.lastName} added to rescue directory due to ${createRescueDirectoryDto.rescueReason}`);
            return rescueDirectory;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('A rescue entry with these details already exists');
                }
            }
            throw error;
        }
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search, sortBy = 'entryDate', sortOrder = 'desc', ...filters } = queryDto;
        const skip = (page - 1) * limit;
        const entryDateFilters = {};
        if (queryDto.entryDateFrom) {
            entryDateFilters.gte = new Date(queryDto.entryDateFrom);
        }
        if (queryDto.entryDateTo) {
            entryDateFilters.lte = new Date(queryDto.entryDateTo);
        }
        const lastContactDateFilters = {};
        if (queryDto.lastContactDateFrom) {
            lastContactDateFilters.gte = new Date(queryDto.lastContactDateFrom);
        }
        if (queryDto.lastContactDateTo) {
            lastContactDateFilters.lte = new Date(queryDto.lastContactDateTo);
        }
        const where = {
            ...filters,
            ...(search && {
                OR: [
                    {
                        patient: {
                            OR: [
                                { firstName: { contains: search, mode: 'insensitive' } },
                                { lastName: { contains: search, mode: 'insensitive' } },
                                { email: { contains: search, mode: 'insensitive' } },
                            ],
                        },
                    },
                    { rescueNotes: { contains: search, mode: 'insensitive' } },
                    { reactivationNotes: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(Object.keys(entryDateFilters).length > 0 && {
                entryDate: entryDateFilters,
            }),
            ...(Object.keys(lastContactDateFilters).length > 0 && {
                lastContactDate: lastContactDateFilters,
            }),
            ...(queryDto.minPreviousAttempts && {
                totalPreviousAttempts: {
                    gte: queryDto.minPreviousAttempts,
                },
            }),
        };
        const [rescueEntries, total] = await Promise.all([
            this.prisma.rescueDirectory.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    patient: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                    originalFollowUp: {
                        select: {
                            id: true,
                            followUpType: true,
                            status: true,
                            scheduledContactDate: true,
                            attemptCount: true,
                            maxAttempts: true,
                        },
                    },
                },
            }),
            this.prisma.rescueDirectory.count({ where }),
        ]);
        return {
            data: rescueEntries,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const rescueEntry = await this.prisma.rescueDirectory.findUnique({
            where: { id },
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                originalFollowUp: {
                    include: {
                        contactAttempts: {
                            orderBy: { attemptNumber: 'asc' },
                        },
                    },
                },
            },
        });
        if (!rescueEntry) {
            throw new common_1.NotFoundException(`Rescue directory entry with ID ${id} not found`);
        }
        return rescueEntry;
    }
    async update(id, updateRescueDirectoryDto) {
        try {
            await this.findOne(id);
            const dataToUpdate = { ...updateRescueDirectoryDto };
            if (updateRescueDirectoryDto.entryDate) {
                dataToUpdate.entryDate = new Date(updateRescueDirectoryDto.entryDate);
            }
            if (updateRescueDirectoryDto.exitDate) {
                dataToUpdate.exitDate = new Date(updateRescueDirectoryDto.exitDate);
            }
            if (updateRescueDirectoryDto.lastContactDate) {
                dataToUpdate.lastContactDate = new Date(updateRescueDirectoryDto.lastContactDate);
            }
            if (updateRescueDirectoryDto.lastAttemptDate) {
                dataToUpdate.lastAttemptDate = new Date(updateRescueDirectoryDto.lastAttemptDate);
            }
            if (updateRescueDirectoryDto.reactivatedAt) {
                dataToUpdate.reactivatedAt = new Date(updateRescueDirectoryDto.reactivatedAt);
            }
            const rescueEntry = await this.prisma.rescueDirectory.update({
                where: { id },
                data: dataToUpdate,
                include: {
                    patient: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                    originalFollowUp: {
                        select: {
                            id: true,
                            followUpType: true,
                            status: true,
                            scheduledContactDate: true,
                            attemptCount: true,
                            maxAttempts: true,
                        },
                    },
                },
            });
            this.logger.log(`Rescue directory entry updated: ${id}`);
            return rescueEntry;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('A rescue entry with these details already exists');
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.prisma.rescueDirectory.delete({
                where: { id },
            });
            this.logger.log(`Rescue directory entry deleted: ${id}`);
            return { message: 'Rescue directory entry deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.BadRequestException('Cannot delete rescue entry due to related records');
                }
            }
            throw error;
        }
    }
    async getByPatient(patientId, queryDto) {
        return this.findAll({ ...queryDto, patientId });
    }
    async getActiveEntries(queryDto) {
        return this.findAll({ ...queryDto, status: 'ACTIVE' });
    }
    async getHighPriorityEntries(queryDto) {
        return this.findAll({
            ...queryDto,
            status: 'ACTIVE',
            priority: 'HIGH',
        });
    }
    async getCriticalEntries(queryDto) {
        return this.findAll({
            ...queryDto,
            status: 'ACTIVE',
            priority: 'CRITICAL',
        });
    }
    async reactivateEntry(id, reactivationNotes) {
        const rescueEntry = await this.findOne(id);
        if (rescueEntry.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Only active rescue entries can be reactivated');
        }
        const updated = await this.prisma.rescueDirectory.update({
            where: { id },
            data: {
                status: 'REACTIVATED',
                reactivatedAt: new Date(),
                reactivationNotes,
            },
            include: {
                patient: true,
                originalFollowUp: true,
            },
        });
        this.logger.log(`Rescue entry reactivated: ${id} for patient ${updated.patient.firstName} ${updated.patient.lastName}`);
        return updated;
    }
    async archiveEntry(id) {
        const updated = await this.prisma.rescueDirectory.update({
            where: { id },
            data: {
                status: 'ARCHIVED',
                exitDate: new Date(),
            },
            include: {
                patient: true,
            },
        });
        this.logger.log(`Rescue entry archived: ${id}`);
        return updated;
    }
};
exports.RescueDirectoryService = RescueDirectoryService;
exports.RescueDirectoryService = RescueDirectoryService = RescueDirectoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RescueDirectoryService);
//# sourceMappingURL=rescue-directory.service.js.map