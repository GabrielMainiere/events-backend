package br.com.mspayments.services;

import br.com.mspayments.controllers.dtos.UserData;
import br.com.mspayments.models.User;
import br.com.mspayments.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User createOrUpdateUser(UserData userData, String userId) {
        var existingUser = userRepository.findByCpf(userData.getCpf());
        if (existingUser.isPresent()) {
            log.info("User found by CPF: {}", userData.getCpf());
            return existingUser.get();
        }

        // Criar novo usuário
        User user = new User();
        user.setName(userData.getName());
        user.setEmail(userData.getEmail());
        user.setCpf(userData.getCpf());

        User savedUser = userRepository.save(user);
        log.info("New user created with ID: {}", savedUser.getId());
        return savedUser;
    }

}
