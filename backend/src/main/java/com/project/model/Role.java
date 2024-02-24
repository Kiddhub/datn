package com.project.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.project.config.GrantedAuthorityDeserializer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;
@JsonDeserialize(using = GrantedAuthorityDeserializer.class)
public enum Role {
    ADMIN,
    SHOP,
    USER
}
