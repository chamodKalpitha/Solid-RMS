-- DropForeignKey
ALTER TABLE "SupplierOrder" DROP CONSTRAINT "SupplierOrder_supplier_id_fkey";

-- AddForeignKey
ALTER TABLE "SupplierOrder" ADD CONSTRAINT "SupplierOrder_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
