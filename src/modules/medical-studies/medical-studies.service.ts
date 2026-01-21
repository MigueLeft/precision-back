import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateMedicalStudyDto } from './dto/create-medical-study.dto';
import { UpdateMedicalStudyDto } from './dto/update-medical-study.dto';
import { QueryMedicalStudyDto } from './dto/query-medical-study.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicalStudiesService {
  private readonly logger = new Logger(MedicalStudiesService.name);

  constructor(private prisma: PrismaService) {}

  async create(createMedicalStudyDto: CreateMedicalStudyDto) {
    this.logger.log(
      `Creating new medical study for patient ${createMedicalStudyDto.patientId}`,
    );

    // Verify patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: createMedicalStudyDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${createMedicalStudyDto.patientId} not found`,
      );
    }

    return this.prisma.medicalStudy.create({
      data: {
        ...createMedicalStudyDto,
        studyDate: new Date(createMedicalStudyDto.studyDate),
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

  async findAll(queryDto: QueryMedicalStudyDto) {
    const {
      page = 1,
      limit = 10,
      search,
      patientId,
      studyType,
      status,
      active,
      orderedBy,
      interpretedBy,
      sortBy = 'studyDate',
      sortOrder = 'desc',
    } = queryDto;

    const skip = (page - 1) * limit;
    const where: Prisma.MedicalStudyWhereInput = {};

    // Search by study name or description
    if (search) {
      where.OR = [
        { studyName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by patient
    if (patientId) {
      where.patientId = patientId;
    }

    // Filter by study type
    if (studyType) {
      where.studyType = studyType;
    }

    // Filter by status
    if (status) {
      where.status = status;
    }

    // Filter by active
    if (active !== undefined) {
      where.active = active;
    }

    // Filter by ordering physician
    if (orderedBy) {
      where.orderedBy = orderedBy;
    }

    // Filter by interpreting physician
    if (interpretedBy) {
      where.interpretedBy = interpretedBy;
    }

    const [studies, total] = await Promise.all([
      this.prisma.medicalStudy.findMany({
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
      this.prisma.medicalStudy.count({ where }),
    ]);

    return {
      data: studies,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const study = await this.prisma.medicalStudy.findUnique({
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

    if (!study) {
      throw new NotFoundException(`Medical study with ID ${id} not found`);
    }

    return study;
  }

  async findByPatient(patientId: string, studyType?: string) {
    this.logger.log(`Finding medical studies for patient ${patientId}`);

    const where: Prisma.MedicalStudyWhereInput = {
      patientId,
      active: true,
    };

    if (studyType) {
      where.studyType = studyType;
    }

    return this.prisma.medicalStudy.findMany({
      where,
      orderBy: { studyDate: 'desc' },
    });
  }

  async update(id: string, updateMedicalStudyDto: UpdateMedicalStudyDto) {
    this.logger.log(`Updating medical study ${id}`);

    await this.findOne(id); // Verify exists

    const updateData: any = { ...updateMedicalStudyDto };
    if (updateMedicalStudyDto.studyDate) {
      updateData.studyDate = new Date(updateMedicalStudyDto.studyDate);
    }

    return this.prisma.medicalStudy.update({
      where: { id },
      data: updateData,
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

  async changeStatus(
    id: string,
    newStatus: 'pending' | 'completed' | 'reviewed',
  ) {
    this.logger.log(`Changing status of medical study ${id} to ${newStatus}`);

    await this.findOne(id); // Verify exists

    return this.prisma.medicalStudy.update({
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
    this.logger.log(`Soft deleting medical study ${id}`);

    await this.findOne(id); // Verify exists

    // Soft delete - mark as inactive
    return this.prisma.medicalStudy.update({
      where: { id },
      data: { active: false },
    });
  }

  async hardDelete(id: string) {
    this.logger.log(`Hard deleting medical study ${id}`);

    await this.findOne(id); // Verify exists

    return this.prisma.medicalStudy.delete({
      where: { id },
    });
  }

  async getStudiesByType(patientId: string, studyType: string) {
    this.logger.log(
      `Getting ${studyType} studies for patient ${patientId}`,
    );

    return this.prisma.medicalStudy.findMany({
      where: {
        patientId,
        studyType,
        active: true,
      },
      orderBy: { studyDate: 'desc' },
    });
  }

  async getPendingStudies(patientId: string) {
    this.logger.log(`Getting pending studies for patient ${patientId}`);

    return this.prisma.medicalStudy.findMany({
      where: {
        patientId,
        status: 'pending',
        active: true,
      },
      orderBy: { studyDate: 'desc' },
    });
  }

  async getCompletedStudies(patientId: string) {
    this.logger.log(`Getting completed studies for patient ${patientId}`);

    return this.prisma.medicalStudy.findMany({
      where: {
        patientId,
        status: { in: ['completed', 'reviewed'] },
        active: true,
      },
      orderBy: { studyDate: 'desc' },
    });
  }
}
