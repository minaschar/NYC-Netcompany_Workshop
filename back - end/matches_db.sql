-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 13 Μάη 2024 στις 22:41:49
-- Έκδοση διακομιστή: 10.4.20-MariaDB
-- Έκδοση PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `matches_db`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `football_match`
--

CREATE TABLE `football_match` (
  `id` bigint(20) NOT NULL,
  `date` datetime NOT NULL,
  `team_away_fouls` int(11) DEFAULT NULL,
  `team_away_goals` int(11) DEFAULT NULL,
  `team_away_logo` varchar(255) DEFAULT NULL,
  `team_away_name` varchar(255) DEFAULT NULL,
  `team_away_ycards` int(11) DEFAULT NULL,
  `team_home_fouls` int(11) DEFAULT NULL,
  `team_home_goals` int(11) DEFAULT NULL,
  `team_home_logo` varchar(255) DEFAULT NULL,
  `team_home_name` varchar(255) DEFAULT NULL,
  `team_home_ycards` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `football_match`
--
ALTER TABLE `football_match`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `football_match`
--
ALTER TABLE `football_match`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
