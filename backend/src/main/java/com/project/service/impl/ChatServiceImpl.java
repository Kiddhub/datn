package com.project.service.impl;

import com.project.exception.ChatException;
import com.project.model.Chat;
import com.project.model.Shop;
import com.project.model.User;
import com.project.repository.ChatRepository;
import com.project.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat createChat(User user, Shop shop) {
        Chat isExist = chatRepository.findChatByUserAndShop(user.getId(),shop.getId());
        if(isExist != null){
            return isExist;
        }
        Chat chat =new Chat();
        chat.setUser(user);
        chat.setShop(shop);
        chat.setTimeStamp(LocalDateTime.now());
        return chatRepository.save(chat);
    }
    @Override
    public Chat findChatById(Long chatId) throws ChatException {
        Optional<Chat> opt = chatRepository.findById(chatId);
        if(opt.isEmpty()){
            throw new ChatException("Chat not found with ID");
        }
        return opt.get();
    }

    @Override
    public List<Chat> findUserChats(Long userId) {
        return chatRepository.findByUsersId(userId);
    }

    @Override
    public List<Chat> findShopChats(Long shopId) {
        return chatRepository.findByShopId(shopId);
    }

}
