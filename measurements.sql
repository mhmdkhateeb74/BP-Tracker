-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2025 at 05:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bloodproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
--

CREATE TABLE `measurements` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `systolic` int(11) NOT NULL,
  `diastolic` int(11) NOT NULL,
  `pulse` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`id`, `user_id`, `systolic`, `diastolic`, `pulse`, `date`) VALUES
(37, 3, 120, 123, 123, '2025-03-06'),
(38, 1, 2, 2, 2, '2001-02-01'),
(39, 1, 120, 242, 24, '2001-02-01'),
(40, 1, 120, 242, 24, '2001-02-01'),
(41, 1, 120, 242, 24, '2001-02-01'),
(42, 1, 120, 242, 24, '2001-02-01'),
(43, 1, 120, 242, 24, '2001-02-01'),
(44, 1, 120, 242, 24, '2001-02-01'),
(45, 1, 120, 242, 24, '2001-02-01'),
(46, 1, 120, 242, 24, '2001-02-01'),
(47, 1, 120, 242, 24, '2001-02-01'),
(48, 1, 120, 242, 24, '2001-02-01'),
(49, 1, 120, 242, 24, '2001-02-01'),
(50, 1, 120, 242, 24, '2001-02-01'),
(51, 1, 120, 242, 24, '2001-02-01'),
(52, 1, 120, 242, 24, '2001-02-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `measurements`
--
ALTER TABLE `measurements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
