"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersData = void 0;
exports.seedUsers = seedUsers;
exports.usersData = [
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
async function seedUsers(prisma, logger, roles) {
    logger.log('👤 Seeding Users...');
    try {
        const createdUsers = [];
        for (const userData of exports.usersData) {
            const role = roles[userData.roleName];
            if (!role) {
                logger.warn(`⚠️  Role ${userData.roleName} not found for user ${userData.email}`);
                continue;
            }
            const user = await prisma.user.upsert({
                where: { email: userData.email },
                update: {},
                create: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    role: {
                        connect: { id: role.id },
                    },
                },
            });
            createdUsers.push(user);
            logger.log(`✅ User created: ${userData.name} (${userData.email}) - Role: ${userData.roleName}`);
        }
        logger.log(`🎉 Successfully created ${createdUsers.length} users`);
        return createdUsers;
    }
    catch (error) {
        logger.error('❌ Error seeding users:', error);
        throw error;
    }
}
//# sourceMappingURL=users-seeder.js.map