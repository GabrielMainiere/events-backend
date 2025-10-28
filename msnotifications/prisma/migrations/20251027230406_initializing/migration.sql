/*
  Warnings:

  - The `notification_type` column on the `notification_templates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `notification_type` to the `notification_log` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `notification_type` on the `user_preferences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ACCOUNT', 'PAYMENTS', 'MARKETING', 'EVENT');

-- AlterTable
ALTER TABLE "notification_log" ADD COLUMN     "notification_type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "notification_templates" DROP COLUMN "notification_type",
ADD COLUMN     "notification_type" "NotificationType" NOT NULL DEFAULT 'ACCOUNT';

-- AlterTable
ALTER TABLE "user_preferences" DROP COLUMN "notification_type",
ADD COLUMN     "notification_type" "NotificationType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_user_id_notification_type_channel_key" ON "user_preferences"("user_id", "notification_type", "channel");
