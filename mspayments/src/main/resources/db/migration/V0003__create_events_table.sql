CREATE TABLE tb_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    price INTEGER NOT NULL, -- valor em centavos
    sale_start_at TIMESTAMP NOT NULL,
    sale_end_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_events_start_at ON tb_events(start_at);
CREATE INDEX idx_events_price ON tb_events(price);
CREATE INDEX idx_events_sale_period ON tb_events(sale_start_at, sale_end_at);
