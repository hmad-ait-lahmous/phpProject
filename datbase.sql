-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 05 déc. 2024 à 03:42
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rental_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('pending','confirmed','canceled') NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

CREATE TABLE `cars` (
  `car_id` int(11) NOT NULL,
  `car_name` varchar(250) NOT NULL,
  `car_image` text NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `fuel_type` varchar(40) DEFAULT NULL,
  `daily_rate` decimal(10,2) NOT NULL,
  `availability` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cars`
--

INSERT INTO `cars` (`car_id`, `car_name`, `car_image`, `brand`, `model`, `fuel_type`, `daily_rate`, `availability`) VALUES
(5, 'Audi RS5 Coupe', 'http://localhost:8081/uploads/1733340627_8b5ac4135e1d617086c4.jpg', 'Audi', 'RS5 Coupe', 'Petrol', 800.00, 0),
(7, 'Porsche Macan', 'http://localhost:8081/uploads/1733364032_033b9dd52731756a58a3.jpg', 'Porsche', ' Macan', 'Petrol', 500.00, 0),
(8, 'Maserati Ghibli', 'http://localhost:8081/uploads/1733364211_1c2768312a7aaa8594da.jpg', 'Maserati', 'Ghibli', 'Petrol', 450.00, 0),
(9, 'Mercedes-Benz GLC', 'http://localhost:8081/uploads/1733364373_784b1437f027c229c780.jpg', 'Mercedes-Benz', 'GLC', ' Petrol/Diesel', 300.00, 0),
(10, 'Jaguar XF', 'http://localhost:8081/uploads/1733364562_1ecf7f4fda659f400ee9.jpg', 'Jaguar', 'XF', 'Diesel', 450.00, 0),
(11, 'Toyota Highlande', 'http://localhost:8081/uploads/1733364774_25781ba8e03a8fe510c0.jpg', 'Toyota', 'Highlander', 'Hybrid', 250.00, 0),
(12, ' Hyundai Ioniq 5', 'http://localhost:8081/uploads/1733365626_4411d1a3f9fe579f4ba3.jpg', 'Hyundai', 'Ioniq 5', 'Electric', 150.00, 0),
(13, 'Mercedes-AMG SL', 'http://localhost:8081/uploads/1733366008_75d1caf5a3f81ab378a1.jpg', 'Mercedes-Benz ', 'AMG SL  ', 'Petrol', 400.00, 0),
(14, 'Hyundai Palisade', 'http://localhost:8081/uploads/1733366259_b8c3210415798abbc44a.jpg', 'Hyundai ', ' Palisade  ', 'Petrol', 350.00, 0),
(15, 'Hyundai i20 ', 'http://localhost:8081/uploads/1733366485_613bf64c7191396861d0.jpg', 'Hyundai  ', 'i20  ', 'Petrol', 150.00, 0);

-- --------------------------------------------------------

--
-- Structure de la table `cars1`
--

CREATE TABLE `cars1` (
  `car_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cars1`
--

INSERT INTO `cars1` (`car_id`, `name`, `img_url`) VALUES
(1, 'hmadqqqaaaaaaa', 'http://localhost:8081/uploads/1732990605_925c907343caf028e3f8.png'),
(2, 'hmadqqqaaaaaaa', 'http://localhost:8081/uploads/1732990608_eb051861aa81bcca620f.png'),
(3, 'hmadqqqaaaaaaa', 'http://localhost:8081/uploads/1732990618_2a7fa737cd9c4d80cdb0.png'),
(4, 'gemini', 'http://localhost:8081/uploads/1732994149_aeb9dd6d995b8766a3ac.jpeg'),
(5, 'gemini', 'http://localhost:8081/uploads/1732994162_ad449e5e9df93f53024d.jpeg'),
(6, 'Gemini', 'http://localhost:8081/uploads/1732994186_e42c71a7718c64935ae2.jpeg'),
(7, 'USA', 'http://localhost:8081/uploads/1733012387_771489fc93e5b7dff5fc.jpg'),
(8, 'USA', 'http://localhost:8081/uploads/1733012399_9cbccf9c5a0388e7b767.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `id_card` varchar(15) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `phone_number`, `id_card`, `email`, `password`, `registration_date`) VALUES
(1, 'John', 'Doe', '1234567890', 'AB123456', 'john.doe@example.com', 'password123', '2024-11-22 20:41:01'),
(2, 'Jane', 'Smith', '9876543210', 'XY987654', 'jane.smith@example.com', 'password456', '2024-11-22 20:41:01'),
(3, 'Alice', 'Johnson', '4567891230', 'CD654321', 'alice.johnson@example.com', 'password789', '2024-11-22 20:41:01'),
(4, 'Bob', 'Williams', '7891234560', 'EF876543', 'bob.williams@example.com', 'password321', '2024-11-22 20:41:01'),
(5, 'Eve', 'Brown', '3216549870', 'GH345678', 'eve.brown@example.com', 'password654', '2024-11-22 20:41:01'),
(6, 'hmad', 'baba', '08487985789', 'VA1212', 'hmadaitlahmous1@gmail.com', 'qwertyu', '2024-11-22 21:43:47'),
(7, 'hmad', 'ait', 'hmafd', 'VA153848', 'admin@admin.com', 'qwerty', '2024-11-22 21:44:42'),
(11, 'hmad', 'qwertyuio', '0848798', 'VA153848', 'aitlahmous.hmad@ump.ac.ma', 'qwertyu', '2024-11-22 21:59:21'),
(12, 'hmad', 'ait', '08487985789', 'BD1539090', 'supervisor@supervisor.com', 'admin123', '2024-11-28 15:08:55'),
(13, 'qwertyui', 'baba', '08487985789', 'va566', 'l3xnabi@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '2024-11-28 15:12:04'),
(19, 'Ayoub', 'niri', '08487985789', 'BB2323', 'Ayou@bayoub.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '2024-11-28 16:01:07'),
(20, 'hmad', 'baba', '08487985789', 'BB2323', 'admin1@admin.com', '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5', '2024-11-28 16:51:07'),
(21, 'qwertyui', 'ait', 'wertyu', 'BB2323', 'adminqq@admin.com', '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5', '2024-11-28 20:01:58'),
(22, 'qwertyui', 'qwertyuio', '084879', 'BB2323', 'hmadaitlahmous@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '2024-11-28 20:02:30'),
(27, 'hmad', 'baba', '08487985789', 'VA111111111', 'admin@adminA.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '2024-11-29 09:08:31'),
(28, 'ahlam', 'ahlam', '084879', 'BB234323', 'l3xnabi@gmail.comaa', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '2024-11-29 09:59:09');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Index pour la table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`car_id`);

--
-- Index pour la table `cars1`
--
ALTER TABLE `cars1`
  ADD PRIMARY KEY (`car_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cars`
--
ALTER TABLE `cars`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `cars1`
--
ALTER TABLE `cars1`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`car_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
