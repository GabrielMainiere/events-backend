/*
  Warnings:

  - Added the required column `activationCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activationCode" TEXT NOT NULL,
ALTER COLUMN "birthDatetime" SET DATA TYPE DATE;
