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
            email: string;
            id: string;
            name: string | null;
        } | null;
        specialty: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        email: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        lastName: string;
        identification: string;
        phone: string | null;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    findAll(query: QueryMedicDto): Promise<{
        data: ({
            user: {
                email: string;
                id: string;
                name: string | null;
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
            email: string;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            lastName: string;
            identification: string;
            phone: string | null;
            userId: string | null;
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
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
                description: string | null;
            };
        } | null;
    } & {
        email: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        lastName: string;
        identification: string;
        phone: string | null;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    findByIdentification(identification: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
        } | null;
    } & {
        email: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        lastName: string;
        identification: string;
        phone: string | null;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    findByEmail(email: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
        } | null;
    } & {
        email: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        lastName: string;
        identification: string;
        phone: string | null;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    update(id: string, updateMedicDto: UpdateMedicDto): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
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
        email: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        lastName: string;
        identification: string;
        phone: string | null;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    convertToUser(medicId: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
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
        email: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        lastName: string;
        identification: string;
        phone: string | null;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    removeUser(medicId: string): Promise<{
        user: {
            email: string;
            id: string;
            name: string | null;
        } | null;
    } & {
        email: string;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        lastName: string;
        identification: string;
        phone: string | null;
        userId: string | null;
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
