import { Injectable, NotFoundException, BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateRescueDirectoryDto } from './dto/create-rescue-directory.dto';
import { UpdateRescueDirectoryDto } from './dto/update-rescue-directory.dto';
import { QueryRescueDirectoryDto } from './dto/query-rescue-directory.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RescueDirectoryService {
  private readonly logger = new Logger(RescueDirectoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createRescueDirectoryDto: CreateRescueDirectoryDto) {
    try {
      // Verificar que el paciente existe
      const patient = await this.prisma.patient.findUnique({
        where: { id: createRescueDirectoryDto.patientId },
      });

      if (!patient) {
        throw new BadRequestException(`Patient with ID ${createRescueDirectoryDto.patientId} not found`);
      }

      // Verificar que el seguimiento original existe
      const originalFollowUp = await this.prisma.patientFollowUp.findUnique({
        where: { id: createRescueDirectoryDto.originalFollowUpId },
      });

      if (!originalFollowUp) {
        throw new BadRequestException(`Follow-up with ID ${createRescueDirectoryDto.originalFollowUpId} not found`);
      }

      // Verificar que no existe ya una entrada activa para este paciente y seguimiento
      const existingEntry = await this.prisma.rescueDirectory.findFirst({
        where: {
          patientId: createRescueDirectoryDto.patientId,
          originalFollowUpId: createRescueDirectoryDto.originalFollowUpId,
          status: 'ACTIVE',
        },
      });

      if (existingEntry) {
        throw new ConflictException('An active rescue entry already exists for this patient and follow-up');
      }

      const rescueDirectory = await this.prisma.rescueDirectory.create({
        data: {
          ...createRescueDirectoryDto,
          entryDate: createRescueDirectoryDto.entryDate ? 
            new Date(createRescueDirectoryDto.entryDate) : new Date(),
          exitDate: createRescueDirectoryDto.exitDate ? 
            new Date(createRescueDirectoryDto.exitDate) : undefined,
          lastContactDate: createRescueDirectoryDto.lastContactDate ? 
            new Date(createRescueDirectoryDto.lastContactDate) : undefined,
          lastAttemptDate: createRescueDirectoryDto.lastAttemptDate ? 
            new Date(createRescueDirectoryDto.lastAttemptDate) : undefined,
          reactivatedAt: createRescueDirectoryDto.reactivatedAt ? 
            new Date(createRescueDirectoryDto.reactivatedAt) : undefined,
        },
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          originalFollowUp: {
            select: {
              id: true,
              followUpType: true,
              status: true,
              scheduledContactDate: true,
              attemptCount: true,
              maxAttempts: true,
            },
          },
        },
      });

      this.logger.log(`Patient ${patient.firstName} ${patient.lastName} added to rescue directory due to ${createRescueDirectoryDto.rescueReason}`);
      return rescueDirectory;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('A rescue entry with these details already exists');
        }
      }
      throw error;
    }
  }

  async findAll(queryDto: QueryRescueDirectoryDto) {
    const { page = 1, limit = 10, search, sortBy = 'entryDate', sortOrder = 'desc', ...filters } = queryDto;
    const skip = (page - 1) * limit;

    // Construir filtros de fecha para entryDate
    const entryDateFilters: any = {};
    if (queryDto.entryDateFrom) {
      entryDateFilters.gte = new Date(queryDto.entryDateFrom);
    }
    if (queryDto.entryDateTo) {
      entryDateFilters.lte = new Date(queryDto.entryDateTo);
    }

    // Construir filtros de fecha para lastContactDate
    const lastContactDateFilters: any = {};
    if (queryDto.lastContactDateFrom) {
      lastContactDateFilters.gte = new Date(queryDto.lastContactDateFrom);
    }
    if (queryDto.lastContactDateTo) {
      lastContactDateFilters.lte = new Date(queryDto.lastContactDateTo);
    }

    // Construir filtros
    const where: Prisma.RescueDirectoryWhereInput = {
      ...filters,
      ...(search && {
        OR: [
          {
            patient: {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
              ],
            },
          },
          { rescueNotes: { contains: search, mode: 'insensitive' } },
          { reactivationNotes: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(Object.keys(entryDateFilters).length > 0 && {
        entryDate: entryDateFilters,
      }),
      ...(Object.keys(lastContactDateFilters).length > 0 && {
        lastContactDate: lastContactDateFilters,
      }),
      ...(queryDto.minPreviousAttempts && {
        totalPreviousAttempts: {
          gte: queryDto.minPreviousAttempts,
        },
      }),
    };

    const [rescueEntries, total] = await Promise.all([
      this.prisma.rescueDirectory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy as string]: sortOrder },
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          originalFollowUp: {
            select: {
              id: true,
              followUpType: true,
              status: true,
              scheduledContactDate: true,
              attemptCount: true,
              maxAttempts: true,
            },
          },
        },
      }),
      this.prisma.rescueDirectory.count({ where }),
    ]);

    return {
      data: rescueEntries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const rescueEntry = await this.prisma.rescueDirectory.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        originalFollowUp: {
          include: {
            contactAttempts: {
              orderBy: { attemptNumber: 'asc' },
            },
          },
        },
      },
    });

    if (!rescueEntry) {
      throw new NotFoundException(`Rescue directory entry with ID ${id} not found`);
    }

    return rescueEntry;
  }

  async update(id: string, updateRescueDirectoryDto: UpdateRescueDirectoryDto) {
    try {
      // Verificar que la entrada existe
      await this.findOne(id);

      // Procesar fechas si están presentes
      const dataToUpdate: any = { ...updateRescueDirectoryDto };
      if (updateRescueDirectoryDto.entryDate) {
        dataToUpdate.entryDate = new Date(updateRescueDirectoryDto.entryDate);
      }
      if (updateRescueDirectoryDto.exitDate) {
        dataToUpdate.exitDate = new Date(updateRescueDirectoryDto.exitDate);
      }
      if (updateRescueDirectoryDto.lastContactDate) {
        dataToUpdate.lastContactDate = new Date(updateRescueDirectoryDto.lastContactDate);
      }
      if (updateRescueDirectoryDto.lastAttemptDate) {
        dataToUpdate.lastAttemptDate = new Date(updateRescueDirectoryDto.lastAttemptDate);
      }
      if (updateRescueDirectoryDto.reactivatedAt) {
        dataToUpdate.reactivatedAt = new Date(updateRescueDirectoryDto.reactivatedAt);
      }

      const rescueEntry = await this.prisma.rescueDirectory.update({
        where: { id },
        data: dataToUpdate,
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          originalFollowUp: {
            select: {
              id: true,
              followUpType: true,
              status: true,
              scheduledContactDate: true,
              attemptCount: true,
              maxAttempts: true,
            },
          },
        },
      });

      this.logger.log(`Rescue directory entry updated: ${id}`);
      return rescueEntry;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('A rescue entry with these details already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      await this.prisma.rescueDirectory.delete({
        where: { id },
      });

      this.logger.log(`Rescue directory entry deleted: ${id}`);
      return { message: 'Rescue directory entry deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('Cannot delete rescue entry due to related records');
        }
      }
      throw error;
    }
  }

  async getByPatient(patientId: string, queryDto: QueryRescueDirectoryDto) {
    return this.findAll({ ...queryDto, patientId });
  }

  async getActiveEntries(queryDto: QueryRescueDirectoryDto) {
    return this.findAll({ ...queryDto, status: 'ACTIVE' });
  }

  async getHighPriorityEntries(queryDto: QueryRescueDirectoryDto) {
    return this.findAll({ 
      ...queryDto, 
      status: 'ACTIVE',
      priority: 'HIGH',
    });
  }

  async getCriticalEntries(queryDto: QueryRescueDirectoryDto) {
    return this.findAll({ 
      ...queryDto, 
      status: 'ACTIVE',
      priority: 'CRITICAL',
    });
  }

  async reactivateEntry(id: string, reactivationNotes?: string) {
    const rescueEntry = await this.findOne(id);
    
    if (rescueEntry.status !== 'ACTIVE') {
      throw new BadRequestException('Only active rescue entries can be reactivated');
    }

    const updated = await this.prisma.rescueDirectory.update({
      where: { id },
      data: {
        status: 'REACTIVATED',
        reactivatedAt: new Date(),
        reactivationNotes,
      },
      include: {
        patient: true,
        originalFollowUp: true,
      },
    });

    this.logger.log(`Rescue entry reactivated: ${id} for patient ${updated.patient.firstName} ${updated.patient.lastName}`);
    return updated;
  }

  async archiveEntry(id: string) {
    const updated = await this.prisma.rescueDirectory.update({
      where: { id },
      data: {
        status: 'ARCHIVED',
        exitDate: new Date(),
      },
      include: {
        patient: true,
      },
    });

    this.logger.log(`Rescue entry archived: ${id}`);
    return updated;
  }
}