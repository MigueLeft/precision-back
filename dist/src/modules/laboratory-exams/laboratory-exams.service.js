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
var LaboratoryExamsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoryExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let LaboratoryExamsService = LaboratoryExamsService_1 = class LaboratoryExamsService {
    prisma;
    logger = new common_1.Logger(LaboratoryExamsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createExamCatalog(createDto) {
        this.logger.log(`Creating exam catalog: ${createDto.category} - ${createDto.examName}`);
        const existing = await this.prisma.examCatalog.findUnique({
            where: {
                category_examName: {
                    category: createDto.category,
                    examName: createDto.examName,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Exam "${createDto.examName}" already exists in category "${createDto.category}"`);
        }
        return this.prisma.examCatalog.create({
            data: createDto,
        });
    }
    async findAllExamCatalog(query) {
        const { page = 1, limit = 10, search, category, dataType, active } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (active !== undefined) {
            where.active = active;
        }
        if (category) {
            where.category = category;
        }
        if (dataType) {
            where.dataType = dataType;
        }
        if (search) {
            where.OR = [
                { examName: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.examCatalog.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ category: 'asc' }, { examName: 'asc' }],
            }),
            this.prisma.examCatalog.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOneExamCatalog(id) {
        const exam = await this.prisma.examCatalog.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { examResults: true },
                },
            },
        });
        if (!exam) {
            throw new common_1.NotFoundException(`Exam catalog with ID ${id} not found`);
        }
        return exam;
    }
    async updateExamCatalog(id, updateDto) {
        await this.findOneExamCatalog(id);
        this.logger.log(`Updating exam catalog ${id}`);
        return this.prisma.examCatalog.update({
            where: { id },
            data: updateDto,
        });
    }
    async removeExamCatalog(id) {
        await this.findOneExamCatalog(id);
        this.logger.log(`Soft deleting exam catalog ${id}`);
        return this.prisma.examCatalog.update({
            where: { id },
            data: { active: false },
        });
    }
    async getExamCategories() {
        const categories = await this.prisma.examCatalog.findMany({
            where: { active: true },
            select: { category: true },
            distinct: ['category'],
            orderBy: { category: 'asc' },
        });
        return categories.map((c) => c.category);
    }
    async getExamsByCategory(category) {
        return this.prisma.examCatalog.findMany({
            where: {
                category,
                active: true,
            },
            orderBy: { examName: 'asc' },
        });
    }
    async createExamResult(createDto) {
        this.logger.log(`Creating exam result for patient ${createDto.patientId}, exam ${createDto.examId}`);
        const patient = await this.prisma.patient.findUnique({
            where: { id: createDto.patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${createDto.patientId} not found`);
        }
        const exam = await this.prisma.examCatalog.findUnique({
            where: { id: createDto.examId },
        });
        if (!exam) {
            throw new common_1.NotFoundException(`Exam catalog with ID ${createDto.examId} not found`);
        }
        if (createDto.medicalStudyId) {
            const study = await this.prisma.medicalStudy.findUnique({
                where: { id: createDto.medicalStudyId },
            });
            if (!study) {
                throw new common_1.NotFoundException(`Medical study with ID ${createDto.medicalStudyId} not found`);
            }
        }
        let isAbnormal = false;
        if (exam.dataType === 'numerico' &&
            createDto.numericValue !== undefined &&
            exam.referenceMin !== null &&
            exam.referenceMax !== null) {
            const value = createDto.numericValue;
            const min = Number(exam.referenceMin);
            const max = Number(exam.referenceMax);
            isAbnormal = value < min || value > max;
        }
        return this.prisma.examResult.create({
            data: {
                ...createDto,
                isAbnormal,
            },
            include: {
                exam: true,
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        identification: true,
                    },
                },
                medicalStudy: true,
            },
        });
    }
    async findAllExamResults(query) {
        const { page = 1, limit = 10, patientId, examId, medicalStudyId, startDate, endDate, isAbnormal, active, } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (active !== undefined) {
            where.active = active;
        }
        if (patientId) {
            where.patientId = patientId;
        }
        if (examId) {
            where.examId = examId;
        }
        if (medicalStudyId) {
            where.medicalStudyId = medicalStudyId;
        }
        if (isAbnormal !== undefined) {
            where.isAbnormal = isAbnormal;
        }
        if (startDate || endDate) {
            where.resultDate = {};
            if (startDate) {
                where.resultDate.gte = new Date(startDate);
            }
            if (endDate) {
                where.resultDate.lte = new Date(endDate);
            }
        }
        const [data, total] = await Promise.all([
            this.prisma.examResult.findMany({
                where,
                skip,
                take: limit,
                orderBy: { resultDate: 'desc' },
                include: {
                    exam: true,
                    patient: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            identification: true,
                        },
                    },
                    medicalStudy: {
                        select: {
                            id: true,
                            studyName: true,
                            studyType: true,
                            studyDate: true,
                        },
                    },
                },
            }),
            this.prisma.examResult.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOneExamResult(id) {
        const result = await this.prisma.examResult.findUnique({
            where: { id },
            include: {
                exam: true,
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        identification: true,
                        birthdate: true,
                        gender: true,
                    },
                },
                medicalStudy: true,
            },
        });
        if (!result) {
            throw new common_1.NotFoundException(`Exam result with ID ${id} not found`);
        }
        return result;
    }
    async updateExamResult(id, updateDto) {
        await this.findOneExamResult(id);
        this.logger.log(`Updating exam result ${id}`);
        let isAbnormal;
        if (updateDto.numericValue !== undefined && updateDto.examId) {
            const exam = await this.prisma.examCatalog.findUnique({
                where: { id: updateDto.examId },
            });
            if (exam &&
                exam.dataType === 'numerico' &&
                exam.referenceMin !== null &&
                exam.referenceMax !== null) {
                const value = updateDto.numericValue;
                const min = Number(exam.referenceMin);
                const max = Number(exam.referenceMax);
                isAbnormal = value < min || value > max;
            }
        }
        return this.prisma.examResult.update({
            where: { id },
            data: {
                ...updateDto,
                ...(isAbnormal !== undefined && { isAbnormal }),
            },
            include: {
                exam: true,
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        identification: true,
                    },
                },
                medicalStudy: true,
            },
        });
    }
    async removeExamResult(id) {
        await this.findOneExamResult(id);
        this.logger.log(`Soft deleting exam result ${id}`);
        return this.prisma.examResult.update({
            where: { id },
            data: { active: false },
        });
    }
    async getPatientExamHistory(patientId, examId) {
        const where = {
            patientId,
            active: true,
        };
        if (examId) {
            where.examId = examId;
        }
        return this.prisma.examResult.findMany({
            where,
            orderBy: { resultDate: 'desc' },
            include: {
                exam: true,
            },
        });
    }
    async getAbnormalResults(patientId) {
        const where = {
            isAbnormal: true,
            active: true,
        };
        if (patientId) {
            where.patientId = patientId;
        }
        return this.prisma.examResult.findMany({
            where,
            orderBy: { resultDate: 'desc' },
            include: {
                exam: true,
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
    async addBatchExamResults(dto) {
        this.logger.log(`Adding ${dto.results.length} exam results to patient ${dto.patientId}`);
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: dto.patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${dto.patientId} not found`);
            }
            const examIds = dto.results.map((r) => r.examId);
            const exams = await this.prisma.examCatalog.findMany({
                where: { id: { in: examIds } },
            });
            if (exams.length !== examIds.length) {
                const foundIds = exams.map((e) => e.id);
                const missingIds = examIds.filter((id) => !foundIds.includes(id));
                throw new common_1.NotFoundException(`Exams not found: ${missingIds.join(', ')}`);
            }
            const examMap = new Map(exams.map((e) => [e.id, e]));
            const createdResults = await this.prisma.$transaction(dto.results.map((resultData) => {
                const exam = examMap.get(resultData.examId);
                if (!exam) {
                    throw new common_1.NotFoundException(`Exam configuration not found for ID ${resultData.examId}`);
                }
                let isAbnormal = resultData.isAbnormal;
                if (isAbnormal === undefined &&
                    resultData.numericValue !== undefined &&
                    exam.dataType === 'numerico' &&
                    exam.referenceMin !== null &&
                    exam.referenceMax !== null) {
                    const value = Number(resultData.numericValue);
                    const min = Number(exam.referenceMin);
                    const max = Number(exam.referenceMax);
                    isAbnormal = value < min || value > max;
                }
                return this.prisma.examResult.create({
                    data: {
                        patientId: dto.patientId,
                        examId: resultData.examId,
                        numericValue: resultData.numericValue
                            ? new client_1.Prisma.Decimal(resultData.numericValue)
                            : null,
                        textValue: resultData.textValue,
                        resultDate: new Date(resultData.resultDate),
                        isAbnormal: isAbnormal || false,
                        observations: resultData.observations,
                        orderedBy: resultData.orderedBy,
                        medicalStudyId: resultData.medicalStudyId,
                    },
                    include: {
                        exam: true,
                    },
                });
            }));
            this.logger.log(`Successfully added ${createdResults.length} exam results to patient ${dto.patientId}`);
            return {
                patientId: dto.patientId,
                resultsAdded: createdResults.length,
                results: createdResults,
            };
        }
        catch (error) {
            this.logger.error(`Error adding batch exam results: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.LaboratoryExamsService = LaboratoryExamsService;
exports.LaboratoryExamsService = LaboratoryExamsService = LaboratoryExamsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LaboratoryExamsService);
//# sourceMappingURL=laboratory-exams.service.js.map