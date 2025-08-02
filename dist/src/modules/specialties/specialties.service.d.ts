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
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    }>;
    findAll(queryDto: QuerySpecialtyDto): Promise<{
        items: ({
            medic: {
                id: string;
                name: string;
                lastName: string;
            } | null;
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
        })[];
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
        medic: {
            id: string;
            name: string;
            email: string;
            lastName: string;
            professionalTitle: string;
        } | null;
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    }>;
    update(id: string, updateSpecialtyDto: UpdateSpecialtyDto): Promise<{
        medic: {
            id: string;
            name: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByName(name: string): Promise<({
        medic: {
            id: string;
            name: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    }) | null>;
}
