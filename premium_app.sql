-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Mar 2024 pada 16.23
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
  `aplikasiID` bigint(20) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `tierID` bigint(20) NOT NULL,
  `image` text DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `aplikasis`
--

INSERT INTO `aplikasis` (`aplikasiID`, `nama`, `tierID`, `image`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
(1, 'Spotify', 1, 'images-1710082932368.jpg', 'Spotify Pro', '2024-03-10 15:02:12', '2024-03-10 15:02:12'),
(2, 'Netflix', 1, 'images-1710083133797.png', 'Netflix Premium', '2024-03-10 15:05:33', '2024-03-10 15:05:33'),
(3, 'Disney+', 2, 'images-1710083315582.jpg', 'Disney+ Basic', '2024-03-10 15:08:35', '2024-03-10 15:08:35'),
(4, 'Apple TV+', 2, 'images-1710083581133.png', 'Apple TV Pass', '2024-03-10 15:13:01', '2024-03-10 15:13:01'),
(5, 'Youtube', 3, 'images-1710083642112.png', 'Youtube Premium', '2024-03-10 15:14:02', '2024-03-10 15:14:02'),
(6, 'Apple Music', 3, 'images-1710083747822.png', 'Apple Music Plus', '2024-03-10 15:15:47', '2024-03-10 15:15:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksis`
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
  `tierID` bigint(20) NOT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tiers`
--

INSERT INTO `tiers` (`tierID`, `harga`, `nama`, `createdAt`, `updatedAt`) VALUES
(1, 43000, 'Common', '2024-03-10 14:59:33', '2024-03-10 14:59:33'),
(2, 57000, 'Rare', '2024-03-10 14:59:59', '2024-03-10 14:59:59'),
(3, 70000, 'Premium', '2024-03-10 15:00:28', '2024-03-10 15:00:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksis`
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
-- Struktur dari tabel `users`
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
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`userID`, `username`, `password`, `nama`, `saldo`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Mas Atmint', '$2b$10$Hc9vs6ulRzq6VDbnAHtR2euF261sGIA0HXmi1yXOcs29aD5qTqX9e', 'Gradak', 0, 'admin', '2024-03-10 14:58:08', '2024-03-10 14:58:08');

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
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `aplikasis`
--
ALTER TABLE `aplikasis`
  MODIFY `aplikasiID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  MODIFY `detail_transaksiID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tiers`
--
ALTER TABLE `tiers`
  MODIFY `tierID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  MODIFY `transaksiID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `userID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
