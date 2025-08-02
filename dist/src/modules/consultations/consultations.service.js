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
exports.ConsultationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
let ConsultationsService = class ConsultationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createConsultationDto) {
        try {
            const appointment = await this.prisma.appointment.findUnique({
                where: { id: createConsultationDto.appointmentId },
            });
            if (!appointment) {
                throw new common_1.NotFoundException('La cita especificada no existe');
            }
            const existingConsultation = await this.prisma.consultation.findUnique({
                where: { appointmentId: createConsultationDto.appointmentId },
            });
            if (existingConsultation) {
                throw new common_1.BadRequestException('Ya existe una consulta para esta cita');
            }
            const user = await this.prisma.user.findUnique({
                where: { id: createConsultationDto.registeredByUserId },
            });
            if (!user) {
                throw new common_1.NotFoundException('El usuario especificado no existe');
            }
            const consultation = await this.prisma.consultation.create({
                data: {
                    ...createConsultationDto,
                    realizationDateTime: new Date(createConsultationDto.realizationDateTime),
                    suggestedNextControl: createConsultationDto.suggestedNextControl
                        ? new Date(createConsultationDto.suggestedNextControl)
                        : null,
                },
                include: {
                    appointment: {
                        include: {
                            patient: true,
                            medic: true,
                        },
                    },
                },
            });
            return consultation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error al crear la consulta');
        }
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, appointmentId, registeredByUserId, startDate, endDate, active, search, sortBy = 'realizationDateTime', sortOrder = 'desc', } = queryDto;
        const skip = (page - 1) * limit;
        const take = limit;
        const where = {};
        if (appointmentId) {
            where.appointmentId = appointmentId;
        }
        if (registeredByUserId) {
            where.registeredByUserId = registeredByUserId;
        }
        if (active !== undefined) {
            where.active = active;
        }
        if (startDate || endDate) {
            where.realizationDateTime = {};
            if (startDate) {
                where.realizationDateTime.gte = new Date(startDate);
            }
            if (endDate) {
                where.realizationDateTime.lte = new Date(endDate);
            }
        }
        if (search) {
            where.OR = [
                { anamnesis: { contains: search, mode: 'insensitive' } },
                { indicatedTreatment: { contains: search, mode: 'insensitive' } },
                { additionalMedicalNotes: { contains: search, mode: 'insensitive' } },
                { performedProcedures: { contains: search, mode: 'insensitive' } },
            ];
        }
        const orderBy = {};
        orderBy[sortBy] = sortOrder;
        try {
            const [consultations, total] = await Promise.all([
                this.prisma.consultation.findMany({
                    where,
                    skip,
                    take,
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
                                        specialty: true,
                                    },
                                },
                            },
                        },
                    },
                }),
                this.prisma.consultation.count({ where }),
            ]);
            return {
                data: consultations,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al obtener las consultas');
        }
    }
    async findOne(id) {
        try {
            const consultation = await this.prisma.consultation.findUnique({
                where: { id },
                include: {
                    appointment: {
                        include: {
                            patient: true,
                            medic: true,
                        },
                    },
                },
            });
            if (!consultation) {
                throw new common_1.NotFoundException('Consulta no encontrada');
            }
            return consultation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error al obtener la consulta');
        }
    }
    async update(id, updateConsultationDto) {
        try {
            const existingConsultation = await this.prisma.consultation.findUnique({
                where: { id },
            });
            if (!existingConsultation) {
                throw new common_1.NotFoundException('Consulta no encontrada');
            }
            if (updateConsultationDto.appointmentId && updateConsultationDto.appointmentId !== existingConsultation.appointmentId) {
                const appointment = await this.prisma.appointment.findUnique({
                    where: { id: updateConsultationDto.appointmentId },
                });
                if (!appointment) {
                    throw new common_1.NotFoundException('La cita especificada no existe');
                }
                const consultationWithSameAppointment = await this.prisma.consultation.findUnique({
                    where: { appointmentId: updateConsultationDto.appointmentId },
                });
                if (consultationWithSameAppointment) {
                    throw new common_1.BadRequestException('Ya existe una consulta para esta cita');
                }
            }
            if (updateConsultationDto.registeredByUserId) {
                const user = await this.prisma.user.findUnique({
                    where: { id: updateConsultationDto.registeredByUserId },
                });
                if (!user) {
                    throw new common_1.NotFoundException('El usuario especificado no existe');
                }
            }
            const updateData = { ...updateConsultationDto };
            if (updateConsultationDto.realizationDateTime) {
                updateData.realizationDateTime = new Date(updateConsultationDto.realizationDateTime);
            }
            if (updateConsultationDto.suggestedNextControl) {
                updateData.suggestedNextControl = new Date(updateConsultationDto.suggestedNextControl);
            }
            const consultation = await this.prisma.consultation.update({
                where: { id },
                data: updateData,
                include: {
                    appointment: {
                        include: {
                            patient: true,
                            medic: true,
                        },
                    },
                },
            });
            return consultation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error al actualizar la consulta');
        }
    }
    async remove(id) {
        try {
            const consultation = await this.prisma.consultation.findUnique({
                where: { id },
            });
            if (!consultation) {
                throw new common_1.NotFoundException('Consulta no encontrada');
            }
            const deletedConsultation = await this.prisma.consultation.update({
                where: { id },
                data: { active: false },
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
                                    specialty: true,
                                },
                            },
                        },
                    },
                },
            });
            return deletedConsultation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error al eliminar la consulta');
        }
    }
    async findByAppointmentId(appointmentId) {
        try {
            const consultation = await this.prisma.consultation.findUnique({
                where: { appointmentId },
                include: {
                    appointment: {
                        include: {
                            patient: true,
                            medic: true,
                        },
                    },
                },
            });
            return consultation;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al obtener la consulta por cita');
        }
    }
};
exports.ConsultationsService = ConsultationsService;
exports.ConsultationsService = ConsultationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConsultationsService);
//# sourceMappingURL=consultations.service.js.map