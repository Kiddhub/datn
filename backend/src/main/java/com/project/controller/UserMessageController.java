package com.project.controller;

import com.project.service.MessageService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chats/message")
public class UserMessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;


//    @PostMapping("/{chatId}")
//    public ResponseEntity<Message> createUserMessage(@RequestBody Message req,
//                                                     @RequestHeader("Authorization")String jwt,
//                                                     @PathVariable Long chatId) throws UserException, ChatException {
//        User user = userService.findUsernameByToken(jwt);
//        Message message = messageService.createUserMessage(user,chatId,req);
//        return new ResponseEntity<>(message, HttpStatus.CREATED);
//    }

}
