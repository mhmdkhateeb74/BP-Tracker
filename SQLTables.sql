-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2025 at 03:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: bloodproject
--

-- --------------------------------------------------------

--
-- Table structure for table measurements
--

CREATE TABLE measurements (
                              id int(11) NOT NULL,
                              user_id int(11) NOT NULL,
                              systolic int(11) NOT NULL,
                              diastolic int(11) NOT NULL,
                              pulse int(11) NOT NULL,
                              date date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table measurements
--
ALTER TABLE measurements
    ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table measurements
--
ALTER TABLE measurements
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;
COMMIT;



--
-- Table structure for table users
--

CREATE TABLE users (
                       id int(11) NOT NULL,
                       name varchar(200) NOT NULL,
                       email varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table users
--
ALTER TABLE users
    ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table users
--
ALTER TABLE users
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
