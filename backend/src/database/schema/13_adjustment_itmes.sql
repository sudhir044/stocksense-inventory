CREATE TABLE IF NOT EXISTS adjustment_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    adjustment_id UUID NOT NULL
        REFERENCES adjustments(id)
        ON DELETE CASCADE,

    product_id UUID NOT NULL
        REFERENCES products(id),

    system_quantity NUMERIC(12,3) NOT NULL,

    counted_quantity NUMERIC(12,3) NOT NULL
        CHECK (counted_quantity >= 0),

    difference NUMERIC(12,3)
        GENERATED ALWAYS AS (
            counted_quantity - system_quantity
        ) STORED,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);