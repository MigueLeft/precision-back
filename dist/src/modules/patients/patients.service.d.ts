import { PrismaService } from '../../config/database/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { QueryPatientDto } from './dto/query-patient.dto';
export declare class PatientsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createPatientDto: CreatePatientDto): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        active: boolean;
        userId: string | null;
    }>;
    findAll(query: QueryPatientDto): Promise<{
        data: ({
            user: {
                id: string;
                name: string | null;
                role: {
                    id: number;
                    name: string;
                };
                email: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            identification: string;
            phone: string | null;
            birthdate: Date;
            gender: string;
            active: boolean;
            userId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
                description: string | null;
            };
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        active: boolean;
        userId: string | null;
    }>;
    findByIdentification(identification: string): Promise<{
        user: {
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        active: boolean;
        userId: string | null;
    }>;
    findByEmail(email: string): Promise<{
        user: {
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        active: boolean;
        userId: string | null;
    }>;
    update(id: string, updatePatientDto: UpdatePatientDto): Promise<{
        user: {
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        active: boolean;
        userId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    convertToUser(patientId: string): Promise<{
        user: {
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        active: boolean;
        userId: string | null;
    }>;
    removeUser(patientId: string): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
        active: boolean;
        userId: string | null;
    }>;
    getActivePatients(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        identification: string;
        phone: string | null;
        birthdate: Date;
        gender: string;
    }[]>;
    bulkCreate(patients: CreatePatientDto[]): Promise<any[]>;
    getPatientStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        withUser: number;
        withoutUser: number;
        percentage: {
            active: number;
            withUser: number;
        };
    }>;
}
