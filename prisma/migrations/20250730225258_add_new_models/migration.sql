-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('PHONE', 'EMAIL', 'SMS', 'WHATSAPP', 'IN_PERSON');

-- CreateEnum
CREATE TYPE "ContactResult" AS ENUM ('SUCCESSFUL', 'NO_ANSWER', 'BUSY', 'INVALID_NUMBER', 'PATIENT_DECLINED', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_CANCELLED', 'RESCHEDULE_REQUESTED', 'INDEFINITE_POSTPONE', 'PATIENT_UNAVAILABLE');

-- CreateEnum
CREATE TYPE "FollowUpType" AS ENUM ('POST_CONSULTATION', 'APPOINTMENT_REMINDER', 'TREATMENT_FOLLOWUP', 'PREVENTIVE_CARE', 'ADMINISTRATIVE');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED_WITH_APPOINTMENT', 'COMPLETED_NO_APPOINTMENT', 'FAILED', 'CANCELLED', 'TRANSFERRED_TO_RESCUE', 'POSTPONED_INDEFINITELY', 'CONVERTED_TO_APPOINTMENT');

-- CreateEnum
CREATE TYPE "FollowUpPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "RescueReason" AS ENUM ('MAX_ATTEMPTS_REACHED', 'PATIENT_UNRESPONSIVE', 'INDEFINITE_POSTPONE', 'ADMINISTRATIVE', 'PATIENT_REQUEST');

-- CreateEnum
CREATE TYPE "RescueStatus" AS ENUM ('ACTIVE', 'REACTIVATED', 'ARCHIVED', 'TRANSFERRED');

-- CreateEnum
CREATE TYPE "RescueCategory" AS ENUM ('STANDARD', 'HIGH_VALUE', 'CHRONIC_CONDITION', 'POST_SURGERY', 'ELDERLY', 'PEDIATRIC');

-- CreateEnum
CREATE TYPE "RescuePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "followUpPriority" "FollowUpPriority" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "originatedFromFollowUpId" TEXT,
ADD COLUMN     "requiresFollowUp" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ContactAttempt" (
    "id" TEXT NOT NULL,
    "followUpId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "contactMethod" "ContactMethod" NOT NULL DEFAULT 'PHONE',
    "contactDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactResult" "ContactResult" NOT NULL,
    "contactDuration" INTEGER,
    "contactNotes" TEXT,
    "patientResponse" TEXT,
    "appointmentScheduled" BOOLEAN NOT NULL DEFAULT false,
    "newAppointmentId" TEXT,
    "rescheduleRequested" BOOLEAN NOT NULL DEFAULT false,
    "rescheduleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientFollowUp" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "originAppointmentId" TEXT,
    "resultingAppointmentId" TEXT,
    "followUpType" "FollowUpType" NOT NULL DEFAULT 'POST_CONSULTATION',
    "status" "FollowUpStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "FollowUpPriority" NOT NULL DEFAULT 'NORMAL',
    "scheduledContactDate" TIMESTAMP(3) NOT NULL,
    "actualContactDate" TIMESTAMP(3),
    "nextContactDate" TIMESTAMP(3),
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "notes" TEXT,
    "assignedTo" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PatientFollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RescueDirectory" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "originalFollowUpId" TEXT NOT NULL,
    "rescueReason" "RescueReason" NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDate" TIMESTAMP(3),
    "status" "RescueStatus" NOT NULL DEFAULT 'ACTIVE',
    "rescueCategory" "RescueCategory" NOT NULL DEFAULT 'STANDARD',
    "priority" "RescuePriority" NOT NULL DEFAULT 'LOW',
    "lastContactDate" TIMESTAMP(3),
    "lastAttemptDate" TIMESTAMP(3),
    "totalPreviousAttempts" INTEGER NOT NULL DEFAULT 0,
    "rescueNotes" TEXT,
    "reactivatedAt" TIMESTAMP(3),
    "reactivationNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RescueDirectory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactAttempt_followUpId_idx" ON "ContactAttempt"("followUpId");

-- CreateIndex
CREATE INDEX "ContactAttempt_contactDateTime_idx" ON "ContactAttempt"("contactDateTime");

-- CreateIndex
CREATE INDEX "ContactAttempt_contactResult_idx" ON "ContactAttempt"("contactResult");

-- CreateIndex
CREATE INDEX "PatientFollowUp_patientId_idx" ON "PatientFollowUp"("patientId");

-- CreateIndex
CREATE INDEX "PatientFollowUp_status_idx" ON "PatientFollowUp"("status");

-- CreateIndex
CREATE INDEX "PatientFollowUp_scheduledContactDate_idx" ON "PatientFollowUp"("scheduledContactDate");

-- CreateIndex
CREATE INDEX "PatientFollowUp_assignedTo_idx" ON "PatientFollowUp"("assignedTo");

-- CreateIndex
CREATE INDEX "PatientFollowUp_originAppointmentId_idx" ON "PatientFollowUp"("originAppointmentId");

-- CreateIndex
CREATE INDEX "PatientFollowUp_resultingAppointmentId_idx" ON "PatientFollowUp"("resultingAppointmentId");

-- CreateIndex
CREATE INDEX "RescueDirectory_patientId_idx" ON "RescueDirectory"("patientId");

-- CreateIndex
CREATE INDEX "RescueDirectory_status_idx" ON "RescueDirectory"("status");

-- CreateIndex
CREATE INDEX "RescueDirectory_entryDate_idx" ON "RescueDirectory"("entryDate");

-- CreateIndex
CREATE INDEX "RescueDirectory_rescueCategory_idx" ON "RescueDirectory"("rescueCategory");

-- CreateIndex
CREATE UNIQUE INDEX "RescueDirectory_patientId_originalFollowUpId_key" ON "RescueDirectory"("patientId", "originalFollowUpId");

-- AddForeignKey
ALTER TABLE "ContactAttempt" ADD CONSTRAINT "ContactAttempt_followUpId_fkey" FOREIGN KEY ("followUpId") REFERENCES "PatientFollowUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactAttempt" ADD CONSTRAINT "ContactAttempt_newAppointmentId_fkey" FOREIGN KEY ("newAppointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactAttempt" ADD CONSTRAINT "ContactAttempt_rescheduleId_fkey" FOREIGN KEY ("rescheduleId") REFERENCES "Reschedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientFollowUp" ADD CONSTRAINT "PatientFollowUp_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientFollowUp" ADD CONSTRAINT "PatientFollowUp_originAppointmentId_fkey" FOREIGN KEY ("originAppointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientFollowUp" ADD CONSTRAINT "PatientFollowUp_resultingAppointmentId_fkey" FOREIGN KEY ("resultingAppointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RescueDirectory" ADD CONSTRAINT "RescueDirectory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RescueDirectory" ADD CONSTRAINT "RescueDirectory_originalFollowUpId_fkey" FOREIGN KEY ("originalFollowUpId") REFERENCES "PatientFollowUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
