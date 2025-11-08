CREATE TABLE tb_currency_prices (
    currency_code VARCHAR(3) NOT NULL,
    price_brl FLOAT NOT NULL,
    last_updated TIMESTAMP NOT NULL,
    PRIMARY KEY (currency_code),
    UNIQUE (currency_code)
);

