-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Mar 2024 pada 17.20
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

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
-- Struktur dari tabel `aplikasis`
--

CREATE TABLE `aplikasis` (
  `aplikasiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '995697fb-86a2-48b8-8d9a-a82302390e66',
  `nama` varchar(255) DEFAULT NULL,
  `tierID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `image` text DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `aplikasis`
--

INSERT INTO `aplikasis` (`aplikasiID`, `nama`, `tierID`, `image`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
('390a978a-5c7f-47b4-bfbc-c7dc2d17efc5', 'Apple TV+', '7e945eb4-af60-4e48-b665-d691824785a3', 'images-1710259974595.png', 'Apple TV Plus', '2024-03-12 16:12:54', '2024-03-12 16:12:54'),
('46cf0a00-7493-4b94-8114-b37ee5205071', 'Youtube', 'e75f9912-0f6f-4d55-879a-6f2bec21173d', 'images-1710260120909.png', 'Youtube Premium', '2024-03-12 16:15:20', '2024-03-12 16:15:20'),
('8c85bf26-ca84-48f9-b226-94820c286898', 'Apple Music', 'e75f9912-0f6f-4d55-879a-6f2bec21173d', 'images-1710260095626.png', 'Apple Music Premium', '2024-03-12 16:14:55', '2024-03-12 16:14:55'),
('93211337-1460-4456-9c3b-e4407311894d', 'Disney+', '7e945eb4-af60-4e48-b665-d691824785a3', 'images-1710260030336.jpg', 'Disney+ Monthly Pass ', '2024-03-12 16:13:50', '2024-03-12 16:13:50'),
('bf4ff5c6-71be-45ad-aad3-071c8ff2629a', 'Netflix', 'd01d1142-2272-4b43-bb41-0f9b734b7d10', 'images-1710259775096.png', 'Netflix Premium', '2024-03-12 16:09:35', '2024-03-12 16:09:35'),
('cc9464fe-e47e-4c89-b982-1a646ad7f0f4', 'Spotify', 'd01d1142-2272-4b43-bb41-0f9b734b7d10', 'images-1710259873564.jpg', 'Spotify Pro', '2024-03-12 16:11:13', '2024-03-12 16:11:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksis`
--

CREATE TABLE `detail_transaksis` (
  `detail_transaksiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'ac0985c1-7a8a-4177-9961-157525d62ac3',
  `transaksiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `aplikasiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tierID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `durasi` bigint(20) DEFAULT NULL,
  `total_harga` bigint(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240305072827-create-user.js'),
('20240305073625-create-tier.js'),
('20240305073630-create-aplikasi.js'),
('20240305074006-create-transaksi.js'),
('20240305074225-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tiers`
--

CREATE TABLE `tiers` (
  `tierID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '18efa47c-bcc9-4dcd-ab7c-6d9f010f9916',
  `harga` bigint(20) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tiers`
--

INSERT INTO `tiers` (`tierID`, `harga`, `nama`, `createdAt`, `updatedAt`) VALUES
('7e945eb4-af60-4e48-b665-d691824785a3', 57000, 'Rare', '2024-03-12 15:34:40', '2024-03-12 15:34:40'),
('d01d1142-2272-4b43-bb41-0f9b734b7d10', 43000, 'Common', '2024-03-12 15:30:01', '2024-03-12 15:30:01'),
('e75f9912-0f6f-4d55-879a-6f2bec21173d', 70000, 'Premium', '2024-03-12 15:35:02', '2024-03-12 15:35:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksis`
--

CREATE TABLE `transaksis` (
  `transaksiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '02259936-86a7-4f6e-8a93-7495f0c9fe4b',
  `tgl` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `aplikasiID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` enum('draft','lunas') DEFAULT 'draft',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'e6e877c9-f1d3-439f-ac39-ccee6fe6cd3d',
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `saldo` bigint(20) DEFAULT 0,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`userID`, `username`, `password`, `nama`, `saldo`, `role`, `createdAt`, `updatedAt`) VALUES
('66f899dd-1eed-42c3-bdd8-94bf24c30aa4', 'admin baik hati', '$2b$10$VfZOzuT6alGijuApioQVx.ThzJdVTPyxj3B1vs6qrdi4B..duRjA6', 'Gradak', 0, 'admin', '2024-03-12 15:27:21', '2024-03-12 15:27:21');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `aplikasis`
--
ALTER TABLE `aplikasis`
  ADD PRIMARY KEY (`aplikasiID`),
  ADD KEY `tierID` (`tierID`);

--
-- Indeks untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD PRIMARY KEY (`detail_transaksiID`),
  ADD KEY `transaksiID` (`transaksiID`),
  ADD KEY `aplikasiID` (`aplikasiID`),
  ADD KEY `tierID` (`tierID`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `tiers`
--
ALTER TABLE `tiers`
  ADD PRIMARY KEY (`tierID`);

--
-- Indeks untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  ADD PRIMARY KEY (`transaksiID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `aplikasiID` (`aplikasiID`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `aplikasis`
--
ALTER TABLE `aplikasis`
  ADD CONSTRAINT `aplikasis_ibfk_1` FOREIGN KEY (`tierID`) REFERENCES `tiers` (`tierID`);

--
-- Ketidakleluasaan untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD CONSTRAINT `detail_transaksis_ibfk_1` FOREIGN KEY (`transaksiID`) REFERENCES `transaksis` (`transaksiID`),
  ADD CONSTRAINT `detail_transaksis_ibfk_2` FOREIGN KEY (`aplikasiID`) REFERENCES `aplikasis` (`aplikasiID`),
  ADD CONSTRAINT `detail_transaksis_ibfk_3` FOREIGN KEY (`tierID`) REFERENCES `tiers` (`tierID`);

--
-- Ketidakleluasaan untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  ADD CONSTRAINT `transaksis_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `transaksis_ibfk_2` FOREIGN KEY (`aplikasiID`) REFERENCES `aplikasis` (`aplikasiID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
