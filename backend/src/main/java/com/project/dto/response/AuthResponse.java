package com.project.dto.response;

import com.project.model.User;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AuthResponse {

    private String token;

    private User user;
}
