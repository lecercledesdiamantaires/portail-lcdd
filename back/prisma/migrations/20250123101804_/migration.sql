/*
  Warnings:

  - You are about to drop the column `userId` on the `Picture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vendorId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_userId_fkey`;

-- DropIndex
DROP INDEX `Picture_userId_key` ON `Picture`;

-- AlterTable
ALTER TABLE `Picture` DROP COLUMN `userId`,
    ADD COLUMN `vendorId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Picture_vendorId_key` ON `Picture`(`vendorId`);

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
