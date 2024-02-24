package com.project.repository;

import com.project.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat,Long> {
    @Query("Select c from Chat c where c.user.id = :userId")
    List<Chat> findByUsersId(@Param("userId") Long userId);
    @Query("Select c from Chat c where c.shop.id = :shopId")
    List<Chat> findByShopId(@Param("shopId")Long shopId);
    @Query("SELECT c FROM Chat c WHERE c.user.id = :userId AND c.shop.id = :shopId")
    Chat findChatByUserAndShop(@Param("userId") Long userId, @Param("shopId") Long shopId);

}
