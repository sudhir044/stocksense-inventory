CREATE TABLE IF NOT EXISTS stock_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL
        REFERENCES products(id),

    location_id UUID NOT NULL
        REFERENCES locations(id),

    movement_type VARCHAR(30) NOT NULL
        CHECK (
            movement_type IN (
                'receipt',
                'delivery',
                'transfer_in',
                'transfer_out',
                'adjustment'
            )
        ),

    quantity_change NUMERIC(12,3) NOT NULL,

    reference_type VARCHAR(30) NOT NULL,

    reference_id UUID NOT NULL,

    performed_by UUID
        REFERENCES users(id)
        ON DELETE SET NULL,

    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);