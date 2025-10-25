/*
  Warnings:

  - You are about to drop the column `location` on the `tb_event` table. All the data in the column will be lost.
  - You are about to drop the `tb_batch` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address_city` to the `tb_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_country` to the `tb_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_state` to the `tb_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_street` to the `tb_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_zipcode` to the `tb_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `tb_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_start_at` to the `tb_event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."tb_batch" DROP CONSTRAINT "tb_batch_event_id_fkey";

-- AlterTable
ALTER TABLE "tb_event" DROP COLUMN "location",
ADD COLUMN     "address_city" TEXT NOT NULL,
ADD COLUMN     "address_country" TEXT NOT NULL,
ADD COLUMN     "address_number" TEXT,
ADD COLUMN     "address_state" TEXT NOT NULL,
ADD COLUMN     "address_street" TEXT NOT NULL,
ADD COLUMN     "address_zipcode" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "sale_end_at" TIMESTAMP(3),
ADD COLUMN     "sale_start_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."tb_batch";
