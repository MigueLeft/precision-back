import { PrismaClient, Role } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

// ==========================================
// USERS DATA
// ==========================================

interface UserConfig {
  name: string;
  email: string;
  password: string;
  roleName: string;
}

export const usersData: UserConfig[] = [
  {
    name: 'Developer User',
    email: 'gallegosmiguel2000@gmail.com',
    password: 'developerMiguel123456',
    roleName: 'DEVELOPER',
  },
  {
    name: 'Super Admin',
    email: 'superadmin@precisioncare.com',
    password: 'SuperAdmin123!',
    roleName: 'SUPER_ADMIN',
  },
  {
    name: 'Admin User',
    email: 'admin@precisioncare.com',
    password: 'Admin123!',
    roleName: 'ADMIN',
  },
  {
    name: 'Dr. María González',
    email: 'maria.gonzalez@precisioncare.com',
    password: 'Medic123!',
    roleName: 'MEDIC',
  },
  {
    name: 'Dr. Carlos Rodríguez',
    email: 'carlos.rodriguez@precisioncare.com',
    password: 'Medic123!',
    roleName: 'MEDIC',
  },
];

// ==========================================
// USERS SEEDER FUNCTION
// ==========================================

export async function seedUsers(
  prisma: PrismaClient,
  logger: Logger,
  roles: Record<string, Role>,
) {
  logger.log('👤 Seeding Users...');

  try {
    const createdUsers: any[] = [];

    for (const userData of usersData) {
      const role = roles[userData.roleName];

      if (!role) {
        logger.warn(
          `⚠️  Role ${userData.roleName} not found for user ${userData.email}`,
        );
        continue;
      }

      const userId = randomUUID();
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          id: userId,
          name: userData.name,
          email: userData.email,
          role: {
            connect: { id: role.id },
          },
        },
      });

      // Create credential account with password (Better Auth schema)
      const existingAccount = await prisma.account.findFirst({
        where: { userId: user.id, providerId: 'credential' },
      });
      if (!existingAccount) {
        await prisma.account.create({
          data: {
            id: randomUUID(),
            accountId: user.id,
            providerId: 'credential',
            userId: user.id,
            password: userData.password,
          },
        });
      }

      createdUsers.push(user);
      logger.log(
        `✅ User created: ${userData.name} (${userData.email}) - Role: ${userData.roleName}`,
      );
    }

    logger.log(`🎉 Successfully created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    logger.error('❌ Error seeding users:', error);
    throw error;
  }
}
