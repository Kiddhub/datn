package com.project.controller;

import com.project.model.Coupon;
import com.project.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/coupon")
public class UserCouponController {
    @Autowired
    private CouponService couponService;

    @GetMapping("/couponShop/{shopId}")
    public ResponseEntity<List<Coupon>> listCouponShop(@PathVariable Long shopId){
        List<Coupon> coupons = couponService.listUserCoupon(shopId);
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
    @GetMapping("/")
    public ResponseEntity<List<Coupon>> getAllCouponAdmin(){
        List<Coupon> coupons = couponService.getCouponAdmin();
        return new ResponseEntity<>(coupons,HttpStatus.OK);
    }
}
