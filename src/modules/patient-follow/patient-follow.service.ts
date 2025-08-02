import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreatePatientFollowDto } from './dto/create-patient-follow.dto';
import { UpdatePatientFollowDto } from './dto/update-patient-follow.dto';
import { QueryPatientFollowDto } from './dto/query-patient-follow.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientFollowService {
  private readonly logger = new Logger(PatientFollowService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientFollowDto: CreatePatientFollowDto) {
    try {
      // Verificar que el paciente existe
      const patient = await this.prisma.patient.findUnique({
        where: { id: createPatientFollowDto.patientId },
      });

      if (!patient) {
        throw new BadRequestException(`Patient with ID ${createPatientFollowDto.patientId} not found`);
      }

      // Verificar que las citas existen si se proporcionan
      if (createPatientFollowDto.originAppointmentId) {
        const originAppointment = await this.prisma.appointment.findUnique({
          where: { id: createPatientFollowDto.originAppointmentId },
        });
        if (!originAppointment) {
          throw new BadRequestException(`Origin appointment with ID ${createPatientFollowDto.originAppointmentId} not found`);
        }
      }

      if (createPatientFollowDto.resultingAppointmentId) {
        const resultingAppointment = await this.prisma.appointment.findUnique({
          where: { id: createPatientFollowDto.resultingAppointmentId },
        });
        if (!resultingAppointment) {
          throw new BadRequestException(`Resulting appointment with ID ${createPatientFollowDto.resultingAppointmentId} not found`);
        }
      }

      const patientFollow = await this.prisma.patientFollowUp.create({
        data: {
          ...createPatientFollowDto,
          scheduledContactDate: new Date(createPatientFollowDto.scheduledContactDate),
          actualContactDate: createPatientFollowDto.actualContactDate ? 
            new Date(createPatientFollowDto.actualContactDate) : undefined,
          nextContactDate: createPatientFollowDto.nextContactDate ? 
            new Date(createPatientFollowDto.nextContactDate) : undefined,
          completedAt: createPatientFollowDto.completedAt ? 
            new Date(createPatientFollowDto.completedAt) : undefined,
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
          originAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          resultingAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          contactAttempts: true,
          rescueEntries: true,
        },
      });

      this.logger.log(`Patient follow-up created for patient: ${patient.firstName} ${patient.lastName}`);
      return patientFollow;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('A follow-up with these details already exists');
        }
      }
      throw error;
    }
  }

  async findAll(queryDto: QueryPatientFollowDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', ...filters } = queryDto;
    const skip = (page - 1) * limit;

    // Construir filtros de fecha
    const dateFilters: any = {};
    if (queryDto.scheduledContactDateFrom) {
      dateFilters.gte = new Date(queryDto.scheduledContactDateFrom);
    }
    if (queryDto.scheduledContactDateTo) {
      dateFilters.lte = new Date(queryDto.scheduledContactDateTo);
    }

    // Construir filtros
    const where: Prisma.PatientFollowUpWhereInput = {
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
          { notes: { contains: search, mode: 'insensitive' } },
          { assignedTo: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(Object.keys(dateFilters).length > 0 && {
        scheduledContactDate: dateFilters,
      }),
    };

    const [patientFollows, total] = await Promise.all([
      this.prisma.patientFollowUp.findMany({
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
          originAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          resultingAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          contactAttempts: {
            orderBy: { attemptNumber: 'desc' },
            take: 3,
          },
          rescueEntries: {
            where: { status: 'ACTIVE' },
          },
        },
      }),
      this.prisma.patientFollowUp.count({ where }),
    ]);

    return {
      data: patientFollows,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const patientFollow = await this.prisma.patientFollowUp.findUnique({
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
        originAppointment: {
          select: {
            id: true,
            dateTime: true,
            appointmentStatus: true,
          },
        },
        resultingAppointment: {
          select: {
            id: true,
            dateTime: true,
            appointmentStatus: true,
          },
        },
        contactAttempts: {
          orderBy: { attemptNumber: 'asc' },
        },
        rescueEntries: true,
      },
    });

    if (!patientFollow) {
      throw new NotFoundException(`Patient follow-up with ID ${id} not found`);
    }

    return patientFollow;
  }

  async update(id: string, updatePatientFollowDto: UpdatePatientFollowDto) {
    try {
      // Verificar que el seguimiento existe
      await this.findOne(id);

      // Procesar fechas si están presentes
      const dataToUpdate: any = { ...updatePatientFollowDto };
      if (updatePatientFollowDto.scheduledContactDate) {
        dataToUpdate.scheduledContactDate = new Date(updatePatientFollowDto.scheduledContactDate);
      }
      if (updatePatientFollowDto.actualContactDate) {
        dataToUpdate.actualContactDate = new Date(updatePatientFollowDto.actualContactDate);
      }
      if (updatePatientFollowDto.nextContactDate) {
        dataToUpdate.nextContactDate = new Date(updatePatientFollowDto.nextContactDate);
      }
      if (updatePatientFollowDto.completedAt) {
        dataToUpdate.completedAt = new Date(updatePatientFollowDto.completedAt);
      }

      const patientFollow = await this.prisma.patientFollowUp.update({
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
          originAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          resultingAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          contactAttempts: true,
          rescueEntries: true,
        },
      });

      this.logger.log(`Patient follow-up updated: ${id}`);
      return patientFollow;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('A follow-up with these details already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      await this.prisma.patientFollowUp.delete({
        where: { id },
      });

      this.logger.log(`Patient follow-up deleted: ${id}`);
      return { message: 'Patient follow-up deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('Cannot delete follow-up due to related records');
        }
      }
      throw error;
    }
  }

  async incrementAttemptCount(id: string) {
    const patientFollow = await this.findOne(id);
    
    const updatedFollow = await this.prisma.patientFollowUp.update({
      where: { id },
      data: {
        attemptCount: patientFollow.attemptCount + 1,
        status: patientFollow.attemptCount + 1 >= patientFollow.maxAttempts ? 
          'FAILED' : 'IN_PROGRESS',
      },
      include: {
        patient: true,
        contactAttempts: true,
      },
    });

    this.logger.log(`Attempt count incremented for follow-up ${id}: ${updatedFollow.attemptCount}/${updatedFollow.maxAttempts}`);
    return updatedFollow;
  }

  async getByPatient(patientId: string, queryDto: QueryPatientFollowDto) {
    return this.findAll({ ...queryDto, patientId });
  }

  async getPendingFollowUps() {
    return this.findAll({ 
      status: 'PENDING',
      scheduledContactDateTo: new Date().toISOString(),
      active: true,
    });
  }
}