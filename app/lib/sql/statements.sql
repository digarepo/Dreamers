-- dreamers_db.statements definition

CREATE TABLE `statements` (
  `dp_id` varchar(255) NOT NULL,
  `deposit_date` datetime DEFAULT NULL,
  `owner_name` varchar(255) DEFAULT NULL,
  `depositor_name` varchar(255) DEFAULT NULL,
  `reconciliation` varchar(255) DEFAULT NULL,
  `ref_number` varchar(255) DEFAULT NULL,
  `deposit_amount` double DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_type` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
