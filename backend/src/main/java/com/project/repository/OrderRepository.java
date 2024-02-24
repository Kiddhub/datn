package com.project.repository;

import com.project.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    List<Order> findAllUserOrders(@Param("userId") Long userId);

    @Query("SELECT o FROM Order o WHERE o.shopId = :shopId")
    List<Order> findAllShopOrders(@Param("shopId") Long shopId);

    @Query("SELECT o FROM Order o WHERE o.shopId = :shopId AND o.status = :status")
    List<Order> findOrders(@Param("shopId")Long shopId, @Param("status")String status);
}
