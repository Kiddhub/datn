package com.project.dto.request;

import com.project.model.Shop;
import com.project.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateChatRequest {
    private User user;
    private Shop shop;
}
