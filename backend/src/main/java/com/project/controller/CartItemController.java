package com.project.controller;

import com.project.dto.request.CreateCartItemRequest;
import com.project.dto.response.ApiResponse;
import com.project.exception.CartException;
import com.project.exception.CartItemException;
import com.project.exception.UserException;
import com.project.model.CartItem;
import com.project.model.User;
import com.project.service.CartItemService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/cart_items")
@PreAuthorize("hasRole('USER')")
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private UserService userService;

    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestHeader("Authorization")String jwt,
                                       @RequestBody String name){
        User user = userService.findUsernameByToken(jwt);
        String s = null;
        if(user == null){
            s = "null";
        }else {
            s = name;
        }
        return new ResponseEntity<>(s,HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<CartItem> addItemToCart(@RequestHeader("Authorization")String jwt,
                                                 @RequestBody CreateCartItemRequest req) throws UserException, CartException {
        User user = userService.findUsernameByToken(jwt);
        CartItem cartItem = cartItemService.addCartItem(req,user);
        return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteItemToCart(@PathVariable Long cartItemId,
                                                        @RequestHeader("Authorization")String jwt) throws CartItemException {
        cartItemService.deleteCartItem(cartItemId);
        ApiResponse res = new ApiResponse();
        res.setMessage("Delete Item successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
