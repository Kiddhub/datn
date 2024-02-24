package com.project.controller;

import com.project.exception.UserException;
import com.project.model.Cart;
import com.project.model.User;
import com.project.repository.CartRepository;
import com.project.service.CartService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/cart")
@PreAuthorize("hasRole('USER')")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<List<Cart>> findUserCarts(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUsernameByToken(jwt);
        List<Cart> carts = cartRepository.findByUserId(user.getId());
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    @GetMapping("/{shopId}")
    public ResponseEntity<Cart> findCartByUserAndShopId(@RequestHeader("Authorization") String jwt,
                                                        @PathVariable Long shopId) {
        User user = userService.findUsernameByToken(jwt);
        Cart cart = cartService.findCartByUserAndShop(user.getId(),shopId);
        return new ResponseEntity<>(cart,HttpStatus.OK);
    }


}
