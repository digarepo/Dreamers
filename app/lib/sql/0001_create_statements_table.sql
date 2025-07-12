CREATE TABLE IF NOT EXISTS statements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fn_id INT NOT NULL,
  dp_id VARCHAR(20) NOT NULL UNIQUE,
  deposit_date DATE NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  depositor_name VARCHAR(100) NOT NULL,
  reconciliation ENUM('pending', 'verified', 'disputed') DEFAULT 'pending',
  ref_number VARCHAR(20) NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  account_type ENUM('checking', 'savings', 'business') DEFAULT 'checking',
  comment VARCHAR(255),
  version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (fn_id) REFERENCES financial_notes(id) ON DELETE CASCADE
);

CREATE INDEX idx_fn_id ON statements (fn_id);
CREATE INDEX idx_deposit_date ON statements (deposit_date);