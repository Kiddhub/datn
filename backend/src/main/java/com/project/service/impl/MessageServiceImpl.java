package com.project.service.impl;

import com.project.dto.request.MessageRequest;
import com.project.exception.ChatException;
import com.project.model.Chat;
import com.project.model.Message;
import com.project.model.Shop;
import com.project.model.User;
import com.project.repository.ChatRepository;
import com.project.repository.MessageRepository;
import com.project.repository.ShopRepository;
import com.project.repository.UserRepository;
import com.project.service.ChatService;
import com.project.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatService chatService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private ShopRepository shopRepository;
    @Override
    public Message createUserMessage(User user, MessageRequest request) throws ChatException {
        Message message1 = new Message();
        Chat chat = chatRepository.findChatByUserAndShop(user.getId(), request.getReceiptedId());
        if(chat == null) {
            Optional<Shop> opt = shopRepository.findById(request.getReceiptedId());
            if(opt.isPresent()){
                Shop shop = opt.get();
                Chat chat1 = chatService.createChat(user,shop);
                message1.setChat(chat1);
                message1.setContent(request.getContent());
                message1.setSenderId(user.getId());
                message1.setReceiptedId(request.getReceiptedId());
                message1.setTimeStamp(LocalDateTime.now());
                Message savedMessage = messageRepository.save(message1);
                chat1.getMessages().add(savedMessage);
                chat1.setLastMessage(request.getContent());
                chatRepository.save(chat1);
                return savedMessage;
            }
        }else {
            message1.setChat(chat);
            message1.setContent(request.getContent());
            message1.setSenderId(user.getId());
            message1.setReceiptedId(request.getReceiptedId());
            message1.setTimeStamp(LocalDateTime.now());
            Message savedMessage = messageRepository.save(message1);
            chat.getMessages().add(savedMessage);
            chat.setLastMessage(request.getContent());
            chatRepository.save(chat);
            return savedMessage;
        }
        return null;
    }

    @Override
    public Message createShopMessage(Shop shop, MessageRequest request) throws ChatException {
        Message message1 = new Message();
        Chat chat = chatRepository.findChatByUserAndShop(request.getReceiptedId(), shop.getId());
        if(chat == null) {
            Optional<User> opt = userRepository.findById(request.getReceiptedId());
            if(opt.isPresent()){
                User user = opt.get();
                Chat chat1 = chatService.createChat(user,shop);
                message1.setChat(chat1);
                message1.setContent(request.getContent());
                message1.setSenderId(shop.getId());
                message1.setReceiptedId(request.getReceiptedId());
                message1.setTimeStamp(LocalDateTime.now());
                Message savedMessage = messageRepository.save(message1);
                chat1.getMessages().add(savedMessage);
                chat1.setLastMessage(request.getContent());
                chatRepository.save(chat1);
                return savedMessage;
            }
        }else {
            message1.setChat(chat);
            message1.setContent(request.getContent());
            message1.setSenderId(shop.getId());
            message1.setReceiptedId(request.getReceiptedId());
            message1.setTimeStamp(LocalDateTime.now());
            Message savedMessage = messageRepository.save(message1);
            chat.getMessages().add(savedMessage);
            chat.setLastMessage(request.getContent());
            chatRepository.save(chat);
            return savedMessage;
        }
        return null;
    }

    @Override
    public List<Message> findChatMessages(Long chatId) throws ChatException {
        Chat chat = chatService.findChatById(chatId);
        return messageRepository.findByChatId(chatId);
    }
}
