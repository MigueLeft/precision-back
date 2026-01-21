import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { QueryPatientDto } from './dto/query-patient.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      // Verificar que el usuario existe si se proporciona userId
      if (createPatientDto.userId) {
        const user = await this.prisma.user.findUnique({
          where: { id: createPatientDto.userId },
        });

        if (!user) {
          throw new BadRequestException(
            `User with ID ${createPatientDto.userId} not found`,
          );
        }

        // Verificar que el usuario no esté ya asignado a otro paciente
        const existingPatient = await this.prisma.patient.findUnique({
          where: { userId: createPatientDto.userId },
        });

        if (existingPatient) {
          throw new ConflictException(
            'User is already assigned to another patient',
          );
        }
      }

      const patient = await this.prisma.patient.create({
        data: createPatientDto,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      this.logger.log(
        `Patient created: ${patient.firstName} ${patient.lastName}`,
      );
      return patient;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          if (field?.includes('identification')) {
            throw new ConflictException('Identification number already exists');
          }
          if (field?.includes('email')) {
            throw new ConflictException('Email already exists');
          }
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryPatientDto) {
    const {
      page = 1,
      limit = 10,
      search,
      active,
      birthdate,
      birthdateFrom,
      birthdateTo,
      sortBy = 'id',
      sortOrder = 'asc',
      gender,
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PatientWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { identification: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(typeof active === 'boolean' && { active }),
      ...(birthdate && {
        birthdate: {
          gte: new Date(new Date(birthdate).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(birthdate).setHours(23, 59, 59, 999)),
        },
      }),
      ...(!birthdate &&
        birthdateFrom &&
        birthdateTo && {
          birthdate: {
            gte: new Date(birthdateFrom),
            lte: new Date(birthdateTo),
          },
        }),
      ...(!birthdate &&
        birthdateFrom &&
        !birthdateTo && {
          birthdate: { gte: new Date(birthdateFrom) },
        }),
      ...(!birthdate &&
        birthdateTo &&
        !birthdateFrom && {
          birthdate: { lte: new Date(birthdateTo) },
        }),
      ...(gender && { gender }),
    };

    const orderBy: Prisma.PatientOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [patients, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.patient.count({ where }),
    ]);

    return {
      data: patients,
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
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: {
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

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async findByIdentification(identification: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { identification },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(
        `Patient with identification ${identification} not found`,
      );
    }

    return patient;
  }

  async findByEmail(email: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { email },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with email ${email} not found`);
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      // Verificar que el paciente existe
      const existingPatient = await this.prisma.patient.findUnique({
        where: { id },
      });

      if (!existingPatient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      // Verificar que el usuario existe si se proporciona userId
      if (updatePatientDto.userId) {
        const user = await this.prisma.user.findUnique({
          where: { id: updatePatientDto.userId },
        });

        if (!user) {
          throw new BadRequestException(
            `User with ID ${updatePatientDto.userId} not found`,
          );
        }

        // Verificar que el usuario no esté ya asignado a otro paciente
        if (updatePatientDto.userId !== existingPatient.userId) {
          const patientWithUser = await this.prisma.patient.findUnique({
            where: { userId: updatePatientDto.userId },
          });

          if (patientWithUser) {
            throw new ConflictException(
              'User is already assigned to another patient',
            );
          }
        }
      }

      const patient = await this.prisma.patient.update({
        where: { id },
        data: updatePatientDto,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      this.logger.log(
        `Patient updated: ${patient.firstName} ${patient.lastName}`,
      );
      return patient;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          if (field?.includes('identification')) {
            throw new ConflictException('Identification number already exists');
          }
          if (field?.includes('email')) {
            throw new ConflictException('Email already exists');
          }
          throw new ConflictException('Unique constraint violation');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const patient = await this.prisma.patient.delete({
        where: { id },
      });

      this.logger.log(
        `Patient deleted: ${patient.firstName} ${patient.lastName}`,
      );
      return { message: 'Patient deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Patient with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async convertToUser(patientId: string) {
    try {
      // Verificar que el paciente existe
      const existingPatient = await this.prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          user: true,
        },
      });

      if (!existingPatient) {
        throw new NotFoundException(`Patient with ID ${patientId} not found`);
      }

      // Verificar que el paciente no tenga ya un usuario asignado
      if (existingPatient.userId) {
        throw new ConflictException('Patient already has a user account');
      }

      // Buscar el rol PATIENT
      const patientRole = await this.prisma.role.findUnique({
        where: { name: 'PATIENT' },
      });

      if (!patientRole) {
        throw new BadRequestException('PATIENT role not found in the system');
      }

      // Verificar que no exista un usuario con el mismo email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: existingPatient.email },
      });

      if (existingUser) {
        throw new ConflictException('A user with this email already exists');
      }

      // Crear el usuario usando los datos del paciente
      const newUser = await this.prisma.user.create({
        data: {
          name: `${existingPatient.firstName} ${existingPatient.lastName}`,
          email: existingPatient.email,
          password: existingPatient.identification, // Password será la identificación
          roleId: patientRole.id,
        },
        include: {
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      // Actualizar el paciente con el ID del usuario creado
      const patient = await this.prisma.patient.update({
        where: { id: patientId },
        data: { userId: newUser.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      this.logger.log(
        `Patient converted to user: ${patient.firstName} ${patient.lastName} (${newUser.email})`,
      );
      return patient;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }
      }
      throw error;
    }
  }

  async removeUser(patientId: string) {
    try {
      const patient = await this.prisma.patient.update({
        where: { id: patientId },
        data: { userId: null },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      this.logger.log(
        `User removed from patient: ${patient.firstName} ${patient.lastName}`,
      );
      return patient;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }
      }
      throw error;
    }
  }

  async getActivePatients() {
    return this.prisma.patient.findMany({
      where: { active: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        identification: true,
        email: true,
        phone: true,
        birthdate: true,
        gender: true,
      },
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    });
  }

  async bulkCreate(patients: CreatePatientDto[]) {
    try {
      const createdPatients: any[] = [];

      for (const patientDto of patients) {
        const patient = await this.create(patientDto);
        createdPatients.push(patient);
      }

      this.logger.log(`Created ${createdPatients.length} patients`);
      return createdPatients;
    } catch (error) {
      this.logger.error('Error in bulk create patients', error);
      throw error;
    }
  }

  async getPatientStats() {
    const [total, active, inactive, withUser, withoutUser] = await Promise.all([
      this.prisma.patient.count(),
      this.prisma.patient.count({ where: { active: true } }),
      this.prisma.patient.count({ where: { active: false } }),
      this.prisma.patient.count({ where: { userId: { not: null } } }),
      this.prisma.patient.count({ where: { userId: null } }),
    ]);

    return {
      total,
      active,
      inactive,
      withUser,
      withoutUser,
      percentage: {
        active: total > 0 ? Math.round((active / total) * 100) : 0,
        withUser: total > 0 ? Math.round((withUser / total) * 100) : 0,
      },
    };
  }

  async getPatientQuestionnaires(patientId: string) {
    // Verificar que el paciente existe
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    const questionnaires = await this.prisma.patientQuestionnaire.findMany({
      where: { patientId },
      include: {
        questionnaire: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            answers: true,
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
    });

    const result = questionnaires.map((q) => ({
      id: q.id,
      questionnaireName: q.questionnaire.name,
      answeredAt: q.completedAt || q.startedAt,
      numberOfQuestions: q._count.answers,
    }));

    this.logger.log(
      `Retrieved ${questionnaires.length} questionnaires for patient ${patientId}`,
    );
    return result;
  }

  async getPatientQuestionnaireDetails(
    patientId: string,
    patientQuestionnaireId: string,
  ) {
    // Verificar que el paciente existe
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    const patientQuestionnaire =
      await this.prisma.patientQuestionnaire.findUnique({
        where: {
          id: patientQuestionnaireId,
        },
        include: {
          questionnaire: {
            select: {
              id: true,
              code: true,
              name: true,
              description: true,
              version: true,
            },
          },
          answers: {
            include: {
              question: {
                select: {
                  id: true,
                  code: true,
                  questionText: true,
                  questionType: true,
                  inputType: true,
                  options: true,
                  hasScore: true,
                },
              },
            },
            orderBy: {
              answeredAt: 'asc',
            },
          },
        },
      });

    if (!patientQuestionnaire) {
      throw new NotFoundException(
        `Patient questionnaire with ID ${patientQuestionnaireId} not found`,
      );
    }

    // Verificar que el cuestionario pertenece al paciente
    if (patientQuestionnaire.patientId !== patientId) {
      throw new NotFoundException(
        `Patient questionnaire with ID ${patientQuestionnaireId} not found for patient ${patientId}`,
      );
    }

    // Formatear las respuestas para incluir pregunta y respuesta juntas
    const questionsWithAnswers = patientQuestionnaire.answers.map((answer) => ({
      questionId: answer.question.id,
      questionCode: answer.question.code,
      questionText: answer.question.questionText,
      questionType: answer.question.questionType,
      inputType: answer.question.inputType,
      options: answer.question.options,
      hasScore: answer.question.hasScore,
      answer: {
        textValue: answer.textValue,
        numericValue: answer.numericValue,
        booleanValue: answer.booleanValue,
        dateValue: answer.dateValue,
        jsonValue: answer.jsonValue,
        score: answer.score,
        answeredAt: answer.answeredAt,
      },
    }));

    this.logger.log(
      `Retrieved questionnaire details for patient ${patientId}: ${questionsWithAnswers.length} questions`,
    );

    return {
      patientQuestionnaireId: patientQuestionnaire.id,
      questionnaire: patientQuestionnaire.questionnaire,
      startedAt: patientQuestionnaire.startedAt,
      completedAt: patientQuestionnaire.completedAt,
      isCompleted: patientQuestionnaire.isCompleted,
      totalScore: patientQuestionnaire.totalScore,
      notes: patientQuestionnaire.notes,
      totalQuestions: questionsWithAnswers.length,
      questionsWithAnswers,
    };
  }

  /**
   * Update clinical information (current illness and diagnostic plan)
   */
  async updateClinicalInfo(
    patientId: string,
    currentIllness?: string,
    diagnosticPlan?: string,
    updatedBy?: string,
  ) {
    this.logger.log(`Updating clinical information for patient ${patientId}`);

    // Verify patient exists
    const patient = await this.findOne(patientId);

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return this.prisma.patient.update({
      where: { id: patientId },
      data: {
        currentIllness,
        diagnosticPlan,
        lastClinicalUpdateBy: updatedBy,
        lastClinicalUpdateAt: new Date(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        identification: true,
        currentIllness: true,
        diagnosticPlan: true,
        lastClinicalUpdateBy: true,
        lastClinicalUpdateAt: true,
      },
    });
  }

  /**
   * Get clinical information for a patient
   */
  async getClinicalInfo(patientId: string) {
    this.logger.log(`Getting clinical information for patient ${patientId}`);

    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        identification: true,
        currentIllness: true,
        diagnosticPlan: true,
        lastClinicalUpdateBy: true,
        lastClinicalUpdateAt: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return patient;
  }
}
