CREATE TABLE IF NOT EXISTS receipt_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    receipt_id UUID NOT NULL
        REFERENCES receipts(id)
        ON DELETE CASCADE,

    product_id UUID NOT NULL
        REFERENCES products(id),

    quantity NUMERIC(12,3) NOT NULL
        CHECK (quantity > 0),

    unit_cost NUMERIC(12,2) DEFAULT 0
        CHECK (unit_cost >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);