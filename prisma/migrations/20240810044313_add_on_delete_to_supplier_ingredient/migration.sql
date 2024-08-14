-- DropForeignKey
ALTER TABLE "SupplierIngredient" DROP CONSTRAINT "SupplierIngredient_supplier_id_fkey";

-- AddForeignKey
ALTER TABLE "SupplierIngredient" ADD CONSTRAINT "SupplierIngredient_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
