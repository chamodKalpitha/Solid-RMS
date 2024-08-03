/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,name]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId,name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id,name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dish_ownerId_name_key" ON "Dish"("ownerId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ownerId_name_key" ON "Ingredient"("ownerId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_owner_id_name_key" ON "Menu"("owner_id", "name");
