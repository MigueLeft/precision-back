import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

// ==========================================
// PERMISSIONS DATA
// ==========================================

export const permissionsData = [
  // User Management
  { name: 'USER_CREATE', description: 'Crear usuarios' },
  { name: 'USER_READ', description: 'Leer usuarios' },
  { name: 'USER_UPDATE', description: 'Actualizar usuarios' },
  { name: 'USER_DELETE', description: 'Eliminar usuarios' },

  // Patient Management
  { name: 'PATIENT_CREATE', description: 'Crear pacientes' },
  { name: 'PATIENT_READ', description: 'Leer pacientes' },
  { name: 'PATIENT_UPDATE', description: 'Actualizar pacientes' },
  { name: 'PATIENT_DELETE', description: 'Eliminar pacientes' },

  // Medic Management
  { name: 'MEDIC_CREATE', description: 'Crear médicos' },
  { name: 'MEDIC_READ', description: 'Leer médicos' },
  { name: 'MEDIC_UPDATE', description: 'Actualizar médicos' },
  { name: 'MEDIC_DELETE', description: 'Eliminar médicos' },

  // Appointment Management
  { name: 'APPOINTMENT_CREATE', description: 'Crear citas' },
  { name: 'APPOINTMENT_READ', description: 'Leer citas' },
  { name: 'APPOINTMENT_UPDATE', description: 'Actualizar citas' },
  { name: 'APPOINTMENT_DELETE', description: 'Eliminar citas' },

  // Questionnaire Management
  { name: 'QUESTIONNAIRE_CREATE', description: 'Crear cuestionarios' },
  { name: 'QUESTIONNAIRE_READ', description: 'Leer cuestionarios' },
  { name: 'QUESTIONNAIRE_UPDATE', description: 'Actualizar cuestionarios' },
  { name: 'QUESTIONNAIRE_DELETE', description: 'Eliminar cuestionarios' },
  { name: 'QUESTIONNAIRE_ANSWER', description: 'Responder cuestionarios' },

  // System Administration
  { name: 'ADMIN_ACCESS', description: 'Acceso administrativo' },
  { name: 'SYSTEM_SETTINGS', description: 'Configuración del sistema' },
];

// ==========================================
// PERMISSIONS SEEDER FUNCTION
// ==========================================

export async function seedPermissions(prisma: PrismaClient, logger: Logger) {
  logger.log('🔐 Seeding Permissions...');

  try {
    for (const permission of permissionsData) {
      await prisma.permission.upsert({
        where: { name: permission.name },
        update: {},
        create: permission,
      });
      logger.log(`✅ Permission created: ${permission.name}`);
    }

    logger.log(`🎉 Successfully created ${permissionsData.length} permissions`);
    return await prisma.permission.findMany();
  } catch (error) {
    logger.error('❌ Error seeding permissions:', error);
    throw error;
  }
}
