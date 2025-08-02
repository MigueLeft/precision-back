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
var RolesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
const client_1 = require("@prisma/client");
let RolesService = RolesService_1 = class RolesService {
    prisma;
    logger = new common_1.Logger(RolesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoleDto) {
        const { permissionIds, ...roleData } = createRoleDto;
        try {
            if (permissionIds && permissionIds.length > 0) {
                const existingPermissions = await this.prisma.role.findMany({
                    where: { id: { in: permissionIds } },
                });
                if (existingPermissions.length !== permissionIds.length) {
                    const foundIds = existingPermissions.map((p) => p.id);
                    const missingIds = permissionIds.filter((id) => !foundIds.includes(id));
                    throw new common_1.BadRequestException(`Permissions not found: ${missingIds.join(', ')}`);
                }
            }
            const role = await this.prisma.role.create({
                data: {
                    ...roleData,
                    permissions: permissionIds && permissionIds.length > 0
                        ? {
                            connect: permissionIds.map((id) => ({ id })),
                        }
                        : undefined,
                },
                include: {
                    permissions: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            });
            this.logger.log(`Role created: ${role.name}`);
            return role;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Role name already exists');
                }
            }
            throw error;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, isSystem, sortBy = 'id', sortOrder = 'asc', } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(typeof isSystem === 'boolean' && { isSystem }),
        };
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [roles, total] = await Promise.all([
            this.prisma.role.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    permissions: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                    _count: {
                        select: {
                            users: true,
                        },
                    },
                },
            }),
            this.prisma.role.count({ where }),
        ]);
        return {
            data: roles,
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
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                    },
                },
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
    async findByName(name) {
        return this.prisma.role.findUnique({
            where: { name },
            include: {
                permissions: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
            },
        });
    }
    async update(id, updateRoleDto) {
        const { permissionIds, ...roleData } = updateRoleDto;
        try {
            const existingRole = await this.prisma.role.findUnique({
                where: { id },
            });
            if (!existingRole) {
                throw new common_1.NotFoundException(`Role with ID ${id} not found`);
            }
            if (permissionIds && permissionIds.length > 0) {
                const existingPermissions = await this.prisma.permission.findMany({
                    where: { id: { in: permissionIds } },
                });
                if (existingPermissions.length !== permissionIds.length) {
                    const foundIds = existingPermissions.map((p) => p.id);
                    const missingIds = permissionIds.filter((id) => !foundIds.includes(id));
                    throw new common_1.BadRequestException(`Permissions not found: ${missingIds.join(', ')}`);
                }
            }
            const role = await this.prisma.role.update({
                where: { id },
                data: {
                    ...roleData,
                    ...(permissionIds !== undefined && {
                        permissions: {
                            set: permissionIds.map((id) => ({ id })),
                        },
                    }),
                },
                include: {
                    permissions: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            });
            this.logger.log(`Role updated: ${role.name}`);
            return role;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException('Role name already exists');
                }
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const roleWithUsers = await this.prisma.role.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            users: true,
                        },
                    },
                },
            });
            if (!roleWithUsers) {
                throw new common_1.NotFoundException(`Role with ID ${id} not found`);
            }
            if (roleWithUsers._count.users > 0) {
                throw new common_1.ConflictException('Cannot delete role with assigned users');
            }
            if (roleWithUsers.isSystem) {
                throw new common_1.ConflictException('Cannot delete system role');
            }
            const role = await this.prisma.role.delete({
                where: { id },
            });
            this.logger.log(`Role deleted: ${role.name}`);
            return { message: 'Role deleted successfully' };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Role with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
    async assignPermissions(roleId, assignPermissionsDto) {
        const { permissionIds } = assignPermissionsDto;
        try {
            const existingRole = await this.prisma.role.findUnique({
                where: { id: roleId },
            });
            if (!existingRole) {
                throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
            }
            const existingPermissions = await this.prisma.permission.findMany({
                where: { id: { in: permissionIds } },
            });
            if (existingPermissions.length !== permissionIds.length) {
                const foundIds = existingPermissions.map((p) => p.id);
                const missingIds = permissionIds.filter((id) => !foundIds.includes(id));
                throw new common_1.BadRequestException(`Permissions not found: ${missingIds.join(', ')}`);
            }
            const role = await this.prisma.role.update({
                where: { id: roleId },
                data: {
                    permissions: {
                        set: permissionIds.map((id) => ({ id })),
                    },
                },
                include: {
                    permissions: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            });
            this.logger.log(`Permissions assigned to role: ${role.name}`);
            return role;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
                }
            }
            throw error;
        }
    }
    async removePermissions(roleId, permissionIds) {
        try {
            const existingRole = await this.prisma.role.findUnique({
                where: { id: roleId },
                include: {
                    permissions: true,
                },
            });
            if (!existingRole) {
                throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
            }
            const role = await this.prisma.role.update({
                where: { id: roleId },
                data: {
                    permissions: {
                        disconnect: permissionIds.map((id) => ({ id })),
                    },
                },
                include: {
                    permissions: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            });
            this.logger.log(`Permissions removed from role: ${role.name}`);
            return role;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
                }
            }
            throw error;
        }
    }
    async getRolePermissions(roleId) {
        const role = await this.prisma.role.findUnique({
            where: { id: roleId },
            include: {
                permissions: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
        }
        return role.permissions;
    }
    async bulkCreate(roles) {
        try {
            const createdRoles = [];
            for (const roleDto of roles) {
                const role = await this.create(roleDto);
                createdRoles.push(role);
            }
            this.logger.log(`Created ${createdRoles.length} roles`);
            return createdRoles;
        }
        catch (error) {
            this.logger.error('Error in bulk create roles', error);
            throw error;
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = RolesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map