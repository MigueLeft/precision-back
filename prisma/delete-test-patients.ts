import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PATIENT_IDS = [
  'cmmdw98r40000u7vsn5wgttbk',
  'cmmdw9j7n0001u7vsp3h9ozdy',
  'cmmdw9siz0002u7vsrycwf29e',
  'cmmdwa1y00003u7vsywpkp7i4',
  'cmmdwabah0004u7vsyzzm5qtx',
  'cmmnxjs9y0000u71kvhtei5sz',
];

async function deletePatient(patientId: string) {
  const patient = await prisma.patient.findUnique({ where: { id: patientId } });
  if (!patient) {
    console.log(`  Patient ${patientId} not found, skipping.`);
    return;
  }
  console.log(`  Processing: ${patient.firstName} ${patient.lastName} (${patientId})`);

  // 1. Get appointment IDs for this patient
  const appointments = await prisma.appointment.findMany({
    where: { patientId },
    select: { id: true },
  });
  const appointmentIds = appointments.map((a) => a.id);

  if (appointmentIds.length > 0) {
    // 2. Null out contact attempts that reference these appointments as "new appointment"
    //    (ContactAttempt cascades from PatientFollowUp, so remaining ones are handled below)
    await prisma.contactAttempt.deleteMany({
      where: { newAppointmentId: { in: appointmentIds } },
    });

    // 3. Delete consultations
    await prisma.consultation.deleteMany({
      where: { appointmentId: { in: appointmentIds } },
    });

    // 4. Delete reschedules
    await prisma.reschedule.deleteMany({
      where: { appointmentId: { in: appointmentIds } },
    });

    // 5. Unlink follow-ups from these appointments (set FK to null or delete)
    await prisma.patientFollowUp.deleteMany({
      where: { originAppointmentId: { in: appointmentIds } },
    });
    await prisma.patientFollowUp.deleteMany({
      where: { resultingAppointmentId: { in: appointmentIds } },
    });
  }

  // 6. Delete remaining follow-ups linked to patient directly
  await prisma.patientFollowUp.deleteMany({ where: { patientId } });

  // 7. Delete appointments
  await prisma.appointment.deleteMany({ where: { patientId } });

  // 8. Delete rescue directory entries
  await prisma.rescueDirectory.deleteMany({ where: { patientId } });

  // 9. Delete questionnaire answers (via PatientQuestionnaire)
  const questionnaires = await prisma.patientQuestionnaire.findMany({
    where: { patientId },
    select: { id: true },
  });
  const questionnaireIds = questionnaires.map((q) => q.id);
  if (questionnaireIds.length > 0) {
    await prisma.answer.deleteMany({
      where: { patientQuestionnaireId: { in: questionnaireIds } },
    });
    await prisma.patientQuestionnaireHistory.deleteMany({
      where: { patientQuestionnaireId: { in: questionnaireIds } },
    });
    await prisma.patientDiagnostic.deleteMany({
      where: { patientQuestionnaireId: { in: questionnaireIds } },
    });
  }
  await prisma.patientQuestionnaireHistory.deleteMany({ where: { patientId } });
  await prisma.patientQuestionnaire.deleteMany({ where: { patientId } });

  // 10. Delete physical exam join records (PhysicalExamination itself cascades on PatientPhysicalExamination)
  const examJoins = await prisma.patientPhysicalExamination.findMany({
    where: { patientId },
    select: { physicalExaminationId: true },
  });
  await prisma.patientPhysicalExamination.deleteMany({ where: { patientId } });
  // Delete orphan PhysicalExamination records
  for (const join of examJoins) {
    const remaining = await prisma.patientPhysicalExamination.count({
      where: { physicalExaminationId: join.physicalExaminationId },
    });
    if (remaining === 0) {
      await prisma.physicalExamination
        .delete({ where: { id: join.physicalExaminationId } })
        .catch(() => {}); // Ignore if already deleted
    }
  }

  // 11. Delete other patient-related records
  await prisma.patientAntecedent.deleteMany({ where: { patientId } });
  await prisma.patientSymptom.deleteMany({ where: { patientId } });
  await prisma.treatment.deleteMany({ where: { patientId } });
  await prisma.medicalStudy.deleteMany({ where: { patientId } });
  await prisma.examResult.deleteMany({ where: { patientId } });
  await prisma.patientDiagnostic.deleteMany({ where: { patientId } });

  // 12. Delete the patient record
  await prisma.patient.delete({ where: { id: patientId } });

  // 13. Optionally delete the associated user account
  if (patient.userId) {
    await prisma.user
      .delete({ where: { id: patient.userId } })
      .catch(() => {
        console.log(
          `    Warning: could not delete user ${patient.userId} (may be referenced elsewhere)`,
        );
      });
  }

  console.log(`  ✓ Deleted: ${patient.firstName} ${patient.lastName}`);
}

async function main() {
  console.log(`Starting deletion of ${PATIENT_IDS.length} patients...`);

  for (const patientId of PATIENT_IDS) {
    await deletePatient(patientId);
  }

  console.log('\nDone.');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
