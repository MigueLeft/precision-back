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
var ContactAttemptService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactAttemptService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let ContactAttemptService = ContactAttemptService_1 = class ContactAttemptService {
    prisma;
    logger = new common_1.Logger(ContactAttemptService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContactAttemptDto) {
        try {
            const followUp = await this.prisma.patientFollowUp.findUnique({
                where: { id: createContactAttemptDto.followUpId },
                include: { patient: true },
            });
            if (!followUp) {
                throw new common_1.BadRequestException(`Follow-up with ID ${createContactAttemptDto.followUpId} not found`);
            }
            if (createContactAttemptDto.newAppointmentId) {
                const appointment = await this.prisma.appointment.findUnique({
                    where: { id: createContactAttemptDto.newAppointmentId },
                });
                if (!appointment) {
                    throw new common_1.BadRequestException(`Appointment with ID ${createContactAttemptDto.newAppointmentId} not found`);
                }
            }
            if (createContactAttemptDto.rescheduleId) {
                const reschedule = await this.prisma.reschedule.findUnique({
                    where: { id: createContactAttemptDto.rescheduleId },
                });
                if (!reschedule) {
                    throw new common_1.BadRequestException(`Reschedule with ID ${createContactAttemptDto.rescheduleId} not found`);
                }
            }
            const contactAttempt = await this.prisma.contactAttempt.create({
                data: {
                    ...createContactAttemptDto,
                    contactDateTime: createContactAttemptDto.contactDateTime
                        ? new Date(createContactAttemptDto.contactDateTime)
                        : new Date(),
                },
                include: {
                    followUp: {
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
                        },
                    },
                    newAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    reschedule: {
                        select: {
                            id: true,
                            previousDateTime: true,
                            newDateTime: true,
                            rescheduleStatus: true,
                        },
                    },
                },
            });
            this.logger.log(`Contact attempt created for follow-up ${createContactAttemptDto.followUpId}, attempt #${createContactAttemptDto.attemptNumber}`);
            return contactAttempt;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('A contact attempt with these details already exists');
                }
            }
            throw error;
        }
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search, sortBy = 'contactDateTime', sortOrder = 'desc', ...filters } = queryDto;
        const skip = (page - 1) * limit;
        const dateFilters = {};
        if (queryDto.contactDateTimeFrom) {
            dateFilters.gte = new Date(queryDto.contactDateTimeFrom);
        }
        if (queryDto.contactDateTimeTo) {
            dateFilters.lte = new Date(queryDto.contactDateTimeTo);
        }
        const where = {
            ...filters,
            ...(search && {
                OR: [
                    {
                        followUp: {
                            patient: {
                                OR: [
                                    { firstName: { contains: search, mode: 'insensitive' } },
                                    { lastName: { contains: search, mode: 'insensitive' } },
                                    { email: { contains: search, mode: 'insensitive' } },
                                ],
                            },
                        },
                    },
                    { contactNotes: { contains: search, mode: 'insensitive' } },
                    { patientResponse: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(Object.keys(dateFilters).length > 0 && {
                contactDateTime: dateFilters,
            }),
        };
        const [contactAttempts, total] = await Promise.all([
            this.prisma.contactAttempt.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    followUp: {
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
                        },
                    },
                    newAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    reschedule: {
                        select: {
                            id: true,
                            previousDateTime: true,
                            newDateTime: true,
                            rescheduleStatus: true,
                        },
                    },
                },
            }),
            this.prisma.contactAttempt.count({ where }),
        ]);
        return {
            data: contactAttempts,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const contactAttempt = await this.prisma.contactAttempt.findUnique({
            where: { id },
            include: {
                followUp: {
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
                    },
                },
                newAppointment: {
                    select: {
                        id: true,
                        dateTime: true,
                        appointmentStatus: true,
                    },
                },
                reschedule: {
                    select: {
                        id: true,
                        previousDateTime: true,
                        newDateTime: true,
                        rescheduleStatus: true,
                    },
                },
            },
        });
        if (!contactAttempt) {
            throw new common_1.NotFoundException(`Contact attempt with ID ${id} not found`);
        }
        return contactAttempt;
    }
    async update(id, updateContactAttemptDto) {
        try {
            await this.findOne(id);
            const dataToUpdate = { ...updateContactAttemptDto };
            if (updateContactAttemptDto.contactDateTime) {
                dataToUpdate.contactDateTime = new Date(updateContactAttemptDto.contactDateTime);
            }
            const contactAttempt = await this.prisma.contactAttempt.update({
                where: { id },
                data: dataToUpdate,
                include: {
                    followUp: {
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
                        },
                    },
                    newAppointment: {
                        select: {
                            id: true,
                            dateTime: true,
                            appointmentStatus: true,
                        },
                    },
                    reschedule: {
                        select: {
                            id: true,
                            previousDateTime: true,
                            newDateTime: true,
                            rescheduleStatus: true,
                        },
                    },
                },
            });
            this.logger.log(`Contact attempt updated: ${id}`);
            return contactAttempt;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('A contact attempt with these details already exists');
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.prisma.contactAttempt.delete({
                where: { id },
            });
            this.logger.log(`Contact attempt deleted: ${id}`);
            return { message: 'Contact attempt deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.BadRequestException('Cannot delete contact attempt due to related records');
                }
            }
            throw error;
        }
    }
    async getByFollowUp(followUpId, queryDto) {
        return this.findAll({ ...queryDto, followUpId });
    }
    async getSuccessfulAttempts(queryDto) {
        return this.findAll({
            ...queryDto,
            contactResult: 'SUCCESSFUL',
        });
    }
    async getFailedAttempts(queryDto) {
        return this.findAll({
            ...queryDto,
            contactResult: 'NO_ANSWER',
        });
    }
    async getAttemptsWithAppointments(queryDto) {
        return this.findAll({
            ...queryDto,
            appointmentScheduled: true,
        });
    }
};
exports.ContactAttemptService = ContactAttemptService;
exports.ContactAttemptService = ContactAttemptService = ContactAttemptService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactAttemptService);
//# sourceMappingURL=contact-attempt.service.js.map