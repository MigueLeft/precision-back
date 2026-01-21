import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { QuerySymptomsDto } from './dto/query-symptoms.dto';
import { CreatePatientSymptomDto } from './dto/create-patient-symptom.dto';
import { AddBatchPatientSymptomsDto } from './dto/add-batch-patient-symptoms.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SymptomsService {
  private readonly logger = new Logger(SymptomsService.name);

  constructor(private prisma: PrismaService) {}

  // === Symptoms CRUD ===
  async createSymptom(createSymptomDto: CreateSymptomDto) {
    this.logger.log('Creating new symptom');

    try {
      // Verify that the symptom category exists
      const symptomCategory = await this.prisma.symptomCategory.findUnique({
        where: { id: createSymptomDto.symptomCategoryId },
      });

      if (!symptomCategory) {
        throw new NotFoundException(
          `Symptom category with ID ${createSymptomDto.symptomCategoryId} not found`,
        );
      }

      const symptom = await this.prisma.symptom.create({
        data: createSymptomDto,
        include: {
          symptomCategory: true,
        },
      });

      this.logger.log(`Symptom created successfully: ${symptom.id}`);
      return symptom;
    } catch (error) {
      this.logger.error(
        `Error creating symptom: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAllSymptoms(queryDto: QuerySymptomsDto) {
    this.logger.log(
      `Fetching symptoms with filters: ${JSON.stringify(queryDto)}`,
    );

    const {
      page = 1,
      limit = 10,
      search,
      symptomCategoryId,
      severity,
      active,
      sortBy = 'name',
      sortOrder = 'asc',
    } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          value: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (symptomCategoryId) {
      where.symptomCategoryId = symptomCategoryId;
    }

    if (severity) {
      where.severity = severity;
    }

    if (active !== undefined) {
      where.active = active;
    }

    this.logger.log(`Where clause: ${JSON.stringify(where)}`);

    const symptoms = await this.prisma.symptom.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        symptomCategory: true,
        _count: {
          select: {
            patientSymptoms: true,
          },
        },
      },
    });

    this.logger.log(`Found ${symptoms.length} symptoms`);

    const total = await this.prisma.symptom.count({ where });

    this.logger.log(`Total count: ${total}`);

    return {
      data: symptoms,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findSymptomById(id: string) {
    const symptom = await this.prisma.symptom.findUnique({
      where: { id },
      include: {
        symptomCategory: true,
        patientSymptoms: {
          include: {
            patient: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!symptom) {
      throw new NotFoundException(`Symptom with ID ${id} not found`);
    }

    return symptom; 
  }

  async updateSymptom(id: string, updateSymptomDto: UpdateSymptomDto) {
    this.logger.log(`Updating symptom: ${id}`);

    try {
      // Verify symptom exists
      const existingSymptom = await this.prisma.symptom.findUnique({
        where: { id },
      });
      if (!existingSymptom) {
        throw new NotFoundException(`Symptom with ID ${id} not found`);
      }

      // If updating symptom category, verify it exists
      if (updateSymptomDto.symptomCategoryId) {
        const symptomCategory = await this.prisma.symptomCategory.findUnique({
          where: { id: updateSymptomDto.symptomCategoryId },
        });

        if (!symptomCategory) {
          throw new NotFoundException(
            `Symptom category with ID ${updateSymptomDto.symptomCategoryId} not found`,
          );
        }
      }

      const updatedSymptom = await this.prisma.symptom.update({
        where: { id },
        data: updateSymptomDto,
        include: {
          symptomCategory: true,
        },
      });

      this.logger.log(`Symptom updated successfully: ${id}`);
      return updatedSymptom;
    } catch (error) {
      this.logger.error(
        `Error updating symptom: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async removeSymptom(id: string) {
    this.logger.log(`Removing symptom: ${id}`);

    try {
      // Verify symptom exists
      const existingSymptom = await this.prisma.symptom.findUnique({
        where: { id },
      });
      if (!existingSymptom) {
        throw new NotFoundException(`Symptom with ID ${id} not found`);
      }

      await this.prisma.symptom.delete({ where: { id } });
      this.logger.log(`Symptom removed successfully: ${id}`);

      return { message: 'Symptom deleted successfully' };
    } catch (error) {
      this.logger.error(
        `Error removing symptom: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // === Patient Symptoms ===
  async createPatientSymptom(createPatientSymptomDto: CreatePatientSymptomDto) {
    this.logger.log('Creating patient symptom association');

    try {
      // Verify patient exists
      const patient = await this.prisma.patient.findUnique({
        where: { id: createPatientSymptomDto.patientId },
      });
      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${createPatientSymptomDto.patientId} not found`,
        );
      }

      // Verify symptom exists
      const symptom = await this.prisma.symptom.findUnique({
        where: { id: createPatientSymptomDto.symptomId },
      });
      if (!symptom) {
        throw new NotFoundException(
          `Symptom with ID ${createPatientSymptomDto.symptomId} not found`,
        );
      }

      const patientSymptom = await this.prisma.patientSymptom.create({
        data: {
          ...createPatientSymptomDto,
          reportedAt: createPatientSymptomDto.reportedAt
            ? new Date(createPatientSymptomDto.reportedAt)
            : new Date(),
        },
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          symptom: true,
        },
      });

      this.logger.log(
        `Patient symptom created successfully: ${patientSymptom.id}`,
      );
      return patientSymptom;
    } catch (error) {
      this.logger.error(
        `Error creating patient symptom: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findPatientSymptoms(patientId: string) {
    this.logger.log(`Fetching symptoms for patient: ${patientId}`);

    const patientSymptoms = await this.prisma.patientSymptom.findMany({
      where: { patientId },
      include: {
        symptom: {
          include: {
            symptomCategory: true,
          },
        },
      },
      orderBy: {
        reportedAt: 'desc',
      },
    });

    return patientSymptoms;
  }

  async removePatientSymptom(patientId: string, symptomId: string) {
    this.logger.log(`Removing symptom ${symptomId} from patient ${patientId}`);

    try {
      const patientSymptom = await this.prisma.patientSymptom.findFirst({
        where: {
          patientId,
          symptomId,
        },
      });

      if (!patientSymptom) {
        throw new NotFoundException(`Patient symptom association not found`);
      }

      await this.prisma.patientSymptom.delete({
        where: { id: patientSymptom.id },
      });

      this.logger.log(`Patient symptom removed successfully`);
      return { message: 'Patient symptom association deleted successfully' };
    } catch (error) {
      this.logger.error(
        `Error removing patient symptom: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Add multiple symptoms to a patient at once
   */
  async addBatchPatientSymptoms(dto: AddBatchPatientSymptomsDto) {
    this.logger.log(
      `Adding ${dto.symptoms.length} symptoms to patient ${dto.patientId}`,
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

      // Verify all symptoms exist
      const symptomIds = dto.symptoms.map((s) => s.symptomId);
      const symptoms = await this.prisma.symptom.findMany({
        where: { id: { in: symptomIds } },
      });

      if (symptoms.length !== symptomIds.length) {
        const foundIds = symptoms.map((s) => s.id);
        const missingIds = symptomIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Symptoms not found: ${missingIds.join(', ')}`,
        );
      }

      // Create all patient symptoms in a transaction
      const createdSymptoms = await this.prisma.$transaction(
        dto.symptoms.map((symptomData) =>
          this.prisma.patientSymptom.create({
            data: {
              patientId: dto.patientId,
              symptomId: symptomData.symptomId,
              severity: symptomData.severity || 'mild',
              frequency: symptomData.frequency,
              duration: symptomData.duration,
              reportedAt: symptomData.reportedAt
                ? new Date(symptomData.reportedAt)
                : new Date(),
              notes: symptomData.notes,
            },
            include: {
              symptom: {
                include: {
                  symptomCategory: true,
                },
              },
            },
          }),
        ),
      );

      this.logger.log(
        `Successfully added ${createdSymptoms.length} symptoms to patient ${dto.patientId}`,
      );

      return {
        patientId: dto.patientId,
        symptomsAdded: createdSymptoms.length,
        symptoms: createdSymptoms,
      };
    } catch (error) {
      this.logger.error(
        `Error adding batch symptoms: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // === Symptom Categories ===
  async findAllSymptomCategories() {
    return this.prisma.symptomCategory.findMany({
      include: {
        _count: {
          select: {
            symptoms: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
