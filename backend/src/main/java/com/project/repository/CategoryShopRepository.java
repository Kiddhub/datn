package com.project.repository;

import com.project.model.CategoryShop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryShopRepository extends JpaRepository<CategoryShop,Long> {
    @Query("SELECT c FROM CategoryShop c WHERE c.shop.id = :shopId")
    List<CategoryShop> getAllCategoryShop(@Param("shopId") Long shopId);
}
