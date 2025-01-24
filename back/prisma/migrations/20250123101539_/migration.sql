/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Picture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_vendorId_fkey`;

-- DropIndex
DROP INDEX `Picture_vendorId_key` ON `Picture`;

-- AlterTable
ALTER TABLE `Picture` DROP COLUMN `vendorId`,
    ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Picture_userId_key` ON `Picture`(`userId`);

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
