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
var SpecialtiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtiesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../config/database/prisma.service");
let SpecialtiesService = SpecialtiesService_1 = class SpecialtiesService {
    prisma;
    logger = new common_1.Logger(SpecialtiesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSpecialtyDto) {
        this.logger.log(`Creating specialty: ${createSpecialtyDto.name}`);
        try {
            const specialty = await this.prisma.specialty.create({
                data: createSpecialtyDto,
            });
            this.logger.log(`Specialty created successfully with ID: ${specialty.id}`);
            return specialty;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    this.logger.error(`Specialty name already exists: ${createSpecialtyDto.name}`);
                    throw new common_1.ConflictException('Ya existe una especialidad con este nombre');
                }
            }
            this.logger.error(`Error creating specialty: ${error.message}`);
            throw error;
        }
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search, active, sortBy = "name", sortOrder = "asc" } = queryDto;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (active !== undefined) {
            where.active = active;
        }
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [specialties, total] = await Promise.all([
            this.prisma.specialty.findMany({
                where,
                skip,
                take: limit,
                orderBy,
            }),
            this.prisma.specialty.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        this.logger.log(`Retrieved ${specialties.length} specialties (page ${page}/${totalPages})`);
        return {
            data: specialties,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }
    async findOne(id) {
        this.logger.log(`Finding specialty with ID: ${id}`);
        const specialty = await this.prisma.specialty.findUnique({
            where: { id },
            include: {
                medics: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        email: true,
                        professionalTitle: true,
                    },
                },
            },
        });
        if (!specialty) {
            this.logger.warn(`Specialty not found with ID: ${id}`);
            throw new common_1.NotFoundException('Especialidad no encontrada');
        }
        this.logger.log(`Specialty found: ${specialty.name}`);
        return specialty;
    }
    async update(id, updateSpecialtyDto) {
        this.logger.log(`Updating specialty with ID: ${id}`);
        await this.findOne(id);
        try {
            const updatedSpecialty = await this.prisma.specialty.update({
                where: { id },
                data: updateSpecialtyDto,
                include: {
                    medics: {
                        select: {
                            id: true,
                            name: true,
                            lastName: true,
                        },
                    },
                },
            });
            this.logger.log(`Specialty updated successfully: ${updatedSpecialty.name}`);
            return updatedSpecialty;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    this.logger.error(`Specialty name already exists: ${updateSpecialtyDto.name}`);
                    throw new common_1.ConflictException('Ya existe una especialidad con este nombre');
                }
            }
            this.logger.error(`Error updating specialty: ${error.message}`);
            throw error;
        }
    }
    async remove(id) {
        this.logger.log(`Removing specialty with ID: ${id}`);
        const specialty = await this.findOne(id);
        if (specialty.medics.length > 0) {
            this.logger.error(`Cannot delete specialty ${id}: has associated medic`);
            throw new common_1.ConflictException('No se puede eliminar una especialidad que tiene un médico asociado');
        }
        await this.prisma.specialty.delete({
            where: { id },
        });
        this.logger.log(`Specialty removed successfully: ${specialty.name}`);
        return { message: 'Especialidad eliminada exitosamente' };
    }
    async findByName(name) {
        this.logger.log(`Finding specialty by name: ${name}`);
        return this.prisma.specialty.findUnique({
            where: { name },
            include: {
                medics: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                    },
                },
            },
        });
    }
};
exports.SpecialtiesService = SpecialtiesService;
exports.SpecialtiesService = SpecialtiesService = SpecialtiesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpecialtiesService);
//# sourceMappingURL=specialties.service.js.map