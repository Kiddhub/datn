package com.project.controller;

import com.project.dto.request.CreateChatRequest;
import com.project.dto.request.MessageRequest;
import com.project.exception.ChatException;
import com.project.exception.UserException;
import com.project.model.Chat;
import com.project.model.Message;
import com.project.model.Shop;
import com.project.service.ChatService;
import com.project.service.MessageService;
import com.project.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop/chats")
@PreAuthorize("hasRole('SHOP')")
@RequiredArgsConstructor
public class ChatShopController {

    private final ChatService chatService;
    private final MessageService messageService;
    private final ShopService shopService;
    @PostMapping("/create")
    public ResponseEntity<Chat> createShopChat(
            @RequestBody CreateChatRequest req,
            @RequestHeader("Authorization")String jwt) throws UserException {
        Shop shop = shopService.findByToken(jwt);
        Chat chat = chatService.createChat(req.getUser(),shop);
        return new ResponseEntity<>(chat, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Chat>> getListChat(@RequestHeader("Authorization")String jwt) throws UserException {
        Shop shop = shopService.findByToken(jwt);
        List<Chat> chats = chatService.findShopChats(shop.getId());
        return new ResponseEntity<>(chats,HttpStatus.OK);
    }
    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody MessageRequest req,
                                                 @RequestHeader("Authorization")String jwt) throws ChatException {
        Shop shop = shopService.findByToken(jwt);
        Message message = messageService.createShopMessage(shop,req);
        return new ResponseEntity<>(message,HttpStatus.CREATED);
    }
}
