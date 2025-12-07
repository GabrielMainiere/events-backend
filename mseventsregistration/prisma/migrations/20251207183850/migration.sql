/*
  Warnings:

  - You are about to drop the column `registeredEventId` on the `EventsRegistration` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `EventsRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."EventsRegistration" DROP CONSTRAINT "EventsRegistration_registeredEventId_fkey";

-- AlterTable
ALTER TABLE "EventsRegistration" DROP COLUMN "registeredEventId",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EventsRegistration" ADD CONSTRAINT "EventsRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
