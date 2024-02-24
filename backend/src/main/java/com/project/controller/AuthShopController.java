package com.project.controller;

import com.project.dto.request.CreateShopRequest;
import com.project.dto.request.SignInRequest;
import com.project.dto.request.SignUpRequest;
import com.project.dto.response.AuthResponse;
import com.project.dto.response.JwtAuthenticationResponse;
import com.project.exception.ShopException;
import com.project.exception.UserException;
import com.project.model.Shop;
import com.project.model.User;
import com.project.service.ShopService;
import com.project.service.UserService;
import com.project.service.impl.AuthenticationService;
import com.project.service.impl.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthShopController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ShopService shopService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody SignInRequest request) {
        return authenticationService.signIn(request);
    }

    @PostMapping("/register")
    public JwtAuthenticationResponse register(@RequestBody SignUpRequest request) throws UserException {
        return authenticationService.signup(request);
    }

    @PostMapping("/newShop")
    public ResponseEntity<Shop> createShop(@RequestBody CreateShopRequest request,
                                           @RequestHeader("Authorization") String authorization) throws ShopException {

        User user = userService.findUsernameByToken(authorization);
        Shop shop = shopService.createShop(request,user);
        return new ResponseEntity<>(shop, HttpStatus.CREATED);
    }


}
