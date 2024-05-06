/*
  Warnings:

  - You are about to alter the column `quantity` on the `excel_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,6)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "excel_items" ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
