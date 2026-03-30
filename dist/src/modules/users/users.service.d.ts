import { PrismaService } from '../../config/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emailVerified: boolean;
        image: string | null;
        roleId: number;
    }>;
    findAll(query: QueryUserDto): Promise<{
        data: ({
            role: {
                id: number;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            emailVerified: boolean;
            image: string | null;
            roleId: number;
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
        role: {
            id: number;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emailVerified: boolean;
        image: string | null;
        roleId: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emailVerified: boolean;
        image: string | null;
        roleId: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
