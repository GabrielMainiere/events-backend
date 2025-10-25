/*
  Warnings:

  - Added the required column `capacity` to the `tb_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_event" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT false;
