import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findAll(query: QueryPermissionDto): Promise<{
        data: ({
            roles: {
                id: number;
                name: string;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
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
        roles: {
            id: number;
            name: string;
            description: string | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    findByName(name: string): Promise<({
        roles: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }) | null>;
    update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<{
        roles: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    bulkCreate(permissions: CreatePermissionDto[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
