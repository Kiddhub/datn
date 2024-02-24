package com.project.service.impl;

import com.project.exception.CartException;
import com.project.model.Cart;
import com.project.model.CartItem;
import com.project.model.Shop;
import com.project.model.User;
import com.project.repository.CartRepository;
import com.project.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Override
    public Cart createCart(User user, Long shopId) {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setShopId(shopId);
        return cartRepository.save(cart);
    }
    @Override
    public Cart updateCart(Long cartId, Long totalPrice, int totalItems) throws CartException {
        Optional<Cart> opt = cartRepository.findById(cartId);
        if(opt.isPresent()){
            Cart cart = opt.get();
            cart.setTotalItem(cart.getTotalItem() + totalItems);
            long total = cart.getTotalPrice()+totalPrice;
            cart.setTotalPrice(total);
            return cartRepository.save(cart);
        }else {
            throw new CartException("Cart not found with ID");
        }
    }
    @Override
    public Cart findCartByUserAndShop(Long userId, Long shopId) {
        return cartRepository.findByUserIdAndShopId(userId,shopId);
    }


}
