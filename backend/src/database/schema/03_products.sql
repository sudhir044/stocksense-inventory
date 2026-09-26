CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(200) NOT NULL,

    sku VARCHAR(100) NOT NULL UNIQUE,

    category_id UUID
        REFERENCES categories(id)
        ON DELETE SET NULL,

    unit VARCHAR(30) NOT NULL,

    description TEXT,

    cost_price NUMERIC(12, 2) DEFAULT 0
        CHECK (cost_price >= 0),

    reorder_level NUMERIC(12, 3) DEFAULT 0
        CHECK (reorder_level >= 0),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);