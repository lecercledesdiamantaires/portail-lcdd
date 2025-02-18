-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: portail_lcdd
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Payout`
--

DROP TABLE IF EXISTS `Payout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendorId` int NOT NULL,
  `amount` double NOT NULL,
  `status` enum('PENDING','PAID') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Payout_vendorId_fkey` (`vendorId`),
  CONSTRAINT `Payout_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payout`
--

LOCK TABLES `Payout` WRITE;
/*!40000 ALTER TABLE `Payout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Picture`
--

DROP TABLE IF EXISTS `Picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `vendorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Picture_vendorId_key` (`vendorId`),
  CONSTRAINT `Picture_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Picture`
--

LOCK TABLES `Picture` WRITE;
/*!40000 ALTER TABLE `Picture` DISABLE KEYS */;
INSERT INTO `Picture` VALUES (1,'assets/pictures/1739531018888-Capture dâeÌcran 2025-02-14 aÌ 11.11.14.png','2025-02-14 11:03:38.996','2025-02-14 11:03:38.996',1),(2,'assets/pictures/1739531352170-icons8-mail-50.png','2025-02-14 11:09:12.311','2025-02-14 11:09:12.311',4),(3,'assets/pictures/1739531525945-Thomas_S.JPG','2025-02-14 11:10:57.024','2025-02-14 11:12:05.954',5);
/*!40000 ALTER TABLE `Picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','VENDEUR') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VENDEUR',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `resetPasswordExpires` datetime(3) DEFAULT NULL,
  `resetPasswordToken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_phoneNumber_key` (`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Didier','Cloute','lecercledesdiamantaires@gmail.com','3311111111','$2b$10$jHP/A9um.czqhywUfNCDtOAfu3K1byr9Z1nUjIbek6PSGy9ISOnfO','ADMIN','2025-02-14 11:03:38.984','2025-02-14 11:03:38.984',NULL,NULL),(4,'Anthony','Lopes','anthonylopes037@gmail.com','33782414441','$2b$10$9N3Gd4obZslXhDyt2CdG4OK1XzRn97mDs2Iw/RtG0u7McdtH/6K9W','ADMIN','2025-02-14 11:09:12.289','2025-02-14 11:09:28.628',NULL,NULL),(5,'thomas','sauvage','thomas.sauvage2003@yahoo.fr','33646916292','$2b$10$s49bLtYJDjW.uvVzEKeI8uqwmeKpf65E6c.LJy71FA3kRwMMpOoMu','VENDEUR','2025-02-14 11:10:57.013','2025-02-17 08:05:35.049','2025-02-17 08:15:01.020','b9f65a4bcac44d9e29aab24e01c4122ab09fc9acf5601294516d70796438b8b8');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendor`
--

DROP TABLE IF EXISTS `Vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vendor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promoCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` int DEFAULT NULL,
  `iban` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalWithdraw` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Vendor_promoCode_key` (`promoCode`),
  UNIQUE KEY `Vendor_iban_key` (`iban`),
  UNIQUE KEY `Vendor_userId_key` (`userId`),
  CONSTRAINT `Vendor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendor`
--

LOCK TABLES `Vendor` WRITE;
/*!40000 ALTER TABLE `Vendor` DISABLE KEYS */;
INSERT INTO `Vendor` VALUES (1,'PROMO-FGQT5V2A','2025-02-14 11:03:38.993','2025-02-14 11:03:38.993',1,'',0),(4,'PROMO-R5GXFWOS','2025-02-14 11:09:12.306','2025-02-14 11:09:12.306',4,NULL,0),(5,'PROMO-CI4N744W','2025-02-14 11:10:57.021','2025-02-14 11:10:57.021',5,NULL,0);
/*!40000 ALTER TABLE `Vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Whitelist`
--

DROP TABLE IF EXISTS `Whitelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Whitelist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Whitelist_email_key` (`email`),
  UNIQUE KEY `Whitelist_userId_key` (`userId`),
  CONSTRAINT `Whitelist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Whitelist`
--

LOCK TABLES `Whitelist` WRITE;
/*!40000 ALTER TABLE `Whitelist` DISABLE KEYS */;
INSERT INTO `Whitelist` VALUES (1,'lecercledesdiamantaires@gmail.com',1),(4,'anthonylopes037@gmail.com',4),(5,'thomas.sauvage2003@yahoo.fr',5);
/*!40000 ALTER TABLE `Whitelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('1617c739-4699-4c3e-bf16-e243ff1fd39f','60be6a2cc9779a2c72b3af18e08d7b606f7896996d583458593d6e38164124bc','2025-02-14 11:00:39.624','20241223103220_init',NULL,NULL,'2025-02-14 11:00:39.605',1),('1ea1aa9e-5bf5-431d-9a32-a8a1064e2c2d','d180c293cf437685213356a4a875f892408893b877569f817b04367544a71dc0','2025-02-14 11:00:40.045','20250102125704_',NULL,NULL,'2025-02-14 11:00:39.963',1),('27397f17-0ecb-4dd4-b33b-cb80cf55378e','0e2ca0909182cb18c690ef60704d1b086046ae2874f03e2a4ff29a2877da4fa4','2025-02-14 11:00:42.893','20250214110042_fix_vendor_iban',NULL,NULL,'2025-02-14 11:00:42.853',1),('27508f55-a863-4661-bb06-ff667ec3bc4b','f0f3b736996fe2f384c86b1c20b2727e5c4221056b1f2f5221ff8298e8f884fd','2025-02-14 11:00:40.572','20250123101804_',NULL,NULL,'2025-02-14 11:00:40.488',1),('2bc1af41-a5a3-4cce-8bae-8f79201dfbc8','7f7f511c3e5cb647a56f52513142dd548a41e63f83a5a5e9809213914b669294','2025-02-14 11:00:40.406','20250123091209_add_picture_vendor',NULL,NULL,'2025-02-14 11:00:40.353',1),('3fe2991d-6703-4620-9106-52d82a28d3ae','c88f19a5879b1a164e81eec9123c19c1818d0f92a666269f625d76da497df46f','2025-02-14 11:00:40.329','20250120084755_add_reset_password_fields',NULL,NULL,'2025-02-14 11:00:40.292',1),('631fcb66-5e51-42f8-9a71-48cd9ff7b3ec','3e50abd25ad0ceca9bde0a461f5869b8954afdf998a4570954ac200f876706d4','2025-02-14 11:00:40.352','20250121135513_',NULL,NULL,'2025-02-14 11:00:40.331',1),('652f393b-b570-43cd-90a9-cd278aaeab23','ad02ee37bc6d13da20128a7f3fda6de8415dd7d085aaecd5ecb4b49b40476ec3','2025-02-14 11:00:40.612','20250123104142_',NULL,NULL,'2025-02-14 11:00:40.573',1),('8008c3f6-60eb-408a-9ae0-393b3af3344d','5ea2430e24964a47033dff788d2cbba828a16b96736a90b112a3ec8090f90a09','2025-02-14 11:00:40.148','20250102125858_',NULL,NULL,'2025-02-14 11:00:40.047',1),('80314112-d7aa-496b-b23f-0b2ab6622dd0','fba82135ca8c4dfa031259c81ece0f534aa76d3eb33aee265a5d2ae1e6ca1bcf','2025-02-14 11:00:39.825','20241223105837_edit_schema',NULL,NULL,'2025-02-14 11:00:39.626',1),('94d0a3c3-2502-4ad4-9011-56b09c7c952d','096691b25f573e3ddac88b249c2ab450970d866342dcb70717930f3c87a3e7a4','2025-02-14 11:00:40.486','20250123101539_',NULL,NULL,'2025-02-14 11:00:40.407',1),('b23a46ce-3e66-43f0-91e0-b6dda93468c6','94808656e2526a384dfb91b3abd3929f8b27ce905128dae22b65b6e948987d65','2025-02-14 11:00:39.921','20250102105145_',NULL,NULL,'2025-02-14 11:00:39.882',1),('bbc4c6d1-1d82-4a99-bfc3-29c8ec5847e9','fae46390db0ff1d482ae3135452d1361213ceae802264e2e4e2999f2b7ed0400','2025-02-14 11:00:40.291','20250106092503_delete_sale',NULL,NULL,'2025-02-14 11:00:40.271',1),('fa08d4bf-4ab3-4e70-8d07-d95baacabfbd','3d86d076be392e854cb18de36582fc1211d4e563e0abac3fc2e4ff3a8ea66ea5','2025-02-14 11:00:40.270','20250102134202_update_phone_number',NULL,NULL,'2025-02-14 11:00:40.150',1),('fd074876-a42c-4657-b420-816469ae793a','0743b3843b5721f6513a2410ccae0e3eda32b8e62bf3ba23029caa9bfdba6c69','2025-02-14 11:00:40.649','20250123104515_',NULL,NULL,'2025-02-14 11:00:40.613',1),('fd199e29-219e-4daf-a1e2-1d4a2fef4229','1d41cd4b9e6c58926028e6bbf0ec61b69ec783985c93baee54dff53a8445d1ac','2025-02-14 11:00:39.961','20250102125049_',NULL,NULL,'2025-02-14 11:00:39.924',1),('fd432c11-f526-4725-ad9e-3fa4d199f1cd','774e435af909678430f61ad3117bc905fb796f2792bbfc8ecf809e8d749c5c71','2025-02-14 11:00:39.881','20241226082612_add_whitelist',NULL,NULL,'2025-02-14 11:00:39.827',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18 10:23:06
