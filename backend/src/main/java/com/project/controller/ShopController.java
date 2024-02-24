package com.project.controller;

import com.project.dto.request.UpdateShopRequest;
import com.project.exception.ShopException;
import com.project.exception.UserException;
import com.project.model.Shop;
import com.project.model.User;
import com.project.service.CartService;
import com.project.service.ShopService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shop")
@PreAuthorize("hasRole('SHOP')")
public class ShopController {
    @Autowired
    private ShopService shopServices;
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;
    @GetMapping("/")
    public ResponseEntity<Shop> getShop(@RequestHeader("Authorization")String jwt) throws UserException {
        User user = userService.findUsernameByToken(jwt);
        Shop shop = shopServices.findShopByUser(user.getId());
        return new ResponseEntity<>(shop,HttpStatus.OK);
    }
    @PutMapping("/update/{shopId}")
    public ResponseEntity<Shop> updateShop(@RequestBody UpdateShopRequest req,
                                           @PathVariable Long shopId) throws ShopException {
        Shop updatedShop = shopServices.updateShop(shopId, req);
        return ResponseEntity.ok(updatedShop);
    }



}
