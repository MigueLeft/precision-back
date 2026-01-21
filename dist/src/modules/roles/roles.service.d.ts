import { PrismaService } from '../../config/database/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
export declare class RolesService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<{
        permissions: {
            id: number;
            name: string;
            description: string | null;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    findAll(query: QueryRoleDto): Promise<{
        data: ({
            _count: {
                users: number;
            };
            permissions: {
                id: number;
                name: string;
                description: string | null;
            }[];
        } & {
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            isSystem: boolean;
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
    findOne(id: number): Promise<{
        _count: {
            users: number;
        };
        users: {
            email: string;
            id: string;
            name: string | null;
        }[];
        permissions: {
            id: number;
            name: string;
            description: string | null;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    findByName(name: string): Promise<({
        permissions: {
            id: number;
            name: string;
            description: string | null;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }) | null>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<{
        permissions: {
            id: number;
            name: string;
            description: string | null;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    assignPermissions(roleId: number, assignPermissionsDto: AssignPermissionsDto): Promise<{
        permissions: {
            id: number;
            name: string;
            description: string | null;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    removePermissions(roleId: number, permissionIds: number[]): Promise<{
        permissions: {
            id: number;
            name: string;
            description: string | null;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    getRolePermissions(roleId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
    }[]>;
    bulkCreate(roles: CreateRoleDto[]): Promise<any[]>;
}
