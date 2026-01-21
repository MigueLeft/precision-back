import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { QueryAppointmentDto } from './dto/query-appointment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      // Verificar que el paciente existe
      const patientExists = await this.prisma.patient.findUnique({
        where: { id: createAppointmentDto.patientId },
      });

      if (!patientExists) {
        throw new ConflictException(
          `Patient with ID ${createAppointmentDto.patientId} not found`,
        );
      }

      // Verificar que el médico existe
      const medicExists = await this.prisma.medic.findUnique({
        where: { id: createAppointmentDto.medicId },
      });

      if (!medicExists) {
        throw new ConflictException(
          `Medic with ID ${createAppointmentDto.medicId} not found`,
        );
      }

      // Verificar si ya existe una cita para el mismo médico y la misma fecha
      const existingAppointment = await this.prisma.appointment.findFirst({
        where: {
          medicId: createAppointmentDto.medicId,
          dateTime: createAppointmentDto.dateTime,
        },
      });

      if (existingAppointment) {
        throw new ConflictException(
          'A appointment already exists for this medic at the specified time.',
        );
      }

      const appointment = await this.prisma.appointment.create({
        data: createAppointmentDto,
      });

      this.logger.log(`Appointment created: ${appointment.id}`);
      return appointment;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryAppointmentDto) {
    const {
      page = 1,
      limit = 10,
      search,
      specificDate,
      startDate,
      endDate,
      specificTime,
      appointmentStatus,
      patientId,
      medicId,
      sortBy = 'dateTime',
      sortOrder = 'asc',
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.AppointmentWhereInput = {
      ...(search && {
        OR: [
          { reason: { contains: search, mode: 'insensitive' } },
          { notes: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(appointmentStatus && { appointmentStatus }),
      ...(patientId && { patientId }),
      ...(medicId && { medicId }),
      ...(specificDate && {
        dateTime: {
          gte: new Date(`${specificDate}T00:00:00Z`),
          lt: new Date(`${specificDate}T23:59:59Z`),
        },
      }),
      ...(startDate &&
        endDate && {
          dateTime: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      ...(startDate &&
        !endDate && {
          dateTime: {
            gte: new Date(startDate),
          },
        }),
      ...(endDate &&
        !startDate && {
          dateTime: {
            lte: new Date(endDate),
          },
        }),
    };

    // Configurar el ordenamiento
    const orderBy: Prisma.AppointmentOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              identification: true,
              email: true,
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
                  description: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.appointment.count({ where }),
    ]);

    // Filtrar por hora si se proporciona (esto debería hacerse en la query, no después)
    const filteredAppointments = specificTime
      ? appointments.filter((appointment) => {
          const appointmentTime = new Date(
            appointment.dateTime,
          ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return appointmentTime === specificTime;
        })
      : appointments;

    const finalTotal = specificTime ? filteredAppointments.length : total;

    return {
      data: filteredAppointments,
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
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identification: true,
            email: true,
            phone: true,
          },
        },
        medic: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            specialty: {
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

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const existingAppointment = await this.prisma.appointment.findUnique({
        where: { id },
      });

      if (!existingAppointment) {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }

      const appointment = await this.prisma.appointment.update({
        where: { id },
        data: updateAppointmentDto,
      });

      this.logger.log(`Appointment updated: ${appointment.id}`);
      return appointment;
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
      const appointment = await this.prisma.appointment.delete({
        where: { id },
      });

      this.logger.log(`Appointment deleted: ${appointment.id}`);
      return { message: 'Appointment deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Appointment with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async findAppointmentDates() {
    try {
      // Obtener todas las citas con solo el campo dateTime
      const appointments = await this.prisma.appointment.findMany({
        select: {
          dateTime: true,
        },
        orderBy: {
          dateTime: 'asc',
        },
      });

      // Extraer fechas únicas (solo la parte de fecha, sin hora)
      const uniqueDates = Array.from(
        new Set(
          appointments.map((appointment) => {
            const date = new Date(appointment.dateTime);
            return date.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
          }),
        ),
      );

      this.logger.log(`Found ${uniqueDates.length} unique appointment dates`);
      return uniqueDates;
    } catch (error) {
      this.logger.error('Error fetching appointment dates', error);
      throw error;
    }
  }

  async getAppointmentStats() {
    try {
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
      );
      const endOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
      );
      const next7Days = new Date(now);
      next7Days.setDate(next7Days.getDate() + 7);

      // Total de citas
      const totalAppointments = await this.prisma.appointment.count();

      // Citas del día hoy
      const todayAppointments = await this.prisma.appointment.count({
        where: {
          dateTime: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      });

      // Próximas citas (en los próximos 7 días)
      const upcomingAppointments = await this.prisma.appointment.count({
        where: {
          dateTime: {
            gte: now,
            lte: next7Days,
          },
        },
      });

      // Citas pendientes
      const pendingAppointments = await this.prisma.appointment.count({
        where: {
          appointmentStatus: 'pending',
        },
      });

      // Citas completadas
      const completedAppointments = await this.prisma.appointment.count({
        where: {
          appointmentStatus: 'completed',
        },
      });

      const stats = {
        total: totalAppointments,
        today: todayAppointments,
        upcoming: upcomingAppointments,
        pending: pendingAppointments,
        completed: completedAppointments,
      };

      this.logger.log('Appointment statistics retrieved successfully');
      return stats;
    } catch (error) {
      this.logger.error('Error fetching appointment statistics', error);
      throw error;
    }
  }
}
