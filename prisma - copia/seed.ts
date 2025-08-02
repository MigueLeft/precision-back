import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();
const logger = new Logger('DatabaseSeeder');

async function main() {
  logger.log('Starting database seeding...');

  // Crear permisos predefinidos
  const permissions = [
    // User permissions
    { name: 'USER_CREATE', description: 'Crear usuarios' },
    { name: 'USER_READ', description: 'Leer usuarios' },
    { name: 'USER_UPDATE', description: 'Actualizar usuarios' },
    { name: 'USER_DELETE', description: 'Eliminar usuarios' },

    // Patient permissions
    { name: 'PATIENT_CREATE', description: 'Crear pacientes' },
    { name: 'PATIENT_READ', description: 'Leer pacientes' },
    { name: 'PATIENT_UPDATE', description: 'Actualizar pacientes' },
    { name: 'PATIENT_DELETE', description: 'Eliminar pacientes' },

    // Doctor permissions
    { name: 'DOCTOR_CREATE', description: 'Crear médicos' },
    { name: 'DOCTOR_READ', description: 'Leer médicos' },
    { name: 'DOCTOR_UPDATE', description: 'Actualizar médicos' },
    { name: 'DOCTOR_DELETE', description: 'Eliminar médicos' },

    // Admin permissions
    { name: 'ADMIN_ACCESS', description: 'Acceso administrativo' },
    { name: 'SETTINGS_MANAGE', description: 'Gestionar configuraciones' },

    // Appointment permissions
    { name: 'APPOINTMENT_CREATE', description: 'Crear citas' },
    { name: 'APPOINTMENT_READ', description: 'Leer citas' },
    { name: 'APPOINTMENT_UPDATE', description: 'Actualizar citas' },
    { name: 'APPOINTMENT_DELETE', description: 'Eliminar citas' },
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
    } catch (error) {
      logger.error(`Error creating permission ${permission.name}:`, error);
    }
  }

  // Obtener todos los permisos creados
  const allPermissions = await prisma.permission.findMany();
  const adminPermissions = allPermissions.map((p) => p.id);
  const doctorPermissions = allPermissions
    .filter((p) => p.name.includes('DOCTOR') || p.name.includes('PATIENT'))
    .map((p) => p.id);
  const patientPermissions = allPermissions
    .filter((p) => p.name === 'PATIENT_READ')
    .map((p) => p.id);

  // Crear roles del sistema
  const roles = [
    {
      name: 'SUPER_ADMIN',
      description: 'Super administrador del sistema',
      isSystem: true,
      permissionIds: adminPermissions,
    },
    {
      name: 'ADMIN',
      description: 'Administrador',
      isSystem: true,
      permissionIds: adminPermissions.filter((id) => {
        const permission = allPermissions.find((p) => p.id === id);
        return !permission?.name.includes('SETTINGS_MANAGE');
      }),
    },
    {
      name: 'DOCTOR',
      description: 'Médico del sistema',
      isSystem: true,
      permissionIds: doctorPermissions,
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
      permissionIds: allPermissions.map((p) => p.id),
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
    } catch (error) {
      logger.error(`Error creating role ${role.name}:`, error);
    }
  }

  // Crear un usuario de desarrollador

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
        password: developerUser.password, // Asegúrate de que la contraseña esté encriptada si es necesario
        role: {
          connect: { id: developerUser.roleId },
        },
      },
    });
    logger.log(`Developer user created: ${developerUser.name}`);
  } catch (error) {
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
