-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: hotelmanagementdb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street_number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Ελλάδα','Αθήνα','Πατησίων','95'),(2,'Ελλάδα','Αθήνα','Σταδίου','10'),(3,'Ελλάδα','Νέα Φιλαδέλφεια','Δεκελείας','145'),(4,'Ελλάδα','Θεσσαλονίκη','Εγνατία','120'),(5,'Ελλάδα','Πάτρα','Κορίνθου','15'),(6,'Ελλάδα','Λάρισα','Ηρώων Πολυτεχνείου','8'),(7,'Ελλάδα','Ηράκλειο','25ης Αυγούστου','33'),(8,'Κύπρος','Λευκωσία','Μακαρίου','50'),(9,'Ιταλία','Ρώμη','Via Nazionale','85'),(10,'Γαλλία','Παρίσι','Rue de Rivoli','112'),(11,'string','string','string','string'),(12,'string','string','string','string'),(13,'Κύπρος','Λευκωσία','Λήδρας','22'),(15,'ΕΛΛΑΔΑ','ΑΘΗΝΑ','ΑΛΕΞΑΝΔΡΑΣ','120'),(16,'ΕΛΛΑΔΑ','ΑΘΗΝΑ','ΑΛΕΞΑΝΔΡΑΣ','120');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `fk_customer_address` (`address_id`),
  CONSTRAINT `fk_customer_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Γιάννης','Παπαδόπουλος','6941111111','giannis@email.com',3),(2,'Γιάννης','Παπαδόπουλος','6941111111','giannis1@email.com',1),(3,'Μαρία','Νικολάου','6941111112','maria@email.com',2),(4,'Νίκος','Γεωργίου','6941111113','nikos@email.com',3),(5,'Ελένη','Κωνσταντίνου','6941111114','eleni@email.com',4),(6,'Κώστας','Δημητρίου','6941111115','kostas@email.com',5),(7,'Αναστασία','Μανώλη','6941111116','anastasia@email.com',6),(8,'Πέτρος','Σταύρου','6941111117','petros@email.com',7),(9,'Χρήστος','Αλεξίου','6941111118','christos@email.com',8),(10,'Βασιλική','Καραγιάννη','6941111119','vasiliki@email.com',9),(11,'Σοφία','Αντωνίου','6941111120','sofia@email.com',10);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` enum('MANAGER','RECEPTIONIST','HOUSEKEEPING','CHEF','WAITER','MAINTENANCE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `fk_employee_address` (`address_id`),
  CONSTRAINT `fk_employee_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (12,'George','Papadopoulos','MANAGER',2800.00,'2020-01-15','6941000001',1),(13,'Maria','Nikolaou','RECEPTIONIST',1450.00,'2022-03-10','6941000002',2),(14,'Nikos','Georgiou','HOUSEKEEPING',1200.00,'2023-05-18','6941000003',3),(15,'Eleni','Kostopoulou','CHEF',2200.00,'2021-09-01','6941000004',4),(16,'Dimitris','Ioannou','WAITER',1250.00,'2024-02-12','6941000005',5),(17,'Sofia','Alexiou','RECEPTIONIST',1500.00,'2022-11-08','6941000006',6),(18,'Christos','Vlachos','MAINTENANCE',1700.00,'2021-06-20','6941000007',7),(19,'Anna','Karagianni','HOUSEKEEPING',1180.00,'2023-01-25','6941000008',8),(20,'Petros','Theodorou','CHEF',2400.00,'2020-10-05','6941000009',9),(21,'Katerina','Mitsou','WAITER',1300.00,'2024-04-15','6941000010',10);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  PRIMARY KEY (`hotel_id`),
  KEY `fk_hotel_address` (`address_id`),
  CONSTRAINT `fk_hotel_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES (1,'Grand Palace Hotel','2101111111',5,2);
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  UNIQUE KEY `reservation_id` (`reservation_id`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `payment_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('CASH','CREDIT_CARD','DEBIT_CARD','PAYPAL','BANK_TRANSFER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_status` enum('PENDING','PAID','REFUNDED','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `uk_payment_reservation` (`reservation_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`) ON DELETE CASCADE,
  CONSTRAINT `chk_payment_amount` CHECK ((`amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (2,44,'2026-08-15',250.00,'CREDIT_CARD','PAID');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `room_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `guests` int DEFAULT '1',
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `reservation_date` date DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `customer_id` (`customer_id`),
  KEY `room_id` (`room_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (39,2,77,13,'2026-08-03','2026-08-06',1,'PENDING',NULL),(40,3,78,14,'2026-08-05','2026-08-09',2,'CONFIRMED',NULL),(41,4,79,15,'2026-08-07','2026-08-11',3,'COMPLETED',NULL),(42,5,80,16,'2026-08-10','2026-08-14',2,'CONFIRMED',NULL),(43,6,81,17,'2026-08-12','2026-08-17',1,'CANCELLED',NULL),(44,7,82,18,'2026-08-15','2026-08-20',4,'PENDING',NULL),(45,8,76,19,'2026-09-01','2026-09-05',2,'CONFIRMED',NULL),(46,9,77,20,'2026-09-06','2026-09-10',2,'COMPLETED',NULL),(47,10,78,21,'2026-09-12','2026-09-16',3,'CONFIRMED',NULL),(48,1,76,12,'2026-08-01','2026-08-05',2,'CONFIRMED',NULL),(49,2,77,13,'2026-08-03','2026-08-06',1,'PENDING',NULL),(50,3,78,14,'2026-08-05','2026-08-09',2,'CONFIRMED',NULL),(51,4,79,15,'2026-08-07','2026-08-11',3,'COMPLETED',NULL),(52,5,80,16,'2026-08-10','2026-08-14',2,'CONFIRMED',NULL),(53,6,81,17,'2026-08-12','2026-08-17',1,'CANCELLED',NULL),(54,7,82,18,'2026-08-15','2026-08-20',4,'PENDING',NULL),(55,8,76,19,'2026-09-01','2026-09-05',2,'CONFIRMED',NULL),(56,9,77,20,'2026-09-06','2026-09-10',2,'COMPLETED',NULL),(57,10,78,21,'2026-09-12','2026-09-16',3,'CONFIRMED',NULL),(58,1,76,12,'2026-08-10','2026-08-12',2,'CONFIRMED',NULL),(59,11,82,15,'2026-08-14','2026-08-15',1,'PENDING',NULL),(60,8,78,12,'2026-08-15','2026-08-16',1,'PENDING',NULL),(61,8,81,14,'2026-08-08','2026-08-09',1,'PENDING',NULL),(62,5,78,15,'2026-08-16','2026-08-17',2,'PENDING',NULL);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_service`
--

DROP TABLE IF EXISTS `reservation_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_service` (
  `reservation_id` int NOT NULL,
  `service_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`,`service_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `reservation_service_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`) ON DELETE CASCADE,
  CONSTRAINT `reservation_service_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_service`
--

LOCK TABLES `reservation_service` WRITE;
/*!40000 ALTER TABLE `reservation_service` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `hotel_id` int NOT NULL,
  `room_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_type` enum('SINGLE','DOUBLE','TWIN','TRIPLE','SUITE','DELUXE','FAMILY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `floor` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('AVAILABLE','RESERVED','OCCUPIED','MAINTENANCE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'AVAILABLE',
  PRIMARY KEY (`room_id`),
  KEY `hotel_id` (`hotel_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (76,1,'102','DELUXE',2,120.00,'OCCUPIED'),(77,1,'102','DOUBLE',1,120.00,'AVAILABLE'),(78,1,'103','SUITE',1,250.00,'OCCUPIED'),(79,1,'201','SINGLE',2,85.00,'AVAILABLE'),(80,1,'202','DOUBLE',2,130.00,'RESERVED'),(81,1,'203','DELUXE',2,180.00,'AVAILABLE'),(82,1,'301','FAMILY',3,200.00,'AVAILABLE');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;
-- ------------------------------------------------------
-- Table structure for table `users`
-- ------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('ADMIN','USER') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- No default user data is inserted intentionally.
-- Users should register through the application.
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-22  8:46:08
