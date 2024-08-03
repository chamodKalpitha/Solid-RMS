/*
  Warnings:

  - You are about to drop the column `value` on the `SupplierOrder` table. All the data in the column will be lost.
  - Added the required column `total_value` to the `SupplierOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "SupplierOrder" DROP COLUMN "value",
ADD COLUMN     "total_value" DOUBLE PRECISION NOT NULL;
