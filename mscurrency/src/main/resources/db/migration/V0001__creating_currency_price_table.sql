CREATE TABLE tb_currency_prices (
    currency_code VARCHAR(3) PRIMARY KEY,
    price_in_cents_brl BIGINT NOT NULL,
    last_updated TIMESTAMP NOT NULL
);