import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { QuerySpecialtyDto } from './dto/query-specialty.dto';

@Injectable()
export class SpecialtiesService {
  private readonly logger = new Logger(SpecialtiesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    this.logger.log(`Creating specialty: ${createSpecialtyDto.name}`);

    try {
      const specialty = await this.prisma.specialty.create({
        data: createSpecialtyDto,
      });

      this.logger.log(`Specialty created successfully with ID: ${specialty.id}`);
      return specialty;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.error(`Specialty name already exists: ${createSpecialtyDto.name}`);
          throw new ConflictException('Ya existe una especialidad con este nombre');
        }
      }
      this.logger.error(`Error creating specialty: ${error.message}`);
      throw error;
    }
  }

  async findAll(queryDto: QuerySpecialtyDto) {
    const { page = 1, limit = 10, search, active, sortBy = "name", sortOrder = "asc" } = queryDto;
    const skip = (page - 1) * limit;

    const where: Prisma.SpecialtyWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (active !== undefined) {
      where.active = active;
    }

    const orderBy: Prisma.SpecialtyOrderByWithRelationInput = {
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

  async findOne(id: string) {
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
      throw new NotFoundException('Especialidad no encontrada');
    }

    this.logger.log(`Specialty found: ${specialty.name}`);
    return specialty;
  }

  async update(id: string, updateSpecialtyDto: UpdateSpecialtyDto) {
    this.logger.log(`Updating specialty with ID: ${id}`);

    await this.findOne(id); // Verify specialty exists

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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.error(`Specialty name already exists: ${updateSpecialtyDto.name}`);
          throw new ConflictException('Ya existe una especialidad con este nombre');
        }
      }
      this.logger.error(`Error updating specialty: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string) {
    this.logger.log(`Removing specialty with ID: ${id}`);

    const specialty = await this.findOne(id); // Verify specialty exists

    // Check if specialty has associated medic
    if (specialty.medics.length > 0) {
      this.logger.error(`Cannot delete specialty ${id}: has associated medic`);
      throw new ConflictException('No se puede eliminar una especialidad que tiene un médico asociado');
    }

    await this.prisma.specialty.delete({
      where: { id },
    });

    this.logger.log(`Specialty removed successfully: ${specialty.name}`);
    return { message: 'Especialidad eliminada exitosamente' };
  }

  async findByName(name: string) {
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
}