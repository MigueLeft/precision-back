import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateAntecedentDto } from './dto/create-antecedent.dto';
import { UpdateAntecedentDto } from './dto/update-antecedent.dto';
import { QueryAntecedentsDto } from './dto/query-antecedents.dto';
import { AssignPatientAntecedentDto } from './dto/assign-patient-antecedent.dto';
import { AddBatchPatientAntecedentsDto } from './dto/add-batch-patient-antecedents.dto';

@Injectable()
export class AntecedentsService {
  private readonly logger = new Logger(AntecedentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createAntecedentDto: CreateAntecedentDto) {
    this.logger.log(`Creating antecedent: ${createAntecedentDto.name}`);

    try {
      // Verificar que el tipo de antecedente existe
      const antecedentType = await this.prisma.antecedentType.findUnique({
        where: { id: createAntecedentDto.antecedentTypeId },
      });

      if (!antecedentType) {
        throw new NotFoundException(
          `Antecedent type with ID ${createAntecedentDto.antecedentTypeId} not found`,
        );
      }

      const antecedent = await this.prisma.antecedent.create({
        data: createAntecedentDto,
        include: {
          antecedentType: true,
        },
      });

      this.logger.log(`Antecedent created successfully: ${antecedent.id}`);
      return antecedent;
    } catch (error) {
      this.logger.error(
        `Error creating antecedent: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(queryDto: QueryAntecedentsDto) {
    this.logger.log(
      `Fetching antecedents with filters: ${JSON.stringify(queryDto)}`,
    );

    const {
      page = 1,
      limit = 10,
      search,
      antecedentTypeId,
      active,
      sortBy = 'name',
      sortOrder = 'asc',
    } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { value: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (antecedentTypeId) {
      where.antecedentTypeId = antecedentTypeId;
    }

    if (active !== undefined) {
      where.active = active;
    }

    this.logger.log(`Where clause: ${JSON.stringify(where)}`);

    try {
      const antecedents = await this.prisma.antecedent.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          antecedentType: true,
          _count: {
            select: {
              patientAntecedents: true,
            },
          },
        },
      });

      this.logger.log(`Found ${antecedents.length} antecedents`);

      const total = await this.prisma.antecedent.count({ where });

      this.logger.log(`Total count: ${total}`);

      const totalPages = Math.ceil(total / limit);

      return {
        data: antecedents,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      this.logger.error(
        `Error fetching antecedents: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: string) {
    this.logger.log(`Fetching antecedent: ${id}`);

    try {
      const antecedent = await this.prisma.antecedent.findUnique({
        where: { id },
        include: {
          antecedentType: true,
          patientAntecedents: {
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
          },
        },
      });

      if (!antecedent) {
        throw new NotFoundException(`Antecedent with ID ${id} not found`);
      }

      return antecedent;
    } catch (error) {
      this.logger.error(
        `Error fetching antecedent ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, updateAntecedentDto: UpdateAntecedentDto) {
    this.logger.log(`Updating antecedent: ${id}`);

    try {
      // Verificar que el antecedente existe
      await this.findOne(id);

      // Si se está actualizando el tipo, verificar que existe
      if (updateAntecedentDto.antecedentTypeId) {
        const antecedentType = await this.prisma.antecedentType.findUnique({
          where: { id: updateAntecedentDto.antecedentTypeId },
        });

        if (!antecedentType) {
          throw new NotFoundException(
            `Antecedent type with ID ${updateAntecedentDto.antecedentTypeId} not found`,
          );
        }
      }

      const antecedent = await this.prisma.antecedent.update({
        where: { id },
        data: updateAntecedentDto,
        include: {
          antecedentType: true,
        },
      });

      this.logger.log(`Antecedent updated successfully: ${id}`);
      return antecedent;
    } catch (error) {
      this.logger.error(
        `Error updating antecedent ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string) {
    this.logger.log(`Removing antecedent: ${id}`);

    try {
      // Verificar que el antecedente existe
      await this.findOne(id);

      await this.prisma.antecedent.delete({
        where: { id },
      });

      this.logger.log(`Antecedent removed successfully: ${id}`);
      return { message: 'Antecedent deleted successfully' };
    } catch (error) {
      this.logger.error(
        `Error removing antecedent ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // Métodos para gestionar antecedentes de pacientes
  async assignToPatient(assignDto: AssignPatientAntecedentDto) {
    this.logger.log(
      `Assigning antecedent ${assignDto.antecedentId} to patient ${assignDto.patientId}`,
    );

    try {
      // Verificar que el paciente y antecedente existen
      const [patient, antecedent] = await Promise.all([
        this.prisma.patient.findUnique({ where: { id: assignDto.patientId } }),
        this.prisma.antecedent.findUnique({
          where: { id: assignDto.antecedentId },
        }),
      ]);

      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${assignDto.patientId} not found`,
        );
      }

      if (!antecedent) {
        throw new NotFoundException(
          `Antecedent with ID ${assignDto.antecedentId} not found`,
        );
      }

      const patientAntecedent = await this.prisma.patientAntecedent.create({
        data: {
          patientId: assignDto.patientId,
          antecedentId: assignDto.antecedentId,
          hasCondition: assignDto.hasCondition ?? true,
          notes: assignDto.notes,
          diagnosedAt: assignDto.diagnosedAt
            ? new Date(assignDto.diagnosedAt)
            : null,
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
          antecedent: {
            include: {
              antecedentType: true,
            },
          },
        },
      });

      this.logger.log(`Antecedent assigned successfully to patient`);
      return patientAntecedent;
    } catch (error) {
      this.logger.error(
        `Error assigning antecedent to patient: ${error.message}`,
        error.stack,
      );
      if (error.code === 'P2002') {
        throw new ConflictException(
          'This antecedent is already assigned to this patient',
        );
      }
      throw error;
    }
  }

  async getPatientAntecedents(patientId: string) {
    this.logger.log(`Fetching antecedents for patient: ${patientId}`);

    try {
      // Verificar que el paciente existe
      const patient = await this.prisma.patient.findUnique({
        where: { id: patientId },
      });

      if (!patient) {
        throw new NotFoundException(`Patient with ID ${patientId} not found`);
      }

      const patientAntecedents = await this.prisma.patientAntecedent.findMany({
        where: { patientId },
        include: {
          antecedent: {
            include: {
              antecedentType: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return patientAntecedents;
    } catch (error) {
      this.logger.error(
        `Error fetching patient antecedents: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async removePatientAntecedent(patientId: string, antecedentId: string) {
    this.logger.log(
      `Removing antecedent ${antecedentId} from patient ${patientId}`,
    );

    try {
      const patientAntecedent = await this.prisma.patientAntecedent.findUnique({
        where: {
          patientId_antecedentId: {
            patientId,
            antecedentId,
          },
        },
      });

      if (!patientAntecedent) {
        throw new NotFoundException(
          `Patient antecedent relationship not found`,
        );
      }

      await this.prisma.patientAntecedent.delete({
        where: {
          patientId_antecedentId: {
            patientId,
            antecedentId,
          },
        },
      });

      this.logger.log(`Patient antecedent removed successfully`);
      return { message: 'Patient antecedent removed successfully' };
    } catch (error) {
      this.logger.error(
        `Error removing patient antecedent: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Add multiple antecedents to a patient at once
   */
  async addBatchPatientAntecedents(dto: AddBatchPatientAntecedentsDto) {
    this.logger.log(
      `Adding ${dto.antecedents.length} antecedents to patient ${dto.patientId}`,
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

      // Verify all antecedents exist
      const antecedentIds = dto.antecedents.map((a) => a.antecedentId);
      const antecedents = await this.prisma.antecedent.findMany({
        where: { id: { in: antecedentIds } },
      });

      if (antecedents.length !== antecedentIds.length) {
        const foundIds = antecedents.map((a) => a.id);
        const missingIds = antecedentIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Antecedents not found: ${missingIds.join(', ')}`,
        );
      }

      // Create all patient antecedents in a transaction
      const createdAntecedents = await this.prisma.$transaction(
        dto.antecedents.map((antecedentData) =>
          this.prisma.patientAntecedent.upsert({
            where: {
              patientId_antecedentId: {
                patientId: dto.patientId,
                antecedentId: antecedentData.antecedentId,
              },
            },
            update: {
              hasCondition: antecedentData.hasCondition,
              diagnosedAt: antecedentData.diagnosedAt
                ? new Date(antecedentData.diagnosedAt)
                : null,
              notes: antecedentData.notes,
            },
            create: {
              patientId: dto.patientId,
              antecedentId: antecedentData.antecedentId,
              hasCondition: antecedentData.hasCondition,
              diagnosedAt: antecedentData.diagnosedAt
                ? new Date(antecedentData.diagnosedAt)
                : null,
              notes: antecedentData.notes,
            },
            include: {
              antecedent: {
                include: {
                  antecedentType: true,
                },
              },
            },
          }),
        ),
      );

      this.logger.log(
        `Successfully added ${createdAntecedents.length} antecedents to patient ${dto.patientId}`,
      );

      return {
        patientId: dto.patientId,
        antecedentsAdded: createdAntecedents.length,
        antecedents: createdAntecedents,
      };
    } catch (error) {
      this.logger.error(
        `Error adding batch antecedents: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // Métodos para tipos de antecedentes
  async getAntecedentTypes() {
    this.logger.log('Fetching all antecedent types');

    try {
      return await this.prisma.antecedentType.findMany({
        where: { active: true },
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: {
              antecedents: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching antecedent types: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
