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
    "end_at" TIMESTAMP(3),
    "location" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "event_type" "EventType" NOT NULL DEFAULT 'MEETING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_batch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "event_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_batch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_batch" ADD CONSTRAINT "tb_batch_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "tb_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
