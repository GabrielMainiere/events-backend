CREATE TABLE tb_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE
);

CREATE INDEX idx_users_email ON tb_users(email);
CREATE INDEX idx_users_cpf ON tb_users(cpf);
