-- dreamers_db.transactions definition

CREATE TABLE `transactions` (
  `fn_id` varchar(255) NOT NULL,
  `dp_id` varchar(255) NOT NULL,
  `transaction_amount` double DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `general_comment` varchar(255) DEFAULT NULL,
  `share_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`fn_id`,`dp_id`),
  KEY `dp_id` (`dp_id`),
  KEY `fn_id` (`fn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
