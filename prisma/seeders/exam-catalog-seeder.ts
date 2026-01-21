import { PrismaClient } from '@prisma/client';
import { examCatalogData } from './exam-catalog.seed';
import { examCatalogDataPart2 } from './exam-catalog-part2.seed';

export async function seedExamCatalog(prisma: PrismaClient) {
  console.log('🔬 Seeding exam catalog...');

  // Combine both parts
  const allExams = [...examCatalogData, ...examCatalogDataPart2];

  let created = 0;
  let skipped = 0;

  for (const exam of allExams) {
    try {
      // Check if exam already exists
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

      // Create exam
      await prisma.examCatalog.create({
        data: exam,
      });

      created++;
    } catch (error) {
      console.error(`Error creating exam ${exam.examName}:`, error.message);
    }
  }

  console.log(`✅ Exam catalog seeded: ${created} created, ${skipped} skipped`);
  console.log(`📊 Total exams in catalog: ${created + skipped}`);

  // Show categories summary
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
