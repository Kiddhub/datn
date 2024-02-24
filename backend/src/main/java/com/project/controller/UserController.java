package com.project.controller;

import com.project.model.Address;
import com.project.model.User;
import com.project.service.AddressService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AddressService addressService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization")String jwt) {
        User user = userService.findUsernameByToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/address")
    public ResponseEntity<List<Address>> getAllAddress(@RequestHeader("Authorization")String jwt){
        User user = userService.findUsernameByToken(jwt);
        List<Address> addresses = addressService.getUserAddress(user.getId());
        return new ResponseEntity<>(addresses,HttpStatus.OK);
    }
}
