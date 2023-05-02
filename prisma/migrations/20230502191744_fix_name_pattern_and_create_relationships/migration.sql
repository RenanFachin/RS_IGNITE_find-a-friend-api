/*
  Warnings:

  - You are about to drop the column `password` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `resposibleName` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `eneryLevel` on the `pets` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resposible_name` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enery_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "password",
DROP COLUMN "postalCode",
DROP COLUMN "resposibleName",
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "resposible_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "eneryLevel",
ADD COLUMN     "enery_level" "EnergyLevel" NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
