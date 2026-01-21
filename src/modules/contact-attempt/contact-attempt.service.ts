import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateContactAttemptDto } from './dto/create-contact-attempt.dto';
import { UpdateContactAttemptDto } from './dto/update-contact-attempt.dto';
import { QueryContactAttemptDto } from './dto/query-contact-attempt.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactAttemptService {
  private readonly logger = new Logger(ContactAttemptService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createContactAttemptDto: CreateContactAttemptDto) {
    try {
      // Verificar que el seguimiento existe
      const followUp = await this.prisma.patientFollowUp.findUnique({
        where: { id: createContactAttemptDto.followUpId },
        include: { patient: true },
      });

      if (!followUp) {
        throw new BadRequestException(
          `Follow-up with ID ${createContactAttemptDto.followUpId} not found`,
        );
      }

      // Verificar que las citas y reprogramaciones existen si se proporcionan
      if (createContactAttemptDto.newAppointmentId) {
        const appointment = await this.prisma.appointment.findUnique({
          where: { id: createContactAttemptDto.newAppointmentId },
        });
        if (!appointment) {
          throw new BadRequestException(
            `Appointment with ID ${createContactAttemptDto.newAppointmentId} not found`,
          );
        }
      }

      if (createContactAttemptDto.rescheduleId) {
        const reschedule = await this.prisma.reschedule.findUnique({
          where: { id: createContactAttemptDto.rescheduleId },
        });
        if (!reschedule) {
          throw new BadRequestException(
            `Reschedule with ID ${createContactAttemptDto.rescheduleId} not found`,
          );
        }
      }

      const contactAttempt = await this.prisma.contactAttempt.create({
        data: {
          ...createContactAttemptDto,
          contactDateTime: createContactAttemptDto.contactDateTime
            ? new Date(createContactAttemptDto.contactDateTime)
            : new Date(),
        },
        include: {
          followUp: {
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
            },
          },
          newAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          reschedule: {
            select: {
              id: true,
              previousDateTime: true,
              newDateTime: true,
              rescheduleStatus: true,
            },
          },
        },
      });

      this.logger.log(
        `Contact attempt created for follow-up ${createContactAttemptDto.followUpId}, attempt #${createContactAttemptDto.attemptNumber}`,
      );
      return contactAttempt;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'A contact attempt with these details already exists',
          );
        }
      }
      throw error;
    }
  }

  async findAll(queryDto: QueryContactAttemptDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'contactDateTime',
      sortOrder = 'desc',
      ...filters
    } = queryDto;
    const skip = (page - 1) * limit;

    // Construir filtros de fecha
    const dateFilters: any = {};
    if (queryDto.contactDateTimeFrom) {
      dateFilters.gte = new Date(queryDto.contactDateTimeFrom);
    }
    if (queryDto.contactDateTimeTo) {
      dateFilters.lte = new Date(queryDto.contactDateTimeTo);
    }

    // Construir filtros
    const where: Prisma.ContactAttemptWhereInput = {
      ...filters,
      ...(search && {
        OR: [
          {
            followUp: {
              patient: {
                OR: [
                  { firstName: { contains: search, mode: 'insensitive' } },
                  { lastName: { contains: search, mode: 'insensitive' } },
                  { email: { contains: search, mode: 'insensitive' } },
                ],
              },
            },
          },
          { contactNotes: { contains: search, mode: 'insensitive' } },
          { patientResponse: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(Object.keys(dateFilters).length > 0 && {
        contactDateTime: dateFilters,
      }),
    };

    const [contactAttempts, total] = await Promise.all([
      this.prisma.contactAttempt.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy as string]: sortOrder },
        include: {
          followUp: {
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
            },
          },
          newAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          reschedule: {
            select: {
              id: true,
              previousDateTime: true,
              newDateTime: true,
              rescheduleStatus: true,
            },
          },
        },
      }),
      this.prisma.contactAttempt.count({ where }),
    ]);

    return {
      data: contactAttempts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const contactAttempt = await this.prisma.contactAttempt.findUnique({
      where: { id },
      include: {
        followUp: {
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
          },
        },
        newAppointment: {
          select: {
            id: true,
            dateTime: true,
            appointmentStatus: true,
          },
        },
        reschedule: {
          select: {
            id: true,
            previousDateTime: true,
            newDateTime: true,
            rescheduleStatus: true,
          },
        },
      },
    });

    if (!contactAttempt) {
      throw new NotFoundException(`Contact attempt with ID ${id} not found`);
    }

    return contactAttempt;
  }

  async update(id: string, updateContactAttemptDto: UpdateContactAttemptDto) {
    try {
      // Verificar que el intento de contacto existe
      await this.findOne(id);

      // Procesar fechas si están presentes
      const dataToUpdate: any = { ...updateContactAttemptDto };
      if (updateContactAttemptDto.contactDateTime) {
        dataToUpdate.contactDateTime = new Date(
          updateContactAttemptDto.contactDateTime,
        );
      }

      const contactAttempt = await this.prisma.contactAttempt.update({
        where: { id },
        data: dataToUpdate,
        include: {
          followUp: {
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
            },
          },
          newAppointment: {
            select: {
              id: true,
              dateTime: true,
              appointmentStatus: true,
            },
          },
          reschedule: {
            select: {
              id: true,
              previousDateTime: true,
              newDateTime: true,
              rescheduleStatus: true,
            },
          },
        },
      });

      this.logger.log(`Contact attempt updated: ${id}`);
      return contactAttempt;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'A contact attempt with these details already exists',
          );
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      await this.prisma.contactAttempt.delete({
        where: { id },
      });

      this.logger.log(`Contact attempt deleted: ${id}`);
      return { message: 'Contact attempt deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Cannot delete contact attempt due to related records',
          );
        }
      }
      throw error;
    }
  }

  async getByFollowUp(followUpId: string, queryDto: QueryContactAttemptDto) {
    return this.findAll({ ...queryDto, followUpId });
  }

  async getSuccessfulAttempts(queryDto: QueryContactAttemptDto) {
    return this.findAll({
      ...queryDto,
      contactResult: 'SUCCESSFUL',
    });
  }

  async getFailedAttempts(queryDto: QueryContactAttemptDto) {
    return this.findAll({
      ...queryDto,
      contactResult: 'NO_ANSWER',
    });
  }

  async getAttemptsWithAppointments(queryDto: QueryContactAttemptDto) {
    return this.findAll({
      ...queryDto,
      appointmentScheduled: true,
    });
  }
}
