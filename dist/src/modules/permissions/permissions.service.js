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
var PermissionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let PermissionsService = PermissionsService_1 = class PermissionsService {
    prisma;
    logger = new common_1.Logger(PermissionsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPermissionDto) {
        try {
            const permission = await this.prisma.permission.create({
                data: createPermissionDto,
            });
            this.logger.log(`Permission created: ${permission.name}`);
            return permission;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Permission name already exists');
                }
            }
            throw error;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'asc' } = query;
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [permissions, total] = await Promise.all([
            this.prisma.permission.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    roles: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            this.prisma.permission.count({ where }),
        ]);
        return {
            data: permissions,
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
        const permission = await this.prisma.permission.findUnique({
            where: { id },
            include: {
                roles: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
            },
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permission with ID ${id} not found`);
        }
        return permission;
    }
    async findByName(name) {
        return this.prisma.permission.findUnique({
            where: { name },
            include: {
                roles: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    async update(id, updatePermissionDto) {
        try {
            const permission = await this.prisma.permission.update({
                where: { id },
                data: updatePermissionDto,
                include: {
                    roles: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            this.logger.log(`Permission updated: ${permission.name}`);
            return permission;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Permission name already exists');
                }
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Permission with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const permission = await this.prisma.permission.delete({
                where: { id },
            });
            this.logger.log(`Permission deleted: ${permission.name}`);
            return { message: 'Permission deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Permission with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
    async bulkCreate(permissions) {
        try {
            const result = await this.prisma.permission.createMany({
                data: permissions,
                skipDuplicates: true,
            });
            this.logger.log(`Created ${result.count} permissions`);
            return result;
        }
        catch (error) {
            this.logger.error('Error in bulk create permissions', error);
            throw error;
        }
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = PermissionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map