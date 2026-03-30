import { AntecedentsService } from './antecedents.service';
import { CreateAntecedentDto } from './dto/create-antecedent.dto';
import { UpdateAntecedentDto } from './dto/update-antecedent.dto';
import { QueryAntecedentsDto } from './dto/query-antecedents.dto';
import { AssignPatientAntecedentDto } from './dto/assign-patient-antecedent.dto';
import { AddBatchPatientAntecedentsDto } from './dto/add-batch-patient-antecedents.dto';
export declare class AntecedentsController {
    private readonly antecedentsService;
    constructor(antecedentsService: AntecedentsService);
    create(createAntecedentDto: CreateAntecedentDto): Promise<{
        antecedentType: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        value: string;
        antecedentTypeId: string;
    }>;
    findAll(query: QueryAntecedentsDto): Promise<{
        data: ({
            _count: {
                patientAntecedents: number;
            };
            antecedentType: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
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
    getAntecedentTypes(): Promise<({
        _count: {
            antecedents: number;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    })[]>;
    findOne(id: string): Promise<{
        patientAntecedents: ({
            patient: {
                id: string;
                firstName: string;
                lastName: string;
                identification: string | null;
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
        antecedentType: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        value: string;
        antecedentTypeId: string;
    }>;
    update(id: string, updateAntecedentDto: UpdateAntecedentDto): Promise<{
        antecedentType: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        value: string;
        antecedentTypeId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    assignToPatient(assignDto: AssignPatientAntecedentDto): Promise<{
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            identification: string | null;
        };
        antecedent: {
            antecedentType: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
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
    }>;
    addBatchPatientAntecedents(dto: AddBatchPatientAntecedentsDto): Promise<{
        patientId: string;
        antecedentsAdded: number;
        antecedents: ({
            antecedent: {
                antecedentType: {
                    id: string;
                    active: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string | null;
                };
            } & {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
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
    getPatientAntecedents(patientId: string): Promise<({
        antecedent: {
            antecedentType: {
                id: string;
                active: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
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
}
