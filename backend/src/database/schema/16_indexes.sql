CREATE INDEX IF NOT EXISTS idx_products_sku
ON products(sku);

CREATE INDEX IF NOT EXISTS idx_products_category
ON products(category_id);

CREATE INDEX IF NOT EXISTS idx_locations_warehouse
ON locations(warehouse_id);

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

CREATE INDEX IF NOT EXISTS idx_receipts_status
ON receipts(status);

CREATE INDEX IF NOT EXISTS idx_deliveries_status
ON deliveries(status);