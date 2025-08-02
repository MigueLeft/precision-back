/*
  Warnings:

  - You are about to drop the column `registrationNumber` on the `Medic` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `Medic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[specialtyId]` on the table `Medic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `specialtyId` to the `Medic` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Medic_registrationNumber_key";

-- AlterTable
ALTER TABLE "Medic" DROP COLUMN "registrationNumber",
DROP COLUMN "specialty",
ADD COLUMN     "specialtyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialties_name_key" ON "specialties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_specialtyId_key" ON "Medic"("specialtyId");

-- AddForeignKey
ALTER TABLE "Medic" ADD CONSTRAINT "Medic_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
