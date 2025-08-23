import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { QueryMedicDto } from './dto/query-medic.dto';
 
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicsService {
  private readonly logger = new Logger(MedicsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createMedicDto: CreateMedicDto) {
    try {
      // Verificar que la especialidad existe
      const specialty = await this.prisma.specialty.findUnique({
        where: { id: createMedicDto.specialtyId },
      });

      if (!specialty) {
        throw new BadRequestException(`Specialty with ID ${createMedicDto.specialtyId} not found`);
      }


      // Verificar que el usuario existe si se proporciona userId
      if (createMedicDto.userId) {
        const user = await this.prisma.user.findUnique({
          where: { id: createMedicDto.userId },
        });

        if (!user) {
          throw new BadRequestException(`User with ID ${createMedicDto.userId} not found`);
        }

        // Verificar que el usuario no esté ya asignado a otro médico
        const existingMedic = await this.prisma.medic.findUnique({
          where: { userId: createMedicDto.userId },
        });

        if (existingMedic) {
          throw new ConflictException('User is already assigned to another medic');
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          if (field?.includes('identification')) {
            throw new ConflictException('Identification number already exists');
          }
          if (field?.includes('email')) {
            throw new ConflictException('Email already exists');
          }
          if (field?.includes('registrationNumber')) {
            throw new ConflictException('Registration number already exists');
          }
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryMedicDto) {
    const { page = 1, limit = 10, search, active, specialty, sortBy = 'id', sortOrder = 'asc' } = query;
    const skip = (page - 1) * limit;

    this.logger.log(`Raw query object: ${JSON.stringify(query)}`);
    this.logger.log(`Filtering medics with active: ${active} (type: ${typeof active})`);

    const where: Prisma.MedicWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { identification: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { specialty: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }),
      ...(active !== undefined && { active }),
      ...(specialty && { specialty: { name: { contains: specialty, mode: 'insensitive' } } }),
    };

    this.logger.log(`Where clause: ${JSON.stringify(where)}`);

    const orderBy: Prisma.MedicOrderByWithRelationInput = {
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

  async findOne(id: string) {
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
      throw new NotFoundException(`Medic with ID ${id} not found`);
    }

    return medic;
  }

  async findByIdentification(identification: string) {
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
      throw new NotFoundException(`Medic with identification ${identification} not found`);
    }

    return medic;
  }

  async findByEmail(email: string) {
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
      throw new NotFoundException(`Medic with email ${email} not found`);
    }

    return medic;
  }


  async update(id: string, updateMedicDto: UpdateMedicDto) {
    try {
      // Verificar que el médico existe
      const existingMedic = await this.prisma.medic.findUnique({
        where: { id },
      });

      if (!existingMedic) {
        throw new NotFoundException(`Medic with ID ${id} not found`);
      }

      // Verificar que el usuario existe si se proporciona userId
      if (updateMedicDto.userId) {
        const user = await this.prisma.user.findUnique({
          where: { id: updateMedicDto.userId },
        });

        if (!user) {
          throw new BadRequestException(`User with ID ${updateMedicDto.userId} not found`);
        }

        // Verificar que el usuario no esté ya asignado a otro médico
        if (updateMedicDto.userId !== existingMedic.userId) {
          const medicWithUser = await this.prisma.medic.findUnique({
            where: { userId: updateMedicDto.userId },
          });

          if (medicWithUser) {
            throw new ConflictException('User is already assigned to another medic');
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          if (field?.includes('identification')) {
            throw new ConflictException('Identification number already exists');
          }
          if (field?.includes('email')) {
            throw new ConflictException('Email already exists');
          }
          if (field?.includes('registrationNumber')) {
            throw new ConflictException('Registration number already exists');
          }
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const medic = await this.prisma.medic.delete({
        where: { id },
      });

      this.logger.log(`Medic deleted: ${medic.name} ${medic.lastName}`);
      return { message: 'Medic deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Medic with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async convertToUser(medicId: string) {
    try {
      // Verificar que el médico existe
      const existingMedic = await this.prisma.medic.findUnique({
        where: { id: medicId },
        include: {
          user: true,
          specialty: true,
        },
      });

      if (!existingMedic) {
        throw new NotFoundException(`Medic with ID ${medicId} not found`);
      }

      // Verificar que el médico no tenga ya un usuario asignado
      if (existingMedic.userId) {
        throw new ConflictException('Medic already has a user account');
      }

      // Buscar el rol MEDIC
      const medicRole = await this.prisma.role.findUnique({
        where: { name: 'MEDIC' },
      });

      if (!medicRole) {
        throw new BadRequestException('MEDIC role not found in the system');
      }

      // Verificar que no exista un usuario con el mismo email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: existingMedic.email },
      });

      if (existingUser) {
        throw new ConflictException('A user with this email already exists');
      }

      // Crear el usuario usando los datos del médico
      const newUser = await this.prisma.user.create({
        data: {
          name: `${existingMedic.name} ${existingMedic.lastName}`,
          email: existingMedic.email,
          password: existingMedic.identification, // Password será la identificación
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

      // Actualizar el médico con el ID del usuario creado
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Medic with ID ${medicId} not found`);
        }
      }
      throw error;
    }
  }

  async removeUser(medicId: string) {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Medic with ID ${medicId} not found`);
        }
      }
      throw error;
    }
  }

  async bulkCreate(medics: CreateMedicDto[]) {
    try {
      const createdMedics: any[] = [];
      
      for (const medicDto of medics) {
        const medic = await this.create(medicDto);
        createdMedics.push(medic);
      }

      this.logger.log(`Created ${createdMedics.length} medics`);
      return createdMedics;
    } catch (error) {
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
}