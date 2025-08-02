import { Injectable, NotFoundException, ConflictException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateRescheduleDto } from './dto/create-reschedule.dto';
import { UpdateRescheduleDto } from './dto/update-reschedule.dto';
import { QueryRescheduleDto } from './dto/query-reschedule.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReschedulesService {
  private readonly logger = new Logger(ReschedulesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createRescheduleDto: CreateRescheduleDto) {
    try {
      // Verificar que la cita existe
      const appointmentExists = await this.prisma.appointment.findUnique({
        where: { id: createRescheduleDto.appointmentId },
        include: {
          patient: { include: { user: true } },
          medic: { include: { user: true } },
        },
      });

      if (!appointmentExists) {
        throw new NotFoundException(`Appointment with ID ${createRescheduleDto.appointmentId} not found`);
      }

      // Verificar que no haya conflicto con el nuevo horario
      const conflictingAppointment = await this.prisma.appointment.findFirst({
        where: {
          medicId: appointmentExists.medicId,
          dateTime: new Date(createRescheduleDto.newDateTime),
          id: { not: createRescheduleDto.appointmentId },
          active: true,
        },
      });

      if (conflictingAppointment) {
        throw new ConflictException('The new time slot is already occupied by another appointment');
      }


      const reschedule = await this.prisma.reschedule.create({
        data: {
          appointmentId: createRescheduleDto.appointmentId,
          previousDateTime: new Date(createRescheduleDto.previousDateTime),
          newDateTime: new Date(createRescheduleDto.newDateTime),
          rescheduleReason: createRescheduleDto.rescheduleReason,
          requestedBy: createRescheduleDto.requestedBy,
          notes: createRescheduleDto.notes,
        },
        include: {
          appointment: {
            include: {
              patient: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  identification: true,
                },
              },
              medic: {
                select: {
                  id: true,
                  name: true,
                  lastName: true,
                  specialty: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      this.logger.log(`Reschedule created for appointment ${createRescheduleDto.appointmentId}`);
      return reschedule;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryRescheduleDto) {
    const { 
      page = 1, 
      limit = 10, 
      appointmentId, 
      rescheduleStatus, 
      requestedBy, 
      rescheduleReason,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.RescheduleWhereInput = {
      active: true,
      ...(appointmentId && { appointmentId }),
      ...(rescheduleStatus && { rescheduleStatus }),
      ...(requestedBy && { requestedBy }),
      ...(rescheduleReason && { rescheduleReason }),
    };

    // Configurar el ordenamiento
    const orderBy: Prisma.RescheduleOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [reschedules, total] = await Promise.all([
      this.prisma.reschedule.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          appointment: {
            include: {
              patient: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  identification: true,
                },
              },
              medic: {
                select: {
                  id: true,
                  name: true,
                  lastName: true,
                  specialty: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      this.prisma.reschedule.count({ where }),
    ]);

    return {
      data: reschedules,
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
    const reschedule = await this.prisma.reschedule.findUnique({
      where: { id, active: true },
      include: {
        appointment: {
          include: {
            patient: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                identification: true,
              },
            },
            medic: {
              select: {
                id: true,
                name: true,
                lastName: true,
                specialty: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!reschedule) {
      throw new NotFoundException(`Reschedule with ID ${id} not found`);
    }

    return reschedule;
  }

  async update(id: string, updateRescheduleDto: UpdateRescheduleDto) {
    try {
      const existingReschedule = await this.prisma.reschedule.findUnique({
        where: { id, active: true },
        include: { appointment: true },
      });

      if (!existingReschedule) {
        throw new NotFoundException(`Reschedule with ID ${id} not found`);
      }

      // Si se está completando la reprogramación, actualizar la cita
      if (updateRescheduleDto.rescheduleStatus === 'completed') {
        await this.prisma.appointment.update({
          where: { id: existingReschedule.appointmentId },
          data: { dateTime: existingReschedule.newDateTime },
        });
      }

      const reschedule = await this.prisma.reschedule.update({
        where: { id },
        data: {
          ...updateRescheduleDto,
          ...(updateRescheduleDto.newDateTime && { newDateTime: new Date(updateRescheduleDto.newDateTime) }),
          ...(updateRescheduleDto.previousDateTime && { previousDateTime: new Date(updateRescheduleDto.previousDateTime) }),
        },
        include: {
          appointment: {
            include: {
              patient: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  identification: true,
                },
              },
              medic: {
                select: {
                  id: true,
                  name: true,
                  lastName: true,
                  specialty: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      this.logger.log(`Reschedule updated: ${id} - Status: ${reschedule.rescheduleStatus}`);
      return reschedule;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const reschedule = await this.prisma.reschedule.update({
        where: { id },
        data: { active: false },
      });

      this.logger.log(`Reschedule soft deleted: ${id}`);
      return { message: 'Reschedule deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Reschedule with ID ${id} not found`);
        }
      }
      throw error;
    }
  }


  async findByAppointment(appointmentId: string) {
    const reschedules = await this.prisma.reschedule.findMany({
      where: {
        appointmentId,
        active: true,
      },
      include: {
        appointment: {
          select: {
            id: true,
            dateTime: true,
            appointmentStatus: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reschedules;
  }
}