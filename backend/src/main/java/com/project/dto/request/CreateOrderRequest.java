package com.project.dto.request;

import com.project.model.Address;
import com.project.model.Coupon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateOrderRequest {
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String mobile;
    private Coupon voucher;
    private Coupon voucherShop;
    private Long shopId;
    private long totalPrice;
    private String payment;
    private long discountPrice;
}
