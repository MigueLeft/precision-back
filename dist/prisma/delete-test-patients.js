"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const PATIENT_IDS = [
    'cmmdw98r40000u7vsn5wgttbk',
    'cmmdw9j7n0001u7vsp3h9ozdy',
    'cmmdw9siz0002u7vsrycwf29e',
    'cmmdwa1y00003u7vsywpkp7i4',
    'cmmdwabah0004u7vsyzzm5qtx',
    'cmmnxjs9y0000u71kvhtei5sz',
];
async function deletePatient(patientId) {
    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
        console.log(`  Patient ${patientId} not found, skipping.`);
        return;
    }
    console.log(`  Processing: ${patient.firstName} ${patient.lastName} (${patientId})`);
    const appointments = await prisma.appointment.findMany({
        where: { patientId },
        select: { id: true },
    });
    const appointmentIds = appointments.map((a) => a.id);
    if (appointmentIds.length > 0) {
        await prisma.contactAttempt.deleteMany({
            where: { newAppointmentId: { in: appointmentIds } },
        });
        await prisma.consultation.deleteMany({
            where: { appointmentId: { in: appointmentIds } },
        });
        await prisma.reschedule.deleteMany({
            where: { appointmentId: { in: appointmentIds } },
        });
        await prisma.patientFollowUp.deleteMany({
            where: { originAppointmentId: { in: appointmentIds } },
        });
        await prisma.patientFollowUp.deleteMany({
            where: { resultingAppointmentId: { in: appointmentIds } },
        });
    }
    await prisma.patientFollowUp.deleteMany({ where: { patientId } });
    await prisma.appointment.deleteMany({ where: { patientId } });
    await prisma.rescueDirectory.deleteMany({ where: { patientId } });
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
    const examJoins = await prisma.patientPhysicalExamination.findMany({
        where: { patientId },
        select: { physicalExaminationId: true },
    });
    await prisma.patientPhysicalExamination.deleteMany({ where: { patientId } });
    for (const join of examJoins) {
        const remaining = await prisma.patientPhysicalExamination.count({
            where: { physicalExaminationId: join.physicalExaminationId },
        });
        if (remaining === 0) {
            await prisma.physicalExamination
                .delete({ where: { id: join.physicalExaminationId } })
                .catch(() => { });
        }
    }
    await prisma.patientAntecedent.deleteMany({ where: { patientId } });
    await prisma.patientSymptom.deleteMany({ where: { patientId } });
    await prisma.treatment.deleteMany({ where: { patientId } });
    await prisma.medicalStudy.deleteMany({ where: { patientId } });
    await prisma.examResult.deleteMany({ where: { patientId } });
    await prisma.patientDiagnostic.deleteMany({ where: { patientId } });
    await prisma.patient.delete({ where: { id: patientId } });
    if (patient.userId) {
        await prisma.user
            .delete({ where: { id: patient.userId } })
            .catch(() => {
            console.log(`    Warning: could not delete user ${patient.userId} (may be referenced elsewhere)`);
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
//# sourceMappingURL=delete-test-patients.js.map