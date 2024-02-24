package com.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @PostMapping("/")
    public ResponseEntity<String> homePage(){
        return new ResponseEntity<String>("Hello backend:", HttpStatus.OK);
    }
}
