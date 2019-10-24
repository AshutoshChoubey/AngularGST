-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2019 at 06:08 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gst_bcm`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department`, `description`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Electrical', 'test', 0, '2019-03-11 08:38:53', '2019-03-11 08:38:53', NULL),
(2, 'mechanic', 'test', 0, '2019-03-11 08:39:02', '2019-03-11 08:39:02', NULL),
(3, 'software', 'test', 0, '2019-03-11 08:39:15', '2019-03-11 08:39:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `indents`
--

CREATE TABLE `indents` (
  `id` int(155) NOT NULL,
  `indent_month` varchar(155) DEFAULT NULL,
  `indent_discription` varchar(155) DEFAULT NULL,
  `indent_department` varchar(155) NOT NULL,
  `indent_department_name` varchar(155) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(155) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `indents`
--

INSERT INTO `indents` (`id`, `indent_month`, `indent_discription`, `indent_department`, `indent_department_name`, `created_at`, `updated_at`, `created_by`, `deleted_at`) VALUES
(1, 'March 2019', 'feeg', '3', 'software', '2019-03-11 08:42:05', '2019-03-11 08:42:05', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `indent_details`
--

CREATE TABLE `indent_details` (
  `id` int(155) NOT NULL,
  `product_code` varchar(155) DEFAULT NULL,
  `product_name` varchar(155) NOT NULL,
  `speciaman` varchar(155) DEFAULT NULL,
  `make` varchar(155) DEFAULT NULL,
  `quantity` double(155,2) NOT NULL DEFAULT '0.00',
  `purpose` varchar(155) DEFAULT NULL,
  `bf_stock` varchar(155) DEFAULT NULL,
  `remarks` text,
  `indent_id` int(155) DEFAULT NULL,
  `department` int(155) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `indent_details`
--

INSERT INTO `indent_details` (`id`, `product_code`, `product_name`, `speciaman`, `make`, `quantity`, `purpose`, `bf_stock`, `remarks`, `indent_id`, `department`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'SOF/BCM/3', '3', 'fdsd', 'sdfdfg', 10.00, 'fdgbffg', 'fbfdfg', 'fbfbf', 1, 3, '2019-03-11 08:42:05', '2019-03-11 08:42:05', NULL),
(2, 'SOF/BCM/1', '1', 'fdsf', 'sdf', 10.00, 'fbf', 'fbgf', 'fbghfghtfh', 1, 3, '2019-03-11 08:42:06', '2019-03-11 08:42:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_03_01_175425_create_departments_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(155) NOT NULL,
  `product_code` varchar(155) DEFAULT NULL,
  `product_name` varchar(155) NOT NULL,
  `product_department` varchar(155) DEFAULT NULL,
  `product_department_Name` varchar(155) DEFAULT NULL,
  `product_specification` text,
  `product_type` varchar(155) DEFAULT NULL,
  `product_unit` varchar(155) DEFAULT NULL,
  `product_color` varchar(55) DEFAULT NULL,
  `product_hsn` varchar(155) DEFAULT NULL,
  `place` varchar(155) DEFAULT NULL,
  `product_igst` double(155,2) NOT NULL DEFAULT '0.00',
  `product_cgst` double(155,2) NOT NULL DEFAULT '0.00',
  `product_sgst` double(155,2) NOT NULL DEFAULT '0.00',
  `product_gst` double(155,2) NOT NULL DEFAULT '0.00',
  `stock_in` double(155,2) NOT NULL DEFAULT '0.00',
  `stock_out` double(155,2) NOT NULL DEFAULT '0.00',
  `available_stock` double(155,2) NOT NULL DEFAULT '0.00',
  `opening_stock` double(155,2) NOT NULL DEFAULT '0.00',
  `closing_stok` double(155,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) DEFAULT '0',
  `created_by` int(155) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_code`, `product_name`, `product_department`, `product_department_Name`, `product_specification`, `product_type`, `product_unit`, `product_color`, `product_hsn`, `place`, `product_igst`, `product_cgst`, `product_sgst`, `product_gst`, `stock_in`, `stock_out`, `available_stock`, `opening_stock`, `closing_stok`, `status`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'SOF/BCM/1', 'BCM', '3', 'software', 'test', 'eree', 'sdfdsfsdf', NULL, '34sdfsf', 'dsfsd', 3.00, 3.00, 3.00, 9.00, 70.00, 0.00, 70.00, 61.50, 100.00, 0, NULL, '2019-03-11 08:39:56', '2019-03-11 09:05:27', NULL),
(2, 'MEC/BIK/2', 'bike', '2', 'mechanic', 'test', 'eree', 'sdfdsfsdf', NULL, '34sdfsf', 'dsfsd', 3.00, 3.00, 3.00, 9.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, NULL, '2019-03-11 08:40:21', '2019-03-11 08:40:21', NULL),
(3, 'SOF/BCM/3', 'bCM GST', '3', 'software', 'dfgd', 'df', 'dfg', NULL, 'fdg54654', 'fdgdf', 5.00, 4.00, 5.00, 14.00, 20.00, 0.00, 20.00, 16.50, 10.00, 0, NULL, '2019-03-11 08:41:04', '2019-03-11 09:05:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(155) NOT NULL,
  `pur_product_code` varchar(155) DEFAULT NULL,
  `pur_product_name` varchar(155) DEFAULT NULL,
  `pur_pro_id` int(155) DEFAULT NULL,
  `pur_dep_name` varchar(155) DEFAULT NULL,
  `pur_dep_code` varchar(155) DEFAULT NULL,
  `pur_pro_specif` varchar(155) DEFAULT NULL,
  `pur_pro_type` varchar(155) DEFAULT NULL,
  `pur_pro_place` varchar(155) DEFAULT NULL,
  `pur_indent_id` int(155) DEFAULT NULL,
  `pur_indent_discription` varchar(155) DEFAULT NULL,
  `pur_pro_opening` double(155,2) DEFAULT NULL,
  `pur_pro_closing` double(155,2) DEFAULT NULL,
  `pur_pro_price` double(155,2) DEFAULT NULL,
  `pur_pro_quanity` double(155,2) DEFAULT NULL,
  `created_by` int(155) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `pur_product_code`, `pur_product_name`, `pur_pro_id`, `pur_dep_name`, `pur_dep_code`, `pur_pro_specif`, `pur_pro_type`, `pur_pro_place`, `pur_indent_id`, `pur_indent_discription`, `pur_pro_opening`, `pur_pro_closing`, `pur_pro_price`, `pur_pro_quanity`, `created_by`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'SOF/BCM/1', 'BCM', 1, 'software', '3', 'fbghfghtfh', 'eree', 'dsfsd', 1, 'feeg', 100.00, 100.00, 100.00, 60.00, NULL, 0, '2019-03-11 08:56:05', '2019-03-11 08:56:05', NULL),
(2, 'SOF/BCM/3', 'bCM GST', 3, 'software', '3', 'fbfbf', 'df', 'fdgdf', 1, 'feeg', 10.00, 0.00, 10.00, 10.00, NULL, 0, '2019-03-11 08:56:05', '2019-03-11 08:56:05', NULL),
(3, 'SOF/BCM/1', 'BCM', 1, 'software', '3', 'fbghfghtfh', 'eree', 'dsfsd', 1, 'feeg', 61.50, 100.00, 23.00, 70.00, NULL, 0, '2019-03-11 09:05:27', '2019-03-11 09:05:27', NULL),
(4, 'SOF/BCM/3', 'bCM GST', 3, 'software', '3', 'fbfbf', 'df', 'fdgdf', 1, 'feeg', 16.50, 10.00, 23.00, 20.00, NULL, 0, '2019-03-11 09:05:27', '2019-03-11 09:05:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `supplier_name` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mob_num` varchar(155) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(155) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(155) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_supplier_balance` double(100,2) DEFAULT NULL,
  `total_supplier_credit` double(100,2) DEFAULT NULL,
  `total_supplier_debit` double(100,2) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `gstin` varchar(155) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(2) DEFAULT '1',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `user_id`, `supplier_name`, `mob_num`, `address`, `email`, `total_supplier_balance`, `total_supplier_credit`, `total_supplier_debit`, `email_verified_at`, `gstin`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Ashutosh', '9658476170', 'asdfgd', 'ashu@sdg.frd', NULL, NULL, NULL, NULL, 'asas3535', 1, NULL, '2019-03-10 15:24:32', '2019-03-11 04:04:38');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_debit_logs`
--

CREATE TABLE `supplier_debit_logs` (
  `id` int(100) NOT NULL,
  `user_id` int(100) DEFAULT NULL,
  `supplier_id` int(100) NOT NULL,
  `purchase_id` int(100) DEFAULT NULL,
  `debit_amount` float(100,2) DEFAULT NULL,
  `total_amount` float(100,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Ashutosh Kumar Choubey', 'admin@admin.com', NULL, '$2y$10$j5Qw5sbpuL2CZy139U5Nq.4OzITqZmeYDYQB9sIzaNCdgI2m2dn7m', NULL, '2019-02-25 19:26:43', '2019-02-25 19:26:43'),
(10, 'kkkkkkkkkkkkkkhhh', 'admin6@admin.com', NULL, '$2y$10$Onct8CoRyoh6Dgv2huCh.uorL3oySoULwAwCBstaheorq1r2hfdLa', NULL, '2019-02-26 06:52:43', '2019-02-26 06:52:43'),
(11, 'Ashutosh Kumar Choubey', 'admin7@admin.com', NULL, '$2y$10$lEuZ9.O3Y3hTkx1zdn6KUeFLYsmsz4cmKXEdvh5BdDmGwljNaTO6a', NULL, '2019-02-26 07:43:15', '2019-02-26 07:43:15'),
(12, 'Ashdfg', 'admin11@admin.com', NULL, '$2y$10$GX9b7wGPcoYuMFbe94b4rOJzgkpXegGBfELLhHBlGZubgRKPhoTmm', NULL, '2019-02-26 08:41:53', '2019-02-26 08:41:53'),
(13, 'Ashutosh Kumar Choubey', 'admin12@admin.com', NULL, '$2y$10$DNjx0jTH8eK8r8krEzwguels4cQsuj4J/2bHsG9Dwv70G1zxqo4Hi', NULL, '2019-03-01 02:35:17', '2019-03-01 02:35:17'),
(14, 'kkkkkkkkkkkkkkhhh', 'admin15@admin.com', NULL, '$2y$10$Lwe/27AMUmm5iGceTzJu/u620zQQGtvA51IuV6b4fMzESnPulG7cy', NULL, '2019-03-01 04:04:11', '2019-03-01 04:04:11'),
(15, 'kkkkkkkkkkkkkkhhh', 'admin16@admin.com', NULL, '$2y$10$9X5oi6O02eV72en/6ko6muXQgRfOv6Me/A.XCG75WLVfluvDwQGKy', NULL, '2019-03-01 06:05:01', '2019-03-01 06:05:01'),
(16, 'Ashutosh Kumar Choubey', 'admin18@admin.com', NULL, '$2y$10$97kII0qvFMb7aI3nbGhujOH3YyI/0xd5BvVvlGZwWT8wCh8mT8yqm', NULL, '2019-03-01 11:55:25', '2019-03-01 11:55:25'),
(17, 'dfdhf', 'admin20@admin.com', NULL, '$2y$10$lKxL/HCIZIzPsfGKY5fYWenIZY6/BgFBCWo3N4jIsp4K3r.2x9YDa', NULL, '2019-03-07 01:53:11', '2019-03-07 01:53:11'),
(18, 'Ashutosh Kumar Choubey', 'admin21@admin.com', NULL, '$2y$10$N0fxesFnwAWRJM/W3WDPDOembBp/B2K6VDXFukafgcaqHBb7TBYaO', NULL, '2019-03-07 01:54:34', '2019-03-07 01:54:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indents`
--
ALTER TABLE `indents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indent_details`
--
ALTER TABLE `indent_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD KEY `id` (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_debit_logs`
--
ALTER TABLE `supplier_debit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `indents`
--
ALTER TABLE `indents`
  MODIFY `id` int(155) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `indent_details`
--
ALTER TABLE `indent_details`
  MODIFY `id` int(155) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(155) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(155) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplier_debit_logs`
--
ALTER TABLE `supplier_debit_logs`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
