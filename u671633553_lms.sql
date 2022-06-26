-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 08, 2022 at 09:58 AM
-- Server version: 10.5.12-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u671633553_chatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `user_id` int(11) DEFAULT NULL,
  `sns_name` text DEFAULT NULL,
  `meeting_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `no_of_people_attended` int(11) DEFAULT NULL,
  `no_of_new_people_attended` int(11) DEFAULT NULL,
  `meeting_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `attendees`
--

CREATE TABLE `attendees` (
  `meeting_row_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_first_name` text DEFAULT NULL,
  `user_last_name` text DEFAULT NULL,
  `meeting_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendees`
--

INSERT INTO `attendees` (`meeting_row_id`, `user_id`, `user_first_name`, `user_last_name`, `meeting_id`) VALUES
(1, 2, 'Nayana', 'das', 22),
(6, 3, 'rahul', 'v', 23);

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `category` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` text DEFAULT NULL,
  `approval_status` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`blog_id`, `title`, `category`, `description`, `image_url`, `created_by_user_id`, `created_date`, `modified_by`, `modified_on`, `status`, `approval_status`) VALUES
(1, 'title', '1', 'The Church of South India (CSI) is a united Protestant Church, being the second-largest Christian church in India based on the number of members; it is the result of union of a number of Protestant churches in South India.\n\nThe Church of South India is the successor of a number of Protestant denominations in India, including the Church of England, Church of India, Burma and Ceylon (Anglican), the United Church of Christ (Congregationalist), the British Methodist Church and the Church of Scotland after Indian Independence. It combined the South India United Church (union of the British Congregationalists and the British Presbyterians); the then 14&nbsp;<a href=\"https://google.com\" target=\"_blank\">Anglican</a>&nbsp;Dioceses of South India and one in Sri Lanka; and the South Indian District of the Methodist church.With a membership of nearly four million,[4][5] CSI is one of four united Protesant churches in the Anglican Communion, the others being the Church of North India, the Church of Pakistan and the Church of Bangladesh; it also is a member of the World Methodist Council and World Communion of Reformed Churches.', '/uploads/blogs/blog_abc.png', 1, '2021-04-28 16:27:33', 1, '2021-05-18 18:09:34', 'Enable', 'Y'),
(14, 'Test Blog 23', '1', '<p style=\"margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(32, 33, 34); font-family: sans-serif;\">The&nbsp;<b>Assemblies of God</b>&nbsp;(<b>AG</b>), officially the&nbsp;<b>World Assemblies of God Fellowship</b>, is a group of over 144 autonomous self-governing national groupings of churches that together form the world largest&nbsp;<a href=\"https://en.wikipedia.org/wiki/Pentecostalism\" title=\"Pentecostalism\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Pentecostal</a>&nbsp;<a href=\"https://en.wikipedia.org/wiki/Christian_denomination\" title=\"Christian denomination\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">denomination</a>.&nbsp;It is the fourth largest international&nbsp;<a href=\"https://en.wikipedia.org/wiki/Christianity\" title=\"Christianity\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Christian</a>&nbsp;group of denominations.</p><p style=\"margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(32, 33, 34); font-family: sans-serif;\">As an international fellowship, the member denominations are entirely independent and autonomous, but they are united by shared beliefs and history. The Assemblies originated from the&nbsp;<a href=\"https://en.wikipedia.org/wiki/Azusa_Street_Revival\" title=\"Azusa Street Revival\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Azusa Street Revival</a>&nbsp;of the early 20th century. This revival led to the founding of the&nbsp;<a href=\"https://en.wikipedia.org/wiki/Assemblies_of_God_USA\" title=\"\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Assemblies of God in the United States</a>&nbsp;in 1914. Through foreign&nbsp;<a href=\"https://en.wikipedia.org/wiki/Missionary\" title=\"Missionary\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">missionary</a>&nbsp;work and establishing relationships with other Pentecostal churches, the Assemblies of God expanded into a worldwide movement. It was not until 1988 that the world fellowship was formed. As a Pentecostal fellowship, the Assemblies of God believes in the Pentecostal distinctive of&nbsp;<a href=\"https://en.wikipedia.org/wiki/Baptism_with_the_Holy_Spirit\" title=\"Baptism with the Holy Spirit\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">baptism with the Holy Spirit</a>&nbsp;with the evidence of&nbsp;<a href=\"https://en.wikipedia.org/wiki/Speaking_in_tongues\" title=\"Speaking in tongues\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">speaking in tongues</a>.</p>', NULL, 1, '2021-05-12 22:25:07', 1, '2021-05-13 12:18:12', 'Enable', 'N'),
(18, 'Jesus - The name above all name', '1', '<p style=\"margin-bottom: 27px; color: rgb(65, 65, 66); font-family: &quot;Libre Baskerville&quot;, serif; font-size: 18px;\">God exalted him to the highest place and gave him the name that is above every name, that at the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue acknowledge that Jesus Christ is Lord, to the glory of God the Father.&nbsp;<strong> <a class=\"rtBibleRef\" href=\"https://biblia.com/bible/niv/Phil%202.9-11\" data-reference=\"Phil 2.9-11\" data-version=\"niv\" data-purpose=\"bible-reference\" target=\"_blank\" style=\"color: rgb(71, 111, 182); overflow-wrap: break-word;\">Philippians 2:9-11&nbsp;NIV</a></strong></p><p style=\"margin-bottom: 27px; color: rgb(65, 65, 66); font-family: &quot;Libre Baskerville&quot;, serif; font-size: 18px;\">You will conceive and give birth to a son, and you will name him Jesus.&nbsp;<strong> <a class=\"rtBibleRef\" href=\"https://biblia.com/bible/nlt/Luke%201.31\" data-reference=\"Luke 1.31\" data-version=\"nlt\" data-purpose=\"bible-reference\" target=\"_blank\" style=\"color: rgb(71, 111, 182); overflow-wrap: break-word;\">Luke 1:31&nbsp;NLT</a></strong></p><p style=\"margin-bottom: 27px; color: rgb(65, 65, 66); font-family: &quot;Libre Baskerville&quot;, serif; font-size: 18px;\">My favorite line of all: “you are to give him the name Jesus” (<a class=\"rtBibleRef\" href=\"https://biblia.com/bible/esv/Luke%201.31\" data-reference=\"Luke 1.31\" data-version=\"esv\" data-purpose=\"bible-reference\" target=\"_blank\" style=\"color: rgb(71, 111, 182); overflow-wrap: break-word;\">Luke 1:31</a>). Do you realize this was the first proclamation of our Savior’s personal name since the beginning of time? Jesus… A name by which I’ve made every single prayerful petition of my life. A name that has meant my absolute salvation, not only from eternal destruction, but from myself. A name with power like no other name. Jesus.&nbsp;</p>', '/uploads/blogs/blog_Jesus---The-name-above-all-name_1_12_5_2021_22_28_32.jpg', 1, '2021-05-13 03:17:32', 1, '2021-05-13 03:19:54', 'Enable', 'Y'),
(20, 'test drive blog - 1', '2', 'testing the blog upload section', '/uploads/blogs/blog_test-drive-blog---1_2_12_5_2021_22_32_26.jpg', 1, '2021-05-13 03:32:45', NULL, NULL, 'Enable', 'N'),
(25, 'Role of a leader', '1', '<p>Leadership is the art of motivating a group of people to act toward achieving a common goal. In a business setting, this can mean directing workers and colleagues with a strategy to meet the company needs.<span style=\"background-color: transparent;\">Here what you need to know about leadership, and some examples of how it can benefit businesses.</span></p><p><br></p><h1><u>What Is Leadership?</u></h1><p>Leadership captures the essentials of being able and prepared to inspire others. Effective leadership is based upon ideas—both original and borrowed—that are effectively communicated to others in a way that engages them enough to act as the leader wants them to act.</p><p>A leader inspires others to act while simultaneously directing the way that they act. They must be personable enough for others to follow their orders, and they must have the critical thinking skills to know the best way to use the resources at an organization disposal.</p><p>Alternate definition: Leadership may also refer to an organization management structure.</p>', '/uploads/blogs/blog_Role-of-a-leader_1_13_5_2021_2_20_28.jpg', 1, '2021-05-13 07:04:34', 1, '2021-05-13 07:20:36', 'Enable', 'Y'),
(26, 'Test Blog Today', '1', 'Test Blog', '', 2, '2021-05-14 18:01:14', NULL, NULL, 'Enable', 'N'),
(27, 'Book of Joshua', '2', 'Study on Book of Joshua is now available.', '/uploads/blogs/blog_Book-of-Joshua_2_20_5_2021_9_10_57.png', 1, '2021-05-20 14:11:00', 1, '2021-05-20 14:11:53', 'Enable', 'Y'),
(28, 'Book of Joshua', '2', 'Study on Book of Joshua is now available.', '/uploads/blogs/blog_Book-of-Joshua_2_20_5_2021_9_10_57.png', 1, '2021-05-20 14:11:13', NULL, NULL, 'Enable', 'N');

-- --------------------------------------------------------

--
-- Table structure for table `blog_category`
--

CREATE TABLE `blog_category` (
  `category_id` int(11) NOT NULL,
  `category_name` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog_category`
--

INSERT INTO `blog_category` (`category_id`, `category_name`, `created_by`, `created_on`, `modified_by`, `modified_on`) VALUES
(1, 'Leadership', 2, '2021-05-05 21:06:08', NULL, NULL),
(2, 'Outreach', 2, '2021-05-05 16:17:13', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `calendar_id` int(11) NOT NULL,
  `event_name` text DEFAULT NULL,
  `event_start_date` timestamp NULL DEFAULT NULL,
  `event_end_date` timestamp NULL DEFAULT NULL,
  `venue_name` mediumtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`calendar_id`, `event_name`, `event_start_date`, `event_end_date`, `venue_name`, `description`, `created_by`, `created_on`) VALUES
(1, 'Teachers meet', '2021-05-16 16:00:00', '2021-05-16 18:00:00', 'Bethel AG Church, No 67, Outer Ring Rd, Vayunandana Layout, Hebbal Kempapura, Bengaluru, Karnataka 560024', 'Answers in Genesis is an apologetics ministry, dedicated to helping Christians defend their faith and proclaim the gospel of Jesus Christ.  They focus on providing answers to questions about the Bible—particularly the book of Genesis—regarding key issues such as creation, evolution, science, and the age of the earth.', 2, '2021-05-07 22:12:45'),
(2, 'Test Event', '2021-05-15 01:16:00', '2021-05-15 01:16:00', 'Test', 'Test', 2, '2021-05-07 19:47:10'),
(3, 'TGIF', '2021-05-21 22:08:00', '2021-05-21 22:08:00', 'On Google meet', 'Please have stable internet', 2, '2021-05-20 16:39:35'),
(4, 'abc', '2021-06-04 13:41:00', '2021-06-04 13:42:00', ' ', '', 2, '2021-06-03 08:12:46'),
(5, 'abc', '2021-06-04 19:11:00', '2021-06-04 19:12:00', ' ', '', 2, '2021-06-03 08:29:28'),
(6, 'proverbs', '2021-06-07 12:19:00', '2021-06-04 19:12:00', ' canaan ventures', 'bible study', 2, '2021-06-07 06:50:27'),
(7, 'meet', '2021-06-08 12:22:00', '2021-07-10 12:21:00', 'bang', '.', 2, '2021-06-07 06:53:00'),
(8, 'event', '2021-06-11 15:25:00', '2021-06-17 03:28:00', ' canaan ventures', 'bible study', 2, '2021-06-07 06:56:11'),
(9, 'lms', '2021-06-07 12:25:00', '2021-06-10 12:26:00', ' canaan ventures', 'testing', 2, '2021-06-07 06:56:19'),
(10, 'proverbs', '2021-06-07 12:25:00', '2021-06-05 00:42:00', ' canaan ventures', 'bible study', 2, '2021-06-07 06:59:25');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `blog_id` int(11) DEFAULT NULL,
  `blog_comment` longtext DEFAULT NULL,
  `name` text DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `added_on` timestamp NULL DEFAULT NULL,
  `approved_on` timestamp NULL DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `approval_status` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `blog_id`, `blog_comment`, `name`, `email_id`, `added_on`, `approved_on`, `approved_by`, `approval_status`) VALUES
(1, 1, 'This is a test blog', 'Reuben Jathanna', 'rbnjathanna@gmail.com', '2021-05-11 14:33:56', '2021-05-11 17:27:38', 2, 'Y'),
(2, 1, 'Test comment', 'Abraham Tyagaraj', 'abraham@vecan.co', '2021-05-11 14:06:56', '2021-05-12 18:23:16', 2, 'N'),
(3, 1, 'Test comment', 'Abraham Tyagaraj', 'abraham@vecan.co', '2021-05-11 14:07:05', '2021-05-11 14:08:00', 2, 'N'),
(4, 1, 'Test comment', 'Abraham Tyagaraj', 'abraham@vecan.co', '2021-05-11 14:07:07', '2021-05-11 14:08:03', 2, 'N'),
(5, 18, 'Test Comment - it is in red wrong colour', 'Abraham Tyagaraj', 'abraham@vecan.co', '2021-05-14 00:00:19', '2021-05-14 18:11:10', 2, 'N'),
(6, 1, 'This is a best blog I ever went through', 'Ruby', 'reuben@vecan.co', '2021-05-14 05:54:57', NULL, NULL, 'D'),
(7, 1, 'This is a best blog I ever went through', 'Ruby', 'reuben@vecan.co', '2021-05-14 05:55:26', NULL, NULL, 'D'),
(8, 1, 'Excellent blog', 'Ruby', 'reubenjathanna1991@gmail.com', '2021-05-14 05:56:47', NULL, NULL, 'D'),
(9, 1, 'Test Blog', 'Abraham Tyagaraj', 'abraham@vecan.co', '2021-05-14 18:06:02', '2021-05-14 18:06:39', 2, 'Y'),
(10, 18, 'Dont Post it', 'Abraham Tyagaraj', 'abraham@vecan.co', '2021-05-14 18:10:40', NULL, NULL, 'D');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `salutation` tinytext DEFAULT NULL,
  `contact_first_name` text DEFAULT NULL,
  `contact_last_name` text DEFAULT NULL,
  `contact_email_id` varchar(50) DEFAULT NULL,
  `contact_number` text DEFAULT NULL,
  `contact_state` mediumtext DEFAULT NULL,
  `contact_city` mediumtext DEFAULT NULL,
  `contact_referrer` mediumtext DEFAULT NULL,
  `contact_address` longtext DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `salutation`, `contact_first_name`, `contact_last_name`, `contact_email_id`, `contact_number`, `contact_state`, `contact_city`, `contact_referrer`, `contact_address`, `event_id`, `created_date`) VALUES
(1, 'Mr.', 'Reuben', 'Jathanna', 'rbnjathanna@gmail.com', '9167908331', 'Maharashtra', 'Mumbai', 'Reuben', 'Dombivli (west)', 8, '2021-04-20 02:57:37'),
(4, NULL, 'abc', 'test', 'saran@vecan.co', '9565564464', NULL, NULL, NULL, 'Sagar Apartment, Lokhandwala, Andheri(West)', 8, '2021-04-23 01:52:02'),
(5, 'undefined', NULL, 'Jathanna', 'reuben@vecan.co', '9167908331', 'Maharashtra', ' Mumbai ', 'Reuben', 'Dombivli(west)', 8, '2021-04-23 03:04:05'),
(6, 'undefined', 'Reuben', 'Jathanna', 'reuben@vecan.co', '9167908331', 'Maharashtra', ' Mumbai ', 'Reuben', 'Dombivli(west)', 8, '2021-04-23 03:05:17'),
(10, 'Mr.', 'Test', 'Rest', 'test2@test.com', '99785757575', 'Andhra Pradesh', ' Amalapuram ', 'Reuben Jathanna', 'House No. 15, Amalapuram port, Amalapuram', 8, '2021-04-23 19:38:39'),
(13, 'Mr.', 'Reuben', 'Jathanna', 'test1@test.com', '97786765686', 'Andaman & Nicobar', ' Andaman Island ', 'Reuben Jathanna', 'Test Address', 8, '2021-04-23 16:23:53'),
(15, 'Mr.', 'Abraham', 'Tyagaraj', 'abraham@vecan.co', '07506038985', 'Tamil Nadu', ' Chennai ', 'Suni Dawson', '93 Jai Hind Appatrment', 8, '2021-04-23 17:57:15');

-- --------------------------------------------------------

--
-- Table structure for table `contact_event`
--

CREATE TABLE `contact_event` (
  `contact_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_event`
--

INSERT INTO `contact_event` (`contact_id`, `event_id`, `created_date`) VALUES
(1, 8, '2021-04-20 18:07:29'),
(1, 8, '2021-04-20 20:06:04'),
(1, 8, '2021-04-21 20:24:03'),
(4, 8, '2021-04-23 02:50:29'),
(4, 8, '2021-04-23 02:50:38'),
(4, 8, '2021-04-23 02:50:42'),
(4, 8, '2021-04-23 02:50:48'),
(4, 8, '2021-04-23 02:51:55'),
(5, 8, '2021-04-23 03:05:21'),
(5, 8, '2021-04-23 03:12:30'),
(1, 8, '2021-04-23 16:22:17'),
(13, 8, '2021-04-23 16:23:55'),
(13, 8, '2021-04-23 16:23:57'),
(15, 8, '2021-04-23 17:57:17');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_name` text DEFAULT NULL,
  `event_start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `event_end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `cost_per_person` int(11) DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `venue_name` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `event_status_id` int(11) DEFAULT NULL,
  `event_type_id` int(11) DEFAULT NULL,
  `poster_url` varchar(255) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_user_id` int(11) DEFAULT NULL,
  `modified_user_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `event_start_date`, `event_end_date`, `cost_per_person`, `venue_id`, `venue_name`, `description`, `event_status_id`, `event_type_id`, `poster_url`, `created_by_user_id`, `created_date`, `modified_user_id`, `modified_user_date`, `status`) VALUES
(8, 'Youth Fellowship', '2021-05-27 18:12:11', '2021-04-07 00:00:00', 1000, 1, 'DNC School Ground, Pandurangawadi, Near Pragati College, Dombivli(East)', 'This is a youth fellowship which is held in Mumbai. Its a UBM youth fellowship prayer session', 1, 1, '/uploads/events/event_1_2021_04_10_10_00.jpg', 1, '2021-03-19 04:47:02', 1, '2021-05-14 18:17:16', 'Enable'),
(9, 'Annual Gathering', '2021-05-27 18:12:11', '2021-04-05 06:00:00', 1000, NULL, 'Ambernath Ground, Ambernath (East)', 'This is an annual Singand share social Gathering', 3, 3, '', 1, '2021-05-04 22:40:05', 2, '2021-05-20 15:50:53', 'Enable'),
(10, 'Test Event 123', '2021-05-27 18:12:11', '2021-04-06 10:06:00', 200, NULL, 'Test', 'test', 2, 2, '', 1, '2021-05-05 01:06:52', 1, '2021-05-09 18:42:09', 'Disable'),
(11, 'Test Event 123', '2021-05-27 18:12:11', '2021-05-30 03:15:00', 200, NULL, 'test', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 1, 5, '', 2, '2021-05-05 16:16:25', 2, '2021-05-07 01:15:25', 'Enable'),
(12, 'Womes Meeting', '2021-05-27 18:12:11', '2021-05-24 01:00:00', 100, NULL, 'Christ Church, Clare Road, Byculla, Mumbai, Maharashtra 400008', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 3, '', 1, '2021-05-07 01:58:46', 1, '2021-05-07 21:42:55', 'Enable'),
(13, 'Sunday School Retreat', '2021-05-27 18:12:11', '2021-06-03 23:30:00', 500, NULL, 'Della Resort, Kunegaon, Kune Village, Lonavala, India, 410401', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 2, '', 1, '2021-05-07 07:34:10', 1, '2021-05-07 21:42:28', 'Enable'),
(14, 'Elders Meeting', '2021-05-27 18:12:11', '2021-06-28 04:30:00', 0, NULL, 'Evangelical Church Of India, Commerce Center, 404-407 Evangelical Church Of India, Tandon Rd, Ramnagar, Dombivli East, Dombivli, Maharashtra 421201', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 3, '', 1, '2021-05-07 07:42:37', 1, '2021-05-20 15:51:02', 'Enable');

-- --------------------------------------------------------

--
-- Table structure for table `event_status`
--

CREATE TABLE `event_status` (
  `event_status_id` int(11) NOT NULL,
  `event_status` text DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by_user_id` int(11) DEFAULT NULL,
  `modified_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_status`
--

INSERT INTO `event_status` (`event_status_id`, `event_status`, `created_by_user_id`, `created_date`, `modified_by_user_id`, `modified_date`) VALUES
(1, 'On Going', 1, '2021-03-18 04:45:05', 1, '2021-03-18 04:45:05'),
(2, 'Cancelled', 1, '2021-03-18 04:45:17', 1, '2021-03-18 04:45:17'),
(3, 'On Hold', 1, '2021-03-18 04:45:29', 1, '2021-03-18 04:45:29');

-- --------------------------------------------------------

--
-- Table structure for table `event_type`
--

CREATE TABLE `event_type` (
  `EventTypeID` int(11) NOT NULL,
  `EventType` text DEFAULT NULL,
  `CreatedByUserID` int(11) DEFAULT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `ModifiedByUserID` int(11) DEFAULT NULL,
  `ModifiedDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_type`
--

INSERT INTO `event_type` (`EventTypeID`, `EventType`, `CreatedByUserID`, `CreatedDate`, `ModifiedByUserID`, `ModifiedDate`) VALUES
(1, 'Concert', 1, '2021-03-18 04:23:59', 1, '2021-03-18 04:23:59'),
(2, 'Prayer Session', 1, '2021-03-18 04:40:33', 1, '2021-03-18 04:40:33'),
(3, 'Annual Gathering', 1, '2021-03-18 06:31:35', 1, '2021-03-18 06:31:35'),
(4, 'Test Events Type', 1, '2021-05-05 19:13:08', 1, '2021-05-05 19:13:08'),
(5, 'Sports', 2, '2021-05-05 16:15:06', NULL, '2021-05-05 11:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `generateClassCode`
--

CREATE TABLE `generateClassCode` (
  `code_id` int(11) NOT NULL,
  `course_name` text DEFAULT NULL,
  `class_start_date` char(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `generateClassCode`
--

INSERT INTO `generateClassCode` (`code_id`, `course_name`, `class_start_date`) VALUES
(1, 'Mind_of_a_Leader', '62021'),
(2, 'Mind_of_a_Leader', '52021'),
(3, 'Mind_of_a_Leader', '52021'),
(4, 'ADVENTURE_SERIES_LEVEL_1', '72021'),
(5, 'STUDYING_THE_BIBLE', '62021'),
(6, 'THE_CHRISTIAN_LIFE', '62021'),
(7, 'DISCIPLESHIP_SERIES', '52021'),
(8, 'DISCOVERY_SERIES_LEVEL_1', '52021'),
(9, 'GALATIANS', '72021'),
(10, 'DISCOVERY_SERIES_LEVEL_1', '62021'),
(11, 'Finding_Purpose', '62021'),
(12, 'Discovering_your_Identity', '72021'),
(13, 'Identify_your_calling', '62021'),
(14, 'DISCOVERY_SERIES_LEVEL_2', '62021'),
(15, 'Mind_of_a_Leader', '62021'),
(16, 'DISCOVERY_SERIES_LEVEL_2', '62021'),
(17, 'ROMANS', '62021'),
(18, 'Finding_Purpose', '62021'),
(19, 'Finding_Purpose', '62021'),
(20, 'Mind_of_a_Leader', '62021'),
(21, 'Mind_of_a_Leader', '62021'),
(22, 'EXPLORER_SERIES', '62021'),
(23, 'CHARACTER_SOLUTIONS', 'NaNNaN'),
(24, 'Mind_of_a_Leader', '62021'),
(25, 'Book_of_Psalm', '62021'),
(26, 'Mind_of_a_Leader', '62021'),
(27, '', '62021');

-- --------------------------------------------------------

--
-- Table structure for table `Lms_Category`
--

CREATE TABLE `Lms_Category` (
  `row_id` int(11) NOT NULL,
  `category_name` text DEFAULT NULL,
  `category_description` mediumtext DEFAULT NULL,
  `category_image_url` text DEFAULT NULL,
  `category_status` tinytext DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lms_Category`
--

INSERT INTO `Lms_Category` (`row_id`, `category_name`, `category_description`, `category_image_url`, `category_status`, `created_by`, `created_on`, `modified_by`, `modified_on`) VALUES
(1, 'Providence of God Series', 'We will be learning about Gods providence through different books of the Bible. ', '/uploads/lms/category/cat_Providence_of_God_Series.png', 'Y', 2, '2021-05-14 03:15:28', 2, '2021-06-07 08:33:39'),
(2, 'Sing And Share', 'Test 1', '/uploads/lms/category/cat_Sing_And_Share.png', 'Y', 2, '2021-05-14 03:32:59', 2, '2021-06-07 08:24:46'),
(7, 'PRE-TEENS', 'Course for Pre-Teens', '/uploads/lms/category/cat_PRE-TEENS.jpg', 'Y', 2, '2021-05-14 13:41:03', 2, '2021-06-07 08:24:50'),
(8, 'TEENS AND YOUTH', 'All the programs for Youth and Teens', '/uploads/lms/category/cat_TEENS_AND_YOUTH.jpg', 'Y', 2, '2021-05-14 13:46:09', 10, '2021-06-07 06:20:12'),
(9, 'Providence of God Series 2', 'We will be learning about Gods providence through different books of the Bible. ', '', 'Y', 2, '2021-05-20 16:13:50', 10, '2021-06-07 06:20:16'),
(10, 'Young Adults', 'Courses for Young Adults will be organized under this category', '', 'Y', 2, '2021-05-31 06:01:14', 10, '2021-06-07 06:20:19'),
(11, 'abc', '', '/uploads/lms/category/cat_abc.jpg', 'Y', 2, '2021-06-03 09:54:02', 10, '2021-06-07 06:20:23'),
(12, 'aaa', '', '/uploads/lms/category/cat_aaa.png', 'Y', 10, '2021-06-03 11:01:18', 10, '2021-06-07 06:20:28'),
(13, 'www', '', '/uploads/lms/category/cat_www.png', 'Y', 11, '2021-06-03 11:25:34', 10, '2021-06-07 06:20:32');

-- --------------------------------------------------------

--
-- Table structure for table `Lms_Class`
--

CREATE TABLE `Lms_Class` (
  `row_id` int(11) NOT NULL,
  `class_name` text DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `document_url` text DEFAULT NULL,
  `connection_link` text DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `class_status` tinytext DEFAULT NULL,
  `class_type` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lms_Class`
--

INSERT INTO `Lms_Class` (`row_id`, `class_name`, `course_id`, `start_date`, `end_date`, `document_url`, `connection_link`, `description`, `instructor_id`, `created_by`, `created_on`, `modified_by`, `modified_on`, `class_status`, `class_type`) VALUES
(1, 'Class 1', 1, '2021-05-23 01:00:00', '2021-07-05 04:00:00', '/uploads/lms/class/lesson_Class_1_1.pdf', 'http://meet.google.com/kgw-qoub-utq', 'class test 1', 2, 2, '2021-05-18 02:53:03', 2, '2021-06-07 09:29:31', 'Y', 'online'),
(2, 'test class 2', 1, '2021-05-24 19:35:00', '2021-05-30 19:35:00', '', 'http://meet.google.com/yjk-yhka-aoi', 'test description for class 2', 2, 2, '2021-05-18 19:36:08', 2, '2021-05-24 11:39:53', 'Y', NULL),
(3, 'DSL1 2021', 2, '2021-05-20 04:36:00', '2021-07-26 04:37:00', '/uploads/lms/class/class_DSL1_2021_1.pdf', '', 'Test Class', 2, 2, '2021-05-18 17:37:27', 2, '2021-05-19 14:00:19', 'Y', NULL),
(4, 'DSL1 2021 02', 2, '2021-05-28 01:27:00', '2021-07-24 01:28:00', '/uploads/lms/class/class_DSL1_2021_02_1.pdf', '', 'Second Test', 2, 2, '2021-05-19 14:28:21', 2, '2021-06-07 07:10:57', 'N', NULL),
(5, 'DSL2 2021', 3, '2021-05-22 01:13:00', '2021-07-25 01:13:00', '/uploads/lms/class/class_DSL2_2021_1.pdf', '', 'Test', 11, 11, '2021-05-20 14:14:03', 11, '2021-05-20 15:29:44', 'Y', NULL),
(6, 'DSL2 02', 3, '2021-05-23 23:46:00', '2021-08-28 23:46:00', '/uploads/lms/class/class_DSL2_02_1.pdf', '', '', 11, 11, '2021-05-21 18:16:52', NULL, NULL, 'Y', NULL),
(7, '72021_4_ADVENTURE_SERIES_LEVEL_1', 5, '2021-07-01 14:00:00', '2021-08-29 17:00:00', '', 'http://meet.google.com/yjk-yhka-aoi', 'This is the first ever made interesting biblical adventure series', 2, 2, '2021-05-25 21:57:32', 2, '2021-05-25 22:08:16', 'Y', 'online'),
(8, '62021_5_STUDYING_THE_BIBLE', 12, '2021-06-06 20:00:00', '2021-07-25 23:00:00', '', 'http://meet.google.com/yjk-yhka-aoi', 'Bible study for Youths', 2, 2, '2021-05-25 21:59:48', NULL, NULL, 'Y', 'online'),
(9, '62021_6_THE_CHRISTIAN_LIFE', 13, '2021-06-05 20:00:00', '2021-06-27 23:00:00', '', 'http://meet.google.com/yjk-yhka-aoi', 'Bible study session to nourish and enrich the christian life', 2, 2, '2021-05-25 22:02:03', NULL, NULL, 'Y', 'online'),
(10, '52021_7_DISCIPLESHIP_SERIES', 10, '2021-05-29 23:00:00', '2021-06-28 02:00:00', 'undefined', 'http://meet.google.com/yjk-yhka-aoi', 'Enjoy the discipleship and become a disciple of God. Get filled with the spirit of discipleship and follow the footsteps of God.', 2, 2, '2021-05-25 22:06:15', 2, '2021-05-25 22:07:01', 'Y', 'online'),
(11, '72021_9_GALATIANS', 7, '2021-07-05 23:09:00', '2021-09-10 23:09:00', NULL, '', 'Test', 11, 11, '2021-05-25 17:41:47', NULL, NULL, 'Y', 'online'),
(12, '62021_10_DISCOVERY_SERIES_LEVEL_1', 2, '2021-06-14 23:12:00', '2021-07-17 23:13:00', NULL, '', 'Test for Lessons', 11, 11, '2021-05-25 17:43:29', NULL, NULL, 'Y', 'online'),
(13, '62021_11_Finding_Purpose', 17, '2021-06-03 11:55:00', '2021-07-03 11:56:00', NULL, '', '', 2, 2, '2021-05-31 06:26:35', NULL, NULL, 'Y', 'online'),
(14, '72021_12_Discovering_your_Identity', 18, '2021-07-07 11:57:00', '2021-08-07 11:58:00', NULL, '', '', 2, 2, '2021-05-31 06:28:32', NULL, NULL, 'Y', 'face to face'),
(15, '62021_17_ROMANS', 13, '2021-06-04 15:49:00', '0000-00-00 00:00:00', NULL, '', '', 2, 2, '2021-06-03 10:20:09', NULL, NULL, 'Y', 'blended'),
(16, '62021_19_Finding_Purpose', 17, '2021-06-15 15:50:00', '0000-00-00 00:00:00', NULL, '', '', 2, 2, '2021-06-03 10:21:10', NULL, NULL, 'Y', 'face to face'),
(17, '62021_22_EXPLORER_SERIES', 4, '2021-06-04 16:39:00', '2021-06-03 17:39:00', NULL, '', '', 10, 10, '2021-06-03 11:10:07', NULL, NULL, 'Y', 'online'),
(18, 'NaNNaN_23_CHARACTER_SOLUTIONS', 11, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL, '', '', 11, 11, '2021-06-03 11:37:23', NULL, NULL, 'Y', 'online'),
(19, '62021_25_Book_of_Psalm', 16, '2021-06-30 11:22:00', '2021-07-02 11:22:00', NULL, '', '', 10, 10, '2021-06-07 05:52:56', NULL, NULL, 'Y', 'online');

-- --------------------------------------------------------

--
-- Table structure for table `Lms_Class_Lesson`
--

CREATE TABLE `Lms_Class_Lesson` (
  `row_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  `lesson_status` tinytext DEFAULT NULL,
  `completion_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lms_Class_Lesson`
--

INSERT INTO `Lms_Class_Lesson` (`row_id`, `class_id`, `lesson_id`, `instructor_id`, `lesson_status`, `completion_date`) VALUES
(1, 5, 1, 11, 'Y', '2021-05-20 16:48:55'),
(2, 5, 2, 11, 'Y', '2021-05-20 17:16:10'),
(3, 5, 3, 11, 'Y', '2021-05-21 12:54:36'),
(4, 5, 4, 11, 'Y', '2021-05-21 12:58:53');

-- --------------------------------------------------------

--
-- Table structure for table `Lms_Course`
--

CREATE TABLE `Lms_Course` (
  `row_id` int(11) NOT NULL,
  `course_name` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `course_description` mediumtext DEFAULT NULL,
  `course_image_url` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `course_status` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lms_Course`
--

INSERT INTO `Lms_Course` (`row_id`, `course_name`, `category_id`, `course_description`, `course_image_url`, `created_by`, `created_on`, `modified_by`, `modified_on`, `course_status`) VALUES
(1, 'Mind of a Leader', 2, 'Mindfulness is Rasmus Hougaard’s bread and butter. Through his company, Potential Project, he helps organizations around the world to use mindfulness skills to improve their effectiveness. He’s seen it work wonders, delivering better focus, energy and productivity.', '/uploads/lms/course/cor_Mind_of_a_Leader.jpg', 2, '2021-05-15 04:10:48', 2, '2021-06-07 08:30:52', 'Y'),
(2, '', 9, '', '', 2, '2021-05-15 11:43:25', 1, '2021-06-08 07:20:57', 'N'),
(3, 'DISCOVERY SERIES LEVEL 2', 7, 'DISCOVERY SERIES LEVEL 2', '', 2, '2021-05-15 11:43:51', NULL, NULL, 'Y'),
(4, 'EXPLORER SERIES', 7, 'EXPLORER SERIES', '', 2, '2021-05-15 11:44:11', NULL, NULL, 'Y'),
(5, 'ADVENTURE SERIES LEVEL 1', 8, 'ADVENTURE SERIES LEVEL 1', '', 2, '2021-05-15 11:44:36', NULL, NULL, 'Y'),
(6, 'ADVENTURE SERIES LEVEL 2', 8, 'ADVENTURE SERIES LEVEL 2', '', 2, '2021-05-15 11:45:03', NULL, NULL, 'Y'),
(7, 'discovery', 2, 'GALATIANS', '', 2, '2021-05-15 11:48:53', 2, '2021-06-07 08:30:03', 'N'),
(8, 'Acts', 1, 'Book', '', 2, '2021-05-15 11:49:08', 2, '2021-06-07 08:32:03', 'N'),
(9, 'ONE-TO-ONE DISCIPLESHIP', 8, 'ONE-TO-ONE DISCIPLESHIP', '', 2, '2021-05-15 11:50:09', 2, '2021-06-07 06:23:46', 'N'),
(10, 'DISCIPLESHIP SERIES', 8, 'DISCIPLESHIP SERIES', '', 2, '2021-05-15 11:50:32', 10, '2021-06-07 06:40:17', 'N'),
(11, 'CHARACTER SOLUTIONS', 8, 'CHARACTER SOLUTIONS', '', 2, '2021-05-15 11:50:50', NULL, NULL, 'Y'),
(12, 'STUDYING THE BIBLE', 8, 'STUDYING THE BIBLE', '', 2, '2021-05-15 11:51:13', NULL, NULL, 'Y'),
(13, 'THE CHRISTIAN LIFE', 8, 'THE CHRISTIAN LIFE', '', 2, '2021-05-15 11:51:33', NULL, NULL, 'Y'),
(14, 'YOUTH MENTOR TRAINING', 8, 'YOUTH MENTOR TRAINING', '', 2, '2021-05-15 14:39:38', NULL, NULL, 'Y'),
(15, 'Book of Joshua', 9, 'Learn from Joshua', '/uploads/lms/course/cor_Book_of_Joshua.png', 2, '2021-05-20 16:20:14', NULL, NULL, 'Y'),
(16, 'Book of Psalm', 9, 'From Book of Psalm', '/uploads/lms/course/cor_Book_of_Psalm.jpg', 2, '2021-05-20 16:21:40', NULL, NULL, 'Y'),
(17, 'Finding Purpose', 10, 'This course will help you finding your purpose. ', '', 2, '2021-05-31 06:21:13', NULL, NULL, 'Y'),
(18, 'Discovering your Identity', 10, 'Find your identity through the word of God', '', 2, '2021-05-31 06:22:04', NULL, NULL, 'Y'),
(20, 'Identify your calling', 10, '', '', 2, '2021-05-31 06:23:46', NULL, NULL, 'Y'),
(21, 'A', 7, '', '/uploads/lms/course/cor_A.png', 2, '2021-06-03 10:13:43', NULL, NULL, 'Y'),
(22, 'XX', 8, '', '/uploads/lms/course/cor_XX.png', 10, '2021-06-03 11:03:58', NULL, NULL, 'Y'),
(23, '123', 10, '', '/uploads/lms/course/cor_123.png', 11, '2021-06-03 11:33:15', NULL, NULL, 'Y'),
(24, '123', 10, '', '/uploads/lms/course/cor_123.png', 11, '2021-06-03 11:33:15', NULL, NULL, 'Y'),
(25, '456', 10, '', '/uploads/lms/course/cor_456.png', 11, '2021-06-03 11:35:09', NULL, NULL, 'Y'),
(26, 'ephesians', 7, '', '', 2, '2021-06-07 06:05:10', NULL, NULL, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `Lms_Lesson`
--

CREATE TABLE `Lms_Lesson` (
  `row_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `lesson_name` text DEFAULT NULL,
  `lesson_description` mediumtext DEFAULT NULL,
  `lesson_image_url` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `lesson_status` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lms_Lesson`
--

INSERT INTO `Lms_Lesson` (`row_id`, `category_id`, `course_id`, `lesson_name`, `lesson_description`, `lesson_image_url`, `created_by`, `created_on`, `modified_by`, `modified_on`, `lesson_status`) VALUES
(1, 1, 1, 'What Is Leadership ?', 'Leaders are people who do the right thing.', '/uploads/lms/lesson/lesson_What_Is_Leadership_.jpg', 2, '2021-05-15 06:35:48', 2, '2021-05-15 14:07:53', 'Y'),
(2, 7, 2, 'Lesson 1- what is God like', 'What is God like', '', 2, '2021-05-15 13:56:52', 2, '2021-05-17 10:32:11', 'Y'),
(3, 7, 2, 'Lesson 2- Getting to know God', 'Getting to know God', '', 2, '2021-05-17 10:07:17', NULL, NULL, 'Y'),
(4, 7, 2, 'Lesson 3- Wonderful Life in Christ', 'Wonderful Life in Christ', '', 2, '2021-05-17 10:07:51', NULL, NULL, 'Y'),
(5, 7, 2, 'Lesson 4- Gifts in Christ', 'Gifts in Christ', '', 2, '2021-05-17 10:08:15', 1, '2021-05-18 17:18:31', 'Y'),
(6, 7, 2, 'Lesson 5- Forever with You', 'Forever with You', '', 2, '2021-05-17 10:08:40', NULL, NULL, 'Y'),
(7, 7, 2, 'Lesson 6- One Big Family', 'One Big Family', '', 2, '2021-05-17 10:09:01', NULL, NULL, 'Y'),
(8, 7, 2, 'Lesson 7- U-Turn', 'U-Turn', '', 2, '2021-05-17 10:09:22', NULL, NULL, 'Y'),
(9, 8, 5, 'Lesson 1- Adventure of Knowing God', 'Adventure of Knowing God', '', 2, '2021-05-17 10:09:52', NULL, NULL, 'Y'),
(10, 8, 5, 'Lesson 2- Adventure of Growing in God&#x27s Word', 'Adventure of Growing in God&#x27s Word', '', 2, '2021-05-17 10:12:22', NULL, NULL, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `Lms_Mentees`
--

CREATE TABLE `Lms_Mentees` (
  `row_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `added_on` timestamp NULL DEFAULT NULL,
  `mentee_id` int(11) DEFAULT NULL,
  `mentee_first_name` text DEFAULT NULL,
  `mentee_last_name` text DEFAULT NULL,
  `mentee_status` tinytext DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lms_Mentees`
--

INSERT INTO `Lms_Mentees` (`row_id`, `class_id`, `course_id`, `category_id`, `instructor_id`, `created_by`, `added_on`, `mentee_id`, `mentee_first_name`, `mentee_last_name`, `mentee_status`, `modified_by`, `modified_on`) VALUES
(3, 3, 2, 7, 2, 2, '2021-05-18 23:07:57', 1, 'Ruby', 'Jathanna', 'Y', 2, '2021-05-19 14:56:38'),
(4, 2, 3, 1, 2, 2, '2021-05-18 23:09:48', 1, 'Ruby', 'Jathanna', 'Y', 2, '2021-05-19 03:53:41'),
(5, 2, 1, 1, 2, 2, '2021-05-18 23:09:48', 9, 'Rajesh', 'Parmar', 'Y', NULL, NULL),
(18, 5, 3, 7, 11, 11, '2021-05-21 23:19:27', 9, 'Rajesh', 'Parmar', 'N', 11, '2021-05-21 17:55:02'),
(19, 5, 3, 7, 11, 11, '2021-05-21 23:19:27', 1, 'Ruby', 'Jathanna', 'Y', NULL, NULL),
(23, 6, 3, 7, 11, 11, '2021-05-24 17:18:24', 10, 'Sunil', 'Dawson', 'Y', NULL, NULL),
(24, 6, 3, 7, 11, 11, '2021-05-24 17:18:24', 9, 'Rajesh', 'Parmar', 'Y', NULL, NULL),
(25, 11, 7, 8, 11, 11, '2021-05-25 23:12:07', 1, 'Ruby', 'Jathanna', 'Y', NULL, NULL),
(26, 11, 7, 8, 11, 11, '2021-05-25 23:12:07', 9, 'Rajesh', 'Parmar', 'Y', NULL, NULL),
(27, 11, 7, 8, 11, 11, '2021-05-25 23:12:07', 10, 'Sunil', 'Dawson', 'Y', NULL, NULL),
(33, 12, 2, 7, 11, 11, '2021-05-25 23:17:47', 1, 'Ruby', 'Jathanna', 'Y', NULL, NULL),
(34, 12, 2, 7, 11, 11, '2021-05-25 23:17:47', 10, 'Sunil', 'Dawson', 'Y', NULL, NULL),
(35, 12, 2, 7, 11, 11, '2021-05-25 23:17:47', 9, 'Rajesh', 'Parmar', 'N', 11, '2021-05-25 17:48:58'),
(38, 1, 1, 2, 2, 2, '2021-06-07 14:59:55', 9, 'Rajesh', 'Parmar', 'Y', NULL, NULL),
(39, 1, 1, 2, 2, 2, '2021-06-07 14:59:55', 1, 'Ruby', 'Jathanna', 'Y', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `meetingattendance`
--

CREATE TABLE `meetingattendance` (
  `meeting_id` int(11) NOT NULL,
  `srs_id` int(11) DEFAULT NULL,
  `meeting_date` timestamp NULL DEFAULT NULL,
  `attendees` int(11) DEFAULT NULL,
  `new_attendees` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetingattendance`
--

INSERT INTO `meetingattendance` (`meeting_id`, `srs_id`, `meeting_date`, `attendees`, `new_attendees`, `created_by`, `created_on`) VALUES
(22, 2, '2021-05-01 05:00:00', 3, 1, 2, '2021-05-09 06:04:16'),
(23, 2, '2021-05-02 05:00:00', 3, 2, 2, '2021-05-09 06:10:46'),
(24, 2, '2021-05-08 05:00:00', 3, 0, 2, '2021-05-09 06:12:35'),
(25, 2, '2021-05-09 05:00:00', 2, 0, 2, '2021-05-09 01:10:37'),
(26, 2, '2021-05-12 05:00:00', 3, 2, 2, '2021-05-09 18:38:56'),
(27, 2, '2021-05-14 05:00:00', 2, 1, 2, '2021-05-14 10:10:09'),
(28, 2, '2021-04-03 05:00:00', 2, 3, 2, '2021-05-14 10:16:20'),
(29, 2, '2021-04-10 05:00:00', 2, 1, 2, '2021-05-14 10:18:06'),
(30, 2, '2021-04-17 05:00:00', 3, 4, 2, '2021-05-14 10:26:18'),
(31, 1, '2021-05-05 05:00:00', 4, 3, 11, '2021-05-20 11:07:25'),
(32, 1, '2021-05-12 05:00:00', 3, 2, 11, '2021-05-20 11:07:48'),
(33, 1, '2021-05-19 05:00:00', 2, 2, 11, '2021-05-20 11:08:11'),
(34, 2, '2021-05-26 05:00:00', 1, 0, 2, '2021-05-20 16:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `pcs`
--

CREATE TABLE `pcs` (
  `pcs_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `name_of_user` text DEFAULT NULL,
  `relation_with_user` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `current_status` tinytext DEFAULT NULL,
  `pcs_description` text DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `status` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pcs`
--

INSERT INTO `pcs` (`pcs_id`, `user_id`, `created_on`, `name_of_user`, `relation_with_user`, `city`, `state`, `current_status`, `pcs_description`, `modified_date`, `status`) VALUES
(2, 1, '2021-05-21 11:30:00', 'Nayana', 'sister', 'Mumbai', 'Maharashtra', 'Started Bible Study', 'Prayer for healing from fever, cold and cough so that he may be quickly recovered from this sickness', '2021-05-25 13:05:45', 'Y'),
(3, 2, '2021-05-21 15:36:04', 'rahul', 'friend', 'Mumbai', 'Maharashtra', 'Praying', 'Prayer for the quick recovery from Tuberculosis and Pneumonia.', NULL, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` text NOT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_user_id` int(11) DEFAULT NULL,
  `modified_user_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `created_by_user_id`, `created_date`, `modified_user_id`, `modified_user_date`) VALUES
(8, 'Admin', 1, '2021-05-27 18:12:11', 1, '2021-05-27 18:12:11'),
(9, 'Mentor', 1, '2021-05-27 18:12:11', 1, '2021-05-27 18:12:11'),
(10, 'Mentee', 1, '2021-05-27 18:12:11', 1, '2021-05-27 18:12:11'),
(11, 'Captain', 1, '2021-05-27 18:12:11', 1, '2021-05-27 18:12:11');

-- --------------------------------------------------------

--
-- Table structure for table `srs_branch`
--

CREATE TABLE `srs_branch` (
  `srs_id` int(11) NOT NULL,
  `srs_name` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `srs_branch`
--

INSERT INTO `srs_branch` (`srs_id`, `srs_name`, `user_id`, `created_by`, `created_on`, `modified_by`, `modified_on`, `status`) VALUES
(1, 'SnS 1', 11, 1, '2021-05-04 05:05:16', 1, '2021-05-05 01:14:37', 'Enable'),
(2, 'Sing and Share 6', 1, 1, '2021-05-04 09:43:28', 1, '2021-05-04 17:11:31', 'Enable'),
(3, 'Sing and Share 7', 1, 1, '2021-05-04 17:33:28', 1, '2021-05-05 16:46:42', 'Enable'),
(4, 'Sing and Share 61', 1, 1, '2021-05-04 17:34:22', 1, '2021-05-04 17:34:30', 'Disable'),
(5, 'Sing and Share 8', 11, 1, '2021-05-04 17:52:35', 1, '2021-05-05 16:19:12', 'Disable'),
(8, 'SNS 2', 1, 1, '2021-05-05 01:15:12', NULL, NULL, 'Enable');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_first_name` text DEFAULT NULL,
  `user_last_name` text DEFAULT NULL,
  `user_email_id` varchar(100) DEFAULT NULL,
  `user_contact_number` text DEFAULT NULL,
  `user_created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role_id` int(11) DEFAULT NULL,
  `mentor_email_id` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `srs_id` int(11) DEFAULT NULL,
  `status` text DEFAULT NULL,
  `modified_by_user_id` int(11) DEFAULT NULL,
  `modified_on` timestamp NULL DEFAULT NULL,
  `image_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_first_name`, `user_last_name`, `user_email_id`, `user_contact_number`, `user_created_date`, `role_id`, `mentor_email_id`, `parent_id`, `srs_id`, `status`, `modified_by_user_id`, `modified_on`, `image_url`) VALUES
(1, 'vijay', 'MR', 'vijaykumarmr005@gmail.com', '9535507683', '2021-06-07 07:47:17', 8, 'vijaykumarmr005@gmail.com', 0, 2, 'Enable', 2, '2021-06-07 07:47:17', NULL),
(2, 'nayana', 'das', 'nayana@vecan.co', '9900889900', '2021-05-27 18:12:11', 9, 'nayana@vecan.co', 11, 1, 'Enable', 2, '2021-05-20 11:04:08', NULL),
(3, 'Rahul', 'v', 'rahulmcrsft@gmail.com', '9731273636', '2021-06-07 07:19:03', 10, 'rahulmcrsft@gmail.com', 11, 1, 'Enable', 2, '2021-06-07 07:19:03', NULL);


-- --------------------------------------------------------

--
-- Table structure for table `usersdetails`
--

CREATE TABLE `usersdetails` (
  `user_id` int(11) NOT NULL,
  `user_address` longtext DEFAULT NULL,
  `user_pincode` int(11) DEFAULT NULL,
  `user_city` text DEFAULT NULL,
  `user_state` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usersdetails`
--

INSERT INTO `usersdetails` (`user_id`, `user_address`, `user_pincode`, `user_city`, `user_state`) VALUES
(1, 'A/1,3rd floor, Nav-Rutuja C.H.S, Jai Hind Colony, Gupte Road, Dombivli(west)', 421202, 'Mumbai', NULL),
(2, 'Block No.3, Immanuel Bungalow, Jai Hind Colony, Gupte Road, Dombivli', 421202, 'Mumbai', 'Maharashtra'),
(3, 'Block No.3, Immanuel Bungalow, Jai Hind Colony, Gupte Road, Dombivli', 421202, 'Mumbai', 'Maharashtra');

-- --------------------------------------------------------

--
-- Table structure for table `users_password`
--

CREATE TABLE `users_password` (
  `user_id` int(11) NOT NULL,
  `user_password` varchar(50) DEFAULT NULL,
  `user_email_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_password`
--

INSERT INTO `users_password` (`user_id`, `user_password`, `user_email_id`) VALUES
(1, '123456', 'vijaykumarmr005@gmail.com'),
(2, '123456', 'nayana@vecan.co'),
(3, '123456', 'rahulmcrsft@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_access`
--

CREATE TABLE `user_access` (
  `user_id` int(11) NOT NULL,
  `sns_access` tinyint(1) DEFAULT NULL,
  `user_access` tinyint(1) DEFAULT NULL,
  `event_access` tinyint(1) DEFAULT NULL,
  `attendance_access` tinyint(1) DEFAULT NULL,
  `calendar_add_access` tinyint(1) DEFAULT NULL,
  `calendar_access` tinyint(1) DEFAULT NULL,
  `blog_change_status_access` tinyint(1) DEFAULT NULL,
  `blog_access` tinyint(1) DEFAULT NULL,
  `blog_approve_access` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_access`
--

INSERT INTO `user_access` (`user_id`, `sns_access`, `user_access`, `event_access`, `attendance_access`, `calendar_add_access`, `calendar_access`, `blog_change_status_access`, `blog_access`, `blog_approve_access`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(2, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(3, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `venue_id` int(11) NOT NULL,
  `venue_name` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by_user_id` int(11) DEFAULT NULL,
  `modified_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `venue`
--

INSERT INTO `venue` (`venue_id`, `venue_name`, `description`, `created_by_user_id`, `created_date`, `modified_by_user_id`, `modified_date`) VALUES
(1, 'Dombivli Open Ground', 'DNC School Ground, Pandurangawadi, Near Pragati College, Dombivli(East)', 1, '2021-05-27 18:12:11', 1, '2021-03-08 05:45:25'),
(2, 'Badlapur Open Garden', 'Maximum 500 people can be adjusted in this open ground. But the criteria is minimum 200 people needs to be accumulated. The charge for this ground is around 8000/12 hrs', 1, '2021-05-27 18:12:11', 1, '2021-03-18 05:59:51');

-- --------------------------------------------------------

--
-- Table structure for table `visitors_contact`
--

CREATE TABLE `visitors_contact` (
  `contact_id` int(11) NOT NULL,
  `visitor_name` text DEFAULT NULL,
  `visitor_email_id` varchar(255) DEFAULT NULL,
  `visitor_contact_number` text DEFAULT NULL,
  `message` longtext DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`meeting_id`);

--
-- Indexes for table `attendees`
--
ALTER TABLE `attendees`
  ADD PRIMARY KEY (`meeting_row_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_attendeesmeeting_id` (`meeting_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `blogs` (`created_by_user_id`),
  ADD KEY `users` (`modified_by`);

--
-- Indexes for table `blog_category`
--
ALTER TABLE `blog_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`calendar_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `blog_id` (`blog_id`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `contact_event`
--
ALTER TABLE `contact_event`
  ADD KEY `contact_id` (`contact_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `created_by_user_id` (`created_by_user_id`),
  ADD KEY `modified_user_id` (`modified_user_id`),
  ADD KEY `event_type_id` (`event_type_id`),
  ADD KEY `event_status_id` (`event_status_id`);

--
-- Indexes for table `event_status`
--
ALTER TABLE `event_status`
  ADD PRIMARY KEY (`event_status_id`),
  ADD KEY `created_by_user_id` (`created_by_user_id`),
  ADD KEY `modified_by_user_id` (`modified_by_user_id`);

--
-- Indexes for table `event_type`
--
ALTER TABLE `event_type`
  ADD PRIMARY KEY (`EventTypeID`),
  ADD KEY `CreatedByUserID` (`CreatedByUserID`),
  ADD KEY `ModifiedByUserID` (`ModifiedByUserID`);

--
-- Indexes for table `generateClassCode`
--
ALTER TABLE `generateClassCode`
  ADD PRIMARY KEY (`code_id`);

--
-- Indexes for table `Lms_Category`
--
ALTER TABLE `Lms_Category`
  ADD PRIMARY KEY (`row_id`);

--
-- Indexes for table `Lms_Class`
--
ALTER TABLE `Lms_Class`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `instructor_id` (`instructor_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indexes for table `Lms_Class_Lesson`
--
ALTER TABLE `Lms_Class_Lesson`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `lesson_id` (`lesson_id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `Lms_Course`
--
ALTER TABLE `Lms_Course`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indexes for table `Lms_Lesson`
--
ALTER TABLE `Lms_Lesson`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indexes for table `Lms_Mentees`
--
ALTER TABLE `Lms_Mentees`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `instructor_id` (`instructor_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `mentee_id` (`mentee_id`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indexes for table `meetingattendance`
--
ALTER TABLE `meetingattendance`
  ADD PRIMARY KEY (`meeting_id`),
  ADD KEY `srs_id` (`srs_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `pcs`
--
ALTER TABLE `pcs`
  ADD PRIMARY KEY (`pcs_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD KEY `created_by_user_id` (`created_by_user_id`),
  ADD KEY `modified_user_id` (`modified_user_id`);

--
-- Indexes for table `srs_branch`
--
ALTER TABLE `srs_branch`
  ADD PRIMARY KEY (`srs_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_roles` (`role_id`),
  ADD KEY `srs_id` (`srs_id`);

--
-- Indexes for table `usersdetails`
--
ALTER TABLE `usersdetails`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users_password`
--
ALTER TABLE `users_password`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_access`
--
ALTER TABLE `user_access`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`venue_id`),
  ADD KEY `created_by_user_id` (`created_by_user_id`),
  ADD KEY `modified_by_user_id` (`modified_by_user_id`);

--
-- Indexes for table `visitors_contact`
--
ALTER TABLE `visitors_contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendees`
--
ALTER TABLE `attendees`
  MODIFY `meeting_row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `blog_category`
--
ALTER TABLE `blog_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `calendar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `event_status`
--
ALTER TABLE `event_status`
  MODIFY `event_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `event_type`
--
ALTER TABLE `event_type`
  MODIFY `EventTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `generateClassCode`
--
ALTER TABLE `generateClassCode`
  MODIFY `code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Lms_Category`
--
ALTER TABLE `Lms_Category`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Lms_Class`
--
ALTER TABLE `Lms_Class`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Lms_Class_Lesson`
--
ALTER TABLE `Lms_Class_Lesson`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Lms_Course`
--
ALTER TABLE `Lms_Course`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `Lms_Lesson`
--
ALTER TABLE `Lms_Lesson`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Lms_Mentees`
--
ALTER TABLE `Lms_Mentees`
  MODIFY `row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `meetingattendance`
--
ALTER TABLE `meetingattendance`
  MODIFY `meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `pcs`
--
ALTER TABLE `pcs`
  MODIFY `pcs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `srs_branch`
--
ALTER TABLE `srs_branch`
  MODIFY `srs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `usersdetails`
--
ALTER TABLE `usersdetails`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users_password`
--
ALTER TABLE `users_password`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_access`
--
ALTER TABLE `user_access`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `venue_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `visitors_contact`
--
ALTER TABLE `visitors_contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendees`
--
ALTER TABLE `attendees`
  ADD CONSTRAINT `attendees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_attendeesmeeting_id` FOREIGN KEY (`meeting_id`) REFERENCES `meetingattendance` (`meeting_id`);

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `users` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `calendar`
--
ALTER TABLE `calendar`
  ADD CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);

--
-- Constraints for table `contact_event`
--
ALTER TABLE `contact_event`
  ADD CONSTRAINT `contact_event_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`contact_id`),
  ADD CONSTRAINT `contact_event_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`modified_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `events_ibfk_3` FOREIGN KEY (`event_type_id`) REFERENCES `event_type` (`EventTypeID`),
  ADD CONSTRAINT `events_ibfk_4` FOREIGN KEY (`event_status_id`) REFERENCES `event_status` (`event_status_id`);

--
-- Constraints for table `event_status`
--
ALTER TABLE `event_status`
  ADD CONSTRAINT `event_status_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `event_status_ibfk_2` FOREIGN KEY (`modified_by_user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `event_type`
--
ALTER TABLE `event_type`
  ADD CONSTRAINT `event_type_ibfk_1` FOREIGN KEY (`CreatedByUserID`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `event_type_ibfk_2` FOREIGN KEY (`ModifiedByUserID`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `Lms_Class`
--
ALTER TABLE `Lms_Class`
  ADD CONSTRAINT `Lms_Class_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `Lms_Course` (`row_id`),
  ADD CONSTRAINT `Lms_Class_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `Lms_Class_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `Lms_Class_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `Lms_Class_Lesson`
--
ALTER TABLE `Lms_Class_Lesson`
  ADD CONSTRAINT `Lms_Class_Lesson_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `Lms_Class` (`row_id`),
  ADD CONSTRAINT `Lms_Class_Lesson_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `Lms_Lesson` (`row_id`),
  ADD CONSTRAINT `Lms_Class_Lesson_ibfk_3` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `Lms_Course`
--
ALTER TABLE `Lms_Course`
  ADD CONSTRAINT `Lms_Course_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Lms_Category` (`row_id`),
  ADD CONSTRAINT `Lms_Course_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `Lms_Course_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `Lms_Lesson`
--
ALTER TABLE `Lms_Lesson`
  ADD CONSTRAINT `Lms_Lesson_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Lms_Category` (`row_id`),
  ADD CONSTRAINT `Lms_Lesson_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `Lms_Course` (`row_id`),
  ADD CONSTRAINT `Lms_Lesson_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `Lms_Lesson_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `Lms_Mentees`
--
ALTER TABLE `Lms_Mentees`
  ADD CONSTRAINT `Lms_Mentees_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `Lms_Class` (`row_id`),
  ADD CONSTRAINT `Lms_Mentees_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `Lms_Course` (`row_id`),
  ADD CONSTRAINT `Lms_Mentees_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `Lms_Category` (`row_id`),
  ADD CONSTRAINT `Lms_Mentees_ibfk_4` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `Lms_Mentees_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `Lms_Mentees_ibfk_6` FOREIGN KEY (`mentee_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `Lms_Mentees_ibfk_7` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `meetingattendance`
--
ALTER TABLE `meetingattendance`
  ADD CONSTRAINT `meetingattendance_ibfk_1` FOREIGN KEY (`srs_id`) REFERENCES `srs_branch` (`srs_id`),
  ADD CONSTRAINT `meetingattendance_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `pcs`
--
ALTER TABLE `pcs`
  ADD CONSTRAINT `pcs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`modified_user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `srs_branch`
--
ALTER TABLE `srs_branch`
  ADD CONSTRAINT `srs_branch_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`srs_id`) REFERENCES `srs_branch` (`srs_id`);

--
-- Constraints for table `usersdetails`
--
ALTER TABLE `usersdetails`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `usersdetails_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users_password`
--
ALTER TABLE `users_password`
  ADD CONSTRAINT `FK_users_password` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `users_password_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_access`
--
ALTER TABLE `user_access`
  ADD CONSTRAINT `user_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `venue`
--
ALTER TABLE `venue`
  ADD CONSTRAINT `venue_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `venue_ibfk_2` FOREIGN KEY (`modified_by_user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
