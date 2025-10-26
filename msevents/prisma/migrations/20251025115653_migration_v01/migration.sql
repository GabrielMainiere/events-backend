-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PENDING', 'ARCHIVED', 'PUBLISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MEETING', 'CONFERENCE', 'WORKSHOP', 'PARTY');

-- CreateTable
CREATE TABLE "tb_event" (
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
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "event_type" "EventType" NOT NULL DEFAULT 'MEETING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_event_pkey" PRIMARY KEY ("id")
);
