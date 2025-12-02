CREATE TABLE tb_payments (
     id UUID PRIMARY KEY,
     event_id VARCHAR(30) NOT NULL,
     user_document VARCHAR(11) NOT NULL,
     amount INTEGER NOT NULL,
     method VARCHAR(50) NOT NULL,
     gateway VARCHAR(50) NOT NULL,
     gateway_transaction_id VARCHAR(255),
     status VARCHAR(50) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE NOT NULL
);