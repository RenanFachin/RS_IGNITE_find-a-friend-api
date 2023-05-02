/*
  Warnings:

  - You are about to drop the column `resposible_name` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `responsable_name` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "resposible_name",
ADD COLUMN     "responsable_name" TEXT NOT NULL;
