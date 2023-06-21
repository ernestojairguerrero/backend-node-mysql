-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2023 a las 18:12:55
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_posts`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `uuid` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `uuid`, `name`, `description`, `date`, `status`) VALUES
(1, '5a7a6fb8-c281-4c57-99d6-b546dbbcd20f', 'Lorem', 'Lorem ipsom', '2023-06-21 03:10:16', 1),
(2, 'c83b141f-fa8d-4a35-93b9-ce023d64b93d', 'Lorem 2', 'Lorem ipsom 2', '2023-06-21 03:10:16', 0),
(3, 'c83b141f-fa8d-4a35-93b9-ce023d64b93d', 'Lorem 3', 'Lorem ipsom 3', '2023-06-21 03:10:16', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `uuid` varchar(150) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `role` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `uuid`, `name`, `last_name`, `email`, `password`, `avatar`, `status`, `role`) VALUES
(3, '5a7a6fb8-c281-4c57-99d6-b546dbbcd20f', '', 'admin8956258525252533', '', '', NULL, 1, 1),
(4, 'c83b141f-fa8d-4a35-93b9-ce023d64b93d', 'root', 'roots', 'root@gmail.com', '$2b$10$mLeSZmF1GlK3aW8PQn8HkOSu7nMlMIIiuhi5y1nV3wWrKl/sLWxCq', 'JOJOJO', 0, 1),
(5, '46a1429f-3d0d-4e09-8569-8cb151bb06e0', 'root', 'roots', 'root002@gmail.com', '$2b$10$GUShb0Zbm2XE53Dx.j.VteWiXo2yU8gnZ79Ef5d.JgnsSScdHVQmq', '../img/avatar.svg', 1, 1),
(6, '3ca914d7-f0f8-48a1-97af-98c045f05017', 'root', 'roots', 'root111@gmail.com', '$2b$10$zW6t1ZefDqODX1VJv3M07ujoEKnPNANQMhZz6d8Jm8JmDtM5NqP3O', 'src/img/avatar.svg', 0, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
