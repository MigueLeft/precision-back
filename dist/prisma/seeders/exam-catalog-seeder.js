"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedExamCatalog = seedExamCatalog;
const exam_catalog_seed_1 = require("./exam-catalog.seed");
const exam_catalog_part2_seed_1 = require("./exam-catalog-part2.seed");
async function seedExamCatalog(prisma) {
    console.log('🔬 Seeding exam catalog...');
    const allExams = [...exam_catalog_seed_1.examCatalogData, ...exam_catalog_part2_seed_1.examCatalogDataPart2];
    let created = 0;
    let skipped = 0;
    for (const exam of allExams) {
        try {
            const existing = await prisma.examCatalog.findUnique({
                where: {
                    category_examName: {
                        category: exam.category,
                        examName: exam.examName,
                    },
                },
            });
            if (existing) {
                skipped++;
                continue;
            }
            await prisma.examCatalog.create({
                data: exam,
            });
            created++;
        }
        catch (error) {
            console.error(`Error creating exam ${exam.examName}:`, error.message);
        }
    }
    console.log(`✅ Exam catalog seeded: ${created} created, ${skipped} skipped`);
    console.log(`📊 Total exams in catalog: ${created + skipped}`);
    const categories = await prisma.examCatalog.groupBy({
        by: ['category'],
        _count: {
            category: true,
        },
        orderBy: {
            category: 'asc',
        },
    });
    console.log('\n📋 Exams by category:');
    categories.forEach((cat) => {
        console.log(`   ${cat.category}: ${cat._count.category} exams`);
    });
}
//# sourceMappingURL=exam-catalog-seeder.js.map