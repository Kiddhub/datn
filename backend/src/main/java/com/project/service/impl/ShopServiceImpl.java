package com.project.service.impl;

import com.project.config.DateTimeConfig;
import com.project.dto.request.CreateShopRequest;
import com.project.dto.request.UpdateShopRequest;
import com.project.exception.ShopException;
import com.project.model.Role;
import com.project.model.Shop;
import com.project.model.ShopStatus;
import com.project.model.User;
import com.project.repository.ShopRepository;
import com.project.repository.UserRepository;
import com.project.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ShopServiceImpl implements ShopService {
    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Override
    public Shop createShop(CreateShopRequest req, User user) throws ShopException {
        Shop shop1 = shopRepository.findByUserId(user.getId());
        if(shop1 == null){
            Shop shop = new Shop();
            shop.setName(req.getName());
            shop.setUser(user);
            shop.setCreatedAt(DateTimeConfig.formatDateTime(LocalDateTime.now()));
            shop.setAddress(req.getAddress());
            shop.setImageUrl(req.getImageUrl());
            shop.setStatus("ONLINE");
            Shop savedShop = shopRepository.save(shop);
            user.getRoles().add(Role.SHOP);
            userRepository.save(user);
            return shopRepository.save(savedShop);
        }
        return shop1;
    }

    @Override
    public Shop updateShop(Long shopId, UpdateShopRequest req) throws ShopException {
        Optional<Shop> opt = shopRepository.findById(shopId);
        if(opt.isPresent()){
            Shop updatedShop = opt.get();
            updatedShop.setName(req.getName());
            updatedShop.setImageUrl(req.getImageUrl());
            updatedShop.setAddress(req.getAddress());
            return shopRepository.save(updatedShop);
        }
        throw new ShopException("Not found with shopId: " + shopId);
    }

    @Override
    public Shop findShopByUser(Long userId) {
        return shopRepository.findByUserId(userId);
    }

    @Override
    public Shop findByToken(String token) {
        String jwt = token.substring(7);
        String username = jwtService.extractUserName(jwt);
        Optional<User> user = userRepository.findByEmail(username);
        if(user.isPresent()){
            User user1 = user.get();
            return shopRepository.findByUserId(user1.getId());
        }else return null;
    }

    @Override
    public List<Shop> getAllShop() {
        return shopRepository.findAll();
    }

    @Override
    public Shop findById(Long shopId) {
        Optional<Shop> opt = shopRepository.findById(shopId);
        return opt.orElse(null);
    }

}
