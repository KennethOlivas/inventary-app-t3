/*
  Warnings:

  - Added the required column `address` to the `Shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Shipping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipping" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;