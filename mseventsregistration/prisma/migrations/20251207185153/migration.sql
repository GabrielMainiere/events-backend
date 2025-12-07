/*
  Warnings:

  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
DROP COLUMN "phone",
ADD COLUMN     "birthDatetime" TIMESTAMP(3),
ADD COLUMN     "phoneNumber" TEXT;
