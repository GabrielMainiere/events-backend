ALTER TABLE tb_payments
DROP COLUMN event_id,
DROP COLUMN user_document;

ALTER TABLE tb_payments
ADD COLUMN event_id UUID,
ADD COLUMN user_id UUID;

ALTER TABLE tb_payments
ADD CONSTRAINT fk_payments_event
FOREIGN KEY (event_id) REFERENCES tb_events(id);

ALTER TABLE tb_payments
ADD CONSTRAINT fk_payments_user
FOREIGN KEY (user_id) REFERENCES tb_users(id);

CREATE INDEX idx_payments_event_id ON tb_payments(event_id);
CREATE INDEX idx_payments_user_id ON tb_payments(user_id);
