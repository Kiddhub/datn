package com.project.repository;

import com.project.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    @Query("SELECT c FROM Coupon c WHERE c.code = :code")
    boolean findByCode(@Param("code") String code);

    @Query("SELECT c FROM Coupon c WHERE c.shopId = :shopId")
    List<Coupon> couponShop(@Param("shopId") Long shopId);

    @Query("SELECT c FROM Coupon c WHERE c.shopId = null")
    List<Coupon> couponAdmin();

    @Query("SELECT c FROM Coupon c WHERE c.shopId != null")
    List<Coupon> listCouponShopAdmin();
    @Query("SELECT c FROM Coupon c " +
            "WHERE c.shopId = :shopId " +
            "AND c.status = 'AVAILABLE' " +
            "AND :currentTime BETWEEN c.timeStart AND c.timeEnd")
    List<Coupon> findAvailableCouponsByShopId(@Param("shopId") Long shopId,
                                              @Param("currentTime") LocalDateTime currentTime);
}

