package br.com.mspayments.services;

import br.com.mspayments.controllers.dtos.UserData;
import br.com.mspayments.models.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User createOrUpdateUser(UserData userData, String userId);
}
