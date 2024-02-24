package com.project.controller;

import com.project.dto.request.CreateChatRequest;
import com.project.dto.request.MessageRequest;
import com.project.exception.ChatException;
import com.project.exception.UserException;
import com.project.model.Chat;
import com.project.model.Message;
import com.project.model.User;
import com.project.service.ChatService;
import com.project.service.MessageService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/user/chats")
@PreAuthorize("hasRole('USER')")
public class ChatUserController {
    @Autowired
    private ChatService chatService;
    @Autowired
    private UserService userService;
    @Autowired
    private MessageService messageService;
    @PostMapping("/create")
    public ResponseEntity<Chat> createChat(@RequestBody CreateChatRequest req){
        Chat chat = chatService.createChat(req.getUser(),req.getShop());
        return new ResponseEntity<>(chat, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Chat>> getListUserChats(@RequestHeader("Authorization")String jwt) throws UserException {
        User user = userService.findUsernameByToken(jwt);
        List<Chat> chats = chatService.findUserChats(user.getId());
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }
    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody MessageRequest req,
                                                 @RequestHeader("Authorization")String jwt) throws ChatException {
        User user = userService.findUsernameByToken(jwt);
        Message message = messageService.createUserMessage(user,req);
        return new ResponseEntity<>(message,HttpStatus.CREATED);
    }
}
