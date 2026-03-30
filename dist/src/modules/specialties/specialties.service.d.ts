import { PrismaService } from '../../config/database/prisma.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { QuerySpecialtyDto } from './dto/query-specialty.dto';
export declare class SpecialtiesService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createSpecialtyDto: CreateSpecialtyDto): Promise<{
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findAll(queryDto: QuerySpecialtyDto): Promise<{
        data: {
            id: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        }[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    findOne(id: string): Promise<{
        medics: {
            id: string;
            lastName: string;
            email: string;
            name: string;
            professionalTitle: string;
        }[];
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    update(id: string, updateSpecialtyDto: UpdateSpecialtyDto): Promise<{
        medics: {
            id: string;
            lastName: string;
            name: string;
        }[];
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByName(name: string): Promise<({
        medics: {
            id: string;
            lastName: string;
            name: string;
        }[];
    } & {
        id: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }) | null>;
}
