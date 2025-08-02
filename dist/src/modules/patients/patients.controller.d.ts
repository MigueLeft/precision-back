import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { QueryPatientDto } from './dto/query-patient.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
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
    convertToUser(id: string): Promise<{
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
    removeUser(id: string): Promise<{
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
    bulkCreate(patients: CreatePatientDto[]): Promise<any[]>;
}
