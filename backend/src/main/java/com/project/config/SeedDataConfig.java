package com.project.config;

import com.project.model.Role;
import com.project.model.User;
import com.project.repository.UserRepository;
import com.project.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component

public class SeedDataConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(Role.ADMIN);
            User admin = User.builder()
                    .firstName("admin")
                    .lastName("admin")
                    .email("admin@admin.com")
                    .password(passwordEncoder.encode("1234"))
                    .roles(adminRoles)
                    .build();
            userService.save(admin);
        }
    }



}