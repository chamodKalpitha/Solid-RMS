-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OWNER', 'MANAGER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('SICK', 'CASUAL', 'NOPAY', 'SHORT', 'HALFDAY');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InventoryRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ManagerStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "br_no" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "address" TEXT,
    "url" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "status" "ManagerStatus" NOT NULL DEFAULT 'ACTIVE',
    "user_id" INTEGER NOT NULL,
    "outlet_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outlet" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "menu_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "outlet_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryIngredient" (
    "id" SERIAL NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "estimated_count" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishIngredient" (
    "id" SERIAL NOT NULL,
    "dish_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DishIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuDish" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "dish_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuDish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nic_no" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "emg_con_no" TEXT NOT NULL,
    "emg_con_name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "is_critical" BOOLEAN NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "outlet_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierIngredient" (
    "id" SERIAL NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierOrder" (
    "id" SERIAL NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "id" SERIAL NOT NULL,
    "type" "LeaveType" NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "no_of_date" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "LeaveStatus" NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryRequest" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "status" "InventoryRequestStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestIngredient" (
    "id" SERIAL NOT NULL,
    "inventory_request_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierOrderIngredient" (
    "id" SERIAL NOT NULL,
    "supplier_order_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierOrderIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_br_no_key" ON "Owner"("br_no");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_user_id_key" ON "Owner"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_contact_no_key" ON "Owner"("contact_no");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_user_id_key" ON "Manager"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_outlet_id_key" ON "Manager"("outlet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_employee_id_key" ON "Manager"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_outlet_id_key" ON "Inventory"("outlet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ownerId_name_key" ON "Ingredient"("ownerId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryIngredient_inventory_id_ingredient_id_key" ON "InventoryIngredient"("inventory_id", "ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "Dish_ownerId_name_key" ON "Dish"("ownerId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "DishIngredient_dish_id_ingredient_id_key" ON "DishIngredient"("dish_id", "ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_owner_id_name_key" ON "Menu"("owner_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MenuDish_menu_id_dish_id_key" ON "MenuDish"("menu_id", "dish_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nic_no_key" ON "Employee"("nic_no");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_contact_no_key" ON "Supplier"("contact_no");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierIngredient_supplier_id_ingredient_id_key" ON "SupplierIngredient"("supplier_id", "ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "RequestIngredient_inventory_request_id_ingredient_id_key" ON "RequestIngredient"("inventory_request_id", "ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierOrderIngredient_supplier_order_id_ingredient_id_key" ON "SupplierOrderIngredient"("supplier_order_id", "ingredient_id");

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryIngredient" ADD CONSTRAINT "InventoryIngredient_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryIngredient" ADD CONSTRAINT "InventoryIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishIngredient" ADD CONSTRAINT "DishIngredient_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishIngredient" ADD CONSTRAINT "DishIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDish" ADD CONSTRAINT "MenuDish_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDish" ADD CONSTRAINT "MenuDish_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierIngredient" ADD CONSTRAINT "SupplierIngredient_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierIngredient" ADD CONSTRAINT "SupplierIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierOrder" ADD CONSTRAINT "SupplierOrder_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierOrder" ADD CONSTRAINT "SupplierOrder_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryRequest" ADD CONSTRAINT "InventoryRequest_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryRequest" ADD CONSTRAINT "InventoryRequest_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestIngredient" ADD CONSTRAINT "RequestIngredient_inventory_request_id_fkey" FOREIGN KEY ("inventory_request_id") REFERENCES "InventoryRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestIngredient" ADD CONSTRAINT "RequestIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierOrderIngredient" ADD CONSTRAINT "SupplierOrderIngredient_supplier_order_id_fkey" FOREIGN KEY ("supplier_order_id") REFERENCES "SupplierOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierOrderIngredient" ADD CONSTRAINT "SupplierOrderIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
