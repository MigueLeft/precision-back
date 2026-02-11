"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const seeders_1 = require("./seeders");
const exam_catalog_seeder_1 = require("./seeders/exam-catalog-seeder");
const prisma = new client_1.PrismaClient();
const logger = new common_1.Logger('DatabaseSeeder');
async function main() {
    logger.log('🚀 Starting database seeding...');
    try {
        const allPermissions = await (0, seeders_1.seedPermissions)(prisma, logger);
        const roles = await (0, seeders_1.seedRoles)(prisma, logger, allPermissions);
        await (0, seeders_1.seedIM1Questionnaire)(prisma, logger);
        await (0, seeders_1.seedAntecedents)(prisma, logger);
        await (0, seeders_1.seedSymptoms)(prisma, logger);
        await (0, exam_catalog_seeder_1.seedExamCatalog)(prisma);
        logger.log('🎉 Database seeding completed successfully!');
    }
    catch (error) {
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
//# sourceMappingURL=seed.js.map