package com.project.service;

import com.project.dto.request.CreateShopRequest;
import com.project.dto.request.UpdateShopRequest;
import com.project.exception.ShopException;
import com.project.model.Shop;
import com.project.model.User;

import java.util.List;

public interface ShopService {
    Shop createShop(CreateShopRequest req, User user) throws ShopException;
    Shop updateShop(Long shopId, UpdateShopRequest req) throws ShopException;
    Shop findShopByUser(Long userId);
    Shop findByToken(String token);
    List<Shop> getAllShop();
    Shop findById(Long shopId);
}
