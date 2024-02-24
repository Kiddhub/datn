package com.project.service;

import com.project.exception.UserException;
import com.project.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {


    UserDetailsService userDetailsService();

    User findUsernameByToken(String token);
    User save(User newUser);
    List<User> getAllUsers();
}
