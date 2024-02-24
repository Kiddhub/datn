package com.project.controller;

import com.project.dto.request.StatusOrderRequest;
import com.project.model.Order;
import com.project.model.Shop;
import com.project.service.OrderService;
import com.project.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop/order")
@PreAuthorize("hasRole('SHOP')")
@RequiredArgsConstructor
public class ShopOrderController {
    private final OrderService orderService;
    private final ShopService shopService;

    @GetMapping("/")
    public ResponseEntity<List<Order>> getShopOrders(@RequestHeader("Authorization")String jwt){
        Shop shop = shopService.findByToken(jwt);
        List<Order> orders = orderService.getShopOrders(shop.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@RequestBody StatusOrderRequest req, @PathVariable Long orderId){
        Order order = orderService.updateOrderStatus(orderId,req.getStatus());
        return new ResponseEntity<>(order,HttpStatus.OK);
    }
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getUserOrder(@PathVariable Long orderId){
        Order order = orderService.getUserOrder(orderId);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Order>> getUserOrdersByStatus(@RequestBody StatusOrderRequest req,@RequestHeader("Authorization")String jwt){
        Shop shop = shopService.findByToken(jwt);
        List<Order> orders = orderService.getUserOrdersByStatus(shop.getId(),req.getStatus());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
