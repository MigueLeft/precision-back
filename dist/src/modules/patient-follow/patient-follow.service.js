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
var PatientFollowService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientFollowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let PatientFollowService = PatientFollowService_1 = class PatientFollowService {
    prisma;
    logger = new common_1.Logger(PatientFollowService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPatientFollowDto) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: createPatientFollowDto.patientId },
            });
            if (!patient) {
                throw new common_1.BadRequestException(`Patient with ID ${createPatientFollowDto.patientId} not found`);
            }
            if (createPatientFollowDto.originAppointmentId) {
                const originAppointment = await this.prisma.appointment.findUnique({
                    where: { id: createPatientFollowDto.originAppointmentId },
                });
                if (!originAppointment) {
                    throw new common_1.BadRequestException(`Origin appointment with ID ${createPatientFollowDto.originAppointmentId} not found`);
                }
            }
            if (createPatientFollowDto.resultingAppointmentId) {
                const resultingAppointment = await this.prisma.appointment.findUnique({
                    where: { id: createPatientFollowDto.resultingAppointmentId },
                });
                if (!resultingAppointment) {
                    throw new common_1.BadRequestException(`Resulting appointment with ID ${createPatientFollowDto.resultingAppointmentId} not found`);
                }
            }
            const patientFollow = await this.prisma.patientFollowUp.create({
                data: {
                    ...createPatientFollowDto,
                    scheduledContactDate: new Date(createPatientFollowDto.scheduledContactDate),
                    actualContactDate: createPatientFollowDto.actualContactDate
                        ? new Date(createPatientFollowDto.actualContactDate)
                        : undefined,
                    nextContactDate: createPatientFollowDto.nextContactDate
                        ? new Date(createPatientFollowDto.nextContactDate)
                        : undefined,
                    completedAt: createPatientFollowDto.completedAt
                        ? new Date(createPatientFollowDto.completedAt)
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
                    originAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    resultingAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    contactAttempts: true,
                    rescueEntries: true,
                },
            });
            this.logger.log(`Patient follow-up created for patient: ${patient.firstName} ${patient.lastName}`);
            return patientFollow;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('A follow-up with these details already exists');
                }
            }
            throw error;
        }
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', ...filters } = queryDto;
        const skip = (page - 1) * limit;
        const dateFilters = {};
        if (queryDto.scheduledContactDateFrom) {
            dateFilters.gte = new Date(queryDto.scheduledContactDateFrom);
        }
        if (queryDto.scheduledContactDateTo) {
            dateFilters.lte = new Date(queryDto.scheduledContactDateTo);
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
                    { notes: { contains: search, mode: 'insensitive' } },
                    { assignedTo: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(Object.keys(dateFilters).length > 0 && {
                scheduledContactDate: dateFilters,
            }),
        };
        const [patientFollows, total] = await Promise.all([
            this.prisma.patientFollowUp.findMany({
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
                    originAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    resultingAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    contactAttempts: {
                        orderBy: { attemptNumber: 'desc' },
                        take: 3,
                    },
                    rescueEntries: {
                        where: { status: 'ACTIVE' },
                    },
                },
            }),
            this.prisma.patientFollowUp.count({ where }),
        ]);
        return {
            data: patientFollows,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const patientFollow = await this.prisma.patientFollowUp.findUnique({
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
                originAppointment: {
                    select: {
                        id: true,
                        dateTime: true,
                        appointmentStatus: true,
                    },
                },
                resultingAppointment: {
                    select: {
                        id: true,
                        dateTime: true,
                        appointmentStatus: true,
                    },
                },
                contactAttempts: {
                    orderBy: { attemptNumber: 'asc' },
                },
                rescueEntries: true,
            },
        });
        if (!patientFollow) {
            throw new common_1.NotFoundException(`Patient follow-up with ID ${id} not found`);
        }
        return patientFollow;
    }
    async update(id, updatePatientFollowDto) {
        try {
            await this.findOne(id);
            const dataToUpdate = { ...updatePatientFollowDto };
            if (updatePatientFollowDto.scheduledContactDate) {
                dataToUpdate.scheduledContactDate = new Date(updatePatientFollowDto.scheduledContactDate);
            }
            if (updatePatientFollowDto.actualContactDate) {
                dataToUpdate.actualContactDate = new Date(updatePatientFollowDto.actualContactDate);
            }
            if (updatePatientFollowDto.nextContactDate) {
                dataToUpdate.nextContactDate = new Date(updatePatientFollowDto.nextContactDate);
            }
            if (updatePatientFollowDto.completedAt) {
                dataToUpdate.completedAt = new Date(updatePatientFollowDto.completedAt);
            }
            const patientFollow = await this.prisma.patientFollowUp.update({
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
                    originAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    resultingAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    contactAttempts: true,
                    rescueEntries: true,
                },
            });
            this.logger.log(`Patient follow-up updated: ${id}`);
            return patientFollow;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('A follow-up with these details already exists');
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.prisma.patientFollowUp.delete({
                where: { id },
            });
            this.logger.log(`Patient follow-up deleted: ${id}`);
            return { message: 'Patient follow-up deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.BadRequestException('Cannot delete follow-up due to related records');
                }
            }
            throw error;
        }
    }
    async incrementAttemptCount(id) {
        const patientFollow = await this.findOne(id);
        const updatedFollow = await this.prisma.patientFollowUp.update({
            where: { id },
            data: {
                attemptCount: patientFollow.attemptCount + 1,
                status: patientFollow.attemptCount + 1 >= patientFollow.maxAttempts
                    ? 'FAILED'
                    : 'IN_PROGRESS',
            },
            include: {
                patient: true,
                contactAttempts: true,
            },
        });
        this.logger.log(`Attempt count incremented for follow-up ${id}: ${updatedFollow.attemptCount}/${updatedFollow.maxAttempts}`);
        return updatedFollow;
    }
    async getByPatient(patientId, queryDto) {
        return this.findAll({ ...queryDto, patientId });
    }
    async getPendingFollowUps() {
        return this.findAll({
            status: 'PENDING',
            scheduledContactDateTo: new Date().toISOString(),
            active: true,
        });
    }
};
exports.PatientFollowService = PatientFollowService;
exports.PatientFollowService = PatientFollowService = PatientFollowService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientFollowService);
//# sourceMappingURL=patient-follow.service.js.map