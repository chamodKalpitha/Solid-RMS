/*
  Warnings:

  - You are about to drop the column `quantity` on the `SupplierOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SupplierOrder" DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "SupplierOrderIngredient" (
    "id" SERIAL NOT NULL,
    "supplier_order_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierOrderIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SupplierOrderIngredient_supplier_order_id_ingredient_id_key" ON "SupplierOrderIngredient"("supplier_order_id", "ingredient_id");

-- AddForeignKey
ALTER TABLE "SupplierOrderIngredient" ADD CONSTRAINT "SupplierOrderIngredient_supplier_order_id_fkey" FOREIGN KEY ("supplier_order_id") REFERENCES "SupplierOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierOrderIngredient" ADD CONSTRAINT "SupplierOrderIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
