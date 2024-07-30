/*
  Warnings:

  - A unique constraint covering the columns `[nic_no]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_nic_no_key" ON "Employee"("nic_no");
