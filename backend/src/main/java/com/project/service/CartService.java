package com.project.service;

import com.project.exception.CartException;
import com.project.model.Cart;
import com.project.model.Shop;
import com.project.model.User;

public interface CartService {
    Cart createCart(User user, Long shopId);
    Cart updateCart(Long cartId, Long totalPrice, int totalItems) throws CartException;
    Cart findCartByUserAndShop(Long userId,Long shopId);
}
