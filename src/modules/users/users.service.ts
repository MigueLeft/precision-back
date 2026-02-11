import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Verificar que el rol existe
      const roleExists = await this.prisma.role.findUnique({
        where: { id: createUserDto.roleId },
      });

      if (!roleExists) {
        throw new ConflictException(
          `Role with ID ${createUserDto.roleId} not found`,
        );
      }

      const userId = randomUUID();
      const user = await this.prisma.user.create({
        data: {
          id: userId,
          name: createUserDto.name,
          email: createUserDto.email,
          roleId: createUserDto.roleId,
        },
      });

      // Create credential account with password (Better Auth schema)
      if (createUserDto.password) {
        await this.prisma.account.create({
          data: {
            id: randomUUID(),
            accountId: userId,
            providerId: 'credential',
            userId: userId,
            password: createUserDto.password,
          },
        });
      }

      this.logger.log(`User created: ${user.name}`);
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          if (field?.includes('email')) {
            throw new ConflictException('Email already exists');
          }
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryUserDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      roleId,
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(roleId && { roleId }),
    };

    // Configurar el ordenamiento
    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          role: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
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

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Verificar que el rol existe si se proporciona
      if (updateUserDto.roleId) {
        const roleExists = await this.prisma.role.findUnique({
          where: { id: updateUserDto.roleId },
        });

        if (!roleExists) {
          throw new ConflictException(
            `Role with ID ${updateUserDto.roleId} not found`,
          );
        }
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      this.logger.log(`User updated: ${user.name}`);
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          if (field?.includes('email')) {
            throw new ConflictException('Email already exists');
          }
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });

      this.logger.log(`User deleted: ${user.name}`);
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
      throw error;
    }
  }
}
