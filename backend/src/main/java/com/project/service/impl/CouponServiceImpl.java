package com.project.service.impl;

import com.project.config.DateTimeConfig;
import com.project.dto.request.CouponRequest;
import com.project.exception.CouponException;
import com.project.model.Coupon;
import com.project.repository.CouponRepository;
import com.project.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CouponServiceImpl implements CouponService {
    @Autowired
    private CouponRepository couponRepository;
    @Override
    public Coupon createCoupon(CouponRequest req) throws CouponException{
        Coupon coupon = new Coupon();
        coupon.setCode(req.getCode());
        coupon.setCouponType(req.getCouponType());
        coupon.setNumber(req.getNumber());
        coupon.setDiscountType(req.getDiscountType());
        coupon.setQuantity(req.getQuantity());
        coupon.setTimeStart(LocalDateTime.parse(req.getTimeStart()));
        coupon.setTimeEnd(LocalDateTime.parse(req.getTimeEnd()));
        coupon.setMinPrice(req.getMinPrice());
        coupon.setStatus("AVAILABLE");
        coupon.setCreatedAt(DateTimeConfig.formatDateTime(LocalDateTime.now()));
        coupon.setDescription(req.getDescription());
        return couponRepository.save(coupon);
    }
    @Override
    public Coupon updateCouponAdmin(CouponRequest req, Long couponId) throws CouponException {
        Optional<Coupon> opt = couponRepository.findById(couponId);
        if(opt.isPresent()){
            Coupon coupon = opt.get();
            if(coupon.getCode().equals(req.getCode())){
                throw new CouponException("Không được trùng code");
            }
            coupon.setCode(req.getCode());
            coupon.setCouponType(req.getCouponType());
            coupon.setNumber(req.getNumber());
            coupon.setDiscountType(req.getDiscountType());
            coupon.setQuantity(req.getQuantity());
            coupon.setTimeStart(LocalDateTime.parse(req.getTimeStart()));
            coupon.setTimeEnd(LocalDateTime.parse(req.getTimeEnd()));
            coupon.setMinPrice(req.getMinPrice());
            coupon.setDescription(req.getDescription());
            return couponRepository.save(coupon);
        }
        return null;
    }
    @Override
    public Coupon updateStatusCoupon(Long couponId) {
        Optional<Coupon> opt = couponRepository.findById(couponId);
        if (opt.isPresent()){
            Coupon coupon = opt.get();
            if(coupon.getStatus().equals("AVAILABLE")){
                coupon.setStatus("HIDE");
            }else {
                coupon.setStatus("AVAILABLE");
            }
            return couponRepository.save(coupon);
        }
        return null;
    }
    @Override
    public Coupon createCouponShop(CouponRequest req, Long shopId) throws CouponException {
        Coupon coupon = new Coupon();
        coupon.setCode(req.getCode());
        coupon.setCouponType(req.getCouponType());
        coupon.setNumber(req.getNumber());
        coupon.setDiscountType(req.getDiscountType());
        coupon.setQuantity(req.getQuantity());
        coupon.setTimeStart(LocalDateTime.parse(req.getTimeStart()));
        coupon.setTimeEnd(LocalDateTime.parse(req.getTimeEnd()));
        coupon.setMinPrice(req.getMinPrice());
        coupon.setStatus("REQUEST");
        coupon.setShopId(shopId);
        coupon.setCreatedAt(DateTimeConfig.formatDateTime(LocalDateTime.now()));
        coupon.setDescription(req.getDescription());
        return couponRepository.save(coupon);
    }
    @Override
    public void deleteCoupon(Long couponId) throws CouponException {
        Optional<Coupon> coupon = couponRepository.findById(couponId);
        if(coupon.isPresent()){
            Coupon coupon1 = coupon.get();
            couponRepository.delete(coupon1);
        }
        throw new CouponException("Coupon not found with ID");
    }
    @Override
    public Coupon updateCoupon(Long couponId, CouponRequest req) throws CouponException {
        Optional<Coupon> opt = couponRepository.findById(couponId);
        if(opt.isPresent()){
            Coupon coupon = opt.get();
            coupon.setCouponType(req.getCouponType());
            coupon.setNumber(req.getNumber());
            coupon.setDiscountType(req.getDiscountType());
            coupon.setQuantity(req.getQuantity());
            coupon.setTimeStart(LocalDateTime.parse(req.getTimeStart()));
            coupon.setTimeEnd(LocalDateTime.parse(req.getTimeEnd()));
            coupon.setMinPrice(req.getMinPrice());
            coupon.setDescription(req.getDescription());
            coupon.setStatus("REQUEST");
            return couponRepository.save(coupon);
        }
        throw new CouponException("Coupon not found with ID");
    }
    @Override
    public List<Coupon> getCouponShop(Long shopId) {
        List<Coupon> coupons = couponRepository.couponShop(shopId);
        for (Coupon coupon: coupons){
            if (coupon.getQuantity() == 0){
                coupon.setStatus("SOLD");
                couponRepository.save(coupon);
            }else if (LocalDateTime.now().isAfter(coupon.getTimeEnd())){
                coupon.setStatus("EXPIRED");
                couponRepository.save(coupon);
            }
        }
        return coupons;
    }
    @Override
    public List<Coupon> getCouponShopAdmin() {
        List<Coupon> coupons = couponRepository.listCouponShopAdmin();
        for (Coupon coupon: coupons){
            if (coupon.getQuantity() == 0){
                coupon.setStatus("SOLD");
                couponRepository.save(coupon);
            }else if (LocalDateTime.now().isAfter(coupon.getTimeEnd())){
                coupon.setStatus("EXPIRED");
                couponRepository.save(coupon);
            }
        }
        return coupons;
    }

    @Override
    public List<Coupon> getCouponAdmin() {
        List<Coupon> coupons = couponRepository.couponAdmin();
        for (Coupon coupon: coupons){
            if (coupon.getQuantity() == 0){
                coupon.setStatus("SOLD");
                couponRepository.save(coupon);
            }else if (LocalDateTime.now().isAfter(coupon.getTimeEnd())){
                coupon.setStatus("EXPIRED");
                couponRepository.save(coupon);
            }
        }
        return coupons;
    }

    @Override
    public Coupon checkQuantity(Long couponId) throws CouponException {
        Optional<Coupon> opt = couponRepository.findById(couponId);
        if(opt.isPresent()) {
            Coupon coupon = opt.get();
            if(coupon.getQuantity() <= 0){
                coupon.setStatus("SOLD");
            }else {
                coupon.setQuantity(coupon.getQuantity() - 1 );
            }
            return couponRepository.save(coupon);
        }
        else throw new CouponException("Coupon not found with ID");
    }
    @Override
    public void confirmCoupon(Long couponId) {
        Optional<Coupon> opt = couponRepository.findById(couponId);
        if (opt.isPresent()){
            Coupon coupon = opt.get();
            coupon.setStatus("AVAILABLE");
            couponRepository.save(coupon);
        }
    }
    @Override
    public void deniedCoupon(Long couponId) {
        Optional<Coupon> opt = couponRepository.findById(couponId);
        if (opt.isPresent()){
            Coupon coupon = opt.get();
            coupon.setStatus("DENY");
            couponRepository.save(coupon);
        }
    }
    @Override
    public List<Coupon> listUserCoupon(Long shopId) {
        return couponRepository.findAvailableCouponsByShopId(shopId,LocalDateTime.now());
    }
}
