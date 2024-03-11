-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2024 at 01:55 AM
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
  `aplikasiID` bigint(20) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `tierID` bigint(20) NOT NULL,
  `image` text DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aplikasis`
--

INSERT INTO `aplikasis` (`aplikasiID`, `nama`, `tierID`, `image`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
(1, 'Spotify', 1, 'images-1710116545608.jpg', 'Spotify Pro', '2024-03-10 15:02:12', '2024-03-11 00:22:25'),
(2, 'Netflix', 1, 'images-1710116714124.png', 'Netflix Premium', '2024-03-10 15:05:33', '2024-03-11 00:25:14'),
(3, 'Disney+', 2, 'images-1710116735150.jpg', 'Disney+ Basic', '2024-03-10 15:08:35', '2024-03-11 00:25:35'),
(4, 'Apple TV+', 2, 'images-1710116772106.png', 'Apple TV Pass', '2024-03-10 15:13:01', '2024-03-11 00:26:12'),
(5, 'Youtube', 3, 'images-1710116812027.png', 'Youtube Premium', '2024-03-10 15:14:02', '2024-03-11 00:26:52'),
(6, 'Apple Music', 3, 'images-1710116976602.png', 'Apple Music Plus', '2024-03-10 15:15:47', '2024-03-11 00:29:36');

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksis`
--

CREATE TABLE `detail_transaksis` (
  `detail_transaksiID` bigint(20) NOT NULL,
  `transaksiID` bigint(20) NOT NULL,
  `aplikasiID` bigint(20) NOT NULL,
  `tierID` bigint(20) NOT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `durasi` bigint(20) DEFAULT NULL,
  `total_harga` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `tierID` bigint(20) NOT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tiers`
--

INSERT INTO `tiers` (`tierID`, `harga`, `nama`, `createdAt`, `updatedAt`) VALUES
(1, 43000, 'Common', '2024-03-10 14:59:33', '2024-03-10 14:59:33'),
(2, 57000, 'Rare', '2024-03-10 14:59:59', '2024-03-10 14:59:59'),
(3, 70000, 'Premium', '2024-03-10 15:00:28', '2024-03-10 15:00:28');

-- --------------------------------------------------------

--
-- Table structure for table `transaksis`
--

CREATE TABLE `transaksis` (
  `transaksiID` bigint(20) NOT NULL,
  `tgl` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` bigint(20) NOT NULL,
  `aplikasiID` bigint(20) NOT NULL,
  `status` enum('draft','lunas') DEFAULT 'draft',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` bigint(20) NOT NULL,
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
(2, 'pandhu', '$2b$10$dZSsM4VW3yYIRxH.hX3AteAh9jfnh.xTHfyrmxn0W/B5MyZNch/OS', 'pandhu', 0, 'admin', '2024-03-10 15:51:31', '2024-03-10 15:51:31'),
(3, 'asfina', '$2b$10$EVQmQG8iCGb2srEKLC/mB.4DaMJ8ZSjP4uE92trk7c1RpJX4XZ906', 'asfina', 0, 'admin', '2024-03-10 15:51:43', '2024-03-10 15:51:43');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aplikasis`
--
ALTER TABLE `aplikasis`
  MODIFY `aplikasiID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  MODIFY `detail_transaksiID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tiers`
--
ALTER TABLE `tiers`
  MODIFY `tierID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaksis`
--
ALTER TABLE `transaksis`
  MODIFY `transaksiID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
