import { MedicsService } from './medics.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { QueryMedicDto } from './dto/query-medic.dto';
export declare class MedicsController {
    private readonly medicsService;
    constructor(medicsService: MedicsService);
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
    convertToUser(id: string): Promise<{
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
    removeUser(id: string): Promise<{
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
}
