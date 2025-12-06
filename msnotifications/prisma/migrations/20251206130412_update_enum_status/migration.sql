/*
  Warnings:

  - The values [PENDENTE,PROCESSANDO,ENVIADO,FALHA] on the enum `NotificationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationStatus_new" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED');
ALTER TABLE "public"."notification_log" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "notification_log" ALTER COLUMN "status" TYPE "NotificationStatus_new" USING ("status"::text::"NotificationStatus_new");
ALTER TYPE "NotificationStatus" RENAME TO "NotificationStatus_old";
ALTER TYPE "NotificationStatus_new" RENAME TO "NotificationStatus";
DROP TYPE "public"."NotificationStatus_old";
ALTER TABLE "notification_log" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "notification_log" ALTER COLUMN "status" SET DEFAULT 'PENDING';
