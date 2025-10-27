/*
  Warnings:

  - You are about to drop the column `address_city` on the `tb_event` table. All the data in the column will be lost.
  - You are about to drop the column `address_country` on the `tb_event` table. All the data in the column will be lost.
  - You are about to drop the column `address_number` on the `tb_event` table. All the data in the column will be lost.
  - You are about to drop the column `address_state` on the `tb_event` table. All the data in the column will be lost.
  - You are about to drop the column `address_street` on the `tb_event` table. All the data in the column will be lost.
  - You are about to drop the column `address_zipcode` on the `tb_event` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `tb_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_event" DROP COLUMN "address_city",
DROP COLUMN "address_country",
DROP COLUMN "address_number",
DROP COLUMN "address_state",
DROP COLUMN "address_street",
DROP COLUMN "address_zipcode",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tb_address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "tb_address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_event" ADD CONSTRAINT "tb_event_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "tb_address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
