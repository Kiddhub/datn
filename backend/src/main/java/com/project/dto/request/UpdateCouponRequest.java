package com.project.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCouponRequest {
    private String description;
    private String discountType;
    private Long number;
    private String couponType;
    private int quantity;
    private String timeStart;
    private String timeEnd;
    private long minPrice;
}
