package com.project.repository;

import com.project.model.Cart;
import com.project.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {

    @Query("SELECT c FROM Cart c WHERE c.shopId = :shopId AND c.user.id = :userId")
    Cart findCartByShopId(@Param("shopId") Long shopId, @Param("userId") Long userId);
    @Query("SELECT ci FROM CartItem ci " +
            "JOIN ci.cart c " +
            "JOIN c.user u " +
            "WHERE u.id = :userId")
    List<CartItem> findCartItemsByUserId(@Param("userId") Long userId);
    @Query("Select c From Cart c Where c.user.id=:userId")
    List<Cart> findByUserId(@Param("userId")Long userId);
    @Query("Select c From Cart c Where c.user.id=:userId and c.shopId=:shopId")
    Cart findByUserIdAndShopId(@Param("userId")Long userId,
                                     @Param("shopId")Long shopId);
}
