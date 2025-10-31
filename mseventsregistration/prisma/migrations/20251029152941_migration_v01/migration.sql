-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('CONFIRMED', 'WAITING_PAYMENT', 'CANCELED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'ARCHIVED', 'CONFIRMED', 'WAITING_PAYMENT', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MEETING', 'CONFERENCE', 'WORKSHOP', 'PARTY');

-- CreateTable
CREATE TABLE "tb_registered_event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "sale_start_at" TIMESTAMP(3),
    "sale_end_at" TIMESTAMP(3),
    "address_street" TEXT NOT NULL,
    "address_number" TEXT,
    "address_city" TEXT NOT NULL,
    "address_state" TEXT NOT NULL,
    "address_zipcode" TEXT NOT NULL,
    "address_country" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "event_type" "EventType" NOT NULL DEFAULT 'MEETING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_registered_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_events_registration" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "registered_event_id" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'WAITING_PAYMENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_events_registration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_events_registration" ADD CONSTRAINT "tb_events_registration_registered_event_id_fkey" FOREIGN KEY ("registered_event_id") REFERENCES "tb_registered_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
