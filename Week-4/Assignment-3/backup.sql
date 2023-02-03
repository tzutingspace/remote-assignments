-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: assignment
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Current Database: `assignment`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `assignment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `assignment`;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `articleID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`articleID`),
  KEY `userID` (`userID`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,1,'title 1-1','conten 1'),(2,1,'title 1-2','conten 2'),(3,1,'title 1-3','conten 3'),(4,1,'title 1-4','conten 4'),(5,1,'title 1-5','conten 5'),(6,2,'title 2-1','conten 1'),(7,2,'title 2-2','conten 2'),(8,2,'title 2-3','conten 3'),(9,2,'title 2-4','conten 4'),(10,2,'title 2-5','conten 5'),(11,3,'title 3-1','conten 1'),(12,2,'title 3-2','conten 2'),(13,2,'title 3-3','conten 3'),(14,2,'title 3-4','conten 4'),(15,2,'title 3-5','conten 5'),(16,4,'title 4-1','conten 1'),(17,2,'title 4-2','conten 2'),(18,2,'title 4-3','conten 3'),(19,2,'title 4-4','conten 4'),(20,2,'title 4-5','conten 5'),(21,5,'title 5-1','conten 1'),(22,2,'title 5-2','conten 2'),(23,2,'title 5-3','conten 3'),(24,2,'title 5-4','conten 4'),(25,2,'title 5-5','conten 5'),(26,6,'title 6-1','conten 1'),(27,2,'title 6-2','conten 2'),(28,2,'title 6-3','conten 3'),(29,2,'title 6-4','conten 4'),(30,2,'title 6-5','conten 5');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test6@gmail.com','$2b$10$k3ZGjOJQfrpfbW1hnab1ne3GxkIDv.iL0moH5PTYiIAt/0XWVCDi2'),(2,'test@gmail.com','$2b$10$ocNv3Fepx8Lhef8KVKeFOullFVTyuPlJQXqB8UyBEJJQCdnb0p6rK'),(3,'test1@gmail.com','$2b$10$BiqmxeTHg3To2FYz9M0IeOPJVvASlNW3z4DnWqTX1b.eUitAEEFrO'),(4,'test2@gmail.com','$2b$10$HZ.MJQaipVerwpTRPTOu7uMqMxrKjRyV/AI8xHBB22/cvFVV1yQ2C'),(5,'test3@gmail.com','$2b$10$R8uzD130brTU3.UjJW5XEuRMWd/Ls9wTR5UZlkP36HjdSGpnR2UbK'),(6,'test4@gmail.com','$2b$10$IcS5oOBLdVtJpNc3Hq.hxOJpfLCs.rt1UcB5ikrjO3Jj14X3VdYSO'),(7,'test5@gmail.com','$2b$10$3..OW2roLCHMorBH3cB/7OKd5wUIRCW8D4Pnm7o2DuD8z8gzylUYm');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-03 15:54:07
