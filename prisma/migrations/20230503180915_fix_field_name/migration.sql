/*
  Warnings:

  - You are about to drop the column `enery_level` on the `pets` table. All the data in the column will be lost.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "enery_level",
ADD COLUMN     "energy_level" "EnergyLevel" NOT NULL;
