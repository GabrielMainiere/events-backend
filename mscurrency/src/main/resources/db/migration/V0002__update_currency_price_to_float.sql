ALTER TABLE tb_currency_prices
RENAME COLUMN price_in_cents_brl TO price_brl;

ALTER TABLE tb_currency_prices
ALTER COLUMN price_brl TYPE FLOAT;
