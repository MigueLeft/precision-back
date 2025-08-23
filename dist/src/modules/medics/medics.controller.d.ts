import { MedicsService } from './medics.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { QueryMedicDto } from './dto/query-medic.dto';
export declare class MedicsController {
    private readonly medicsService;
    constructor(medicsService: MedicsService);
    create(createMedicDto: CreateMedicDto): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        } | null;
        specialty: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        lastName: string;
        identification: string;
        phone: string | null;
        active: boolean;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
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
    findAll(query: QueryMedicDto): Promise<{
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
            specialty: {
                id: string;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            lastName: string;
            identification: string;
            phone: string | null;
            active: boolean;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        lastName: string;
        identification: string;
        phone: string | null;
        active: boolean;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        lastName: string;
        identification: string;
        phone: string | null;
        active: boolean;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        lastName: string;
        identification: string;
        phone: string | null;
        active: boolean;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    update(id: string, updateMedicDto: UpdateMedicDto): Promise<{
        user: {
            id: string;
            name: string | null;
            role: {
                id: number;
                name: string;
            };
            email: string;
        } | null;
        specialty: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        lastName: string;
        identification: string;
        phone: string | null;
        active: boolean;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
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
        specialty: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        lastName: string;
        identification: string;
        phone: string | null;
        active: boolean;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    removeUser(id: string): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        lastName: string;
        identification: string;
        phone: string | null;
        active: boolean;
        userId: string | null;
        specialtyId: string;
        professionalTitle: string;
    }>;
    bulkCreate(medics: CreateMedicDto[]): Promise<any[]>;
}
