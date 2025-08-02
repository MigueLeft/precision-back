// src/modules/permissions/permissions.service.ts
import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto'; 
import { UpdatePermissionDto } from './dto/update-permission.dto'; 
import { QueryPermissionDto } from './dto/query-permission.dto'; 
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionsService {
  private readonly logger = new Logger(PermissionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission = await this.prisma.permission.create({
        data: createPermissionDto,
      });
      
      this.logger.log(`Permission created: ${permission.name}`);
      return permission;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Permission name already exists');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryPermissionDto) {
    const { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'asc' } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PermissionWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy: Prisma.PermissionOrderByWithRelationInput = {
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

  async findOne(id: number) {
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
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return permission;
  }

  async findByName(name: string) {
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

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Permission name already exists');
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(`Permission with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const permission = await this.prisma.permission.delete({
        where: { id },
      });

      this.logger.log(`Permission deleted: ${permission.name}`);
      return { message: 'Permission deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Permission with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async bulkCreate(permissions: CreatePermissionDto[]) {
    try {
      const result = await this.prisma.permission.createMany({
        data: permissions,
        skipDuplicates: true,
      });

      this.logger.log(`Created ${result.count} permissions`);
      return result;
    } catch (error) {
      this.logger.error('Error in bulk create permissions', error);
      throw error;
    }
  }
}