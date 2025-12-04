package br.com.mspaymentsrefactor.domain.entities;

import br.com.mspaymentsrefactor.domain.valueobjects.CPF;
import br.com.mspaymentsrefactor.domain.valueobjects.Email;

import java.util.Objects;
import java.util.UUID;

/**
 * Entidade que representa um usuário do sistema
 */
public class User {
    private UUID id;
    private String name;
    private Email email;
    private CPF cpf;

    public User(UUID id, String name, Email email, CPF cpf) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        this.id = id != null ? id : UUID.randomUUID();
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Email getEmail() {
        return email;
    }

    public CPF getCpf() {
        return cpf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return String.format("User[id=%s, name=%s, email=%s]", id, name, email);
    }
}

