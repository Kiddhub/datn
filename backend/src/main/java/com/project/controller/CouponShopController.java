package com.project.controller;

import com.project.dto.request.CouponRequest;
import com.project.exception.CouponException;
import com.project.model.Coupon;
import com.project.model.Shop;
import com.project.service.CouponService;
import com.project.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop/coupon")
@PreAuthorize("hasRole('SHOP')")
public class CouponShopController {
    @Autowired
    private CouponService couponService;
    @Autowired
    private ShopService shopService;
    @PostMapping("/new")
    public ResponseEntity<Coupon> createCoupon(@RequestBody CouponRequest request,
                                               @RequestHeader("Authorization")String jwt) throws CouponException {
        Shop shop = shopService.findByToken(jwt);
        Coupon coupon = couponService.createCouponShop(request, shop.getId());
        return new ResponseEntity<>(coupon, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Coupon>> getCoupons(@RequestHeader("Authorization")String jwt){
        Shop shop = shopService.findByToken(jwt);
        List<Coupon> coupons = couponService.getCouponShop(shop.getId());
        return new ResponseEntity<>(coupons,HttpStatus.OK);
    }
    @PutMapping("/update/{couponId}")
    public ResponseEntity<Coupon> updateCoupon (@PathVariable Long couponId,
                                                @RequestBody CouponRequest request) throws CouponException {
        Coupon coupon = couponService.updateCoupon(couponId,request);
        return new ResponseEntity<>(coupon,HttpStatus.OK);
    }
}
