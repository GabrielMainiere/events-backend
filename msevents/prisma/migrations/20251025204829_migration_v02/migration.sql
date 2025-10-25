/*
  Warnings:

  - The values [PENDING,PUBLISHED] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventStatus_new" AS ENUM ('DRAFT', 'ARCHIVED', 'CONFIRMED', 'WAITING_PAYMENT', 'CANCELLED');
ALTER TABLE "public"."tb_event" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tb_event" ALTER COLUMN "status" TYPE "EventStatus_new" USING ("status"::text::"EventStatus_new");
ALTER TYPE "EventStatus" RENAME TO "EventStatus_old";
ALTER TYPE "EventStatus_new" RENAME TO "EventStatus";
DROP TYPE "public"."EventStatus_old";
ALTER TABLE "tb_event" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
