-- DropForeignKey
ALTER TABLE `Vendor` DROP FOREIGN KEY `Vendor_userId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `phoneNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vendor` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
