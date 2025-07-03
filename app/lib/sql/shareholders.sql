-- dreamers_db.shareholders definition

CREATE TABLE `shareholders` (
  `fn_id` varchar(255) NOT NULL,
  `name_amharic` varchar(255) DEFAULT NULL,
  `name_english` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `subcity` varchar(255) DEFAULT NULL,
  `wereda` varchar(255) DEFAULT NULL,
  `house_number` varchar(255) DEFAULT NULL,
  `phone_1` varchar(255) DEFAULT NULL,
  `phone_2` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `share_will` double DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `receipt_number` varchar(255) DEFAULT NULL,
  `attendance_2023_dec_24` tinyint(1) NOT NULL DEFAULT 0,
  `certificate_number` varchar(255) DEFAULT NULL,
  `taken_certificate` tinyint(1) NOT NULL DEFAULT 0,
  `share_price` double DEFAULT NULL,
  `error_share` varchar(255) DEFAULT NULL,
  `error_form` varchar(255) DEFAULT NULL,
  `error_bank_slip` varchar(255) DEFAULT NULL,
  `comment_medina` varchar(255) DEFAULT NULL,
  `general_comment` varchar(255) DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT 1,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`fn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
