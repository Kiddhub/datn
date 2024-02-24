package com.project.repository;

import com.project.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {

    @Query("SELECT ci FROM CartItem ci " +
            "WHERE ci.product.id = :productId " +
            "AND ci.cart.id = :cartId " +
            "AND ci.size = :size")
    CartItem findByProductIdAndCartIdAndSize(@Param("productId") Long productId,
                                                       @Param("cartId") Long cartId,
                                                       @Param("size") String size);
}
