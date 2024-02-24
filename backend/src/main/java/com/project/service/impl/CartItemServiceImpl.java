package com.project.service.impl;

import com.project.dto.request.CreateCartItemRequest;
import com.project.exception.CartException;
import com.project.exception.CartItemException;
import com.project.model.*;
import com.project.repository.CartItemRepository;
import com.project.repository.CartRepository;
import com.project.repository.ProductRepository;
import com.project.service.CartItemService;
import com.project.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Iterator;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public CartItem addCartItem(CreateCartItemRequest req,User user) throws CartException {
        CartItem item = new CartItem();
        Optional<Product> opt = productRepository.findById(req.getProductId());
        if(opt.isPresent()){
            Product product = opt.get();
            for (Size size : product.getSizes()) {
                if (size.getName().equals(req.getSize())) {
                    size.setQuantity(size.getQuantity() - req.getQuantity());
                }
            }
            productRepository.save(product);
            Cart cart = cartRepository.findCartByShopId(product.getShop().getId(), user.getId());
            if(cart != null){
                CartItem cartItem = cartItemRepository.findByProductIdAndCartIdAndSize(req.getProductId(), cart.getId(),req.getSize());
                if(cartItem != null){
                    cartItem.setQuantity(cartItem.getQuantity() + req.getQuantity());
                    cartItem.setPrice(cartItem.getPrice() + req.getPrice());
                    cart.setTotalItem(cart.getTotalItem() + req.getQuantity());
                    cart.setTotalPrice(cart.getTotalPrice() + req.getPrice());
                    cartRepository.save(cart);
                    return cartItemRepository.save(cartItem);
                }else {
                    item.setProduct(product);
                    item.setQuantity(req.getQuantity());
                    item.setSize(req.getSize());
                    item.setPrice(req.getPrice());
                    item.setCart(cart);
                    cart.setTotalItem(cart.getTotalItem() + req.getQuantity());
                    cart.setTotalPrice(cart.getTotalPrice() + req.getPrice());
                    cartRepository.save(cart);
                    return cartItemRepository.save(item);
                }
            }else {
                Cart createdCart = cartService.createCart(user,product.getShop().getId());
                item.setProduct(product);
                item.setQuantity(req.getQuantity());
                item.setSize(req.getSize());
                item.setPrice(req.getPrice());
                item.setCart(createdCart);
                createdCart.setTotalItem(createdCart.getTotalItem() + item.getQuantity());
                createdCart.setTotalPrice(createdCart.getTotalPrice() + item.getPrice());
                cartRepository.save(createdCart);
                return cartItemRepository.save(item);
            }
        }else {
            return null;
        }

    }

    @Override
    public void deleteCartItem(Long cartItemId) throws CartItemException {
        Optional<CartItem> opt =cartItemRepository.findById(cartItemId);
        if(opt.isPresent()){
            CartItem cartItem = opt.get();
            cartRepository.deleteById(cartItem.getId());
        }
        else {
            throw new CartItemException("Item not found with ID");
        }
    }

}
