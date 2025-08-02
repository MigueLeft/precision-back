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
var PatientsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let PatientsService = PatientsService_1 = class PatientsService {
    prisma;
    logger = new common_1.Logger(PatientsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPatientDto) {
        try {
            if (createPatientDto.userId) {
                const user = await this.prisma.user.findUnique({
                    where: { id: createPatientDto.userId },
                });
                if (!user) {
                    throw new common_1.BadRequestException(`User with ID ${createPatientDto.userId} not found`);
                }
                const existingPatient = await this.prisma.patient.findUnique({
                    where: { userId: createPatientDto.userId },
                });
                if (existingPatient) {
                    throw new common_1.ConflictException('User is already assigned to another patient');
                }
            }
            const patient = await this.prisma.patient.create({
                data: createPatientDto,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
            this.logger.log(`Patient created: ${patient.firstName} ${patient.lastName}`);
            return patient;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (field?.includes('identification')) {
                        throw new common_1.ConflictException('Identification number already exists');
                    }
                    if (field?.includes('email')) {
                        throw new common_1.ConflictException('Email already exists');
                    }
                    throw new common_1.ConflictException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, active, birthdateFrom, birthdateTo, sortBy = 'id', sortOrder = 'asc', gender } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(search && {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { identification: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(typeof active === 'boolean' && { active }),
            ...(birthdateFrom && birthdateTo && {
                birthdate: {
                    gte: new Date(birthdateFrom),
                    lte: new Date(birthdateTo),
                },
            }),
            ...(birthdateFrom && !birthdateTo && {
                birthdate: { gte: new Date(birthdateFrom) },
            }),
            ...(birthdateTo && !birthdateFrom && {
                birthdate: { lte: new Date(birthdateTo) },
            }),
            ...(gender && { gender }),
        };
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [patients, total] = await Promise.all([
            this.prisma.patient.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.patient.count({ where }),
        ]);
        return {
            data: patients,
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
        const patient = await this.prisma.patient.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: {
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
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        }
        return patient;
    }
    async findByIdentification(identification) {
        const patient = await this.prisma.patient.findUnique({
            where: { identification },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with identification ${identification} not found`);
        }
        return patient;
    }
    async findByEmail(email) {
        const patient = await this.prisma.patient.findUnique({
            where: { email },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with email ${email} not found`);
        }
        return patient;
    }
    async update(id, updatePatientDto) {
        try {
            const existingPatient = await this.prisma.patient.findUnique({
                where: { id },
            });
            if (!existingPatient) {
                throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
            }
            if (updatePatientDto.userId) {
                const user = await this.prisma.user.findUnique({
                    where: { id: updatePatientDto.userId },
                });
                if (!user) {
                    throw new common_1.BadRequestException(`User with ID ${updatePatientDto.userId} not found`);
                }
                if (updatePatientDto.userId !== existingPatient.userId) {
                    const patientWithUser = await this.prisma.patient.findUnique({
                        where: { userId: updatePatientDto.userId },
                    });
                    if (patientWithUser) {
                        throw new common_1.ConflictException('User is already assigned to another patient');
                    }
                }
            }
            const patient = await this.prisma.patient.update({
                where: { id },
                data: updatePatientDto,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            this.logger.log(`Patient updated: ${patient.firstName} ${patient.lastName}`);
            return patient;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (field?.includes('identification')) {
                        throw new common_1.ConflictException('Identification number already exists');
                    }
                    if (field?.includes('email')) {
                        throw new common_1.ConflictException('Email already exists');
                    }
                    throw new common_1.ConflictException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const patient = await this.prisma.patient.delete({
                where: { id },
            });
            this.logger.log(`Patient deleted: ${patient.firstName} ${patient.lastName}`);
            return { message: 'Patient deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
    async convertToUser(patientId) {
        try {
            const existingPatient = await this.prisma.patient.findUnique({
                where: { id: patientId },
                include: {
                    user: true,
                },
            });
            if (!existingPatient) {
                throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
            }
            if (existingPatient.userId) {
                throw new common_1.ConflictException('Patient already has a user account');
            }
            const patientRole = await this.prisma.role.findUnique({
                where: { name: 'PATIENT' },
            });
            if (!patientRole) {
                throw new common_1.BadRequestException('PATIENT role not found in the system');
            }
            const existingUser = await this.prisma.user.findUnique({
                where: { email: existingPatient.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('A user with this email already exists');
            }
            const newUser = await this.prisma.user.create({
                data: {
                    name: `${existingPatient.firstName} ${existingPatient.lastName}`,
                    email: existingPatient.email,
                    password: existingPatient.identification,
                    roleId: patientRole.id,
                },
                include: {
                    role: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            const patient = await this.prisma.patient.update({
                where: { id: patientId },
                data: { userId: newUser.id },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            this.logger.log(`Patient converted to user: ${patient.firstName} ${patient.lastName} (${newUser.email})`);
            return patient;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
                }
            }
            throw error;
        }
    }
    async removeUser(patientId) {
        try {
            const patient = await this.prisma.patient.update({
                where: { id: patientId },
                data: { userId: null },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
            this.logger.log(`User removed from patient: ${patient.firstName} ${patient.lastName}`);
            return patient;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Patient with ID ${patientId} not found`);
                }
            }
            throw error;
        }
    }
    async getActivePatients() {
        return this.prisma.patient.findMany({
            where: { active: true },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                identification: true,
                email: true,
                phone: true,
                birthdate: true,
                gender: true,
            },
            orderBy: [
                { firstName: 'asc' },
                { lastName: 'asc' },
            ],
        });
    }
    async bulkCreate(patients) {
        try {
            const createdPatients = [];
            for (const patientDto of patients) {
                const patient = await this.create(patientDto);
                createdPatients.push(patient);
            }
            this.logger.log(`Created ${createdPatients.length} patients`);
            return createdPatients;
        }
        catch (error) {
            this.logger.error('Error in bulk create patients', error);
            throw error;
        }
    }
    async getPatientStats() {
        const [total, active, inactive, withUser, withoutUser] = await Promise.all([
            this.prisma.patient.count(),
            this.prisma.patient.count({ where: { active: true } }),
            this.prisma.patient.count({ where: { active: false } }),
            this.prisma.patient.count({ where: { userId: { not: null } } }),
            this.prisma.patient.count({ where: { userId: null } }),
        ]);
        return {
            total,
            active,
            inactive,
            withUser,
            withoutUser,
            percentage: {
                active: total > 0 ? Math.round((active / total) * 100) : 0,
                withUser: total > 0 ? Math.round((withUser / total) * 100) : 0,
            },
        };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = PatientsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map