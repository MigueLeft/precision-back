import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { QuerySpecialtyDto } from './dto/query-specialty.dto';
export declare class SpecialtiesController {
    private readonly specialtiesService;
    constructor(specialtiesService: SpecialtiesService);
    create(createSpecialtyDto: CreateSpecialtyDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    }>;
    findAll(queryDto: QuerySpecialtyDto): Promise<{
        data: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
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
            name: string;
            email: string;
            lastName: string;
            professionalTitle: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    }>;
    update(id: string, updateSpecialtyDto: UpdateSpecialtyDto): Promise<{
        medics: {
            id: string;
            name: string;
            lastName: string;
        }[];
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
        medics: {
            id: string;
            name: string;
            lastName: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    }) | null>;
}
