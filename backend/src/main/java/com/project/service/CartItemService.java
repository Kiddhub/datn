package com.project.service;

import com.project.dto.request.CreateCartItemRequest;
import com.project.exception.CartException;
import com.project.exception.CartItemException;
import com.project.model.Cart;
import com.project.model.CartItem;
import com.project.model.Product;
import com.project.model.User;

public interface CartItemService {
    CartItem addCartItem(CreateCartItemRequest req,User user) throws CartException;

    void deleteCartItem(Long cartItemId) throws CartItemException;
}
