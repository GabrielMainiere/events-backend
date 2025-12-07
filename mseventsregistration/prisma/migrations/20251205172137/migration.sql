/*
  Warnings:

  - You are about to drop the `tb_events_registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_registered_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tb_events_registration" DROP CONSTRAINT "tb_events_registration_registered_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_events_registration" DROP CONSTRAINT "tb_events_registration_user_id_fkey";

-- DropTable
DROP TABLE "public"."tb_events_registration";

-- DropTable
DROP TABLE "public"."tb_registered_event";

-- DropTable
DROP TABLE "public"."tb_user";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "saleStartAt" TIMESTAMP(3),
    "saleEndAt" TIMESTAMP(3),
    "addressStreet" TEXT NOT NULL,
    "addressNumber" TEXT,
    "addressCity" TEXT NOT NULL,
    "addressState" TEXT NOT NULL,
    "addressZipcode" TEXT NOT NULL,
    "addressCountry" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "eventType" "EventType" NOT NULL DEFAULT 'MEETING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsRegistration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registeredEventId" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'WAITING_PAYMENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventsRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventsRegistration" ADD CONSTRAINT "EventsRegistration_registeredEventId_fkey" FOREIGN KEY ("registeredEventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsRegistration" ADD CONSTRAINT "EventsRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
