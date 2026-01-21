import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
import {
  seedPermissions,
  seedRoles,
  seedUsers,
  seedAntecedents,
  seedSymptoms,
  seedIM1Questionnaire,
} from './seeders';
import { seedExamCatalog } from './seeders/exam-catalog-seeder';

const prisma = new PrismaClient();
const logger = new Logger('DatabaseSeeder');

async function main() {
  logger.log('🚀 Starting database seeding...');

  try {
    // 1. Seed Permissions
    const allPermissions = await seedPermissions(prisma, logger);

    // 2. Seed Roles (depends on permissions)
    const roles = await seedRoles(prisma, logger, allPermissions);

    // 3. Seed Users (depends on roles)
    await seedUsers(prisma, logger, roles);

    // 4. Seed Questionnaires
    await seedIM1Questionnaire(prisma, logger);

    // 5. Seed Antecedents
    await seedAntecedents(prisma, logger);

    // 6. Seed Symptoms
    await seedSymptoms(prisma, logger);

    // 7. Seed Exam Catalog
    await seedExamCatalog(prisma);

    logger.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    logger.error('❌ Error during database seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    logger.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
