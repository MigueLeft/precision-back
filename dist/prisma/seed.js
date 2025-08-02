"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const prisma = new client_1.PrismaClient();
const logger = new common_1.Logger('DatabaseSeeder');
async function main() {
    logger.log('Starting database seeding...');
    const permissions = [
        { name: 'USER_CREATE', description: 'Crear usuarios' },
        { name: 'USER_READ', description: 'Leer usuarios' },
        { name: 'USER_UPDATE', description: 'Actualizar usuarios' },
        { name: 'USER_DELETE', description: 'Eliminar usuarios' },
        { name: 'PATIENT_CREATE', description: 'Crear pacientes' },
        { name: 'PATIENT_READ', description: 'Leer pacientes' },
        { name: 'PATIENT_UPDATE', description: 'Actualizar pacientes' },
        { name: 'PATIENT_DELETE', description: 'Eliminar pacientes' },
        { name: 'MEDIC_CREATE', description: 'Crear médicos' },
        { name: 'MEDIC_READ', description: 'Leer médicos' },
        { name: 'MEDIC_UPDATE', description: 'Actualizar médicos' },
        { name: 'MEDIC_DELETE', description: 'Eliminar médicos' },
        { name: 'APPOINTMENT_CREATE', description: 'Crear citas' },
        { name: 'APPOINTMENT_READ', description: 'Leer citas' },
        { name: 'APPOINTMENT_UPDATE', description: 'Actualizar citas' },
        { name: 'APPOINTMENT_DELETE', description: 'Eliminar citas' },
        { name: 'RESCHEDULE_CREATE', description: 'Crear reprogramaciones' },
        { name: 'RESCHEDULE_READ', description: 'Leer reprogramaciones' },
        { name: 'RESCHEDULE_UPDATE', description: 'Actualizar reprogramaciones' },
        { name: 'RESCHEDULE_DELETE', description: 'Eliminar reprogramaciones' },
        { name: 'RESCHEDULE_APPROVE', description: 'Aprobar reprogramaciones' },
        { name: 'RESCHEDULE_REJECT', description: 'Rechazar reprogramaciones' },
        { name: 'CONSULTATION_CREATE', description: 'Crear consultas' },
        { name: 'CONSULTATION_READ', description: 'Leer consultas' },
        { name: 'CONSULTATION_UPDATE', description: 'Actualizar consultas' },
        { name: 'CONSULTATION_DELETE', description: 'Eliminar consultas' },
        { name: 'ROLE_CREATE', description: 'Crear roles' },
        { name: 'ROLE_READ', description: 'Leer roles' },
        { name: 'ROLE_UPDATE', description: 'Actualizar roles' },
        { name: 'ROLE_DELETE', description: 'Eliminar roles' },
        { name: 'PERMISSION_CREATE', description: 'Crear permisos' },
        { name: 'PERMISSION_READ', description: 'Leer permisos' },
        { name: 'PERMISSION_UPDATE', description: 'Actualizar permisos' },
        { name: 'PERMISSION_DELETE', description: 'Eliminar permisos' },
        { name: 'ADMIN_ACCESS', description: 'Acceso administrativo' },
        { name: 'SYSTEM_SETTINGS', description: 'Configuración del sistema' },
        { name: 'USER_ROLE_ASSIGN', description: 'Asignar roles a usuarios' },
    ];
    logger.log('Creating permissions...');
    for (const permission of permissions) {
        try {
            await prisma.permission.upsert({
                where: { name: permission.name },
                update: {},
                create: permission,
            });
            logger.log(`Permission created: ${permission.name}`);
        }
        catch (error) {
            logger.error(`Error creating permission ${permission.name}:`, error);
        }
    }
    const allPermissions = await prisma.permission.findMany();
    const superAdminPermissions = allPermissions.map((p) => p.id);
    const adminPermissions = allPermissions
        .filter((p) => p.name.includes('USER_') ||
        p.name.includes('PATIENT_') ||
        p.name.includes('MEDIC_') ||
        p.name.includes('APPOINTMENT_') ||
        p.name.includes('CONSULTATION_') ||
        p.name.includes('RESCHEDULE_') ||
        p.name === 'ADMIN_ACCESS')
        .map((p) => p.id);
    const medicPermissions = allPermissions
        .filter((p) => p.name.includes('PATIENT_READ') ||
        p.name.includes('APPOINTMENT_') ||
        p.name.includes('CONSULTATION_') ||
        p.name.includes('RESCHEDULE_'))
        .map((p) => p.id);
    const patientPermissions = allPermissions
        .filter((p) => p.name === 'APPOINTMENT_READ' ||
        p.name === 'RESCHEDULE_CREATE' ||
        p.name === 'RESCHEDULE_READ')
        .map((p) => p.id);
    const roles = [
        {
            name: 'SUPER_ADMIN',
            description: 'Super administrador del sistema',
            isSystem: true,
            permissionIds: superAdminPermissions,
        },
        {
            name: 'ADMIN',
            description: 'Administrador del sistema',
            isSystem: true,
            permissionIds: adminPermissions,
        },
        {
            name: 'MEDIC',
            description: 'Médico del sistema',
            isSystem: true,
            permissionIds: medicPermissions,
        },
        {
            name: 'PATIENT',
            description: 'Paciente del sistema',
            isSystem: true,
            permissionIds: patientPermissions,
        },
        {
            name: 'DEVELOPER',
            description: 'Desarrollador del sistema',
            isSystem: true,
            permissionIds: superAdminPermissions,
        },
    ];
    logger.log('Creating roles...');
    for (const role of roles) {
        try {
            const { permissionIds, ...roleData } = role;
            await prisma.role.upsert({
                where: { name: role.name },
                update: {
                    permissions: {
                        set: permissionIds.map((id) => ({ id })),
                    },
                },
                create: {
                    ...roleData,
                    permissions: {
                        connect: permissionIds.map((id) => ({ id })),
                    },
                },
            });
            logger.log(`Role created: ${role.name}`);
        }
        catch (error) {
            logger.error(`Error creating role ${role.name}:`, error);
        }
    }
    const developerRole = await prisma.role.findUnique({
        where: { name: 'DEVELOPER' },
    });
    if (!developerRole) {
        throw new Error('Developer role not found');
    }
    const developerUser = {
        name: 'Developer User',
        email: 'gallegosmiguel2000@gmail.com',
        password: 'developerMiguel123456',
        roleId: developerRole.id,
    };
    logger.log('Creating developer user...');
    try {
        await prisma.user.upsert({
            where: { email: developerUser.email },
            update: {},
            create: {
                name: developerUser.name,
                email: developerUser.email,
                password: developerUser.password,
                role: {
                    connect: { id: developerUser.roleId },
                },
            },
        });
        logger.log(`Developer user created: ${developerUser.name}`);
    }
    catch (error) {
        logger.error(`Error creating developer user:`, error);
    }
    logger.log('Database seeding completed successfully!');
}
main()
    .catch((e) => {
    logger.error('Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map