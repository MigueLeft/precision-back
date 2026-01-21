import {
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreateExamCatalogDto } from './dto/create-exam-catalog.dto';
import { UpdateExamCatalogDto } from './dto/update-exam-catalog.dto';
import { QueryExamCatalogDto } from './dto/query-exam-catalog.dto';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { QueryExamResultDto } from './dto/query-exam-result.dto';
import { AddBatchExamResultsDto } from './dto/add-batch-exam-results.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LaboratoryExamsService {
  private readonly logger = new Logger(LaboratoryExamsService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ========================================
  // EXAM CATALOG METHODS
  // ========================================

  async createExamCatalog(createDto: CreateExamCatalogDto) {
    this.logger.log(
      `Creating exam catalog: ${createDto.category} - ${createDto.examName}`,
    );

    // Check for duplicates
    const existing = await this.prisma.examCatalog.findUnique({
      where: {
        category_examName: {
          category: createDto.category,
          examName: createDto.examName,
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Exam "${createDto.examName}" already exists in category "${createDto.category}"`,
      );
    }

    return this.prisma.examCatalog.create({
      data: createDto,
    });
  }

  async findAllExamCatalog(query: QueryExamCatalogDto) {
    const { page = 1, limit = 10, search, category, dataType, active } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (active !== undefined) {
      where.active = active;
    }

    if (category) {
      where.category = category;
    }

    if (dataType) {
      where.dataType = dataType;
    }

    if (search) {
      where.OR = [
        { examName: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.examCatalog.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ category: 'asc' }, { examName: 'asc' }],
      }),
      this.prisma.examCatalog.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneExamCatalog(id: string) {
    const exam = await this.prisma.examCatalog.findUnique({
      where: { id },
      include: {
        _count: {
          select: { examResults: true },
        },
      },
    });

    if (!exam) {
      throw new NotFoundException(`Exam catalog with ID ${id} not found`);
    }

    return exam;
  }

  async updateExamCatalog(id: string, updateDto: UpdateExamCatalogDto) {
    await this.findOneExamCatalog(id);

    this.logger.log(`Updating exam catalog ${id}`);

    return this.prisma.examCatalog.update({
      where: { id },
      data: updateDto,
    });
  }

  async removeExamCatalog(id: string) {
    await this.findOneExamCatalog(id);

    this.logger.log(`Soft deleting exam catalog ${id}`);

    return this.prisma.examCatalog.update({
      where: { id },
      data: { active: false },
    });
  }

  async getExamCategories() {
    const categories = await this.prisma.examCatalog.findMany({
      where: { active: true },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return categories.map((c) => c.category);
  }

  async getExamsByCategory(category: string) {
    return this.prisma.examCatalog.findMany({
      where: {
        category,
        active: true,
      },
      orderBy: { examName: 'asc' },
    });
  }

  // ========================================
  // EXAM RESULTS METHODS
  // ========================================

  async createExamResult(createDto: CreateExamResultDto) {
    this.logger.log(
      `Creating exam result for patient ${createDto.patientId}, exam ${createDto.examId}`,
    );

    // Verify patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: createDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${createDto.patientId} not found`,
      );
    }

    // Verify exam exists
    const exam = await this.prisma.examCatalog.findUnique({
      where: { id: createDto.examId },
    });

    if (!exam) {
      throw new NotFoundException(
        `Exam catalog with ID ${createDto.examId} not found`,
      );
    }

    // Verify medical study if provided
    if (createDto.medicalStudyId) {
      const study = await this.prisma.medicalStudy.findUnique({
        where: { id: createDto.medicalStudyId },
      });

      if (!study) {
        throw new NotFoundException(
          `Medical study with ID ${createDto.medicalStudyId} not found`,
        );
      }
    }

    // Check if result is abnormal
    let isAbnormal = false;
    if (
      exam.dataType === 'numerico' &&
      createDto.numericValue !== undefined &&
      exam.referenceMin !== null &&
      exam.referenceMax !== null
    ) {
      const value = createDto.numericValue;
      const min = Number(exam.referenceMin);
      const max = Number(exam.referenceMax);
      isAbnormal = value < min || value > max;
    }

    return this.prisma.examResult.create({
      data: {
        ...createDto,
        isAbnormal,
      },
      include: {
        exam: true,
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identification: true,
          },
        },
        medicalStudy: true,
      },
    });
  }

  async findAllExamResults(query: QueryExamResultDto) {
    const {
      page = 1,
      limit = 10,
      patientId,
      examId,
      medicalStudyId,
      startDate,
      endDate,
      isAbnormal,
      active,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (active !== undefined) {
      where.active = active;
    }

    if (patientId) {
      where.patientId = patientId;
    }

    if (examId) {
      where.examId = examId;
    }

    if (medicalStudyId) {
      where.medicalStudyId = medicalStudyId;
    }

    if (isAbnormal !== undefined) {
      where.isAbnormal = isAbnormal;
    }

    if (startDate || endDate) {
      where.resultDate = {};
      if (startDate) {
        where.resultDate.gte = new Date(startDate);
      }
      if (endDate) {
        where.resultDate.lte = new Date(endDate);
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.examResult.findMany({
        where,
        skip,
        take: limit,
        orderBy: { resultDate: 'desc' },
        include: {
          exam: true,
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              identification: true,
            },
          },
          medicalStudy: {
            select: {
              id: true,
              studyName: true,
              studyType: true,
              studyDate: true,
            },
          },
        },
      }),
      this.prisma.examResult.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneExamResult(id: string) {
    const result = await this.prisma.examResult.findUnique({
      where: { id },
      include: {
        exam: true,
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identification: true,
            birthdate: true,
            gender: true,
          },
        },
        medicalStudy: true,
      },
    });

    if (!result) {
      throw new NotFoundException(`Exam result with ID ${id} not found`);
    }

    return result;
  }

  async updateExamResult(id: string, updateDto: UpdateExamResultDto) {
    await this.findOneExamResult(id);

    this.logger.log(`Updating exam result ${id}`);

    // Recalculate isAbnormal if numeric value is updated
    let isAbnormal: boolean | undefined;

    if (updateDto.numericValue !== undefined && updateDto.examId) {
      const exam = await this.prisma.examCatalog.findUnique({
        where: { id: updateDto.examId },
      });

      if (
        exam &&
        exam.dataType === 'numerico' &&
        exam.referenceMin !== null &&
        exam.referenceMax !== null
      ) {
        const value = updateDto.numericValue;
        const min = Number(exam.referenceMin);
        const max = Number(exam.referenceMax);
        isAbnormal = value < min || value > max;
      }
    }

    return this.prisma.examResult.update({
      where: { id },
      data: {
        ...updateDto,
        ...(isAbnormal !== undefined && { isAbnormal }),
      },
      include: {
        exam: true,
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identification: true,
          },
        },
        medicalStudy: true,
      },
    });
  }

  async removeExamResult(id: string) {
    await this.findOneExamResult(id);

    this.logger.log(`Soft deleting exam result ${id}`);

    return this.prisma.examResult.update({
      where: { id },
      data: { active: false },
    });
  }

  async getPatientExamHistory(patientId: string, examId?: string) {
    const where: any = {
      patientId,
      active: true,
    };

    if (examId) {
      where.examId = examId;
    }

    return this.prisma.examResult.findMany({
      where,
      orderBy: { resultDate: 'desc' },
      include: {
        exam: true,
      },
    });
  }

  async getAbnormalResults(patientId?: string) {
    const where: any = {
      isAbnormal: true,
      active: true,
    };

    if (patientId) {
      where.patientId = patientId;
    }

    return this.prisma.examResult.findMany({
      where,
      orderBy: { resultDate: 'desc' },
      include: {
        exam: true,
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

  /**
   * Add multiple exam results to a patient at once
   */
  async addBatchExamResults(dto: AddBatchExamResultsDto) {
    this.logger.log(
      `Adding ${dto.results.length} exam results to patient ${dto.patientId}`,
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

      // Verify all exams exist
      const examIds = dto.results.map((r) => r.examId);
      const exams = await this.prisma.examCatalog.findMany({
        where: { id: { in: examIds } },
      });

      if (exams.length !== examIds.length) {
        const foundIds = exams.map((e) => e.id);
        const missingIds = examIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Exams not found: ${missingIds.join(', ')}`,
        );
      }

      // Create a map for quick exam lookup
      const examMap = new Map(exams.map((e) => [e.id, e]));

      // Create all exam results in a transaction
      const createdResults = await this.prisma.$transaction(
        dto.results.map((resultData) => {
          const exam = examMap.get(resultData.examId);
          if (!exam) {
            throw new NotFoundException(
              `Exam configuration not found for ID ${resultData.examId}`,
            );
          }

          // Auto-calculate isAbnormal if not provided and we have numeric value
          let isAbnormal = resultData.isAbnormal;
          if (
            isAbnormal === undefined &&
            resultData.numericValue !== undefined &&
            exam.dataType === 'numerico' &&
            exam.referenceMin !== null &&
            exam.referenceMax !== null
          ) {
            const value = Number(resultData.numericValue);
            const min = Number(exam.referenceMin);
            const max = Number(exam.referenceMax);
            isAbnormal = value < min || value > max;
          }

          return this.prisma.examResult.create({
            data: {
              patientId: dto.patientId,
              examId: resultData.examId,
              numericValue: resultData.numericValue
                ? new Prisma.Decimal(resultData.numericValue)
                : null,
              textValue: resultData.textValue,
              resultDate: new Date(resultData.resultDate),
              isAbnormal: isAbnormal || false,
              observations: resultData.observations,
              orderedBy: resultData.orderedBy,
              medicalStudyId: resultData.medicalStudyId,
            },
            include: {
              exam: true,
            },
          });
        }),
      );

      this.logger.log(
        `Successfully added ${createdResults.length} exam results to patient ${dto.patientId}`,
      );

      return {
        patientId: dto.patientId,
        resultsAdded: createdResults.length,
        results: createdResults,
      };
    } catch (error) {
      this.logger.error(
        `Error adding batch exam results: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
