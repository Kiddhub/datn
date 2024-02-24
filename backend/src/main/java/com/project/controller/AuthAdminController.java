package com.project.controller;


import com.project.dto.request.SignInRequest;
import com.project.dto.response.AuthResponse;
import com.project.service.impl.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/auth")
public class AuthAdminController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody SignInRequest request) {
        return authenticationService.signIn(request);
    }
}
