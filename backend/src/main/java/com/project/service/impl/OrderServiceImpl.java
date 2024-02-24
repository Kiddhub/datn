package com.project.service.impl;

import com.project.config.DateTimeConfig;
import com.project.dto.request.CreateOrderRequest;
import com.project.exception.CouponException;
import com.project.model.*;
import com.project.repository.*;
import com.project.service.CartService;
import com.project.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final CouponRepository couponRepository;
    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    @Override
    public Order createOrder(User user,CreateOrderRequest req) throws CouponException {
        Cart cart = cartRepository.findByUserIdAndShopId(user.getId(), req.getShopId());
        List<OrderItem> orderItems = new ArrayList<>();
        for(CartItem item: cart.getCartItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSize(item.getSize());
            OrderItem createdOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(createdOrderItem);
            cartItemRepository.deleteById(item.getId());
        }

        cartRepository.delete(cart);

        if(req.getVoucher() != null){
            Optional<Coupon> coupon = couponRepository.findById(req.getVoucher().getId());
            if(coupon.isPresent()){
                Coupon coupon1 = coupon.get();
                if(coupon1.getQuantity() > 0){
                    coupon1.setQuantity(coupon1.getQuantity() - 1);
                }else {
                    throw new CouponException("Đã hết voucher");
                }
                couponRepository.save(coupon1);
            }
        }
        if(req.getVoucherShop() != null){
            Optional<Coupon> coupon = couponRepository.findById(req.getVoucherShop().getId());
            if(coupon.isPresent()){
                Coupon coupon1 = coupon.get();
                if(coupon1.getQuantity() > 0){
                    coupon1.setQuantity(coupon1.getQuantity() - 1);
                }else {
                    throw new CouponException("Đã hết voucher");
                }
                couponRepository.save(coupon1);
            }
        }
        Order createdOrder = new Order();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setFirstName(req.getFirstName());
        createdOrder.setLastName(req.getLastName());
        createdOrder.setAddress(req.getAddress());
        createdOrder.setCity(req.getCity());
        createdOrder.setMobile(req.getMobile());
        createdOrder.setPayment(req.getPayment());
        createdOrder.setTotalItem(cart.getTotalItem());
        createdOrder.setCreatedAt(DateTimeConfig.formatDateTime(LocalDateTime.now()));
        createdOrder.setStatus("REQUEST");
        createdOrder.setShopId(req.getShopId());
        if(req.getDiscountPrice() == 0) {
            createdOrder.setDiscountPrice(cart.getTotalPrice());
            Order savedOrder = orderRepository.save(createdOrder);
            for (OrderItem item:orderItems){
                item.setOrder(savedOrder);
                orderItemRepository.save(item);
            }
            return savedOrder;
        }else {
            createdOrder.setDiscountPrice(req.getDiscountPrice());
            Order savedOrder = orderRepository.save(createdOrder);
            for (OrderItem item:orderItems){
                item.setOrder(savedOrder);
                orderItemRepository.save(item);
            }
            return savedOrder;
        }
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findAllUserOrders(userId);
    }

    @Override
    public List<Order> getShopOrders(Long shopId) {
        return orderRepository.findAllShopOrders(shopId);
    }

    @Override
    public Order updateOrderStatus(Long orderId,String status) {
        Optional<Order> opt = orderRepository.findById(orderId);
        if(opt.isPresent()){
            Order order = opt.get();
            order.setStatus(status);
            if(status.equals("SHIPPED")){
                order.setDeliveryDate(DateTimeConfig.formatDateTime(LocalDateTime.now()));
            }
            return orderRepository.save(order);
        }
        return null;
    }

    @Override
    public Order getUserOrder(Long orderId) {
        Optional<Order> opt = orderRepository.findById(orderId);
        return opt.orElse(null);
    }

    @Override
    public List<Order> getUserOrdersByStatus(Long shopId, String status) {
        return orderRepository.findOrders(shopId,status);
    }


}
