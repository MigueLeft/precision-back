/*
  Warnings:

  - You are about to drop the column `approvedAt` on the `Reschedule` table. All the data in the column will be lost.
  - You are about to drop the column `approvedBy` on the `Reschedule` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedAt` on the `Reschedule` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedBy` on the `Reschedule` table. All the data in the column will be lost.
  - You are about to drop the column `rejectionReason` on the `Reschedule` table. All the data in the column will be lost.
  - You are about to drop the column `requestedById` on the `Reschedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_registeredByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Reschedule" DROP CONSTRAINT "Reschedule_approvedBy_fkey";

-- DropForeignKey
ALTER TABLE "Reschedule" DROP CONSTRAINT "Reschedule_rejectedBy_fkey";

-- DropForeignKey
ALTER TABLE "Reschedule" DROP CONSTRAINT "Reschedule_requestedById_fkey";

-- AlterTable
ALTER TABLE "Reschedule" DROP COLUMN "approvedAt",
DROP COLUMN "approvedBy",
DROP COLUMN "rejectedAt",
DROP COLUMN "rejectedBy",
DROP COLUMN "rejectionReason",
DROP COLUMN "requestedById";

-- DropEnum
DROP TYPE "PermissionName";
