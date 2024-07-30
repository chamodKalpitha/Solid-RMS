/*
  Warnings:

  - Added the required column `quantity` to the `DishIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DishIngredient" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;
