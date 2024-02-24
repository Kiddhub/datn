package com.project.repository;

import com.project.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop,Long> {
    @Query("SELECT s FROM Shop s WHERE s.user.id = :userId")
    Shop findByUserId(@Param("userId") Long userId);
}
