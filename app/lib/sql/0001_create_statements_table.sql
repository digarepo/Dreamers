CREATE TABLE IF NOT EXISTS statements (
  id SERIAL PRIMARY KEY,  -- PostgreSQL uses SERIAL for auto-increment
  fn_id INT NOT NULL,
  dp_id VARCHAR(20) NOT NULL UNIQUE,
  deposit_date TIMESTAMP NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fn_id) REFERENCES financial_notes(id) ON DELETE CASCADE
);

-- PostgreSQL uses separate CREATE INDEX statements
CREATE INDEX idx_fn_id ON statements (fn_id);
CREATE INDEX idx_deposit_date ON statements (deposit_date);