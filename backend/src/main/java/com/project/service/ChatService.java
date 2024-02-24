package com.project.service;

import com.project.exception.ChatException;
import com.project.model.Chat;
import com.project.model.Shop;
import com.project.model.User;

import java.util.List;

public interface ChatService {

    Chat createChat(User user, Shop shop);
    Chat findChatById(Long chatId) throws ChatException;
    List<Chat> findUserChats(Long userId);
    List<Chat> findShopChats(Long shopId);
}
