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
var PhysicalExaminationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalExaminationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let PhysicalExaminationsService = PhysicalExaminationsService_1 = class PhysicalExaminationsService {
    prisma;
    logger = new common_1.Logger(PhysicalExaminationsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPhysicalExaminationDto) {
        this.logger.log('Creating physical examination');
        try {
            let calculatedBmi = createPhysicalExaminationDto.bmi;
            if (createPhysicalExaminationDto.weight &&
                createPhysicalExaminationDto.height) {
                calculatedBmi = Number((createPhysicalExaminationDto.weight /
                    Math.pow(createPhysicalExaminationDto.height, 2)).toFixed(2));
            }
            const examination = await this.prisma.physicalExamination.create({
                data: {
                    ...createPhysicalExaminationDto,
                    bmi: calculatedBmi,
                },
            });
            this.logger.log(`Physical examination created successfully: ${examination.id}`);
            return examination;
        }
        catch (error) {
            this.logger.error(`Error creating physical examination: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll(queryDto) {
        this.logger.log(`Fetching physical examinations with filters: ${JSON.stringify(queryDto)}`);
        const { page = 1, limit = 10, search, startDate, endDate, sortBy = 'createdAt', sortOrder = 'desc', } = queryDto;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                {
                    performedBy: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    generalFindings: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = new Date(startDate);
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate);
            }
        }
        try {
            const [examinations, total] = await Promise.all([
                this.prisma.physicalExamination.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: {
                        [sortBy]: sortOrder,
                    },
                    include: {
                        _count: {
                            select: {
                                patientPhysicalExaminations: true,
                            },
                        },
                    },
                }),
                this.prisma.physicalExamination.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                data: examinations,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                },
            };
        }
        catch (error) {
            this.logger.error(`Error fetching physical examinations: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        this.logger.log(`Fetching physical examination: ${id}`);
        try {
            const examination = await this.prisma.physicalExamination.findUnique({
                where: { id },
                include: {
                    patientPhysicalExaminations: {
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
                        orderBy: {
                            examinationDate: 'desc',
                        },
                    },
                },
            });
            if (!examination) {
                throw new common_1.NotFoundException(`Physical examination with ID ${id} not found`);
            }
            return examination;
        }
        catch (error) {
            this.logger.error(`Error fetching physical examination ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, updatePhysicalExaminationDto) {
        this.logger.log(`Updating physical examination: ${id}`);
        try {
            await this.findOne(id);
            let calculatedBmi = updatePhysicalExaminationDto.bmi;
            const existingExam = await this.prisma.physicalExamination.findUnique({
                where: { id },
                select: { weight: true, height: true, bmi: true },
            });
            const newWeight = updatePhysicalExaminationDto.weight ?? existingExam?.weight;
            const newHeight = updatePhysicalExaminationDto.height ?? existingExam?.height;
            if (newWeight &&
                newHeight &&
                (updatePhysicalExaminationDto.weight ||
                    updatePhysicalExaminationDto.height)) {
                calculatedBmi = Number((Number(newWeight) / Math.pow(Number(newHeight), 2)).toFixed(2));
            }
            const examination = await this.prisma.physicalExamination.update({
                where: { id },
                data: {
                    ...updatePhysicalExaminationDto,
                    bmi: calculatedBmi,
                },
            });
            this.logger.log(`Physical examination updated successfully: ${id}`);
            return examination;
        }
        catch (error) {
            this.logger.error(`Error updating physical examination ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        this.logger.log(`Removing physical examination: ${id}`);
        try {
            await this.findOne(id);
            await this.prisma.physicalExamination.delete({
                where: { id },
            });
            this.logger.log(`Physical examination removed successfully: ${id}`);
            return { message: 'Physical examination deleted successfully' };
        }
        catch (error) {
            this.logger.error(`Error removing physical examination ${id}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async assignToPatient(assignDto) {
        this.logger.log(`Assigning examination ${assignDto.physicalExaminationId} to patient ${assignDto.patientId}`);
        try {
            const [patient, examination] = await Promise.all([
                this.prisma.patient.findUnique({ where: { id: assignDto.patientId } }),
                this.prisma.physicalExamination.findUnique({
                    where: { id: assignDto.physicalExaminationId },
                }),
            ]);
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${assignDto.patientId} not found`);
            }
            if (!examination) {
                throw new common_1.NotFoundException(`Physical examination with ID ${assignDto.physicalExaminationId} not found`);
            }
            const patientExamination = await this.prisma.patientPhysicalExamination.create({
                data: {
                    patientId: assignDto.patientId,
                    physicalExaminationId: assignDto.physicalExaminationId,
                    examinationDate: new Date(assignDto.examinationDate),
                    notes: assignDto.notes,
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
                    physicalExamination: true,
                },
            });
            this.logger.log(`Physical examination assigned successfully to patient`);
            return patientExamination;
        }
        catch (error) {
            this.logger.error(`Error assigning examination to patient: ${error.message}`, error.stack);
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('This examination is already assigned to this patient on this date');
            }
            throw error;
        }
    }
    async getPatientExaminations(patientId) {
        this.logger.log(`Fetching examinations for patient: ${patientId}`);
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
            }
            const patientExaminations = await this.prisma.patientPhysicalExamination.findMany({
                where: { patientId },
                include: {
                    physicalExamination: true,
                },
                orderBy: {
                    examinationDate: 'desc',
                },
            });
            return patientExaminations;
        }
        catch (error) {
            this.logger.error(`Error fetching patient examinations: ${error.message}`, error.stack);
            throw error;
        }
    }
    async removePatientExamination(patientId, examinationId, examinationDate) {
        this.logger.log(`Removing examination ${examinationId} from patient ${patientId} on date ${examinationDate}`);
        try {
            const patientExamination = await this.prisma.patientPhysicalExamination.findFirst({
                where: {
                    patientId,
                    physicalExaminationId: examinationId,
                    examinationDate: new Date(examinationDate),
                },
            });
            if (!patientExamination) {
                throw new common_1.NotFoundException(`Patient examination relationship not found`);
            }
            await this.prisma.patientPhysicalExamination.delete({
                where: { id: patientExamination.id },
            });
            this.logger.log(`Patient examination removed successfully`);
            return { message: 'Patient examination removed successfully' };
        }
        catch (error) {
            this.logger.error(`Error removing patient examination: ${error.message}`, error.stack);
            throw error;
        }
    }
    async createAndAssignToPatient(patientId, createDto, examinationDate, notes) {
        this.logger.log(`Creating and assigning examination to patient ${patientId}`);
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
            }
            const examination = await this.create(createDto);
            const assignment = await this.assignToPatient({
                patientId,
                physicalExaminationId: examination.id,
                examinationDate,
                notes,
            });
            this.logger.log(`Examination created and assigned successfully to patient`);
            return assignment;
        }
        catch (error) {
            this.logger.error(`Error creating and assigning examination: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getPatientExaminationHistory(patientId) {
        this.logger.log(`Fetching examination history for patient: ${patientId}`);
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
            }
            const history = await this.prisma.patientPhysicalExamination.findMany({
                where: { patientId },
                include: {
                    physicalExamination: true,
                },
                orderBy: {
                    examinationDate: 'desc',
                },
            });
            const groupedHistory = history.reduce((acc, exam) => {
                const date = exam.examinationDate.toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(exam);
                return acc;
            }, {});
            return {
                patient: {
                    id: patient.id,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    identification: patient.identification,
                },
                totalExaminations: history.length,
                history: groupedHistory,
                chronologicalHistory: history,
            };
        }
        catch (error) {
            this.logger.error(`Error fetching patient examination history: ${error.message}`, error.stack);
            throw error;
        }
    }
    async upsertPatientPhysicalExam(patientId, dto) {
        this.logger.log(`Upserting physical examination for patient ${patientId}`);
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
            }
            const physicalExamData = {};
            if (dto.weight !== undefined)
                physicalExamData.weight = new client_1.Prisma.Decimal(dto.weight);
            if (dto.height !== undefined)
                physicalExamData.height = new client_1.Prisma.Decimal(dto.height);
            if (dto.bmi !== undefined)
                physicalExamData.bmi = new client_1.Prisma.Decimal(dto.bmi);
            if (dto.bloodPressureSystolic !== undefined)
                physicalExamData.bloodPressureSystolic = dto.bloodPressureSystolic;
            if (dto.bloodPressureDiastolic !== undefined)
                physicalExamData.bloodPressureDiastolic = dto.bloodPressureDiastolic;
            if (dto.heartRate !== undefined)
                physicalExamData.heartRate = dto.heartRate;
            if (dto.respiratoryRate !== undefined)
                physicalExamData.respiratoryRate = dto.respiratoryRate;
            if (dto.temperature !== undefined)
                physicalExamData.temperature = new client_1.Prisma.Decimal(dto.temperature);
            if (dto.oxygenSaturation !== undefined)
                physicalExamData.oxygenSaturation = dto.oxygenSaturation;
            if (dto.waistCircumference !== undefined)
                physicalExamData.waistCircumference = new client_1.Prisma.Decimal(dto.waistCircumference);
            if (dto.hipCircumference !== undefined)
                physicalExamData.hipCircumference = new client_1.Prisma.Decimal(dto.hipCircumference);
            if (dto.neckCircumference !== undefined)
                physicalExamData.neckCircumference = new client_1.Prisma.Decimal(dto.neckCircumference);
            if (dto.bodyFatPercentage !== undefined)
                physicalExamData.bodyFatPercentage = new client_1.Prisma.Decimal(dto.bodyFatPercentage);
            if (dto.muscleMassPercentage !== undefined)
                physicalExamData.muscleMassPercentage = new client_1.Prisma.Decimal(dto.muscleMassPercentage);
            if (dto.generalFindings !== undefined)
                physicalExamData.generalFindings = dto.generalFindings;
            if (dto.performedBy !== undefined)
                physicalExamData.performedBy = dto.performedBy;
            if (dto.notes !== undefined)
                physicalExamData.notes = dto.notes;
            const result = await this.prisma.$transaction(async (tx) => {
                const physicalExam = await tx.physicalExamination.create({
                    data: physicalExamData,
                });
                const patientExam = await tx.patientPhysicalExamination.create({
                    data: {
                        patientId: patientId,
                        physicalExaminationId: physicalExam.id,
                        examinationDate: dto.examinationDate
                            ? new Date(dto.examinationDate)
                            : new Date(),
                    },
                    include: {
                        physicalExamination: true,
                    },
                });
                return patientExam;
            });
            this.logger.log(`Physical examination created for patient ${patientId}: ${result.id}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Error upserting physical examination: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getLatestPatientExam(patientId) {
        this.logger.log(`Getting latest physical exam for patient ${patientId}`);
        const latestExam = await this.prisma.patientPhysicalExamination.findFirst({
            where: { patientId },
            include: {
                physicalExamination: true,
            },
            orderBy: {
                examinationDate: 'desc',
            },
        });
        if (!latestExam) {
            throw new common_1.NotFoundException(`No physical examinations found for patient ${patientId}`);
        }
        return latestExam;
    }
};
exports.PhysicalExaminationsService = PhysicalExaminationsService;
exports.PhysicalExaminationsService = PhysicalExaminationsService = PhysicalExaminationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhysicalExaminationsService);
//# sourceMappingURL=physical-examinations.service.js.map