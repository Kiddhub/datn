package com.project.service;

import com.project.dto.request.MessageRequest;
import com.project.exception.ChatException;
import com.project.model.Chat;
import com.project.model.Message;
import com.project.model.Shop;
import com.project.model.User;

import java.util.List;

public interface MessageService {
    Message createUserMessage(User user, MessageRequest request) throws ChatException;

    Message createShopMessage(Shop shop, MessageRequest request) throws ChatException;

    List<Message> findChatMessages(Long chatId) throws ChatException;
}
