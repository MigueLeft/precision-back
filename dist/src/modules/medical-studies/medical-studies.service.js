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
var MedicalStudiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalStudiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
let MedicalStudiesService = MedicalStudiesService_1 = class MedicalStudiesService {
    prisma;
    logger = new common_1.Logger(MedicalStudiesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMedicalStudyDto) {
        this.logger.log(`Creating new medical study for patient ${createMedicalStudyDto.patientId}`);
        const patient = await this.prisma.patient.findUnique({
            where: { id: createMedicalStudyDto.patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${createMedicalStudyDto.patientId} not found`);
        }
        return this.prisma.medicalStudy.create({
            data: {
                ...createMedicalStudyDto,
                studyDate: new Date(createMedicalStudyDto.studyDate),
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
        const { page = 1, limit = 10, search, patientId, studyType, status, active, orderedBy, interpretedBy, sortBy = 'studyDate', sortOrder = 'desc', } = queryDto;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { studyName: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (patientId) {
            where.patientId = patientId;
        }
        if (studyType) {
            where.studyType = studyType;
        }
        if (status) {
            where.status = status;
        }
        if (active !== undefined) {
            where.active = active;
        }
        if (orderedBy) {
            where.orderedBy = orderedBy;
        }
        if (interpretedBy) {
            where.interpretedBy = interpretedBy;
        }
        const [studies, total] = await Promise.all([
            this.prisma.medicalStudy.findMany({
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
            this.prisma.medicalStudy.count({ where }),
        ]);
        return {
            data: studies,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const study = await this.prisma.medicalStudy.findUnique({
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
        if (!study) {
            throw new common_1.NotFoundException(`Medical study with ID ${id} not found`);
        }
        return study;
    }
    async findByPatient(patientId, studyType) {
        this.logger.log(`Finding medical studies for patient ${patientId}`);
        const where = {
            patientId,
            active: true,
        };
        if (studyType) {
            where.studyType = studyType;
        }
        return this.prisma.medicalStudy.findMany({
            where,
            orderBy: { studyDate: 'desc' },
        });
    }
    async update(id, updateMedicalStudyDto) {
        this.logger.log(`Updating medical study ${id}`);
        await this.findOne(id);
        const updateData = { ...updateMedicalStudyDto };
        if (updateMedicalStudyDto.studyDate) {
            updateData.studyDate = new Date(updateMedicalStudyDto.studyDate);
        }
        return this.prisma.medicalStudy.update({
            where: { id },
            data: updateData,
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
        this.logger.log(`Changing status of medical study ${id} to ${newStatus}`);
        await this.findOne(id);
        return this.prisma.medicalStudy.update({
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
        this.logger.log(`Soft deleting medical study ${id}`);
        await this.findOne(id);
        return this.prisma.medicalStudy.update({
            where: { id },
            data: { active: false },
        });
    }
    async hardDelete(id) {
        this.logger.log(`Hard deleting medical study ${id}`);
        await this.findOne(id);
        return this.prisma.medicalStudy.delete({
            where: { id },
        });
    }
    async getStudiesByType(patientId, studyType) {
        this.logger.log(`Getting ${studyType} studies for patient ${patientId}`);
        return this.prisma.medicalStudy.findMany({
            where: {
                patientId,
                studyType,
                active: true,
            },
            orderBy: { studyDate: 'desc' },
        });
    }
    async getPendingStudies(patientId) {
        this.logger.log(`Getting pending studies for patient ${patientId}`);
        return this.prisma.medicalStudy.findMany({
            where: {
                patientId,
                status: 'pending',
                active: true,
            },
            orderBy: { studyDate: 'desc' },
        });
    }
    async getCompletedStudies(patientId) {
        this.logger.log(`Getting completed studies for patient ${patientId}`);
        return this.prisma.medicalStudy.findMany({
            where: {
                patientId,
                status: { in: ['completed', 'reviewed'] },
                active: true,
            },
            orderBy: { studyDate: 'desc' },
        });
    }
};
exports.MedicalStudiesService = MedicalStudiesService;
exports.MedicalStudiesService = MedicalStudiesService = MedicalStudiesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicalStudiesService);
//# sourceMappingURL=medical-studies.service.js.map