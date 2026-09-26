CREATE INDEX IF NOT EXISTS idx_stock_product
ON stock(product_id);

CREATE INDEX IF NOT EXISTS idx_stock_location
ON stock(location_id);

CREATE INDEX IF NOT EXISTS idx_ledger_product
ON stock_ledger(product_id);

CREATE INDEX IF NOT EXISTS idx_ledger_location
ON stock_ledger(location_id);

CREATE INDEX IF NOT EXISTS idx_ledger_created_at
ON stock_ledger(created_at);