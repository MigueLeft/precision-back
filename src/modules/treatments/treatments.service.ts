import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { QueryTreatmentDto } from './dto/query-treatment.dto';
import { AddBatchTreatmentsDto } from './dto/add-batch-treatments.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TreatmentsService {
  private readonly logger = new Logger(TreatmentsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    this.logger.log(
      `Creating new treatment for patient ${createTreatmentDto.patientId}`,
    );

    // Verify patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: createTreatmentDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${createTreatmentDto.patientId} not found`,
      );
    }

    return this.prisma.treatment.create({
      data: {
        ...createTreatmentDto,
        prescribedAt: new Date(),
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identification: true,
          },
        },
      },
    });
  }

  async findAll(queryDto: QueryTreatmentDto) {
    const {
      page = 1,
      limit = 10,
      search,
      patientId,
      status,
      active,
      prescribedBy,
      sortBy = 'prescribedAt',
      sortOrder = 'desc',
    } = queryDto;

    const skip = (page - 1) * limit;
    const where: Prisma.TreatmentWhereInput = {};

    // Search by medication name
    if (search) {
      where.medicationName = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Filter by patient
    if (patientId) {
      where.patientId = patientId;
    }

    // Filter by status
    if (status) {
      where.status = status;
    }

    // Filter by active
    if (active !== undefined) {
      where.active = active;
    }

    // Filter by prescribing physician
    if (prescribedBy) {
      where.prescribedBy = prescribedBy;
    }

    const [treatments, total] = await Promise.all([
      this.prisma.treatment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              identification: true,
            },
          },
        },
      }),
      this.prisma.treatment.count({ where }),
    ]);

    return {
      data: treatments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const treatment = await this.prisma.treatment.findUnique({
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
      },
    });

    if (!treatment) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }

    return treatment;
  }

  async findByPatient(patientId: string, status?: string) {
    this.logger.log(`Finding treatments for patient ${patientId}`);

    const where: Prisma.TreatmentWhereInput = {
      patientId,
      active: true,
    };

    if (status) {
      where.status = status;
    }

    return this.prisma.treatment.findMany({
      where,
      orderBy: { prescribedAt: 'desc' },
    });
  }

  async update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    this.logger.log(`Updating treatment ${id}`);

    await this.findOne(id); // Verify exists

    return this.prisma.treatment.update({
      where: { id },
      data: updateTreatmentDto,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identification: true,
          },
        },
      },
    });
  }

  async changeStatus(id: string, newStatus: 'actual' | 'previo') {
    this.logger.log(`Changing status of treatment ${id} to ${newStatus}`);

    await this.findOne(id); // Verify exists

    return this.prisma.treatment.update({
      where: { id },
      data: { status: newStatus },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identification: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    this.logger.log(`Soft deleting treatment ${id}`);

    await this.findOne(id); // Verify exists

    // Soft delete - mark as inactive
    return this.prisma.treatment.update({
      where: { id },
      data: { active: false },
    });
  }

  async hardDelete(id: string) {
    this.logger.log(`Hard deleting treatment ${id}`);

    await this.findOne(id); // Verify exists

    return this.prisma.treatment.delete({
      where: { id },
    });
  }

  async getCurrentTreatments(patientId: string) {
    this.logger.log(`Getting current treatments for patient ${patientId}`);

    return this.prisma.treatment.findMany({
      where: {
        patientId,
        status: 'actual',
        active: true,
      },
      orderBy: { prescribedAt: 'desc' },
    });
  }

  async getPreviousTreatments(patientId: string) {
    this.logger.log(`Getting previous treatments for patient ${patientId}`);

    return this.prisma.treatment.findMany({
      where: {
        patientId,
        status: 'previo',
        active: true,
      },
      orderBy: { prescribedAt: 'desc' },
    });
  }

  /**
   * Add multiple treatments/medications to a patient at once
   */
  async addBatchTreatments(dto: AddBatchTreatmentsDto) {
    this.logger.log(
      `Adding ${dto.medications.length} treatments to patient ${dto.patientId}`,
    );

    try {
      // Verify patient exists
      const patient = await this.prisma.patient.findUnique({
        where: { id: dto.patientId },
      });
      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${dto.patientId} not found`,
        );
      }

      // Create all treatments in a transaction
      const createdTreatments = await this.prisma.$transaction(
        dto.medications.map((medicationData) =>
          this.prisma.treatment.create({
            data: {
              patientId: dto.patientId,
              medicationName: medicationData.medicationName,
              presentation: medicationData.presentation,
              quantity: medicationData.quantity,
              dosage: medicationData.dosage,
              duration: medicationData.duration,
              status: medicationData.status || 'actual',
              prescribedBy: medicationData.prescribedBy,
              prescribedAt: medicationData.prescribedAt
                ? new Date(medicationData.prescribedAt)
                : new Date(),
              notes: medicationData.notes,
              active: medicationData.active !== undefined ? medicationData.active : true,
            },
          }),
        ),
      );

      this.logger.log(
        `Successfully added ${createdTreatments.length} treatments to patient ${dto.patientId}`,
      );

      return {
        patientId: dto.patientId,
        treatmentsAdded: createdTreatments.length,
        treatments: createdTreatments,
      };
    } catch (error) {
      this.logger.error(
        `Error adding batch treatments: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
