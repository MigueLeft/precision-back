// src/modules/roles/roles.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { permissionIds, ...roleData } = createRoleDto;

    try {
      // Verificar que los permisos existen si se proporcionaron
      if (permissionIds && permissionIds.length > 0) {
        const existingPermissions = await this.prisma.role.findMany({
          where: { id: { in: permissionIds } },
        });

        if (existingPermissions.length !== permissionIds.length) {
          const foundIds = existingPermissions.map((p) => p.id);
          const missingIds = permissionIds.filter(
            (id) => !foundIds.includes(id),
          );
          throw new BadRequestException(
            `Permissions not found: ${missingIds.join(', ')}`,
          );
        }
      }

      const role = await this.prisma.role.create({
        data: {
          ...roleData,
          permissions:
            permissionIds && permissionIds.length > 0
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Role name already exists');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryRoleDto) {
    const {
      page = 1,
      limit = 10,
      search,
      isSystem,
      sortBy = 'id',
      sortOrder = 'asc',
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.RoleWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(typeof isSystem === 'boolean' && { isSystem }),
    };

    const orderBy: Prisma.RoleOrderByWithRelationInput = {
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

  async findOne(id: number) {
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
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async findByName(name: string) {
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

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissionIds, ...roleData } = updateRoleDto;

    try {
      // Verificar que el rol existe
      const existingRole = await this.prisma.role.findUnique({
        where: { id },
      });

      if (!existingRole) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      // Verificar que los permisos existen si se proporcionaron
      if (permissionIds && permissionIds.length > 0) {
        const existingPermissions = await this.prisma.permission.findMany({
          where: { id: { in: permissionIds } },
        });

        if (existingPermissions.length !== permissionIds.length) {
          const foundIds = existingPermissions.map((p) => p.id);
          const missingIds = permissionIds.filter(
            (id) => !foundIds.includes(id),
          );
          throw new BadRequestException(
            `Permissions not found: ${missingIds.join(', ')}`,
          );
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Role name already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      // Verificar si el rol tiene usuarios asignados
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
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      if (roleWithUsers._count.users > 0) {
        throw new ConflictException('Cannot delete role with assigned users');
      }

      if (roleWithUsers.isSystem) {
        throw new ConflictException('Cannot delete system role');
      }

      const role = await this.prisma.role.delete({
        where: { id },
      });

      this.logger.log(`Role deleted: ${role.name}`);
      return { message: 'Role deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Role with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async assignPermissions(
    roleId: number,
    assignPermissionsDto: AssignPermissionsDto,
  ) {
    const { permissionIds } = assignPermissionsDto;

    try {
      // Verificar que el rol existe
      const existingRole = await this.prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!existingRole) {
        throw new NotFoundException(`Role with ID ${roleId} not found`);
      }

      // Verificar que todos los permisos existen
      const existingPermissions = await this.prisma.permission.findMany({
        where: { id: { in: permissionIds } },
      });

      if (existingPermissions.length !== permissionIds.length) {
        const foundIds = existingPermissions.map((p) => p.id);
        const missingIds = permissionIds.filter((id) => !foundIds.includes(id));
        throw new BadRequestException(
          `Permissions not found: ${missingIds.join(', ')}`,
        );
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Role with ID ${roleId} not found`);
        }
      }
      throw error;
    }
  }

  async removePermissions(roleId: number, permissionIds: number[]) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { id: roleId },
        include: {
          permissions: true,
        },
      });

      if (!existingRole) {
        throw new NotFoundException(`Role with ID ${roleId} not found`);
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Role with ID ${roleId} not found`);
        }
      }
      throw error;
    }
  }

  async getRolePermissions(roleId: number) {
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
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    return role.permissions;
  }

  async bulkCreate(roles: CreateRoleDto[]) {
    try {
      const createdRoles: any[] = [];

      for (const roleDto of roles) {
        const role = await this.create(roleDto);
        createdRoles.push(role);
      }

      this.logger.log(`Created ${createdRoles.length} roles`);
      return createdRoles;
    } catch (error) {
      this.logger.error('Error in bulk create roles', error);
      throw error;
    }
  }
}
