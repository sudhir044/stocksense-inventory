CREATE TABLE IF NOT EXISTS stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    location_id UUID NOT NULL
        REFERENCES locations(id)
        ON DELETE CASCADE,

    quantity NUMERIC(12,3) NOT NULL DEFAULT 0
        CHECK (quantity >= 0),

    reserved_quantity NUMERIC(12,3) NOT NULL DEFAULT 0
        CHECK (reserved_quantity >= 0),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (product_id, location_id),

    CHECK (reserved_quantity <= quantity)
);