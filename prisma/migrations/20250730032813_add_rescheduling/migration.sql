-- CreateTable
CREATE TABLE "Reschedule" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "previousDateTime" TIMESTAMP(3) NOT NULL,
    "newDateTime" TIMESTAMP(3) NOT NULL,
    "rescheduleReason" TEXT NOT NULL,
    "rescheduleStatus" TEXT NOT NULL DEFAULT 'pending',
    "requestedBy" TEXT NOT NULL,
    "requestedById" TEXT,
    "notes" TEXT,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "rejectedBy" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Reschedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reschedule_appointmentId_idx" ON "Reschedule"("appointmentId");

-- CreateIndex
CREATE INDEX "Reschedule_rescheduleStatus_idx" ON "Reschedule"("rescheduleStatus");

-- CreateIndex
CREATE INDEX "Reschedule_createdAt_idx" ON "Reschedule"("createdAt");

-- CreateIndex
CREATE INDEX "Reschedule_newDateTime_idx" ON "Reschedule"("newDateTime");

-- AddForeignKey
ALTER TABLE "Reschedule" ADD CONSTRAINT "Reschedule_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reschedule" ADD CONSTRAINT "Reschedule_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reschedule" ADD CONSTRAINT "Reschedule_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reschedule" ADD CONSTRAINT "Reschedule_rejectedBy_fkey" FOREIGN KEY ("rejectedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
