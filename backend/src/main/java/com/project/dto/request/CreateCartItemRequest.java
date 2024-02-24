package com.project.dto.request;

import com.project.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCartItemRequest {
    private Long productId;
    private String size;
    private long quantity;
    private Long price;
}
