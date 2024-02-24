package com.project.controller;

import com.project.dto.request.CreateOrderRequest;
import com.project.dto.request.StatusOrderRequest;
import com.project.exception.CouponException;
import com.project.model.Order;
import com.project.model.User;
import com.project.service.CartService;
import com.project.service.OrderService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/order")
@PreAuthorize("hasRole('USER')")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestHeader("Authorization")String jwt,
                                             @RequestBody CreateOrderRequest req) throws CouponException {
        User user = userService.findUsernameByToken(jwt);
        Order order = orderService.createOrder(user,req);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Order>> listOrder(@RequestHeader("Authorization")String jwt){
        User user = userService.findUsernameByToken(jwt);
        List<Order> orders = orderService.getUserOrders(user.getId());
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }
    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateStatusOrder(@RequestBody StatusOrderRequest req,
                                                   @PathVariable Long orderId){
        Order order = orderService.updateOrderStatus(orderId, req.getStatus());
        return new ResponseEntity<>(order,HttpStatus.OK);
    }
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getUserOrder(@PathVariable Long orderId){
        Order order = orderService.getUserOrder(orderId);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }
}
