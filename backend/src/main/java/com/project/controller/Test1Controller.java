package com.project.controller;


import com.project.model.Product;
import com.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/test")
public class Test1Controller {
    @Autowired
    private ProductService productService;
    @GetMapping("/anon")
    public String anonEndPoint() {
        return "everyone can see this";
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @RequestParam(name = "ratingValue", required = false) Double ratingValue) {

        List<Product> products = productService.filterProducts(categoryId, ratingValue);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping("/users")
    @PreAuthorize("hasRole('USER')")
    public String usersEndPoint() {
        return "ONLY users can see this";
    }

    @GetMapping("/admins")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminsEndPoint() {
        return "ONLY admins can see this";
    }
    @GetMapping("/shops")
    @PreAuthorize("hasRole('SHOP')")
    public String shopEndPoint() {
        return "ONLY shop can see this";
    }
}
