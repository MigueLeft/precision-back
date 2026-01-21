#!/usr/bin/env node

/**
 * IM1 Test Cleanup Script
 *
 * This script cleans up test data created by the IM1 questionnaire E2E test.
 * It reads the cleanup-data.json file created by the test and removes all
 * associated data from the database.
 *
 * Usage:
 *   npm run test:e2e:cleanup
 *   or
 *   npx ts-node test/cleanup-im1-test.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

interface CleanupData {
  patientId: string;
  patientQuestionnaireId: string;
  questionnaireId: string;
  timestamp: string;
}

async function cleanupIM1TestData() {
  const prisma = new PrismaClient();

  try {
    // Read cleanup data
    const cleanupFilePath = path.join(__dirname, 'cleanup-data.json');

    if (!fs.existsSync(cleanupFilePath)) {
      console.log(
        '❌ No cleanup data found. File does not exist:',
        cleanupFilePath,
      );
      return;
    }

    const cleanupDataRaw = fs.readFileSync(cleanupFilePath, 'utf8');
    const cleanupData: CleanupData = JSON.parse(cleanupDataRaw);

    console.log('🧹 Starting IM1 test data cleanup...');
    console.log(`📊 Patient ID: ${cleanupData.patientId}`);
    console.log(
      `📋 Questionnaire Session ID: ${cleanupData.patientQuestionnaireId}`,
    );
    console.log(`⏰ Test timestamp: ${cleanupData.timestamp}`);

    // Step 1: Delete patient diagnostics
    console.log('🔬 Deleting patient diagnostics...');
    const deletedDiagnostics = await prisma.patientDiagnostic.deleteMany({
      where: { patientId: cleanupData.patientId },
    });
    console.log(`   ✅ Deleted ${deletedDiagnostics.count} diagnostics`);

    // Step 2: Delete answers
    console.log('📝 Deleting questionnaire answers...');
    const deletedAnswers = await prisma.answer.deleteMany({
      where: { patientQuestionnaireId: cleanupData.patientQuestionnaireId },
    });
    console.log(`   ✅ Deleted ${deletedAnswers.count} answers`);

    // Step 3: Delete patient questionnaire session
    console.log('📋 Deleting questionnaire session...');
    await prisma.patientQuestionnaire.deleteMany({
      where: { id: cleanupData.patientQuestionnaireId },
    });
    console.log('   ✅ Deleted questionnaire session');

    // Step 4: Delete patient physical examinations
    console.log('⚖️ Deleting physical examinations...');
    const patientPhysicalExams =
      await prisma.patientPhysicalExamination.findMany({
        where: { patientId: cleanupData.patientId },
      });

    for (const exam of patientPhysicalExams) {
      await prisma.patientPhysicalExamination.delete({
        where: { id: exam.id },
      });
      await prisma.physicalExamination.delete({
        where: { id: exam.physicalExaminationId },
      });
    }
    console.log(
      `   ✅ Deleted ${patientPhysicalExams.length} physical examinations`,
    );

    // Step 5: Delete patient antecedents
    console.log('🏥 Deleting patient antecedents...');
    const deletedAntecedents = await prisma.patientAntecedent.deleteMany({
      where: { patientId: cleanupData.patientId },
    });
    console.log(`   ✅ Deleted ${deletedAntecedents.count} antecedents`);

    // Step 6: Delete patient
    console.log('👤 Deleting patient...');
    await prisma.patient.delete({
      where: { id: cleanupData.patientId },
    });
    console.log('   ✅ Deleted patient');

    // Step 7: Remove cleanup data file
    fs.unlinkSync(cleanupFilePath);
    console.log('📝 Deleted cleanup data file');

    console.log('🎉 IM1 test data cleanup completed successfully!');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run cleanup if this file is executed directly
if (require.main === module) {
  cleanupIM1TestData()
    .then(() => {
      console.log('✅ Cleanup script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Cleanup script failed:', error);
      process.exit(1);
    });
}

export { cleanupIM1TestData };
