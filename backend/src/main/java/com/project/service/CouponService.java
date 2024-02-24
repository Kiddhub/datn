package com.project.service;

import com.project.dto.request.CouponRequest;
import com.project.dto.request.UpdateCouponRequest;
import com.project.exception.CouponException;
import com.project.model.Coupon;

import java.time.LocalDateTime;
import java.util.List;

public interface CouponService {
    Coupon createCoupon(CouponRequest req) throws CouponException;
    Coupon updateCouponAdmin(CouponRequest request, Long couponId) throws CouponException;
    Coupon updateStatusCoupon(Long couponId);
    Coupon createCouponShop(CouponRequest req,Long shopId) throws CouponException;
    void deleteCoupon(Long couponId) throws CouponException;
    Coupon updateCoupon(Long couponId, CouponRequest req) throws CouponException;
    List<Coupon> getCouponShop(Long shopId);
    List<Coupon> getCouponShopAdmin();
    List<Coupon> getCouponAdmin();
    Coupon checkQuantity(Long couponId) throws CouponException;
    void confirmCoupon(Long couponId);
    void deniedCoupon(Long couponId);
    List<Coupon> listUserCoupon(Long shopId);
}
