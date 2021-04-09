-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 08, 2021 at 01:02 AM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `markkeeb_wip`
--

-- --------------------------------------------------------

--
-- Table structure for table `Accounts`
--

CREATE TABLE `Accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `personal_website_url` varchar(255) DEFAULT NULL,
  `account_type` varchar(255) DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT curdate(),
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Accounts`
--

INSERT INTO `Accounts` (`id`, `email`, `password`, `display_name`, `personal_website_url`, `account_type`, `created_at`, `profile_picture`) VALUES
(6, 'testtest@gmail.com', 'Testtest123', 'Testtest123', NULL, 'user', '2021-04-01 04:00:00', NULL),
(8, 'darkside312@gmail.com', 'Darkside312@gmail.com', 'darkside312@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(9, 'justiceleague666@gmail.com', 'Justiceleague666@gmail.com', 'justiceleague666@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(11, 'hodor93@gmail.com', 'Hodor93@gmail.com', 'hodor93@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(14, 'adhd14145@gmail.com', 'Adhd14145@gmail.com', 'adhd14145@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(15, 'ayo112@gmail.com', 'Ayo112@gmail.com', 'ayo112@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(16, 'yaya123@gmail.com', 'Yaya123@gmail.com', 'yaya1234124', '', 'user', '2021-04-04 04:00:00', NULL),
(17, 'runningoutoftime1212@gmail.com', 'Runningoutoftime1212@gmail.com', 'runningoutoftime1212@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(18, 'pain12@gmail.com', 'Pain12@gmail.com', 'pain12@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(19, 'yaya71@gmail.com', 'Yaya71@gmail.com', 'yaya71@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(20, 'bruh12@gmail.com', 'Bruh12@gmail.com', 'bruh12@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(21, 'bruhuh12@gmail.com', 'Bruhuh12@gmail.com', 'bruhuh12@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(22, 'wahoo122@gmail.com', 'Wahoo122@gmail.com', 'wahoo122@gmail.com', NULL, 'user', '2021-04-04 04:00:00', NULL),
(31, 'admin@admin.com', 'Admin123!', 'Administrator', NULL, 'admin', '2021-04-07 04:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Account_Comments`
--

CREATE TABLE `Account_Comments` (
  `id` int(11) NOT NULL,
  `user_made_comment_id` int(11) DEFAULT NULL,
  `user_recieved_comment_id` int(11) DEFAULT NULL,
  `comment_content` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Account_Comments`
--

INSERT INTO `Account_Comments` (`id`, `user_made_comment_id`, `user_recieved_comment_id`, `comment_content`) VALUES
(1, 4, 5, 'this guy is great'),
(2, 4, 5, 'i loved working with you!~'),
(3, 21, 15, 'hope all is well with you!');

-- --------------------------------------------------------

--
-- Table structure for table `Account_Projects`
--

CREATE TABLE `Account_Projects` (
  `account_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Account_Projects`
--

INSERT INTO `Account_Projects` (`account_id`, `project_id`) VALUES
(7, 2),
(7, 5),
(7, 6),
(7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Endpoints`
--

CREATE TABLE `Endpoints` (
  `id` int(11) NOT NULL,
  `method` varchar(255) DEFAULT NULL,
  `endpoint` varchar(255) DEFAULT NULL,
  `uses` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Endpoints`
--

INSERT INTO `Endpoints` (`id`, `method`, `endpoint`, `uses`) VALUES
(1, 'GET', '/API/v1/admin', 46),
(2, 'GET', '/API/v1/profile/:id', 350),
(3, 'GET', '/API/v1/projects/fetch', 83),
(4, 'PUT', '/API/v1/projects/:id', 2),
(5, 'PUT', '/API/v1/profile/:id', 1),
(6, 'DELETE', '/API/v1/profile/:id/delete', 5),
(7, 'DELETE', '/API/v1/profile/:userId/projects/:projId/leave', 9),
(8, 'POST', '/API/v1/profile/:id/comment', 3),
(9, 'POST', '/API/v1/projects/create', 9),
(10, 'POST', '/API/v1/signup', 29),
(11, 'GET', '/API/v1/profile/:id/projects', 51),
(12, 'GET', '/API/v1/profile/:id/comments', 145),
(13, 'POST', '/API/v1/authenticate', 40),
(14, 'POST', '/API/v1/profile/:userId/:projectId', 8),
(15, 'DELETE', '/API/v1/profile/:userId/projects/:projId/delete', 2),
(16, 'GET', '/API/v1/profile/:userId/projects/:projId', 54),
(17, 'GET', '/API/v1/projects/:id', 56),
(18, 'GET', '/API/v1/profile/:id/projects/owned', 29);

-- --------------------------------------------------------

--
-- Table structure for table `Projects`
--

CREATE TABLE `Projects` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `tag_list` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Projects`
--

INSERT INTO `Projects` (`id`, `owner_id`, `title`, `description`, `tag_list`) VALUES
(2, 5, 'other title', 'new description', 'this,is,new'),
(3, 5, 'wasd', 'wasdwasd', 'wasdwasdwasd'),
(4, 5, 'fathomland', 'cool game!', 'water,liquid,funneh,story'),
(9, 16, 'The Nerds', 'a forum', 'forum,talk,conversation,upvote');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Accounts`
--
ALTER TABLE `Accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Account_Comments`
--
ALTER TABLE `Account_Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_MadeCommentUser` (`user_made_comment_id`),
  ADD KEY `FK_RecievedCommentUser` (`user_recieved_comment_id`);

--
-- Indexes for table `Account_Projects`
--
ALTER TABLE `Account_Projects`
  ADD PRIMARY KEY (`account_id`,`project_id`),
  ADD KEY `FK_ProjectID` (`project_id`);

--
-- Indexes for table `Endpoints`
--
ALTER TABLE `Endpoints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Projects`
--
ALTER TABLE `Projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ProjectOwner` (`owner_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Accounts`
--
ALTER TABLE `Accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `Account_Comments`
--
ALTER TABLE `Account_Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Endpoints`
--
ALTER TABLE `Endpoints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Projects`
--
ALTER TABLE `Projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
