-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2023 a las 04:45:00
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
-- Estructura de tabla para la tabla `avatar`
--

CREATE TABLE `avatar` (
  `uuid` varchar(150) NOT NULL,
  `urlAvatar` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(4, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Lorem 3', 'Lorem ipsom 3', '2023-06-21 21:30:45', 1),
(5, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Lorem 4', 'Lorem ipsom 4', '2023-06-21 21:30:51', 1),
(8, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Consequat Voluptas ', 'Ex voluptatum rerum lorem iusto quo consequuntur reprehenderit elit blanditiis', '2023-06-21 21:34:20', 0),
(9, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Consequat Voluptas ', 'Ex voluptatum rerum lorem iusto quo consequuntur reprehenderit elit blanditiis', '2023-06-21 21:34:31', 0),
(10, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Consequat Voluptas ', 'Ex voluptatum rerum lorem iusto quo consequuntur reprehenderit elit blanditiis', '2023-06-21 21:34:37', 0),
(11, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Ut ab neque consequa', 'Minima voluptatum qui officiis mollit nobis est commodi ea quia consequatur aut consequat Qui incididunt veniam', '2023-06-21 21:38:15', 1),
(12, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Duis ipsam corporis ', 'Eveniet vero sint quo officiis Nam dolore alias officia incidunt rerum voluptatem magnam ad', '2023-06-21 21:38:43', 1),
(13, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'Accusantium necessit', 'Nostrum voluptas expedita commodo quia assumenda quia odio voluptatibus et aliquip consequatur sint vero impedit aperiam placeat proident vitae', '2023-06-21 21:38:59', 0),
(14, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'dgsdretr', 'dgaerrertret', '2023-06-21 21:39:18', 1);

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
(1, 'ea9d313e-6fae-48e0-ac71-bd938716c900', 'root', 'roots', 'root@gmail.com', '$2b$10$kpcfAjiXLHu6fVRjEseKqOwbKl7G5Slj7SOGZnwh0raibiC5YJKzq', 'src/img/avatar.svg', 1, 0),
(2, 'f699ea5f-c9d9-42a4-8294-51f32504eed2', 'user', 'users', 'user@gmail.com', '$2b$10$vixCRCcLEb9PnHL/GdVx1ezp2dFazaLmAHfS03DTymKDryk8izFHC', 'src/img/avatar.svg', 1, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
