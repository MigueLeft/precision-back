import { PrismaClient, Permission } from '@prisma/client';
import { Logger } from '@nestjs/common';

// ==========================================
// ROLES CONFIGURATION
// ==========================================

interface RoleConfig {
  name: string;
  description: string;
  isSystem: boolean;
  permissionFilter: (permissions: Permission[]) => Permission[];
}

export const rolesConfig: RoleConfig[] = [
  {
    name: 'SUPER_ADMIN',
    description: 'Super administrador del sistema',
    isSystem: true,
    permissionFilter: (permissions) => permissions, // All permissions
  },
  {
    name: 'ADMIN',
    description: 'Administrador del sistema',
    isSystem: true,
    permissionFilter: (permissions) =>
      permissions.filter((p) => !p.name.includes('SYSTEM_')),
  },
  {
    name: 'MEDIC',
    description: 'Médico del sistema',
    isSystem: true,
    permissionFilter: (permissions) =>
      permissions.filter(
        (p) =>
          p.name.includes('PATIENT_READ') ||
          p.name.includes('APPOINTMENT_') ||
          p.name.includes('QUESTIONNAIRE_'),
      ),
  },
  {
    name: 'PATIENT',
    description: 'Paciente del sistema',
    isSystem: true,
    permissionFilter: (permissions) =>
      permissions.filter(
        (p) =>
          p.name === 'QUESTIONNAIRE_ANSWER' || p.name === 'APPOINTMENT_READ',
      ),
  },
  {
    name: 'DEVELOPER',
    description: 'Desarrollador del sistema',
    isSystem: true,
    permissionFilter: (permissions) => permissions, // All permissions
  },
];

// ==========================================
// ROLES SEEDER FUNCTION
// ==========================================

export async function seedRoles(
  prisma: PrismaClient,
  logger: Logger,
  allPermissions: Permission[],
) {
  logger.log('👥 Seeding Roles...');

  try {
    const createdRoles: any = {};

    for (const roleConfig of rolesConfig) {
      const permissionIds = roleConfig
        .permissionFilter(allPermissions)
        .map((p) => p.id);

      const role = await prisma.role.upsert({
        where: { name: roleConfig.name },
        update: {
          permissions: {
            set: permissionIds.map((id) => ({ id })),
          },
        },
        create: {
          name: roleConfig.name,
          description: roleConfig.description,
          isSystem: roleConfig.isSystem,
          permissions: {
            connect: permissionIds.map((id) => ({ id })),
          },
        },
      });

      createdRoles[roleConfig.name] = role;
      logger.log(
        `✅ Role created: ${roleConfig.name} with ${permissionIds.length} permissions`,
      );
    }

    logger.log(`🎉 Successfully created ${rolesConfig.length} roles`);
    return createdRoles;
  } catch (error) {
    logger.error('❌ Error seeding roles:', error);
    throw error;
  }
}
