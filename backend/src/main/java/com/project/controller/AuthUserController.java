package com.project.controller;

import com.project.dto.request.CreateAddressRequest;
import com.project.dto.request.SignInRequest;
import com.project.dto.request.SignUpRequest;
import com.project.dto.response.AuthResponse;
import com.project.dto.response.JwtAuthenticationResponse;
import com.project.exception.UserException;
import com.project.model.Address;
import com.project.model.User;
import com.project.service.AddressService;
import com.project.service.UserService;
import com.project.service.impl.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
public class AuthUserController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody SignInRequest request) {
        return authenticationService.signIn(request);
    }

    @PostMapping("/register")
    public JwtAuthenticationResponse register(@RequestBody SignUpRequest request) throws UserException {
        return authenticationService.signup(request);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestHeader("Authorization") String authorization) throws UserException {
        User user = userService.findUsernameByToken(authorization);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/address/new")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Address> saveAddress(@RequestHeader("Authorization") String jwt,
                                               @RequestBody CreateAddressRequest request) {
        User user = userService.findUsernameByToken(jwt);
        Address address = addressService.createNewAddress(request, user);
        return new ResponseEntity<>(address, HttpStatus.OK);

    }
}
