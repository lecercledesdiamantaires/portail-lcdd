/*
  Warnings:

  - A unique constraint covering the columns `[iban]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Vendor_iban_key` ON `Vendor`(`iban`);
