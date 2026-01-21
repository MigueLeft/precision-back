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
var TreatmentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
let TreatmentsService = TreatmentsService_1 = class TreatmentsService {
    prisma;
    logger = new common_1.Logger(TreatmentsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTreatmentDto) {
        this.logger.log(`Creating new treatment for patient ${createTreatmentDto.patientId}`);
        const patient = await this.prisma.patient.findUnique({
            where: { id: createTreatmentDto.patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${createTreatmentDto.patientId} not found`);
        }
        return this.prisma.treatment.create({
            data: {
                ...createTreatmentDto,
                prescribedAt: new Date(),
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        identification: true,
                    },
                },
            },
        });
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search, patientId, status, active, prescribedBy, sortBy = 'prescribedAt', sortOrder = 'desc', } = queryDto;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.medicationName = {
                contains: search,
                mode: 'insensitive',
            };
        }
        if (patientId) {
            where.patientId = patientId;
        }
        if (status) {
            where.status = status;
        }
        if (active !== undefined) {
            where.active = active;
        }
        if (prescribedBy) {
            where.prescribedBy = prescribedBy;
        }
        const [treatments, total] = await Promise.all([
            this.prisma.treatment.findMany({
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
                            identification: true,
                        },
                    },
                },
            }),
            this.prisma.treatment.count({ where }),
        ]);
        return {
            data: treatments,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const treatment = await this.prisma.treatment.findUnique({
            where: { id },
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        identification: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        if (!treatment) {
            throw new common_1.NotFoundException(`Treatment with ID ${id} not found`);
        }
        return treatment;
    }
    async findByPatient(patientId, status) {
        this.logger.log(`Finding treatments for patient ${patientId}`);
        const where = {
            patientId,
            active: true,
        };
        if (status) {
            where.status = status;
        }
        return this.prisma.treatment.findMany({
            where,
            orderBy: { prescribedAt: 'desc' },
        });
    }
    async update(id, updateTreatmentDto) {
        this.logger.log(`Updating treatment ${id}`);
        await this.findOne(id);
        return this.prisma.treatment.update({
            where: { id },
            data: updateTreatmentDto,
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        identification: true,
                    },
                },
            },
        });
    }
    async changeStatus(id, newStatus) {
        this.logger.log(`Changing status of treatment ${id} to ${newStatus}`);
        await this.findOne(id);
        return this.prisma.treatment.update({
            where: { id },
            data: { status: newStatus },
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        identification: true,
                    },
                },
            },
        });
    }
    async remove(id) {
        this.logger.log(`Soft deleting treatment ${id}`);
        await this.findOne(id);
        return this.prisma.treatment.update({
            where: { id },
            data: { active: false },
        });
    }
    async hardDelete(id) {
        this.logger.log(`Hard deleting treatment ${id}`);
        await this.findOne(id);
        return this.prisma.treatment.delete({
            where: { id },
        });
    }
    async getCurrentTreatments(patientId) {
        this.logger.log(`Getting current treatments for patient ${patientId}`);
        return this.prisma.treatment.findMany({
            where: {
                patientId,
                status: 'actual',
                active: true,
            },
            orderBy: { prescribedAt: 'desc' },
        });
    }
    async getPreviousTreatments(patientId) {
        this.logger.log(`Getting previous treatments for patient ${patientId}`);
        return this.prisma.treatment.findMany({
            where: {
                patientId,
                status: 'previo',
                active: true,
            },
            orderBy: { prescribedAt: 'desc' },
        });
    }
    async addBatchTreatments(dto) {
        this.logger.log(`Adding ${dto.medications.length} treatments to patient ${dto.patientId}`);
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: dto.patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${dto.patientId} not found`);
            }
            const createdTreatments = await this.prisma.$transaction(dto.medications.map((medicationData) => this.prisma.treatment.create({
                data: {
                    patientId: dto.patientId,
                    medicationName: medicationData.medicationName,
                    presentation: medicationData.presentation,
                    quantity: medicationData.quantity,
                    dosage: medicationData.dosage,
                    duration: medicationData.duration,
                    status: medicationData.status || 'actual',
                    prescribedBy: medicationData.prescribedBy,
                    prescribedAt: medicationData.prescribedAt
                        ? new Date(medicationData.prescribedAt)
                        : new Date(),
                    notes: medicationData.notes,
                    active: medicationData.active !== undefined ? medicationData.active : true,
                },
            })));
            this.logger.log(`Successfully added ${createdTreatments.length} treatments to patient ${dto.patientId}`);
            return {
                patientId: dto.patientId,
                treatmentsAdded: createdTreatments.length,
                treatments: createdTreatments,
            };
        }
        catch (error) {
            this.logger.error(`Error adding batch treatments: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.TreatmentsService = TreatmentsService;
exports.TreatmentsService = TreatmentsService = TreatmentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TreatmentsService);
//# sourceMappingURL=treatments.service.js.map