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
var AppointmentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentsService = AppointmentsService_1 = class AppointmentsService {
    prisma;
    logger = new common_1.Logger(AppointmentsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAppointmentDto) {
        try {
            const patientExists = await this.prisma.patient.findUnique({
                where: { id: createAppointmentDto.patientId },
            });
            if (!patientExists) {
                throw new common_1.ConflictException(`Patient with ID ${createAppointmentDto.patientId} not found`);
            }
            const medicExists = await this.prisma.medic.findUnique({
                where: { id: createAppointmentDto.medicId },
            });
            if (!medicExists) {
                throw new common_1.ConflictException(`Medic with ID ${createAppointmentDto.medicId} not found`);
            }
            const existingAppointment = await this.prisma.appointment.findFirst({
                where: {
                    medicId: createAppointmentDto.medicId,
                    dateTime: createAppointmentDto.dateTime,
                },
            });
            if (existingAppointment) {
                throw new common_1.ConflictException('A appointment already exists for this medic at the specified time.');
            }
            const appointment = await this.prisma.appointment.create({
                data: createAppointmentDto,
            });
            this.logger.log(`Appointment created: ${appointment.id}`);
            return appointment;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    throw new common_1.ConflictException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, specificDate, startDate, endDate, specificTime, appointmentStatus, patientId, medicId, sortBy = 'dateTime', sortOrder = 'asc' } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(search && {
                OR: [
                    { reason: { contains: search, mode: 'insensitive' } },
                    { notes: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(appointmentStatus && { appointmentStatus }),
            ...(patientId && { patientId }),
            ...(medicId && { medicId }),
            ...(specificDate && {
                dateTime: {
                    gte: new Date(`${specificDate}T00:00:00Z`),
                    lt: new Date(`${specificDate}T23:59:59Z`),
                },
            }),
            ...(startDate && endDate && {
                dateTime: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            }),
            ...(startDate && !endDate && {
                dateTime: {
                    gte: new Date(startDate),
                },
            }),
            ...(endDate && !startDate && {
                dateTime: {
                    lte: new Date(endDate),
                },
            }),
        };
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [appointments, total] = await Promise.all([
            this.prisma.appointment.findMany({
                where,
                skip,
                take: limit,
                orderBy,
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
                                    description: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.appointment.count({ where }),
        ]);
        const filteredAppointments = specificTime
            ? appointments.filter(appointment => {
                const appointmentTime = new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return appointmentTime === specificTime;
            })
            : appointments;
        const finalTotal = specificTime ? filteredAppointments.length : total;
        return {
            data: filteredAppointments,
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
        const appointment = await this.prisma.appointment.findUnique({
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
                medic: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        email: true,
                        specialty: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async update(id, updateAppointmentDto) {
        try {
            const existingAppointment = await this.prisma.appointment.findUnique({
                where: { id },
            });
            if (!existingAppointment) {
                throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
            }
            const appointment = await this.prisma.appointment.update({
                where: { id },
                data: updateAppointmentDto,
            });
            this.logger.log(`Appointment updated: ${appointment.id}`);
            return appointment;
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
            const appointment = await this.prisma.appointment.delete({
                where: { id },
            });
            this.logger.log(`Appointment deleted: ${appointment.id}`);
            return { message: 'Appointment deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = AppointmentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map