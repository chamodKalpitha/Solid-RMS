/*
  Warnings:

  - Added the required column `ownerId` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
