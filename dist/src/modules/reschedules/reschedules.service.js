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
var ReschedulesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReschedulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let ReschedulesService = ReschedulesService_1 = class ReschedulesService {
    prisma;
    logger = new common_1.Logger(ReschedulesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRescheduleDto) {
        try {
            const appointmentExists = await this.prisma.appointment.findUnique({
                where: { id: createRescheduleDto.appointmentId },
                include: {
                    patient: { include: { user: true } },
                    medic: { include: { user: true } },
                },
            });
            if (!appointmentExists) {
                throw new common_1.NotFoundException(`Appointment with ID ${createRescheduleDto.appointmentId} not found`);
            }
            const conflictingAppointment = await this.prisma.appointment.findFirst({
                where: {
                    medicId: appointmentExists.medicId,
                    dateTime: new Date(createRescheduleDto.newDateTime),
                    id: { not: createRescheduleDto.appointmentId },
                    active: true,
                },
            });
            if (conflictingAppointment) {
                throw new common_1.ConflictException('The new time slot is already occupied by another appointment');
            }
            const rescheduleStatus = createRescheduleDto.rescheduleStatus || 'pending';
            const newDateTime = new Date(createRescheduleDto.newDateTime);
            if (rescheduleStatus === 'completed') {
                await this.prisma.appointment.update({
                    where: { id: createRescheduleDto.appointmentId },
                    data: { dateTime: newDateTime },
                });
            }
            const reschedule = await this.prisma.reschedule.create({
                data: {
                    appointmentId: createRescheduleDto.appointmentId,
                    previousDateTime: new Date(createRescheduleDto.previousDateTime),
                    newDateTime: newDateTime,
                    rescheduleReason: createRescheduleDto.rescheduleReason,
                    requestedBy: createRescheduleDto.requestedBy,
                    rescheduleStatus: rescheduleStatus,
                    notes: createRescheduleDto.notes,
                },
                include: {
                    appointment: {
                        include: {
                            patient: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    identification: true,
                                },
                            },
                            medic: {
                                select: {
                                    id: true,
                                    name: true,
                                    lastName: true,
                                    specialty: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            this.logger.log(`Reschedule created for appointment ${createRescheduleDto.appointmentId}`);
            return reschedule;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, appointmentId, rescheduleStatus, requestedBy, rescheduleReason, sortBy = 'createdAt', sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            active: true,
            ...(appointmentId && { appointmentId }),
            ...(rescheduleStatus && { rescheduleStatus }),
            ...(requestedBy && { requestedBy }),
            ...(rescheduleReason && { rescheduleReason }),
        };
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [reschedules, total] = await Promise.all([
            this.prisma.reschedule.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    appointment: {
                        include: {
                            patient: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    identification: true,
                                },
                            },
                            medic: {
                                select: {
                                    id: true,
                                    name: true,
                                    lastName: true,
                                    specialty: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.reschedule.count({ where }),
        ]);
        return {
            data: reschedules,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        };
    }
    async findOne(id) {
        const reschedule = await this.prisma.reschedule.findUnique({
            where: { id, active: true },
            include: {
                appointment: {
                    include: {
                        patient: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                identification: true,
                            },
                        },
                        medic: {
                            select: {
                                id: true,
                                name: true,
                                lastName: true,
                                specialty: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!reschedule) {
            throw new common_1.NotFoundException(`Reschedule with ID ${id} not found`);
        }
        return reschedule;
    }
    async update(id, updateRescheduleDto) {
        try {
            const existingReschedule = await this.prisma.reschedule.findUnique({
                where: { id, active: true },
                include: { appointment: true },
            });
            if (!existingReschedule) {
                throw new common_1.NotFoundException(`Reschedule with ID ${id} not found`);
            }
            if (updateRescheduleDto.rescheduleStatus === 'completed') {
                await this.prisma.appointment.update({
                    where: { id: existingReschedule.appointmentId },
                    data: { dateTime: existingReschedule.newDateTime },
                });
            }
            const reschedule = await this.prisma.reschedule.update({
                where: { id },
                data: {
                    ...updateRescheduleDto,
                    ...(updateRescheduleDto.newDateTime && {
                        newDateTime: new Date(updateRescheduleDto.newDateTime),
                    }),
                    ...(updateRescheduleDto.previousDateTime && {
                        previousDateTime: new Date(updateRescheduleDto.previousDateTime),
                    }),
                },
                include: {
                    appointment: {
                        include: {
                            patient: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    identification: true,
                                },
                            },
                            medic: {
                                select: {
                                    id: true,
                                    name: true,
                                    lastName: true,
                                    specialty: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            this.logger.log(`Reschedule updated: ${id} - Status: ${reschedule.rescheduleStatus}`);
            return reschedule;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const reschedule = await this.prisma.reschedule.update({
                where: { id },
                data: { active: false },
            });
            this.logger.log(`Reschedule soft deleted: ${id}`);
            return { message: 'Reschedule deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Reschedule with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
    async findByAppointment(appointmentId) {
        const reschedules = await this.prisma.reschedule.findMany({
            where: {
                appointmentId,
                active: true,
            },
            include: {
                appointment: {
                    select: {
                        id: true,
                        dateTime: true,
                        appointmentStatus: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return reschedules;
    }
};
exports.ReschedulesService = ReschedulesService;
exports.ReschedulesService = ReschedulesService = ReschedulesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReschedulesService);
//# sourceMappingURL=reschedules.service.js.map