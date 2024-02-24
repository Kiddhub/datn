package com.project.service;

import com.project.dto.request.CreateOrderRequest;
import com.project.exception.CouponException;
import com.project.model.Address;
import com.project.model.Order;
import com.project.model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, CreateOrderRequest req) throws CouponException;
    List<Order> getAllOrders();
    List<Order> getUserOrders(Long userId);
    List<Order> getShopOrders(Long shopId);
    Order updateOrderStatus(Long orderId,String status);
    Order getUserOrder(Long orderId);
    List<Order> getUserOrdersByStatus(Long shopId, String status);
}
