/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_ownerId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
