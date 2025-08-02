-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionName" ADD VALUE 'APPOINTMENT_CREATE';
ALTER TYPE "PermissionName" ADD VALUE 'APPOINTMENT_READ';
ALTER TYPE "PermissionName" ADD VALUE 'APPOINTMENT_UPDATE';
ALTER TYPE "PermissionName" ADD VALUE 'APPOINTMENT_DELETE';

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "realizationDateTime" TIMESTAMP(3) NOT NULL,
    "anamnesis" TEXT,
    "indicatedTreatment" TEXT,
    "performedProcedures" TEXT,
    "issuedPrescriptions" TEXT,
    "patientInstructions" TEXT,
    "suggestedNextControl" TIMESTAMP(3),
    "additionalMedicalNotes" TEXT,
    "registeredByUserId" TEXT NOT NULL,
    "clinicalRegistrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_appointmentId_key" ON "Consultation"("appointmentId");

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_registeredByUserId_fkey" FOREIGN KEY ("registeredByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
