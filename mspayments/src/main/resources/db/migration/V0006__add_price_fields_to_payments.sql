-- Adiciona campos de preço base, preço final e moeda na tabela de pagamentos
ALTER TABLE tb_payments
ADD COLUMN base_price INTEGER NOT NULL DEFAULT 0,
ADD COLUMN final_price INTEGER NOT NULL DEFAULT 0,
ADD COLUMN currency_code VARCHAR(3) NOT NULL DEFAULT 'BRL';

-- Remove o DEFAULT após adicionar as colunas
ALTER TABLE tb_payments
ALTER COLUMN base_price DROP DEFAULT,
ALTER COLUMN final_price DROP DEFAULT,
ALTER COLUMN currency_code DROP DEFAULT;
