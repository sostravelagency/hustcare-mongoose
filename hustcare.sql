-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 27, 2023 at 05:20 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hustcare`
--

-- --------------------------------------------------------

--
-- Table structure for table `Areas`
--

CREATE TABLE `Areas` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Attributes`
--

CREATE TABLE `Attributes` (
  `id` varchar(255) NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `acreage` varchar(255) DEFAULT NULL,
  `published` varchar(255) DEFAULT NULL,
  `hashtag` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Attributes`
--

INSERT INTO `Attributes` (`id`, `price`, `acreage`, `published`, `hashtag`, `createdAt`, `updatedAt`) VALUES
('02955fe2-a99d-4610-abdc-bcae9bf2e0f1', '1 triệu/tháng', '20 m2', '05/12/2023', '#844077', '2023-12-05 11:49:21', '2023-12-05 11:49:21'),
('38c74aba-582f-4578-acb5-140450755d47', '1 triệu/tháng', '10 m2', '23/12/2023', '#864466', '2023-12-23 10:25:55', '2023-12-23 10:25:55'),
('64e7c99b-0fe0-4292-b395-13e470c24c1a', '1 triệu/tháng', '10 m2', '23/12/2023', '#711395', '2023-12-23 10:20:14', '2023-12-23 10:20:14'),
('72f69ace-5526-47da-bbd2-207fbc30db95', '3 triệu/tháng', '20 m2', '07/06/2023', '#419359', '2023-06-07 14:22:21', '2023-06-07 14:22:21'),
('7a0f0e7f-0c64-456a-a64b-ad4dece96c16', '3 triệu/tháng', '20 m2', '07/06/2023', '#708717', '2023-06-07 14:20:25', '2023-06-07 14:20:25'),
('83b1eddf-d6c1-411f-9b04-58c0f9430373', '10 triệu/tháng', '50 m2', '19/12/2023', '#994393', '2023-12-18 19:03:46', '2023-12-18 19:03:46'),
('bc2724ec-f373-43ef-bceb-1f9aaef2541a', '1 triệu/tháng', '20 m2', '05/12/2023', '#549553', '2023-12-05 11:46:51', '2023-12-05 11:46:51');

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `header` varchar(255) DEFAULT NULL,
  `subheader` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `code`, `value`, `header`, `subheader`, `createdAt`, `updatedAt`) VALUES
(1, 'code123', 'Phòng trọ', 'Phòng trọ, nhà trọ', 'Phòng trọ 2', '2023-06-03 19:23:25', '2023-06-03 19:23:25'),
(2, 'code 1234', 'Share phòng', 'Share phòng', 'Share phòng', '2023-12-19 02:51:25', '2023-12-19 02:51:25');

-- --------------------------------------------------------

--
-- Table structure for table `Comment`
--

CREATE TABLE `Comment` (
  `comment_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `content` int(11) NOT NULL,
  `time_created` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Feedbacks`
--

CREATE TABLE `Feedbacks` (
  `id` int(255) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `postId` varchar(255) DEFAULT '0',
  `titlePost` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `content` longtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Feedbacks`
--

INSERT INTO `Feedbacks` (`id`, `userId`, `postId`, `titlePost`, `rating`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 'user123', '156a2341-66fb-443b-bc9c-27685554007e', 'áas', 4, 'sáasasa', '2023-12-19 20:54:31', '2023-12-19 20:54:31'),
(2, '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '156a2341-66fb-443b-bc9c-27685554007e', 'saasas', 3, 'asasas', '2023-12-19 21:03:31', '2023-12-19 21:03:31'),
(3, '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '156a2341-66fb-443b-bc9c-27685554007e', 'sa', 4, 'aaaaa', '2023-12-19 21:18:44', '2023-12-19 21:18:44'),
(4, '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '156a2341-66fb-443b-bc9c-27685554007e', 'saas', 3, 'asas', '2023-12-19 21:19:03', '2023-12-19 21:19:03');

-- --------------------------------------------------------

--
-- Table structure for table `Images`
--

CREATE TABLE `Images` (
  `id` varchar(255) NOT NULL,
  `image` longtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Images`
--

INSERT INTO `Images` (`id`, `image`, `createdAt`, `updatedAt`) VALUES
('02f612fa-37ac-44b3-8b1c-5a9b1a149a8d', '[\"https://res.cloudinary.com/djjv3stcm/image/upload/v1703326942/phongtro123/rxklfwwujyidceeliori.jpg\"]', '2023-12-23 10:25:55', '2023-12-23 10:25:55'),
('13e11421-68ca-4eb4-a6aa-405bffac1164', '[\"https://res.cloudinary.com/djjv3stcm/image/upload/v1686147546/phongtro123/sn7zthyznafnaefeeohb.png\",\"https://res.cloudinary.com/djjv3stcm/image/upload/v1686147613/phongtro123/z35smxpsan9erfzuajz0.jpg\"]', '2023-06-07 14:20:25', '2023-06-07 14:20:25'),
('3ffa01b8-9d4b-4d24-b5a7-c1989f6a8e41', '[\"https://res.cloudinary.com/djjv3stcm/image/upload/v1701776808/phongtro123/iz4ddmnlsdxvt7ola29v.jpg\"]', '2023-12-05 11:46:51', '2023-12-05 11:46:51'),
('91cba214-a377-4999-b065-9837befe397b', '[\"https://res.cloudinary.com/djjv3stcm/image/upload/v1686147742/phongtro123/ja9ok5afj7ebdjmoguhn.jpg\"]', '2023-06-07 14:22:21', '2023-06-07 14:22:21'),
('9fbf3ebf-b945-4a15-ab49-d1fc50705752', '[\"https://res.cloudinary.com/djjv3stcm/image/upload/v1702926223/phongtro123/eaar1ox4obdrjrbl3jjb.jpg\"]', '2023-12-18 19:03:46', '2023-12-18 19:03:46'),
('cdb408dd-5def-4dab-b467-317984dc36e6', '[\"https://res.cloudinary.com/djjv3stcm/image/upload/v1701776959/phongtro123/v6d4o8hc1jahvuihhz3b.jpg\"]', '2023-12-05 11:49:21', '2023-12-05 11:49:21'),
('dff974ae-b3e4-42df-b121-c451e2252a9c', '[\"https://res.cloudinary.com/djjv3stcm/image/upload/v1703326528/phongtro123/b1rkdxfomqnw8zpoywpr.jpg\"]', '2023-12-23 10:20:14', '2023-12-23 10:20:14');

-- --------------------------------------------------------

--
-- Table structure for table `Labels`
--

CREATE TABLE `Labels` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Labels`
--

INSERT INTO `Labels` (`id`, `code`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'OUOA', 'Phòng trọ Quận Cầu Giấy', '2023-06-07 14:20:25', '2023-06-07 14:20:25'),
(2, 'OUOH', 'Phòng trọ Phường Quan Hoa', '2023-06-07 14:22:21', '2023-06-07 14:22:21'),
(3, 'OTOI', 'Phòng trọ Quận Bắc Từ Liêm', '2023-12-05 11:46:51', '2023-12-05 11:46:51'),
(4, 'OARN', 'Phòng trọ Quận Ba Đình', '2023-12-05 11:49:21', '2023-12-05 11:49:21'),
(5, 'AHOĐ', 'Share phòng Huyện Hoài Đức', '2023-12-23 10:20:14', '2023-12-23 10:20:14'),
(6, 'ACNI', 'Share phòng Quận Bắc Từ Liêm', '2023-12-23 10:25:55', '2023-12-23 10:25:55');

-- --------------------------------------------------------

--
-- Table structure for table `Overviews`
--

CREATE TABLE `Overviews` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `bonus` varchar(255) DEFAULT NULL,
  `created` varchar(255) DEFAULT NULL,
  `expire` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Overviews`
--

INSERT INTO `Overviews` (`id`, `code`, `area`, `type`, `target`, `bonus`, `created`, `expire`, `createdAt`, `updatedAt`) VALUES
('487c9ba8-c18c-4c89-ad52-b02b72e918b2', '#864466', 'Share phòng Thành phố Hà Nội', 'Share phòng', 'Tất cả', 'Tin miễn phí', 'Thứ 7, 17:25 23/12/2023', 'Invalid date', '2023-12-23 10:25:55', '2023-12-23 10:32:37'),
('5806dcbb-9e46-40d6-8fb8-639cc64cb53b', '#549553', 'Phòng trọ Thành phố Hà Nội', 'Phòng trọ', 'Tất cả', 'Tin miễn phí', 'Thứ 3, 18:46 5/12/2023', 'Thứ 3, 18:46 12/12/2023', '2023-12-05 11:46:51', '2023-12-05 11:46:51'),
('639db6eb-0282-4eae-92ea-c9dd539a30bb', '#994393', 'Phòng trọ Thành phố Hà Nội', 'Phòng trọ', 'Tất cả', 'Tin miễn phí', 'Thứ 3, 2:3 19/12/2023', '30/12/2023', '2023-12-18 19:03:46', '2023-12-18 19:04:53'),
('65c5d64e-5dbc-44e2-b5a5-64093ea345ca', '#419359', 'Phòng trọQuận Cầu Giấy', 'Phòng trọ', 'Tất cả', 'Tin miễn phí', 'Thứ 4, 21:22 7/6/2023', '22/06/2023', '2023-06-07 14:22:21', '2023-06-07 15:22:25'),
('7e0a8b02-c7c3-4e5f-81cd-44ad93652ad3', '#844077', 'Phòng trọ Thành phố Hà Nội', 'Phòng trọ', 'Tất cả', 'Tin miễn phí', 'Thứ 3, 18:49 5/12/2023', '12/12/2023', '2023-12-05 11:49:21', '2023-12-05 11:50:30'),
('ab5ca46a-efdc-4e29-baaf-9cbb525a73a5', '#708717', 'Phòng trọ Thành phố Hà Nội', 'Phòng trọ', 'Tất cả', 'Tin miễn phí', 'Thứ 4, 21:20 7/6/2023', 'Thứ 4, 21:20 14/6/2023', '2023-06-07 14:20:25', '2023-06-07 14:20:25'),
('e97dbe28-2245-4090-bc62-adabb28f8239', '#711395', 'Share phòng Thành phố Hà Nội', 'Share phòng', 'Tất cả', 'Tin miễn phí', 'Thứ 7, 17:20 23/12/2023', 'Invalid date', '2023-12-23 10:20:14', '2023-12-23 10:32:40');

-- --------------------------------------------------------

--
-- Table structure for table `Positions`
--

CREATE TABLE `Positions` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PostLikes`
--

CREATE TABLE `PostLikes` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `postId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PostLikes`
--

INSERT INTO `PostLikes` (`id`, `userId`, `postId`, `createdAt`, `updatedAt`) VALUES
(2, '32e6e1b1-893c-4c12-a4b2-6ea4c78ab8ea', 'ebff2ccf-83a1-4186-80c9-10fc90bb3dde', '2023-12-05 11:50:45', '2023-12-05 11:50:45'),
(3, '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '9cf8cb68-e7fd-4614-b3ea-0b3486e6d327', '2023-12-07 03:03:22', '2023-12-07 03:03:22');

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `star` varchar(255) DEFAULT '0',
  `labelCode` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `attributeId` varchar(255) DEFAULT NULL,
  `priceCode` varchar(255) DEFAULT NULL,
  `areaCode` varchar(255) DEFAULT NULL,
  `provinceCode` varchar(255) DEFAULT NULL,
  `categoryCode` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `overviewId` varchar(255) DEFAULT NULL,
  `imageId` varchar(255) DEFAULT NULL,
  `priceNumber` float DEFAULT NULL,
  `areaNumber` float DEFAULT NULL,
  `utilities` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`id`, `title`, `star`, `labelCode`, `address`, `attributeId`, `priceCode`, `areaCode`, `provinceCode`, `categoryCode`, `description`, `status`, `userId`, `overviewId`, `imageId`, `priceNumber`, `areaNumber`, `utilities`, `createdAt`, `updatedAt`) VALUES
('156a2341-66fb-443b-bc9c-27685554007e', 'Cho thuê phòng', '3', 'OARN', 'số nhà 1,Phường Giảng Võ,Quận Ba Đình, Thành phố Hà Nội', '83b1eddf-d6c1-411f-9b04-58c0f9430373', NULL, NULL, 'NDOE', 'code123', '\"aa\"', 'checked', '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '639db6eb-0282-4eae-92ea-c9dd539a30bb', '9fbf3ebf-b945-4a15-ab49-d1fc50705752', 10, 50, '', '2023-12-18 19:03:46', '2023-12-18 19:04:53'),
('3590f3e0-5454-425b-9ec3-3ec4a5e8d81e', 'â', '0', 'AHOĐ', 'aa,Xã Cát Quế,Huyện Hoài Đức, Thành phố Hà Nội', '2e99de00-030b-4176-b05e-d930360fb637', NULL, NULL, 'NDOE', 'code 1234', '\"aa\"', 'unChecked', '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '42d35f70-7df7-489b-a713-b407ac33c3c1', '43e153d1-cb57-4104-90f3-07313dfa0374', 1, 10, '123', '2023-12-23 10:19:58', '2023-12-23 10:19:58'),
('4302c6ab-75fc-4cc5-bf86-ad4f867da866', 'aaa', '0', 'ACNI', 'aaaa,Phường Cổ Nhuế 2,Quận Bắc Từ Liêm, Thành phố Hà Nội', '38c74aba-582f-4578-acb5-140450755d47', NULL, NULL, 'NDOE', 'code 1234', '\"aaaaa\"', 'checked', '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '487c9ba8-c18c-4c89-ad52-b02b72e918b2', '02f612fa-37ac-44b3-8b1c-5a9b1a149a8d', 1, 10, 'Tủ lạnh|Máy giặt|Nóng lạnh', '2023-12-23 10:25:55', '2023-12-23 10:32:37'),
('60cedf42-39c0-44de-a79e-e857ed4e3c9b', 'Cho thuê phòng trọ', '0', 'OTOI', 'số nhà 1,Phường Cổ Nhuế 1,Quận Bắc Từ Liêm, Thành phố Hà Nội', 'bc2724ec-f373-43ef-bceb-1f9aaef2541a', NULL, NULL, 'NDOE', 'code123', '\"Cho thuê phòng trọ full nội thất\"', 'unChecked', '32e6e1b1-893c-4c12-a4b2-6ea4c78ab8ea', '5806dcbb-9e46-40d6-8fb8-639cc64cb53b', '3ffa01b8-9d4b-4d24-b5a7-c1989f6a8e41', 1, 20, '', '2023-12-05 11:46:51', '2023-12-05 11:46:51'),
('819a3f5e-99e5-45af-8024-d636c0b2c7cd', 'â', '0', 'AHOĐ', 'aa,Xã Cát Quế,Huyện Hoài Đức, Thành phố Hà Nội', '64e7c99b-0fe0-4292-b395-13e470c24c1a', NULL, NULL, 'NDOE', 'code 1234', '\"aa\"', 'checked', '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', 'e97dbe28-2245-4090-bc62-adabb28f8239', 'dff974ae-b3e4-42df-b121-c451e2252a9c', 1, 10, '123', '2023-12-23 10:20:14', '2023-12-23 10:32:40'),
('9cf8cb68-e7fd-4614-b3ea-0b3486e6d327', 'Cho thuê phòng trọ giá rẻ', '0', 'OUOH', 'số nhà 51, ngõ 165 đường dương quảng hàm,Phường Quan Hoa,Quận Cầu Giấy, Thành phố Hà Nội', '72f69ace-5526-47da-bbd2-207fbc30db95', NULL, NULL, 'NDOE', 'code123', '\"Cho thuê phòng trọ giá rẻ\"', 'checked', '457fb5e0-ac7c-43ec-ace1-74a4e8e7cd12', '65c5d64e-5dbc-44e2-b5a5-64093ea345ca', '91cba214-a377-4999-b065-9837befe397b', 3, 20, '', '2023-12-07 14:22:21', '2023-12-07 15:22:25'),
('ebff2ccf-83a1-4186-80c9-10fc90bb3dde', 'Cho thuê phòng trọ', '0', 'OARN', 'Số nhà 1,Phường Cống Vị,Quận Ba Đình, Thành phố Hà Nội', '02955fe2-a99d-4610-abdc-bcae9bf2e0f1', NULL, NULL, 'NDOE', 'code123', '\"Cho thuê phòng trọ \"', 'checked', '6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', '7e0a8b02-c7c3-4e5f-81cd-44ad93652ad3', 'cdb408dd-5def-4dab-b467-317984dc36e6', 1, 20, '', '2023-12-05 11:49:21', '2023-12-05 11:50:30');

-- --------------------------------------------------------

--
-- Table structure for table `Prices`
--

CREATE TABLE `Prices` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Provinces`
--

CREATE TABLE `Provinces` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Provinces`
--

INSERT INTO `Provinces` (`id`, `code`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'NDOE', 'Hà Nội', '2023-06-07 14:20:25', '2023-06-07 14:20:25');

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('create-area.js'),
('create-attribute.js'),
('create-category.js'),
('create-feedback.js'),
('create-image.js'),
('create-label.js'),
('create-overview.js'),
('create-position.js'),
('create-post.js'),
('create-postLike.js'),
('create-price.js'),
('create-province.js'),
('create-role.js'),
('create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `zalo` varchar(255) DEFAULT NULL,
  `fbUrl` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `roleCode` varchar(255) DEFAULT 'R2',
  `positionCode` varchar(255) DEFAULT 'P1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `password`, `phone`, `zalo`, `fbUrl`, `avatar`, `roleCode`, `positionCode`, `createdAt`, `updatedAt`) VALUES
('32e6e1b1-893c-4c12-a4b2-6ea4c78ab8ea', 'Admin', '$2a$12$5aenhykmyMuVOCIykKiqxufCLNc/00EYF8THCd368SIK4osCPPCzq', '0123456789', NULL, NULL, NULL, 'R1', 'P2', '2023-06-07 14:23:47', '2023-12-18 19:48:54'),
('457fb5e0-ac7c-43ec-ace1-74a4e8e7cd12', 'Datist Pham', '$2a$12$KCfQNZMtCaAQqp48XsM8Ve8XHBHDMU7PKqwEysV/9ht7KnbJnCJIi', '0384294882', '01832983912', 'https://facebook.com/123', 'https://res.cloudinary.com/djjv3stcm/image/upload/v1686151132/phongtro123/zjxwuawqc4v4l4i9phgp.png', 'R2', 'P1', '2023-06-07 14:17:34', '2023-06-07 15:22:50'),
('55659d58-38f8-40e3-97ea-c8a62ac58ee3', 'Datist Pham', '$2a$12$plVvc52Z7NRfC3q1wP53guiw4lQQGEPZqpfzsE/d6H7bsN/oY0UgW', '0388029483', NULL, NULL, NULL, 'R1', 'P1', '2023-06-03 12:06:39', '2023-12-07 02:57:33'),
('6cfe9b27-63c1-4c89-a8d4-cbd8a35b9f62', 'Dat', '$2a$12$iOBUCcfYCZxJRnR.7Qi6m.cpDTqGHKyfy6VI0gPFbjx2K7FqFI1s.', '0123456780', '', '', 'https://res.cloudinary.com/djjv3stcm/image/upload/v1701776973/phongtro123/ropmifxvgol6n6qqh5ms.jpg', 'R2', 'P1', '2023-12-05 11:48:29', '2023-12-05 11:49:34'),
('dd10d060-c0c0-4482-b789-6457a7dcdcd9', 'Datist Pham', '$2a$12$wHNkMlDwLgT0xxa2.h.K6.IVRwwy31Sybg8ld6NxLPxwMlsWcOOay', '0383491381', '', '', 'https://res.cloudinary.com/djjv3stcm/image/upload/v1702216065/phongtro123/kzd4ga7k32ohrdhp33ny.svg', 'R2', 'P1', '2023-12-10 13:46:52', '2023-12-10 13:47:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Areas`
--
ALTER TABLE `Areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Attributes`
--
ALTER TABLE `Attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Images`
--
ALTER TABLE `Images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Labels`
--
ALTER TABLE `Labels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Overviews`
--
ALTER TABLE `Overviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Positions`
--
ALTER TABLE `Positions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PostLikes`
--
ALTER TABLE `PostLikes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Prices`
--
ALTER TABLE `Prices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Provinces`
--
ALTER TABLE `Provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Areas`
--
ALTER TABLE `Areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Labels`
--
ALTER TABLE `Labels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Positions`
--
ALTER TABLE `Positions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PostLikes`
--
ALTER TABLE `PostLikes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Prices`
--
ALTER TABLE `Prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Provinces`
--
ALTER TABLE `Provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
