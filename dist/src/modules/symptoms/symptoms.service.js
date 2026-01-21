"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SymptomsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymptomsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/database/prisma.service");
let SymptomsService = SymptomsService_1 = class SymptomsService {
    prisma;
    logger = new common_1.Logger(SymptomsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSymptom(createSymptomDto) {
        this.logger.log('Creating new symptom');
        try {
            const symptomCategory = await this.prisma.symptomCategory.findUnique({
                where: { id: createSymptomDto.symptomCategoryId },
            });
            if (!symptomCategory) {
                throw new common_1.NotFoundException(`Symptom category with ID ${createSymptomDto.symptomCategoryId} not found`);
            }
            const symptom = await this.prisma.symptom.create({
                data: createSymptomDto,
                include: {
                    symptomCategory: true,
                },
            });
            this.logger.log(`Symptom created successfully: ${symptom.id}`);
            return symptom;
        }
        catch (error) {
            this.logger.error(`Error creating symptom: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAllSymptoms(queryDto) {
        this.logger.log(`Fetching symptoms with filters: ${JSON.stringify(queryDto)}`);
        const { page = 1, limit = 10, search, symptomCategoryId, severity, active, sortBy = 'name', sortOrder = 'asc', } = queryDto;
        const skip = (page - 1) * limit;
        const where = {};
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
    async findSymptomById(id) {
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
            throw new common_1.NotFoundException(`Symptom with ID ${id} not found`);
        }
        return symptom;
    }
    async updateSymptom(id, updateSymptomDto) {
        this.logger.log(`Updating symptom: ${id}`);
        try {
            const existingSymptom = await this.prisma.symptom.findUnique({
                where: { id },
            });
            if (!existingSymptom) {
                throw new common_1.NotFoundException(`Symptom with ID ${id} not found`);
            }
            if (updateSymptomDto.symptomCategoryId) {
                const symptomCategory = await this.prisma.symptomCategory.findUnique({
                    where: { id: updateSymptomDto.symptomCategoryId },
                });
                if (!symptomCategory) {
                    throw new common_1.NotFoundException(`Symptom category with ID ${updateSymptomDto.symptomCategoryId} not found`);
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
        }
        catch (error) {
            this.logger.error(`Error updating symptom: ${error.message}`, error.stack);
            throw error;
        }
    }
    async removeSymptom(id) {
        this.logger.log(`Removing symptom: ${id}`);
        try {
            const existingSymptom = await this.prisma.symptom.findUnique({
                where: { id },
            });
            if (!existingSymptom) {
                throw new common_1.NotFoundException(`Symptom with ID ${id} not found`);
            }
            await this.prisma.symptom.delete({ where: { id } });
            this.logger.log(`Symptom removed successfully: ${id}`);
            return { message: 'Symptom deleted successfully' };
        }
        catch (error) {
            this.logger.error(`Error removing symptom: ${error.message}`, error.stack);
            throw error;
        }
    }
    async createPatientSymptom(createPatientSymptomDto) {
        this.logger.log('Creating patient symptom association');
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: createPatientSymptomDto.patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${createPatientSymptomDto.patientId} not found`);
            }
            const symptom = await this.prisma.symptom.findUnique({
                where: { id: createPatientSymptomDto.symptomId },
            });
            if (!symptom) {
                throw new common_1.NotFoundException(`Symptom with ID ${createPatientSymptomDto.symptomId} not found`);
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
            this.logger.log(`Patient symptom created successfully: ${patientSymptom.id}`);
            return patientSymptom;
        }
        catch (error) {
            this.logger.error(`Error creating patient symptom: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findPatientSymptoms(patientId) {
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
    async removePatientSymptom(patientId, symptomId) {
        this.logger.log(`Removing symptom ${symptomId} from patient ${patientId}`);
        try {
            const patientSymptom = await this.prisma.patientSymptom.findFirst({
                where: {
                    patientId,
                    symptomId,
                },
            });
            if (!patientSymptom) {
                throw new common_1.NotFoundException(`Patient symptom association not found`);
            }
            await this.prisma.patientSymptom.delete({
                where: { id: patientSymptom.id },
            });
            this.logger.log(`Patient symptom removed successfully`);
            return { message: 'Patient symptom association deleted successfully' };
        }
        catch (error) {
            this.logger.error(`Error removing patient symptom: ${error.message}`, error.stack);
            throw error;
        }
    }
    async addBatchPatientSymptoms(dto) {
        this.logger.log(`Adding ${dto.symptoms.length} symptoms to patient ${dto.patientId}`);
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: dto.patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${dto.patientId} not found`);
            }
            const symptomIds = dto.symptoms.map((s) => s.symptomId);
            const symptoms = await this.prisma.symptom.findMany({
                where: { id: { in: symptomIds } },
            });
            if (symptoms.length !== symptomIds.length) {
                const foundIds = symptoms.map((s) => s.id);
                const missingIds = symptomIds.filter((id) => !foundIds.includes(id));
                throw new common_1.NotFoundException(`Symptoms not found: ${missingIds.join(', ')}`);
            }
            const createdSymptoms = await this.prisma.$transaction(dto.symptoms.map((symptomData) => this.prisma.patientSymptom.create({
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
            })));
            this.logger.log(`Successfully added ${createdSymptoms.length} symptoms to patient ${dto.patientId}`);
            return {
                patientId: dto.patientId,
                symptomsAdded: createdSymptoms.length,
                symptoms: createdSymptoms,
            };
        }
        catch (error) {
            this.logger.error(`Error adding batch symptoms: ${error.message}`, error.stack);
            throw error;
        }
    }
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
};
exports.SymptomsService = SymptomsService;
exports.SymptomsService = SymptomsService = SymptomsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SymptomsService);
//# sourceMappingURL=symptoms.service.js.map