import { PrismaService } from '../../config/database/prisma.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { QueryMedicDto } from './dto/query-medic.dto';
export declare class MedicsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createMedicDto: CreateMedicDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        } | null;
        specialty: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        lastName: string;
        phone: string | null;
        email: string;
        active: boolean;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        specialtyId: string;
        professionalTitle: string;
    }>;
    findAll(query: QueryMedicDto): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                name: string;
                role: {
                    id: number;
                    name: string;
                };
            } | null;
            specialty: {
                id: string;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            lastName: string;
            phone: string | null;
            email: string;
            active: boolean;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            specialtyId: string;
            professionalTitle: string;
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
            email: string;
            name: string;
            role: {
                id: number;
                name: string;
                description: string | null;
            };
        } | null;
    } & {
        id: string;
        lastName: string;
        phone: string | null;
        email: string;
        active: boolean;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        specialtyId: string;
        professionalTitle: string;
    }>;
    findByEmail(email: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: {
                id: number;
                name: string;
            };
        } | null;
    } & {
        id: string;
        lastName: string;
        phone: string | null;
        email: string;
        active: boolean;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        specialtyId: string;
        professionalTitle: string;
    }>;
    update(id: string, updateMedicDto: UpdateMedicDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: {
                id: number;
                name: string;
            };
        } | null;
        specialty: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        lastName: string;
        phone: string | null;
        email: string;
        active: boolean;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        specialtyId: string;
        professionalTitle: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    convertToUser(medicId: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: {
                id: number;
                name: string;
            };
        } | null;
        specialty: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        lastName: string;
        phone: string | null;
        email: string;
        active: boolean;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        specialtyId: string;
        professionalTitle: string;
    }>;
    removeUser(medicId: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        } | null;
    } & {
        id: string;
        lastName: string;
        phone: string | null;
        email: string;
        active: boolean;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        specialtyId: string;
        professionalTitle: string;
    }>;
    bulkCreate(medics: CreateMedicDto[]): Promise<any[]>;
    getMedicStats(): Promise<{
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
