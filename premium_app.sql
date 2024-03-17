-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2024 at 05:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `premium_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `aplikasis`
--

CREATE TABLE `aplikasis` (
  `aplikasiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '5328a712-3092-4780-ae7a-a0f71ba7bfaf',
  `nama` varchar(255) DEFAULT NULL,
  `tierID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `image` text DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aplikasis`
--

INSERT INTO `aplikasis` (`aplikasiID`, `nama`, `tierID`, `image`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
('1abadc1b-d4e0-45d1-8b42-d1b90ea44bd9', 'Spotify+', '7e6e9664-abf3-4b91-bcb4-e8897dc04797', 'images-1710650408955.jpg', 'Dengerin Musik kapan aja dan dimana aja, tanpa gangguan iklan.', '2024-03-17 04:40:08', '2024-03-17 04:40:08'),
('49c73c7a-85ef-4cb4-b06d-2442e1b09ac9', 'Disney Hotstar', '53435e9f-ea76-49c9-ad6a-b07d398c0eea', 'images-1710650473363.jpg', 'Menonton film kesukaan mu tanpa gangguan apa pun, mulai dari sekarang', '2024-03-17 04:41:13', '2024-03-17 04:41:13'),
('6478ade4-25e1-4ae8-9297-21e6636b112e', 'Apple TV', '7f99cc72-e463-4c71-acf3-80a0dae34b9e', 'images-1710650442239.png', 'Nikmati layanan premium sepuas nya dengan harga terjangkau', '2024-03-17 04:40:42', '2024-03-17 04:40:42'),
('a0eddddf-8dcf-4b50-89cb-eb89a6456663', 'Netflix', '7f99cc72-e463-4c71-acf3-80a0dae34b9e', 'images-1710650375050.png', 'Langganan netflix premium dengan harga lebih terjangkau', '2024-03-17 04:39:35', '2024-03-17 04:39:35'),
('b76ffd74-4e49-4e85-8981-fb28814aa344', 'Youtube Premium', '7e6e9664-abf3-4b91-bcb4-e8897dc04797', 'images-1710650534047.png', 'Menikmati video kesukaan anda, tanpa adanya gangguan iklan', '2024-03-17 04:42:14', '2024-03-17 04:42:14'),
('cf29b5c9-8ca1-4daf-91bd-a608bcc89812', 'Apple Music', '53435e9f-ea76-49c9-ad6a-b07d398c0eea', 'images-1710650505374.png', 'Musik itu personal, ayo nikmati musik mu tanpa gangguan apa pun', '2024-03-17 04:41:45', '2024-03-17 04:41:45');

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksis`
--

CREATE TABLE `detail_transaksis` (
  `detail_transaksiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'ed1b937d-0598-4493-b59a-c14ba41c347f',
  `transaksiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `aplikasiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tierID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `durasi` bigint(20) DEFAULT NULL,
  `total_harga` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_transaksis`
--

INSERT INTO `detail_transaksis` (`detail_transaksiID`, `transaksiID`, `aplikasiID`, `tierID`, `harga`, `durasi`, `total_harga`, `createdAt`, `updatedAt`) VALUES
('00f6d6a7-9c7a-4b4a-91f1-9220ec7f9527', '3184f45e-552b-48f0-b7e1-4fc3e4dbdd58', 'cf29b5c9-8ca1-4daf-91bd-a608bcc89812', '53435e9f-ea76-49c9-ad6a-b07d398c0eea', 12000, 3, 36000, '2024-03-17 04:43:57', '2024-03-17 04:43:57'),
('464c2a89-6900-4f73-9e6a-1c67f3c0e327', '92964274-97a5-4ac4-8182-2b0ba3d73363', '1abadc1b-d4e0-45d1-8b42-d1b90ea44bd9', '7e6e9664-abf3-4b91-bcb4-e8897dc04797', 32000, 8, 256000, '2024-03-17 04:43:13', '2024-03-17 04:43:13'),
('c9cea139-1151-4698-bde6-511a52e638bd', 'd9d66522-7cea-48c3-b628-322866f35a5c', '6478ade4-25e1-4ae8-9297-21e6636b112e', '7f99cc72-e463-4c71-acf3-80a0dae34b9e', 21000, 6, 126000, '2024-03-17 04:43:19', '2024-03-17 04:43:19');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240305072827-create-user.js'),
('20240305073625-create-tier.js'),
('20240305073630-create-aplikasi.js'),
('20240305074006-create-transaksi.js'),
('20240305074225-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Table structure for table `tiers`
--

CREATE TABLE `tiers` (
  `tierID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '8abda727-20aa-4547-bf6b-076ee3ab12f3',
  `harga` bigint(20) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tiers`
--

INSERT INTO `tiers` (`tierID`, `harga`, `nama`, `createdAt`, `updatedAt`) VALUES
('53435e9f-ea76-49c9-ad6a-b07d398c0eea', 12000, 'common', '2024-03-17 04:38:19', '2024-03-17 04:38:19'),
('7e6e9664-abf3-4b91-bcb4-e8897dc04797', 32000, 'premium', '2024-03-17 04:38:37', '2024-03-17 04:38:37'),
('7f99cc72-e463-4c71-acf3-80a0dae34b9e', 21000, 'rare', '2024-03-17 04:38:27', '2024-03-17 04:38:27');

-- --------------------------------------------------------

--
-- Table structure for table `transaksis`
--

CREATE TABLE `transaksis` (
  `transaksiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '9975d779-6f06-4712-ab94-aa1c179839af',
  `tgl` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `aplikasiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` enum('draft','lunas') DEFAULT 'draft',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksis`
--

INSERT INTO `transaksis` (`transaksiID`, `tgl`, `userID`, `aplikasiID`, `status`, `createdAt`, `updatedAt`) VALUES
('3184f45e-552b-48f0-b7e1-4fc3e4dbdd58', '2024-03-17 04:43:57', '9021f2f5-a04a-4cb0-99fb-85fb01d4c6d3', 'cf29b5c9-8ca1-4daf-91bd-a608bcc89812', 'draft', '2024-03-17 04:43:57', '2024-03-17 04:43:57'),
('92964274-97a5-4ac4-8182-2b0ba3d73363', '2024-03-17 04:43:13', '9021f2f5-a04a-4cb0-99fb-85fb01d4c6d3', '1abadc1b-d4e0-45d1-8b42-d1b90ea44bd9', 'draft', '2024-03-17 04:43:13', '2024-03-17 04:43:13'),
('d9d66522-7cea-48c3-b628-322866f35a5c', '2024-03-17 04:43:19', '9021f2f5-a04a-4cb0-99fb-85fb01d4c6d3', '6478ade4-25e1-4ae8-9297-21e6636b112e', 'draft', '2024-03-17 04:43:19', '2024-03-17 04:43:19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '6c573de1-e0bb-4fd6-9bda-bac7dc9545c7',
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `saldo` bigint(20) DEFAULT 0,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `password`, `nama`, `saldo`, `role`, `createdAt`, `updatedAt`) VALUES
('9021f2f5-a04a-4cb0-99fb-85fb01d4c6d3', 'asfina', '$2b$10$dPsICMAWxhtoPyssQSmCqeZl3hDJ4AXsHhpeHRhBQWsHRw3tDfeju', 'asfina', 21000, 'admin', '2024-03-17 04:37:41', '2024-03-17 04:44:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aplikasis`
--
ALTER TABLE `aplikasis`
  ADD PRIMARY KEY (`aplikasiID`),
  ADD KEY `tierID` (`tierID`);

--
-- Indexes for table `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD PRIMARY KEY (`detail_transaksiID`),
  ADD KEY `transaksiID` (`transaksiID`),
  ADD KEY `aplikasiID` (`aplikasiID`),
  ADD KEY `tierID` (`tierID`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tiers`
--
ALTER TABLE `tiers`
  ADD PRIMARY KEY (`tierID`);

--
-- Indexes for table `transaksis`
--
ALTER TABLE `transaksis`
  ADD PRIMARY KEY (`transaksiID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `aplikasiID` (`aplikasiID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aplikasis`
--
ALTER TABLE `aplikasis`
  ADD CONSTRAINT `aplikasis_ibfk_1` FOREIGN KEY (`tierID`) REFERENCES `tiers` (`tierID`);

--
-- Constraints for table `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD CONSTRAINT `detail_transaksis_ibfk_1` FOREIGN KEY (`transaksiID`) REFERENCES `transaksis` (`transaksiID`),
  ADD CONSTRAINT `detail_transaksis_ibfk_2` FOREIGN KEY (`aplikasiID`) REFERENCES `aplikasis` (`aplikasiID`),
  ADD CONSTRAINT `detail_transaksis_ibfk_3` FOREIGN KEY (`tierID`) REFERENCES `tiers` (`tierID`);

--
-- Constraints for table `transaksis`
--
ALTER TABLE `transaksis`
  ADD CONSTRAINT `transaksis_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `transaksis_ibfk_2` FOREIGN KEY (`aplikasiID`) REFERENCES `aplikasis` (`aplikasiID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
