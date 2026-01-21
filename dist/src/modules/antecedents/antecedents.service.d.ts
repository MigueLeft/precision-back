import { PrismaService } from '../../config/database/prisma.service';
import { CreateAntecedentDto } from './dto/create-antecedent.dto';
import { UpdateAntecedentDto } from './dto/update-antecedent.dto';
import { QueryAntecedentsDto } from './dto/query-antecedents.dto';
import { AssignPatientAntecedentDto } from './dto/assign-patient-antecedent.dto';
import { AddBatchPatientAntecedentsDto } from './dto/add-batch-patient-antecedents.dto';
export declare class AntecedentsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createAntecedentDto: CreateAntecedentDto): Promise<{
        antecedentType: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        value: string;
        antecedentTypeId: string;
    }>;
    findAll(queryDto: QueryAntecedentsDto): Promise<{
        data: ({
            _count: {
                patientAntecedents: number;
            };
            antecedentType: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            value: string;
            antecedentTypeId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    findOne(id: string): Promise<{
        antecedentType: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
        };
        patientAntecedents: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                identification: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            diagnosedAt: Date | null;
            antecedentId: string;
            hasCondition: boolean;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        value: string;
        antecedentTypeId: string;
    }>;
    update(id: string, updateAntecedentDto: UpdateAntecedentDto): Promise<{
        antecedentType: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        value: string;
        antecedentTypeId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    assignToPatient(assignDto: AssignPatientAntecedentDto): Promise<{
        antecedent: {
            antecedentType: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            value: string;
            antecedentTypeId: string;
        };
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        diagnosedAt: Date | null;
        antecedentId: string;
        hasCondition: boolean;
    }>;
    getPatientAntecedents(patientId: string): Promise<({
        antecedent: {
            antecedentType: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            value: string;
            antecedentTypeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        notes: string | null;
        diagnosedAt: Date | null;
        antecedentId: string;
        hasCondition: boolean;
    })[]>;
    removePatientAntecedent(patientId: string, antecedentId: string): Promise<{
        message: string;
    }>;
    addBatchPatientAntecedents(dto: AddBatchPatientAntecedentsDto): Promise<{
        patientId: string;
        antecedentsAdded: number;
        antecedents: ({
            antecedent: {
                antecedentType: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    active: boolean;
                };
            } & {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
                value: string;
                antecedentTypeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            diagnosedAt: Date | null;
            antecedentId: string;
            hasCondition: boolean;
        })[];
    }>;
    getAntecedentTypes(): Promise<({
        _count: {
            antecedents: number;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    })[]>;
}
