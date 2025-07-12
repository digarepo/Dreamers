-- SQL script to create the statements table

CREATE TABLE IF NOT EXISTS statements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fn_id INT NOT NULL,
  dp_id VARCHAR(20) NOT NULL UNIQUE,
  deposit_date DATETIME NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  depositor_name VARCHAR(100) NOT NULL,
  reconciliation VARCHAR(50) DEFAULT 'pending',
  ref_number VARCHAR(20) NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  account_type VARCHAR(50) DEFAULT 'checking',
  comment VARCHAR(255),
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_fn_id (fn_id),
  INDEX idx_deposit_date (deposit_date),
  FOREIGN KEY (fn_id) REFERENCES financial_notes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;