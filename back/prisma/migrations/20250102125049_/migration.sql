/*
  Warnings:

  - You are about to drop the column `city` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Vendor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Vendor` DROP COLUMN `city`,
    DROP COLUMN `country`,
    DROP COLUMN `streetName`,
    DROP COLUMN `streetNumber`,
    DROP COLUMN `zipCode`;
