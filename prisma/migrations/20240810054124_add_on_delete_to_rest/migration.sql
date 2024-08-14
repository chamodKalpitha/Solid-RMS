-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "InventoryIngredient" DROP CONSTRAINT "InventoryIngredient_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "InventoryRequest" DROP CONSTRAINT "InventoryRequest_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "LeaveRequest" DROP CONSTRAINT "LeaveRequest_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "LeaveRequest" DROP CONSTRAINT "LeaveRequest_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "MenuDish" DROP CONSTRAINT "MenuDish_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "Outlet" DROP CONSTRAINT "Outlet_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RequestIngredient" DROP CONSTRAINT "RequestIngredient_inventory_request_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "SupplierOrder" DROP CONSTRAINT "SupplierOrder_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "SupplierOrderIngredient" DROP CONSTRAINT "SupplierOrderIngredient_supplier_order_id_fkey";

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryIngredient" ADD CONSTRAINT "InventoryIngredient_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDish" ADD CONSTRAINT "MenuDish_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierOrder" ADD CONSTRAINT "SupplierOrder_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryRequest" ADD CONSTRAINT "InventoryRequest_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestIngredient" ADD CONSTRAINT "RequestIngredient_inventory_request_id_fkey" FOREIGN KEY ("inventory_request_id") REFERENCES "InventoryRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierOrderIngredient" ADD CONSTRAINT "SupplierOrderIngredient_supplier_order_id_fkey" FOREIGN KEY ("supplier_order_id") REFERENCES "SupplierOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
