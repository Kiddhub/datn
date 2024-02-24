package com.project.controller;

import com.project.dto.request.CouponRequest;
import com.project.dto.response.ApiResponse;
import com.project.exception.CouponException;
import com.project.exception.ProductException;
import com.project.model.Coupon;
import com.project.service.CouponService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/coupon")
@PreAuthorize("hasRole('ADMIN')")
public class AdminCouponController {
    @Autowired
    private CouponService couponService;
    @GetMapping("/couponShop/")
    public ResponseEntity<List<Coupon>> getAllCouponShop() {
        List<Coupon> coupons = couponService.getCouponShopAdmin();
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
    @GetMapping("/")
    public ResponseEntity<List<Coupon>> getAllCouponAdmin(){
        List<Coupon> coupons = couponService.getCouponAdmin();
        return new ResponseEntity<>(coupons,HttpStatus.OK);
    }
    @PutMapping("/{couponId}")
    public ResponseEntity<Coupon> updateCouponAdmin(@PathVariable Long couponId,
                                                          @RequestBody CouponRequest request) throws CouponException {
        Coupon coupon = couponService.updateCouponAdmin(request, couponId);
        return new ResponseEntity<>(coupon,HttpStatus.OK);
    }
    @PutMapping("/change/{couponId}")
    public ResponseEntity<Coupon> updateStatusCouponAdmin(@PathVariable Long couponId) throws CouponException {
        Coupon coupon = couponService.updateStatusCoupon(couponId);
        return new ResponseEntity<>(coupon,HttpStatus.OK);
    }
    @PostMapping("/new")
    public ResponseEntity<Coupon> createCoupon(@RequestBody CouponRequest request) throws CouponException {
        Coupon coupon = couponService.createCoupon(request);
        return new ResponseEntity<>(coupon,HttpStatus.CREATED);
    }
    @PutMapping("/couponShop/confirm/accept/{couponId}")
    public ResponseEntity<ApiResponse> confirmCoupon(
            @PathVariable Long couponId) {
        couponService.confirmCoupon(couponId);
        ApiResponse res =new ApiResponse();
        res.setMessage("Confirm Successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @PutMapping("/couponShop/confirm/denied/{couponId}")
    public ResponseEntity<ApiResponse> denyCoupon(
            @PathVariable Long couponId) {
        couponService.deniedCoupon(couponId);
        ApiResponse res =new ApiResponse();
        res.setMessage("Denied Successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);

    }


}
