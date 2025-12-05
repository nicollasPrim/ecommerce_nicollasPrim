-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ecom
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `codEntrega` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `cep` varchar(9) NOT NULL,
  `logradouro` varchar(70) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(70) NOT NULL,
  `localidade` varchar(70) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `numero` varchar(12) NOT NULL,
  `dataEstimada` date DEFAULT NULL,
  `codigoRastreio` varchar(50) DEFAULT NULL,
  `statusEntrega` enum('EM_TRANSITO','SAIU_PARA_ENTREGA','ENTREGUE','EXTRAVIADO') NOT NULL DEFAULT 'EM_TRANSITO',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codEntrega`),
  UNIQUE KEY `idPedido` (`idPedido`),
  UNIQUE KEY `codigoRastreio` (`codigoRastreio`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoques`
--

DROP TABLE IF EXISTS `estoques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoques` (
  `codEstoque` int NOT NULL AUTO_INCREMENT,
  `idProduto` int NOT NULL,
  `quantidade_atual` int DEFAULT '0',
  `quantidade_minima` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codEstoque`),
  UNIQUE KEY `idProduto` (`idProduto`),
  CONSTRAINT `estoques_ibfk_1` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoques`
--

LOCK TABLES `estoques` WRITE;
/*!40000 ALTER TABLE `estoques` DISABLE KEYS */;
/*!40000 ALTER TABLE `estoques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_pedidos`
--

DROP TABLE IF EXISTS `itens_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_pedidos` (
  `codItemPedido` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `idProduto` int NOT NULL,
  `quantidade` int NOT NULL DEFAULT '1',
  `precoUnitario` decimal(10,2) NOT NULL,
  `valorTotalItem` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`codItemPedido`),
  UNIQUE KEY `itens_pedidos_id_pedido_id_produto` (`idPedido`,`idProduto`),
  KEY `idProduto` (`idProduto`),
  CONSTRAINT `itens_pedidos_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itens_pedidos_ibfk_2` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_pedidos`
--

LOCK TABLES `itens_pedidos` WRITE;
/*!40000 ALTER TABLE `itens_pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `itens_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `codPedido` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `dataPedido` datetime NOT NULL,
  `status` enum('PAGAMENTO PENDENTE','PAGO','ENVIADO','ENTREGUE','CANCELADO') NOT NULL DEFAULT 'PAGAMENTO PENDENTE',
  `valorSubtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorFrete` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorTotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codPedido`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `codProduto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `nomeArtista` varchar(120) NOT NULL,
  `tracklist` text NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Nevermind','AAAA','\"Smells Like Teen Spirit\", \"In Bloom\", \"Come as You Are\", \"Breed\", \"Lithium\", \"Polly\", \"Territorial Pissings\", \"Drain You\", \"Lounge Act\", \"Stay Away\", \"On a Plain\", \"Something in the Way\", \"Endless, Nameless\"',129.99,'Grunge','https://www.estadao.com.br/resizer/v2/JVLWA4MB2NPXNAOCZ6H36CSC2A.jpg?auth=f45ae37e96b5d856df9d2b9a3909f810f6622370f8afbb669d88df746c226cf5',1,'2025-12-01 10:55:22','2025-12-01 11:24:05');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `identidade` varchar(20) DEFAULT NULL,
  `tipo_usuario` enum('CLIENTE','ADMIN') NOT NULL DEFAULT 'CLIENTE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codUsuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `cpf_2` (`cpf`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `cpf_3` (`cpf`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `cpf_4` (`cpf`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `cpf_5` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO usuarios (nome, email, senha, telefone, cpf, identidade, tipo_usuario, createdAt, updatedAt)
VALUES
('Alice Mendes', 'alice.mendes@example.com', '$2b$10$ZLQ2jZ7IuY9JqZC2xUtSte7Qn0RaZ4YB6/TgTjViuZB9vJ1bTn4Iy', '47988885555', '123.456.789-10', 'RG123456', 'CLIENTE', NOW(), NOW()),
('Bruno Siqueira', 'bruno.siq@example.com', '$2b$10$4CUBqB6m0VQW4EopY2g4FugPaDVM1q0Fz7umhKxQq5xfhXvxu1I5G', '47997776666', '223.456.789-20', 'RG654321', 'CLIENTE', NOW(), NOW()),
('Carla Ribeiro', 'carla.rib@example.com', '$2b$10$W8P6a9i3T6U0wQ8V2kC7MuHX0v0yq3rV9xZy4E2tQO3A7hL1p2T5C', '47996664444', '323.456.789-30', 'RG987654', 'CLIENTE', NOW(), NOW()),
('Diego Pacheco', 'd.pacheco@example.com', '$2b$10$0jF6z0qJ6Yc9bY93kMZ8ZuC3pZkFvB1uPuQWeqQF0HQj4r79tqfR2', '47995553322', '423.456.789-40', 'RG112233', 'CLIENTE', NOW(), NOW()),
('Evelyn Rocha', 'eve.rocha@example.com', '$2b$10$uT5pXedlW0Z8bg5NqKmXMeVnqTQAZKQ7PnRkDdvs8KJxM2gEtjvdi', '47994442233', '523.456.789-50', 'RG221133', 'ADMIN', NOW(), NOW());

INSERT INTO produtos (nome, nomeArtista, tracklist, preco, genero, imagem_url, ativo, createdAt, updatedAt)
VALUES
('Hybrid Theory', 'Linkin Park', 'Papercut; One Step Closer; Crawling', 149.90, 'Nu Metal', NULL, 1, NOW(), NOW()),
('White Pony', 'Deftones', 'Feiticeira; Digital Bath; Elite', 139.90, 'Alt Metal', NULL, 1, NOW(), NOW()),
('Rage Against the Machine', 'RATM', 'Bombtrack; Killing in the Name; Bullet in the Head', 129.90, 'Rap Metal', NULL, 1, NOW(), NOW()),
('In Utero', 'Nirvana', 'Serve the Servants; Scentless Apprentice; Heart-Shaped Box', 119.90, 'Grunge', NULL, 1, NOW(), NOW()),
('Slipknot', 'Slipknot', '742617000027; (sic); Eyeless', 159.90, 'Nu Metal', NULL, 1, NOW(), NOW());

INSERT INTO estoques (idProduto, quantidade_atual, quantidade_minima, createdAt, updatedAt)
VALUES
(2, 50, 5, NOW(), NOW()),
(3, 30, 5, NOW(), NOW()),
(4, 40, 5, NOW(), NOW()),
(5, 25, 5, NOW(), NOW()),
(6, 60, 5, NOW(), NOW());

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'nicollas','nicollassprim@gmail.com','$2b$10$rESdTuY3URU6LLn2uHVIi.N2szBINM3TybQR7ttftUQMQxzWWMbPa','47992176055','140.664.569-95','','ADMIN','2025-12-01 10:52:22','2025-12-01 10:52:22'),(2,'nicollas','nicolepprim_@hotmail.com','$2b$10$bqmJ/oa3qGGgcyGe7xH1EefJIMt/ArmQgCtRw.DYZ2fMZOWOVCFp2','47992176055','374.888.890-29','','CLIENTE','2025-12-01 11:24:31','2025-12-01 11:24:31');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-04  7:49:21
