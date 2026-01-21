import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service'; // Ajusta la ruta según tu estructura
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { QueryConsultationDto } from './dto/query-consultation.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConsultationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConsultationDto: CreateConsultationDto) {
    try {
      // Verificar que la cita existe
      const appointment = await this.prisma.appointment.findUnique({
        where: { id: createConsultationDto.appointmentId },
      });

      if (!appointment) {
        throw new NotFoundException('La cita especificada no existe');
      }

      // Verificar que no existe ya una consulta para esta cita
      const existingConsultation = await this.prisma.consultation.findUnique({
        where: { appointmentId: createConsultationDto.appointmentId },
      });

      if (existingConsultation) {
        throw new BadRequestException('Ya existe una consulta para esta cita');
      }

      // Verificar que el usuario existe
      const user = await this.prisma.user.findUnique({
        where: { id: createConsultationDto.registeredByUserId },
      });

      if (!user) {
        throw new NotFoundException('El usuario especificado no existe');
      }

      const consultation = await this.prisma.consultation.create({
        data: {
          ...createConsultationDto,
          realizationDateTime: new Date(
            createConsultationDto.realizationDateTime,
          ),
          suggestedNextControl: createConsultationDto.suggestedNextControl
            ? new Date(createConsultationDto.suggestedNextControl)
            : null,
        },
        include: {
          appointment: {
            include: {
              patient: true,
              medic: true,
            },
          },
        },
      });

      return consultation;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Error al crear la consulta');
    }
  }

  async findAll(queryDto: QueryConsultationDto) {
    const {
      page = 1,
      limit = 10,
      appointmentId,
      registeredByUserId,
      startDate,
      endDate,
      active,
      search,
      sortBy = 'realizationDateTime',
      sortOrder = 'desc',
    } = queryDto;

    const skip = (page - 1) * limit;
    const take = limit;

    // Construir filtros
    const where: Prisma.ConsultationWhereInput = {};

    if (appointmentId) {
      where.appointmentId = appointmentId;
    }

    if (registeredByUserId) {
      where.registeredByUserId = registeredByUserId;
    }

    if (active !== undefined) {
      where.active = active;
    }

    if (startDate || endDate) {
      where.realizationDateTime = {};
      if (startDate) {
        where.realizationDateTime.gte = new Date(startDate);
      }
      if (endDate) {
        where.realizationDateTime.lte = new Date(endDate);
      }
    }

    if (search) {
      where.OR = [
        { anamnesis: { contains: search, mode: 'insensitive' } },
        { indicatedTreatment: { contains: search, mode: 'insensitive' } },
        { additionalMedicalNotes: { contains: search, mode: 'insensitive' } },
        { performedProcedures: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Construir ordenamiento
    const orderBy: Prisma.ConsultationOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    try {
      const [consultations, total] = await Promise.all([
        this.prisma.consultation.findMany({
          where,
          skip,
          take,
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
                    specialty: true,
                  },
                },
              },
            },
          },
        }),
        this.prisma.consultation.count({ where }),
      ]);

      return {
        data: consultations,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener las consultas');
    }
  }

  async findOne(id: string) {
    try {
      const consultation = await this.prisma.consultation.findUnique({
        where: { id },
        include: {
          appointment: {
            include: {
              patient: true,
              medic: true,
            },
          },
        },
      });

      if (!consultation) {
        throw new NotFoundException('Consulta no encontrada');
      }

      return consultation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener la consulta');
    }
  }

  async update(id: string, updateConsultationDto: UpdateConsultationDto) {
    try {
      // Verificar que la consulta existe
      const existingConsultation = await this.prisma.consultation.findUnique({
        where: { id },
      });

      if (!existingConsultation) {
        throw new NotFoundException('Consulta no encontrada');
      }

      // Si se actualiza appointmentId, verificar que la cita existe y no tiene otra consulta
      if (
        updateConsultationDto.appointmentId &&
        updateConsultationDto.appointmentId !==
          existingConsultation.appointmentId
      ) {
        const appointment = await this.prisma.appointment.findUnique({
          where: { id: updateConsultationDto.appointmentId },
        });

        if (!appointment) {
          throw new NotFoundException('La cita especificada no existe');
        }

        const consultationWithSameAppointment =
          await this.prisma.consultation.findUnique({
            where: { appointmentId: updateConsultationDto.appointmentId },
          });

        if (consultationWithSameAppointment) {
          throw new BadRequestException(
            'Ya existe una consulta para esta cita',
          );
        }
      }

      // Si se actualiza registeredByUserId, verificar que el usuario existe
      if (updateConsultationDto.registeredByUserId) {
        const user = await this.prisma.user.findUnique({
          where: { id: updateConsultationDto.registeredByUserId },
        });

        if (!user) {
          throw new NotFoundException('El usuario especificado no existe');
        }
      }

      const updateData: any = { ...updateConsultationDto };

      if (updateConsultationDto.realizationDateTime) {
        updateData.realizationDateTime = new Date(
          updateConsultationDto.realizationDateTime,
        );
      }

      if (updateConsultationDto.suggestedNextControl) {
        updateData.suggestedNextControl = new Date(
          updateConsultationDto.suggestedNextControl,
        );
      }

      const consultation = await this.prisma.consultation.update({
        where: { id },
        data: updateData,
        include: {
          appointment: {
            include: {
              patient: true,
              medic: true,
            },
          },
        },
      });

      return consultation;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar la consulta');
    }
  }

  async remove(id: string) {
    try {
      const consultation = await this.prisma.consultation.findUnique({
        where: { id },
      });

      if (!consultation) {
        throw new NotFoundException('Consulta no encontrada');
      }

      // Soft delete - marcamos como inactiva
      const deletedConsultation = await this.prisma.consultation.update({
        where: { id },
        data: { active: false },
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
                  specialty: true,
                },
              },
            },
          },
        },
      });

      return deletedConsultation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al eliminar la consulta');
    }
  }

  async findByAppointmentId(appointmentId: string) {
    try {
      const consultation = await this.prisma.consultation.findUnique({
        where: { appointmentId },
        include: {
          appointment: {
            include: {
              patient: true,
              medic: true,
            },
          },
        },
      });

      return consultation;
    } catch (error) {
      throw new BadRequestException('Error al obtener la consulta por cita');
    }
  }
}
