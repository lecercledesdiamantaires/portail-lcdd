/*
  Warnings:

  - Made the column `userId` on table `Vendor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Vendor` DROP FOREIGN KEY `Vendor_userId_fkey`;

-- AlterTable
ALTER TABLE `Vendor` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
