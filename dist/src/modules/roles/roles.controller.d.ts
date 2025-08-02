import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
            id: string;
            name: string | null;
            email: string;
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
    assignPermissions(id: number, assignPermissionsDto: AssignPermissionsDto): Promise<{
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
    removePermissions(id: number, assignPermissionsDto: AssignPermissionsDto): Promise<{
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
    getRolePermissions(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
    }[]>;
    bulkCreate(roles: CreateRoleDto[]): Promise<any[]>;
}
