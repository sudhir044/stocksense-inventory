CREATE TABLE IF NOT EXISTS transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    reference VARCHAR(50) NOT NULL UNIQUE,

    source_location_id UUID NOT NULL
        REFERENCES locations(id),

    destination_location_id UUID NOT NULL
        REFERENCES locations(id),

    scheduled_date DATE,

    transfer_date TIMESTAMPTZ,

    status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (status IN (
            'draft',
            'waiting',
            'ready',
            'done',
            'canceled'
        )),

    created_by UUID
        REFERENCES users(id)
        ON DELETE SET NULL,

    validated_by UUID
        REFERENCES users(id)
        ON DELETE SET NULL,

    validated_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (source_location_id <> destination_location_id)
);