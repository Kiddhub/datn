package com.project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateSaleRequest {
    private String name;
    private String description;
    private String discountType;
    private Long discountNumber;
    private String timeStart;
    private String timeEnd;
}
