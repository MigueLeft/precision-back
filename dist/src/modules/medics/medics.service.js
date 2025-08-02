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
var MedicsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let MedicsService = MedicsService_1 = class MedicsService {
    prisma;
    logger = new common_1.Logger(MedicsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMedicDto) {
        try {
            const specialty = await this.prisma.specialty.findUnique({
                where: { id: createMedicDto.specialtyId },
            });
            if (!specialty) {
                throw new common_1.BadRequestException(`Specialty with ID ${createMedicDto.specialtyId} not found`);
            }
            const existingMedicWithSpecialty = await this.prisma.medic.findUnique({
                where: { specialtyId: createMedicDto.specialtyId },
            });
            if (existingMedicWithSpecialty) {
                throw new common_1.ConflictException('Specialty is already assigned to another medic');
            }
            if (createMedicDto.userId) {
                const user = await this.prisma.user.findUnique({
                    where: { id: createMedicDto.userId },
                });
                if (!user) {
                    throw new common_1.BadRequestException(`User with ID ${createMedicDto.userId} not found`);
                }
                const existingMedic = await this.prisma.medic.findUnique({
                    where: { userId: createMedicDto.userId },
                });
                if (existingMedic) {
                    throw new common_1.ConflictException('User is already assigned to another medic');
                }
            }
            const medic = await this.prisma.medic.create({
                data: createMedicDto,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    specialty: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            });
            this.logger.log(`Medic created: ${medic.name} ${medic.lastName}`);
            return medic;
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
                    if (field?.includes('registrationNumber')) {
                        throw new common_1.ConflictException('Registration number already exists');
                    }
                    throw new common_1.ConflictException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, active, specialty, sortBy = 'id', sortOrder = 'asc' } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { identification: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { specialty: { name: { contains: search, mode: 'insensitive' } } },
                ],
            }),
            ...(typeof active === 'boolean' && { active }),
            ...(specialty && { specialty: { name: { contains: specialty, mode: 'insensitive' } } }),
        };
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [medics, total] = await Promise.all([
            this.prisma.medic.findMany({
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
                    specialty: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            }),
            this.prisma.medic.count({ where }),
        ]);
        return {
            data: medics,
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
        const medic = await this.prisma.medic.findUnique({
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
        if (!medic) {
            throw new common_1.NotFoundException(`Medic with ID ${id} not found`);
        }
        return medic;
    }
    async findByIdentification(identification) {
        const medic = await this.prisma.medic.findUnique({
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
        if (!medic) {
            throw new common_1.NotFoundException(`Medic with identification ${identification} not found`);
        }
        return medic;
    }
    async findByEmail(email) {
        const medic = await this.prisma.medic.findUnique({
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
        if (!medic) {
            throw new common_1.NotFoundException(`Medic with email ${email} not found`);
        }
        return medic;
    }
    async update(id, updateMedicDto) {
        try {
            const existingMedic = await this.prisma.medic.findUnique({
                where: { id },
            });
            if (!existingMedic) {
                throw new common_1.NotFoundException(`Medic with ID ${id} not found`);
            }
            if (updateMedicDto.userId) {
                const user = await this.prisma.user.findUnique({
                    where: { id: updateMedicDto.userId },
                });
                if (!user) {
                    throw new common_1.BadRequestException(`User with ID ${updateMedicDto.userId} not found`);
                }
                if (updateMedicDto.userId !== existingMedic.userId) {
                    const medicWithUser = await this.prisma.medic.findUnique({
                        where: { userId: updateMedicDto.userId },
                    });
                    if (medicWithUser) {
                        throw new common_1.ConflictException('User is already assigned to another medic');
                    }
                }
            }
            const medic = await this.prisma.medic.update({
                where: { id },
                data: updateMedicDto,
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
                    specialty: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            });
            this.logger.log(`Medic updated: ${medic.name} ${medic.lastName}`);
            return medic;
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
                    if (field?.includes('registrationNumber')) {
                        throw new common_1.ConflictException('Registration number already exists');
                    }
                    throw new common_1.ConflictException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const medic = await this.prisma.medic.delete({
                where: { id },
            });
            this.logger.log(`Medic deleted: ${medic.name} ${medic.lastName}`);
            return { message: 'Medic deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Medic with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
    async convertToUser(medicId) {
        try {
            const existingMedic = await this.prisma.medic.findUnique({
                where: { id: medicId },
                include: {
                    user: true,
                    specialty: true,
                },
            });
            if (!existingMedic) {
                throw new common_1.NotFoundException(`Medic with ID ${medicId} not found`);
            }
            if (existingMedic.userId) {
                throw new common_1.ConflictException('Medic already has a user account');
            }
            const medicRole = await this.prisma.role.findUnique({
                where: { name: 'MEDIC' },
            });
            if (!medicRole) {
                throw new common_1.BadRequestException('MEDIC role not found in the system');
            }
            const existingUser = await this.prisma.user.findUnique({
                where: { email: existingMedic.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('A user with this email already exists');
            }
            const newUser = await this.prisma.user.create({
                data: {
                    name: `${existingMedic.name} ${existingMedic.lastName}`,
                    email: existingMedic.email,
                    password: existingMedic.identification,
                    roleId: medicRole.id,
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
            const medic = await this.prisma.medic.update({
                where: { id: medicId },
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
                    specialty: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            });
            this.logger.log(`Medic converted to user: ${medic.name} ${medic.lastName} (${newUser.email})`);
            return medic;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Medic with ID ${medicId} not found`);
                }
            }
            throw error;
        }
    }
    async removeUser(medicId) {
        try {
            const medic = await this.prisma.medic.update({
                where: { id: medicId },
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
            this.logger.log(`User removed from medic: ${medic.name} ${medic.lastName}`);
            return medic;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Medic with ID ${medicId} not found`);
                }
            }
            throw error;
        }
    }
    async getActiveMedics() {
        return this.prisma.medic.findMany({
            where: { active: true },
            select: {
                id: true,
                name: true,
                lastName: true,
                identification: true,
                email: true,
                phone: true,
                professionalTitle: true,
                specialty: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
            },
            orderBy: [
                { name: 'asc' },
                { lastName: 'asc' },
            ],
        });
    }
    async bulkCreate(medics) {
        try {
            const createdMedics = [];
            for (const medicDto of medics) {
                const medic = await this.create(medicDto);
                createdMedics.push(medic);
            }
            this.logger.log(`Created ${createdMedics.length} medics`);
            return createdMedics;
        }
        catch (error) {
            this.logger.error('Error in bulk create medics', error);
            throw error;
        }
    }
    async getMedicStats() {
        const [total, active, inactive, withUser, withoutUser] = await Promise.all([
            this.prisma.medic.count(),
            this.prisma.medic.count({ where: { active: true } }),
            this.prisma.medic.count({ where: { active: false } }),
            this.prisma.medic.count({ where: { userId: { not: null } } }),
            this.prisma.medic.count({ where: { userId: null } }),
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
exports.MedicsService = MedicsService;
exports.MedicsService = MedicsService = MedicsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicsService);
//# sourceMappingURL=medics.service.js.map